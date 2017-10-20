
var streams = ["ESL_SC2", "lirik", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
var responseBlobs = [];
var tableRow, htmlString, i, displayName, channel, status, preview;
i = 0;

function getStream(response){
    responseBlobs.push(response);

    channel = responseBlobs[i]._links.channel;
    displayName = channel.slice(38);   //"https://api.twitch.tv/kraken/channels/" [37 chars]   

    tableRow = document.createElement("tr");
    htmlString = "<td><a href=\"https://www.twitch.tv/" + displayName + "\">" + displayName + "<\/a><\/td>"

    if (responseBlobs[i].stream === null){
        htmlString += "<td>offline<\/td>";
        tableRow.innerHTML = htmlString;
        document.getElementById("offline").appendChild(tableRow);
    } else {
        status = responseBlobs[i].stream.channel.status; 
        preview = responseBlobs[i].stream.preview.small;
        htmlString += "<td>" + status + "<\/td><td><img src=\"" + preview + "\">";
        tableRow.innerHTML = htmlString;
        document.getElementById("online").appendChild(tableRow);
    }
    i++;
}

$(document).ready( function() {
    console.log("ready!");
    buildTag();
    console.log(responseBlobs);

});

function buildTag(getStream){
    var tag, user, htmlString, row;
    for (user = 0; user < streams.length; user++){        
        tag = document.createElement("script");
        tag.src = "https://wind-bow.glitch.me/twitch-api/streams/" + streams[user] + "?callback=getStream";            
        //console.log("src is: " + tag.src)
        document.getElementsByTagName("head")[0].appendChild(tag);
    }
}

