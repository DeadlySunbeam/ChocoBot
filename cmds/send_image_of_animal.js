const Discord = module.require('discord.js');
const show = require('../modules/show.js');
const fs = require('fs');

const animalDir = './Animals/animals.json';
const rawdata = fs.readFileSync(animalDir);

const obj = JSON.parse(rawdata);
const animals = obj.all;

const commands = [];
const folders = [];
const animal_search = [];

animals.forEach((element, index) => {
	animal_search[index] = element.command;
	commands[index] = element.command;
	folders[index] = element.folder;
});

commands.push('животное');

console.log(commands);
console.log(folders);

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

module.exports.run = async (bot, message) => {

	let indexOfAnimal = animal_search.findIndex(i => i == message.content.substr(1));

	if (!folders[indexOfAnimal]) { indexOfAnimal = getRandomInt(animal_search.length); }

	let embed = new Discord.EmbedBuilder();
	embed = await show.run(folders[indexOfAnimal], getRandomInt(2));
	await message.channel.send({ embeds:[embed] });
	console.log(message.content.substr(1));
};
module.exports.help = {
	name: commands,
	type: 'image',
	desc: 'Прислать картинку животного',
};
