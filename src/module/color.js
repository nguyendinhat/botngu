const getCmdColor = async (interaction) => {
    let color = "";
    await interaction.values.forEach(async value => {
        color += `${value}`
    });
    await interaction.reply({content: `Màu fav của bạn là: ${color}`});
}

module.exports = { getCmdColor }