const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recordShema = new Schema({
    date:[],
    month:[],
    year:[]
});

const recordModel = mongoose.model('Record', recordShema);
module.exports= recordModel;