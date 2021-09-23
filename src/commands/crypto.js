const axios = require('axios')
const debug = require('debug')('crypto')
const coinIDs = require('../coinIDs.json')

function colors(data) {
  if (data.quotes.USD.percent_change_1h < 0) return 0xf44336
  return 0x00e676
}

const responder = async (message, command) => {
  try {
    const coinID = coinIDs.coinmarketcap[command]
    if (!(coinID === undefined || typeof coinID === 'undefined')) {
      const query = await axios.get(
        `https://api.alternative.me/v2/ticker/${coinID}/?convert=PLN`
      )

      const data = query.data.data[coinID]

      const embed = {
        title: `[${data.symbol}] ${data.name} price: ${data.quotes.USD.price.toFixed(2)} USD`,
        description: `
        \n**Percent Change in:**
          \n:clock1: :arrow_right:  ${data.quotes.USD.percentage_change_1h.toFixed(2)}% (1 hour)
          \n:calendar: :arrow_right:  ${data.quotes.USD.percentage_change_24h.toFixed(2)}% (24 hours)
          \n:calendar_spiral: :arrow_right:  ${data.quotes.USD.percentage_change_7d.toFixed(2)}% (7 days)`,
        color: colors(data),
        timestamp: new Date(data.last_updated * 1000),
        fields: [
          {
            name: 'Chart from last 30 days:',
            value: '\u200b',
          },
        ],
        image: {
          url: `https://s2.coinmarketcap.com/generated/sparklines/web/30d/usd/${coinID}.png`,
        },
      }

      message.channel.send({ embed })
    } else {
      debug(`${command} is an undefined coin`)
    }
  } catch (err) {
    console.log(err)
  }
}

module.exports = responder
