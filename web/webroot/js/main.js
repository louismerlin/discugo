var ws = new WebSocket("ws://localhost:8081/"),
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
	messageList.innerHTML += '<div class="messageDiv"><p class="messageLeft"><b>'+message.author+':</b> '+message.body+'<br/></p><p class="messageRight">('+message.TimeSent.slice(11,19)+')</p><div style="clear:both"></div></div>';
	messageList.scrollTop = messageList.scrollHeight;
}

var submitText = function() {
	text = document.getElementById("messageInput").value;
	document.getElementById("messageInput").value = "";
	name = document.getElementById("name").value;
	if (name == "") name = "Anonymous";
	message = JSON.stringify({author:name, body:text});
	ws.send(message);
}
