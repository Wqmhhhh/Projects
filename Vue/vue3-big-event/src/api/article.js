import request from '@/utils/request'

export const articleChannelService=()=>request.get('/my/cate/list')

export const articleAddChannelService=(data)=>request.post('/my/cate/add',data)

export const articleEditChannelService=(data)=>request.put('/my/cate/info',data)

export const articleDelChannelServive=(id)=>request.delete('/my/cate/del',{
  params:{
    id
  }
})

export const articleGetListService=(params)=>{
  return request.get('/my/article/list',{
    params
  })
}

export const artPubService=(data)=>{
  console.log(data)
  return request.post('/my/article/add',data)
}

export const artGetDetailService=(id)=>{
  return request.get('/my/article/info',{
    params:{id}
  })
}

export const artUpdateService=(data)=>request.put('/my/article/info',data)
