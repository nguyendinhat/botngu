const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed, MessageAttachment } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Hiển thị thông tin!')
    .addSubcommand(subcommand =>
        subcommand
        .setName("user")
        .setDescription("Get infomation of a user mentioned")
        .addUserOption(option => option.setName('target').setDescription('the user memtioned'))
    )
    .addSubcommand(subcommand => subcommand
        .setName('server')
        .setDescription('Thông tin của sơ vơ')
        ),
    async execute(interaction) {
        if (interaction.options.getSubcommand() === 'user') {
            const user = interaction.options.getUser('target')
            if (user) {
                const userEmbed = new MessageEmbed()
                    .setTitle("")
                await interaction.reply(`User name: ${user.username}\nID: ${user.id}`)
            } else {
                await interaction.reply(`User name: ${interaction.user.username}\nID: ${interaction.user.id}`)
            }
        } else if (interaction.options.getSubcommand() == 'server') {
            await interaction.reply(`Server name: ${interaction.guild.name}\nTotal member: ${interaction.guild.memberCount}`)
        } else {
            await interaction.reply("No sub command was used")
        }
    }
}