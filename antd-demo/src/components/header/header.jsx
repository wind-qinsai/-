import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import './header.css'
import { message,Model } from 'antd'
import jsonp from 'jsonp'
import local from '../../utils/local/localstorage'
//引入提示框
import { Modal, Button, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

//引入名单选项
import menulist from '../../config/menuconfig'

//y引入内存
import username from '../../utils/user'
//引入button按钮
import Linkbutton from '../link-button/link-button'


const { confirm } = Modal;
 


 class Header extends Component {
    state={date:"",weather:"",winddirection:"",temperature:"",title:""}
//对日期进行简单的封装
    getdate=(da)=>{
        da=new Date(da)
        var year = da.getFullYear()+'年';
        var month = da.getMonth()+1+'月';
        var date = da.getDate()+'日';
        var hour=da.getHours()+'时'
        var minutes=da.getMinutes()+'分'
        var second=da.getSeconds()+'秒'
        var d=[year,month,date,hour,minutes,second].join('-')
        this.setState({date:d})
    }

    //设置计时器函数
    getNewDate=()=>{
       this.intervalId= setInterval(()=>{
            let da=Date.now()
            this.getdate(da)
        },1000)
    }


    //点击退出登录
    go=()=>{
      console.log(this)
      let _this=this
        confirm({
              title: '退出登录?',
              icon: <ExclamationCircleOutlined />,
              content: '确定要退出',
              onOk:()=> {
               local.removeUser()
               
               username.user={}

               _this.props.history.replace('/login')
              },
              onCancel() {
                console.log('Cancel');
              },
            })    ;
          }
        

    //匹配路径
    path=()=>{
     
      const path=this.props.location.pathname
      let title
      menulist.forEach((item)=>{
        if(item.key==path){
           title=item.title
        }else if(item.children){
          item.children.forEach((item)=>{
            if(item.key==path){
               title=item.title
            }
          })
        }
      })
      return title
    }

    //生命周期
    componentDidMount(){
        this.getNewDate()
        const url=`https://restapi.amap.com/v3/weather/weatherInfo?city=130600&key=6066b7544c4fec3b6fdba3c8c5a39391`
        const getWeather=(url)=>{
            jsonp(url, {}, (err, data) => {
               console.log('jsonp()', err, data)
               // // 如果成功了
               if (!err && data.status==='1') {
                 // 取出需要的数据
                     const {weather,winddirection,temperature }   =data.lives[0]
                     this.setState({weather:weather,winddirection:winddirection,temperature:temperature})
               } else {
                 // 如果失败了
                 message.error('获取天气信息失败!')
               }
             })
          }
        getWeather(url)
    }

    //即将卸载 
    componentWillUnmount(){
      clearInterval(this.intervalId)
      console.log(2)
    } 
    render() {
        const title=this.path()
        return (
            <div className="header">
                <h3>
                  <p>欢迎admin   <Linkbutton onClick={this.go}>退出</Linkbutton></p>
                  <h5><span>{this.state.date} </span><span> 天气：{this.state.weather} </span><span>风力：{this.state.winddirection} </span><span>气温：{this.state.temperature}</span></h5>
                </h3>
                <h1>{title}</h1>
            </div>
        )
    }
}
export default withRouter(Header)