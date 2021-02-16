const { MessageEmbed, MessageAttachment, Util } = require('discord.js')

const fs = require('fs')

const ms = require('ms')

const isYoutubeURL = require('../util/isYoutubeURL')

const needle = require('needle')

const ytdl = require('ytdl-core')

module.exports = {
	name: 'download',
	description: 'Download Current Song Or URL',
	cooldown: ms('5m') / 1000,
	aliases: ['dl', 'mp3'],
	guildOnly: true,
	async execute(message, args) {
		
		try {

			let url

			let title
				
			const userQueue = message.client.queue.get(message.author.id)

			if (args[0] == null) {

				if (!userQueue) {
								
					const noSong = new MessageEmbed()
					.setTitle('Nothing Is To Download.')
					.setColor('#31A5A5')
					.setTimestamp()
					.setFooter(message.author.username)

					message.channel.send(noSong)

					return

				}	
	
				const song = userQueue.songs[userQueue['location']]
	
				url = song.url

				title = song.title

				const maxMinutes = 5

				if (song.seconds >= maxMinutes * 60) {

					const long = new MessageEmbed()
					.setTitle(`Song Is Too Long. Please Keep It Below ${maxMinutes} Minutes.`)
					.setColor('#31A5A5')
					.setTimestamp()
					.setFooter(message.author.username)

					message.channel.send(long)

					return

				}

				const link = (await needle('get', `https://ytdl.jairussw.repl.co/download?url=${url}/`)).body

				if (link === '401') {
					
						const noSong = new MessageEmbed()
						.setTitle('Song Unavaliable')
						.setColor('#31A5A5')
						.setTimestamp()
						.setFooter(message.author.username)

						message.channel.send(noSong)

						return

				}
				
				const ReadyURL = new MessageAttachment(link, `${title}.mp3`.replace(' ', '-'))
	
				message.channel.send(ReadyURL)

				return

			} else {

				url = args[0].replace(/<(.+)>/g, '$1')

				const query = await ytdl.getBasicInfo(args[0].replace(/<(.+)>/g, '$1'))

				const maxMinutes = 5

				if (parseInt(query.videoDetails.lengthSeconds) >= maxMinutes * 60) {

					const long = new MessageEmbed()
					.setTitle(`Song Is Too Long. Please Keep It Below ${maxMinutes} Minutes.`)
					.setColor('#31A5A5')
					.setTimestamp()
					.setFooter(message.author.username)

					message.channel.send(long)

					return

				}

				const link = (await needle('get', `https://ytdl.jairussw.repl.co/download?url=${url}/`)).body

				if (link === '401') {
					
					const noSong = new MessageEmbed()
					.setTitle('Song Unavaliable')
					.setColor('#31A5A5')
					.setTimestamp()
					.setFooter(message.author.username)

					message.channel.send(noSong)

					return

				}
				
				const ReadyURL = new MessageAttachment(link, `${Util.escapeMarkdown(query['videoDetails'].title)}.mp3`.replace(' ', '-'))
	
				message.channel.send(ReadyURL)

				return

			}
	
		} catch (err) {

			const Unavaliable = new MessageEmbed()
			.setTitle('Song Unavaliable')
			.setColor('#31A5A5')
			.setTimestamp()
			.setFooter(message.author.username)

			message.channel.send(Unavaliable)

		}
		
	}

}