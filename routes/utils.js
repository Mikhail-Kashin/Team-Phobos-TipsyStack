const csrf = require('csurf');

const csrfProtection = csrf({ cookie: true });

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

const cocktailNotFoundError = (id) => {
  const err = Error("Post not found");
  err.errors = [`Requested post with id of ${id} could not be found.`];
  err.title = "Post not found.";
  err.status = 404;
  return err;
};

module.exports = {
  csrfProtection,
  asyncHandler,
  cocktailNotFoundError
};
