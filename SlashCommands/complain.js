const fs = require ('fs');


module.exports.run = async (inter) => {

	const message = inter.channel.messages.cache.get(inter.targetId);


	fs.appendFileSync(`./GUILDS/${inter.guildId}/complain.json`, JSON.stringify({ 'COMPLAIN_FROM_ID': inter.member.id, 'COMPLAIN_FROM_USER': inter.member.nickname, 'text': message.content, 'url':message.url, 'TARGET_ID': message.author.id }) + ',\n');

	const compainChannel = await inter.guild.channels.cache.get('932357913153011762');

	let complainReason = 'Ожидаем причину жалобы';

	const complainMessage = await compainChannel.send(`
1. ${message.author.username}(${message.author.id})
2. ${complainReason}
3. ${message.url}\n
	`);


	const botMessage = await inter.member.send('Пожалуйста укажите тут причину жалобы:');

	const userChannel = botMessage.channel;


	//	const ComplainFrom = bot.users.cache.get(inter.user.id);

	inter.reply({ content:'Укажите причину жалобы в личке бота', ephemeral:true });

	console.log(userChannel);

	const filter = m => m.author.id === inter.user.id;

	userChannel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] })
		.then(collected => {
			//	console.log("HELLO");
			userChannel.send('Спасибо, мы рассматриваем вашу жалобу!');

			complainReason = collected.first().content;
			complainMessage.edit(`
1. ${message.author.username}(${message.author.id})
2. ${complainReason}
3. ${message.url}\n
			`);
		})
		.catch(collected => {
			userChannel.send('Вы не указали причину. ');
			return collected;
		});

};

module.exports.help = {
	name: 'Жалоба',
};