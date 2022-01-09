const fs = require("fs");
const { measureMemory } = require("vm");
const https = require('https');


function compare(a, b) {
  if (a.name > b.name) return 1; // если первое значение больше второго
  if (a.name == b.name) return 0; // если равны
  if (a.name < b.name) return -1; // если первое значение меньше второго
  }


module.exports.run = async (bot, message, args) => {

	console.log(args);


	let toGet;

	try {

		toGet = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
		console.log(toGet.id)

		if(toGet.id == message.author.id) 
		{
			message.reply("Вы не можете переводить себе деньги!");
			return;
		}


		args.forEach(element => {
			if(element != toGet && !isNaN(element)) 
			{ 
				request_money = parseInt(element); 
				//console.log(`OOOOO ${element}`)
			} 
		});


	} 
	catch(e)
	{
		console.error(e);
	}



	


  console.log(args);  

	


  if (!args) 
  {
     message.reply("Пожалуйста уточните у кого хотите запросить ЧокоЧипсики!"); return;
  }

	if (!request_money) 
  {
     message.reply("Пожалуйста уточните сколько хотите запросить ЧокоЧипсиков!"); return;
  }

	if (request_money<0) 
  {
     message.reply("Ошибка ввода! Только положительные числа!"); return;
  }



  var dir3 = "./GUILDS/"+message.guild.id;

  /////////////////////////////

  rawdata = fs.readFileSync(`./GUILDS/`+message.guild.id+`/Score.json`);
  obj2 = JSON.parse(rawdata);
  var Score = obj2['Users'].find( User => User.ID === message.author.id).Score;
	
	var GiftScore;
	
	

	try
	{
		GiftScore = obj2['Users'].find(User => User.ID === toGet.id).Score;
		console.log(Score + " -> " + GiftScore);


	}
	catch(e)
	{
		console.error(e);
		message.reply("Что-то пошло не так, просим прощения за неудобства... Возможно у указаного человека или бота ещё не открыт счёт в Чокобанке?" );
		return;
	}

	if ( !Number.isInteger( request_money ) ) {
		console.error("ЭТО НЕ ЧИСЛО!");
		message.reply("Вы ввели не число! Пожалуйста введите числовое значение");
		return;
	} 

  if(GiftScore < request_money) {
    message.reply("У пользователя нет таких денег. Ему не хватает " + (request_money - GiftScore) + " ЧокоЧипсиков!"); return;
  }



	let request_mes = await message.channel.send(`${toGet}, пользователь ${message.author} хочет у вас запросить ${request_money} ЧокоЧипсиков. Хотите их отдать?`);

	request_mes.react('👍').then(() => request_mes.react('👎'));

const filter = (reaction, user) => {
	return ['👍', '👎'].includes(reaction.emoji.name) && user.id === toGet.id;
};

request_mes.awaitReactions({ filter, max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '👍') {

			GiftScore = obj2['Users'].find(User => User.ID === toGet.id).Score;
			Score = obj2['Users'].find( User => User.ID === message.author.id).Score;

			if(GiftScore < request_money) {
				message.reply("Мы тут проверили счёт, оказывается у вас не хватает " + (request_money - GiftScore) + " ЧокоЧипсиков! Перевод недействителен!"); return;
			}
			
			obj2['Users'].find( User => User.ID === message.author.id).Score = Score + request_money;
			obj2['Users'].find(User => User.ID === toGet.id).Score = GiftScore - request_money;
			fs.writeFileSync(dir3+"/Score.json", JSON.stringify(obj2))
		
			message.reply(`Перевод успешно завершен, теперь у ${toGet} ${GiftScore - request_money} Чокочипсиков. А у ${message.author} их ${Score + request_money}`)
		

		} else {
			message.reply(`${message.author} Деняк не будет, ${toGet} отказался переводить ЧокоЧипсики.`);
		}
	})
	.catch(collected => {
		message.reply('Время ожидания истекло. ЧокоЧипсики никто не отдаёт!');
	});

}


  
  //console.log(new_Score);
  //
 
module.exports.help = {
    name: ["запросить","попросить","просить"],
    type: "info",
    desc: "Запросить у пользователя ЧокоЧипсики."
}
