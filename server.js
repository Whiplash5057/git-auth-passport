const express = require('express');
const path = require('path');
// const port = process.env.port || 8080;
const app = express();
app.listen(process.env.PORT || 3000 ,function(){
    console.log("Server started "+process.env.PORT);
});
app.use(express.static(__dirname));
app.get('*' , (req, res) => {
 res.sendFile(path.resolve(__dirname,'index.html'))
});
// app.listen(port);
// console.log('Server started');