const fs = require("fs");
const { send } = require("process");


module.exports.run = async (bot, message, args) => {

	let toGet;

	try {

		toGet = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
		//console.log(toGet.id)
	}
	catch(e)
	{
		console.error(e);
	}

	if(toGet)
	{

		try{

			let rawdata = fs.readFileSync(`./GUILDS/`+message.guild.id+`/Score.json`);
			obj = JSON.parse(rawdata);
			var new_User = obj['Users'].find( User => User.ID === toGet.id);


			if(new_User)
			{
				message.reply(`**У ${toGet} ${new_User.Score} Чокочипсиков <:Chipsik:847169552386359327>**`)
			}
			else
			{
			message.reply("**Такого пользователя не найдено в банке**");
			}

			return;

		}
		catch(e)
		{
			console.error(e);
			message.reply("Что-то пошло не так... Приносим извинения. Обратитесь к владельцу бота.")
			return;
		}
		
	}


	try{

		let rawdata = fs.readFileSync(`./GUILDS/`+message.guild.id+`/Score.json`);
		obj = JSON.parse(rawdata);
		var new_User = obj['Users'].find( User => User.ID === message.author.id);
	
		if(new_User)
		{
			message.reply("**У вас "+new_User.Score+` Чокочипсиков <:Chipsik:847169552386359327>**`)
		}
		else
		{
		message.reply("**У вас 0 Чокочипсиков <:Chipsik:847169552386359327>**");
		}

	} catch(e) 
	{
		console.error(e);
		message.reply("Что-то пошло не так... Приносим извинения. Обратитесь к владельцу бота.")
		return;
	}
 
}
module.exports.help = {
    name: ["счет", "счёт", "щот", "с4ёт", "щёт", "баланс"],
    type: "info",
    desc: "Посмотреть свой счет"
}
