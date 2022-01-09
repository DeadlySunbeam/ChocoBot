const Discord = module.require("discord.js")
module.exports.run = async (bot, message, args) => {
  let embed = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
    //.setDescription("https://www.avtovzglyad.ru/media/article/BMW_3-Series_2019.jpg.740x555_q85_box-38%2C115%2C1102%2C913_crop_detail_upscale.jpg")

    //.setThumbnail(message.author.image)
    .setColor('#4169E1')
    .setTitle("Awooo")
    .setImage(message.author.avatarURL)
    //.setFooter("Кусь за бочок от "+bot.users.get("241850808960811008").username, bot.users.get("241850808960811008").avatarURL)
    //.setImage(message.author.image);
    message.channel.send({embeds:[embed]});
}
module.exports.help = {
    name: "userinfo",
    type: "admin",
    desc: "Команда помощи"
}
