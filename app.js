const express = require('express');
const app = express();
const dLib = require('./decrypt');
const PORT = 9090



app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.get('/', async (req, res) => {
    res.render('index.html')
})

app.post('/', express.json(), async (req, res) => {
    try {
        const plain = dLib.decrypt(req.body.cipher)
        res.json({plainText:plain})

    }catch{
        res.json({error:'Error'})
    }
})

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
});