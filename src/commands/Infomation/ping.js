const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js');
const { prefix }  = require('../../data/config.json')

module.exports = {
    name: "ping",
    category: "Infomation",
    aliases: ["speed"],
    description: 'Kiểm tra độ trễ của đường truyền internet của bot',
	usage: `\`${prefix}ping\``,
	timeout: 10000,
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!')
    .setDefaultPermission(true),
    async execute(client, message, args) {
		const msg = await message.channel.send('Pinging...');
		message.channel.sendTyping();
		console.log(message.member);
		const Embed = new MessageEmbed()
			.setTitle('Pong!')
			.setAuthor(`${message.member.user.username}`, `https://cdn.discordapp.com/avatars/${message.member.user.id}/${message.member.user.avatar}.jpg?size=100`)
			.setDescription(
				`⌛ Độ trễ: ${Math.floor(
					msg.createdTimestamp - message.createdTimestamp,
				)}ms\n⏲️ API ping: ${Math.round(client.ws.ping)}ms`,
			)
			.setColor('#fb644c');
		await msg.delete();
		return message.reply({ embeds: [Embed] });
    },
}