const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passportLocalMongoose = require("passport-local-mongoose");

const schema = new Schema({
  gender: {
    type: String,
    default: "",
  },
  maritalStatus: {
    type: String,
    default: "",
  },
  state: {
    type: String,
    default: "",
  },
  residence: {
    type: String,
    default: "",
  },
  category: {
    type: String,
    default: "",
  },
  diferentlyAbled: {
    type: String,
    default: "",
  },
  minority: {
    type: String,
    default: "",
  },
  student: {
    type: String,
    default: "",
  },
  bpl: {
    type: String,
    default: "",
  },
  familyIncome: {
    type: Number,
    default: "",
  },
  parentIncome: {
    type: String,
    default: "",
  },
});
