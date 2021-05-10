export default{
    saveUser(user){//因为存储的是对象形式
        localStorage.setItem('user_key',JSON.stringify(user))
    },
    getUser(){
      return  JSON.parse(localStorage.getItem("user_key")||'{}')
    },
    removeUser(){
        localStorage.removeItem("user_key")
    }

}