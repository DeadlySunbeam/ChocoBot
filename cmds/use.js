const fs = require("fs");

var variant = 0;




module.exports.run = async (bot, message, args) => {

	search_item = ""

	if (!args[0]) 
  {
		await message.channel.send("Пожалуйста введите предмет, который вы хотите использовать. Сделать можно это следующим образом `!использовать предмет`"); return;
	}

 

	if(args.length<1)
	search_item = arg[0];

	else
	args.forEach( (element,index) => {
		if(index < args.length - 1)
		search_item += element + ' ';
		
		else
		search_item += element;
	});

	search_item = search_item.replace('ё', 'е')

	if ( (message.member.roles.cache.find(role =>  role.name.toLowerCase() === search_item.toLowerCase())))
  {
    await message.channel.send("У вас уже стоит эта роль"); return;
  }

  if(!(fs.existsSync("./GUILDS/"+message.guild.id+`/Items.json`))) {message.reply("Никто ничего не покупал на сервере. Будьте первым кто купит предмет!"); return;}

  var dir3 = "./GUILDS/"+message.guild.id;
  let rawdata = fs.readFileSync(`./GUILDS/`+message.guild.id+`/Items.json`);
  obj = JSON.parse(rawdata);
  var new_User = obj['Users'].find( User => User.ID === message.author.id);


	let rawdata2 = fs.readFileSync(`./items/Items.json`);
  obj = JSON.parse(rawdata2);
	var useitem = obj['Items'].find( Item => Item.Name.toLowerCase() === search_item.toLowerCase());


  var flag = 1;
  

  function item_kus() 
  {
    if(new_User)
    {
      var item_array = new_User['Items'];
      item_array.forEach(element => {
        if(element.Name.toLowerCase() === search_item.toLowerCase() && useitem.Role)
        { 
					//console.log(element.Name + ' ' + useitem.Role)
					//if (!useitem.Role) {message.channel.send("В данный момент можно использовать только роли."); return;}
          message.channel.send(`${message.author.username} теперь с ролью ${search_item}.`);
          
          //console.log(new_User['Items']);
          
          message.member.roles.add([`${useitem.RoleID}`]);
          flag = 0;
        }
      });
    }
  }
  
  item_kus();
  
   if(flag) message.reply("У вас нет такой роли, пожалуйста купите её в магазине через команду ``!купить``");
  
    //item_kus().then(res, err) 
    
  }

  


module.exports.help = {
    name: "использовать",
    type: "info",
    desc: "Использовать купленый предмет"
}
