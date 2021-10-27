const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageActionRow, MessageButton } = require('discord.js')


module.exports = {
    data: new SlashCommandBuilder()
    .setName('hex')
    .setDescription('Mã màu'),
    async execute(client, interaction) {
        const row = new MessageActionRow()
        row.addComponents(
            new MessageButton()
                .setCustomId(`hex.danger`)
                .setLabel(`Danger btn`)
                .setStyle('DANGER'),
            new MessageButton()
                .setCustomId(`hex.primary`)
                .setLabel(`primay btn`)
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId(`hex.secondary`)
                .setLabel(`secondary btn`)
                .setStyle('SECONDARY'),
            new MessageButton()
                .setCustomId(`hex.success`)
                .setLabel(`success btn`)
                .setStyle('SUCCESS')
        )
        await interaction.reply({
            ephemeral: true,
            content: 'Chọn btn để thấy mã hex',
            components: [row] })
    }
}