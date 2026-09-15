<script setup>
const props = defineProps({
  checkLoading: {
    type: Function,
  },
})

function inLoading(next) {
  let conainer = document.getElementById('loading')
  conainer.classList.remove('loading_out')
  setTimeout(() => {
    next()
    props.checkLoading()
  }, 1000)
}

function outLoading() {
  let conainer = document.getElementById('loading')
  conainer.classList.add('loading_out')
}

defineExpose({
  inLoading,
  outLoading,
})
</script>

<template>
  <div id="loading">
    <svg viewBox="0 0 50 50">
      <circle r="25" cx="25" cy="25"></circle>
    </svg>
    <p>LOADING</p>
  </div>
</template>

<style>
#loading {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #f7f7f7;
  z-index: 100000000;
  transition: 1s ease;
  user-select: none;
}

#loading svg {
  width: 5rem;
  margin-bottom: 2rem;
  overflow: visible;
  transition: 0.2s ease;
}

#loading svg circle {
  fill: none;
  stroke: #171717;
  stroke-width: 12;
  stroke-dasharray: 160;
  stroke-dashoffset: 160;
  transform-origin: center;
  animation: circle_rotate 2s ease-in infinite;
}

@keyframes circle_rotate {
  0% {
    transform: rotate(0deg);
    stroke-dashoffset: 160;
  }

  100% {
    transform: rotate(360deg);
    stroke-dashoffset: -160;
  }
}

#loading p {
  font-family: sans-serif;
  font-size: 2rem;
  color: #171717;
  font-weight: 900;
  transition: 0.3s ease;
}

.loading_out {
  transform: translateY(100%);
}

.loading_out svg,
.loading_out p {
  opacity: 0;
}
</style>
