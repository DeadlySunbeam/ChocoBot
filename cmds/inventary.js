const { createCanvas, Image, loadImage } = require('canvas');
const CanvasWidth = 1458;
const CanvasHeight = 1015;
const canvas = createCanvas(CanvasWidth, CanvasHeight);
const ctx = canvas.getContext('2d');
const fs = require('fs');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');


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

	const dir3 = './GUILDS/' + message.guild.id;
	let arr2 = [];


	if (!fs.existsSync(dir3 + '/Items.json')) {arr2 = 0;}
	else {
		const rawdata = fs.readFileSync('./GUILDS/' + message.guild.id + '/Items.json');
		const Member = JSON.parse(rawdata)['Users'].find(User => User.ID === MES_ID);
		if (Member) {arr2 = JSON.parse(rawdata)['Users'].find(User => User.ID === MES_ID)['Items'];}
		else {arr2 = 0;}
	}

	// const UserAvatar = new Image();
	// UserAvatar.src = message.author.displayAvatarURL({}).replace(".webp", ".jpg");
	// UserAvatar.onload = () =>
	// UserAvatar.onerror = err => { throw err; };

	const myimg = await loadImage(message.author.displayAvatarURL({}).replace(".webp", ".jpg"));
	async function Draw(startPos, currentItemCount) {

		const NewIcon = new Image();
		NewIcon.src = './modules/RoleList/image/NEW_icon.png';

		const image = new Image();
		const image2 = new Image();
		const crown = new Image();

		console.log(message.author.displayAvatarURL().replace(".webp", ".jpg"));

		image2.src = './items/chip.png';
		// image3.src = `https://mdn.mozillademos.org/files/5397/rhino.jpg`;

		// console.log(image3.src)
		image.src = './inventary.jpg';
		crown.src = './crown.png';

		ctx.drawImage(image, 0, 0, CanvasWidth, CanvasHeight);
		// ctx.drawImage(UserAvatar, 0, 0, 100, 100);

		const ImgW = 150;
		const ImgH = 150;
		const positionX = CanvasWidth - 240;
		const positionY = CanvasHeight - 350;

		ctx.drawImage(myimg, positionX, positionY, ImgW, ImgH);
		if (message.member.roles.cache.find(role => role.id == '416951239650050048')) ctx.drawImage(crown, positionX, positionY - 100, ImgW, ImgH - 50);
		//	console.log(canvas);

		items_count = 1;

		// console.log("awaw");

		if (arr2) {
			for (let iCount = 0, iPosition = currentItemCount ; iCount + iPosition < arr2.length + 1; iCount++) {
				image2.src = './items/' + arr2[iCount + iPosition - 1].ID + '.png';
				ctx.drawImage(image2, 40 + 182 * ((iCount) % 6), 40 + (198 * Math.floor((iCount) / 6)), 150, 150);
				items_count++;
			}
		}
		else {
			arr2 = ['1'];
		}
		ctx.globalAlpha = 1;
		// const x = 0;
		// const y = 0;
		ctx.shadowColor = '#000';
		ctx.shadowOffsetX = 0;
		ctx.shadowBlur = 0;
		ctx.font = '100px Mono';
		ctx.fillStyle = 'rgba(250, 250, 250, 0.9)';
		ctx.fillText(score, 1260 - align, 515);
		ctx.font = '80px Mono';
		ctx.fillText(`${Math.floor(startPos / 30) + 1}/${Math.floor(arr2.length / 30) + 1}`, 1270 - align / 2, 900);
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

		console.log(canvas);
		const imgeStream = canvas.toBuffer('image/jpeg', { quality: 0.50 });

		let aMessage = existed_mess;

		const backButton = 	new ButtonBuilder()
			.setCustomId('back')
			.setLabel('Назад')
			.setStyle(ButtonStyle.Primary)
			.setEmoji('<:left_arrow:855459246200193024>')
			.setDisabled(!(__start_pos > 29));

		const nextButton = new ButtonBuilder()
			.setCustomId('next')
			.setLabel('Вперед')
			.setStyle(ButtonStyle.Primary)
			.setEmoji('<:right_arrow:855459223763943424>')
			.setDisabled(!(items_count > 30));

		const closeButton = new ButtonBuilder()
			.setCustomId('close')
			.setLabel('Закрыть')
			.setStyle(ButtonStyle.Primary)
			.setEmoji('<:close:855470010947993631>');


		const row = new ActionRowBuilder()
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


			const rawdata3 = fs.readFileSync('./GUILDS/' + message.guild.id + '/Score.json');
			const obj2 = JSON.parse(rawdata3);
			const new_User2 = obj2['Users'].find(User => User.ID === MES_ID);
			score = new_User2.Score;


			console.log(nextButton);

			if (i.customId === 'back' && __start_pos > 29) {
				//	await aMessage.removeAttachments();
				await Draw(__start_pos - 30, __currentItemCount - 30);
			}

			if (i.customId === 'next' && items_count > 30) {
				//	await aMessage.removeAttachments();
				await Draw(__start_pos + 30, __currentItemCount + 30);

			}

			backButton.setDisabled(!(__start_pos > 29));
			nextButton.setDisabled(!(items_count > 31));


			row.setComponents(backButton, nextButton, closeButton);

			await i.update({ content: MES_REPLY,
				files:
							[
								canvas.toBuffer('image/jpeg', { quality: 0.50 }),
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

	let time = performance.now();


	const rawdata3 = fs.readFileSync('./GUILDS/' + message.guild.id + '/Score.json');
	const obj2 = JSON.parse(rawdata3);
	const new_User2 = obj2['Users'].find(User => User.ID === MES_ID);
	score = new_User2.Score;

	let score_p = score;
	let score_d = 0;


	while (score_p > 9) {
		score_p = score_p / 10;
		score_d++;
	}

	const align = score_d * 30;
	console.log(align);

	await Draw(1, 1);
	time = performance.now() - time;
	console.log('Время отрисовки: ', time);
	time = performance.now();
	sendInventory();
	time = performance.now() - time;
	console.log('Время отправки: ', time);
	time = performance.now();

	console.log(arr2.length + ' размер таблицы');


	await msg.delete();
// await message.delete();
};
module.exports.help = {
	name: ['сумка', 'рюкзак', 'мешок', 'инвентарь', 'вещи'],
	type: 'info',
	desc: 'Посмотреть в свою или чужую сумку',
};