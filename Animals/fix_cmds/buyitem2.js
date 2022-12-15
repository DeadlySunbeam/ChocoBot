const fs = require('fs');
const Discord = module.require('discord.js');


module.exports.run = async (bot, message, args) => {

	type_of_item = 'Предмет';
	type_of_buy = 'куплен';

	// console.log(args);

	if (!args[0]) {

		// /////
		if (!fs.existsSync('./items/Items.json')) {arr = 0;}
		else {
			const rawdata = fs.readFileSync('./items/Items.json');
			arr = JSON.parse(rawdata)['Items'];
			console.log(arr);
		}
		// /////
		const items_count = 1;

		canbuyitems = ' ';

		arr.forEach(element => {
			if (element.Role) {canbuyitems += ` ${element.Role}${element.Emoji} -\t ${element.Price}<:Chipsik:847169552386359327> \n`;}
			else {canbuyitems += ` ${element.Name} -\t ${element.Price}<:Chipsik:847169552386359327> \n`;}
		});


		// ctx.fillText(arr[0].Name, 40, 250);

		// image.src = "./Tomato.png";
		// ctx.drawImage(image, 40, 40);


		const embed = new Discord.EmbedBuilder()
			.setAuthor({ name: message.author.username, iconURL: message.author.avatarURL() })
			.setDescription(`${canbuyitems}`)

		// .setThumbnail(message.author.image)
			.setColor('#4169E1')
			.setTitle('Вот что продается в магазине')
		// .setImage(message.author.avatarURL())
			.setFooter({ text: 'Кусь за бочок от ' + bot.users.cache.get('241850808960811008').username, iconURL: bot.users.cache.get('241850808960811008').avatarURL() });
		// .setImage(message.author.image);


		await message.reply({
			embeds:
                [
                	embed,
                ],
		});

		return;
	}

	const jsonStr = '{"Users":[]}';

	const dir3 = './GUILDS/' + message.guild.id;
	if (!fs.existsSync(dir3)) fs.mkdirSync(dir3);
	if (!fs.existsSync(dir3 + '/Items.json')) {fs.writeFileSync(dir3 + '/Items.json', jsonStr);}

	let rawdata = fs.readFileSync('./items/Items.json');
	obj = JSON.parse(rawdata);
	if (!obj) {
		message.reply('В магазине ничего нет');
	}

	search_item = '';

	if (args.length < 1) {search_item = arg[0];}

	else {
		args.forEach((element, index) => {
			if (index < args.length - 1) {search_item += element + ' ';}

			else {search_item += element;}
		});
	}

	search_item = search_item.replace('ё', 'е');

	console.log(search_item);

	const buyitem = obj['Items'].find(Item => Item.Name.toLowerCase() === search_item.toLowerCase());
	if (!buyitem) {
		message.reply('В магазине нет такого предмета, пожалуйста введите ``!купить``, чтобы глянуть все товары.');
		return;
	}

	// ///////////////////////////

	rawdata = fs.readFileSync('./GUILDS/' + message.guild.id + '/Items.json');
	obj = JSON.parse(rawdata);
	const new_User = obj['Users'].find(User => User.ID === message.author.id);
	if (new_User) {var User_Items = obj['Users'].find(User => User.ID === message.author.id)['Items'];}

	rawdata2 = fs.readFileSync('./GUILDS/' + message.guild.id + '/Score.json');
	obj2 = JSON.parse(rawdata2);
	const Score = obj2['Users'].find(User => User.ID === message.author.id).Score;

	function Buycheck() {

		youHave = 0;
		if (buyitem.Role) {
			type_of_item = 'Роль';
			type_of_buy = 'куплена';
			const promise = new Promise((resolve, reject) => {

				if (User_Items) {
					for (i = 0; i < User_Items.length; i++) {
						if (User_Items[i].Name.toLowerCase() === buyitem.Name.toLowerCase()) {
							message.reply(`У вас уже куплена эта роль, больше её покупать не надо. Введите \`!использовать ${buyitem.Name}\`, чтобы её надеть и \`!убрать ${buyitem.Name}\`, чтобы убрать`);
							youHave = 1;
							break;
						}
					}
				}
				resolve();
			});

		}


		if (youHave) return 0;

		if (Score < buyitem.Price) {
			message.reply('У вас недостаточно Чокочипсиков! Заработайте ещё ' + (buyitem.Price - Score) + ' ЧокоЧипсиков!'); return 0;
		}
		return 1;
	}

	async function buy() {
		if (new_User) {

			// console.log("Help")
			// new_Score = new_User.Score;
			obj['Users'].find(User => User.ID === message.author.id)['Items'].push({ 'ID': buyitem.ID, 'Name': buyitem.Name });
			// obj['Users'].find( User => User.ID === message.author.id).Date = new Date().getTime();
			message.reply(`**${type_of_item} ${search_item.toLowerCase()} успешно ${type_of_buy}!**`);


			// /////////////////

			if (type_of_item == 'Роль') {

				const request_mes = await message.channel.send(`${message.author}, Вы купили новую роль. Хотите её использовать?`);

				request_mes.react('👍').then(() => request_mes.react('👎'));

				const filter = (reaction, user) => {
					return ['👍', '👎'].includes(reaction.emoji.name) && user.id === message.author.id;
				};

				request_mes.awaitReactions({ filter, max: 1, time: 60000, errors: ['time'] })
					.then(collected => {
						const reaction = collected.first();

						if (reaction.emoji.name === '👍') {


							message.channel.send(`${message.author.username} теперь с ролью ${buyitem.Name}.`);
							message.member.roles.add([`${buyitem.RoleID}`]);

						}
						else {
							message.reply('Хорошо, вы в любое можете поставить эту роль, введя '`!использовать ${buyitem.Name}``! `);
						}
					})
					.catch(collected => {
						message.reply('Время ожидания истекло. Роль не удалось поставить!');
					});

			}

			// ////////////////


		}
		else {
			obj['Users'].push({ 'ID':message.author.id, 'Name':message.author.username, 'Items': [{ 'ID': buyitem.ID, 'Name': buyitem.Name }] });
			message.reply('**Предмет ' + args[0] + ' успешно куплен!**');
		}
	}
	// console.log(new_Score);
	//
	const checkingResult = Buycheck();
	if (checkingResult) {
		buy();
		obj2['Users'].find(User => User.ID === message.author.id).Score = Score - buyitem.Price;
		fs.writeFileSync(dir3 + '/Score.json', JSON.stringify(obj2));
		fs.writeFileSync(dir3 + '/Items.json', JSON.stringify(obj));
	}


};
module.exports.help = {
	name: ['купить', 'магазин'],
	type: 'info',
	desc: 'купить предмет в магазине, чтобы посмотреть магазин введите команду без параметров.',
};
