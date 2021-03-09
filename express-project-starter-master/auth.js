
const { User } = require('./db/models')


const loginUser = (req, res, user) => {
    req.session.auth = {
        userId: user.id,
    };
    console.log(req.session)
    //need to test redirecting
    req.session.save(() =>{
        res.redirect('/');
    })
};

const logoutUser = (req, res) => {
    delete req.session.auth;
    //need to test redirecting
    req.session.save(() =>{
        res.redirect('/');
    })
};

const requireAuth = (req, res, next) => {
    if(!res.locals.authenticated) {
        return res.redirect('/users/login');
    }
    return next();
};

const restoreUser = async (req, res, next) => {
    console.log(req.session);

    if (req.session.auth) {
        const { userId } = req.session.auth;

        try {
            const user = await User.findByPk(userId);

            if(user) {
                res.locals.authenticated = true;
                res.locals.user = user;
                next();
            }
        } catch (err) {
            res.locals.authenticated = false;
            next(err);
        }
    } else {
        res.locals.authenticated = false;
        next();
    }
};


module.exports = {
  loginUser,
  logoutUser,
  requireAuth,
  restoreUser,
};
