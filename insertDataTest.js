const Card = require('./src/models/Card')

// mongodb
const mongoose = require('mongoose');
mongoURL = "mongodb+srv://Toby0106:dbforcardbo@cluster0-gfwld.mongodb.net/cardbo-db?retryWrites=true&w=majority"
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

// function loop() {

//     rl.question('Enter line ID: ', (lineID) => {
//         rl.question('Enter display name: ', (displayName) => {
//             rl.question('Enter nickname: ', (nickName) => {
//                 rl.question('Enter gender: ', (gender) => {
//                     rl.question('Enter card: ', (card) => {
//                         console.log(User);
//                         const newUser = new User({
//                             lineID: lineID,
//                             displayName: displayName,
//                             nickName: nickName,
//                             gender: gender,
//                             card: [card],
//                         })
//                         newUser.save().then((user) => {
//                             console.log('New user created!');
//                             console.log(user);
//                             loop();
//                         })
//                     })
//                 });
//             });
//         });
//     });
// }

// loop();
var readyCards = ['FlyGo卡', '環球/亞洲無限卡', '財富無限卡', '台新商務卡', '昇恆昌無限卡', '新光三越無限/世界卡', '國泰航空翱翔鈦金卡', '@GoGo悠遊御璽卡', '@GoGo iCash御璽卡', '@GoGo虛擬御璽卡', '玫瑰卡', 'Mercedes-Benz 信用卡', '雙幣信用卡', '尊爵世界卡', '太陽卡', '企業卡']
var readyCardsID = ['ts0001', 'ts0002', 'ts0003', 'ts0004', 'ts0005', 'ts0006', 'ts0007', 'ts0008', 'ts0009', 'ts0010', 'ts0011', 'ts0012', 'ts0013', 'ts0014', 'ts0015', 'ts0016']
var count = 0;
var check = { 'FlyGo卡': 'ts0001', '環球/亞洲無限卡': 'ts0002', '財富無限卡': 'ts0003', '台新商務卡': 'ts0004', '昇恆昌無限卡': 'ts0005', '新光三越無限/世界卡': 'ts0006', '國泰航空翱翔鈦金卡': 'ts0007', '@GoGo悠遊御璽卡': 'ts0008', '@GoGo iCash御璽卡': 'ts0009', '@GoGo虛擬御璽卡': 'ts0010', '玫瑰卡': 'ts0011', 'Mercedes-Benz 信用卡': 'ts0012', '雙幣信用卡': 'ts0013', '尊爵世界卡': 'ts0014', '太陽卡': 'ts0015', '企業卡': 'ts0016' }

Card.find({ cardBank: '台新銀行' }, (err, data) => {
    if (err) {
        console.log(err);
    }
    else {
        const dataCardNames = data.map((i, index)=>(i.cardName));
        console.log(data)
        for(var i=0 ; i<readyCards.length  ;++i){
            if(dataCardNames.indexOf(readyCards[i]) >= 0){
                
                var newCard = new Card({
                    cardBank:'台新銀行',
                    cardName:readyCards[i],
                    cardID:readyCardsID[i]
                })
                // newCard.save();
                console.log(newCard);
            }
        }
    }
})
    // setTimeout(() => {  console.log("World!"); }, 1000);




// Card.find({ cardBank: '台新銀行' }, (err, data) => {console.log(data)})