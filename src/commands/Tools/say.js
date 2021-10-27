const { prefix } = require("../../data/config.json")
const { SlashCommandBuilder } = require('@discordjs/builders')
const { Message } = require('discord.js');

module.exports = {
    name: "say",
    category: "Tools",
    aliases: ["s", "talk", "said"],
    description: 'Muốn em nói gì nào?',
    usage: `\`${prefix}say <nội dung>\``,
    data: new SlashCommandBuilder()
    .setName("say")
    .setDescription('Muốn em nói gì nào?')
	.addStringOption(option => option.setName('text').setDescription('Thay lời muốn nói')),
    async execute(client, message, args) {
        if (typeof args == 'undefined') {
            if (!message.options.getString('text')) {
                args = []
            } else {
                args = message.options.getString('text').split(/ +/g);
            }
        }
        if (!args[0]) {
            let content = ""
            content += `Quên nhập nội dung gòi?\nLàm theo em chỉ nhá: ${this.usage}`;
            if (typeof this.aliases != 'undefined') {
                content += `\nCó thể thay \`${prefix}${this.name}\` bằng `;
                this.aliases.forEach(alias => {
                    content += `\`${prefix}${alias}\` `
                });
                content += "cho tiện nhé!"
            }
            message.reply(content);
            return;
        }
        if (args) {
            client.channels.cache.get(message.channelId).send({ content: args.join(" ")})
            if (typeof message.author === 'undefined'){
                await message.reply('...');
                await message.deleteReply();
            } else {
                await message.delete()
            }
        }
    }
}