const { MessageEmbed } = require('discord.js')

module.exports = {
	name: 'stop',
	description: 'Stop command.',
	aliases: ['st', 'sp'],
	guildOnly: true,
	cooldown: 5,
	async execute(message, args) {

	try {

		const { channel } = message.member.voice

		if (!channel) {
						
			const noChannel = new MessageEmbed()
			.setTitle('Nothing To Stop.')
			.setColor('#31A5A5')
			.setTimestamp()
			.setFooter(message.author.username)

			message.channel.send(noChannel)

			return

		}

		const userQueue = message.client.queue.get(message.author.id)

		if (!userQueue) {
			
			const noStop = new MessageEmbed()
			.setTitle('Nothing To Stop.')
			.setColor('#31A5A5')
			.setTimestamp()
			.setFooter(message.author.username)

			message.channel.send(noStop)

			return

		}

		userQueue.songs = []

		userQueue.voiceChannel.leave()

		message.client.queue.delete(message.author.id)

		const Stop = new MessageEmbed()
		.setTitle('Stopped.')
		.setColor('#31A5A5')
		.setTimestamp()
		.setFooter(message.author.username)

		message.channel.send(Stop)

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
