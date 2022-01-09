const express = require('express')
var cheerio = require("cheerio");
var path = require('path')
const fs = require("fs");
const { isNull } = require('util');

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

function find(array, value) { //Эту функцию я нашел на каком-то ресурсе. Она ищет повторяющиеся значения в массиве. А-ля search_array() в php
    if (array.indexOf) {
        return array.indexOf(value);
    }

    for (var i = 0; i < array.length; i++) {
        if (array[i] === value) return i;
    }

    return -1;
}

module.exports.run = async (bot, message, args) => {

  var mentioned_user = message.mentions.members.first()

  if (!mentioned_user) { await message.channel.send("А у кого чип то снимать?"); return;}

  if (message.member.roles.cache.find(role =>  role.name === 'Чипированный'))
  {
    await message.channel.send("Чипированные не могут снимать чипы"); return;
  }

  if (!mentioned_user.roles.cache.find(role =>  role.name === 'Чипированный'))
  {
    await message.channel.send(`Проверил ${mentioned_user}, но чипа не обнаружено`); return;
  }

  let msg = await message.channel.send("Ты попробовал снять чип с "+`${mentioned_user}`);
  if (getRandomInt(2) === 1)
  {
     await message.channel.send("И у тебя получилось");
     mentioned_user.roles.remove(['784570869715566593']);
  }
  else
  {
    await message.channel.send("И ты чипировался тоже");
    message.member.roles.add(['784570869715566593']);
  }






   
//await message.delete();
}
module.exports.help = {
    name: "снять",
    type: "info",
    desc: "Попробовать снять с кого-то чип. Шанс 50% успешно снять. В случае неудачи - чипируешься"
}
