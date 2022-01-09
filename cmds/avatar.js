const Discord = module.require("discord.js")
module.exports.run = async (bot, message, args) => {
  let msg = await message.channel.send("Generating avatar...");
  let toGet

  try {
    
    toGet =  message.guild.members.cache.get(args[0]) || message.mentions.members.first()

  } catch (error) {
    
  }
  

  var AMes = `${message}`;
  var count = 0;

  try {
    console.log (message.mentions.members.first());
  } catch (error) {
    
  }



    if(!toGet && AMes.length<8)
  {

    let embed = new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.avatarURL())
      .setDescription("Аватар пользователя "+message.author.username)

      //.setThumbnail(message.author.image)
      .setColor('#4169E1')
      //.setTitle("Аватар пользователя")
      .setImage(message.author.avatarURL())
      .setFooter("Кусь за бочок от "+bot.users.cache.get("241850808960811008").username, bot.users.cache.get("241850808960811008").avatarURL())
      //.setImage(message.author.image);
      message.channel.send({embeds:[embed]});

    console.log(AMes.length)
  }
  else
    if(!toGet)
    {
      console.log("ALLOBLYAT "+ toGet)
      let Susers = message.guild.members;
      //console.log(Susers.members);
      let FUsers = bot.users;
      Susers.cache.forEach(function(UUser, i, arr) {
      //console.log(UUser.user);

      if(UUser.user.username.match(AMes.substr(8)) && count==0){
        count++;
        let embed = new Discord.MessageEmbed()
          .setAuthor(message.author.username, message.author.avatarURL())
          .setDescription("Аватар пользователя "+UUser.user.username)

          //.setThumbnail(message.author.image)
          .setColor('#4169E1')
          //.setTitle("Аватар пользователя")
          .setImage(UUser.user.displayAvatarURL())
          .setFooter("Кусь за бочок от "+bot.users.cache.get("241850808960811008").username, bot.users.cache.get("241850808960811008").avatarURL())
          //.setImage(message.author.image);
          message.channel.send({embeds:[embed]});

      }
});
    }
  else
  {
    let embed = new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.avatarURL())
      .setDescription("Аватар пользователя "+toGet.user.username)

      //.setThumbnail(message.author.image)
      .setColor('#4169E1')
      //.setTitle("Аватар пользователя")
      .setImage(toGet.user.displayAvatarURL())
      .setFooter("Кусь за бочок от "+bot.users.cache.get("241850808960811008").username, bot.users.cache.get("241850808960811008").avatarURL())
      //.setImage(message.author.image);
      message.channel.send({embeds:[embed]});
}
    msg.delete();
}
module.exports.help = {
    name: "avatar",
    type: "info",
    desc: "показать аватар"
}
