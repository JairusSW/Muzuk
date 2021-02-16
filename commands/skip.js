const { MessageEmbed } = require('discord.js')

module.exports = {
	name: 'skip',
	description: 'Skip command.',
	aliases: ['sk'],
	guildOnly: true,
	cooldown: 3,
	async execute(message, args) {

	try {

		const { channel } = message.member.voice

		if (!channel) {
			
			const noChannel = new MessageEmbed()
			.setTitle('Nothing To Skip.')
			.setColor('#31A5A5')
			.setTimestamp()
			.setFooter(message.author.username)

			message.channel.send(noChannel)

			return

		}

		const userQueue = message.client.queue.get(message.author.id)

		if (!userQueue) {
			
			const noSkip = new MessageEmbed()
			.setTitle('Nothing To Skip.')
			.setColor('#31A5A5')
			.setTimestamp()
			.setFooter(message.author.username)

			message.channel.send(noSkip)

			return

		}

		userQueue.connection.dispatcher.end()

		const Skip = new MessageEmbed()
		.setTitle('Skipped.')
		.setColor('#31A5A5')
		.setTimestamp()
		.setFooter(message.author.username)

		message.channel.send(Skip)

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