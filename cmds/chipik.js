const fs = require("fs");




module.exports.run = async (bot, message, args) => {

  try {
    
    toGet =  message.guild.members.cache.get(args[0]) || message.mentions.members.first()

  } catch (error) {
    
  }

if (args.length === 0 ) { message.reply("Пожалуйста укажите пользователя следующим образом ``!чипировать @пользователь``"); return;}

if(!toGet) { message.reply("Такого пользователя не найдено"); return; }

try {

  if ( (toGet.roles.cache.find(role =>  role.name === 'Чипированный')))
  {
    await message.channel.send("Пользователя уже чипировали."); return;
  }

} catch (error) {
    console.log(error);
}

  if(!(fs.existsSync("./GUILDS/"+message.guild.id+`/Items.json`))) {message.reply("Никто ничего не покупал на сервере. Будьте первым кто купит предмет!"); return;}

  var dir3 = "./GUILDS/"+message.guild.id;
  let rawdata = fs.readFileSync(`./GUILDS/`+message.guild.id+`/Items.json`);
  obj = JSON.parse(rawdata);
  var new_User = obj['Users'].find( User => User.ID === message.author.id);

  //target = args[0]

  var flag = 1;
  

  function item_kus() 
  {
    if(new_User)
    {
      var item_array = new_User['Items'];
      item_array.forEach(element => {
        if(element.Name === "Чип" && flag)
        { 
          message.channel.send(message.author.username+" чипирует "+args[0]);
          obj['Users'].find( User => User.ID === message.author.id)['Items'].splice(new_User['Items'].indexOf(element), 1);
          console.log(new_User['Items']);
          fs.writeFileSync(dir3+"/Items.json", JSON.stringify(obj));
          toGet.roles.add(['784570869715566593']);
          flag = 0;
        }
      });
    }
  }
  
  item_kus();
  
   if(flag) message.reply("У вас нет чипа, пожалуйста купите его в магазине через команду ``!купить чип``");
  
    //item_kus().then(res, err) 
    
  }

  


module.exports.help = {
    name: "чипировать",
    type: "info",
    desc: "Чипировать пользователя"
}
