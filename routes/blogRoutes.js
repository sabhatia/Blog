const express = require('express')
const blogController = require('../controllers/blogController')
const router = express.Router();

// 1. GET a specific Blog
router.get('/blogs/:id', blogController.blogIndex);

// 2. DELETE a specific blog
router.delete('/blogs/:id', blogController.blogDelete);

// 3. GET the create blogs page
router.get('/create-blog', blogController.blogCreateGet)

// 4. POST a new blog
router.post('/create-blog', blogController.blogCreatePost);

//5. GET and display all the blogs
router.get('/blogs', blogController.blogGetAll);

module.exports = router;