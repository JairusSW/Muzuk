const { MessageEmbed } = require('discord.js')

module.exports = {
	name: 'mute',
	description: 'Mute command.',
	aliases: ['mt', 'm'],
	guildOnly: true,
	cooldown: 5,
	async execute(message, args) {

try {

		const { channel } = message.member.voice

		if (!channel) {

			const noChannel = new MessageEmbed()
			.setTitle('Nothing Is Playing.')
			.setColor('#31A5A5')
			.setTimestamp()
			.setFooter(message.author.username)

			message.channel.send(noChannel)

			return

		}

		const userQueue = message.client.queue.get(message.author.id)

		if (!userQueue) {

			const noVolume = new MessageEmbed()
			.setTitle('Nothing To Mute.')
			.setColor('#31A5A5')
			.setTimestamp()
			.setFooter(message.author.username)

			message.channel.send(noVolume)

			return

		}

        if (userQueue.mute === true) {
        
			userQueue.connection.dispatcher.setVolumeLogarithmic(userQueue.volume / 5)
			
			userQueue.mute = false

			const MuteOff = new MessageEmbed()
			.setTitle('Mute Off.')
			.setColor('#31A5A5')
			.setTimestamp()
			.setFooter(message.author.username)
	
			message.channel.send(MuteOff)

			return

		}

		if (userQueue.mute === false) {
        
			userQueue.connection.dispatcher.setVolumeLogarithmic(0 / 5)
			
			userQueue.mute = true

			const MuteOn = new MessageEmbed()
			.setTitle('Mute On.')
			.setColor('#31A5A5')
			.setTimestamp()
			.setFooter(message.author.username)
	
			message.channel.send(MuteOn)

			return

		}

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
