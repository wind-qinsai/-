import React, { Component } from 'react'
import lisa from './images/lisa.jpg'
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {reqlogin} from  '../../api/index'
import './login.css'
import memory from '../../utils/user'
import local from '../../utils/local/localstorage'
import { Redirect } from 'react-router';
export default class Login extends Component {
    render() {
        //如果用户登录了，则就直接跳转
        if(memory.user._id){
            return <Redirect to='/admin'></Redirect>
        }
        const onFinish =async (values) => {
            console.log('Received values of form: ', values);
            const {username,password}=values
            //async和await的作用
            //  作用：不在使用then来指定成功或者失败的回调函数，是异步操作同步化
                // await：可以不会在返回promise，只拿到结果
            const response=await reqlogin(username,password)
            console.log(response)            
            //登陆成功
            if(response.status===0){
            message.success("登录成功")

            //将用户名保存在内存中，但是刷新页面内存会消失
            memory.user=response.data
            local.saveUser(response.data)
            //跳转到展示页面
            this.props.history.replace("/admin")
            }else{
                //登陆失败
            message.error(response.msg)
            }
            
            
            
        }
        return (
            <div className="login">
                <header className="login_header"><img src={lisa}></img>React项目：后台管理系统</header>
                <section className="login-content">
                    <div className="login-user">
                        <h2>用户登录</h2>
                        <div>
                            <Form
                                name="normal_login"
                                className="login-form"
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={onFinish}
                            >
                                <Form.Item
                                    name="username"
                                    rules={[
                                        {
                                            required: true, message: '输入用户名',
                                        },
                                        {
                                            min: 3, messaged: '最少4位',
                                        },
                                        {
                                            max: 12, message: "最大12位"
                                        }
                                    ]}
                                >
                                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Password!',
                                        },
                                    ]}
                                >
                                    <Input
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="Password"
                                    />
                                </Form.Item>


                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.handleSbumit}>
                                        Log in
        </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
