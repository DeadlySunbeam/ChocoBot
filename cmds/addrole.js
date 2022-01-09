const { MessageEmbed } = require('discord.js');
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

    Map.prototype.toJSON = function() {return [...this];};


    if(message.author.id != '241850808960811008') {
        message.reply("У вас нет прав! Обратитесь к ЧокоЧипу"); return;
      }
      
    if (!args[0]) {
        message.reply("Неправильный формат команды. Ожидается: ``!addrole Название_Категории``");
        return;
    }

    var dir3 = "./GUILDS/"+message.guild.id;
 
    const filter = (reaction, user) => (user.id === '241850808960811008');

    let reactMes = await message.channel.send("**Пожалуйста отреагируйте под этим сообщением нужным emoji**" + "<:"+message.guild.emojis.cache.find(emoji =>  emoji.name === 'ChipYes').identifier+">");

    const filter_m = response => response.author.id === "241850808960811008";

    my_Map = new Map();
    var obj_V = {};
    //obj_V.push({"url": false, "animated":false, "reaction": 0, "role":0, "description":0});
    //console.log(obj_V);
    var temp_id = 0;


    reactMes.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
    .then(collected => 
        {
            temp_id = collected.first().emoji.id;
            obj_V.url = collected.first().emoji.url;
            obj_V.animated = collected.first().emoji.animated;
            obj_V.reaction = collected.first().emoji.identifier;
            

            //message.channel.send(JSON.stringify(collected));
           

            //reactMes.delete();
            reactMes = message.channel.send("Введите название роли");
            message.channel.awaitMessages(filter_m, {max: 1, time: 60000, errors: ['time'] })
            .then(collected =>
                {
                    obj_V.role = collected.first().content;
                    //reactMes.delete();
                    //message.reply(`${collected.first().content}`); 
                    reactMes = message.channel.send("Остался последний этап. Пожалуйста напишите краткое описание. Можете также оставить поле пустым")
                    message.channel.awaitMessages(filter_m, {max: 1, time: 60000, errors: ['time'] })
                    .then(collected =>
                        {
                            obj_V.description = collected.first().content;
                            message.channel.send("Супер, спасибо вам за участие!")
                            my_Map.set(temp_id, obj_V);
                            fs.writeFileSync(dir3+'/embed', JSON.stringify([{"category":args, "data": my_Map}]));
                            console.log(my_Map);
                        }
                    )
                    .catch(collected =>
                        {
                            message.channel.send("Ну, блина")
                        }
                        
                    )
                }

                )  
                    .catch(collected => {
                        message.reply("Время ожидания истекло");
                        return;
                    })
        })
	        .catch(collected => {
		    message.reply("Время ожидания истекло");
            return;
    	    });
 

     //console.log(message.guild.emojis.cache.find(emoji =>  emoji.name === 'ChipYes').identifier)

     
     
}
module.exports.help = {
    name: "addrole",
    type: "admin",
    desc: "Команда помощи"
}
