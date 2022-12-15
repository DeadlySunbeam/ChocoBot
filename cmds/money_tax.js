const fs = require('fs');


module.exports.run = async (bot, message, args) => {

	const dir3 = './GUILDS/' + message.guild.id;

	const rawdata = fs.readFileSync('./GUILDS/' + message.guild.id + '/taxes.json');
	const objTax = JSON.parse(rawdata);

	if (!args[0]) {
		if (!message.member.roles.cache.find(role => role.name === 'Чоколатье')) {
			message.reply(`Текущий налог составляет ${objTax.Tax}%`);
			return;
		}
		message.reply(`Текущий налог составляет ${objTax.Tax}%. Вы можете поставить свой собственный через команду **!налог число_налога**. Помните налог не может быть меньше нуля и больше чем 200%`);
	}

	if (!Number.isInteger(parseInt(args[0])) && args[0] && args[0] >= 0) {
		message.reply('Неверный формат, текущее значение должно быть положительным числом.');
		return;
	}

	if (args[0] > 200) {
		message.reply('Налог не может быть выше 200%.');
		return;
	}

	if (args[0] < 0) {
		message.reply('Налог не может быть ниже 0%.');
		return;
	}

	if (args[0]) {
		if (!message.member.roles.cache.find(role => role.name === 'Чоколатье')) {
			message.reply('Налоги может выставлять только король!');
			return;
		}
		const taxes = { Tax:parseInt(args[0]) };
		fs.writeFileSync(dir3 + '/taxes.json', JSON.stringify(taxes));
		message.reply(`Теперь налог составляет ${taxes.Tax}%!`);
	}

};
module.exports.help = {
	name: ['налог'],
	type: 'economy',
	desc: 'Посмотреть казну',
};