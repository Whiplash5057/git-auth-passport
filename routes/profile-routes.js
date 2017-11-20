const router = require('express').Router()

const authCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect('/auth/login', { user: req.user })
    } else {
        next()
    }
}

router.get('/', authCheck, (req, res) => {
    // res.send('You are logged in...'+req.user.username)
    res.render('profile', { user: req.user })
})

module.exports = router