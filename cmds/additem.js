/* eslint-disable max-statements-per-line */
/* eslint-disable no-inline-comments */
const fs = require('fs');
const https = require('https');


module.exports.run = async (bot, message, args) => {

	if (message.author.id != '241850808960811008') {
		message.reply('У вас нет прав! Обратитесь к ЧокоЧипу для возможности добавления'); return;
	}

	console.log(args);

	if (!args[0] || !args[1]) {
		message.reply('Пожалуйста, введите следующий формат для добавления вещи: !добавить вещь цена');
		return;
	}

	if (!message.attachments.first()) { message.channel.send('Пожалуйста пишите эту команду с закрепленной картинкой'); return;}


	const jsonStr = '{"Items":[]}';

	const dir3 = './items/';
	if (!fs.existsSync(dir3)) fs.mkdirSync(dir3);
	if (!fs.existsSync(dir3 + '/Items.json')) {fs.writeFileSync(dir3 + '/Items.json', jsonStr);}

	// let rawdata = fs.readFileSync(`./GUILDS/`+message.guild.id+`/Items.json`);

	// ///////////////////////////

	const rawdata = fs.readFileSync('./items/Items.json');
	const obj = JSON.parse(rawdata);


	const file = fs.createWriteStream('./items/' + obj['Items'].length + '.png');
	https.get(message.attachments.first().proxyURL, function(response) {
		// console.log(response)
		response.pipe(file);
	});

	// new_Score = new_User.Score;
	obj['Items'].push({ 'ID': obj['Items'].length, 'Name': args[0], 'Price': args[1] });
	// obj['Users'].find( User => User.ID === message.author.id).Date = new Date().getTime();


	message.reply('**' + args[0] + ' успешно добавлен!**');


	// console.log(new_Score);
	//
	fs.writeFileSync(dir3 + '/Items.json', JSON.stringify(obj));


};
module.exports.help = {
	name: 'добавить',
	type: 'admin',
	// eslint-disable-next-line comma-dangle
	desc: 'Команда помощи'
};
