import React from 'react'
import {Link} from 'react-router-dom'

const Card = props => { 
    const {imageSrc,_id,formName,formTitle,formDescription, date} = props 
    /*
    /contacts/contact_form/${item.formId}
    formAction: ""
formMethod: ""
formUrlSite: ""
imageSrc: "uploads\2501202020-123716_488-avatar2.jpg"
formHtmlCode: ""
_id: "5e2c0c4c6f4c9519b86124d8"
formName: "Форма отзывов о сайте"
formTitle: "Оставьте отзыв"
formDescription: "Форма для отзывов о сайте"
user: "5db5e368a2c7e11f50d622d8"
date: "2020-01-25T09:37:16.529Z"
    */

    return (
        <div className="col xl3 l4 m6 s12">
            <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                    <Link to={`/contacts/contact_form/${_id}`} >
                        <div className="card-img teal accent-3">
                            {imageSrc ? <img className="activator" src={'/'+imageSrc}/> : <i className="large material-icons">{'crop_original'}</i>}
                        </div>
                    </Link>
                </div>
                    <div className="card-content">
                        <span className="card-title activator grey-text text-darken-4">{formName}<i className="material-icons right">more_vert</i></span>
                        <p><Link to={`/contacts/contact_form/${_id}`}>Перейти...</Link></p>
                    </div>
                <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">{formName}<i className="material-icons right">close</i></span>
                    <p>{formDescription}</p>
                </div>
            </div>
        </div>
    )
}

export default Card
