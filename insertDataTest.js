const User = require('./src/models/User')

// mongodb
const mongoose = require('mongoose');
mongoURL = "mongodb+srv://Toby0106:dbforcardbo@cluster0-gfwld.mongodb.net/todo?retryWrites=true&w=majority"
mongoose.connect(mongoURL, { useNewUrlParser: true });
db = mongoose.connection;
db.on('error', e => {
    console.log(e);
})
db.once('open', () => {
    console.log('MongoDB connected!');
})

var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);

function loop() {

    rl.question('Enter line ID: ', (lineID) => {
        rl.question('Enter display name: ', (displayName) => {
            rl.question('Enter nickname: ', (nickName) => {
                rl.question('Enter gender: ', (gender) => {
                    rl.question('Enter card: ', (card) => {
                        console.log(User);
                        const newUser = new User({
                            lineID: lineID,
                            displayName: displayName,
                            nickName: nickName,
                            gender: gender,
                            card: [card],
                        })
                        newUser.save().then((user) => {
                            console.log('New user created!');
                            console.log(user);
                            loop();
                        })
                    })
                });
            });
        });
    });
}

loop();