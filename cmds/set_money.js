const fs = require('fs');


module.exports.run = async (bot, message, args) => {

	console.log(args);


	let toGet;

	try {

		toGet = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
		console.log(toGet.id);
	}

	catch (e) {
		console.error(e);
	}


	console.log(args);


	if (!args[0]) {
		message.reply('Пожалуйста уточните кому хотите установить кол-во ЧокоЧипсиков!'); return;
	}

	if (!args[1]) {
		message.reply('Пожалуйста уточните сколько хотите поставить ЧокоЧипсиков!'); return;
	}


	const dir3 = './GUILDS/' + message.guild.id;

	// ///////////////////////////

	const rawdata = fs.readFileSync('./GUILDS/' + message.guild.id + '/Score.json');
	const obj2 = JSON.parse(rawdata);

	let GiftScore;


	try {
		GiftScore = obj2['Users'].find(User => User.ID === toGet.id).Score;
		console.log(GiftScore + ' -> ' + GiftScore + parseInt(args[1]));


	}
	catch (e) {
		console.error(e);
		message.reply('Что-то пошло не так, просим прощения за неудобства...');
		return;
	}

	if (!Number.isInteger(parseInt(args[1]))) {
		console.error('ЭТО НЕ ЧИСЛО!');
		message.reply('Вы ввели не число! Пожалуйста введите числовое значение');
		return;
	}


	// console.log(new_Score);
	//

	obj2['Users'].find(User => User.ID === toGet.id).Score = parseInt(args[1]);
	fs.writeFileSync(dir3 + '/Score.json', JSON.stringify(obj2));

	message.reply(`Теперь у ${toGet}  ${parseInt(args[1])} чокочипсиков`);
};
module.exports.help = {
	name: 'поставить',
	type: 'moderation',
	desc: 'Поставить кол-во чокочипсики пользователю.',
};
