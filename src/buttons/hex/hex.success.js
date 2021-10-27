module.exports = {
    data: {
        name: 'hex.success',
    },
    async execute(client, interaction) {
        await interaction.reply({content: `color success`})
    }
}