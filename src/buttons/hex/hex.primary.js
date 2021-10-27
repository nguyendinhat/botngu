module.exports = {
    data: {
        name: 'hex.primary',
    },
    async execute(client, interaction) {
        await interaction.reply({content: `color primary`})
    }
}