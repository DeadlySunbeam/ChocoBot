const fs = require("fs");
var cheerio = require("cheerio");


function find(array, value) { //Эту функцию я нашел на каком-то ресурсе. Она ищет повторяющиеся значения в массиве. А-ля search_array() в php
    if (array.indexOf) {
        return array.indexOf(value);
    }

    for (var i = 0; i < array.length; i++) {
        if (array[i] === value) return i;
    }

    return -1;
}

function removeRepeatedWords( str ) { //Эта функция будет удалять повторяющиеся слова в строке
    var arr = [];
    var be = [];
    var result = '';
    var new_str = str; // Приводим всё к верхнему регистру. Можно к нижнему, лишь-бы слова были одинаковыми по регистру
    arr = new_str.split(','); //Разбиваем строку на массив через пробел

    for ( i = 0; i < arr.length; i++ )
    {
        if ( find(be, arr[i]) == -1 ) { // Если слово не встречалось в массиве раньше - то добавляем его в строку.
            result += arr[i] + ',';
            be.push(arr[i]);
        }
    }

    return result;
}


// асинхронное чтение
fs.readFile("info-rules3.html", "utf8",
            function(error,data){
                console.log("Асинхронное чтение файла");
                if(error) throw error; // если возникла ошибка
                //console.log(data);  // выводим считанные данные

                const op = /FURS.$/;
                var qq = data.match(op);
                //console.log(qq);

                console.log("Do you know abc?".match(/abc/));
                console.log(data.match(/FURS.[А-я]+/g));

                fs.writeFileSync("result.txt", removeRepeatedWords(data.match(/FURS.[А-я\s]+/g)+''));
                fs.writeFileSync("result2.txt", removeRepeatedWords(data.match(/[А-я]+/g)+''));
                  fs.writeFileSync("result3.txt", removeRepeatedWords(data.match(/[А-я]+/g)+''));
});

// синхронное чтение
console.log("Синхронное чтение файла")
let fileContent = fs.readFileSync("info-rules.html", "utf8");
//console.log(fileContent);
