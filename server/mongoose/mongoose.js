const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
.then(()=>{
    console.log(`Mongodb is running on ${process.env.MONGODB_URI}`);
})
.catch(err=>{
    console.log('Mongodb is not running');
});

mongoose.set('useCreateIndex', true);

module.exports = {mongoose};