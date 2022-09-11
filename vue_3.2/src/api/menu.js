import request from './request'
export const menuList=(data)=>{
    return request({
        url:'/menus',
    })
}