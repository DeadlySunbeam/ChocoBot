/* eslint-disable no-inner-declarations */
const botSettings = require('./BotSettings.json');
const Discord = require('discord.js');
const prefix = botSettings.prefix;
const fs = require('fs');
//  const bot = new Discord.Client(, { intents: ['GUILDS', 'GUILD_MESSAGES']});
const bot = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILD_MESSAGE_REACTIONS', 'GUILD_VOICE_STATES'] });
bot.commands = new Discord.Collection();
bot.mutes = require('./mutes.json');

//  const webhook = new Discord.WebhookClient('884235212022743120', 'KDcU5sWF8MPZ-FnNlCOGTwzrmLbs2t5ATCE63q2tXPozs92bAwJXYShE8BzBXMqCtzid');


function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

const Channels = [];

bot.on('error', console.error);

fs.readdir('./cmds/', (err, files) => {
	if (err) console.error(err);
	const jsfiles = files.filter(f => f.split('.').pop() === 'js');
	if (jsfiles.length <= 0) {
		console.log('No commands to load!');
		return;
	}
	console.log(`Loading ${jsfiles.length} commands!`);
	jsfiles.forEach((f, i) => {
		const props = require(`./cmds/${f}`);
		console.log(`${i + 1}: ${f} loaded!`);

		if (!Array.isArray(props.help.name)) {bot.commands.set(props.help.name, props, props.help.type);}
		else {
			props.help.name.forEach(element => {
				bot.commands.set(element, props, props.help.type);
			});
		}
		// bot.commands.set(props.help.alias, props);

	});
});

const getApp = (guildId) => {
	const app = bot.api.applications(bot.user.id);
	if (guildId) {
		app.guilds(guildId);
	}
	return app;
};


bot.on('ready', async () => {

	bot.user.setActivity('!помощь', { type: 'PLAYING' });


	console.log(`Bot is ready! ${bot.user.username}`);
	console.log(bot.commands);

	try {
		const link = await bot.generateInvite({ scopes:['bot'] }, { permissions:'ADMINISTRATOR' });
		console.log(link);
	}
	catch (e) {
		console.log(e.stack);
	}

	function saveFiles(file, dir) {
		fs.writeFile(dir + '/permissions.json', JSON.stringify(file), error => {console.log(error);});
	}

	bot.guilds.cache.forEach((item) => {
		const dir = './GUILDS/' + item.id;
		if (!fs.existsSync(dir)) fs.mkdirSync(dir);
		if (!fs.existsSync(dir + '/BotSettingsGuild.json')) {fs.writeFileSync(dir + '/BotSettingsGuild.json', JSON.stringify({ 'ID':item.id, 'prefix': prefix }));}
		fs.close;


		if (fs.existsSync(dir + '/assigned_role.json')) {
			const temp_data = fs.readFileSync(dir + '/assigned_role.json');
			const msg_role = JSON.parse(temp_data);

			msg_role.forEach(element => {

				bot.channels.cache.get(element.CHANNEL_ID).messages.fetch([`${element.MESSAGE_ID}`]);
				// console.log(element.MESSAGE_ID)
			});

		}

		if ((!fs.existsSync(dir + '/permissions.json'))) {
			item.channels.cache.forEach(channel => {
				Channels.push({ ID: channel.id, 'NAME':channel.name, permission:false });
				// console.log(Channels);

			});
			setTimeout(saveFiles, 3000, Channels, dir);
		}


	});


	const slashCommands = await getApp('392061691518779392').commands.get();

	await getApp('392061691518779392').commands.post({
		data: {
			name: 'ping',
			description: 'A simple woof',
		},
	});

	console.log(slashCommands);

	const USER_ID = '241850808960811008';

	bot.users.fetch(USER_ID);


});

// bot.on("messageReactionAdd", async reaction =>{
//   if(reaction.emoji.name === "🚩")
//   bot.users.get("241850808960811008").send(reaction.users.last()+" кинул жалобу на "+reaction.message.author+" "+reaction.message.content+`(`+reaction.message.url+')');
// });


// bot.on('guildMemberAdd', async invate => {

// 	// webhook.send('Hello world.')
// 	// .catch(console.error);
// 	// if(invates.guild.me.permissions.has("ADMINISTRATOR"))
// 	// {

// 	invate.guild.fetchInvites()
// 		.then(invites => console.log(`Fetched ${invites.size} invites
//         ` + invites.forEach((item) => {
// 			console.log(item.code + ' ' + item.uses);
// 		}),
// 		))
// 		.catch(console.error);

// 	// }


// });

const permission = new Discord.Collection;
bot.on('messageCreate', async message => {


	if (message.author.bot) return;
	let pref = prefix;
	if (message.guild != null && message.content.startsWith(pref)) {

		const radata = fs.readFileSync('./GUILDS/' + message.guild.id + '/permissions.json');
		const data = JSON.parse(radata);


		data.forEach((item, i) => {
			permission.set(data[i].ID, data[i].permission);

		});
		// console.log(permission.get(message.channel.id))

		// console.log(permission);

		// let guildset = require(`./GUILDS/`+message.guild.id+`/BotSettingsGuild.json`)

		const rawdata = fs.readFileSync('./GUILDS/' + message.guild.id + '/BotSettingsGuild.json');
		pref = JSON.parse(rawdata).prefix;
	}

	//   if(message.content.toLowerCase().match('йифф') && message.guild.emojis.has('631877496291196959')) await message.react(message.guild.emojis.get('631877496291196959')).catch(function(e) {
	//   // Функция не перевыбросила исключение 'e'
	//   // в результате произойдёт resolve(undefined)
	//   // для Promise, возвращённого функцией catch
	//   console.log(e); // "oh, no!"
	// });
	//   if(message.content[0]!='!' && (message.content.toLowerCase().match('кусь') || message.content.toLowerCase().match('куси') || message.content.toLowerCase().match('куса') || message.content.toLowerCase().match('кусат') || message.content.toLowerCase().match('кусае') || message.content.toLowerCase().match('кусаю')) && message.guild.emojis.has('402783101819813888')) await message.react(message.guild.emojis.get('402783101819813888')).catch(function(e) {
	//   // Функция не перевыбросила исключение 'e'
	//   // в результате произойдёт resolve(undefined)
	//   // для Promise, возвращённого функцией catch
	//   console.log(e); // "oh, no!"
	// });
	//   if(message.content.toLowerCase().match('нюх') && message.guild.emojis.has('648192064596606976')) await message.react(message.guild.emojis.get('648192064596606976')).catch(function(e) {
	//   // Функция не перевыбросила исключение 'e'
	//   // в результате произойдёт resolve(undefined)
	//   // для Promise, возвращённого функцией catch
	//   console.log(e); // "oh, no!"
	// });
	// console.log(pref);

	// Если есть прикрепленная картинка
	// if(message.attachments.size == 1)
	// {
	//   let attach = require(`./attach.js`);
	//   attach.run(bot, message);
	// }

	const messageArray = message.content.split(' ');
	const command = messageArray[0];
	const args = messageArray.slice(1);

	if (!command.startsWith(pref)) return;

	const cmd = bot.commands.get(command.slice(pref.length));

	// console.log(cmd);
	if (!cmd) return;
	// console.log("Type-"+cmd.help.type);
	// console.log(permission.get(message.channel.id))

	if (cmd.help.type == 'image') {
		if (!permission.get(message.channel.id)) {return message.react('⛔');}
	}
	else if (cmd.help.type == 'moderation') {
		if (!message.member.permissions.has('ADMINISTRATOR')) {return message.react('⛔');}

	}

	if (cmd) cmd.run(bot, message, args);


});


bot.on('messageReactionAdd', async (reaction, user) => {

	if (user.bot) return;
	const mes_id = JSON.parse(fs.readFileSync('./GUILDS/' + reaction.message.guild.id + '/assigned_role.json'));

	mes_id.forEach(element => {


		if (reaction.message.id === element.MESSAGE_ID) {
			// notif_role = reaction.message.guild.roles.cache.find(role =>  role.name === 'News-Notifications');

			const embed_arr = JSON.parse(fs.readFileSync('./GUILDS/' + reaction.message.guild.id + '/embed'));

			function delay() {
				return new Promise(resolve => setTimeout(resolve, 300));
			}

			async function processArray(array) {
				// делаем "map" массива в промисы
				const promises = array.map(delayedLog);
				// ждем когда всё промисы будут выполнены
				await Promise.all(promises);
				// console.log('Done!');
			}

			async function delayedLog(item) {
				// мы можем использовать await для Promise
				// который возвращается из delay
				await delay();

				for (let i = 0; i < item.data.length; i++) {
					// const element = array[i];
					// console.log("ОТРЕАГИРОВАЛ С " + item.data[i][0])


					if (reaction.emoji.id === item.data[i][0] || reaction.emoji.name === item.data[i][0]) {reaction.message.guild.members.cache.get(user.id).roles.add(item.data[i][1].role);}
				}
			}


			processArray(embed_arr);

			reaction.message.guild.members.cache.get(user.id).fetch(user.id);
		}

	});

});

bot.on('messageReactionRemove', async (reaction, user) => {

	const embed_arr = JSON.parse(fs.readFileSync('./GUILDS/' + reaction.message.guild.id + '/embed'));

	if (user.bot) return;
	const mes_id = JSON.parse(fs.readFileSync('./GUILDS/' + reaction.message.guild.id + '/assigned_role.json'));

	mes_id.forEach(element => {

		if (reaction.message.id === element.MESSAGE_ID) {
			// let go_role = await bot.guilds.cache.get(reaction.message.guild.id).members.cache.get(user.id).roles.cache.find(role =>  role.name === 'News-Notifications')
			// let go_user = await bot.guilds.cache.get(reaction.message.guild.id).members.cache.get(user.id).roles.cache;

			function delay() {
				return new Promise(resolve => setTimeout(resolve, 300));
			}

			async function processArray(array) {
				// делаем "map" массива в промисы
				const promises = array.map(delayedLog);
				// ждем когда всё промисы будут выполнены
				await Promise.all(promises);
				// console.log('Done!');
			}

			async function delayedLog(item) {
				// мы можем использовать await для Promise
				// который возвращается из delay
				await delay();

				for (let i = 0; i < item.data.length; i++) {
					// const element = array[i];

					if (reaction.emoji.id === item.data[i][0] || reaction.emoji.name === item.data[i][0]) {reaction.message.guild.members.cache.get(user.id).roles.remove(item.data[i][1].role);}
				}
			}


			processArray(embed_arr);

		}

	});

});

bot.on('messageCreate', async message => {
	if (message.author.bot) return;

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

bot.login(botSettings.token);
