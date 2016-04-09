registerPlugin({
  name: 'http',
  version: '1.0',
  description: 'http',
  author: 'MaxS <info@schmitt-max.com>',
  vars: {}
}, function(sinusbot, config) {
  sinusbot.on('chat', function(ev) {
    if(ev.msg == '!http') {
      http = {
        "method": "GET",
        "url": "http://sinus.schmitt-max.com/news.php",
        "timeout": 60000,
        "headers": [{
          "Content-Type": "text/plain; charset=UTF-8"
        }]
      };

      function Process(error, response) {
        LastResponse = response
        if(response.statusCode != 200)
        {
          sinusbot.log(error);
          return;
        }
        var output = response.data;
        var output = output.substr(0, output.length-17);
        var output = output.slice('133');
        sinusbot.log(output);
        chatPrivate(ev.clientId, output)
      }
      sinusbot.http(http, Process);
    }
  });
});
//Idea with the structure of the code is from @Xuxe