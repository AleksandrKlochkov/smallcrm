import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

// import FeatureDiscovery from '../../components/FeatureDiscovery/FeatureDiscovery'

@inject('authStore','sideBarStore', 'siteLayoutStore','applicationStore')
@observer class Home extends Component {
    render() {
        return (
            <div>
               <div class="filter js-filter-block hide">
                    <div class="fr">
                        <div class="col order">
                            <div class="input-field inline order-position-input">
                                <input type="number" id="number" min="1" />
                                <label for="number">Номер заказа</label>
                            </div>
                        </div>
                        <div class="col filter-pickers">
                            <div class="input-field">
                                <input type="text" class="datepicker" />
                                <label>Начало</label>
                            </div>

                            <div class="input-field">
                                <input type="text" class="datepicker" />
                                <label>Конец</label>
                            </div>
                        </div>
                    </div>

                    <button class="btn waves-effect wavers-light btn-small">Применить фильтр</button>
                </div>


                <table class="highlight mb2">
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>Дата</th>
                        <th>Время</th>
                        <th>Сумма</th>
                        <th></th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>21.12.2000</td>
                        <td>14:21</td>
                        <td>12 211 руб.</td>
                        <td>
                            <button class="btn btn-small modal-trigger grey darken-1" data-target="order-list">
                                <i class="material-icons">open_in_new</i>
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>21.12.2000</td>
                        <td>14:21</td>
                        <td>12 211 руб.</td>
                        <td>
                            <button class="btn btn-small grey darken-1"><i class="material-icons">open_in_new</i></button>
                        </td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>21.12.2000</td>
                        <td>14:21</td>
                        <td>12 211 руб.</td>
                        <td>
                            <button class="btn btn-small grey darken-1"><i class="material-icons">open_in_new</i></button>
                        </td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>21.12.2000</td>
                        <td>14:21</td>
                        <td>12 211 руб.</td>
                        <td>
                            <button class="btn btn-small grey darken-1"><i class="material-icons">open_in_new</i></button>
                        </td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>21.12.2000</td>
                        <td>14:21</td>
                        <td>12 211 руб.</td>
                        <td>
                            <button class="btn btn-small grey darken-1"><i class="material-icons">open_in_new</i></button>
                        </td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>21.12.2000</td>
                        <td>14:21</td>
                        <td>12 211 руб.</td>
                        <td>
                            <button class="btn btn-small grey darken-1"><i class="material-icons">open_in_new</i></button>
                        </td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>21.12.2000</td>
                        <td>14:21</td>
                        <td>12 211 руб.</td>
                        <td>
                            <button class="btn btn-small grey darken-1"><i class="material-icons">open_in_new</i></button>
                        </td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>21.12.2000</td>
                        <td>14:21</td>
                        <td>12 211 руб.</td>
                        <td>
                            <button class="btn btn-small grey darken-1"><i class="material-icons">open_in_new</i></button>
                        </td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>21.12.2000</td>
                        <td>14:21</td>
                        <td>12 211 руб.</td>
                        <td>
                            <button class="btn btn-small grey darken-1"><i class="material-icons">open_in_new</i></button>
                        </td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>21.12.2000</td>
                        <td>14:21</td>
                        <td>12 211 руб.</td>
                        <td>
                            <button class="btn btn-small grey darken-1"><i class="material-icons">open_in_new</i></button>
                        </td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>21.12.2000</td>
                        <td>14:21</td>
                        <td>12 211 руб.</td>
                        <td>
                            <button class="btn btn-small grey darken-1"><i class="material-icons">open_in_new</i></button>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <div class="center mb2">
                    <button class="btn waves-effect grey darken-1 btn-small">Загрузить еще</button>
                </div>
            </div>
        )
    }
}

export default Home