import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'

import 'antd/dist/antd.css';
import App from './App';
import  local from './utils/local/localstorage'
import memory from './utils/user'
import store from './utils/store/store'

//读取local中保存user，保存到内存中
 const user=local.getUser()
 memory.user=user
 console.log( memory.user)

//登陆页面
ReactDOM.render(<Provider store={store}><App/></Provider>,document.getElementById("root"))






