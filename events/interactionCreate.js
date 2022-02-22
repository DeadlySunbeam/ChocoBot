const bot = require('../bot').bot;

bot.on('interactionCreate', interaction => {
	//	if (!interaction.isButton()) return;
	//	console.log(interaction);

	if (interaction.isContextMenu()) {


		const slashCommands = bot.slashCommands.get(interaction.commandName);
		if (slashCommands) { slashCommands.run(interaction); }
	}
});