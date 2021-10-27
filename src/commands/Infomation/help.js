const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const { prefix } = require("../../data/config.json")
const ms = require('ms');

module.exports = {
	name: 'help',
	aliases: ['h'],
	category: 'Infomation',
	description: 'Tổng hợp lệnh',
	usage: '[Tên lên lệnh | Kí hiệu rút gọn]',
	data: new SlashCommandBuilder()
    .setName("help")
    .setDescription('Đến giờ trả bài rồi!'),
	async execute (client, message, args) {
		if (!args[0]) {
			return getAll(client, message);
		}
		return getCMD(client, message, args[0]);
	},
};

function getAll(client, message) {
	const embed = new MessageEmbed()
	.setAuthor(`${message.member.user.username}, Requested Commands: `, `https://cdn.discordapp.com/avatars/${message.member.user.id}/${message.member.user.avatar}.jpg?size=100`)
	.setColor('#fb644c')
	.setThumbnail(`https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.jpg?size=300`);

	const commands = (category) => client.commands
		.filter((cmd) => cmd.category === category)
		.map((cmd) => `- \`${cmd.name}\``)
		.join(' ');

	const info = client.categories.map(cat => stripIndents(`**${cat[0].toUpperCase() + cat.slice(1)}**\n${commands(cat)}`))
		.reduce((string,category) => string + "\n" + category);
	return message.channel.send({embeds: [embed.setDescription(info)]});
}

function getCMD(client, message, input) {

	const embed = new MessageEmbed();
	const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));
	let info = `Hổng tìm thấy lợnh **${input.toLowerCase()}**`;
	if(!cmd) return message.channel.send(embed.setColor('#fb644c'));
	if (cmd.name) info = `**Tên lệnh**: ${cmd.name}`;
	if (cmd.aliases) info += `\n**Viết tắt lệnh:**: ${cmd.aliases.map((a) => `\`${a}\``).join(', ')}`;
	if (cmd.description) info += `\n**Chi tiết:**: ${cmd.description}`;
	if (cmd.usage) {
		info += `\n**Hướng dẫn sài lệnh**: ${cmd.usage}`;
		embed.setFooter('Cú Pháp: <> (Bắt buộc), [] = (tuỳ chọn)');
	}
	return message.channel.send({embeds: [embed.setColor('GREEN').setDescription(info)]});
}