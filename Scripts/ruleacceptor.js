registerPlugin({
    name: 'Ruleacceptor',
    version: '1.3',
    description: 'Ruleacceptor',
    author: 'MaxS <info@schmitt-max.com>',
    vars: {
        a_groupen1: {
            title: '1st group ID EN.',
            type: 'number'
        },
        a_groupen2: {
            title: '2nd group ID EN.',
            type: 'number'
        },
        a_groupde1: {
            title: '1st group ID DE.',
            type: 'number'
        },
        a_groupde2: {
            title: '2nd group ID DE.',
            type: 'number'
        },
        b_message: {
            title: 'Your welcome text or rules which he should accept to. %n is the nickname of the Client.',
            type: 'string'
        },
        c_messageen: {
            title: ' The EN text, after the client, gets the group.',
            type: 'string'
        },
        c_messagede: {
            title: ' The DE text, after the client, gets the group.',
            type: 'string'
        }
    }
}, function (sinusbot, config) {
    sinusbot.on('chat', function (ev) {
        if (ev.msg == '!accept de') {
            sinusbot.addClientToServerGroup(ev.client.dbid, config.a_groupde1);
            sinusbot.addClientToServerGroup(ev.client.dbid, config.a_groupde2);
            chatPrivate(ev.clientId, config.c_messagede);
        }
        if (ev.msg == '!accept en') {
            sinusbot.addClientToServerGroup(ev.client.dbid, config.a_groupen1);
            sinusbot.addClientToServerGroup(ev.client.dbid, config.a_groupen2);
            chatPrivate(ev.clientId, config.c_messageen);
        }
    });
    sinusbot.on('clientMove', function (ev) {
        if ((ev.clientServerGroups.length) === 0) {
            var msg = config.b_message;
            msg = msg.replace(/%n/g, ev.clientNick);
            chatPrivate(ev.clientId, msg);
        }
    });
    sinusbot.on('clientServergroupAdd', function (ev) {
        if ((hasgroup(config.a_groupen1) && hasgroup(config.a_groupde1)) == true) {
            sinusbot.removeClientFromServerGroup(ev.client.dbid, config.a_groupen1);
            sinusbot.removeClientFromServerGroup(ev.client.dbid, config.a_groupde1);
        }


        function hasgroup(groupid) {

            var tmp = []
            for (var i = 0; i < ev.client.groups.length; i++) {
                tmp[i] = ev.client.groups[i]['i'];
            }
            for (var i = 0; i < tmp.length; i++) {
                if (tmp[i] == groupid) {
                    var tmp = []
                    return true;
                }
            }
            if (tmp.length == ev.client.groups.length) {
                return false;
            }
        }
    });

});
