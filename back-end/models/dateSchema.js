const { Decimal128 } = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
require("mongoose-long")(mongoose);
const SchemaTypes = mongoose.Schema.Types;
const dateSchema = new Schema({
 referenceId: SchemaTypes.Long,
  birthday: {
    date: {
        required: true,
        type: Number
    },
    month: {
        required: true,
        type: Number
    },
    year: {
        required: true,
        type: String
    }
  }
});

const dateModel = mongoose.model('Date', dateSchema);
module.exports= dateModel;