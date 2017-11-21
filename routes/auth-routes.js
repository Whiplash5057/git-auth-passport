// const router = require('express').Router()
// const passport = require('passport')

// router.get('/login', (req, res) => {
//     res.render('login', {user: req.user })
// })

// router.get('/logout', (req, res) => {
//     // -- handle with passport
//     // res.send('loggin out')
//     req.logout()
//     res.redirect('/', 'working')
// })

// router.get('/google', passport.authenticate('google', {
//     scope: ['profile']
// }))

// // google redirect
// router.get('/google/redirect', passport.authenticate('google'), function (req, res) {
//     // res.send(req.user+'you reached the google callback uri')
//     res.redirect('/profile', 'working')
// })

// router.get('/instagram', passport.authenticate('instagram'))

// // instagram redirect
// router.get('/instagram/redirect', passport.authenticate('instagram'), function (req, res) {
//     // res.send(req.user+'you reached the instagram callback uri')
//     res.redirect('/profile', 'working')
// })

// module.exports = router




const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

// auth logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// auth with google+
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    console.log('reached here')
    // res.send(req.user);
    res.redirect('/profile');
});


router.get('/instagram', passport.authenticate('instagram', {
    scope: ['public_content', 'comments', 'relationships', 'follower_list', 'likes']
}))

// instagram redirect
router.get('/instagram/redirect', passport.authenticate('instagram'), function (req, res) {
    console.log('reached here too')
    // res.send(req.user+'you reached the instagram callback uri')
    res.redirect('/profile');
})


module.exports = router;