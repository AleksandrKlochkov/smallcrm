import React from 'react'
import {withRouter} from 'react-router-dom'


const FeatureDiscovery = props => {
    const {title, description, tapTargetRef} = props
        return (
            <React.Fragment>
                    <div
                        ref={tapTargetRef}
                        className="tap-target" 
                        data-target="menu"
                    >
                        <div className="tap-target-content">
                            <h5>{title || "Вы на странице "}</h5>
                            <p>{description}</p>
                        </div>
                    </div>
            </React.Fragment>
        )
    
}

export default withRouter(FeatureDiscovery)
