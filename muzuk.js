require('dotenv').config()

const ytdl = require('./util/ytdlDiscord')

const getStream = require('get-stream')

const chalk = require('chalk')

const ms = require('ms')

const { readdirSync } = require('fs')

const { join } = require('path')

const MusicClient = require('./Client')

const songLength = require('./util/songLength')

const needle = require('needle')

const { Collection, MessageEmbed, MessageAttachment } = require('discord.js')

const client = new MusicClient({ token: process.env.DISCORD_TOKEN, prefix: process.env.DISCORD_PREFIX, id: process.env.DISCORD_ID })

const commandFiles = readdirSync(join(__dirname, 'commands')).filter(file => file.endsWith('.js'))

for (const file of commandFiles) {

	const command = require(join(__dirname, 'commands', `${file}`))

	client.commands.set(command.name, command)

}

client.on('messageReactionAdd', async (reaction, user) => {
					
	if (reaction.partial) {
		
		try {

			await reaction.fetch()

		} catch {
			
		}
	}

	let controlPanelEdit

	let song

	if (client.queue.has(user.id)) {

		const userQueue = client.queue.get(user.id)

		if (reaction.emoji.name) {

			const emojis = ['▶', '⏸', '⏪', '⏩', '🔄', '🔀', '⬇', '🔊', '🔉', '🔈']

			if (emojis.includes(reaction.emoji.name)) {

				if (reaction.emoji.name === '▶') {

					if (userQueue.playing === false) {
						
						console.log('resume')
						userQueue.connection.dispatcher.resume()

						userQueue.playing = true

					}

					song = userQueue.songs[userQueue.location]

					controlPanelEdit = new MessageEmbed()
					.setTitle(`Song Dashboard`)
					.addField(`Pause`, `${userQueue.playing ? 'Off' : 'On'}`)
					.addField(`Loop`, `${userQueue.loop ? 'On' : 'Off'}`)
					.addField(`Shuffle`, `${userQueue.shuffle ? 'On' : 'Off'}`)
					.addField(`Volume`, `${userQueue.volume * 10}`)
					.addField(`Position `, `[${songLength((Date.now() - userQueue.current) / 1000)}/${songLength(song.length)}]`)
					.setThumbnail(`${song.thumbnail}`)
					.setColor('#31A5A5')
					.setFooter(`----------------------------------------------------------------------------------------------`)

					reaction.message.edit(controlPanelEdit)

				}

				if (reaction.emoji.name === '⏸') {

					if (userQueue.playing === true)  {
						
						userQueue.connection.dispatcher.pause()

						userQueue.playing = false

					}

					song = userQueue.songs[userQueue.location]

					controlPanelEdit = new MessageEmbed()
					.setTitle(`Song Dashboard`)
					.addField(`Pause`, `${userQueue.playing ? 'Off' : 'On'}`)
					.addField(`Loop`, `${userQueue.loop ? 'On' : 'Off'}`)
					.addField(`Shuffle`, `${userQueue.shuffle ? 'On' : 'Off'}`)
					.addField(`Volume`, `${userQueue.volume * 10}`)
          .addField(`Position `, `[${songLength((Date.now() - userQueue.current) / 1000)}/${songLength(song.length)}]`)
					.setThumbnail(`${song.thumbnail}`)
					.setColor('#31A5A5')
					.setFooter(`----------------------------------------------------------------------------------------------`)


					reaction.message.edit(controlPanelEdit)

				}

				if (reaction.emoji.name === '⏩') {

					console.log('Skip!')

					userQueue.connection.dispatcher.end()

					song = userQueue.songs[userQueue.location]

					controlPanelEdit = new MessageEmbed()
					.setTitle(`Song Dashboard`)
					.addField(`Pause`, `${userQueue.playing ? 'Off' : 'On'}`)
					.addField(`Loop`, `${userQueue.loop ? 'On' : 'Off'}`)
					.addField(`Shuffle`, `${userQueue.shuffle ? 'On' : 'Off'}`)
					.addField(`Volume`, `${userQueue.volume * 10}`)
          .addField(`Position `, `[${songLength((Date.now() - userQueue.current) / 1000)}/${songLength(song.length)}]`)
					.setThumbnail(`${song.thumbnail}`)
					.setColor('#31A5A5')
					.setFooter(`----------------------------------------------------------------------------------------------`)

					reaction.message.edit(controlPanelEdit)

				}

				if (reaction.emoji.name === '⏪') {

					console.log('Back!')

					userQueue.location = userQueue.location - 2

					userQueue.connection.dispatcher.end()

					song = userQueue.songs[userQueue.location]

					controlPanelEdit = new MessageEmbed()
					.setTitle(`Song Dashboard`)
					.addField(`Pause`, `${userQueue.playing ? 'Off' : 'On'}`)
					.addField(`Loop`, `${userQueue.loop ? 'On' : 'Off'}`)
					.addField(`Shuffle`, `${userQueue.shuffle ? 'On' : 'Off'}`)
					.addField(`Volume`, `${userQueue.volume * 10}`)
          .addField(`Position `, `[${songLength((Date.now() - userQueue.current) / 1000)}/${songLength(song.length)}]`)
					.setThumbnail(`${song.thumbnail}`)
					.setColor('#31A5A5')
					.setFooter(`----------------------------------------------------------------------------------------------`)

					reaction.message.edit(controlPanelEdit)

				}

				if (reaction.emoji.name === '🔄') {

					console.log('Loop!')

					userQueue.loop ? userQueue.loop = false : userQueue.loop = true

					song = userQueue.songs[userQueue.location]

					controlPanelEdit = new MessageEmbed()
					.setTitle(`Song Dashboard`)
					.addField(`Pause`, `${userQueue.playing ? 'Off' : 'On'}`)
					.addField(`Loop`, `${userQueue.loop ? 'On' : 'Off'}`)
					.addField(`Shuffle`, `${userQueue.shuffle ? 'On' : 'Off'}`)
					.addField(`Volume`, `${userQueue.volume * 10}`)
          .addField(`Position `, `[${songLength((Date.now() - userQueue.current) / 1000)}/${songLength(song.length)}]`)
					.setThumbnail(`${song.thumbnail}`)
					.setColor('#31A5A5')
					.setFooter(`----------------------------------------------------------------------------------------------`)

					reaction.message.edit(controlPanelEdit)

				}

				if (reaction.emoji.name === '🔀') {

					console.log('Shuffle!')

					userQueue.shuffle ? userQueue.shuffle = false : userQueue.shuffle = true

					song = userQueue.songs[userQueue.location]

					controlPanelEdit = new MessageEmbed()
					.setTitle(`Song Dashboard`)
					.addField(`Pause`, `${userQueue.playing ? 'Off' : 'On'}`)
					.addField(`Loop`, `${userQueue.loop ? 'On' : 'Off'}`)
					.addField(`Shuffle`, `${userQueue.shuffle ? 'On' : 'Off'}`)
					.addField(`Volume`, `${userQueue.volume * 10}`)
          .addField(`Position `, `[${songLength((Date.now() - userQueue.current) / 1000)}/${songLength(song.length)}]`)
					.setThumbnail(`${song.thumbnail}`)
					.setColor('#31A5A5')
					.setFooter(`----------------------------------------------------------------------------------------------`)
					reaction.message.edit(controlPanelEdit)

				}

				if (reaction.emoji.name === '🔊') {

					console.log('Volume Up!')

					userQueue.volume = userQueue.volume + 1

					userQueue.connection.dispatcher.setVolumeLogarithmic(userQueue.volume / 5)

					song = userQueue.songs[userQueue.location]

					controlPanelEdit = new MessageEmbed()
					.setTitle(`Song Dashboard`)
					.addField(`Pause`, `${userQueue.playing ? 'Off' : 'On'}`)
					.addField(`Loop`, `${userQueue.loop ? 'On' : 'Off'}`)
					.addField(`Shuffle`, `${userQueue.shuffle ? 'On' : 'Off'}`)
					.addField(`Volume`, `${userQueue.volume * 10}`)
          .addField(`Position `, `[${songLength((Date.now() - userQueue.current) / 1000)}/${songLength(song.length)}]`)
					.setThumbnail(`${song.thumbnail}`)
					.setColor('#31A5A5')
					.setFooter(`----------------------------------------------------------------------------------------------`)

					reaction.message.edit(controlPanelEdit)

				}

				if (reaction.emoji.name === '🔉') {

					console.log('Volume Down!')

					userQueue.volume = userQueue.volume - 1

					userQueue.connection.dispatcher.setVolumeLogarithmic(userQueue.volume / 5)

					song = userQueue.songs[userQueue.location]

					controlPanelEdit = new MessageEmbed()
					.setTitle(`Song Dashboard`)
					.addField(`Pause`, `${userQueue.playing ? 'Off' : 'On'}`)
					.addField(`Loop`, `${userQueue.loop ? 'On' : 'Off'}`)
					.addField(`Shuffle`, `${userQueue.shuffle ? 'On' : 'Off'}`)
					.addField(`Volume`, `${userQueue.volume * 10}`)
          .addField(`Position `, `[${songLength((Date.now() - userQueue.current) / 1000)}/${songLength(song.length)}]`)
					.setThumbnail(`${song.thumbnail}`)
					.setColor('#31A5A5')
					.setFooter(`----------------------------------------------------------------------------------------------`)

					reaction.message.edit(controlPanelEdit)

				}

				if (reaction.emoji.name === '🔈') {

					console.log('Volume Off!')

					if (userQueue.mute === true) {

						userQueue.mute = false

						userQueue.connection.dispatcher.setVolumeLogarithmic(userQueue.volume / 5)

					}

					if (userQueue.mute === false) {

						userQueue.mute = true

						userQueue.connection.dispatcher.setVolumeLogarithmic(0 / 5)
						
					}

					song = userQueue.songs[userQueue.location]

					controlPanelEdit = new MessageEmbed()
					.setTitle(`Song Dashboard`)
					.addField(`Pause`, `${userQueue.playing ? 'Off' : 'On'}`)
					.addField(`Loop`, `${userQueue.loop ? 'On' : 'Off'}`)
					.addField(`Shuffle`, `${userQueue.shuffle ? 'On' : 'Off'}`)
					.addField(`Volume`, `${userQueue.volume * 10}`)
          .addField(`Position `, `[${songLength((Date.now() - userQueue.current) / 1000)}/${songLength(song.length)}]`)
					.setThumbnail(`${song.thumbnail}`)
					.setColor('#31A5A5')
					.setFooter(`----------------------------------------------------------------------------------------------`)

					reaction.message.edit(controlPanelEdit)

				}

				if (reaction.emoji.name === '⬇') {

					try {

						const current = userQueue.songs[userQueue['location']]

						const link = (await needle('get', `https://ytdl.jairussw.repl.co/download?url=${current.url}/`)).body

						if (link === '401') {
							
								const noSongi = new MessageEmbed()
								.setTitle('Song Unavaliable')
								.setColor('#31A5A5')
								.setTimestamp()
								.setFooter(message.author.username)

								message.channel.send(noSongi)

								return

						}
						
						const ReadyURL = new MessageAttachment(link, `${current.title}.mp3`.replace(' ', '-'))
			
						reaction.message.channel.send(ReadyURL)

						return

					} catch (err) {
			
						console.log(err)
			
						const Unavaliable = new MessageEmbed()
						.setTitle('Song Unavaliable')
						.setColor('#31A5A5')
						.setTimestamp()
						.setFooter(user.username)
			
						user.dmChannel.send(Unavaliable)
			
					}

					controlPanelEdit = new MessageEmbed()
					.setTitle(`Song Dashboard`)
					.addField(`Pause`, `${userQueue.playing ? 'Off' : 'On'}`)
					.addField(`Loop`, `${userQueue.loop ? 'On' : 'Off'}`)
					.addField(`Shuffle`, `${userQueue.shuffle ? 'On' : 'Off'}`)
					.addField(`Volume`, `${userQueue.volume * 10}`)
          .addField(`Position `, `[${songLength((Date.now() - userQueue.current) / 1000)}/${songLength(song.length)}]`)
					.setThumbnail(`${song.thumbnail}`)
					.setColor('#31A5A5')
					.setFooter(`----------------------------------------------------------------------------------------------`)

					reaction.message.edit(controlPanelEdit)

				}

			}

		}

	}

})

client.once('ready', () => {
	
	console.log(chalk.bold.blue(`Status: Connected`))

	console.log(chalk.bold.blue(`Username: ${client.user.tag}`))

	client.user.setActivity('Muzuk', { type: 'LISTENING' })

	client.user.setStatus('online')

})

const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

client.on('message', message => {

	if (message.author.bot) return

	const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(client.config.prefix)})\\s*`)

	if (!prefixRegex.test(message.content)) return

	let [, matchedPrefix] = message.content.match(prefixRegex)

	matchedPrefix = matchedPrefix.trim()

	const prefixes = [client.config.prefix, `<@!${client.config.id}>`]

	console.log('matched: ', matchedPrefix, prefixes.includes(matchedPrefix), `<@!${client.config.id}>`)

	if (prefixes.includes(matchedPrefix) === false) return

	const args = message.content.slice(matchedPrefix.length).trim().split(/ +/)

	const commandName = args.shift().toLowerCase()

	const command = client.commands.get(commandName)|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return

	if (command.guildOnly && message.channel.type !== 'text') {

		const serverOnly = new MessageEmbed()
		.setTitle(`Please Move To A Server.`)
		.setColor('#31A5A5')
		.setTimestamp()
		.setFooter(message.author.username)

		message.channel.send(serverOnly)

		return

	}

	if (command.args && !args.length) {

		const noArgs = new MessageEmbed()
		.setTitle(`Please Provide The Needed Input.`)
		.setColor('#31A5A5')
		.setTimestamp()
		.setFooter(message.author.username)

		message.channel.send(noArgs)

		return

	}

	if (!client.cooldowns.has(command.name)) {

		client.cooldowns.set(command.name, new Collection())

	}

	const now = Date.now()

	const timestamps = client.cooldowns.get(command.name)

	const cooldownAmount = (command.cooldown || 3) * 1000

	if (timestamps.has(message.author.id)) {

		const expirationTime = timestamps.get(message.author.id) + cooldownAmount

		if (now < expirationTime) {

			const timeLeft = (expirationTime - now)

			const slowDown = new MessageEmbed()
			.setTitle(`Slow Down. ${ms(timeLeft | 0)} Left.`)
			.setColor('#31A5A5')
			.setTimestamp()
			.setFooter(message.author.username)

			message.channel.send(slowDown)

			return

		}

	}

	timestamps.set(message.author.id, now)

	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)

	try {

		command.execute(message, args)

	} catch (error) {

		console.error(error)

		const errorMessage = new MessageEmbed()
		.setTitle(`Something Happened. Try Again.`)
		.setColor('#31A5A5')
		.setTimestamp()
		.setFooter(message.author.username)

		message.channel.send(errorMessage)

	}

})

client.login(client.config.token)

const http = require('http')

const server = http.createServer((req, res) => {

  res.writeHead(200)

  res.end('ok')
  
})

server.listen(3000)

process.on('unhandledRejection', (err) => console.log('Unhandled Rejection Error: ', err))