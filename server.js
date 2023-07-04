const express = require('express');
const bodyParser = require('body-parser');
const shortid = require('shortid');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

let allLinks = {};

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/form.html")
})

app.post('/', (req, res) => {

    let id = shortid.generate();
    let link = req.body.url;

    allLinks[id] = link;
    console.log(allLinks);

    res.render('show', {id:id, link:link})
})

app.get('/:custom', (req, res) => {
    let custom = req.params.custom;
    res.redirect(allLinks[custom]);
})


app.listen(3000, ()=>{
    console.log("server running on 3000");
})