const User = require('../../model/user-model')
const {generateJWT} = require('../../services/auth-services')

exports.login = async (req, res) => {
    let user = await User.findOne({ username: req.body.username.toLowerCase() })
    const passwordsMatch = User.passwordsMatch(req.body.password, user.password)

    if(passwordsMatch) {
        const token = generateJWT(user)

        return res.status(200).json({ token })
    }

    return res.status(400).json()
}