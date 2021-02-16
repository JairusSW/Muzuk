const { MessageEmbed } = require('discord.js')

module.exports = {
	name: 'remove',
    description: 'Remove Song From Queue',
    aliases: ['rm'],
    guildOnly: true,
	cooldown: 3,
	async execute(message, args) {

        try {

		const userQueue = message.client.queue.get(message.author.id)

		if (userQueue.songs.length >= 1) {

			userQueue.songs.splice(userQueue['location'], 1)

      		userQueue.connection.dispatcher.end()

			userQueue.location = userQueue.location - 1

			const Remove = new MessageEmbed()
			.setTitle('Song Removed.')
			.setColor('#31A5A5')
			.setTimestamp()
			.setFooter(message.author.username)

			message.channel.send(Remove)

			return

		}
		
		const noRemove = new MessageEmbed()
		.setTitle('Nothing To Remove.')
		.setColor('#31A5A5')
		.setTimestamp()
		.setFooter(message.author.username)

		message.channel.send(noRemove)

	} catch (err) {

		const Unavaliable = new MessageEmbed()
		.setTitle('Something Happened.')
		.setColor('#31A5A5')
		.setTimestamp()
		.setFooter(message.author.username)

		message.channel.send(Unavaliable)

	}
	
	}

}
