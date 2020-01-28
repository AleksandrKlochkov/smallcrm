import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import  ApplicationModal from '../../components/ApplicationModal/ApplicationModal'
import Loading from '../../components/Loading/Loading'

// import FeatureDiscovery from '../../components/FeatureDiscovery/FeatureDiscovery'

@inject('authStore','modalStore','applicationStore','contactFormStore')
@observer class Home extends Component {


    constructor(props) {
        super(props)
        this.modalApplicationRef =React.createRef()
    }

    modalHandler(id) {
       
        this.props.modalStore.setModalElement(this.modalApplicationRef.current)
        this.props.applicationStore.fetchApplicationById(id)
    }

    renderApplications() {
        const {applicationStore} = this.props
        if(applicationStore.Applications && applicationStore.Applications.length !==0){
        return this.props.applicationStore.Applications.map((item,index)=>{
            let formTypeApplication =''
            switch (item.formTypeApplication) {
                case 'support':
                    formTypeApplication = 'Поддержка'
                    break;
                case 'sales':
                    formTypeApplication = 'Продажи'
                break;
                default:
                    formTypeApplication = 'Не заданно'
                    break;
            }
            let formStatus = ''
            switch (item.formStatus.trim()) {
                case 'new':
                    formStatus = 'Новая'
                    break;
                case 'expired':
                    formStatus = 'Просроченна'
                break;
                case 'inwork':
                    formStatus = 'В работе'
                break;
                case 'completed':
                    formStatus = 'Завершена'
                break;
                default:
                    formStatus = 'Не заданно'
                break;
            }
            return (
                <tr key={index} className={`applications-field ${item.formStatus}`}>
                    <td>{index+1}</td>
                    <td>{item.formName}</td>
                    <td>{formStatus}</td>
                    <td>{formTypeApplication}</td>
                    <td>{new Date(item.date).toLocaleDateString()}</td>
                    <td>{`${new Date(item.date).getHours()}:${new Date(item.date).getMinutes()} `}</td>
                    <td>
                        <button  onClick={()=>this.modalHandler(item._id)} className="btn btn-small grey darken-1"><i className="material-icons">open_in_new</i></button>
                    </td>
                </tr>
            )
            
        })
    }

    return (
        'Нет действующих заявок'
    )

        
    }

    closeModal(e) {
        e.stopPropagation()
        const close = e.target.classList.contains('modal_win_close')
        if(close){
            const {modalStore} = this.props
            // contactFormStore.clearFieldForm()
            // if(this.modalRef.current){
            //     this.modalRef.current.querySelector('form').reset()
            // }
            modalStore.modalClose()
        }
    }


    componentDidMount(){
        this.props.applicationStore.fetchApplications()
    }

    render() {
        const {applicationStore} = this.props
        return (
            <React.Fragment>
            {applicationStore.Loading ? <Loading /> :
            <div>
             
                {/* {applicationStore.Applications && applicationStore.Applications.length !==0 ?
                    <div className="fields-editing">
                        <button className="btn btn-small js-filter tooltipped active" data-tooltip="Открыть фильтр">
                            <i className="material-icons">filter_list</i>
                        </button>
                    </div>
                : null} */}
                
               <div className="filter js-filter-block hide">
                    <div className="fr">
                        <div className="col order">
                            <div className="input-field inline order-position-input">
                                <input type="number" id="number" min="1" />
                                <label htmlFor="number">Номер заказа</label>
                            </div>
                        </div>
                        <div className="col filter-pickers">
                            <div className="input-field">
                                <input type="text" className="datepicker" />
                                <label>Начало</label>
                            </div>

                            <div className="input-field">
                                <input type="text" className="datepicker" />
                                <label>Конец</label>
                            </div>
                        </div>
                    </div>

                    <button className="btn waves-effect wavers-light btn-small">Применить фильтр</button>
                </div>

              
                    <table className="highlight mb2">
                    {applicationStore.Applications && applicationStore.Applications.length !==0 ?
                        <thead>
                        <tr>
                            <th>№</th>
                            <th>Название заявки</th>
                            <th>Статус</th>
                            <th>Тип заявки</th>
                            <th>Дата</th>
                            <th>Время</th>
                            <th></th>
                        </tr>
                        </thead>
                    : null}
                        <tbody>
                            {this.renderApplications()}
                        </tbody>
                    </table>
                

                {/* <div className="center mb2">
                    <button className="btn waves-effect grey darken-1 btn-small">Обновить</button>
                </div> */}
                 <ApplicationModal 
                    id={'applicationModal'}
                    modalRef={this.modalApplicationRef}
                    closeModal={this.closeModal.bind(this)}
                 />

            </div>
    }
            </React.Fragment>
        )
    }
}

export default Home