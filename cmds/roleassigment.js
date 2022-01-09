const { MessageEmbed } = require('discord.js');
const fs = require("fs");


module.exports.run = async (bot, message, args) => {

    

    if(message.author.id != '241850808960811008') {
        message.reply("У вас нет прав! Обратитесь к ЧокоЧипу"); return;
      }

    var dir3 = "./GUILDS/"+message.guild.id;

    msg_info = [];

    if(fs.existsSync(dir3+"/assigned_role.json"))
    {
          rawdata = fs.readFileSync(dir3+"/assigned_role.json");
          old_msg = JSON.parse(rawdata);
          old_msg.forEach(element => {

            if(message.channel.messages.cache.get(element.MESSAGE_ID))
          {
              console.log(element.MESSAGE_ID);
              message.channel.messages.cache.get(element.MESSAGE_ID).delete();
          }
            
          });
          
          
    }

      //await message.channel.send("**Выберите роль нажав на соотвествующий эмоджи под ботом**")
      embed_arr = JSON.parse(fs.readFileSync(dir3+"/embed"));

      console.log(embed_arr[0].category);

      var desc_role = "";

      message.channel.send("**Выберите роль нажав на соотвествующий эмоджи под ботом**");

      function delay() {
        return new Promise(resolve => setTimeout(resolve, 300));
      }

      async function processArray(array) {
        // делаем "map" массива в промисы
        const promises = array.map(delayedLog);
        // ждем когда всё промисы будут выполнены
        await Promise.all(promises);
        console.log('Done!');
      }

      async function delayedLog(item) {
        // мы можем использовать await для Promise
        // который возвращается из delay
        await delay();
        
        //console.log(item.data.length);
        
        desc_role = "";
				var MyReaction = " "

        for (let i = 0; i < item.data.length; i++) {
          //console.log(item.data[i][1]);

					if(item.data[i][1].animated) MyReaction = `<a:${item.data[i][1].reaction}>`
					
					else MyReaction = `<:${item.data[i][1].reaction}>`

					if(item.data[i][1].custom == false) MyReaction = `${item.data[i][1].reaction}`

          const element = MyReaction + item.data[i][1].description + `<@&${item.data[i][1].role}>` + '\n\n';
          desc_role += element;
          //console.log(element);
        }

        item.category
				
        embed = new MessageEmbed()
        // Set the title of the field
        .setTitle(item.category+' ')
        // Set the color of the embed
        .setColor(`${item.data[0][1].hex}`)
        // Set the main content of the embed
        .setDescription(`${desc_role}`);
      // Send the embed to the same channel as the message
      
      
          // embed = JSON.parse(fs.readFileSync(dir3+"/role_embeds"));
          let msg = await message.channel.send({embeds:[embed]});
      
     
  
    
  
        try {

          for (let index = 0; index < item.data.length; index++) {

            
          
              console.log(`ID: ${item.data[index][1].reaction} Custom: ${item.data[index][1].custom}`)
							if(item.data[index][1].custom == true)
              { await msg.react(`:${item.data[index][1].reaction}`); }
							else
							{ await msg.react(`${item.data[index][1].reaction}`);}

          }   
  
        } catch (error) {console.error('One of emoji is failed to react')}


        fs.writeFileSync(dir3+"/role_embeds.json",JSON.stringify('['+embed+']'));

        msg_info.push({
            CHANNEL_ID: msg.channel.id,
            MESSAGE_ID: msg.id
          });
                  
        
         
          fs.writeFileSync(dir3+"/assigned_role.json", JSON.stringify(msg_info));
        
      
    }

    processArray(embed_arr);


message.delete();


}
module.exports.help = {
    name: "asrole",
    type: "admin",
    desc: "Команда помощи"
}
