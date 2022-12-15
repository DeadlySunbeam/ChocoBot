const Discord = module.require('discord.js');
const fs = require('fs');

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}


module.exports.run = async (name, randomObject) => {
	let rawdata;
	const randomWord = ['animal', 'gif'];
	// console.log(random);

	if (randomObject == 0) {
		console.log('I have read URL');
		rawdata = fs.readFileSync('./URL/' + name + '/' + name + '_urls.json');
	}

	if (randomObject == 1) {
		console.log('I have read URL');
		rawdata = fs.readFileSync('./URL/' + name + '/' + name + '_urls_gif.json');
	}


	const urls = JSON.parse(rawdata);
	const rurls = getRandomInt(urls.length);
	console.log(name + ' urls = ' + rurls + ' from ' + randomWord[randomObject]);
	const embed = new Discord.EmbedBuilder()
		.setColor('#4169E1')
		.setImage(urls[rurls]);

	return embed;
};
