const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const { joinVoiceChannel,
	createAudioPlayer,
	createAudioResource } = require('@discordjs/voice');


module.exports.run = async (_bot, message, args) => {


	const player = createAudioPlayer();


	const video_player = async (guild, song_s) => {
		const song_queue = queue.get(guild.id);

		if (!song_s) {
			song_queue.voice_channel.leave();
			queue.delete(guild.id);
			return;
		}

		const stream = ytdl(song.url, { filter: 'audioonly' });

		const resource = createAudioResource(stream);

		player.play(resource, { seek:0, volume: 0.5 });

		song_queue.connection.subscribe(player)
			// .on('finish', () => {
			// 	song_queue.songs.shift();
			// 	video_player(guild, song_queue.songs[0]);
			// });

		await song_queue.text_channel.send(`Сейчас играет **${song.title}**`);

	};


	const voice_channel = message.member.voice.channel;

	const queue = new Map();

	const server_queue = queue.get(message.guild.id);

	if (!args.length) return message.channel.send('Введите название или ссылку на музыку в YouTube');
	let song = {};

	if (ytdl.validateURL(args[0])) {
		const song_info = await ytdl.getInfo(args[0]);
		song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url }
	}
	else {
		const video_finder = async (query) => {
			const videoResult = await ytSearch(query);
			return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
		};

		const video = await video_finder(args.join(''));
		if (video) {
			song = { title: video.title, url: video.url };
		} 
		else {
			message.channel.send('Ошибка при поиске видео');
		}
	}

	if (!server_queue) {

		const queue_constructor = {
			voice_channel: voice_channel,
			text_channel: message.channel,
			connection: null,
			songs: [],
		};

		queue.set(message.guild.id, queue_constructor);
		queue_constructor.songs.push(song);


		try {
			const connection = await joinVoiceChannel({
				channelId: voice_channel.id,
				guildId: message.guild.id,
				adapterCreator: message.channel.guild.voiceAdapterCreator,
			});
			queue_constructor.connection = connection;
			video_player(message.guild, queue_constructor.songs[0]);
		}
		catch (err) {
			queue.delete(message.guild.id);
			message.channel.send('Ошибка при попытке подключиться, возможно вы не в голосовом канале.');
			console.error(err);
		}
	}
	else {
		server_queue.song.push(song);
		return message.channel.send(` **${song.title}** добавлена в очередь`);
	}

};
module.exports.help = {
	name: 'играть',
	type: 'moderation',
	desc: 'Воспроизвести музыку',
};
