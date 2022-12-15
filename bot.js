/* eslint-disable no-inner-declarations */
const botSettings = require('./BotSettings.json');
const { Client, Collection } = require('discord.js');

const fs = require('fs');
//  const bot = new Discord.Client(, { intents: ['GUILDS', 'GUILD_MESSAGES']});
const bot = new Client({ intents: ['DirectMessages', 'Guilds', 'GuildMessages', 'GuildMembers', 'GuildMessageReactions', 'GuildVoiceStates', 'MessageContent'] });

bot.mutes = require('./mutes.json');

bot.commands = new Collection();
bot.events = new Collection();
bot.slashCommands = new Collection();


//  const webhook = new Discord.WebhookClient('884235212022743120', 'KDcU5sWF8MPZ-FnNlCOGTwzrmLbs2t5ATCE63q2tXPozs92bAwJXYShE8BzBXMqCtzid');


const Channels = [];


bot.on('error', error => {
	console.error;
	const error_time = new Date();
	if (fs.existsSync('./error_logs.txt')) {
		fs.appendFileSync('./error_logs.txt', `${error_time}: ${error}\n`);
	}
	else {
		fs.writeFileSync('./error_logs.txt', `${error_time}: ${error}\n`);
	}
});

const cmd_path = './cmds/';
//	Command Handler
fs.readdir(cmd_path, (err, files) => {
	if (err) console.error(err);

	//	const stat = fs.lstatSync(cmd_path, files);

	const jsfiles = files.filter(f => f.split('.').pop() === 'js');

	if (jsfiles.length <= 0) {
		console.log('[COMMAND HANDLER] - No commands to load!');
		return;
	}
	console.log(`[COMMAND HANDLER] - Loading ${jsfiles.length} commands!`);
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

//	Event Handler
fs.readdir('./events/', (err, files) => {
	if (err) console.error(err);
	const jsfiles = files.filter(f => f.split('.').pop() === 'js');
	if (jsfiles.length <= 0) {
		console.log('[EVENT HANDLER] - No events to load!');
		return;
	}
	console.log(`[EVENT HANDLER] - Loading ${jsfiles.length} events!`);

	jsfiles.forEach((file) => {
		const eventGet = require(`./events/${file}`);

		try {
			bot.events.set(eventGet.name, eventGet);

		}
		catch (error) {
			return console.log(error);
		}
	});
});

// Slash Command Handler
//	Command Handler
fs.readdir('./SlashCommands/', (err, files) => {
	if (err) console.error(err);
	const jsfiles = files.filter(f => f.split('.').pop() === 'js');
	if (jsfiles.length <= 0) {
		console.log('[SLASH COMMAND HANDLER] - No commands to load!');
		return;
	}
	console.log(`[SLASH COMMAND HANDLER] - Loading ${jsfiles.length} commands!`);
	jsfiles.forEach((f, i) => {
		const props = require(`./SlashCommands/${f}`);
		console.log(`${i + 1}: ${f} loaded!`);

		bot.slashCommands.set(props.help.name, props);
		// bot.commands.set(props.help.alias, props);

	});
});


process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
	const error_time = new Date();
	if (fs.existsSync('./error_logs.txt')) {
		fs.appendFileSync('./error_logs.txt', `${error_time}: ${error}\n`);
	}
	else {
		fs.writeFileSync('./error_logs.txt', `${error_time}: ${error}\n`);
	}

});


bot.login(botSettings.token);

module.exports.bot = bot;
module.exports.Channels = Channels;