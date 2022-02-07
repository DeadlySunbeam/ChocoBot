var path = require('path')
const fs = require("fs");
const Discord = module.require("discord.js")


module.exports.run = async (bot, message, args) => {

  let toGet = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

  MES_ID = message.author.id;
  MES_USER = message.author;

  if(toGet) {
    MES_ID = toGet.id;
    MES_USER = toGet;
  }

  if (message.channel.guild === undefined) { message.channel.send("Пожалуйста открывайте сумку на сервере"); return;}
  let msg = await message.channel.send("Заглядываем в сумку..."); 

  var score = 0;
  let rawdata = fs.readFileSync(`./GUILDS/`+message.guild.id+`/Score.json`);
  obj = JSON.parse(rawdata);
  var new_User = obj['Users'].find( User => User.ID === MES_ID);
  var dir3 = "./GUILDS/"+message.guild.id;
  

  if(!fs.existsSync(dir3+"/Items.json")) arr2 = 0;
  else
  {
    let rawdata = fs.readFileSync(`./GUILDS/`+message.guild.id+`/Items.json`);
    Member = JSON.parse(rawdata)['Users'].find(User => User.ID === MES_ID);
    if(Member)
    arr2 = JSON.parse(rawdata)['Users'].find(User => User.ID === MES_ID)['Items'];
    else arr2 = 0;
  }

  if(new_User) score = new_User.Score;

  var score_p = score;
  var score_d = 0;


  while (score_p > 9)
  {
    score_p = score_p / 10;
    score_d++;
  }

  var align = score_d * 30;
  console.log(align);

    function compare(a, b) {
  if (a.name > b.name) return 1; // если первое значение больше второго
  if (a.name == b.name) return 0; // если равны
  if (a.name < b.name) return -1; // если первое значение меньше второго
  }

  async function Draw(startPos, currentItemCount) {



      items_count = 1;

      //console.log("awaw");

      if(arr2)
      ARRresult = arr2.reduce(function(acc, el) {
				acc[el.Name.toLowerCase()] = (acc[el.Name.toLowerCase()] || 0) + 1;
				return acc;
			}, {});
			
    MES_REPLY = "";

    if (MES_ID == message.author.id) MES_REPLY = "Ваша сумка"
    else
      MES_REPLY = "Сумка " + MES_USER.user.username;

			My_Items = " ";

			for(key in ARRresult)
			{
				My_Items += `${key} :\t ${ARRresult[key]} \n`
			}


			let embed = new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.avatarURL())
      .setDescription(`${My_Items}`)

      //.setThumbnail(message.author.image)
      .setColor('#4169E1')
      .setTitle(`${MES_REPLY}`)
      //.setImage(message.author.avatarURL())
      .setFooter("Кусь за бочок от "+bot.users.cache.get("241850808960811008").username, bot.users.cache.get("241850808960811008").avatarURL())
      //.setImage(message.author.image);

 
  let aMessage = await message.reply({
            embeds:
            [
             embed
            ]
        });


  // if (items_count > 30) 
  // {
  //    aMessage.react("<:right_arrow:855459223763943424>");
  // }
    
  // if (startPos > 29) 
  // {
  //     aMessage.react("<:left_arrow:855459246200193024>");
  // }

  //  aMessage.react("<:close:855470010947993631>");

  // const ChocoFilter = (reaction, user) => (reaction.emoji.name === 'right_arrow' || reaction.emoji.name === 'left_arrow' || reaction.emoji.name === 'close') && user.id === message.author.id;
  // aMessage.awaitReactions(ChocoFilter, { max: 1})
  // .then( async (collected) => { 
    

    

  //   if(collected.first().emoji.name === 'left_arrow')
  //   {
  //     await Draw(startPos-30,currentItemCount-30);
  //   }

  //   if(collected.first().emoji.name === 'right_arrow')
  //   {
  //     await Draw(startPos+30,currentItemCount+30);
  //   }

  //   aMessage.delete(); 
    

  // })
  // .catch(console.error);



  
  
  // return aMessage;
  }

let MyMessage = await Draw(1,1);
  
console.log(arr2.length + " размер таблицы");





await msg.delete();
await message.delete();
}
module.exports.help = {
    name: ["сумка","рюкзак","мешок","инвентарь","вещи"],
    type: "info",
    desc: "Посмотреть в свою или чужую сумку"
}
