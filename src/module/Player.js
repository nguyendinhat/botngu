const { QueryType, QueueRepeatMode } = require("discord-player");

const verifySameRoom = async (message) => {
    console.log("verifySameRoom");
    if (!message.member.voice.channelId) return await message.reply({
        content: "Bạn chưa vào voice channel",
        ephemeral: true
    });
    if (message.guild.me.voice.channelId && message.member.voice.channelId !== message.guild.me.voice.channelId) return await message.reply({
        content: "Bạn phải chung phòng với bot để sử dụng lệnh",
        ephemeral: true
    });
}

const verifyVCConnection = async (message, queue) => {
    try {
        if (!queue.connection) return await queue.connect(message.member.voice.channel);
    } catch {
        queue.destroy();
        return await message.reply({
            content: "Could not join your voice channel!",
            ephemeral: true
        });
    }
}

const searchMusic = async (client, message, query) => {
    const searchResult = await client.player
    .search(query, {
        requestedBy: message.user,
        searchEngine: message.commandName === "soundcloud" ? QueryType.SOUNDCLOUD_SEARCH : QueryType.AUTO
    })
    .catch(() => {});
    if (!searchResult || !searchResult.tracks.length) {
        if (typeof message.author === 'undefined') {
            return void message.followUp({ content: "Không tìm thấy kết quả" });
        } else {
            return void message.reply({ content: "Không tìm thấy kết quả" });
        }
    }
    return searchResult
}

const deferReplise = async (message) => {
    if (typeof message.author === 'undefined'){
        await message.deferReply();
    }
}


const getStrArgs =  (message, args, name) => {
    if (typeof args == 'undefined') {
        return message.options.getString(name)
    } else {
        return args.join(" ")
    }
}

module.exports = { verifySameRoom, verifyVCConnection, searchMusic, getStrArgs, deferReplise }