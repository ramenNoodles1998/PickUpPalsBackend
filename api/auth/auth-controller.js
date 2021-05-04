const User = require('../../model/user-model')
const {generateJWT} = require('../../services/auth-services')
const bcrypt = require('bcrypt-nodejs')

exports.login = async (req, res) => {
    try {
        let user = await User.findOne({ username: req.body.username.toLowerCase() })
        const passwordsMatch = User.passwordsMatch(req.body.password, user.password)

        if(passwordsMatch) {
            const token = generateJWT(user)

            return res.status(200).json({ token })
        }

    } catch(e) {
        console.log(e)
        return res.status(500).json()
    }
}