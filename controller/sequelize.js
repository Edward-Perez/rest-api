const { Course } = require('../models');

module.exports = {

   // Find One Course //
  findOneCourse: async (req, res, next) => {
    const user = await req.user;
    const courseId = await (req.params).id;
    Course.findOne({
      where: {
        id: courseId,
        userId: user.id
      }
    })
    .then(course => {
      if (course) {
        req.course = course;
        next();
      } else {
        res.status(403).json({msg: "Access Denied"});
      }
    })
    .catch(err => {
      err.message = err.message || 'Could not retrieve course';
      next(err);
    });
  }

}