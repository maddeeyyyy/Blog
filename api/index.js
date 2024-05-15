const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const PostModel = require("./model/Post");
const multer = require('multer');
const path = require('path');
const cookieParser = require("cookie-parser");


const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const salt = bcrypt.genSaltSync(10);

mongoose.connect("mongodb+srv://madhurcool3:Madhur123@cluster0.dygtmwo.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0");



const JWT_SECRET = 'sdfghnhyt433456789';
app.use('/uploads', express.static(__dirname + '/uploads'));



app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await UserModel.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

app.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }
    const token = jwt.sign({ username }, JWT_SECRET);

    res.json({token, username: user.username});
    
  } catch (error) {
    console.error(error);
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });



// for uploading a file 
// app.post("/create",  upload.single('image'),async (req, res) => {
 
//     const { title, author, content } = req.body;
//     const image = req.file ? req.file.path : req.body.image;

//     const newPost = new PostModel({ title, author,content, image });

//   newPost.save()
//     .then(post => res.json(post))
//     .catch(err => console.error(err));
  
// });



app.post('/create', upload.single('image'), async (req, res) => {
  try {
    const { title,content, author } = req.body;
    const image = req.file ? req.file.path : req.body.image;
    
    const newItem = new PostModel({
      title,
      content,
      image,
      author,
    });

    await newItem.save();

    res.json({ message: 'Image uploaded successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});


//all post 
app.get("/blogs", async(req, res) => {
    try{
        const post = await PostModel.find();

        res.json(post);
    }catch (error) {
        console.log(error.message);
        response.status(500).json({ message: error.message });
      }
})




//get of one  user

app.get("/blogs/:username", async(req, res) => {
    try{
        const {username} = req.params;

        const post = await PostModel.find({author: username});
        res.json(post)

    }catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
      }
})






app.listen(4000);
