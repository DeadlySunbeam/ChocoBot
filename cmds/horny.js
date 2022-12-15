const Discord = module.require('discord.js');
// const show = require('../modules/show.js');
// const express = require('express');
const fs = require('fs');

// function getRandomInt(max) {
// 	return Math.floor(Math.random() * Math.floor(max));
// }

module.exports.run = async (bot, message, args) => {


	const jsonStr = '{"Users":[]}';

	const dir3 = './GUILDS/' + message.guild.id;

	let toGet;

	try {

		toGet = message.guild.members.cache.get(args[0]) || message.mentions.members.first();

	}
	catch (error) {
		console.error(error);
	}

	if (args.length === 0) {
		//	message.reply('Пожалуйста укажите пользователя, которого надо внести в список хорни');

		if (!fs.existsSync(dir3)) fs.mkdirSync(dir3);
		if (!fs.existsSync(dir3 + '/Horny.json')) {fs.writeFileSync(dir3 + '/Horny.json', jsonStr);}

		const rawdata = fs.readFileSync('./GUILDS/' + message.guild.id + '/Horny.json');
		const obj = JSON.parse(rawdata);
		const AllUsers = obj['Users'];
		let final_text = '';

		for (let i = 1; i < AllUsers.length; i++) {
			final_text += AllUsers[i].Name + '\t' + AllUsers[i].ID + '\n';
		}

		const embed = new Discord.EmbedBuilder()
			.setAuthor(message.author.username, message.author.avatarURL())
			.setDescription(final_text)

		//	.setThumbnail(message.author.image)
			.setColor('#4169E1')
			.setTitle('Хорни на сервере')
		//	.setImage(message.author.avatarURL())
			.setFooter('Кусь за бочок от ' + bot.users.cache.get('241850808960811008').username, bot.users.cache.get('241850808960811008').avatarURL());
		//	.setImage(message.author.image);
		message.channel.send({ embeds:[embed] });


		return;
	}

	if (!toGet) {
		message.reply('Такого пользователя не найдено');
		return;
	}

	if (!(fs.existsSync('./GUILDS/' + message.guild.id + '/Horny.json'))) {
		message.reply('Первый хорни на сервере!');
	}

	if (!fs.existsSync(dir3)) fs.mkdirSync(dir3);
	if (!fs.existsSync(dir3 + '/Horny.json')) {fs.writeFileSync(dir3 + '/Horny.json', jsonStr);}

	const rawdata = fs.readFileSync('./GUILDS/' + message.guild.id + '/Horny.json');
	const obj = JSON.parse(rawdata);
	const new_User = obj['Users'].find(User => User.ID === toGet.id);
	if (!new_User) {
		obj['Users'].push({ 'ID':toGet.id, 'Name':toGet.user.username });
		message.reply('Добавлен в список хорни!');
	}
	else {
		obj['Users'].splice(obj['Users'].indexOf(new_User), 1);
		message.reply('Убран из списка хорни!');
	}

	fs.writeFileSync('./GUILDS/' + message.guild.id + '/Horny.json', JSON.stringify(obj));


	// item_kus().then(res, err)


};

module.exports.help = {
	name: ['horny'],
	type: 'moderation',
	desc: 'Выдать хорни роль',
};
