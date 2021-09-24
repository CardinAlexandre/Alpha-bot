const Discord = require('discord.js')
const axios = require('axios')
const debug = require('debug')('index')
const crypto = require('./src/commands/crypto')
const coins = require('./src/commands/coins')
const help = require('./src/commands/help')
const { log } = require('debug')
require('dotenv').config()

const client = new Discord.Client()

client.login(process.env.TOKEN)

client.on('ready', () => {
  console.log(`ETH has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`)
  channel = client.channels.get('787665385943597056')
  channel.send('!eth')
})

client.on('message', async (message) => {
  if (message.content.substring(0, process.env.PREFIX.length) === process.env.PREFIX) {
    const command = message.content.slice(process.env.PREFIX.length)

    let getEthPrice = async () => {
      let resETHprice = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT');
      let res = await axios.get('https://api.alternative.me/v2/ticker/1027/?convert=PLN');

      let user = message.guild.members.get(client.user.id)
      const role = message.guild.roles.get('890416769708224543')
      const price = parseInt(resETHprice.data.price).toFixed(0);
      const pourcentOneDay = res.data.data['1027'].quotes.USD.percentage_change_24h.toFixed(2)
      pourcentage = pourcentOneDay / 100;
      result = price * pourcentage
      if (result > 0) {
        sign = '+'
      } else {
        sign = ''
      }
      client.user.setActivity(sign + result.toFixed(2) + '$ ' + pourcentOneDay + '% (24h)', { type: 'WATCHING' })
      // console.log(sign + result.toFixed(2) + '$ ' + pourcentOneDay + '% (24h)');
      user.guild.me.setNickname('ETH ' + graph + price.toString() + ' USD')
      // console.log('ETH ' + price.toString() + ' USD');
      if (pourcentOneDay > 0) {
        graph = '📈'
        role.setColor('#1AEF2A');
      } else {
        graph = '📉'
        role.setColor('#EF1A1A');
      }
    }
    setInterval(() => getEthPrice(), 5000)

    switch (command) {
      case 'coins':
        coins(message)
        break
      case 'help':
        help(message)
        break
      default:
        crypto(message, command)
    }
  }
})