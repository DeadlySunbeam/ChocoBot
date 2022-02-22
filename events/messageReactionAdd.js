/* eslint-disable no-inner-declarations */
const bot = require('../bot').bot;
const fs = require('fs');

bot.on('messageReactionAdd', async (reaction, user) => {

	if (user.bot) return;
	const mes_id = JSON.parse(fs.readFileSync('./GUILDS/' + reaction.message.guild.id + '/assigned_role.json'));

	mes_id.forEach(element => {


		if (reaction.message.id === element.MESSAGE_ID) {
			// notif_role = reaction.message.guild.roles.cache.find(role =>  role.name === 'News-Notifications');

			const embed_arr = JSON.parse(fs.readFileSync('./GUILDS/' + reaction.message.guild.id + '/embed'));

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
					// console.log("ОТРЕАГИРОВАЛ С " + item.data[i][0])


					if (reaction.emoji.id === item.data[i][0] || reaction.emoji.name === item.data[i][0]) {
						if (item.data[i][1].target != null) {
							for (let j = 0; j < item.data.length; j++) {
								if (item.data[j][1].target != null) {
									if (item.data[j][1].target == item.data[i][1].target && reaction.message.guild.members.cache.get(user.id).roles.cache.some(role => role.id == item.data[j][1].role)) {
										console.log(item.data[j][0]);
										reaction.message.guild.members.cache.get(user.id).roles.remove(item.data[j][1].role);
									}
								}

							}
						}
						reaction.message.guild.members.cache.get(user.id).roles.add(item.data[i][1].role);

					}
				}
			}


			processArray(embed_arr);

			reaction.message.guild.members.cache.get(user.id).fetch(user.id);
		}

	});

});