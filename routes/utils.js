const csrf = require('csurf');

const csrfProtection = csrf({ cookie: true });

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

const cocktailQNotFoundError = (id) => {
  const err = Error("Cocktail-Q not found");
  err.errors = [`Cocktail-Q with id of ${id} could not be found.`];
  err.title = "Cocktail-Q not found.";
  err.status = 404;
  return err;
};

module.exports = {
  csrfProtection,
  asyncHandler,
  cocktailQNotFoundError
};
