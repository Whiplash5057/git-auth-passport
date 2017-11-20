// .gitignore


module.exports = {
    google: {
        clientID: '114626380644-eq8mgfioa5920lcpjuq8tn5t8o1np1rs.apps.googleusercontent.com',
        clientSecret: 't81TShbRGokEltkFFBqPrLuh',
        callbackURL: "http://localhost:3090/auth/google/redirect"
    },
    instagram: {
        clientID: '4edf38926aa84481bfc20621d4e51636',
        clientSecret: 'c08bb958c91e4634b7d4bf609d551a62',
        callbackURL: "http://localhost:3090/auth/instagram/redirect"
    },
    mongodb: {
        dbURI: 'mongodb://stylabsrichard:hellostyfi@ds149535.mlab.com:49535/oauth'
    },
    session: {
        cookieKey: 'asdfasdfadfvjpodfl&^*I&O($%^&*@#$%qwerjihnwoelrijqwer&(*)_'
    }
}