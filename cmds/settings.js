const fs = require('fs');
const Discord = require('discord.js');
const emi = require('../')
module.exports.run = async (bot, message, args) => {
if(!message.member.hasPermission("ADMINISTRATOR") && message.member.id != 241850808960811008) return message.react('⛔');


var dir = "./GUILDS/"+message.guild.id;

if(!fs.existsSync(dir)) fs.mkdirSync(dir);

var arr = '';

const Channels = [];
message.guild.channels.cache.forEach(channel => {
  Channels.push({ID: channel.id, 'NAME':channel.name, permission:false});
  //console.log(Channels);
});
var prefix = '!';
var words = message.content.split(" ");
if(words[1] == ("префикс" || "-p") && words[2] != null) {save(words[2]); message.reply("``Теперь ваш префикс "+words[2]+"``")}
else if(words[1] == ("префикс" || "-p") && words[2] == null) { return message.reply("``Вы забыли ввести значение префикса``");}
else if(words[1] == ("роли" || "-p") && (words[2] == 0 || words[2] == null) ) {  return message.reply("``Был создан список разрешеных каналов``");}
else{

let msg = await message.reply('Выберите, что хотите настроить на сервере: \n1️⃣ - какие команды разрешить. \n2️⃣ - префикс для сервера');


try {
    await  msg.react('1️⃣');
    await  msg.react('2️⃣');
    await  msg.react('3️⃣');
    await  msg.react('4️⃣');

} catch (error) {console.error('One of emoji is failed to react')}


const filter = (reaction, user) => (reaction.emoji.name === '1️⃣' || reaction.emoji.name === '2️⃣'  || reaction.emoji.name === '3️⃣'  || reaction.emoji.name === '4️⃣')  && user.id === message.author.id;

let collector = msg.createReactionCollector(filter, { time: 10000, max: 1 });
collector.on('collect', (reaction, collector) => {

  if(reaction.emoji.name === '1️⃣')
  {
      fs.writeFile(dir+"/permissions.json",  JSON.stringify(Channels));
  }

  if(reaction.emoji.name === '2️⃣')
  {
    message.channel.send("Введите префикс");

    const fil = m => m.author.id === reaction.emoji.reaction.users
    .last().id;

    message.channel.awaitMessages(fil, {max: 1, time: 10000}).then(collected => {
      //console.log(collected);
      prefix = collected.last().content;
      collected.last().delete();
      //repm.delete();
      message.channel.send("``Теперь ваш префикс "+prefix+"``")
      save(prefix);
    })
  }
  console.log('got a reaction');
  var EmUsers = reaction.emoji.reaction.users;

  //msg.clearReactions();

  //msg.react('✅');
  //msg.react('❌');

  //console.log(reaction.emoji.reaction.message.channel.send("Awoooo"));
});
collector.on('end', collected => {
  //msg.edit("Время запроса истекло");
  msg.delete();
  message.delete();
	console.log(`collected ${collected.size} reactions.`);
  //console.log(collected.get('❌'));
  //if(collected.size > 0) console.log(`First: ${collected.first().username}`)
});

//console.log(message.guild.channels);

}

 function save(pr){
  if(pr == null) pr = '!';
  fs.writeFileSync(dir+"/permissions.json",  Channels);
  myObj = new Object();
  aw = new Discord.Collection();
  fs.readFileSync(dir+"/permissions.json", aw);
  fs.writeFileSync(dir+"/BotSettingsGuild.json", JSON.stringify({'ID':message.guild.id, 'prefix': pr}));
}

function Answer(user) {
  user.send("Да ты");
}



}
module.exports.help = {
    name: "настройки",
    type: "moderation",
    desc: "Команда помощи"
}
