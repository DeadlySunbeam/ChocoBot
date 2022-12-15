const fs = require('fs');


module.exports.run = async (bot, message, args) => {

	let toGet;

	try {

		toGet = message.guild.members.cache.get(args[0]) || message.mentions.members.first();

	}
	catch (error) {
		console.error(error);
	}

	if (args.length === 0) {
		message.reply('Пожалуйста укажите пользователя следующим образом ``!свергнуть @пользователь``');
		return;
	}

	if (toGet.id == message.author.id) {
		message.reply('Нельзя свергнуть себя');
		return;
	}

	if (!toGet) {
		message.reply('Такого пользователя не найдено');
		return;
	}

	try {

		if (!(toGet.roles.cache.find(role => role.name === 'Чоколатье'))) {
			await message.channel.send('У этого пользователя нет короны.'); return;
		}

	}
	catch (error) {
		console.log(error);
	}

	if (!(fs.existsSync('./GUILDS/' + message.guild.id + '/Items.json'))) {
		message.reply('Никто ничего не покупал на сервере. Будьте первым кто купит предмет!');
		return;
	}

	const dir3 = './GUILDS/' + message.guild.id;
	const rawdata = fs.readFileSync('./GUILDS/' + message.guild.id + '/Items.json');
	const obj = JSON.parse(rawdata);
	const new_User = obj['Users'].find(User => User.ID === message.author.id);

	const rawdata2 = fs.readFileSync('./items/Items.json');

	const bund_obj = JSON.parse(rawdata2);
	const bund_price = bund_obj['Items'].find(Item => Item.Name.toLowerCase() === 'бунд').Price;

	const rawdata3 = fs.readFileSync(dir3 + '/taxes.json');

	const tax_obj = JSON.parse(rawdata3);
	const tax_value = tax_obj.Tax;


	// target = args[0]

	let flag = 1;


	function item_kus() {
		if (new_User) {
			const item_array = new_User['Items'];
			item_array.forEach(element => {
				if (element.Name === 'Бунд' && flag) {
					message.channel.send(message.author.username + ' свергает ' + args[0] + ' и надевает корону');
					obj['Users'].find(User => User.ID === message.author.id)['Items'].splice(new_User['Items'].indexOf(element), 1);
					console.log(new_User['Items']);
					fs.writeFileSync(dir3 + '/Items.json', JSON.stringify(obj));
					toGet.roles.remove(['416951239650050048']);
					message.member.roles.add(['416951239650050048']);
					flag = 0;
				}
			});
		}
	}

	item_kus();

	const real_price = bund_price + bund_price * (tax_value / 100)

	if (flag) message.reply('У вас нет бунд набора, пожалуйста купите его в магазине через команду ``!купить бунд``. Его стоимость ' + real_price + ' ЧокоЧипсеков');

	// item_kus().then(res, err)

};


module.exports.help = {
	name: 'свергнуть',
	type: 'info',
	desc: 'Свергнуть короля',
};
