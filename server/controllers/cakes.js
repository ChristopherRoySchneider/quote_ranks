var mongoose = require('mongoose')
var Cake = mongoose.model('Cake') // We are retrieving this Schema from our Models, named 'tenrec'
var Rating = mongoose.model('Rating')
module.exports = {
    find_all: function (req, res) {
        Cake.find({}, function (err, cake) {
            if (err) {
                console.log('something went wrong');
                res.json({ message: "Error", error: err })
            } else { // else console.log that we did well and then redirect to the root route
                console.log('got all cakes:', cake);
                res.json({ message: "Success", data: cake })
            }
        }).sort('-_id')
    },
    new: function (req, res) {
        // console.log(req)
        var newCake = new Cake();
        newCake.bakerName = req.body.bakerName;
        
        newCake.imageUrl = req.body.imageUrl;
        newCake.save(function (err) {
            if (err) {
                console.log('error saving new user: ',err);
                res.json({ message: "Error", error: err })
            } else { // else console.log that we did well and then redirect to the root route
                console.log('new cake:', newCake);
                res.json({ message: "Success", data: newCake })
            }
            
        })
    },
    get_by_id: function (req, res) {
        Cake.find({_id:req.params.cakeid}, function (err, p_by_name) {
            if (err) {
                console.log('something went wrong');
                res.json({ message: "Error", error: err })
            } else { // else console.log that we did well and then redirect to the root route
                console.log('got cakes by name:', p_by_name);
                res.json({ message: "Success", data: p_by_name })
            }
        })
    },
    edit: function (req, res) {
        // console.log("POST DATA", req.body);
        Cake.findOne({ _id: req.params.cakeid }, function (err, cake) {
            cake.bakerName = req.body.bakerName;
            
            cake.imageUrl = req.body.imageUrl;
            
            cake.save(function (err) {
                if (err) {
                    console.log('Post Errors:', err.errors);
                    res.json({ message: "Error", error: err })
                } else { // else console.log that we did well and then redirect to the root route
                    console.log('successfully added a cake!');
                    res.json({ message: "Success",  })
                }
            })
        })
    },

    add_rating: function (req, res) {
        // console.log("POST DATA", req.body);
        Cake.findOne({ _id: req.params.cakeid }, function (err, cake) {
            var newRating = new Rating( {
               stars : req.body.stars,
                comment:req.body.comment,

            })
            cake.ratings.push(newRating)
            
            console.log("!!!!!!!!!!!!!!",req.params)
            cake.save(function (err) {
                if (err) {
                    console.log('Post Errors:', err.errors);
                    res.json({ message: "Error", error: err })
                } else { // else console.log that we did well and then redirect to the root route
                    console.log('successfully added a cake!');
                    res.json({ message: "Success",  })
                }
            })
        })
    },
    remove: function (req, res) {
        Cake.deleteOne({_id:req.params.cakeid}, function (err) {
            if (err) {
                console.log('something went wrong');
                res.json({ message: "Error", error: err })
            } else { // else console.log that we did well and then redirect to the root route
                console.log('!!!!!!!!!!!!!!!deleted cake by id:',req.params.cakeid );
                res.json({ message: "Success" })
            }
        })
    },
    


}