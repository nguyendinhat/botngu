console.clear()
const { Client, Intents, Collection } = require('discord.js');
const { token } = require('./data/config.json');
const { readdirSync } =  require('fs');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES]});

client.commands = new Collection();
client.buttons = new Collection();
client.aliases = new Collection();

client.categories = readdirSync('./src/commands');
const functions = readdirSync('./src/functions').filter(file => file.endsWith('.js'));
const eventFiles = readdirSync('./src/events').filter(file => file.endsWith('.js'));
const commandFolders = readdirSync('./src/commands');

(async() => {
	for (file of functions) {
		require(`./functions/${file}`)(client)
	}
})();

client.handleEvents(eventFiles,"./src/events");
client.handleCommands(commandFolders, "./src/commands");
client.handleButtons();
client.login(token);
client.dbLogin();