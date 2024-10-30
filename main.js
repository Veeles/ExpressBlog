import express from 'express';

const app = express();
const port = 3000;
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
const posts = []
function addPost(title, description){
    let index = posts.length
    let newPost = {
        'id': index + 1,
        'title': title,
        'description': description
    }
    posts.push(newPost)

}

app.get('/', (req,res) => {
    res.render('main.ejs');
    console.log(posts)
});

app.get('/contact', (req, res) => {
    res.render('contact.ejs')
})

app.get('/about', (req, res) => {
    res.render('about.ejs')
})

app.get('/add', (req, res) => {
    res.render('add.ejs')
})

app.post('/add/post', (req, res) => {

    addPost(req.body['Title'], req.body['text']);
    res.redirect('/');
});

app.listen(port, (err) => {
    if (err) console.log(err);
    console.log('Serwer is listening of port ', port);
});