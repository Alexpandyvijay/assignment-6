const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');


dotenv.config();
//connect to DB
async function main(){
    let url = 'mongodb://127.0.0.1:27017/app_mongoose'
    await mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true});
    mongoose.set('useFindAndModify', false);
    return 'connected to DB';
}

app.listen(3000, () => console.log('Server running......'));

main().then(console.log).catch(console.error);
