const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { client_id, token } = require('../data/config.json')
const fs =  require('fs');
const ascii = require('ascii-table')




module.exports = (client) => {
    client.handleCommands = async(commandFolders, path) => {
        const table = new ascii("Lệnh");

        table.setHeading("file name","status ").setAlign(1,ascii.CENTER);
        client.commandArray = [];
        for(let folder of commandFolders) {
            const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(`../commands/${folder}/${file}`);
                if (command.data) {
                    //
                    client.commands.set(command.data.name, command);
                    client.commandArray.push(command.data.toJSON());
                    table.addRow(file, '✔')
                } else {
                    table.addRow(file, '⚠')
                    continue;
                }
                if (command.aliases && Array.isArray(command.aliases)) {
                    command.aliases.forEach(aliases => {
                        client.aliases.set(aliases, command.name)
                    });
                }
            }
        }
        console.log(table.toString());
        const rest = new REST({ version: '9' }).setToken(token);
        await rest.put(Routes.applicationCommands(client_id), {
            body: client.commandArray
        })
        .then(() => {
            console.log('✔ [DONE] Slash Commands')
        })
        .catch((error) => {
            console.log('⚠ [ERROR]: Slash Commands')
            console.log(error.rawError.errors['10'])
        });
    }
}