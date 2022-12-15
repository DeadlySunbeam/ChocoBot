const bot = require('../bot').bot;
const Channels = require('../bot').Channels;
const fs = require('fs');
const botSettings = require('../BotSettings.json');
const { Collection } = require('discord.js');
const prefix = botSettings.prefix;
const permission = new Collection;

const ChocoAnswers = [
	'Не Чокай мне тут! В этом королевстве Чоко должно произноситься с уважением!',
	'Что ты хотел? Я тут вместо Чоко',
	'Чоко, чоко, чоко, чоко. Бррр, нет тут Чоко!',
	'Погода в Чокории дождливая, ты теперь весь в **Чоко**ладе, хе-хе',
];

const HelloAnswers = [
	'Привествую, путник, куда путь держишь?',
	'О, смотри кто тут у нас. Как поживаешь? :)',
	'Привет! Я долго тебя ждал, целую ночь думал только о тебе!',
	'Здря, чем сегодня меня удивишь?',
	'Доброго дня, гражданин №' + getRandomInt(999) + ', как ваши дела?',
];

const Facts = [
	'Шоколад был валютой во времена Майя. Чокорию можно считать возрождением цивилизации Майя',
	'В тёмном шоколаде много антиоксидантов.  Ежедневное употребление 100 г шоколада значительно снижает риск сердечных заболеваний.',
	'**Слово «шоколад» происходит от ацтекского слова «чоколатль»**\n«Чоколатль» переводится как «горькая вода». В те времена не было сахара, поэтому вкус у шоколада был в древности совершенно другим.',
	'**Какао было изобретено на Ямайке в начале 1700-х годов**\nНапиток какао впервые сделал ирландский ботаник Ханс Слоан на Ямайке. Местные жители дали ему какао-бобы. Он смешал их с молоком, чтобы утолить жажду. Так и получилось какао.',
	'**На самом деле есть четыре вида шоколада**\nНекоторые люди думают, что существует только тёмный, молочный и белый шоколад. Но есть ещё и белокурый шоколад, который был создан случайно. В белокуром шоколаде 32% какао. На вкус он немного маслянистый. ',
	'**Белый шоколад и вовсе не шоколад**\nБелый шоколад содержит масло какао, но в нём нет какао-порошка. Это масло не очень вкусное, поэтому в него добавляют молочный жир, ваниль и сахар',
	'**Шоколад имеет более 600 ароматов**\nШоколад содержит более 600 ароматических соединений, подсчитали в Американском химическом обществе. Например, в красном вине их только около 200.',
	'**Печенье с шоколадом было изобретено случайно**.\nАмериканка Рут Грейвс Уэйкфилд приготовила печенье случайно в 1930-ых годах. Она хотела накормить выпечкой гостей отеля Toll House Inn. Вместо масла она добавила шоколад. Так и получилось популярное лакомство.',
	'**Шоколадный батончик изобретён в 1847 году**\nЕго создал Джосеф Фрай вместе с сыном. Первый батончик состоял из какао-масла, какао-порошка и сахара.',
	'**Самая дорогая шоколадка в мире была продана за 687 долларов (40 тысяч рублей)**\nЭто был шоколадный батончик Кэдбери. Его уникальность в том, что он в 1901 году побывал вместе с Робертом Скоттом в первой американской экспедиции в Антарктиду. На момент продажи шоколадке было 100 лет. ',
	'**Больше половины шоколада съедают в Европе**\nОб этом говорят данные журнала Форбс. Крупнейшими странами-потребителями являются Швейцария, Германия и Ирландия.\n||(https://www.forbes.com/sites/niallmccarthy/2015/07/22/the-worlds-biggest-chocolate-consumers-infographic/?sh=5af673684484)||',
	'**Известные конфеты назвали «поцелуями» из-за звука машин**\n«Поцелуи» от Hershey"s назвали так из-за того, что машина, которая штампует конфеты, издаёт звук, похожий на поцелуй.',
	'**Шоколад Milky Way назван не в честь Млечного Пути**\nПроизводители известного шоколада на своей странице в Фейсбук призывают не связывать название их батончика с Млечным Путём. Шоколад назван в честь молочного коктейля, который имеет похожий вкус.',
	'**Батончик Snickers назвали в честь лошади**\nСемья Марс, которая основала одноимённую компанию, назвала свой шоколадный батончик Snickers в честь своей любимой лошади, которая носила это имя.',
	'**Компания Nestle сначала продавала молоко**\nNestle — один из крупнейших производителей шоколада в мире. Они были основаны в 1800-ых годах в Швейцарии и начинали с продажи молока. Только потом занялись шоколадом.',
	'**Конфеты M&M’s были в космосе больше 130 раз**\nШоколадные драже — любимое лакомство американских астронавтов во время их космических экспедиций.',
	'**Фильм «Вилли Вонка и шоколадная фабрика» был профинансирован производителем конфет**\nФильм был создан в 1971 году (не путайте его с «Чарли и шоколадная фабрика»). Его финансировал производитель шоколада, чтобы продвигать новый баточник «Вонка».',
	'**Запах шоколада в магазинах увеличивает продажи**\nСогласно данным Журнала психологии окружающей среды, аромат шоколада увеличивает продажи в магазинах.',
];

const Jokes = [
	'Мужчина в браке подобен мухе, севшей на липкую бумагу — и сладко, и скучно и улететь нельзя.',
	'Я, конечно, на диете, но не настолько, чтобы прям не есть сладкое, а типа настолько, чтобы переживать об этом, когда его ем.',
	'Ничто так не снимает сонливость, как чашечка крепкого сладкого горячего кофе, выплеснутая на живот…',
	'Шоколад поднимает настроение. До тех пор, пока не встанешь на весы.',
	'Хочу шоколадный шоколад с шоколадом в шоколаде.',
	'— На чужом несчастье счастья не построишь!\n— Да не ел я твою шоколадку!',
	'В магазине:\n — А эта шоколадка свежая?\n — Свежей некуда.\n — Так она изготовленная в декабре, а сейчас — октябрь?\n — Прикинь… из будущего!',
];

const Remembered = [
	'О, я тут кое-что вспомнил:\n\n',
	'Ой, ты что-то сказал? А, не важно, у меня есть вещь получше:\n\n',
	'У тебя нет мелочи? Мне до Бунд набора не хватает. Давай что-то расскажу за 10 тысяч ЧокоЧипсков? Вот, держи:\n\n',
	'Чоко меня тут запер в пластиковой коробке! Спасите, кто может! О, ты тут, так слушай сюда, вот передай эти знания другим\n\n',
	'В Чокории так жарко, я не выношу это. Уже даже бредить начинаю. Но не суть, я тут кое-что вспомнил, думаю тебе интересно:\n\n',
	'Текущий король меня не устраивает, шутам мало платят, приходится подрабатывать тут. Вот зацени это:\n\n',
];


function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}


bot.on('messageCreate', async message => {


	if (message.author.bot) return;

	const GuildDir = `./GUILDS/${message.guild.id}`;

	// Модуль под предложения

	if (!fs.existsSync(GuildDir)) fs.mkdir(GuildDir);

	const SuggestFile = GuildDir + '/SuggestionsChannel.json';

	if (fs.existsSync(SuggestFile)) {
		const rawSuggestData = fs.readFileSync(SuggestFile);
		const SuggestData = JSON.parse(rawSuggestData);

		if (message.channel.id == SuggestData.ID) {

			await message.startThread({ name:'Предложение от ' + message.author.username });
			await message.react('👍');
			await message.react('👎');

		}

		const UserText = message.content.toLowerCase();


		if ((UserText.includes('чоко') && (getRandomInt(3) - 1) > 0) || (UserText.includes('чоко') && UserText.includes('пожалуйста'))) message.reply(ChocoAnswers[getRandomInt(ChocoAnswers.length)]);

		if (((UserText.includes('привет')) ||
		(UserText.includes('хай')) ||
		(UserText.includes('доброе утро')) ||
		(UserText.includes('добрый день')) ||
		(UserText.includes('добрый вечер'))) && getRandomInt(2)) {
			message.reply(HelloAnswers[getRandomInt(HelloAnswers.length)]);
			return;
		}

		// console.log(message.mentions.repliedUser);
		if (message.mentions.users.first()) {
			if ((message.mentions.users.first().id === '392060740238049280' && (getRandomInt(3) - 1) > 0) || UserText.includes('факт')) {
				message.reply(Remembered[getRandomInt(Remembered.length)] + Facts[getRandomInt(Facts.length)]);
				return;
			}
			if ((message.mentions.users.first().id === '392060740238049280' && (getRandomInt(3) - 1) > 0) || (UserText.includes('шутка') || UserText.includes('анекдот') || UserText.includes('прикол'))) {
				message.reply(Jokes[getRandomInt(Jokes.length)]);
				return;
			}
		}
	}

	// ///////


	let pref = prefix;
	if (message.guild != null && message.content.startsWith(pref)) {


		if (!fs.existsSync(GuildDir)) fs.mkdir(GuildDir);

		const saveFiles = (file, dir) => {
			fs.writeFile(dir + '/permissions.json', JSON.stringify(file), error => {console.log(error);});
		};

		if ((!fs.existsSync(GuildDir + '/permissions.json'))) {
			message.guild.channels.cache.forEach(channel => {
				Channels.push({ ID: channel.id, 'NAME':channel.name, permission:false });
				// console.log(Channels);

			});
			setTimeout(saveFiles, 3000, Channels, GuildDir);
		}


		const radata = fs.readFileSync('./GUILDS/' + message.guild.id + '/permissions.json');
		const data = JSON.parse(radata);


		data.forEach((item, i) => {
			permission.set(data[i].ID, data[i].permission);

		});

		const rawdata = fs.readFileSync('./GUILDS/' + message.guild.id + '/BotSettingsGuild.json');
		pref = JSON.parse(rawdata).prefix;
	}

	const messageArray = message.content.split(' ');
	const command = messageArray[0];
	const args = messageArray.slice(1);

	if (!command.startsWith(pref)) return;

	const cmd = bot.commands.get(command.slice(pref.length));

	if (!cmd) return;

	if (cmd.help.type == 'image') {
		if (!permission.get(message.channel.id)) {return message.react('⛔');}
	}
	else if (cmd.help.type == 'admin') {
		if (!message.member.permissions.has('ADMINISTRATOR')) {return message.react('⛔');}
	}

	else if (cmd.help.type == 'moderation') {
		if (!message.member.permissions.has('MANAGE_MESSAGES')) {return message.react('⛔');}

	}

	try {
		if (cmd) cmd.run(bot, message, args);
	}
	catch (e) {
		console.err(e);
	}


});

bot.on('messageCreate', async message => {
	if (message.author.bot) return;

	// console.log(message);

	// НАЧИСЛЕНИЕ ДЕНЕГ

	const jsonStr = '{"Users":[]}';

	if (message.guild) {
		const dir3 = './GUILDS/' + message.guild.id;
		if (!fs.existsSync(dir3)) fs.mkdirSync(dir3);
		if (!fs.existsSync(dir3 + '/Score.json')) {fs.writeFileSync(dir3 + '/Score.json', jsonStr);}

		let new_Score = 0;

		const rawdata = fs.readFileSync('./GUILDS/' + message.guild.id + '/Score.json');
		const obj = JSON.parse(rawdata);
		const new_User = obj['Users'].find(User => User.ID === message.author.id);
		if (new_User) {
			if (new Date().getTime() > new_User.Date + 60000) {
				new_Score = new_User.Score;
				obj['Users'].find(User => User.ID === message.author.id).Score = new_Score + getRandomInt(25);
				obj['Users'].find(User => User.ID === message.author.id).Date = new Date().getTime();
			}
			else {return;}
		}
		else {
			obj['Users'].push({ 'ID':message.author.id, 'Name':message.author.username, 'Score': 10, 'Date': new Date().getTime() });
		}
		// console.log(new_Score);
		//
		fs.writeFileSync(dir3 + '/Score.json', JSON.stringify(obj));
	}
});