const mongo = require('mongoose');
const userSchema = require('./schemas/UserSchema');

mongo.Promise = global.Promise;

mongo.connect('mongodb://bootcamp:password123@ds259268.mlab.com:59268/bootcamp21', {
    // useMongoClient: true
});

const User = mongo.model('User', userSchema);


//user definition
const kenny = new User({
    name: 'Kenny',
    username: 'Kenny-the-boy',
    password: 'pass'
});

const benny = new User({
    name: 'Benny',
    username: 'Benny_the_boy',
    password: 'password'
});

const mark = new User({
    name: 'Mark',
    username: 'Mark_the_boy',
    password: 'password'
});



kenny.manify((err, name) => {
    if(err) throw err;
    console.log(`imie to ${name}`);
});

benny.manify(function(err, name) {
    if (err) throw err;
    console.log('Twoje nowe imię to: ' + name);
});

mark.manify(function(err, name) {
    if (err) throw err;
    console.log('Twoje nowe imię to: ' + name);
});


const addKenny = kenny.save(err => {
    if (err) throw err;
    console.log("uzytkownik dodany");
});

const addBenny = benny.save(function(err) {
    if (err) throw err;

    console.log('Uzytkownik ' + benny.name +  ' zapisany pomyslnie');
});

const addMark = mark.save(function(err) {
    if (err) throw err;

    console.log('Uzytkownik ' + mark.name +  ' zapisany pomyslnie');
});

const findAllUsers = () => { 
    return User.find({} ,function(err, rec) {
        if (err) ("error "+err);
        console.log('records '+rec);
    });
}

const updatePassKenny = () => {
     return User.find({username: 'Kenny-the-boy'}, function (err, rec) {
        if(err) console.log('update err '+err);
        rec.map(user => {
            const newPass = Math.floor((Math.random()*1000));
            console.log(`Stare haslo: ${user.password} ## Nowe haslo: ${newPass}`);
            user.password = newPass;
            user.save()
                .then(()=> {
                    // if (err) throw err;
                    console.log('update ok');
                }).catch (err => {
                    console.log('save err: '+err);
                });
        })
     });
}

const deleteMark = () => {
    return User.find({username: 'Mark_the_boy'},function (err, rec) {
        rec.map( user => {
            user.remove()
                .then( () => {
                    console.log('delete ok');
                })
                .catch (err => {
                    console.log('del err'+err);
                })
        });
    });
}

Promise.all([addKenny, addMark, addBenny])
    .then(findAllUsers)
    .then(updatePassKenny)
    .then(deleteMark);
