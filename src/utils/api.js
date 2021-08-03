import axios from "axios";
import {
  Message
} from "element-ui";
import router from '../router'


// ===================== //
// ====统一拦截器处理==== //
// ===================== //

// 响应拦截器
axios.interceptors.response.use(
  (success) => {
    // 业务逻辑错误
    // 首先要能正常响应,进入业务逻辑处理
    if (success.status && success.status == 200) {
      // code是自定义的业务逻辑错误代码
      if (success.data.code == 500 || success.data.code == 401 || success.data.code == 403) {
        Message.error({
          message: success.data.message
        })
        // 对于业务逻辑错误处理,返回空
        return;
      }
      // 业务逻辑成功
      if (success.data.message) {
        Message.success({
          message: success.data.message
        })
      }
    }
    // 正常业务逻辑,返回响应
    return success.data;
  },
  (errror) => {
    if (errror.response.code == 504 || errror.response.code == 404) {
      Message.error({
        message: '服务器被吃了o(╯□╰)o'
      })
    } else if (error.response.code == 403) {
      Message.error({
        message: '权限不足,请联系管理员'
      })
    } else if (error.response.code == 401) {
      Message.error({
        message: '尚未登录,请登录后再处理'
      })
      // 跳转到登录页面
      router.replace('/');
    } else {

      if (error.response.message) {
        // 如果有错误响应信息,则拿出来作为提示
        Message.error({
          message: error.response.message
        })
      } else {
        // 没有错误信息,则是未知错误
        Message.error({
          message: '未知错误!'
        })
      }
    }
})



// ======================= //
// ======统一请求处理====== //
// ======================= //
// url统一前缀
let base = "";
export const postRequest= (url,params)=>{
  return axios({
    method:'POST',
    url: `${base}${url}`,
    data:params
  })

}