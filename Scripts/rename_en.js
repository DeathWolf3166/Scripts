registerPlugin({
    name: 'Rename EN',
    version: '1.1',
    description: 'renames automatically or per command !rename <name>',
    author: 'MaxS <info@schmitt-max.com',
    vars: {
        adminUids: {
            title: 'Comma-separated list of client-uids that can rename the bot.',
            type: 'string'
        }
    }
}, function(sinusbot, config) {
    var uids = [];
    if (config && config.adminUids) uids = config.adminUids.split(',');
    sinusbot.on('chat', function(ev) {
        if (ev.msg.startsWith('!rename ')) {
            if (uids.indexOf(ev.clientUid) < 0) {
                sinusbot.log(ev.clientNick + ' has not enough permissions to change the username.');
                chatPrivate(ev.clientId, 'You don\'t have enough permissions to change the username.');
                return;
            }
            var username = ev.msg.substring(8);
            var userswitch = 0;
            if (username.length > 30) userswitch = 1;
            if (username.length < 3) userswitch = -1;
            switch (userswitch) {
                case -1:
                    chatPrivate(ev.clientId, 'The username "' + username + '" is too short (at least 3 characters).');
                    sinusbot.log(ev.clientNick + ' tried to change bot\'s nickname, but inputted too few characters (' + username.length + ')')
                    break;
                case 0:
                    chatPrivate(ev.clientId, 'The username was changed to "' + username + '"');
                    sinusbot.log(ev.clientNick + ' changed the nickname to "' + username + '"')
                    sinusbot.setNick(username);
                    break;
                case 1:
                    chatPrivate(ev.clientId, 'The username "' + username + '" is too long (maximum 30 characters).');
                    sinusbot.log(ev.clientNick + ' tried to change bot\'s nickname, but inputted too many characters (' + username.length + ')')
                    break;
            }
        }
        if (ev.msg.startsWith('!name')) {
            chatPrivate(ev.clientId, 'Usage: "!rename <nickname>"');
        }
    });
    String.prototype.startsWith = function(str) {
        return this.indexOf(str) == 0;
    };
});