const { MessageEmbed } = require('discord.js')

const songLength = require('../util/songLength')

const toProperCase = require('../util/toProper')

const isCode = require('../util/isCode')

const nameToCode = require('../util/nameToCode')

module.exports = {
	name: 'view-playlist',
	description: 'View Playlist From User Playlists.',
	aliases: ['view', 'vp', 'vq'],
	guildOnly: true,
	cooldown: 3,
	async execute(message, args) {

	try {

		const user = message.client.userDatabase

		if (await user.has(message.author.id) === false) {

			await user.set(message.author.id, {
				username: message.author.username,
				premium: false,
				votes: 0,
				playlists: [],
				avatar: message.author.displayAvatarURL()
			})

		}
		
		const musicData = message.client.musicDatabase

		let code = args.join(' ').toString().trim()

		try {

			if (!isCode(code)) code = await nameToCode(code.toLowerCase(), musicData)

			code = code.toLowerCase()

			const queueData = await musicData.get(code)

			const queueImage = queueData['image']

			const queueName = queueData['title']

			if (!queueData) {

				const PlaylistNot = new MessageEmbed()
				.setTitle(`Could Not Find Playlist`)
				.setColor('#31A5A5')
				.setTimestamp()
				.setFooter(message.author.username)
				
				await message.channel.send(PlaylistNot)

				return

			}

			const getLength = (songs) => {

				let seconds = 0

				for (const song of songs) {
	
					seconds = seconds + parseInt(song.seconds)
	
				}

				return songLength(seconds)

			}
			
			const Playlist = new MessageEmbed()
			.setTitle(`Playlist - ${toProperCase(queueName)}`)
			.addField('Code', queueData['shareCode'])
			.addField('Votes', queueData['votes'])
			.addField('Songs', queueData['songs'].length)
			.addField('Length', getLength(queueData['songs']))
			.setThumbnail(queueImage)
			.setColor('#31A5A5')
			.setTimestamp()
			.setFooter(message.author.username)

			await message.channel.send(Playlist)

			return

		} catch (err) {

			const PlaylistKill = new MessageEmbed()
			.setTitle(`Could Not Find Playlist`)
			.setColor('#31A5A5')
			.setTimestamp()
			.setFooter(message.author.username)
			
			await message.channel.send(PlaylistKill)

			return

		}
			
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
