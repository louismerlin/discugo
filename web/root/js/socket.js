socket = function() {
  ws = new WebSocket("ws://localhost:8080/ws/");

  return {
    onChange: function(callback) {
      ws.onmessage = function(event) {
        callback(event);
      }
    }
  }
}


var ws = new WebSocket("ws://localhost:8080/ws/"),
		channels = [],
		channelList = document.getElementById("channelList"),
		currentChan = "general",
		messageList = document.getElementById("messageList");

ws.onopen = function(ev) {
	console.log('Connection opened.');
}
ws.onclose = function(ev) {
	console.log('Connection closed.');
}
ws.onerror = function(ev) {
	console.log('Error: '+ev);
}
ws.onmessage = function(event) {
	console.log("Recieved " + event.data);
	message = JSON.parse(event.data);
	chId = channels.indexOf(message.channel);
	if (chId == -1) {
		channels.push(message.channel);
		chId = channels.length - 1;
		document.getElementById("messageSection").innerHTML += '<div class="channelDivInvis" id="channel'+chId+'"></div>';
		channelList.innerHTML += '<li><a class="chSelectNo" id="chSelect'+chId+'" onclick="selectChannel('+chId+')">#'+message.channel+'</a></li>';
		if (message.channel == currentChan)
			selectChannel(chId)
	}
	chDiv = document.getElementById("channel"+chId);
	chDiv.innerHTML += '<div class="messageDiv"><div class="messageLeft">'+message.author+':&nbsp;</div><div class="messageCenter">'+message.body+'</div><div class="messageRight">&nbsp;('+message.TimeSent.slice(11,19)+')</div></div>';
	chDiv.scrollTop = chDiv.scrollHeight;
}
