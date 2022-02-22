/* eslint-disable no-inner-declarations */
const bot = require('../bot').bot;
const fs = require('fs');

bot.on('messageReactionRemove', async (reaction, user) => {

	const embed_arr = JSON.parse(fs.readFileSync('./GUILDS/' + reaction.message.guild.id + '/embed'));

	if (user.bot) return;
	const mes_id = JSON.parse(fs.readFileSync('./GUILDS/' + reaction.message.guild.id + '/assigned_role.json'));

	mes_id.forEach(element => {

		if (reaction.message.id === element.MESSAGE_ID) {
			// let go_role = await bot.guilds.cache.get(reaction.message.guild.id).members.cache.get(user.id).roles.cache.find(role =>  role.name === 'News-Notifications')
			// let go_user = await bot.guilds.cache.get(reaction.message.guild.id).members.cache.get(user.id).roles.cache;

			function delay() {
				return new Promise(resolve => setTimeout(resolve, 300));
			}

			async function processArray(array) {
				// делаем "map" массива в промисы
				const promises = array.map(delayedLog);
				// ждем когда всё промисы будут выполнены
				await Promise.all(promises);
				// console.log('Done!');
			}

			async function delayedLog(item) {
				// мы можем использовать await для Promise
				// который возвращается из delay
				await delay();

				for (let i = 0; i < item.data.length; i++) {
					// const element = array[i];

					if (reaction.emoji.id === item.data[i][0] || reaction.emoji.name === item.data[i][0]) {reaction.message.guild.members.cache.get(user.id).roles.remove(item.data[i][1].role);}
				}
			}


			processArray(embed_arr);

		}

	});

});