const { Util } = require('discord.js')

const { MessageEmbed } = require('discord.js')

const ytdl = require('ytdl-core')

const ytdlOpus = require('ytdl-core-discord')

const songLength = require('../util/songLength')

const formatViews = require('../util/formatViews')

const shortenTitle = require('../util/shortenTitle')

const isURL = require('is-url')

const isYoutubeURL = require('../util/isYoutubeURL')

const isCode = require('../util/isCode')

const searchYT = require('../util/searchYT')

const toSeconds = require('../util/toSeconds')

const getPlaylistID = require('../util/getPlaylistID')

const ytpl = require('ytpl')

module.exports = {
	name: 'play',
	description: 'Play command.',
	usage: '[command name]',
	aliases: ['search', 'load-playlist', 'load', 'load-queue'],
	args: true,
	guildOnly: true,
	cooldown: 5,
	async execute(message, args) {
		
		try {

		const musicData = message.client.musicDatabase

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
		
		const { channel } = message.member.voice

		if (!channel) {

			const not_voice_channel = new MessageEmbed()
			.setTitle('Enter A Voice Channel.')
			.setColor('#31A5A5')
			.setTimestamp()
			.setFooter(message.author.username)

			message.channel.send(not_voice_channel)

			return

		}

		// Try To Force In To Channel
		if (channel.full) {

			try {

				await channel.setUserLimit(channel.userLimit + 1)

			} catch (err) {

				console.log(err)

				const full_channel = new MessageEmbed()
				.setTitle('Channel Is Full. Select A Different Channel.')
				.setColor('#31A5A5')
				.setTimestamp()
				.setFooter(message.author.username)
	
				message.channel.send(full_channel)

				channel.leave()

				return

			}

		}
 
		const permissions = channel.permissionsFor(message.client.user)

		if (!permissions.has('CONNECT')) {
		
			const connect_permission = new MessageEmbed()
			.setTitle('I Don\'t Have Permission To Join')
			.setColor('#31A5A5')
			.setTimestamp()
			.setFooter(message.author.username)

			message.channel.send(connect_permission)

			return

		}

		if (!permissions.has('SPEAK')) {

			const speak_permission = new MessageEmbed()
			.setTitle('I Don\'t Have Permission To Speak')
			.setColor('#31A5A5')
			.setTimestamp()
			.setFooter(message.author.username)

			message.channel.send(speak_permission)

			return

		}

		const userQueue = message.client.queue.get(message.author.id)

		let song

		let playlist = false

		try {
				
			// Youtube Playlist

			if (getPlaylistID(args[0])) {

				// Youtube Playlist

				playlist = true

				const query = await ytpl(getPlaylistID(args[0]))

				song = []

				for (const item of query['items']) {

					song.push({
						id: item['id'],
						url: item['url'],
						title: Util.escapeMarkdown(item['title']),
						thumbnail: item['bestThumbnail'].url,
						length: toSeconds(item['duration']).toString(),
						seconds: toSeconds(item['duration']),
						views: 358924,
						shortTitle: shortenTitle(Util.escapeMarkdown(item['title'])),
						author: item['author'].name,
						bitrate: channel.bitrate
					})

				}

			} else if (ytdl.validateID(args[0].trim())) {

				// Youtube ID

				playlist = false

				const query = await ytdl.getBasicInfo(`https://youtube.com/watch?v=${args[0].trim()}`)

				song = {
					id: query['videoDetails'].videoId,
					url: query['videoDetails'].video_url,
					title: Util.escapeMarkdown(query['videoDetails'].title),
					thumbnail: query['videoDetails'].thumbnails[3].url,
					length: query['videoDetails'].lengthSeconds,
					seconds: parseInt(query['videoDetails'].lengthSeconds),
					views: query['videoDetails'].viewCount,
					shortTitle: shortenTitle(Util.escapeMarkdown(query['videoDetails'].title)),
					author: query['videoDetails']['ownerChannelName'],
					bitrate: channel.bitrate
				}

			} else if (isURL(args[0]) && isYoutubeURL(args[0])) {

				// Youtube URL

				playlist = false

				const query = await ytdl.getBasicInfo(args[0])

				song = {
					id: query['videoDetails'].videoId,
					url: query['videoDetails'].video_url,
					title: Util.escapeMarkdown(query['videoDetails'].title),
					thumbnail: query['videoDetails'].thumbnails[3].url,
					length: query['videoDetails'].lengthSeconds,
					seconds: parseInt(query['videoDetails'].lengthSeconds),
					views: query['videoDetails'].viewCount,
					shortTitle: shortenTitle(Util.escapeMarkdown(query['videoDetails'].title)),
					author: query['videoDetails']['ownerChannelName'],
					bitrate: channel.bitrate
				}

			} else if (isCode(args.join('').trim())) {

				// Playlist Search

				playlist = true

				const data = await musicData.get(args.join('').trim().toLowerCase())
	
				song = data['songs']

			} else {

				const data = await searchYT(args.join(' ').trim(), {
					limit: 1
				})

				const query = data[0]

				song = {
					id: query['id'],
					url: query['url'],
					title: Util.escapeMarkdown(query['title']),
					thumbnail: query['bestThumbnail'].url,
					length: toSeconds(query['duration']).toString(),
					seconds: toSeconds(query['duration']),
					views: query['views'],
					shortTitle: shortenTitle(Util.escapeMarkdown(query['title'])),
					author: query['author']['name'],
					bitrate: channel.bitrate
				}

			}

		} catch (err) {

			console.log(err)
			
			const song_unavaliable = new MessageEmbed()
			.setTitle('Song Is Unavaliable')
			.setColor('#31A5A5')
			.setTimestamp()
			.setFooter(message.author.username)

			message.channel.send(song_unavaliable)
			
			return

		}

		if (userQueue) {
			
			if (playlist === false) {
				
				userQueue.songs.push(song)

				const add_queue = new MessageEmbed()
				.setTitle('Song Added To Queue.')
				.setColor('#31A5A5')
				.setTimestamp()
				.setFooter(message.author.username)
				
				message.channel.send(add_queue)

				return

			} else {

				userQueue.songs.push(song[0])
	
				const add_pl = new MessageEmbed()
				.setTitle('Playlist Added To Queue.')
				.setColor('#31A5A5')
				.setTimestamp()
				.setFooter(message.author.username)
				
				message.channel.send(add_pl)

			}

		}

		const queueConstruct = {
			user: message.author,
			textChannel: message.channel,
			voiceChannel: channel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true,
			location: 0,
			loop: false,
			mute: false,
			shuffle: false,
			stream: null,
			current: null,
			firstMessage: false
		}

		message.client.queue.set(message.author.id, queueConstruct)

		if (playlist === false) {

			queueConstruct.songs.push(song)

		} else {

			queueConstruct.songs = song

		}

		const play = async song => {

			const queue = message.client.queue.get(message.author.id)

			if (!song.url) {

				queue.voiceChannel.leave()

				message.client.queue.delete(message.author.id)

				return

			}

			queue.stream = await ytdlOpus(song.url, { quality: 'lowestaudio', filter: 'audioonly', highWaterMark: 1 << 25 })

			queue.current = Date.now()

			const dispatcher = queue.connection.play(queue.stream, { type: 'opus' })

				dispatcher.on('finish', () => {

					if (queue.stream.destroyed == null) {

						queue.stream.destroy()

						queue.stream = null

						return

					}

					if (queue.loop === true) {

						if (queue.location >= queue.songs.length - 1) queue.location = -1
						
						queue.location++

					}

					if (queue.shuffle === true) {

						queue.location = (Math.random() * queue.songs.length) | 0

					}

					if (queue.shuffle === false && queue.loop === false) queue['location']++

					if (queue.location >= queue.songs.length && queue.loop === false && queue.shuffle === false) {

						const queueDone = new MessageEmbed()
						.setTitle(`Finished With Queue.`)
						.setColor('#31A5A5')
						.setTimestamp()
						.setFooter(message.author.username)
						
						queue.textChannel.send(queueDone)

						queue.voiceChannel.leave()
		
						message.client.queue.delete(message.author.id)
		
						return
		
					}

					play(queue.songs[queue['location']])

					const currentSong = queue.songs[queue['location']]

					const nextPlaying = new MessageEmbed()
					.setTitle(`${currentSong.shortTitle}`)
					.setDescription(`Playing Now.`)
					.addField(`Length `, `${songLength(song.length)}`)
					.addField(`Quality `, `${[song.bitrate.toString().split('')[0], song.bitrate.toString().split('')[1]].join('')}kbps`)
					.addField(`Views `, `${formatViews(currentSong.views)}`)
					.addField(`ID `, `${currentSong.id}`)
					.addField(`Position `, `[0:00/${songLength(song.length)}]`)
					.setThumbnail(`${currentSong.thumbnail}`)
					.setColor('#31A5A5')
					.setTimestamp()
					.setFooter(message.author.username)
					
					queue.textChannel.send(nextPlaying)

					return

				})

			dispatcher.on('error', error => console.error(error))

			dispatcher.setVolumeLogarithmic(queue.volume / 5)

			if (queue.firstMessage === false) {

				queue.firstMessage = true

				const nowPlaying = new MessageEmbed()
				.setTitle(`${song.shortTitle}`)
				.setDescription(`Playing Now.`)
				.addField(`Length `, `${songLength(song.length)}`)
				.addField(`Quality `, `${[song.bitrate.toString().split('')[0], song.bitrate.toString().split('')[1]].join('')}kbps`)
				.addField(`Views `, `${formatViews(song.views)}`)
				.addField(`ID `, `${song.id}`)
				.addField(`Position `, `[0:00/${songLength(song.length)}]`)
				.setThumbnail(`${song.thumbnail}`)
				.setColor('#31A5A5')
				.setTimestamp()
				.setFooter(message.author.username)
				
				queue.textChannel.send(nowPlaying)

				const controlPanel = new MessageEmbed()
				.setTitle(`Song Dashboard`)
				.addField(`Pause`, `${song.playing ? 'Off' : 'On'}`)
				.addField(`Loop`, `${song.loop ? 'On' : 'Off'}`)
				.addField(`Shuffle`, `${song.shuffle ? 'On' : 'Off'}`)
				.addField(`Volume`, `${song.volume * 10}`)
        .addField(`Position `, `[0:00/${songLength(song.length)}]`)
				.setThumbnail(`${song.thumbnail}`)
				.setColor('#31A5A5')
				.setFooter(`----------------------------------------------------------------------------------------------`)

				const control = await message.member.send(controlPanel)

				Promise.all([
					control.react('▶'),
					control.react('⏸'),
					control.react('⏪'),
					control.react('⏩'),
					control.react('🔄'),
					control.react('🔀'),
					control.react('🔊'),
					control.react('🔉'),
					control.react('🔈')
				])

			}

		}

		try {

			const connection = await channel.join()

			connection.voice.setSelfDeaf(true)

			queueConstruct.connection = connection

			play(queueConstruct.songs[queueConstruct['location']])

		} catch (err) {

			console.log(err)

			message.client.queue.delete(message.author.id)

			await channel.leave()

			const song_error = new MessageEmbed()
			.setTitle('Could Not Play Song.')
			.setColor('#31A5A5')
			.setTimestamp()
			.setFooter(message.author.username)
			
			message.channel.send(song_error)
			
			return

		}

			} catch (err) {

				console.log(err)

				const Unavaliable = new MessageEmbed()
				.setTitle('Something Happened.')
				.setColor('#31A5A5')
				.setTimestamp()
				.setFooter(message.author.username)

				message.channel.send(Unavaliable)

	}
	
	}
}