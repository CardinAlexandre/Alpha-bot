const Discord = require('discord.js')
const axios = require('axios')
require('dotenv').config()

const client = new Discord.Client()

client.login(process.env.TOKEN)

client.on('ready', () => {
  console.log(`Bot Open Sea has started.`)
  channel = client.channels.get('942028643771744276')
  let getFloorPrice = async () => {
    let res = await axios.get('https://api.opensea.io/api/v1/collection/exclusible-alpha/stats');
    // console.log(res.data.stats.floor_price);
    client.user.setActivity(res.data.stats.floor_price + ' Ξ ', { type: 'WATCHING' })
  }
  getFloorPrice(),
    setInterval(() => getFloorPrice(), 600000)
  var hash = '0x'
  let getLastSell = async () => {
    let res = await axios.get('https://api.etherscan.io/api?module=account&action=tokennfttx&contractaddress=0x4613becf8acb9e5adc4db994c2007769f37d3504&page=1&offset=5&sort=desc&apikey=YourApiKeyToken');
    // console.log(txhash.data.result[4]);
    var tokenID = res.data.result[0].tokenID
    var txhash = res.data.result[0].hash
    // console.log('-----');
    // console.log('hash precedent : ' + hash);
    // console.log('hash API : ' + txhash);
    if (hash != txhash && txhash != undefined && hash != undefined) {
      hash = txhash
      // console.log('not equal');
      if (hash != undefined) {
        // console.log('hash defined');
        let value = await axios.get(`https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${hash}&apikey=7K53RKUCHWAZIF3366FF5DCC831RK29AAM`);
        // console.log(value.data.result);
        let data = value.data.result.value
        if (data != undefined) {
          price = parseInt(data, 16)
          price = price / 1000000000000000000
          // console.log(hash);
          // console.log(price);
          // console.log(tokenID);
          // console.log('-----');
          if (price != 0) {
            try {
              const embed = {
                title: 'Vente',
                description: `Le token [**${tokenID}**](https://opensea.io/assets/0x4613becf8acb9e5adc4db994c2007769f37d3504/${tokenID}) a été vendu pour **${price} Ξ**`,
                color: 0xc6ff00,
                thumbnail: {
                  url: 'https://media-exp1.licdn.com/dms/image/C560BAQGLdSGRVd95xQ/company-logo_200_200/0/1633551417209?e=2159024400&v=beta&t=Bpyg75nk1Ys94j5aqh4rcFMu4kTaytf6fa-2kSlKLcw',
                },
                // author: {
                //   name: 'Vente',
                //   icon_url: 'https://cdn-icons-png.flaticon.com/512/945/945255.png',
                //   url: 'https://twitter.com/HeisenSpike',
                // },
                image: {
                  url: 'https://ph-files.imgix.net/666c310b-3a44-40f0-a8c4-daeb83958cb2.png?auto=format&auto=compress&codec=mozjpeg&cs=strip',
                },
                timestamp: new Date(),
              }
              await channel.send({ embed })
            } catch (err) {
              debug(err)
            }
          }
          return hash
        }
      }
    } else {
      // console.log('Meme hash');
    }
  }
  getLastSell(),
    setInterval(() => getLastSell(), 15000)
})