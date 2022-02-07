const fs = require('fs');

module.exports.run = async (bot, message) => {

	if (!(message.member.roles.cache.find(role => role.name === 'Чипированный'))) {
		await message.channel.send('У вас нигде нет чипа. Кусачки не нужны'); return;
	}

	if (!(fs.existsSync('./GUILDS/' + message.guild.id + '/Items.json'))) {
		message.reply('Никто ничего не покупал на сервере. Будьте первым кто купит предмет!');
		return;
	}

	const dir3 = './GUILDS/' + message.guild.id;
	const rawdata = fs.readFileSync('./GUILDS/' + message.guild.id + '/Items.json');
	const obj = JSON.parse(rawdata);
	const new_User = obj['Users'].find(User => User.ID === message.author.id);

	let flag = 1;


	function item_kus() {
		if (new_User) {
			const item_array = new_User['Items'];
			item_array.forEach(element => {
				if (element.Name === 'Кусачки' && flag) {
					message.channel.send(message.author.username + ' использует кусачки и снимает чип с себя.');
					obj['Users'].find(User => User.ID === message.author.id)['Items'].splice(new_User['Items'].indexOf(element), 1);
					console.log(new_User['Items']);
					fs.writeFileSync(dir3 + '/Items.json', JSON.stringify(obj));
					message.member.roles.remove(['784570869715566593']);
					flag = 0;
				}
			});
		}
	}

	item_kus();

	if (flag) message.reply('У вас нет кусачек, пожалуйста купите их в магазине через команду ``!купить кусачки``');

	// item_kus().then(res, err)

};


module.exports.help = {
	name: 'кусачки',
	type: 'info',
	desc: 'Снять с себя чип',
};
