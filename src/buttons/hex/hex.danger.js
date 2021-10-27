module.exports = {
    data: {
        name: 'hex.danger',
    },
    async execute(client, interaction) {
        await interaction.reply({content: `color danger`})
    }
}