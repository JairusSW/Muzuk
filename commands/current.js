const { MessageEmbed } = require('discord.js')

const songLength = require('../util/songLength')

const formatViews = require('../util/formatViews')

module.exports = {
	name: 'current',
	description: 'Display The Current Song',
	cooldown: 3,
	guildOnly: true,
	async execute(message, args) {
		
		try {

		const userQueue = message.client.queue.get(message.author.id)

		if (!userQueue) {
						
			const noSong = new MessageEmbed()
			.setTitle('Nothing Is Playing.')
			.setColor('#31A5A5')
			.setTimestamp()
			.setFooter(message.author.username)

			message.channel.send(noSong)

			return

		}

		//▬▬▬▬▬▬:radio_button:▬▬▬▬▬▬▬

		const song = userQueue.songs[userQueue['location']]

		const nowPlaying = new MessageEmbed()
		.setTitle(`${song.shortTitle}`)
		.setDescription(`Playing Now.`)
		.addField(`Length `, `${songLength(song.length)}`, true)
		.addField(`Quality `, `${[song.bitrate.toString().split('')[0], song.bitrate.toString().split('')[1]].join('')}kbps`, true)
		.addField(`Views `, `${formatViews(song.views)}`)
		.addField(`ID `, `${song.id}`, true)
		.addField(`Position `, `[${songLength((Date.now() - userQueue.current) / 1000)}/${songLength(song.length)}]`)
		.setImage(`${song.thumbnail}`)
		.setColor('#31A5A5')
		.setTimestamp()
		.setFooter(message.author.username)
		
		message.channel.send(nowPlaying)

		//🎶🔈🔉🔊➕🔃⏪⏩⏹⏸▶➖🔍🔄🔁🔀

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
