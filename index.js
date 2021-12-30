const Discord = require('discord.js')
const axios = require('axios')
require('dotenv').config()

const client = new Discord.Client()

client.login(process.env.TOKEN)

client.on('ready', () => {
  console.log(`Bot Open Sea has started.`)
  let getFloorPrice = async () => {
    let res = await axios.get('https://api.opensea.io/api/v1/collection/exclusible-gold-alpha/stats');
    console.log(res.data.stats.floor_price);
    client.user.setActivity(res.data.stats.floor_price + ' Ξ ', { type: 'WATCHING' })
  }
  getFloorPrice(),
    setInterval(() => getFloorPrice(), 600000)
})