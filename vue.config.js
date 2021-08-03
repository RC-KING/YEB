

// ======================= //
// ======跨域请求处理====== //
// ======================= //
let proxyObj={}

proxyObj['/']={
  // WebSocket
  ws:false,
  // 代理转发到后端地址
  target:'http://localhost:8081',
  // 发送请求头中的host会被设置为target
  changeOrigin: true,
  // 不重写请求地址
  pathReWrite:{
    '^/':'/'
  }
}


module.exports={
  devServer:{
    host:'localhost',
    port:8080,
    proxy:proxyObj
  }
}