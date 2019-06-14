const express = require('express');
const router = express.Router();

const { Course } = require('../../models');
const { User } = require('../../models');
const { authUser } = require('../../controller/authenticate');
const { findOneCourse } = require('../../controller/sequelize');

// Response JSON All Courses with User/Owner 
router.get('/', (req, res, next) =>{
  Course.findAll({ 
    attributes: { exclude: ['createdAt','updatedAt'] },
    include: [{
      model: User,
      attributes: { exclude: ['password','createdAt','updatedAt'] }
    }] 
  })
  .then ((courses) => {
    res.status(200).json({ courses });
  })
  .catch(err => next(err))
});

// Response JSON 1 Course + User/Owner 
router.get('/:id', (req, res, next) =>{
  const courseId = (req.params).id.toString();
  Course.findOne({
    where: {id: `${courseId}`},
    attributes: { exclude: ['createdAt','updatedAt'] },
    include: [{
      model: User,
      attributes: { exclude: ['password','createdAt','updatedAt'] }
    }]
  })
  .then((course) => {
    if (course) {
      res.status(200).json(course);
    } else {
      res.status(404).json({msg: "No such course in database"})
    }
  })
  .catch(err => {
    err.message = 'Could not retrieve Course from database.'
    next(err);
  });
})

// Create a Course
router.post('/', authUser, (req, res, next) => {
  const user = req.user;
  user.createCourse(req.body)
  .then((course) => {
    const id = course.id;
    res.location(`/api/courses/${id}`).status(201).end();
    })
  .catch(err => {
    err.status = 400;
    next(err);
  });
});

// Update Course
router.put('/:id', authUser, findOneCourse, async (req, res, next) => {
  const course = await req.course;
  const courseUpdate = await req.body;
  if (!courseUpdate.title || !courseUpdate.description) {
    const err = new Error('Validation Error for title / description.');
    err.status = 400;
    return next(err);
  }
  course.update(courseUpdate)
  .then(() => res.status(204).end())
  .catch((err) => {
    err.message = err.errors[0].message || 'Could not update course';
    next(err)
  });
});


// Delete Course
router.delete('/:id', authUser, findOneCourse, async (req, res, next) => {
  const course = await req.course;
  course.destroy({ force: true })
  .then(() => res.status(204).end())
  .catch(err => {
    err.message = err.errors[0].message || 'Could not delete course';
    next(err);
  })
});

module.exports = router;