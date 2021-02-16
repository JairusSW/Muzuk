const { MessageEmbed } = require('discord.js')

const toProperCase = require('../util/toProper')

module.exports = {
	name: 'my-playlist',
	description: 'View Your Playlists',
	aliases: ['playlists', 'my', 'my-playlists'],
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

    	const userData = await user.get(message.author.id)
		
		const musicData = message.client.musicDatabase

		try {

			if (userData.playlists.length <= 0) {

				const noPlaylist = new MessageEmbed()
				.setTitle(`No Playlists`)
				.setColor('#31A5A5')
				.setTimestamp()
				.setFooter(message.author.username)
		
				await message.channel.send(noPlaylist)

              	return

            }
			
			const Playlist = new MessageEmbed()
			.setTitle(`${message.author.username} - Playlists`)
			.setThumbnail(userData.avatar)
			.setColor('#31A5A5')
			.setTimestamp()
			.setFooter(message.author.username)

            let index = 0

            for (const code of userData.playlists) {

                const songData = await musicData.get(code.toLowerCase())

				let title = ''

				songData.title.split(' ').forEach((i) => {

					title += `${toProperCase(i)} `
					
				})

                Playlist.addField(`${index + 1}. ${title}`, code)

                index++

            }
            
			await message.channel.send(Playlist)

			return

		} catch (err) {

			const PlaylistKill = new MessageEmbed()
			.setTitle(`Could Not Find Playlists`)
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