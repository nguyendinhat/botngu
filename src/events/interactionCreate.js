const { getCmdColor } = require('../module/color')

module.exports = {
    name: 'interactionCreate',
    async execute(client, interaction) {

        if (interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return
            try {
                await command.execute(client, interaction)
            } catch (error) {
                console.log(error);
                await interaction.channel.send({
                    content: 'Lỗi API, không phải lỗi của em. sorry đừng dận nà!',
                    ephemeral: true
                })
            }
        }
        if (interaction.isSelectMenu()) {
            switch (interaction.customId) {
                case 'color-select':
                    getCmdColor(interaction)
                    break;
                default:
                    return;
            }
        }
        if (interaction.isButton()){
            const button = client.buttons.get(interaction.customId)
            if (!button) return await interaction.reply({content: `No code is here`})
            try {
                await button.execute(client, interaction)
            } catch (error) {
                console.log(error);
                await interaction.reply({
                    content: 'Có gì đó sai sai',
                    ephemeral: true
                })
            }
        }
    }
}