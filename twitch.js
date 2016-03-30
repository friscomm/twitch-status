$(document).ready(function() {

  var regUsers = ["freecodecamp", "comster404", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff", "tr7k", "ogamingsc2", "cretetion", "brunofin"];
  var newArr = [];

  for (i = 0; i < regUsers.length; i++) {
    $.getJSON("https://api.twitch.tv/kraken/streams/" + regUsers[i] + "?callback=?", function(data) {
      if (data.status == 422) {
        var name = data.message.replace("Channel '", "").replace("' is unavailable","");
        
        newArr.push("<div class ='well' id = 'closed-well'><div class = 'name'> " + name + "</div><div class = 'description'>---</div><div class='status'>Account Closed</div></div>");
      } else if (data.stream == null) {
        var start = data._links.self;
        var link = start.replace("https://api.twitch.tv/kraken/streams", "https://www.twitch.tv");
        var name = link.replace("https://www.twitch.tv/", "");
        newArr.push("<div class ='well' id = 'offline-well'><a href = ' " + link + "'>" + "<div class = 'name'>" + name + "</a></div><div class = 'description'>---</div><div class='status'>Offline</div></div>");
      }  else {
        var start = data._links.self;
        var link = start.replace("https://api.twitch.tv/kraken/streams", "https://www.twitch.tv");
        var name = link.replace("https://www.twitch.tv/", "");
        newArr.push("<div class= 'well' id = 'online-well'><a href = ' " + link + "'>" + "<div class= 'name'>" + name + "</a></div><div class = 'description'>" + data.stream.game + "</div><div class = 'status'>Online</div></div>");
      }
      $(".APIresults").html(newArr);
    });
  }
});
