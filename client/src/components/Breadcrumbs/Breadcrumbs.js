import React from 'react'
import {withRouter,Link} from 'react-router-dom'

const Breadcrumb = props => {
    const renderBreadcrumb = () => {
        return props.breadcrumbLinks.map((item,index) => {
            return (
                <React.Fragment  key={`${index}_${Math.random()}`} >
                    <li>
                        <Link className={`${item.active? "activ-pagination-links-tags":""}`} to={item.url || '/'}>{item.title || 'Главная'}</Link>
                    </li>
                    <li><i className="material-icons">keyboard_arrow_right</i></li>
                </React.Fragment>
            )
        })
    }

    return (
        <div className="pagination-links-tags-b">
            <div className="pagination-links-tags-cont">
                <ul className="ul-pagination-links-tags">
                 {renderBreadcrumb()}
                </ul>
            </div>   
        </div>
    )
}

export default withRouter(Breadcrumb)