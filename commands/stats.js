const { MessageEmbed } = require('discord.js')

const format = require('../util/formatViews')

module.exports = {
    name: 'stats',
    description: 'Retrieve the bot stats',
		guildOnly: true,
    cooldown: 1,
    async execute(message, args) {

        let serverList = await message.client.shard.fetchClientValues('guilds.cache.size')
        
        serverList = serverList.reduce((acc, guildCount) => acc + guildCount, 0)

        let userList = await message.client.shard.fetchClientValues('users.cache.size')
        
        userList = userList.reduce((acc, userCount) => acc + userCount, 0)//.reduce((a, g) => a + g.memberCount, 0)

        const embed = new MessageEmbed()
        .setTitle(`Stats`)
        .addField('Name: ', message.client.user.username)
        .addField('Servers:', format(serverList))
        .addField('Users: ', format(message.client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)))
        .addField('Owner: ', 'JairusSW#3022')
        .setThumbnail(message.client.user.displayAvatarURL())
        .setColor('#31A5A5')
        .setTimestamp()
        .setFooter(message.author.username)

        message.channel.send(embed)

    }
}