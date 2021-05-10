export default function reducer(prev,action){
    switch (action.type) {
        case "add":
            console.log(action)
            return action
        case "name":
            return {add:prev,name:action}
        default:
            return prev
            break;
    }
}