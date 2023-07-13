// models/Memorial.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tributeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  date: Date,
  description: String
});

const lifeSchema = new Schema({
  title: String,
  date: Date,
  description: String,
  author: String,
  attachments: [String]
});

const gallerySchema = new Schema({
  audios: [String],
  videos: [String],
  photos: [String]
});

const memorialSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, required: true },
  displayPicture: String,
  relationship: { type: String, required: true },
  memorialDestination: { type: String, required: true },
  country: String,
  birthDate: Date,
  birthPlace: String,
  passedDate: Date,
  deathPlace: String,
  deathCountry: String,
  backgroundMusic: [String],
  owner:String,
  visitors:[String],
  webAddress: String,
  publicVisibility:Boolean,
  category: [String],
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  theme: { type: Schema.Types.ObjectId, ref: 'Theme' },
  life: [{ type: Schema.Types.ObjectId, ref: 'Life' }], 
  story: [{type: Schema.Types.ObjectId, ref: 'Story'}],
  privacy:{
    birthday: {type: Boolean, default:false},
    passed: {type:Boolean, default:false},
    onlyme:{type:Boolean,default:false},
  },
  notification:{
    birthday: {type: Boolean, default:false},
    passed: {type:Boolean, default:false},
    post:{type:Boolean,default:false},
    emailSent: Boolean,
  },
  about: {
    personalPhrase: String,
    tributes: [tributeSchema]
     
  },
  gallery: {
    audios: [String],
    videos: [String],
    photos: [String]
  },
});

module.exports = mongoose.model('Memorial', memorialSchema);
