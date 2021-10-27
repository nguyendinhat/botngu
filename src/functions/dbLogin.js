const mongoose = require('mongoose')
const { db_token } = require('../data/config.json')
const { readdirSync } = require('fs')

const mongoEventFiles = readdirSync('./src/mongoEvents').filter(file => file.endsWith('.js'))

module.exports = (client) => {
    client.dbLogin = async () => {

        for (file of mongoEventFiles) {
            const event = require(`../mongoEvents/${file}`)
            if (event.once) {
                mongoose.connection.once(event.name,(...args) => event.execute(...args))
            } else {
                mongoose.connection.on(event.name,(...args) => event.execute(...args))
            }
        }
        mongoose.Promise = global.Promise
        await mongoose.connect(db_token, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
    }
}