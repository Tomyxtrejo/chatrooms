const passport = require('../config/passportConfig')
const logger = require('../utils/logger')('[Router: Login] ')

const login = (user, req, res) => {
    req.logIn(user, function (err) {
        if (err) {
            res.status(500).send('Oops! Got hurt real bad. Will be right back!')
        }
        else {
            logger.debug('UserId before update: ', req.session.userId)
            req.session.userId = user.userId
            req.session.save()
            res.json({ error: false, username: user.username })
            logger.debug('UserId updated to: ', req.session.userId)
        }
    });
}

const matchesLoginPath = (what) => {
    return /^\/api\/login[\/]{0,1}$/.test(what)
}

const middleware = (req, res, next) => {
    if (matchesLoginPath(req.path) && req.method === 'POST') {
        if (req.isAuthenticated()) {
            logger.debug('Authenticated user. Will not authenticate again')
            res.send({ error: true, 'reason': 'Already logged in' })
            return
        }

        logger.debug('Will authenticate')
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                res.status(500).send('Oops! Got hurt real bad. Will be right back!')
            }
            else if (!user) {
                res.status(401).json(info)
            }
            else {
                login(user, req, res)
            }
        })(req, res, next)
    }
    else {
        logger.debug('Not authenticating')
        next()
    }
}

module.exports = middleware