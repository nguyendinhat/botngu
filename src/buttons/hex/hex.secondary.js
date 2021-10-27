module.exports = {
    data: {
        name: 'hex.secondary',
    },
    async execute(client, interaction) {
        await interaction.reply({content: `color secondary`})
    }
}