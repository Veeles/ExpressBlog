import express from 'express';

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req,res) => {
    res.render('main.ejs');
});


app.listen(port, (err) => {
    if (err) console.log(err);
    console.log('Serwer is listening of port ', port);
});