import { render } from 'ejs';
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
    if (posts.length > 0){
        res.render('main.ejs', {posts:posts});
    } else {
        res.render('main.ejs')
    }
    console.log(posts[0])
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

app.post('/post/delete', (req,res) => {
    let id = req.body['deleteButton'] - 1
    posts.splice(id)
    res.redirect('/')
    
})

app.post('/edit', (req, res) => {
    let id = req.body['updateButton'] - 1
    console.log(posts[id]['title'])
    let title = posts[id]['title']
    let description = posts[id]['description']
    res.render('edit.ejs', {title: title, description: description, id: id})


})

app.post('/edit/post', (req, res) => {
    console.log(req.body);
    let id = Number(req.body['editId']) + 1;
    let newTitle = req.body['title'];
    let newDescription = req.body['text'];

    for (let post of posts){
        if (post.id == id){
            post.title = newTitle;
            post.description = newDescription;
        }
    }
    res.redirect('/');
});

app.get('/post/:id', (req, res) => {
    let id = Number(req.params.id) - 1;
    let title = posts[id]['title'];
    let description = posts[id]['description'];
    res.render('post.ejs', {title:title, description:description} );
});



app.listen(port, (err) => {
    if (err) console.log(err);
    console.log('Serwer is listening of port ', port);
});
