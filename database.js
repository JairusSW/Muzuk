const Air5 = require('air5')

module.exports = {
    userDatabase: new Air5('UserData', {
			provider: 'RocksDB'
	}),
    musicDatabase: new Air5('MusicData', {
			provider: 'RocksDB'
	})
}