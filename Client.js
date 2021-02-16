const { Client, Collection } = require('discord.js')

const Air5 = require('air5')

const database = new Air5('Muzuk', {
	provider: 'RocksDB'
})

require('dotenv').config()

class MuzukClient extends Client {
	constructor(options) {
		super(options)

		this.commands = new Collection()

		this.cooldowns = new Collection()

		this.prefix = process.env.prefix
		
		this.queue = new Map()

		this.userDatabase = database

		this.musicDatabase = database
		
	}
}

module.exports = MuzukClient