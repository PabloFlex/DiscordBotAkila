const {
    Client,
    Attachement
} = require("discord.js");

const bot = new Client();
const token = 'NzQyNDEwNzY1MTAwNjQ2NDkw.XzFt5w.NV-EvXOELKkA1h62nlUwGgLcqkE'
const PREFIX = "!";
var servers = {}
const ytdl = require("ytdl-core");


bot.on('ready',() => {
    console.log('Le bot musical est en ligne - V1.2 Author : Kroot (Paul Le Flanchec) ');
});

bot.on('message',message => {
    let args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]){
        case 'play':

            function play(connection ,message){
                var server = servers[message.guild.id];

                server.dispatcher = connection.play(ytdl(server.queue[0],{filter: "audioonly"}));
                server.queue.shift();
                serve.dispatcher.on("end",function(){
                    if(server.queue[0]){
                        play(connection,message);
                    }else {
                        connection.disconnect();

                    }
                
                });
            }

            if(!args[1]){
                message.channel.send("Il faut entrer un lien pour que le robot fonctionne");
                return;
            }
            
            if(!message.member.voice.channel){
                message.channel.send("Vous devez etre dans un salon pour utiliser le bot musical");
                return;
            }

            if(!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            }

            var server = servers[message.guild.id];

            server.queue.push(args[1]);

            if(!message.member.voice.connection) message.member.voice.channel.join().then(function(connection){
                play(connection, message);
            })



        break;
    }
});


bot.login(token);