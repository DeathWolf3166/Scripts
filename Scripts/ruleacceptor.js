registerPlugin({
    name: 'Ruleacceptor',
    version: '1.0',
    description: 'Ruleacceptor',
    author: 'MaxS <info@schmitt-max.com',
    vars: {
        a_group: {
            title: 'Groupid of the group, which should be set.',
            type: 'number'
        }
        b_message: {
            title: 'Your welcome text or rules which he should accept to.',
            type: 'string'
        },
        c_message: {
            title: ' The text, after the client, gets the group.',
            type: 'string'
        }
    }
}, function (sinusbot, config) {
    sinusbot.on('chat', function (ev) {
        if (ev.msg == '!accept') {
            sinusbot.log(ev.clientServerGroups);
            if (!ev.clientServerGroups.length > 0) {
                sinusbot.addClientToServerGroup(ev.client.dbid, config.a_group);
                chatPrivate(ev.clientId, config.c_message);
            }

        }
    });
    sinusbot.on('clientMove', function (ev) {
        if (ev.clientServerGroups.length <= 0) {
            chatPrivate(ev.clientId, config.b_message);
        }

    });
});