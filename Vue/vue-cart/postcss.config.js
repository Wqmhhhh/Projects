module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      // 对应vw适配标准屏宽度
      // 软件：蓝湖
      // 设计图如果是750，调成一倍，适配375标准屏幕
      // 设计图640，调成一倍，适配320标准屏幕
      viewportWidth: 375
    }
  }
}
