import React, { Component } from 'react'

export default class FormGenerate extends Component {
    render() {
        return (
            <div>
                <form action="#" method="POST" style={{border: "2px solid  #26a69a", width: "100%", maxWidth:640, padding:20, borderRadius: 5}} noValidate>
                    <div>
                        <h2 style={{color: "#26a69a", fontSize: "18px", padding: " 0 0 15px 0", margin: "10px 0"}}>Обратная связь</h2>  
                    </div>

                    <div className="fields-editing" style={{marginBottom: "10px"}}>
                        <button type="button" className="btn btn-small green modal-trigger" href="#modal1">
                            <i className="material-icons">add</i>
                        </button> 
                    </div>
                    { this.props.formFields.map((item,index) => {
                        return (
                                <div key={index} className="input-field">
                                    <input id={item.name} type="text" name={item.name} required/>
                                    <label htmlFor={item.name}>{item.title}</label>
                                </div>
                            )
                         })
                    }
                    <button className="waves-effect waves-light btn" type="submit">
                        Отправить
                    </button>
                </form>
            </div>
        )
    }
}
