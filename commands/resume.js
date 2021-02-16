const { MessageEmbed } = require('discord.js')

module.exports = {
	name: 'resume',
	description: 'Resume command.',
	aliases: ['r'],
	guildOnly: true,
	cooldown: 5,
	async execute(message, args) {

	try {

		const userQueue = message.client.queue.get(message.author.id)

		if (userQueue && userQueue.playing === false) {

			userQueue.connection.dispatcher.resume()

			userQueue.playing = true

			const Resume = new MessageEmbed()
			.setTitle('Resumed.')
			.setColor('#31A5A5')
			.setTimestamp()
			.setFooter(message.author.username)

			message.channel.send(Resume)

			return

		}
		
		const noResume = new MessageEmbed()
		.setTitle('Nothing To Resume.')
		.setColor('#31A5A5')
		.setTimestamp()
		.setFooter(message.author.username)

		message.channel.send(noResume)

		return

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
