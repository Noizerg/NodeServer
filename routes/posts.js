const express = require('express');
const Post = require('../models/Post');
const router = express.Router();
const CS_GO_ITEMS = require('../models/Post');


router.get('/', async(req,res)=>
{
    try
    {
        const posts = await Post.find();
        res.json(posts);
    }
    catch(err)
    {
         res.json({message:err})
    }
});

router.post('/',async (req,res)=>
{
    const post = new CS_GO_ITEMS({
        HASH_NAME: req.body.hash_name,
        BO_PRICE: req.body.bo_price,
        SELL_PRICE: req.body.sell_price

    });

    try
    {
        const savedpost = await post.save();
        res.status(200).json(savedpost);
    }
    catch(err)
    {
        res.json({message: err})
    }
    });

router.get('/:postHash_Name', async (req, res) => {
    try
    {
        const post = await Post.find({HASH_NAME : req.params.postHash_Name});
        res.status(200).json(post);
    }
    catch(er)
    {
        res.json({message: err})
    }

})

router.delete('/:postHash_Name', async (req, res) => {
    try
    {
        const RemovedPost = await Post.remove({HASH_NAME : req.params.postHash_Name});
        res.status(200).json(RemovedPost);
    }
    catch(er)
    {
        res.json({message: err})
    }

})


router.patch('/:postHash_Name', async (req, res) => {
    try
    {
        const UpdatePost = await Post.update({HASH_NAME : req.params.postHash_Name}, {$set:{BO_PRICE: req.body.bo_price}});
        res.status(200).json(UpdatePost);
    }
    catch(er)
    {
        res.json({message: err})
    }

})




module.exports = router;