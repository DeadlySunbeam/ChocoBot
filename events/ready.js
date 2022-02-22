const bot = require('../bot').bot;
const fs = require('fs');
const Channels = require('../bot').Channels;
const botSettings = require('../BotSettings.json');
const prefix = botSettings.prefix;

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


	const MenuData = [
		{ name: 'RichEmbed',
			type: 3,
			defaultPermission: false,
		},

		{ name: 'Редактировать',
			type: 3,
			defaultPermission: false,
		},

		{ name: 'Перевести в Text',
			type: 3,
			defaultPermission: false,
		},

		{ name: 'Сохранить Embed',
			type: 3,
			defaultPermission: false,
		},

		{ name: 'Жалоба',
			type: 3,
			defaultPermission: true,
		},


	];


	//	console.log(element);

	//	let AdminMenupermissions;

	const GuildID = '392125095570702347';

	await bot.guilds.cache.get(GuildID).commands.set(MenuData);

	const Commands = bot.guilds.cache.get(GuildID).commands;


	const AdminMenupermissions = [

		{
			id: '926714315942268960',
			type: 'ROLE',
			permission: true,
		},

		{
			id: '416951239650050048',
			type: 'ROLE',
			permission: true,
		},

		{
			id: '927352911690883092',
			type: 'ROLE',
			permission: true,
		},
	];

	MenuData.forEach(element => {
		const CmdId = Commands.cache.find(el => el.name === element.name).id;

		if (CmdId) {
			console.log(CmdId);

			bot.guilds.cache.get(GuildID).commands.fetch(CmdId)
				.then(command => command.permissions.add({ permissions: AdminMenupermissions }));

			//	console.log(command);
			//	command.permissions.add({ AdminMenupermissions });
			// command.permissions.add({ AdminMenupermissions });

		}

	});

	//	await AdminMenu.permissions.set({ AdminMenupermissions });

	const USER_ID = '241850808960811008';

	bot.users.fetch(USER_ID);


});