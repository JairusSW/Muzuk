const { MessageEmbed } = require('discord.js')

module.exports = {
	name: 'commands',
	description: 'View Muzuk\'s Commands',
	aliases: ['help'],
	cooldown: 3,
	guildOnly: true,
	async execute(message, args) {

		try {

			const Commands = new MessageEmbed()
				.setTitle('Commands')
				.addField('Play [url/title/code/id]', 'Play A Youtube Song/Playlist Or Playlist Code')
				.addField('Search [title]', 'Search A Youtube/Youtube Music Song')
				.addField('Pause', 'Pause Current Song/Playlist')
				.addField('Resume', 'Resume Current Song/Playlist')
				.addField('Stop', 'Stop All Songs/Playlists')
				.addField('Current', 'View Current Song/Playlist')
				.addField('Shuffle', 'Shuffle On/Off')
				.addField('Loop', 'Loop On/Off')
				.addField('Volume', 'Volume Up/Down/Off')
				.addField('Mute', 'Mute On/Off')
				.addField('Queue', 'View Current Queue')
				.addField('Lyrics', 'View Current Lyrics')
				.addField('Search-Lyrics', 'Search For Lyrics')
				.addField('Skip', 'Skip The Current Song')
				.addField('Back', 'Revert To Previous Song')
				.addField('Save-Queue', 'Save Queue As Muzuk Playlist')
				.addField('View-Playlist [code]', 'View Playlist/Queue')
				.addField('Load-Playlist [code]', 'Load And Play Provided Playlist/Queue')
				.addField('Vote-Playlist [code]', 'Vote For Playlist')
				.addField('My-Playlists', 'View Your Playlists')
				.addField('Invite', 'Invite The Bot')
				.setThumbnail(message.client.user.displayAvatarURL())
				.setColor('#31A5A5')
				.setTimestamp()
				.setFooter(message.author.username)

			message.channel.send(Commands)

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