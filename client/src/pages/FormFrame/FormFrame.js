import React, { Component} from 'react'
import { inject, observer} from 'mobx-react'
import {withRouter} from 'react-router-dom'
import FormGenerate from '../../components/FormGenerate/FormGenerate'


@inject('contactFormStore','modalStore')
@observer class FormFrame extends Component {

    componentDidMount() {
        window.M.updateTextFields()
    }

    render() {
        const {contactFormStore, modalStore, history} = this.props
        return (
            <div className="frame-container">
              <FormGenerate />
            </div>
        )
    }
}

export default withRouter(FormFrame)
