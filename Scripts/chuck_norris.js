registerPlugin({
    name: 'Chuck Norris Speech API',
    version: '1.0',
    description: 'This is a simple script that will write you Chuck Norris jokes when you say "joke"',
    author: 'MaxS <info@schmitt-max.com> & irgendwer <Jonas@sandstorm-projects.de>',
    vars: {
        msgtype: {
            title: "message type",
            type: 'select',
            options: ['Poke','Private message','Channel message','Say it']
        }
    },
    voiceCommands: ['joke']
}, function(sinusbot, config) {
    sinusbot.setARC(2);
    sinusbot.on('speech', function(ev) {
        if (ev.text == 'joke') {
            sinusbot.log('Writes a joke to ' + ev.clientId);
            sinusbot.http({
                "method": "GET",
                "url": "http://api.icndb.com/jokes/random",
                "timeout": 6000,
                "headers": [
                    {"Content-Type": "application/json"},
                ]}, function (error, response) {
                if (response.statusCode != 200) {
                    sinusbot.log(error);
                    return;
                }
                var joke = JSON.parse(response.data).value.joke;
                sinusbot.log("received joke: " + joke);
                if (config.msgtype == 0) {
                  sinusbot.poke(ev.clientId, joke);
                } else if (config.msgtype == 1) {
                  sinusbot.chatPrivate(ev.clientId, joke);
                } else if (config.msgtype == 2){
                  sinusbot.chatChannel(joke);
                } else {
                  sinusbot.say(joke);
                }
            });
        } else {
            sinusbot.log('Client ' + ev.clientId + ' just said ' + ev.text);
        } 
    });
});