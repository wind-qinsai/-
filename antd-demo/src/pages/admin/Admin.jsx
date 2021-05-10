import React, { Component } from 'react'
import { Redirect,Switch,Route } from 'react-router-dom'
import { Layout } from 'antd';
import memory from '../../utils/user'
import './admin.css'
import App from '../../components/left-nav/leftNav'
import Header from '../../components/header/header'
import Home from '../Home/Home'
// import Charts from '../Charts'
import producthome from '../Product/home'
import Role from '../Role/Role'
import User from '../User/User'
import Category from '../Category/Category'
const { Footer, Sider, Content } = Layout;

//后台管理的路由组件
export default class Admin extends Component {
    render() {
        if (!memory.user._id) {
            return <Redirect to='/login'></Redirect>
        }
        return (
            <div style={{ heihgt: '100%' }}>
                <Layout style={{ heihgt: '100%' }}>
                    <Sider style={{ heihgt: '100%' }}><App></App></Sider>
                    <Layout>
                        <Header></Header>
                        <Content style={{background:"#f00",padding:"20px"}}>
                            <Switch>
                                <Route path='/admin/home' component={Home}></Route>
                                <Route path='/admin/category' component={Category}></Route>
                                <Route path='/admin/product' component={producthome}></Route>
                                <Route path='/admin/role' component={Role}></Route>
                                <Route path='/admin/user' component={User}></Route>
                                {/* <Route to='/charts' component={}></Route> */}
                                <Redirect to='/admin/home'></Redirect>
                            </Switch>
                        </Content>
                        <Footer>Footer</Footer>
                    </Layout>
                </Layout>
            </div>
        )
    }
}
