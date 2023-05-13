const dayjs = require('dayjs')

function filterTimes(val,format='YYYY-MM-DD'){
    if(!isNull(val)){
        val = parseInt(val) *1000;
        return dayjs(val).format(format);
    }else{
        return '-';
    }

}

export function isNull(date){
    if(!date) return true;
    if(JSON.stringify(date)==='{}') return true;
    if(JSON.stringify(date)==='[]') return true;
}

export default app=>{
    app.config.globalProperties.$filters = {
        filterTimes
    }
}