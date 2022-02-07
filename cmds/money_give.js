const fs = require('fs');


module.exports.run = async (bot, message, args) => {

	console.log(args);


	let toGet;

	let give_money;

	try {

		toGet = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
		console.log(toGet.id);

		if (toGet.id == message.author.id) {
			message.reply('Вы не можете переводить себе деньги!');
			return;
		}


		args.forEach(element => {
			if (element != toGet && !isNaN(element)) {
				give_money = parseInt(`${element}`);

				console.log(`${!isNaN(element)}`);
				// console.log(`OOOOO ${element}`)
			}
		});


	}

	catch (e) {
		console.error(e);
	}


	console.log(args);


	if (!args || !toGet) {
		message.reply('Пожалуйста уточните кому хотите сделать перевод ЧокоЧипсиков и сколько!'); return;
	}

	if (!give_money) {
		message.reply('Пожалуйста уточните сколько хотите перевести ЧокоЧипсиков!'); return;
	}

	if (give_money < 0) {
		message.reply('Нельзя отнимать деньги, вы не налоговая и не грабитель!'); return;
	}


	const dir3 = './GUILDS/' + message.guild.id;

	// ///////////////////////////

	const rawdata = fs.readFileSync('./GUILDS/' + message.guild.id + '/Score.json');
	const obj2 = JSON.parse(rawdata);
	const Score = obj2['Users'].find(User => User.ID === message.author.id).Score;

	let GiftScore;


	try {
		GiftScore = obj2['Users'].find(User => User.ID === toGet.id).Score;
		console.log(Score + ' -> ' + GiftScore);


	}
	catch (e) {
		console.error(e);
		message.reply('Что-то пошло не так, просим прощения за неудобства... Возможно у указаного человека или бота ещё не открыт счёт в Чокобанке?');
		return;
	}

	if (!Number.isInteger(parseInt(give_money))) {
		console.error('ЭТО НЕ ЧИСЛО!');
		message.reply('Вы ввели не число! Пожалуйста введите числовое значение');
		return;
	}

	if (Score < give_money) {
		message.reply(`У вас недостаточно Чокочипсиков для перевода! Заработайте ещё " ${give_money - Score} ЧокоЧипсиков!`); return;
	}


	if (give_money == 0) {
		message.reply(`Пользователь ${message.author} вручил дырку от бублика. Теперь у ${toGet} на одну дырку больше`); return;
	}


	// console.log(new_Score);
	//
	obj2['Users'].find(User => User.ID === message.author.id).Score = Score - give_money;
	obj2['Users'].find(User => User.ID === toGet.id).Score = GiftScore + give_money;
	fs.writeFileSync(dir3 + '/Score.json', JSON.stringify(obj2));

	message.reply(`Перевод успешно завершен, теперь у вас ${Score - give_money} Чокочипсиков. А у ${toGet} их ${GiftScore + give_money}`);
};
module.exports.help = {
	name: ['дать', 'перевести', 'перевод'],
	type: 'info',
	desc: 'Дать чокочипсики пользователю.',
};
