const { MessageEmbed } = require('discord.js')

const format = require('../util/formatViews')

module.exports = {
    name: 'stats',
    description: 'Retrieve the bot stats',
		guildOnly: true,
    cooldown: 1,
    async execute(message, args) {

        const embed = new MessageEmbed()
        .setTitle(`Stats`)
        .addField('Name: ', format(message.client.user.username))
        .addField('Servers:', format(message.client.guilds.cache.size))
        .addField('Users: ', format(message.client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)))
        .addField('Owner: ', 'JairusSW#3022')
        .setThumbnail(message.client.user.displayAvatarURL())
        .setColor('#31A5A5')
        .setTimestamp()
        .setFooter(message.author.username)

        message.channel.send(embed)

    }
}