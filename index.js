const Discord = require('discord.js');
const {Client, Attachment, MessageEmbed} = require('discord.js');
const bot = new Client();

const PREFIX = 'Lazy!';

const token = 'NzA3MzU5MDQyMDE1NTkyNDU4.XrH2rQ.qsXJINZn_7WRKxskjX-E-AtZOSw';

const request = require('request');
const cheerio = require('cheerio');

bot.on('ready', () => {
    console.log('This bot is online!');
})

bot.on('message', message => {

    let args = message.content.substring(PREFIX.length).split(" ");

    switch(args[0]) {
        case 'boop':
            const user = message.mentions.users.first();
            const boop = " Boop!"

            if (user) {
                message.channel.send("<@!" + user + ">" + boop);
            }

            if (!user) {
                console.error("Nobody is mentioned.");
                message.reply("You need to mention somebody dumb dumb");
            }
        break;
    }

    switch(args[0]) {

        case 'help':
            const Embed = new Discord.MessageEmbed()
            .setTitle("Helper Embed")
            .setColor(0xFF0000)
            .setDescription("`Lazy!boop - Sends 'Boop' to the user! ");

            message.author.send(Embed);
        break;
    }
})


bot.on('message', message => {

    let args = (message.content.substring(PREFIX.length).split(" "));

    switch(args[0]){

        case 'doggo':
            image(message);
    }

})

function image(message){
    var options = {
        url: "https://www.google.com/search?q=cute+dog&rlz=1C1CHBF_enUS758US759&sxsrf=ALeKk02OjYPF8oFw5CvtW4fLl-zHlU5r2g:1588890766670&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiCsu-t56LpAhVmoHIEHXU9DkQQ_AUoAXoECBMQAw&biw=1517&bih=736" + "cute dog",
        method: "GET",
        header: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    };

    request(options, function(error, response, responseBody) {
        if(error) {
            return;
        }

        $ = cheerio.load(responseBody);

        var links = $(".image a.link");

        var urls = new Array(links.length).fill(0).map((v,i) => links.eq(i).attr("href"));

        console.log(urls);
        if (!urls.length) {
            return;
        }
        message.channel.send( urls[Math.floor(Math.random() * urls.length)] + " " + message.guild.members.random());
    });
}




bot.login(token);
