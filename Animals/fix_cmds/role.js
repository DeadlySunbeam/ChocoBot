/* eslint-disable no-mixed-spaces-and-tabs */
const { createCanvas, Image } = require('canvas');
const CanvasWidth = 1500;
const CanvasHeight = 810;
const canvas = createCanvas(CanvasWidth, CanvasHeight);
const ctx = canvas.getContext('2d');
const fs = require('fs');

function find(array, value) {
	// Эту функцию я нашел на каком-то ресурсе. Она ищет повторяющиеся значения в массиве. А-ля search_array() в php
	if (array.indexOf) {
		return array.indexOf(value);
	}

	for (let i = 0; i < array.length; i++) {
		if (array[i] === value) return i;
	}

	return -1;
}

module.exports.run = async (bot, message) => {
	const msg = await message.channel.send('Generating image...');


	// arr = fs.readFileSync("./modules/RoleList/result.txt", "utf8");
	let arr2 = fs.readFileSync('./modules/RoleList/OLD/result.txt', 'utf8');

	let arr = '';

	function compare(a, b) {
		if (a.name > b.name) return 1;
		// если первое значение больше второго
		if (a.name == b.name) return 0;
		// если равны
		if (a.name < b.name) return -1;
		// если первое значение меньше второго
	}

	const RoleObject = await message.guild.roles.cache.sort(compare);
	try {
		await RoleObject.sort();

		await RoleObject.forEach((item) => {
			if (item.name.search(/FURS.[А-я]+/g)) {arr += item.name + ',';}
		});
	}
	catch (e) {console.error(e);}

	// arr = arr.match(/[А-я]+ /g);
	arr = arr.toString();
	arr2 = arr2.toString();

	arr = arr.split(',');
	arr2 = arr2.split(',');

	const bak = new Image();
	bak.src = './modules/RoleList/bak.png';
	const NewIcon = new Image();
	NewIcon.src = './modules/RoleList/image/NEW_icon.png';
	const image = new Image();
	image.src = './modules/RoleList/image/OwO2.png';
	ctx.drawImage(image, 0, 0, CanvasWidth, CanvasHeight);
	ctx.globalAlpha = 0.2;
	ctx.fillStyle = ctx.createPattern(bak, 'repeat');
	ctx.fillRect(0, 0, 1800, 1000);
	ctx.globalAlpha = 1;
	let x = 0;
	let y = 0;
	ctx.shadowColor = '#000';
	ctx.shadowOffsetX = 5;
	ctx.shadowBlur = 5;
	ctx.font = '20px Impact';
	ctx.fillStyle = 'rgba(250, 250, 250, 0.8)';


	arr.forEach(function(value, i) {

		// eslint-disable-next-line max-statements-per-line
		if (i % 25 == 0 & i != 0) {y = 0; x++;}

		ctx.rotate(0);
		if (find(arr2, arr[i]) == -1) {
			ctx.globalAlpha = 0.8;
			ctx.drawImage(NewIcon, 30 + (320 * x) - 35, 30 + (30 * y), 50, 25);
			ctx.globalAlpha = 1;
		}
		ctx.fillText(value, 50 + (320 * x), 50 + (30 * y));

		y++;
	});

	const now = new Date();
	ctx.shadowOffsetX = 0;
	ctx.shadowBlur = 20;
	ctx.fillStyle = '#000000';
	ctx.globalAlpha = 0.2;
	ctx.fillRect(0, CanvasHeight - 30, CanvasWidth, 1000);
	ctx.fillStyle = '#FFFFFF';
	ctx.globalAlpha = 0.8;
	ctx.fillText(now, CanvasWidth - 220, CanvasHeight - 10);

	const imgeStream = canvas.toBuffer();
	await message.channel.send('Таблица со всеми ролями', {
		files:
            [
          		imgeStream,
            ],
	});
	await msg.delete();
// await message.delete();
};
module.exports.help = {
	name: 'role',
	type: 'info',
	desc: 'Посмотреть список всех ролей на сервере',
};
