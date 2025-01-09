const API_KEY = process.env.API_KEY
const SECRET_API_KEY = process.env.SECRET_API_KEY
const Alpaca = require('@alpacahq/alpaca-trade-api')
const app = express();
import 'dotenv/config'
import displayPrice from '/mnt/c/javascript/alpaca/public/client.js';
import WebSocket from 'ws';
import express, { json } from 'express'


app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'))
app.use(displayPrice)

const socket = new WebSocket('wss://stream.data.alpaca.markets/v2/iex');
socket.onopen = () => {
  console.log("OPENED")
  const authMsg = {
    action: "auth",
    key: API_KEY,
    secret: SECRET_API_KEY,
  }
  const subscribe = {
    action: "subscribe",
    trades: ["MSFT"],
  }
  socket.send(JSON.stringify(authMsg))
  socket.send(JSON.stringify(subscribe))
}


socket.onmessage = (event) => {
  //let data = event.data[Symbol.for('kData')] || event.data
  console.log(event)
  //let parsedData = JSON.parse(data)
  // if(parsedData[0].T === "t") {
  //   console.log("test")
  //   console.log("Price", parsedData[0].p)
  // }
    
  //console.log(parsedData)

}

socket.onerror = function(error) {
  console.log('ERROR: ', error)
}

/*
app.get(':symbol/price', async (req, res) => {
    console.log("**THE START OF GET**")
    try {
        var stockSymbol = req.params.symbol
        var getTrade = await alpaca.getLatestTrade(stockSymbol)

        //  key:    value,
        res.json({
            symbol: stockSymbol,
            price: getTrade.Price
        })
    } catch (error) {
        console.error(error)

    }
})
*/