require('dotenv').config({ path: require('path').resolve(__dirname, '.env')}); //  load env vars
const express = require('express');
const User = require('./db/user');
const Product = require('./db/product');
const jwt = require('jsonwebtoken');

app.use(cors({
  origin: "https://mohitecommdashboard.vercel.app/"
}));

require('./db/config');

const app = express();
app.use(express.json());
app.use(cors());

const jwtKey = process.env.JWT_KEY;       // from .env
const port = process.env.PORT || 4500;    // fallback if not set

// user collection

app.get("/", (req, res) => {
  res.send("E-Commerce Backend is Live!");
});

app.post('/register', async (req, resp) => {
    if (req.body.name && req.body.email && req.body.password) {
        let user = new User(req.body);
        let result = await user.save();
        result = result.toObject();
        delete result.password;
         jwt.sign({ result }, jwtKey, { expiresIn: '3h' }, (err, token) => {
                if (err) {
                    resp.send({ result: 'Something went wrong! Try after sometime' });
                }
                resp.send({ result, auth: `bearer ${token}` });

            })
    }
    else {
        resp.send({ result: 'all fields required' })
    }

})
app.post('/login', async (req, resp) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select('-password');
        if (user) {
            jwt.sign({ user }, jwtKey, { expiresIn: '3h' }, (err, token) => {
                if (err) {
                    resp.send({ result: 'Something went wrong! Try after sometime' });
                }
                resp.send({ user, auth: `bearer ${token}` });

            })

        }
        else {
            resp.send({ result: 'no user found' })
        }
    }
    else {
        resp.send({ result: 'enter all fields' })
    }


})
// products collection 

app.get("/", (req, res) => {
  res.send("E-Commerce Backend is Live!");
});

app.post('/add',verifyToken, async (req, resp) => {
    if (req.body.name && req.body.price && req.body.category && req.body.company) {
        let product = new Product(req.body);
        let result = await product.save();
        resp.send(result)

    }
    else {
        resp.send({ result: 'please enter all fields' });
    }
})
app.get('/display',verifyToken, async (req, resp) => {
    let result = await Product.find();
    if (result.length > 0) {
        resp.send(result)
    }
    else {
        resp.send({ result: 'No product found' })
    }

})
app.delete('/delete/:id',verifyToken, async (req, resp) => {
    let result = await Product.deleteOne({ _id: req.params.id })

    if (result.deletedCount > 0) {
        resp.send(result)
    }
    else {
        resp.send({ result: 'No record found' })
    }

})
app.get('/displayOne/:id',verifyToken, async (req, resp) => {
    let result = await Product.findOne({ _id: req.params.id })
    if (result) {
        resp.send(result)
    }
    else {
        resp.send({ result: 'No record found' })
    }

})
app.put('/update/:id', verifyToken, async (req, resp) => {
    let result = await Product.updateOne({ _id: req.params.id }, { $set: req.body })
    resp.send(result);
})
app.get('/search/:key',verifyToken, async (req, resp) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key, $options: 'i' } },
            { company: { $regex: req.params.key, $options: 'i' } },
            { category: { $regex: req.params.key, $options: 'i' } }
        ]
    });
    resp.send(result);
})
function verifyToken(req, resp, next){
    let token = req.headers['authorization'];
    console.log(token);
    if(token){
        token = token.split(' ')[1];
        jwt.verify(token, jwtKey, (err, valid)=>{
            if(err){
                resp.status(401).send({result:'Please enter valid token'});
            }else{
                next();
            }
        })

    }else{
        resp.status(403).send({result:'Please provide token in request header'})
    }
}
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});