const TurndownService = require('turndown')
const debug = require('debug')('coins')

const turndownService = new TurndownService()

const coin = async (message) => {
  try {
    const embed = {
      title: 'Available coins price:',
      description: `
- !btc      (BitCoin)
- !eth      (Ethereum)
- !ltc       (LiteCoin)
- !btg      (BitCoin Gold)
- !dash   (DASH)
- !xmr     (Monero)
- !xrp      (Ripple)
- !lsk       (Lisk)
- !mag    (Magnet)
- !doge   (DogeCoin)
- !bch     (BitCoin cash)
- !etn      (Electroneum)
- !eos      (EOS)
- !iota     (IOTA)
- !zcash  (ZEC)
- !sbd      (Steem Dollars)
- !etc    (Ethereum Classic)
- !steem (STEEM)`,
      color: 0xc6ff00,
    }
    await message.channel.send({ embed })
  } catch (err) {
    debug(err)
  }
}

module.exports = coin
