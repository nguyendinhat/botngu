const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js');
const { prefix } = require("../../data/config.json")
const os = require('os');

module.exports = {
	name: 'bot',
	category: 'Infomation',
	description: 'xem info của em ở đây',
	usage: `\`${prefix}bot\``,
	data: new SlashCommandBuilder()
    .setName('bot')
    .setDescription('xem info của em ở đây'),
	async execute(client, message, args) {
		const embed = new MessageEmbed()
			.setThumbnail(`https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.jpg?size=100`)
			.setTitle('Bot Stats')
			.setColor('#FEC8D8')
			.addFields(
				{
					name: '🌐 Servers',
					value: `Serving ${client.guilds.cache.size} servers.`,
					inline: true,
				},
				{
					name: '📺 Channels',
					value: `Serving ${client.channels.cache.size} channels.`,
					inline: true,
				},
				{
					name: '👥 Server Users',
					value: `Serving ${client.users.cache.size}`,
					inline: true,
				},
				{
					name: '⏳ Ping',
					value: `${Math.round(client.ws.ping)}ms`,
					inline: true,
				},
				{
					name: '📆 Join Date',
					value: `${client.user.createdAt}`,
					inline: true,
				},
				{
					name: '🚺 Server Info',
					value: `Cores: ${os.cpus().length}`,
					inline: true,
				},
			)
			.setFooter(`Created By:${message.member.user.username}`, `https://cdn.discordapp.com/avatars/${message.member.user.id}/${message.member.user.avatar}.jpg?size=100`);

	return message.reply({embeds: [embed]});
	},
};