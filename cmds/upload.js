const show = require('../modules/upload.js');
const fs = require('fs');


async function something(url, message) {
	for (let i = 1; i < 10; i++) {
		await show.run(message, i);
	}

	let objects = fs.readFileSync(url);
	console.log('Done');
	objects = objects.toString().replace('][', ',');
	fs.writeFile(url, (objects));

}

module.exports.run = async (bot, message) => {
// let embed = new Discord.RichEmbed();
	let url = '';

	url = show.run(message, 1);
	// console.log(omg+"oleg");
	setTimeout(function() {
		something(url, message);
	}, 5000);


// await message.channel.send({embeds:[embed]});
};
module.exports.help = {
	name: 'upload',
	type: 'moderation',
	desc: 'Команда помощи',
};
