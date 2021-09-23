const debug = require('debug')('help')

const help = async (message) => {
  try {
    const embed = {
      title: 'ETH commands:',
      description:
        '- !help (All commands)\n- !coins (All coins)\n**Now in coins embeds you can find charts!**',
      color: 0x4c4cff,
      fields: [
        {
          name: 'Legend:',
          value:
            ':clock1: - 1 hour\n:calendar: - 24 hours\n:calendar_spiral: - 7 days',
        },
      ],
    }
    await message.channel.send({ embed })
  } catch (err) {
    debug(err)
  }
}

module.exports = help
