const { MessageEmbed } = require('discord.js')

module.exports = {
	name: 'queue',
	description: 'Queue command.',
	aliases: ['qu', 'q'],
	guildOnly: true,
	cooldown: 3,
	async execute(message, args) {

	try {	

		const userQueue = message.client.queue.get(message.author.id)

		if (!userQueue) {

			const noQueue = new MessageEmbed()
			.setTitle('Nothing Is Playing.')
			.setColor('#31A5A5')
			.setTimestamp()
			.setFooter(message.author.username)
	
			message.channel.send(noQueue)

			return

		}

		const Queue = new MessageEmbed()
		.setTitle('Queue')
		.setColor('#31A5A5')
		.setTimestamp()
		.setFooter(message.author.username)

		let index = 0

		for (const song of userQueue.songs) {

			if (index === userQueue.location) {

				Queue.addField(`**${index + 1}. **`, `**${song.shortTitle}**`)

				index++

			} else {

				Queue.addField(`${index + 1}. `, `${song.shortTitle}`)

				index++

			}

		}

		message.channel.send(Queue)

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
