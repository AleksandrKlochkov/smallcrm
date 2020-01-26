const Contact = require('../models/Contact')
const errorHandler = require('../utils/errorHandler')
const Position = require('../models/Position')


module.exports.getAll = async function(req, res) {
  try{
    const forms = await Contact.find({
      user: req.user.id
    })

    res.status(200).json(forms)
  }catch(e){
    errorHandler(res,e)
  }
}

module.exports.getById = async function(req, res) {
  try{
    const form = await Contact.findById(req.params.id)
    res.status(200).json(form)
  }catch(e){
    errorHandler(res,e)
  }
}

module.exports.remove = async function(req, res) {
  // try{
  //   await Contact.remove({_id: req.params.id})
  //   await Position.remove({category: req.params.id})
  //   res.status(200).json({
  //     message: 'Категория удалена'
  //   })
  // }catch(e){
  //   errorHandler(res,e)
  // }
}

module.exports.create = async function(req, res) {
    console.log(req.body.formFields)
    const form = new Contact({
      formMethod: req.body.formMethod,
      formName: req.body.formName,
      formUrlSite: req.body.formUrlSite,
      formTitle: req.body.formTitle,
      formDescription: req.body.formDescription,
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
  console.log(req.body)
  // const updated = {
  //   name: req.body.name
  // }

  // if(req.file){
  //   updated.imageSrc = req.file.path
  // }
  // try{
  //   const form = await Contact.findByIdAndUpdate(
  //     {_id: req.params.id},
  //     {$set: updated},
  //     {new: true}
  //   )
   // res.status(200).json(form)
   res.status(200).json({message:'ок'})
  // }catch(e){
  //   errorHandler(res,e)
  // }
}