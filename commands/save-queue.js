const { MessageEmbed } = require('discord.js')

const songLength = require('../util/songLength')

const toProperCase = require('../util/toProper')

const createCode = require('../util/createCode')

module.exports = {
	name: 'save-queue',
	description: 'Save Queue To User Playlists.',
	aliases: ['sq', 'save-playlist', 'sp'],
	guildOnly: true,
	cooldown: 3,
	async execute(message, args) {

	try {
	
		const userQueue = message.client.queue.get(message.author.id)

		const user = message.client.userDatabase

		if (!userQueue) {

			const noQueue = new MessageEmbed()
			.setTitle('Nothing To Save.')
			.setColor('#31A5A5')
			.setTimestamp()
			.setFooter(message.author.username)
	
			message.channel.send(noQueue)
	
			return

		}

		if (user.has(message.author.id) === false) {

			await user.set(message.author.id, {
				username: message.author.username,
				premium: false,
				votes: 0,
				playlists: [],
				avatar: message.author.displayAvatarURL()
			})

		}
		
		const musicData = message.client.musicDatabase

		const PlaylistName = new MessageEmbed()
		.setTitle(`What Is The Playlist\'s Name?`)
		.setColor('#31A5A5')
		.setTimestamp()
		.setFooter(message.author.username)
		
		await message.channel.send(PlaylistName)

		const filter = m => message.author.id === m.author.id;
		
		try {
				
			const messages = await message.channel.awaitMessages(filter, { time: 15000, max: 1, errors: ['time'] })
					
			const name = messages.first().content.toLowerCase().trim()

			const shareCode = createCode()

			const userData = await user.get(message.author.id)

			const userPlaylists = userData['playlists'] || []

			const musicChunk = {
				title: name,
				songs: userQueue['songs'],
				image: userQueue['songs'][0].thumbnail,
				shareCode: shareCode,
				votes: 10
			}

			await musicData.set(shareCode.toLowerCase(), musicChunk)
			//==> Save Share Code And Data Internally

			await musicData.set(name.toLowerCase(), shareCode)
			//==> Set Name And Connect To Share Code

			userPlaylists.push(shareCode)
			//==> Push Code To User Playlists

			await user.set(message.author.id, userData)

			const Playlist = new MessageEmbed()
			.setTitle(`New Playlist`)
			.addField('Name', toProperCase(name))
			.addField('Songs', userQueue.songs.length)
			.addField('Share', shareCode)
			.setImage(userQueue['songs'][0].thumbnail)
			.setColor('#31A5A5')
			.setTimestamp()
			.setFooter(message.author.username)

			let length = null

			for (const song of userQueue['songs']) {

				length = length + parseInt(song['length'])

			}

			Playlist.addField('Length', songLength(length.toString()))
			
			await message.channel.send(Playlist)

			return

		} catch (err) {

			const PlaylistKill = new MessageEmbed()
			.setTitle(`No Response. Cancelling.`)
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
