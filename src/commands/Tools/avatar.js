const { MessageEmbed } = require('discord.js');
const { prefix } = require("../../data/config.json");
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    name: "avatar",
    category: "Tools",
    aliases: ["ava", "a", "avt"],
    description: 'Xem avatar cở lớn có thể down về ủ',
    usage: `\`${prefix}avatar [@user]\``,
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Xem ảnh avatar')
        .addUserOption(option => option.setName('user').setDescription('Xem avatar của ai đây [@user]')),
    async execute(client, message, args) {

        let user, url;
        if (typeof message.author === 'undefined') {
            if (typeof message.options._hoistedOptions[0] === 'undefined') {
                user = message.user
            } else {
                user = message.options.getUser('user')
            }
            url = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.jpg?size=4096`
        } else {
            if (typeof message.mentions.members.first() === 'undefined') {
                user = message.member.user
            } else {
                user = message.mentions.members.first().user
            }
            url = user.avatarURL({
                format: "jpg",
                dynamic: true,
                size: 4096
            })
        }

        let avatarEmbed = new MessageEmbed()
            .setAuthor(user.username, `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.jpg?size=100`)
            .setColor("#DABFDE")
            .setImage(url)
            .setURL(url)
            .setTitle(":arrow_lower_right: Ủ ảnh ở đây")
            .setDescription(`Đây là avatar của <@${user.id}>`)
            .setFooter(`${message.member.user.username} requested`)
            .setTimestamp();
        if (typeof message.author === 'undefined'){
            message.reply({embeds: [avatarEmbed]})
        } else {
            client.channels.cache.get(message.channelId).send({
                embeds: [avatarEmbed]
            })
            await message.delete()
        }
    }
}