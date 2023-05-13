import {reactive} from 'vue'
const storage = {
    state:reactive({
        msg:"Hello World!"
    }),
    updateMsg:function(){
        this.state.msg="Hello!"
    }
}
export default storage