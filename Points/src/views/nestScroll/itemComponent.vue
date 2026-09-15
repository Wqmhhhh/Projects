<script setup>
import { ref } from 'vue'

const props = defineProps({
  content: {
    type: Object,
  },
  itemHeight: {
    type: Number,
  },
})

const drawerShow = ref(false)
const handleDrawer = (e) => {
  e.stopPropagation()
}
</script>

<template>
  <div
    class="container"
    :style="{
      height: `${props.itemHeight}px`,
      lineHeight: `${props.itemHeight}px`,
    }"
    :key="props.content.id"
  >
    <div class="content" :class="{ contentShrink: drawerShow }" @click="drawerShow = !drawerShow">
      {{ props.content.id }}
    </div>

    <div
      class="drawer"
      :class="{ drawerShow: drawerShow }"
      :style="{
        height: `${props.itemHeight}px`,
      }"
      @wheel="handleDrawer"
    >
      <div class="drawerContent">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus omnis aperiam
        laudantium cum vero molestias distinctio, soluta magni eos exercitationem recusandae natus
        corporis voluptates blanditiis odit saepe cumque dolor. Cupiditate hic repudiandae culpa,
        eum quam architecto, reprehenderit ut ipsam alias nihil possimus. Blanditiis eaque
        exercitationem culpa! Ex vitae voluptatem architecto voluptatum quibusdam, dolore quis
        minima quasi recusandae repudiandae totam numquam distinctio velit perferendis atque
        praesentium accusantium, id debitis aperiam possimus facere obcaecati dolorem itaque.
        Accusamus atque, ipsum in laudantium sequi modi similique suscipit blanditiis optio quo hic
        fugit est ab delectus corporis eveniet autem commodi amet vero at laboriosam dicta quis! Eum
        aspernatur consequatur, sapiente odit id impedit. Quibusdam, aspernatur repellat expedita
        ipsum ut tempore beatae! Vitae ducimus dicta exercitationem repudiandae reprehenderit quo.
        Reiciendis, mollitia necessitatibus autem magni, optio molestiae facere, at dolores aperiam
        esse perspiciatis reprehenderit alias fuga modi totam ex amet! Distinctio magni reiciendis
        velit eaque assumenda vero ipsam quis sed dolor consequatur totam, esse quos error deserunt
        alias repudiandae laudantium ipsum reprehenderit ipsa dignissimos suscipit. Quia quae porro
        aut commodi harum, sunt totam sapiente nobis, cumque sequi, nesciunt consectetur
        exercitationem enim dolores inventore sint id neque suscipit aspernatur corporis!
        Consectetur quasi, delectus iste cum temporibus reprehenderit veniam quas, illum voluptas
        illo, enim quos. Aspernatur obcaecati iure alias, maxime dolorum itaque corrupti sapiente ab
        non, provident expedita? Natus unde vel rerum ullam asperiores voluptatum eaque ipsum
        tempore nesciunt repellendus, perferendis in beatae, ipsa laudantium esse ab, reiciendis
        porro aperiam laboriosam! Eaque ut quia cum. Illo delectus necessitatibus quisquam, tempore
        dolorum aspernatur ducimus iusto iure doloremque maiores cum eveniet porro quo dicta eum
        non! Cupiditate ex commodi harum asperiores cumque dolore, numquam similique rerum nesciunt
        laboriosam odit, laudantium dolor eveniet deserunt. Ipsa hic aliquid moles
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  box-sizing: border-box;
  border: 1px solid #ddd;
  text-align: center;
  color: #333;
  display: flex;
  position: relative;
  overflow: scroll;
  scrollbar-width: none;
}
.content {
  width: 100%;
  background-color: #1eff00;
  transition: width 0.5s ease;
}
.drawer {
  background-color: #ffffff73;
  left: 100%;
  width: 50%;
  position: absolute;
  overflow-y: scroll;
  transition: left 0.5s ease;
}
.drawerShow {
  left: 50%;
}
.contentShrink {
  width: 50%;
}
.drawerContent {
  background-color: #fbff00;
  width: 100%;
  line-height: 20px;
  word-wrap: break-word;
}
</style>
