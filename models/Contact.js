const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contactSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  formAction:{
    type: String,
    default: ''
  },
  formMethod: {
    type: String,
    default: ''
  },
  formUrlSite: {
    type: String,
    default: ''
  },
  formName: {
    type: String,
    required: true
  },
  formTitle: {
    type: String,
    required: true
  },
  formDescription: {
    type: String,
    required: true
  },
  imageSrc: {
    type: String,
    default: ''
  },
  formFields: [
    {
      fieldLabel: {type: String, required: true},
      fieldType: {type: String, required: true},
      fieldPlaceholder: {type: String, default: ''},
      fieldValue: {type: String, default: ''},
      fieldTitle: {type: String, required: true},
      fieldSelectValues: {type: Array, default: []},
      fieldName: {type: String, required: true, default: ''},
      fieldHidden:{type: Boolean, required: true} 
    }
  ],
  formHtmlCode: {
    type: String,
    default: ''
  },
  user: {
    ref: 'users',
    type: Schema.Types.ObjectId
  }
})

module.exports = mongoose.model('contact', contactSchema)