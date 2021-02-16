const { MessageEmbed } = require('discord.js')

module.exports = {
	name: 'volume',
	description: 'Volume command.',
	aliases: ['v', 'vol'],
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
			.setTitle('Nothing To Crank.')
			.setColor('#31A5A5')
			.setTimestamp()
			.setFooter(message.author.username)

			message.channel.send(noVolume)

			return

		}

		const volumePanel = new MessageEmbed()
		.setTitle(`Double Click To Toggle Volume.`)
		.setColor('#31A5A5')
		.setTimestamp()
		.setFooter(message.author.username)

		message.channel.send(volumePanel).then((volPanel) => {

			Promise.all([
				volPanel.react('🔊'),
				volPanel.react('🔉'),
				volPanel.react('🔈')
			])

			const time = 1000 * 30

			const possibleEmojis = ['🔊', '🔉', '🔈']

			const filter = (reaction, user) => {

				return possibleEmojis.includes(reaction.emoji.name) && user.id === message.author.id

			}

			const collector = volPanel.createReactionCollector(filter, { time: time })
			
			collector.on('collect', async (reaction) => {
				
				if (reaction.emoji.name === '🔊') {

					userQueue.volume = userQueue.volume + 1

					userQueue.connection.dispatcher.setVolumeLogarithmic(userQueue.volume / 5)

				}

				if (reaction.emoji.name === '🔉') {

					userQueue.volume = userQueue.volume - 1

					userQueue.connection.dispatcher.setVolumeLogarithmic(userQueue.volume / 5)

				}

				if (reaction.emoji.name === '🔈') {

					if (userQueue.mute === true) {

						userQueue.mute = false

						userQueue.connection.dispatcher.setVolumeLogarithmic(userQueue.volume / 5)

					}

					if (userQueue.mute === false) {

						userQueue.mute = true

						userQueue.connection.dispatcher.setVolumeLogarithmic(0 / 5)
						
					}

				}

			})

		})

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
