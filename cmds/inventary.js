const { createCanvas, Image } = require('canvas');
const CanvasWidth = 1458;
const CanvasHeight = 1015;
const canvas = createCanvas(CanvasWidth, CanvasHeight);
const ctx = canvas.getContext('2d');
const fs = require('fs');
const { MessageActionRow, MessageButton } = require('discord.js');


module.exports.run = async (bot, message, args) => {

	const toGet = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

	let MES_ID = message.author.id;
	let MES_USER = message.author;
	let __start_pos;
	let __currentItemCount;
	let items_count;

	if (toGet) {
		MES_ID = toGet.id;
		MES_USER = toGet;
	}

	if (message.channel.guild === undefined) {
		message.channel.send('Пожалуйста открывайте сумку на сервере');
		return;
	}
	const msg = await message.channel.send('Заглядываем в сумку...');

	let score = 0;
	let rawdata = fs.readFileSync('./GUILDS/' + message.guild.id + '/Score.json');
	const obj = JSON.parse(rawdata);
	const new_User = obj['Users'].find(User => User.ID === MES_ID);
	const dir3 = './GUILDS/' + message.guild.id;
	let arr2 = [];


	if (!fs.existsSync(dir3 + '/Items.json')) {arr2 = 0;}
	else {
		rawdata = fs.readFileSync('./GUILDS/' + message.guild.id + '/Items.json');
		const Member = JSON.parse(rawdata)['Users'].find(User => User.ID === MES_ID);
		if (Member) {arr2 = JSON.parse(rawdata)['Users'].find(User => User.ID === MES_ID)['Items'];}
		else {arr2 = 0;}
	}

	if (new_User) score = new_User.Score;

	let score_p = score;
	let score_d = 0;


	while (score_p > 9) {
		score_p = score_p / 10;
		score_d++;
	}

	const align = score_d * 30;
	console.log(align);


	async function Draw(startPos, currentItemCount) {

		const NewIcon = new Image();
		NewIcon.src = './modules/RoleList/image/NEW_icon.png';

		const image = new Image();
		const image2 = new Image();


		image2.src = './items/chip.png';
		// image3.src = `https://mdn.mozillademos.org/files/5397/rhino.jpg`;

		// console.log(image3.src)
		image.src = './inventary.jpg';
		ctx.drawImage(image, 0, 0, CanvasWidth, CanvasHeight);


		items_count = 1;

		// console.log("awaw");

		if (arr2) {
			for (let iCount = 0, iPosition = currentItemCount ; iCount + iPosition < arr2.length + 1; iCount++) {
				image2.src = './items/' + arr2[iCount + iPosition - 1].ID + '.png';
				ctx.drawImage(image2, 40 + 182 * ((iCount) % 6), 40 + (198 * Math.floor((iCount) / 6)));
				items_count++;
			}
		}
		// arr2.forEach( (element,index = 2) => {

		// image2.src = "./items/"+element.ID+".png";
		// ctx.drawImage(image2, 40+182*((index)%6), 40+(198*Math.floor((index)/6)))
		// items_count++;
		// });


		// image.src = "./Tomato.png";
		// ctx.drawImage(image, 40, 40);

		// image.src = "./Tomato.png";
		// ctx.drawImage(image, 40+182, 40);

		// image.src = "./Tomato.png";
		// ctx.drawImage(image, 40+182+182, 40);

		// image.src = "./Tomato.png";
		// ctx.drawImage(image, 40+182+182+182, 40);

		// image.src = "./Tomato.png";
		// ctx.drawImage(image, 40+182+182+182+182, 40);

		// image.src = "./Tomato.png";
		// ctx.drawImage(image, 40+182+182+182+182+182, 40);

		// image.src = "./Tomato.png";
		// ctx.drawImage(image, 40, 40+195);

		// image.src = "./Tomato.png";
		// ctx.drawImage(image, 40, 40+195+195);

		// ctx.globalAlpha = 0.1
		// ctx.fillStyle = ctx.createPattern(bak, "repeat");
		// ctx.fillRect(0, 0, 1800, 1000);
		ctx.globalAlpha = 1;
		// const x = 0;
		// const y = 0;
		ctx.shadowColor = '#000';
		ctx.shadowOffsetX = 0;
		ctx.shadowBlur = 0;
		ctx.font = '100px Mono';
		ctx.fillStyle = 'rgba(250, 250, 250, 0.9)';
		ctx.fillText(score, 1260 - align, 515);
		ctx.font = '30px ';
		ctx.fillStyle = 'rgba(250, 250, 250, 0.9)';
		ctx.fillText('Всего ЧокоЧипсиков:', 1120, 410);

		__start_pos = startPos;
		__currentItemCount = currentItemCount;

	}


	async function sendInventory(existed_mess) {


		let MES_REPLY = '';

		if (MES_ID == message.author.id) {MES_REPLY = 'Ваша сумка';}
		else {
			MES_REPLY = 'Сумка ' + MES_USER.user.username;
		}
		const imgeStream = canvas.toBuffer();

		let aMessage = existed_mess;

		const backButton = 	new MessageButton()
			.setCustomId('back')
			.setLabel('Назад')
			.setStyle('PRIMARY')
			.setEmoji('<:left_arrow:855459246200193024>')
			.setDisabled(!(__start_pos > 29));

		const nextButton = new MessageButton()
			.setCustomId('next')
			.setLabel('Вперед')
			.setStyle('PRIMARY')
			.setEmoji('<:right_arrow:855459223763943424>')
			.setDisabled(!(items_count > 30));

		const closeButton = new MessageButton()
			.setCustomId('close')
			.setLabel('Закрыть')
			.setStyle('PRIMARY')
			.setEmoji('<:close:855470010947993631>');


		const row = new MessageActionRow()
			.addComponents(
				backButton,
				nextButton,
				closeButton,
			);

		if (!aMessage) {
			aMessage = await message.reply(
				{ content:MES_REPLY,
					components:[row],
					files:
							[
								imgeStream,
							],
				});


			// aMessage.react('<:left_arrow:855459246200193024>');


			// aMessage.react('<:right_arrow:855459223763943424>');


			// aMessage.react('<:close:855470010947993631>');

		}
		else {

			const userReactions = aMessage.reactions.cache.filter(reaction => reaction.users.cache.has(message.author.id));
			for (const reaction of userReactions.values()) {
				await reaction.users.remove(message.author.id);


			}
		}

		const filter = i => i.message.id === aMessage.id && i.user.id === message.author.id;

		const collector = message.channel.createMessageComponentCollector({ filter });

		collector.on('collect', async i => {


			console.log(nextButton);

			if (i.customId === 'back' && __start_pos > 29) {
				await aMessage.removeAttachments();
				await Draw(__start_pos - 30, __currentItemCount - 30);
			}

			if (i.customId === 'next' && items_count > 30) {
				await aMessage.removeAttachments();
				await Draw(__start_pos + 30, __currentItemCount + 30);

			}

			backButton.setDisabled(!(__start_pos > 29));
			nextButton.setDisabled(!(items_count > 30));


			row.setComponents(backButton, nextButton, closeButton);

			await i.update({ content: MES_REPLY,
				files:
							[
								canvas.toBuffer(),
							], components: [row] });

			if (i.customId === 'close') {
				aMessage.delete();
			}
		});

		collector.on('end', collected => console.log(`Collected ${collected.size} items`));


		// const filter = (reaction, user) => {
		// 	return (reaction.emoji.name === 'right_arrow' || reaction.emoji.name === 'left_arrow' || reaction.emoji.name === 'close') && user.id === message.author.id;
		// };


		// aMessage.awaitReactions({ filter, max: 1 })
		// 	.then(collected => {
		// 		const reaction = collected.first();


		// 		if (reaction.emoji.name === 'left_arrow' && __start_pos > 29) {
		// 			Draw(__start_pos - 30, __currentItemCount - 30);
		// 		}

		// 		if (reaction.emoji.name === 'right_arrow' && items_count > 30) {
		// 			Draw(__start_pos + 30, __currentItemCount + 30);
		// 		}

		// 		sendInventory(aMessage);

		// 		if (reaction.emoji.name === 'close') {
		// 			aMessage.delete(); return;
		// 		}

		// 		aMessage.removeAttachments();
		// 		aMessage.edit(
		// 			{ content:MES_REPLY,
		// 				files:
		// 						[
		// 							canvas.toBuffer(),
		// 						],
		// 			});

		// 	})
		// 	.catch(console.error);


		// return aMessage;
	}


	await Draw(1, 1);
	sendInventory();

	console.log(arr2.length + ' размер таблицы');


	await msg.delete();
// await message.delete();
};
module.exports.help = {
	name: ['сумка', 'рюкзак', 'мешок', 'инвентарь', 'вещи'],
	type: 'info',
	desc: 'Посмотреть в свою или чужую сумку',
};