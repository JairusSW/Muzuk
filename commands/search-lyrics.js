const { MessageEmbed } = require('discord.js')

const lyricsFinder = require("lyrics-finder")

module.exports = {
	name: 'search-lyrics',
	description: 'Lyrics search command.',
	aliases: [],
	guildOnly: true,
	cooldown: 5,
	async execute(message, args) {

	try {

		const title = args.join('').toLowerCase()

		if (!title) {

			const noChannel = new MessageEmbed()
			.setTitle('Nothing Is Search.')
			.setColor('#31A5A5')
			.setTimestamp()
			.setFooter(message.author.username)

			message.channel.send(noChannel)

			return

		}

		let lyrics

        try {

			lyrics = await lyricsFinder(title, "")

			if (lyrics == null || lyrics === '') throw new Error('No Lyrics')

					if (lyrics.length >= 1900) {
						
						await message.channel.send(`**Lyrics**`)

						const lyric1 = lyrics.slice(0, 1900)

						const lyric2 = lyrics.slice(1900, lyrics.length)
						
						await message.channel.send(lyric1)

						await message.channel.send(lyric2)

						return

					}
					
					message.channel.send(`**Lyrics**`)

					message.channel.send(lyrics)

        } catch (err) {

            const LyricsErr = new MessageEmbed()
            .setTitle('Lyrics Unavaliable.')
            .setColor('#31A5A5')
            .setTimestamp()
            .setFooter(message.author.username)

            message.channel.send(LyricsErr)

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
