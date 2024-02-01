const express = require('express');
const app = express();
const dLib = require('./decrypt');
const Hot51Lib = require('./hot51');
const path = require('path')
const PORT = 9090

app.set('views', __dirname + '/views');
// app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/views'));

app.post('/', express.json(), async (req, res) => {
    try {
        const plain = dLib.decrypt(req.body.cipher)
        res.json({ plainText: plain })

    } catch {
        res.json({ error: 'Error' })
    }
})
app.get('/api/room/locked', async (req, res) => {
    res.json(await Hot51Lib.main())
});



// app.get('/', async (req, res) => {
//     res.render('index.html')
// })
// app.get('/room/locked',async(req,res) => {
//     res.render('liveList.html')
// })



app.listen(PORT, () => {
    // console.log(`Listening on http://localhost:${PORT}`)
});