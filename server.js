import {WebSocketServer, WebSocket} from "ws";

let wss = new WebSocketServer({ port: 8888 });

wss.on('connection', (ws) => {
    ws.on('message', (e) => {
        let data = JSON.parse(e);

        if(data.type == 'message'){
            wss.clients.forEach(client => {
                if(client !== ws && client.readyState == WebSocket.OPEN){
                    client.send(JSON.stringify({ type: 'message', data: data.data }));
                }
            })
        }
    })
})