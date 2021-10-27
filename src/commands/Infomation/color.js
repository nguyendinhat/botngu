const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageActionRow, MessageSelectMenu } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('color')
    .setDescription('Chọn màu'),
    async execute(client, interaction) {
        const row = new MessageActionRow()
        row.addComponents(
            new MessageSelectMenu()
                .setCustomId('color-select')
                .setPlaceholder('Chưa chọn')
                .setMinValues(1)
                .setMaxValues(5)
                .addOptions([
                    {
                        label: 'Đỏ',
                        description: 'Màu đỏ',
                        value: 'red'
                    },
                    {
                        label: 'Vàng',
                        description: 'Màu vàng',
                        value: 'yellow'
                    },
                    {
                        label: 'Cam',
                        description: 'Màu cam',
                        value: 'orange'
                    },
                    {
                        label: 'Lục',
                        description: 'Màu Lục',
                        value: 'green'
                    },
                    {
                        label: 'Lam',
                        description: 'màu lam',
                        value: 'blue'
                    },
                    {
                        label: 'Chàm',
                        description: 'màu chàm',
                        value: 'Magenta'
                    },
                    {
                        label: 'Tím',
                        description: 'màu tím',
                        value: 'Purple'
                    },
                ])
        )
        await interaction.reply({content: 'what is you fav color?', components: [row]})
    }
}