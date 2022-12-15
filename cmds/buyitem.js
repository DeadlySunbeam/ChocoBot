const fs = require('fs');
const { createCanvas, Image } = require('canvas');
const CanvasWidth = 1458;
const CanvasHeight = 1215;
const canvas = createCanvas(CanvasWidth, CanvasHeight);
const ctx = canvas.getContext('2d');
const distance = 350;
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');


let arr;


module.exports.run = async (bot, message, args) => {

	const dir3 = './GUILDS/' + message.guild.id;

	if (!fs.existsSync(dir3 + '/taxes.json')) {fs.writeFileSync(dir3 + '/taxes.json', '{"Tax":20}');}

	const tax = JSON.parse(fs.readFileSync(dir3 + '/taxes.json')).Tax;

	//	console.log(tax);

	let type_of_item = 'Предмет';
	let type_of_buy = 'куплен';

	// console.log(args);

	if (!args[0] || Number.isInteger(parseInt(args[0]))) {

		let items_count = 1;

		let start_count = 0;

		if (!fs.existsSync('./items/Items.json')) { arr = 0;}
		else {
			const rawdata = fs.readFileSync('./items/Items.json');
			arr = JSON.parse(rawdata)['Items'];
			//	console.log(arr);
		}
		let time;
		async function PicDrawing(page) {
		time = performance.now();

			const image = new Image();
image.src = './market.png';
ctx.drawImage(image, 0, 0, CanvasWidth, CanvasHeight);
ctx.font = '60px impact';
ctx.textAlign = 'center';
ctx.fillStyle = 'rgba(250, 250, 250, 0.9)';

			// /////

			// /////

			// if (Number.isInteger(parseInt(args[0])) && args[0] > 0) start_count = (args[0] - 1) * 16;

			start_count = (page - 1) * 16;

			for (let i = start_count; i < arr.length && items_count < 17; i++) {
				image.src = './items/' + arr[i].ID + '.png';
				// ctx.drawImage(image, 40+182*((items_count-1)%6), 40+(198*Math.floor((items_count-1)/6)));
				ctx.drawImage(image, 70 + distance * ((items_count - 1) % 4), 40 + (280 * Math.floor((items_count - 1) / 4)), 150, 150);

				//	ctx.shadowColor = '#333';
				//	ctx.shadowOffsetX = 2;

				const FinalPrice = arr[i].Price + Math.floor(arr[i].Price * (tax / 100)) ;
				//	console.log(FinalPrice);

				ctx.fillText(arr[i].Name, 145 + distance * ((items_count - 1) % 4), 250 + (280 * Math.floor((items_count - 1) / 4)));

				ctx.fillText(FinalPrice.toString(), (145 + distance * ((items_count - 1) % 4)), 310 + (280 * Math.floor((items_count - 1) / 4)));
				
				//	console.log(FinalPrice);
				//	ctx.shadowOffsetX = 0;

				items_count++;
			}

			
		}


		let drawPage = 1;
		if (Number.isInteger(parseInt(args[0])) && args[0] > 0) drawPage = args[0];

		const backButton = 	new ButtonBuilder()
			.setCustomId('back')
			.setLabel('Назад')
			.setEmoji('<:left_arrow:855459246200193024>')
			.setStyle(ButtonStyle.Primary)
			.setDisabled(drawPage == 1);

		const nextButton = new ButtonBuilder()
			.setCustomId('next')
			.setLabel('Вперед')
			.setEmoji('<:right_arrow:855459223763943424>')
			.setStyle(ButtonStyle.Primary)
			.setDisabled(drawPage * 16 > arr.length);

		const closeButton = new ButtonBuilder()
			.setCustomId('close')
			.setLabel('Закрыть')
			.setEmoji('<:close:855470010947993631>')
			.setStyle(ButtonStyle.Primary);


		const row = new ActionRowBuilder()
			.addComponents(
				backButton,
				nextButton,
				closeButton,
			);


		// ctx.fillText(arr[0].Name, 40, 250);

		// image.src = "./Tomato.png";
		// ctx.drawImage(image, 40, 40);


		PicDrawing(drawPage);

		time = performance.now() - time;
		console.log('Время отрисовки: ', time);
		time = performance.now();
		const imgeStream = canvas.toBuffer('image/jpeg', { quality: 0.25, progressive: false, chromaSubsampling: false});


		time = performance.now() - time;
		console.log('Время формирования буфера: ', time);
		time = performance.now();

		const buyMessage = await message.reply({ content:'Вот что продается в магазине',
			components:[row],
			files:
				[
					imgeStream,
				],
		});

		time = performance.now() - time;
		console.log('Время отправки: ', time);
		console.log('____________________');

		const filter = i => i.message.id === buyMessage.id && i.user.id === message.author.id;

		const collector = message.channel.createMessageComponentCollector({ filter });

		collector.on('collect', async i => {
			if (i.customId === 'close') {
				buyMessage.delete();
			}

			items_count = 1;


			if (i.customId === 'next') {
				drawPage++;
			}

			if (i.customId === 'back') {
				drawPage--;
			}

			backButton.setDisabled(drawPage == 1);
			nextButton.setDisabled(drawPage * 16 > arr.length);

			// console.log(drawPage);

			// await buyMessage.removeAttachments();

			PicDrawing(drawPage);
			// console.log(`${arr.length} = ${(drawPage)*16}`);

			const updateStream = canvas.toBuffer('image/jpeg', { quality: 0.25 });

			await i.update({ content: 'Вот что продается в магазине',
				files:
							[
								updateStream,
							], components: [row] });

		});


		return;
	}


	const jsonStr = '{"Users":[]}';


	if (!fs.existsSync(dir3)) fs.mkdirSync(dir3);
	if (!fs.existsSync(dir3 + '/Items.json')) {fs.writeFileSync(dir3 + '/Items.json', jsonStr);}

	let rawdata = fs.readFileSync('./items/Items.json');
	let obj = JSON.parse(rawdata);
	if (!obj) {
		message.reply('В магазине ничего нет');
	}

	let search_item = '';

	if (args.length < 1) {search_item = args[0];}

	else {
		args.forEach((element, index) => {
			if (index < args.length - 1) {search_item += element + ' ';}

			else {search_item += element;}
		});
	}

	search_item = search_item.replace('ё', 'е');

	//	console.log(search_item);

	const buyitem = obj['Items'].find(Item => Item.Name.toLowerCase() === search_item.toLowerCase());
	if (!buyitem) {
		message.reply('В магазине нет такого предмета, пожалуйста введите ``!купить``, чтобы глянуть все товары.');
		return;
	}

	// ///////////////////////////
	let User_Items;

	rawdata = fs.readFileSync('./GUILDS/' + message.guild.id + '/Items.json');
	obj = JSON.parse(rawdata);
	const new_User = obj['Users'].find(User => User.ID === message.author.id);
	if (new_User) { User_Items = obj['Users'].find(User => User.ID === message.author.id)['Items'];}

	const rawdata2 = fs.readFileSync('./GUILDS/' + message.guild.id + '/Score.json');
	const obj2 = JSON.parse(rawdata2);
	const Score = obj2['Users'].find(User => User.ID === message.author.id).Score;

	function Buycheck() {

		let youHave = 0;
		if (buyitem.Role) {
			type_of_item = 'Роль';
			type_of_buy = 'куплена';
			new Promise((resolve) => {

				if (User_Items) {
					for (let i = 0; i < User_Items.length; i++) {
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

		if (Score < Number.parseInt(buyitem.Price) + Number.parseInt(Math.floor(buyitem.Price * (tax / 100)))) {
			message.reply('У вас недостаточно Чокочипсиков! Заработайте ещё ' + (Number.parseInt(buyitem.Price) + Number.parseInt(Math.floor(buyitem.Price * (tax / 100))) - Number.parseInt(Score)) + ' ЧокоЧипсиков!'); return 0;
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
					.catch(() => {
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

		const kaznaObj = {};
		kaznaObj['Money'] = Math.floor((buyitem.Price * (tax / 100)));

		if (!fs.existsSync(dir3 + '/kazna.json')) {fs.writeFileSync(dir3 + '/kazna.json', JSON.stringify(kaznaObj));}

		const rawdataKazna = fs.readFileSync('./GUILDS/' + message.guild.id + '/kazna.json');
		const kazna = JSON.parse(rawdataKazna);
		kazna['Money'] += kaznaObj['Money'];


		buy();
		obj2['Users'].find(User => User.ID === message.author.id).Score = Score - buyitem.Price - Math.floor(buyitem.Price * (tax / 100));
		fs.writeFileSync(dir3 + '/Score.json', JSON.stringify(obj2));
		fs.writeFileSync(dir3 + '/Items.json', JSON.stringify(obj));
		fs.writeFileSync(dir3 + '/kazna.json', JSON.stringify(kazna));
	}


};
module.exports.help = {
	name: ['купить', 'магазин'],
	type: 'economy',
	desc: 'купить предмет в магазине, чтобы посмотреть магазин введите команду без параметров.',
};
