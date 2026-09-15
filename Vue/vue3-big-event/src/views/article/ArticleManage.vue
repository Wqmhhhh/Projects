<script setup>
import { Delete, Edit } from '@element-plus/icons-vue'
import ChannelSelect from './components/ChannelSelect.vue'
import { articleGetListService } from '@/api/article'
import { ref } from 'vue'
import { formatTime } from '@/utils/format'
import ArticleEdit from './components/ArticleEdit.vue'

// 假数据
const articleList = ref([])

const onEdit = (row) => {
  artEditRef.value.open(row)
}
const onDel = (row) => {
  console.log(row)
}
const artEditRef = ref()
const onAddArticle = () => {
  artEditRef.value.open({})
}

// 定义请求参数对象
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: '',
})

const total = ref(0)
const getArtList = async () => {
  loading.value = true
  const res = await articleGetListService(params.value)
  articleList.value = res.data.data
  total.value = res.data.total
  loading.value = false
}

getArtList()

const handelSizeChange = (size) => {
  // 每页条数变化，从第一页开始渲染
  params.value.pagenum = 1
  params.value.pageSize = size
  getArtList()
}
const handelCurrentChange = (page) => {
  params.value.pagenum = page
  getArtList()
}

const loading = ref(false)

const onSearch = () => {
  params.value.pagenum = 1
  getArtList()
}
const onReset = () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  getArtList()
}

const onSuccess = (type) => {
  if (type == 'add') {
    const maxPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = maxPage
  }
  getArtList()
}
</script>

<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button @click="onAddArticle">添加文章</el-button>
    </template>
    <el-form inline>
      <el-form-item label="文章分类">
        <ChannelSelect v-model="params.cate_id" width="100px"></ChannelSelect>
      </el-form-item>

      <el-form-item label="发布状态：">
        <el-select style="width: 100px" v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="articleList" v-loading="loading">
      <el-table-column label="文章标题" prop="title">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发表时间" prop="pub_date">
        <template #default="row">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作" prop="">
        <template #default="{ row }">
          <el-button circle plain type="primary" :icon="Edit" @click="onEdit(row)"></el-button>
          <el-button circle plain type="danger" :icon="Delete" @click="onDel(row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 5, 10]"
      :background="true"
      layout="jumper,total, sizes, prev, pager, next"
      :total="total"
      @size-change="handelSizeChange(2)"
      @current-change="handelCurrentChange(1)"
      style="margin-top: 20px; justify-content: flex-end"
    />

    <ArticleEdit ref="artEditRef" @success="onSuccess"></ArticleEdit>
  </page-container>
</template>
