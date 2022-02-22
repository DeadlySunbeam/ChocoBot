const bot = require('../bot').bot;
const Channels = require('../bot').Channels;
const fs = require('fs');
const botSettings = require('../BotSettings.json');
const { Collection } = require('discord.js');
const prefix = botSettings.prefix;
const permission = new Collection;

bot.on('messageCreate', async message => {

	if (message.author.bot) return;
	let pref = prefix;
	if (message.guild != null && message.content.startsWith(pref)) {

		const GuildDir = `./GUILDS/${message.guild.id}`;

		if (!fs.existsSync(GuildDir)) fs.mkdir(GuildDir);

		const saveFiles = (file, dir) => {
			fs.writeFile(dir + '/permissions.json', JSON.stringify(file), error => {console.log(error);});
		};

		if ((!fs.existsSync(GuildDir + '/permissions.json'))) {
			message.guild.channels.cache.forEach(channel => {
				Channels.push({ ID: channel.id, 'NAME':channel.name, permission:false });
				// console.log(Channels);

			});
			setTimeout(saveFiles, 3000, Channels, GuildDir);
		}


		const radata = fs.readFileSync('./GUILDS/' + message.guild.id + '/permissions.json');
		const data = JSON.parse(radata);


		data.forEach((item, i) => {
			permission.set(data[i].ID, data[i].permission);

		});

		const rawdata = fs.readFileSync('./GUILDS/' + message.guild.id + '/BotSettingsGuild.json');
		pref = JSON.parse(rawdata).prefix;
	}

	const messageArray = message.content.split(' ');
	const command = messageArray[0];
	const args = messageArray.slice(1);

	if (!command.startsWith(pref)) return;

	const cmd = bot.commands.get(command.slice(pref.length));

	if (!cmd) return;

	if (cmd.help.type == 'image') {
		if (!permission.get(message.channel.id)) {return message.react('⛔');}
	}
	else if (cmd.help.type == 'moderation') {
		if (!message.member.permissions.has('ADMINISTRATOR')) {return message.react('⛔');}

	}

	try {
		if (cmd) cmd.run(bot, message, args);
	}
	catch (e) {
		console.err(e);
	}


});

bot.on('messageCreate', async message => {
	if (message.author.bot) return;

	function getRandomInt(max) {
		return Math.floor(Math.random() * Math.floor(max));
	}

	// console.log(message);

	// НАЧИСЛЕНИЕ ДЕНЕГ

	const jsonStr = '{"Users":[]}';

	if (message.guild) {
		const dir3 = './GUILDS/' + message.guild.id;
		if (!fs.existsSync(dir3)) fs.mkdirSync(dir3);
		if (!fs.existsSync(dir3 + '/Score.json')) {fs.writeFileSync(dir3 + '/Score.json', jsonStr);}

		let new_Score = 0;

		const rawdata = fs.readFileSync('./GUILDS/' + message.guild.id + '/Score.json');
		const obj = JSON.parse(rawdata);
		const new_User = obj['Users'].find(User => User.ID === message.author.id);
		if (new_User) {
			if (new Date().getTime() > new_User.Date + 60000) {
				new_Score = new_User.Score;
				obj['Users'].find(User => User.ID === message.author.id).Score = new_Score + getRandomInt(25);
				obj['Users'].find(User => User.ID === message.author.id).Date = new Date().getTime();
			}
			else {return;}
		}
		else {
			obj['Users'].push({ 'ID':message.author.id, 'Name':message.author.username, 'Score': 10, 'Date': new Date().getTime() });
		}
		// console.log(new_Score);
		//
		fs.writeFileSync(dir3 + '/Score.json', JSON.stringify(obj));
	}
});