const Application = require('../models/Application')
const errorHandler = require('../utils/errorHandler')


module.exports.getAll = async function(req, res) {
  try{
    const forms = await Application.find({
      user: req.user.id
    })

    res.status(200).json(forms)
  }catch(e){
    errorHandler(res,e)
  }
}

module.exports.getById = async function(req, res) {
  try{
    const application= await Application.findById(req.params.id)
    res.status(200).json(application )
  }catch(e){
    errorHandler(res,e)
  }
}

module.exports.remove = async function(req, res) {
  try{
    await Application.remove({_id: req.params.id})
    res.status(200).json({
      message: 'Заявка удалена'
    })
  }catch(e){
    errorHandler(res,e)
  }
}

module.exports.create = async function(req, res) {
    const application = new Application({
      formName: req.body.formName,
      imageSrc: req.file ? req.file.path : '',
      formFields: JSON.parse(req.body.formFields),
      form: req.body.formId
    })
    
    try{
       await application.save()
       res.status(201).json({message: 'Сообщение отправлено'})
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
    const application = await Application.findByIdAndUpdate(
      {_id: req.params.id},
      {$set: updated},
      {new: true}
    )
   res.status(200).json(application)
  }catch(e){
    errorHandler(res,e)
  }
}