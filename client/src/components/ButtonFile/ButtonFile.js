import React from 'react'

const ButtonFile = props => {

    const triggerClick = (event) =>{
        const elem = event.currentTarget
        elem.querySelector('input').click()
    }

    return (
        <div onClick={(event)=>triggerClick(event)} >
            <input onChange={props.onChangeHandlerFile} name="formImages" type="file" hidden/>
            <button className="waves-effect waves-light btn orange lighten-2 mb2" type="button">
                <i className="material-icons left">backup</i>
                Загрузить изображение
            </button>
        </div>
    )
}

export default ButtonFile
