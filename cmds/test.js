const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js/node_modules/discord-api-types/v10');
const { token } = require('../BotSettings.json');

const rest = new REST({ version: '10' }).setToken('token');


const fs = require('fs');
const https = require('https');
module.exports.run = async (bot, message) => {

	const rest = new REST({ version: '10' }).setToken(token);

	try {
		await rest.post(Routes.channelMessages('785679053939671100'), {
			body: {
				
				"content": "This is a message with components",
				"components": [
						{
								"type": 1,
								"components": [
										{
												"type": 2,
												"label": "Click me!",
												"style": 3,
												"custom_id": "click_one"
										}
								]
		
						}
				]

			},
		});
	} catch (error) {
		console.error(error);
	}
	



};
module.exports.help = {
	name: 'tested',
	type: 'admin',
	desc: 'Команда помощи',
};
