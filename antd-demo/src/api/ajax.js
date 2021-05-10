import axios from 'axios'
//将异常统一进行处理
import {message} from 'antd'
export default function ajax(url, data = {}, type = "GET") {
  return new Promise((resolve)=>{
    let promise
    if (type === "GET") {
           promise =axios.get(url, {
            params: data
          })
        } else {
          promise= axios.post(url, data)
        }
      //成功  先将返回的promise对象使用then方法获得
      promise.then((response)=>{
        resolve(response.data)
      }).catch((error)=>{
        message.error("出粗了"+error.message)
      })  })
 }


