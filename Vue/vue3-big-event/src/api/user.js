import request from '@/utils/request'

// 注册接口
export const userRegisterServive = ({ username, password, repassword }) => {
  return request.post('/api/reg', { username, password, repassword })
}

// 登录接口
export const userLoginServive=({username, password})=>{
  return request.post('/api/login',{
    username, password
  })
}

export const userGetInfoServive=()=>{
  return request.get('/my/userinfo')
}

export const userUpdateService=(data)=>{
  return request.put('/my/userinfo',data)
}

export const userUpdatePicSevice=(avatar)=>request.patch('/my/update/avatar',{avatar})

export const userUpdatePasswordService=({old_pwd,new_pwd,re_pwd})=>request.patch('/my/updatepwd',{old_pwd,new_pwd,re_pwd})