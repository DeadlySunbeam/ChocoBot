const bot = require('../bot').bot;
const fs = require('fs');
const { Permissions } = require('discord.js');

bot.on('voiceStateUpdate', (oldState, newState) => {

	const folder = `./GUILDS/${newState.guild.id}`;
	const file = folder + '/VoiceRooms.json';
	const activeVoiceChannels = folder + '/ActiveRooms.json';

	if (oldState.channel && !oldState.channel.members.size && fs.existsSync(activeVoiceChannels)) {
		//	console.log(oldState.channel.members.length);
		const data = fs.readFileSync(activeVoiceChannels);
		const ActivRoom = JSON.parse(data);
		const thisChannelID = ActivRoom.channels.find(Channel => Channel.ID == oldState.channelId);

		if (thisChannelID) {
			ActivRoom.channels.splice(ActivRoom.channels.indexOf(thisChannelID), 1);
			fs.writeFileSync(activeVoiceChannels, JSON.stringify(ActivRoom));
			oldState.channel.delete();
		}

	}

	if (fs.existsSync(folder) && fs.existsSync(file)) {
		const rawdata = 	fs.readFileSync(file);
		const obj = JSON.parse(rawdata);
		//	console.log(obj);

		if (newState.channelId == obj.ID) {

			newState.guild.channels.create(`${newState.member.displayName}`, {
				type: 'GUILD_VOICE',
				permissionOverwrites: [
					{
						id: newState.member.id,
						allow: [Permissions.ALL],
					},
				],
				parent: newState.channel.parent,
			})
				.then(newVoiceChannel => {

					if (!fs.existsSync(activeVoiceChannels)) {
						fs.writeFileSync(activeVoiceChannels, JSON.stringify({ 'channels':[{ 'ID': newVoiceChannel.id, 'Name': newVoiceChannel.name }] }));
					}
					else {
						const data = fs.readFileSync(activeVoiceChannels);
						const vChannels = JSON.parse(data);
						vChannels.channels.push({ 'ID': newVoiceChannel.id, 'Name': newVoiceChannel.name });
						fs.writeFileSync(activeVoiceChannels, JSON.stringify(vChannels));
					}

					newState.setChannel(newVoiceChannel);
				});

			//	console.log(newVoiceChannel);

			//	setTimeout(() => {newState.setChannel(newVoiceChannel);}, 1000);
			//	newState.setChannel(newVoiceChannel);
		}
	}
	//	console.log(voiceState);
});