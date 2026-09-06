const express = require('express');
const {
  getPublishedBlogs,
  getBlogBySlug,
  getAllBlogsAdmin,
  getBlogByIdAdmin,
  createBlog,
  updateBlog,
  deleteBlog,
  toggleLikeBlog,
  addCommentBlog,
  deleteCommentBlog,
} = require('../controllers/blogController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// IMPORTANT: admin routes are declared before the generic '/:slug' route
// so that 'admin' is never matched as a slug value.
router.get('/admin/all', protect, getAllBlogsAdmin);
router.get('/admin/:id', protect, getBlogByIdAdmin);

// Likes & Comments
router.post('/:id/like', toggleLikeBlog);
router.post('/:id/comments', addCommentBlog);
router.delete('/:id/comments/:commentId', protect, deleteCommentBlog);

// Standard CRUD
router.get('/', getPublishedBlogs);
router.post('/', protect, createBlog);
router.get('/:slug', getBlogBySlug);
router.put('/:id', protect, updateBlog);
router.delete('/:id', protect, deleteBlog);

module.exports = router;
