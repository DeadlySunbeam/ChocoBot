const fs = require('fs');
const Discord = require('discord.js');


function compareScore(a, b) {
	return b.Score - a.Score;
}

module.exports.run = async (bot, message) => {


	const rawdata = fs.readFileSync('./GUILDS/' + message.guild.id + '/Score.json');
	const obj = JSON.parse(rawdata);
	obj['Users'].sort(compareScore);


	let top_text = '';
	for (let i = 0; i < 10 && i < obj['Users'].length; i++) {
		top_text += '**' + (i + 1) + '. ' + obj['Users'][i].Name + '** - ' + obj['Users'][i].Score + '<:Chipsik:847169552386359327>' + '\n\n';
	}


	const embed = new Discord.MessageEmbed()
	// .setAuthor(message.author.username, message.author.avatarURL())
		.setDescription(top_text)

	// .setThumbnail(message.author.image)
		.setColor('#4169E1')
		.setTitle('Статистика по ЧокоЧипсикам')
	// .setImage(message.author.avatarURL())
		.setFooter('Кусь за бочок от ' + bot.users.cache.get('241850808960811008').username, bot.users.cache.get('241850808960811008').avatarURL());
	// .setImage(message.author.image);
	message.channel.send({ embeds:[embed] });


	// await msg.delete();
	await message.delete();
};
module.exports.help = {
	name: 'топ',
	type: 'info',
	desc: 'Показать топ участников по ЧокоЧипсикам',
};
