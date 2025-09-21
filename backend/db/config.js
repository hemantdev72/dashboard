const mongoose = require('mongoose');

async function dbConnect(){

    try{
        await mongoose.connect('mongodb+srv://hemantdev72_db_user:rxPC3OIzpizN1BQC@cluster0.iokyzlc.mongodb.net/dashboard');
        console.log('Connected to MongoDB');

    }catch(error){
        console.error('Error while connection DB', error)
    }
}

module.exports={dbConnect}

  