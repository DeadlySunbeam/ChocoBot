const cheerio = require('cheerio');
const path = require('path');
const fs = require('fs');
const Discord = require('discord.js');
const { O_NONBLOCK } = require('constants');
const { title } = require('process');


function find(array, value) { // Эту функцию я нашел на каком-то ресурсе. Она ищет повторяющиеся значения в массиве. А-ля search_array() в php
	if (array.indexOf) {
		return array.indexOf(value);
	}

	for (let i = 0; i < array.length; i++) {
		if (array[i] === value) return i;
	}

	return -1;
}

function compareScore(a, b) {
	return b.Score - a.Score;
}

module.exports.run = async (bot, message, args) => {


	const rawdata = fs.readFileSync('./GUILDS/' + message.guild.id + '/Score.json');
	const obj = JSON.parse(rawdata);
	obj['Users'].sort(compareScore);

	let my_index = obj['Users'].findIndex(user => user.ID === message.author.id);
	const temp_index = my_index;

	if (my_index > 4) {my_index -= 4;}
	else {my_index = 0;}

	let top_text = '';
	const title_text = `Вы на ${obj['Users'].findIndex(user => user.ID === message.author.id) + 1} месте`;
	for (let i = my_index; i < 10 + my_index && i < obj['Users'].length; i++) {

		if (i == temp_index) {
			top_text += '**' + (i + 1) + '. ' + obj['Users'][i].Name + ' - ' + obj['Users'][i].Score + '<:Chipsik:847169552386359327>**' + '\n\n';
		}
		else {top_text += (i + 1) + '. ' + obj['Users'][i].Name + ' - ' + obj['Users'][i].Score + '<:Chipsik:847169552386359327>' + '\n\n';}
	}

	//	const your_text = 'Вы находитесь на ' + 10;

	const embed = new Discord.EmbedBuilder()
		.setAuthor({ name: message.author.username, iconURL: message.author.avatarURL() })
		.setDescription(top_text)

	// .setThumbnail(message.author.image)
		.setColor('#4169E1')
		.setTitle(title_text)
	// .setImage(message.author.avatarURL())
		.setFooter({ text: 'Кусь за бочок от ' + bot.users.cache.get('241850808960811008').username, iconURL: bot.users.cache.get('241850808960811008').avatarURL() });
	// .setImage(message.author.image);
	message.channel.send({ embeds:[embed] });


	// await msg.delete();
	await message.delete();
};
module.exports.help = {
	name: 'мойтоп',
	type: 'info',
	desc: 'Показать моё место в топе',
};
