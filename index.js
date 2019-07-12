const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb')

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
    console.info('connect to db success')

    const memberSchema = mongoose.Schema({
        nick: String,
        createTime: Date,
    })

    memberSchema.methods.login = function () {
        console.info('hi ' + this.nick)
    }

    const Member = mongoose.model('member', memberSchema)

    Member.find({ }, function (err, data) {
        console.info(err, data)
    })

    var zs = new Member({ nick: '张三', createTime: new Date() })

    zs.save(function (err, that) {
        if (err) return console.error(err)
        that.login()
    })

    zs.login()
})

console.info({ mongoose })
