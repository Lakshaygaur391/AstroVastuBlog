const Blog = require('../models/Blog');
const slugify = require('../utils/slugify');

const buildUniqueSlug = async (title, currentId = null) => {
  let baseSlug = slugify(title);
  if (!baseSlug) baseSlug = 'post';
  let slug = baseSlug;
  let counter = 1;

  // eslint-disable-next-line no-await-in-loop
  while (await Blog.findOne({ slug, _id: { $ne: currentId } })) {
    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }
  return slug;
};

// @desc    Get all published blogs (public)
// @route   GET /api/blogs
// @access  Public
const getPublishedBlogs = async (req, res, next) => {
  try {
    const { category, search, page = 1, limit = 9 } = req.query;
    const query = { published: true };

    if (category && category !== 'All') {
      query.category = category;
    }
    if (search) {
      query.$text = { $search: search };
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [blogs, total, categories] = await Promise.all([
      Blog.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .select('-content'),
      Blog.countDocuments(query),
      Blog.distinct('category', { published: true }),
    ]);

    res.json({
      blogs,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      categories,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single published blog by slug (public)
// @route   GET /api/blogs/:slug
// @access  Public
const getBlogBySlug = async (req, res, next) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { slug: req.params.slug, published: true },
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    const relatedBlogs = await Blog.find({
      category: blog.category,
      published: true,
      _id: { $ne: blog._id },
    })
      .limit(3)
      .select('-content');

    res.json({ blog, relatedBlogs });
  } catch (error) {
    next(error);
  }
};

// @desc    Get ALL blogs incl. drafts, for the admin dashboard
// @route   GET /api/blogs/admin/all
// @access  Private
const getAllBlogsAdmin = async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 }).select('-content');
    res.json(blogs);
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single blog by id, for editing
// @route   GET /api/blogs/admin/:id
// @access  Private
const getBlogByIdAdmin = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json(blog);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new blog post
// @route   POST /api/blogs
// @access  Private
const createBlog = async (req, res, next) => {
  try {
    const { title, excerpt, content, coverImage, videoUrl, mediaType, category, tags, published, author, hideLikes } = req.body;

    if (!title || !excerpt || !content) {
      return res.status(400).json({ message: 'Title, excerpt and content are required' });
    }

    const slug = await buildUniqueSlug(title);

    const blog = await Blog.create({
      title,
      slug,
      excerpt,
      content,
      coverImage: coverImage || '',
      videoUrl: videoUrl || '',
      mediaType: mediaType || (videoUrl ? 'video' : 'image'),
      category,
      author: author || 'Acharya Pragati',
      tags: Array.isArray(tags) ? tags : (tags || '').split(',').map((t) => t.trim()).filter(Boolean),
      published: published !== undefined ? published : true,
      hideLikes: hideLikes !== undefined ? Boolean(hideLikes) : false,
    });

    res.status(201).json(blog);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a blog post
// @route   PUT /api/blogs/:id
// @access  Private
const updateBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    const { title, excerpt, content, coverImage, videoUrl, mediaType, category, tags, published, author, hideLikes } = req.body;

    if (title && title !== blog.title) {
      blog.slug = await buildUniqueSlug(title, blog._id);
      blog.title = title;
    }

    if (excerpt !== undefined) blog.excerpt = excerpt;
    if (content !== undefined) blog.content = content;
    if (coverImage !== undefined) blog.coverImage = coverImage;
    if (videoUrl !== undefined) blog.videoUrl = videoUrl;
    if (mediaType !== undefined) blog.mediaType = mediaType;
    if (category !== undefined) blog.category = category;
    if (author !== undefined) blog.author = author;
    if (published !== undefined) blog.published = published;
    if (hideLikes !== undefined) blog.hideLikes = Boolean(hideLikes);
    if (tags !== undefined) {
      blog.tags = Array.isArray(tags) ? tags : tags.split(',').map((t) => t.trim()).filter(Boolean);
    }

    const updated = await blog.save();
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a blog post
// @route   DELETE /api/blogs/:id
// @access  Private
const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    await blog.deleteOne();
    res.json({ message: 'Blog post deleted' });
  } catch (error) {
    next(error);
  }
};

// @desc    Like or unlike a blog post (public, free)
// @route   POST /api/blogs/:id/like
// @access  Public
const toggleLikeBlog = async (req, res, next) => {
  try {
    const { action } = req.body; // 'like' | 'unlike'
    const increment = action === 'unlike' ? -1 : 1;

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: increment } },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (blog.likes < 0) {
      blog.likes = 0;
      await blog.save();
    }

    res.json({ likes: blog.likes });
  } catch (error) {
    next(error);
  }
};

// @desc    Add a guest or user comment to a blog post
// @route   POST /api/blogs/:id/comments
// @access  Public
const addCommentBlog = async (req, res, next) => {
  try {
    const { name, email, content, honeypot } = req.body;

    // Bot trap: if honeypot is filled, return fake success without saving
    if (honeypot) {
      return res.status(200).json({ message: 'Comment submitted successfully.' });
    }

    if (!name || !name.trim() || !content || !content.trim()) {
      return res.status(400).json({ message: 'Name and comment text are required.' });
    }

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const newComment = {
      name: name.trim().slice(0, 60),
      email: (email || '').trim().slice(0, 100),
      content: content.trim().slice(0, 1000),
    };

    blog.comments.unshift(newComment);
    await blog.save();

    res.status(201).json({
      message: 'Comment added successfully',
      comments: blog.comments,
      newComment: blog.comments[0],
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a comment (admin moderation)
// @route   DELETE /api/blogs/:id/comments/:commentId
// @access  Private (Admin)
const deleteCommentBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Post not found' });
    }

    blog.comments = blog.comments.filter(
      (c) => c._id.toString() !== req.params.commentId
    );
    await blog.save();

    res.json({ message: 'Comment removed', comments: blog.comments });
  } catch (error) {
    next(error);
  }
};

module.exports = {
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
};
