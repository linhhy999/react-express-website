const mongoose = require('mongoose');
const userSchema = {
    auth: [],
    username: String,
    password: String,
    email: String,
    name: String,
    dob: Date,
    sex: String,
    avatar: String,
    role: String
}
const Sex = {
    MALE: 'Male',
    FEMALE: 'Female',
    OTHER: 'Other'
}
const Role = {
    ADMIN: 'admin',
    USER: 'user'
}
const User = mongoose.model('Users', userSchema);

var db = {
    'linh.hy99': {
        password: 'a',
        name: "Linh Hy",
        dob: "28/10/1999",
        sex: 'male'
    },
    'namgold': {
        password: 'xyz' ,
        name: "Nam Heo",
        dob: "09/04/2000",
        sex: 'female'
    },
    'username':{}
}

var UserModel = {
    create: (userData, done) => {
        User.findOne({ username: userData.username }, (error, data) => {
            if (error) {
                error.code = 500;
                console.log(JSON.stringify(error));
                done && done({ error });
            }
            else if(!!data)
                done && done({ error: { message:"Oops! This username has already been taken. Plesase choose another username." }, code: 400 })
            else User.create(userData, (error, data) => {
                if (error)
                    error.code = 500;
                done && done({ error, data })
            })
        })
    },
    updateUser: (username, userdata) => {
        if (!db[username]) return false
        db[username] = userdata
        return true
    },
    deleteUser: username => {
        if (!db[username]) return false
        return delete db[username]
    },
    get: (condition, done) => {
        User.findOne(condition, (err, item)=>{
            if (err) done && done(err)
            else if(!!item)
                done && done(null,item)
            else done && done({message:"User not found!"})
        })
    },
    login: (userData, done) => {
        User.findOne({username: userData.username}, (error, data)=>{
            if (error){
                error.code = 500
                done && done({error})
            }
            else if (!!data) {
                if (data.password != userData.password)
                    done && done({ error: { message:"The username or password you entered isn't correct. Try entering it again.", code: 400 } })
                else done && done({data})
            }
            else done && done({ error: { message:"The username or password you entered isn't correct. Try entering it again.", code: 400 } })
        })
    },
    validUsername: username => {
        var usernameRegex = /^[a-zA-Z0-9\_]+$/;
        var validUsername  = username.match(usernameRegex);
        if(validUsername == null)
            return { error: { message: "Your username is not valid. Only characters A-Z, a-z, 0-9 and '_' are  acceptable.", code: 400 } }
        else if(username.length < 6 || username.length > 16)
            return { error: { message: "Your username is not valid. It must have 6-16 characters.", code: 400 } }
        else return { data: { message: "You have signed up successfully." } }
    }
    // validPassword: password => {
    //     var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,32}$/;
    //     return !!password.match(passw)
    // }
}
module.exports = UserModel
module.exports.Role = Role