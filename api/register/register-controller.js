const {StringUtil} = require('../../utilities/string-util.js')
const User = require('../../model/user-model.js')
const bcrypt = require('bcrypt-nodejs')

exports.index = (req, res) => {
    const validation = validateIndex(req.body)

    if(!validation.isValid) {
        return res.status(400).json({message: validation.message})
    }

    const user = new User({
        username: req.body.username.toLowerCase(),
        password: bcrypt.hashSync(req.body.password), 
        first: req.body.firstname.toLowerCase(),
        last: req.body.lastname.toLowerCase()
    })

    user.save(error => {
        if(error) {
            if(error.code == 11000) {
                return res.status(403).json({message: 'Username is taken.'})
            }
            return res.status(500).json({message: error.toString()})
        }
        return res.status(200).json({message: 'success'})
    })
}

function validateIndex(body) {
    let errors = ''
    if (StringUtil.isEmpty(body.username)) {
        errors += 'Username is required.'
    }
    if (StringUtil.isEmpty(body.password)) {
        errors += 'Password is required.'
    }
    if (StringUtil.isEmpty(body.firstname)) {
        errors += 'first is required.'
    }
    if (StringUtil.isEmpty(body.lastname)) {
        errors += 'Last is required.'
    }

    return {
        isValid: StringUtil.isEmpty(errors),
        message: errors
    }
}