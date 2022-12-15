const bot = require('../bot').bot;
const { InteractionType } = require('discord.js');

bot.on('interactionCreate', interaction => {
	//	if (!interaction.isButton()) return;
	//	console.log(interaction);

	if (interaction.type === InteractionType.MessageComponent) {


		const slashCommands = bot.slashCommands.get(interaction.commandName);
		if (slashCommands) { slashCommands.run(interaction); }
	}
});