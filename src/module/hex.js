const getCmdHex = async (interaction) => {
    switch (interaction.customId) {
        case 'danger-hex':
            await interaction.reply({content: `Nút đỏ`})
            break;
        case 'link-hex':
            await interaction.reply({content: `nút link`})

            break;
        case 'primary-hex':
            await interaction.reply({content: `nút chính`})

            break;
        case 'secondary-hex':
            await interaction.reply({content: `nút phụ`})

            break;
        case 'success-hex':
            await interaction.reply({content: `nút xanh`})
            break;
        default:
            break;
    }
}

module.exports = {getCmdHex}