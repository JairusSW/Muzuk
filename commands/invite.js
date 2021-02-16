const { MessageEmbed } = require('discord.js')

const songLength = require('../util/songLength')

const formatViews = require('../util/formatViews')

module.exports = {
	name: 'invite',
	description: 'Send Bot Invite Link',
	cooldown: 3,
	guildOnly: true,
	execute(message) {
		
		try {

			const Invite = new MessageEmbed()
			.setTitle(`https://discord.com/oauth2/authorize?client_id=${message.client.config.id}&scope=bot&permissions=66113344`)
			.setColor('#31A5A5')
			.setTimestamp()
			.setFooter(message.author.username)

			message.channel.send(Invite)


		} catch {

			const Unavaliable = new MessageEmbed()
			.setTitle('Something Happened.')
			.setColor('#31A5A5')
			.setTimestamp()
			.setFooter(message.author.username)

			message.channel.send(Unavaliable)

		}
	
	}

}
