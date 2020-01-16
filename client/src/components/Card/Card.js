import React from 'react'
import {Link} from 'react-router-dom'

const Card = props => {
    return (
        <div className="col xl3 l4 m6 s12">
            <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                    <Link to={props.link} >
                        <div className="card-img teal accent-3">
                            <i className="large material-icons">{props.icon || 'crop_original'}</i> {/*contact_mail*/}
                            {/* <img className="activator" src="images/office.jpg"/> */}
                        </div>
                    </Link>
                </div>
                    <div className="card-content">
                        <span className="card-title activator grey-text text-darken-4">{props.title}<i className="material-icons right">more_vert</i></span>
                        <p><Link to={props.link}>Перейти...</Link></p>
                    </div>
                <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">{props.title}<i className="material-icons right">close</i></span>
                    <p>{props.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Card
