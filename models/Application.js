const mongoose = require('mongoose')
const Schema = mongoose.Schema

const applicationSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  formName: {type: String, require: true},
  imageSrc: {
    type: String,
    default: ''
  },
  formFields: [
    {
      name: {type: String, default: '', require: true},
      value: {type: String, default: '', require: true},
    }
  ],
  formStatus: {type: String, default: 'new', require: true},
  formTypeApplication: {type: String, default: '', require: true},
  form: {
    ref: 'forms',
    type: Schema.Types.ObjectId
  }
})

module.exports = mongoose.model('applications', applicationSchema)