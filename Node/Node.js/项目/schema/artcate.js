const joi=require('joi')
const { param } = require('../router/artcate')

// 定义name、alias的验证规则
const name=joi.string().required()
const alias=joi.string().alphanum().required()

exports.add_cate_schema={
  body:{
    name,
    alias
  }
}

// 定义 分类Id 的验证规则
const id=joi.number().integer().min(1).required()
exports.delete_cate_schema={
  params:{
    id
  }
}

// 根据id获取文章分类
exports.get_cate_schema={
  params:{
    id
  }
}

// 更新文章分类的路由
exports.update_cate_schema={
  body:{
    Id:id,
    name,
    alias
  }
}