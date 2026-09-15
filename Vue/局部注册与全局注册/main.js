// 文件核心作用：导入App.vue，基于App.vue创建结构渲染index.html

// 导入Vue核心包
import Vue from 'vue'
import App from './App.vue'

// 编写导入的代码，在代码的顶部编写
import SheButton  from './components/SheButton.vue'


// 导入App.vue根组件
Vue.config.productionTip = false

// 进行全局注册:在所有组件范围内都能直接使用
Vue.component('SheButton',SheButton)

// Vue实例化,提供render方法,基于App.vue创建结构渲染index.html
new Vue({
  el:'#app',//作用与 .$mount('#app') 等价，用于指定Vue管理的容器
  render: h => 
    // 基于App创建元素结构
    h(App),
}).$mount('#app')
