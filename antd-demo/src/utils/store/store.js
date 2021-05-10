import {createStore} from 'redux'
import reducer from './reducer'
let obj={}
let store=createStore(reducer,obj)
export default store