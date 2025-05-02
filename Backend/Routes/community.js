import express from 'express';
import multer from 'multer';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import { blogModel } from '../DataBase/db.js';
import path from 'path';
import clerk from '@clerk/clerk-sdk-node'; 
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../Utils/cloudinary.js';

const CommunityRouter = express.Router();

// Multer configuration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(process.cwd(), 'uploads'));
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
//   }
// });

// const upload = multer({ 
//   storage: storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype.startsWith('image/')) {
//       cb(null, true);
//     } else {
//       cb(new Error('Only image files are allowed!'), false);
//     }
//   }
// });

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'glideaway_blogs',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
  },
});

const upload = multer({ storage });

// Create blogModel post
CommunityRouter.post(
  '/create',
  ClerkExpressRequireAuth(),
  upload.single('image'),
  async (req, res) => {
    try {
      const { userId } = req.auth;

      const user = await clerk.users.getUser(userId);

      const newblogModel = new blogModel({
        title: req.body.title,
        content: req.body.content,
        category: req.body.category,
        authorName: `${user.firstName} ${user.lastName}`,
        authorAvatar: user.imageUrl,
        imageUrl: req.file ? req.file.path : null, 
      });

      await newblogModel.save();
      res.status(201).json(newblogModel);
    } catch (error) {
      console.error('Error creating blogModel:', error);
      res.status(500).json({ message: 'Error creating blogModel post', error: error.message });
    }
  }
);

// Get all blogModels
CommunityRouter.get('/allblogModels', async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};
    const blogModels = await blogModel.find(query).sort({ createdAt: -1 });
    res.json(blogModels);
  } catch (error) {
    console.error('Error fetching blogModels:', error);
    res.status(500).json({ message: 'Error fetching blogModels', error: error.message });
  }
});

// Like a blogModel
CommunityRouter.post('/:id/like', ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth?.userId; 

  if (!userId) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    const blog = await blogModel.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    if (blog.likes.includes(userId)) {
      return res.status(400).json({ message: 'You already liked this post' });
    }

    blog.likes.push(userId);
    await blog.save();

    res.json(blog);
  } catch (error) {
    console.error('Error liking blog:', error);
    res.status(500).json({ message: 'Error liking blog', error: error.message });
  }
});

export default CommunityRouter;
