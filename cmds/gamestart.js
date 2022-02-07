// Игра разборка в джунглях
const Discord = module.require('discord.js');
const one = ':1_:699312584377106523';
const two = ':2_:699312584255602820';
const three = ':3_:699312584121122859';
const four = ':4_:699312584326905897';
const five = ':5_:699312584339226674';
const six = ':6_:699312585186476063';
const seven = ':7_:699312584653930527';
const eight = ':8_:699312584133705739';
const nine = ':9_:699312584410529792';
const ten = ':10_:699312584515387482';
const eleven = ':11_:699312584284831764';
const twelve = ':12_:699312584121253920';
const thereteen = ':13_:699312584112734241';
const fourteen = ':14_:699312584465317908';
const fiveteen = ':15_:699312584444346598';
const accept = ':agree2:699330333467869261';
const numbers = [one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, thereteen, fourteen, fiveteen];


module.exports.run = async (bot, message) => {

	const embed = new Discord.RichEmbed()
	// .setAuthor(message.author.username, message.author.avatarURL)
		.setDescription('Добро пожаловать в Джунгли! Здесь звери жили в мире, пока на них не напали голодные львы и другие хищники. ' +
      'Пока набираем игроков для игры. Максимум может участвовать 10 игроков.');

	// .setThumbnail(message.author.image)
	// .setColor('#4169E1')
	// .setTitle("Аватар пользователя")
	// .setImage(message.author.avatarURL)
	// .setFooter("Кусь за бочок от "+bot.users.get("241850808960811008").username, bot.users.get("241850808960811008").avatarURL)
	// .setImage(message.author.image);
	const msg = await message.channel.send({ embeds:[embed] });

	try {


		await msg.react(accept);

	}
	catch (error) {console.error('One of emoji is failed to react');}

	for (let i = 0; i < 15; i++) {await msg.react(numbers[i]);}
};
module.exports.help = {
	name: 'рд.игра',
	type: 'game',
	desc: 'Команда помощи',
};