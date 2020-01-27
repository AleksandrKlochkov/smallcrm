const Form = require('../models/Form')
const errorHandler = require('../utils/errorHandler')
const Position = require('../models/Position')


module.exports.getAll = async function(req, res) {
  try{
    const forms = await Form.find({
      user: req.user.id
    })

    res.status(200).json(forms)
  }catch(e){
    errorHandler(res,e)
  }
}

module.exports.getById = async function(req, res) {

  try{
    const form = await Form.findById(req.params.id)
    res.status(200).json(form)
  }catch(e){
    errorHandler(res,e)
  }
}

module.exports.remove = async function(req, res) {
  try{
    await Form.remove({_id: req.params.id})
    await Position.remove({category: req.params.id})
    res.status(200).json({
      message: 'Форма удалена'
    })
  }catch(e){
    errorHandler(res,e)
  }
}

module.exports.create = async function(req, res) {
    const form = new Form({
      formMethod: req.body.formMethod,
      formName: req.body.formName,
      formNameSite: req.body.formNameSite,
      formUrlSite: req.body.formUrlSite,
      formTitle: req.body.formTitle,
      formDescription: req.body.formDescription,
      formSuccessMessages: req.body.formSuccessMessages,
      imageSrc: req.file ? req.file.path : '',
      formFields: JSON.parse(req.body.formFields),
      formHtmlCode: '',
      user: req.user.id
    })
    try{
       await form.save()
       res.status(201).json(form)
    }catch(e){
       errorHandler(res,e)
    }
}

module.exports.update = async function(req, res) {
  const updated = {
      formMethod: req.body.formMethod,
      formName: req.body.formName,
      formUrlSite: req.body.formUrlSite,
      formNameSite: req.body.formNameSite,
      formTitle: req.body.formTitle,
      formDescription: req.body.formDescription,
      formSuccessMessages: req.body.formSuccessMessages,
      formFields: JSON.parse(req.body.formFields),
      formHtmlCode: '',
  }
  if(req.file){
    updated.imageSrc = req.file.path
  }
  try{
    const form = await Form.findByIdAndUpdate(
      {_id: req.params.id},
      {$set: updated},
      {new: true}
    )
   res.status(200).json(form)
  }catch(e){
    errorHandler(res,e)
  }
}