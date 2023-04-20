exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};
  
exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

// Public content

// GET signIn
module.exports.signIn =  (req, res) => {
    res.render('account/signin', {title: 'Sign In'})
}
// GET signUp
module.exports.signUp =  (req, res) => {
    res.render('account/signup', { title: 'Sign Up'});
};


// Protected content

// GET profile 
module.exports.profile =  (req, res) => {
    res.render('account/profile', {title: 'Profile'})
}
// POST profile 
module.exports.postProfile =  (req, res) => {
    console.log(req.body);
}
// GET Watch List
module.exports.watchList =  (req, res) => {
    res.render('account/watch_list', {title: 'Watch List'})
}