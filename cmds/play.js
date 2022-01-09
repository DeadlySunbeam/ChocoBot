const Discord = module.require("discord.js")


const { 
	generateDependencyReport,
	joinVoiceChannel,
	createAudioPlayer,
	createAudioResource,
	entersState,
	StreamType,
	AudioPlayerStatus,
	VoiceConnectionStatus, } = require('@discordjs/voice');

	var pathToFfmpeg = require('ffmpeg-static');

	console.log(pathToFfmpeg);

const ytdl = require("ytdl-core");


var severs = {};


module.exports.run = async (bot, message, args) => {



const player = createAudioPlayer();

	
!

	console.log(message.member.voice.channelId);

	//console.log(generateDependencyReport());


	if(!message.member.voice.channelId) { message.reply("Вы должны быть в голосовом канале, чтобы использовать эту команду"); return;}

	if(!args[0]) { message.reply("Укажите ссылку или слово для поиска песни");  return;}

	if(message.guild.me.voice.channel) {console.log("КУ-КУ"); return;}


// const connection = joinVoiceChannel({
// 	channelId: message.member.voice.channel.id,
// 	guildId: message.guild.id,
// 	adapterCreator: message.guild.voiceAdapterCreator
// })


joinVoiceChannel({
	channelId: message.member.voice.channel.id,
	guildId: message.guild.id,
	adapterCreator: message.guild.voiceAdapterCreator
})


console.log(message.guild.voiceAdapterCreator);

//joinVoiceChannel()

//console.log(connection);



async function start() {

	const resource = createAudioResource('https://www.youtube.com/watch?v=FRVwU-tKNHQ&ab_channel=SONIAN', {
		inputType: StreamType.Arbitrary,
	});


	player.play(resource);
	try {
		await entersState(player, AudioPlayerStatus.Playing, 5_000);
		// The player has entered the Playing state within 5 seconds
		console.log('Playback has started!');
	} catch (error) {
		// The player has not entered the Playing state and either:
		// 1) The 'error' event has been emitted and should be handled
		// 2) 5 seconds have passed
		console.error(error);
	}
}

void start();

// connection.on(VoiceConnectionStatus.Ready, () => {
// 	console.log('The connection has entered the Ready state - ready to play audio!');
// });




// const connection = joinVoiceChannel({
// 	channelId: channel.id,
// 	guildId: channel.guild.id,
// 	adapterCreator: channel.guild.voiceAdapterCreator,
// });


}
module.exports.help = {
    name: "играть",
    type: "moderation",
    desc: "Воспроизвести музыку"
}
