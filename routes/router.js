const authRoutes = require('./auth-routes')
const profileRoutes = require('./profile-routes')
module.exports = function (app) {

    // -- auth routes
    app.get('/', (req, res, next) => {
        // res.send(['lol', 'charger', 'mac', 'speaker'])
        res.render('home', {user: req.user })
    })
    
    app.use('/auth', authRoutes)

    app.use('/profile', profileRoutes)

}