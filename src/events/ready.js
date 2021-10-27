module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        client.user.setPresence({ activities: [{
            name: 'Bầu Chời.. rực lửa',
            type: "STREAMING",
            url: "https://www.twitch.tv/acgn_music_box_01"
            }],
            status: ''
        });
        console.log(`✔ [ONLINE]: ${client.user.username}#${client.user.discriminator}`);
    }
}