const router = require('express').Router();
const Blog = require('../models/Blog');

// const faker = require('faker');

// Your routing code goes here

// let user = [];
// for(let i=0;i<10;i++){
//     user.push({
//         topic: 'Rustic Steel Fish',
//         description: 'Carbonite web goalkeeper gloves are ergonomically designed to give easy fit',
//         posted_at: faker.date.past(),
//         posted_by: 'Steven Gerlach',
//     })
// }

// var users = Blog.create(user);
// // console.log(users);

router.get('/blog',async (req,res)=>{
    let page = parseInt(req.query.page);
    let search = req.query.search;

    let start = page!==1?5*page - 5*(page-1):0;

    console.log(page,search);
    let document = [];
    let cursor = await Blog.find({topic : {$eq : search}});
    cursor.forEach((el)=>(document.push(el)));
    let final = document.slice(start,5*page);
    res.status(200).json(final);
});


router.post('/blog', async (req,res)=> {
    const usersInfo = new Blog({
        topic : req.body.topic,
        description : req.body.description,
        posted_at : req.body.posted_at,
        posted_by : req.body.posted_by
    })
    await usersInfo.save(function(err,docs){
        if(err){
            console.log(err);
        }else{
            console.log(docs);
            res.status(200).json(docs);
        }
    });
})

router.put('/blog/:id', async (req,res)=> {
    let user_id = req.params.id;
    let user_description = req.body.description;
    await Blog.findByIdAndUpdate(user_id ,{description : user_description} , (err, docs)=>{
        if(err){
            console.log(err);
        }else{
            console.log(docs);
            res.status(200).json(docs);
        }
    })
})

router.delete('/blog/:id', async (req,res)=> {
    let user_id = req.params.id;
    await Blog.findByIdAndDelete(user_id , (err,docs)=>{
        if(err){
            console.log(err);
        }else{
            console.log(docs);
            res.status(200).json(docs);
        }
    })
})
module.exports = router;