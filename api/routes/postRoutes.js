import express from 'express'
import * as dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary';
import Post from '../models/post.js'

const router = express.Router();

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

//get all posts
router.get('/', async (req,res) => {
    try {
        const posts = await Post.find({});
        res.status(200).json({success: true, data: posts});
    }
    catch (err) {
        res.status(500).json({success: false, message: err?.message});
    }
});

//create post
router.post('/', async (req, res) => {
    try {
        const {name, prompt, photo} = req.body;

        // now generating url from cloudinary
        const photoUrl = await cloudinary.uploader.upload(photo);

        const newPost = await Post.create({
            name, 
            prompt,
            photo: photoUrl.url,
        });

        res.status(201).json({success: true, data: newPost});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({success: false, message: err?.message});
    }
});

export default router;