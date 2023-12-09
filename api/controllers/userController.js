exports.getUser = (req, res, next) => {
  try {
    const User = req.user;
    res.status(200).json({
      status: "success",
      User,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      error: error.message,
    });
  }
  next();
};
