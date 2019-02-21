var mongoose = require('mongoose')
var Tenrec = mongoose.model('Tenrec') // We are retrieving this Schema from our Models, named 'tenrec'
var User = mongoose.model('User') // We are retrieving this Schema from our Models, named 'tenrec'

module.exports = {
    index: function (req, res) {
        console.log("session: ", req.session)
        if (req.session.userid) {
            User.findOne({ _id: req.session.userid }, function (err, user) {
                console.log(req.session)
                if (err) {
                    console.log('something went wrong');
                } else { // else console.log that we did well and then redirect to the root route
                    console.log('got user:', user);
                }
                Tenrec.find({}, function (err, tenrecs) {

                    if (err) {
                        console.log('something went wrong');
                    } else { // else console.log that we did well and then redirect to the root route
                        console.log('got tenrecs:', tenrecs);
                    }
                    res.render('index', { tenrecs: tenrecs, user: user });
                })
                
            })
        } else (res.redirect('/login'))

    },
    tenrec_new: function (req, res) {
        res.render('tenrec_new');
    },
    tenrec_new_commit: function (req, res) {
        console.log("POST DATA", req.body);
        // create a new tenrec with the name and age corresponding to those from req.body
        var tenrec = new Tenrec({ name: req.body.name, subfamily: req.body.subfamily, genus: req.body.genus, species: req.body.species, link: req.body.link, picture: req.body.picture, });
        // Try to save that new tenrec to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
        tenrec.save(function (err) {
            // if there is an error console.log that something went wrong!
            if (err) {
                console.log('Post Errors:', err.errors);
                for (var key in err.errors) {
                    req.flash('registration', err.errors[key].message);
                }
                res.redirect('/tenrecs/new');
            } else { // else console.log that we did well and then redirect to the root route
                console.log('successfully added a tenrec!' + tenrec._id);
                res.redirect(`/tenrecs/${tenrec._id}`);
            }

        })
    },
    tenrec_by_id: function (req, res) {
        Tenrec.findOne({ _id: req.params.id }, function (err, tenrec) {
            if (err) {
                console.log('something went wrong');
            } else { // else console.log that we did well and then redirect to the root route
                console.log('got tenrecs:', tenrec);
            }
            res.render('tenrec', { tenrec: tenrec });
        })
    },
    tenrec_edit: function (req, res) {
        Tenrec.findOne({ _id: req.params.id }, function (err, tenrec) {

            if (err) {
                console.log('something went wrong');
            } else { // else console.log that we did well and then redirect to the root route
                console.log('got tenrecs:', tenrec);
            }
            res.render('tenrec_edit', { tenrec: tenrec });
        })
    },
    tenrec_commit: function (req, res) {
        console.log("POST DATA", req.body);
        Tenrec.findOne({ _id: req.params.id }, function (err, tenrec) {
            tenrec.name = req.body.name;
            tenrec.subfamily = req.body.subfamily;
            tenrec.genus = req.body.genus;
            tenrec.species = req.body.species;
            tenrec.link = req.body.link;
            tenrec.picture = req.body.picture;
            tenrec.save(function (err) {
                if (err) {
                    console.log('Post Errors:', err.errors);
                    for (var key in err.errors) {
                        req.flash('registration', err.errors[key].message);
                    }
                    res.redirect(`/tenrecs/${tenrec.id}/edit`);
                } else { // else console.log that we did well and then redirect to the root route
                    console.log('successfully added a tenrec!');
                    res.redirect('/tenrecs/' + req.params.id);
                }
            })
        })
    },
    tenrec_destroy: function (req, res) {
        Tenrec.remove({ _id: req.params.id }, function (err) {
            if (err) {
                console.log('something went wrong');
            } else { // else console.log that we did well and then redirect to the root route
                console.log('deleted tenrec');
            }
            res.redirect("/")
        })
    },

}