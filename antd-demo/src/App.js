
import {BrowserRouter, Link, Redirect, Route,Switch} from  'react-router-dom'
import React, { Component } from 'react'
import Login from './pages/login/login'
import Admin from './pages/admin/Admin'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
       <Switch>
        <Route path="/login" component={Login}></Route>
        <Route path="/admin" component={Admin}></Route>
        <Redirect to='/login'></Redirect>
       </Switch>
      </BrowserRouter>
    )
  }
}

