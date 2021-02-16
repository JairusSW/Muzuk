const { Client, Collection } = require('discord.js')

const ReziDB = require('./database')

require('dotenv').config()

module.exports = class extends Client {
	constructor(config) {
		super({
			disableMentions: 'everyone'
		})

		this.commands = new Collection()

		this.cooldowns = new Collection()
		
		this.queue = new Map()

		this.config = config

		this.youtubeKeys = JSON.parse(process.env.ytKeys)

		this.userDatabase = ReziDB.userDatabase

		this.musicDatabase = ReziDB.musicDatabase
		
	}
}
