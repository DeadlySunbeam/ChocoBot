const fs = require('fs');


module.exports.run = async (bot, message, args) => {

	const dir3 = './GUILDS/' + message.guild.id;

	const rawdata = fs.readFileSync('./GUILDS/' + message.guild.id + '/kazna.json');
	const objKazna = JSON.parse(rawdata);

	if (!args[0]) {
		if (!message.member.roles.cache.find(role => role.name === 'Чоколатье' || role.name === 'Админский Чоколат')) {
			message.reply('Казну может просматривать только король и приближенные к нему!');
			return;
		}
		message.reply(`В казне ${objKazna.Money} ЧокоЧипсеков`);
	}

	if (args[0] === 'забрать') {
		if (!message.member.roles.cache.find(role => role.name === 'Чоколатье')) {
			message.reply('Казну может забрать только король!');
			return;
		}


		const rawdata2 = fs.readFileSync('./GUILDS/' + message.guild.id + '/Score.json');
		const obj = JSON.parse(rawdata2);
		const new_User = obj['Users'].find(User => User.ID === message.author.id);

		if (new_User) {

			message.reply(`Забрал из казны ${objKazna.Money} ЧокоЧипсеков`);

			new_User.Score += objKazna.Money;
			objKazna.Money = 0;
			fs.writeFileSync(dir3 + '/Score.json', JSON.stringify(obj));
			fs.writeFileSync(dir3 + '/kazna.json', JSON.stringify(objKazna));
		}

	}



};
module.exports.help = {
	name: ['казна'],
	type: 'economy',
	desc: 'Посмотреть казну',
};