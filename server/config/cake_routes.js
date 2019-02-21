var mongoose = require('mongoose')
var Cake = mongoose.model('Cake') // We are retrieving this Schema from our Models, named 'tenrec'
var cakes = require('../controllers/cakes.js')
module.exports = function (app) {
    app.get('/cakes', function (req, res) {
        cakes.find_all(req, res);
    })
    app.get('/cakes/:cakeid', function (req, res) {
        cakes.get_by_id(req, res);
    })
    app.post('/cakes', function (req, res) {
        cakes.new(req, res);
    })
    app.put('/cakes/:cakeid', function (req, res) {
        cakes.edit(req, res);
    })

    app.delete('/cakes/:cakeid', function (req, res) {
        cakes.remove(req, res);
    })

    app.post('/cakes/:cakeid/ratings', function (req, res) {
        cakes.add_rating(req, res);
    })

    

}