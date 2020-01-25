import React from 'react'
import {Link} from 'react-router-dom'

const Card = props => { 
    const {imageSrc,_id,formName,formDescription, date, icon, link} = props 
    const url =  link || `/contacts/contact_form/${_id}`
    return (
        <div className="col xl3 l4 m6 s12">
            <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                    <Link to={url} >
                        <div className="card-img teal accent-3">
                            {
                                imageSrc 
                                ? 
                                <img className="activator" src={'/'+imageSrc} alt="Images Forms"/> 
                                : 
                                <i className="large material-icons">{icon || 'crop_original'}</i>
                            }
                        </div>
                    </Link>
                </div>
                    <div className="card-content card-padding">
                        <span className="card-title activator grey-text text-darken-4">{formName}<i className="material-icons right">more_vert</i></span>
                        <p><Link to={url}>Перейти...</Link></p>
                    </div>
                <div className="card-reveal card-padding">
              
                    <span className="card-title grey-text text-darken-4">{formName}<i className="material-icons right">close</i></span>
                    <p>{formDescription}</p>
                    {date ? <small className="card-create-date">Дата создания: {new Date(date).toLocaleDateString()}</small> : null}
                </div>
            </div>
        </div>
    )
}

export default Card
