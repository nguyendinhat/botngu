const { prefix } = require('../data/config.json')

module.exports = {
    name: 'messageCreate',
    async execute(client, message) {
        if(!message.content.startsWith(prefix)) return;
        let args = message.content.slice(prefix.length).split(/ +/g);
        let cmd = args.shift().toLowerCase();
        if (cmd.length === 0) return;
        let command = client.commands.get(cmd);
        if (!command) command = client.commands.get(client.aliases.get(cmd));
        if (command) {
            command.execute(client, message, args);
        }
    }
}