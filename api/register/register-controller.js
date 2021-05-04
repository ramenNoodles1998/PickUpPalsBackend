const {StringUtil} = require('../../utilities/string-util.js')
const User = require('../../model/user-model.js')
const bcrypt = require('bcrypt-nodejs')

exports.signup = (req, res) => {
    let user = new User({
        username: req.body.username.toLowerCase(),
        password: bcrypt.hashSync(req.body.password), 
        first: req.body.firstname.toLowerCase(),
        last: req.body.lastname.toLowerCase()
    })

    user.save()

    return res.status(200).json({message: 'success'})
}