import React, { Component } from 'react'
import './Popup.css'

class Popup extends Component {

    render() {
        return (
            <div id="popup"
             className="modal modal_win_bg modal--align-top modal_win_bg_can_close"
              role="dialog" 
              aria-hidden="true" 
            //   style={{display:"none"}}
            >
                <div className="modal_win_dialog">
                    <div className="modal_win_content">
                        modal
                    </div>
                    <a href="#" className="modal_win_close  demo-close">
                        <i className="fa new-close fa-times" aria-hidden="true"></i>
                    </a>
                </div>
            </div>
        )
    }
}


export default Popup