
const User = require("../models/user");


module.exports.userSingupform = (req, res) => {
    res.render("users/signup.ejs");
};
module.exports.userSingup=async (req, res) => {
    try {
        let { username, email, password } = req.body;

        // Create a new user instance (without password)
        const newUser = new User({ email, username });

        // Register user with hashed password (Passport-Local-Mongoose)
        const registeredUser = await User.register(newUser, password);

        console.log(registeredUser);

        // Auto-login after signup
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash('success', "Welcome to Wanderlust!");
            res.redirect("/listings");
        });

    } catch (e) {
        // Flash error if username/email already exists
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.RenderLoginform = (req, res) => {
    res.render("users/login.ejs");};

module.exports.userLogin=  async (req, res) => {
        req.flash("success", "Welcome back to Wanderlust! You are logged in!");

        // Redirect to previously intended URL or listings
        const redirectUrl = res.locals.redirectUrl || "/listings";

        res.redirect(redirectUrl);
 };

module.exports.userLogout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You are logged out now!");
        res.redirect("/listings");
    });
};