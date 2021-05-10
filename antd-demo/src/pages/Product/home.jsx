import React, { Component } from 'react'
import {Switch,Redirect,Route,Link} from 'react-router-dom'
import ProductAdd from './ProductAdd'
import ProductUpdata from './ProductUpdata'
import ProductDetail from './ProductDetail'
import Productshow from './Productshow'

import Linkbutton from '../../components/link-button/link-button';

export default class Home extends Component {
        render(){
            return (
                <Switch>
                     <Route path='/admin/product/show' component={Productshow}></Route>
                     <Route path='/admin/product/add' component={ProductAdd}></Route>
                     <Route path='/admin/product/updata' component={ProductUpdata}></Route>
                     <Route path='/admin/product/detail' component={ProductDetail}></Route>
                     <Redirect to='/admin/product/show'></Redirect>
                 </Switch>
            )
        }
    }
