let chat = document.getElementById('chat');
let input = document.getElementById('input');

let ws = new WebSocket('ws://localhost:8888');


function sendMessage(){
    let text = input.value;

    ws.send(JSON.stringify({ type: 'message', data: text }));

    displayMessage(text);

    input.value = '';
}

function displayMessage(text){
    let time = new Date();
    let formated = time.toLocaleString('en-UK', {hour: '2-digit', minute: '2-digit', second: '2-digit'});

    if(chat.childElementCount >= 14){
        chat.removeChild(chat.firstChild);
    }

    console.log(chat.childElementCount);
    let p = document.createElement('p');

    p.innerHTML += '<span class="text-rose-500">' + formated + '</span> ' + text;

    chat.appendChild(p);
}


ws.addEventListener('message', (e) => {
    let data = JSON.parse(e.data);

    if(data.type == "message"){
        displayMessage(data.data);
    }
})