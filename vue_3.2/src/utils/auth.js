import  { TOKEN_TIME,TOKEN_TIME_VALUE} from './constant'
//登录时设置时间
export function setTokenTime(){
    localStorage.setItem(TOKEN_TIME,Date.now());
}
//获取
export function getTokenTime(){
    return localStorage.getItem(TOKEN_TIME);
}

export function diffTokenTime(){
    const currentTime = Date.now();
    const tokenTime = getTokenTime();
    return currentTime -tokenTime > TOKEN_TIME_VALUE;
}