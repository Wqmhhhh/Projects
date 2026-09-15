// 定义转义HTML的方法
function htmlEscape(str){
  return str.replace(/<|>|"|&/g,(match)=>{
    switch(match){
      case "<":return "&lt;"
      case ">":return "&gt;"
      case `"`:return "&quot;"
      case "&":return "&amp;"
    }
  })
}

// 定义还原html的方法
function htmlUnEscape(str){
  return str.replace(/&lt;|&gt;|&quot;|&amp;/g,(match)=>{
    switch(match){
      case"&lt;":return '<'
      case"&rt;":return '>'
      case"&quot;":return '"'
      case"&amp;":return '&'
    }
  })
}