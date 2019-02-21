var tenrecs = require('../controllers/tenrecs.js')
module.exports = function (app) {
    // app.get('/', function (req, res) {
    //     tenrecs.index(req, res);
    // })
    app.get('/tenrecs/new', function (req, res) {
        tenrecs.tenrec_new(req, res);
    })

    app.get('/tenrecs/:id', function (req, res) {
        tenrecs.tenrec_by_id(req, res);
    })

    app.get('/tenrecs/:id/edit', function (req, res) {
        tenrecs.tenrec_edit(req, res);
    })

    app.get('/tenrecs/:id/destroy', function (req, res) {
        tenrecs.tenrec_destroy(req, res);
    })

    app.post('/tenrecs/:id/commit', function (req, res) {
        tenrecs.tenrec_commit(req, res);
    })
    // Add tenrec Request 
    app.post('/tenrecs', function (req, res) {
        tenrecs.tenrec_new_commit(req, res);
    })
}