var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
var User = mongoose.model('User') // We are retrieving this Schema from our Models, named 'tenrec'

module.exports = {
    index: function (req, res) {
        console.log("session: ",req.session)
        if (req.session.userid) {
            User.findOne({ _id: req.session.userid }, function (err, user) {
                console.log(req.session)
                if (err) {
                    console.log('something went wrong');
                } else { // else console.log that we did well and then redirect to the root route
                    console.log('got user:', user);
                }

                res.render('index', { user: user });
            })
        } else (res.redirect('/login'))

    },

    register: function (req, res) {
        res.render('register');
    },

    login: function (req, res) {
        res.render('login');
    },

    logout: function (req, res) {
        req.session.destroy();
        res.redirect('/login');
    },

    login_submit: function (req, res) {
        User.findOne({ email: req.body.email }, function (err, user) {

            // This code will run when the DB is done attempting to retrieve 1 record.
            if (user == null) {
                console.log("error finding user", err)
                req.flash('login', "login unsuccessful");
                res.redirect(`/login`);
            }
            else {
                console.log(user)
                bcrypt.compare(req.body.password, user.password)
                    .then(pwMatch => {
                        if (pwMatch) {

                            console.log("login successful")
                            req.session.userid = user._id;
                            req.session.firstname = user.firstname
                            req.session.lastname = user.lastname
                            console.log(req.session)
                            res.redirect(`/`);
                        }
                        else {
                            req.flash('login', "login unsuccessful");
                            res.redirect(`/login`);
                        }

                    })
                    .catch(error => {
                        console.log("login error:", error)


                    })
            }
        })
    },

    register_submit: function (req, res) {
        console.log("POST DATA", req.body);


        bcrypt.hash(req.body.password, 10)
            .then(hashed_password => {
                var user = new User({ firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, birthday: req.body.birthday, password: hashed_password, });
                // Try to save that new tenrec to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.

                user.save(function (err) {
                    var passwordsMatch = req.body.password == req.body.confirmpassword;


                    if (!passwordsMatch) {
                        req.flash('registration', "Passwords must match");
                    }

                    // if there is an error console.log that something went wrong!
                    if (err) {
                        // console.log('Post Errors:', err.errors);
                        for (var key in err.errors) {
                            req.flash('registration', err.errors[key].message);
                        }
                        res.redirect('/register');
                    } else { // else console.log that we did well and then redirect to the root route

                        console.log('successfully registered!' + user._id);
                        if (!passwordsMatch) {

                            res.redirect('/register');
                        } else {
                            req.session.userid = user._id;
                            req.session.firstname = user.firstname
                            req.session.lastname = user.lastname
                            res.redirect(`/`);
                        }
                    }

                })

            })
            .catch(error => {
                console.log("Hashing error: ", error)
            });
    },

};
