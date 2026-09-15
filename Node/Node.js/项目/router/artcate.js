// 文章分类的路由模块
const express=require("express")
const router=express.Router()

const artcate_handler=require('../router_handler/artcate')

// 导入验证数据的中间件
const expressJoi=require("@escook/express-joi")
const {add_cate_schema,delete_cate_schema,get_cate_schema,update_cate_schema}=require('../schema/artcate')

// 获取文章分类列表数据的路由
router.get('/cates',artcate_handler.getArtCates)

// 新增文章分类的路由
router.post('/addcates',expressJoi(add_cate_schema),artcate_handler.addArticleCates)

// 根据id删除对应文章分类的路由
router.get('/deletecate/:id',expressJoi(delete_cate_schema),artcate_handler.deleteCateById)

// 根据Id获取文章分类数据
router.get('/cates/:id',expressJoi(get_cate_schema),artcate_handler.getArtCateById)

// 根据Id更新文章分类数据
router.post('/updatecate',expressJoi(update_cate_schema),artcate_handler.updateCateById)

module.exports=router