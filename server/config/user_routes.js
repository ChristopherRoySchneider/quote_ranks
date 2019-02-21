
var users = require('../controllers/users.js')

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render("index")
    })

    app.get('/register', function (req, res) {
        users.register(req, res);
    })

    app.get('/login', function (req, res) {
        users.login(req, res);
    })

    app.get('/logout', function (req, res) {
        users.logout(req, res);
    })

    app.post('/login/submit', function (req, res) {
        users.login_submit(req, res);
    })

    app.post('/register/submit', function (req, res) {
        users.register_submit(req, res);
    })
}        