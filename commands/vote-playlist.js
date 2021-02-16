const { MessageEmbed } = require('discord.js')

const songLength = require('../util/songLength')

const toProperCase = require('../util/toProper')

const isCode = require('../util/isCode')

const nameToCode = require('../util/nameToCode')

const codeToName = require('../util/codeToName')

const ms = require('ms')

//const codeToQueue = require('../util/codeToQueue')

module.exports = {
	name: 'vote-playlist',
	description: 'Upvote Playlist.',
	aliases: ['vote', 'vote-queue'],
	guildOnly: true,
	cooldown: ms('1d') / 1000,
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

			console.log(code)

			code = code.toLowerCase()

			const queueData = await musicData.get(code)

			const queueSongs = queueData['songs']

			const queueImage = queueData['image']

			const queueName = queueData['title']

			queueData['votes'] = queueData['votes'] + 1

			await musicData.set(code, queueData)

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
	
					seconds = seconds + song.seconds
	
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

			console.log(err)

			const PlaylistKill = new MessageEmbed()
			.setTitle(`Could Not Find Playlist`)
			.setColor('#31A5A5')
			.setTimestamp()
			.setFooter(message.author.username)
			
			await message.channel.send(PlaylistKill)

			return

		}

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
