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
        const err = new Error('Access Denied');
        err.status = 403;
        next(err);
      }
    })
    .catch(err => {
      err.message = err.message || 'Could not retrieve course';
      next(err);
    });
  }

}