import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import FeatureDiscovery from '../../components/FeatureDiscovery/FeatureDiscovery'

@inject('authStore','sideBarStore', 'siteLayoutStore')
@observer class Home extends Component {
    render() {
        return (
            <div>
               <h1>CRM</h1>
               {/* <FeatureDiscovery tapTargetRef={this.props.tapTargetRef} title="CRM" description="Станица CRM" /> */}
            </div>
        )
    }
}

export default Home