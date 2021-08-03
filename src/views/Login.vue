<template>
  <div>
    <el-form :rules="rules" :model="loginForm" ref="loginForm" size="normal" class="loginContainer">
      <h2 class="loginTitle">登录界面</h2>
      <!-- 用户名 -->
      <el-form-item prop="userName">
        <el-input type="text" v-model="loginForm.userName" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <!-- 验证码 -->
      <el-form-item prop="code">
        <el-input type="text" v-model="loginForm.code" placeholder="点击图片,更换验证码" auto-complete="false" style="width:230px"></el-input>
        <img :src="captchaUrl" @click="updateCaptcha"></img>
      </el-form-item>
      <!-- 登录按钮 -->
      <el-form-item>
        <el-checkbox v-model="RemberMe">记住我</el-checkbox>
        <el-button style="width: 100%" type="primary" @click="SubmitLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        userName: "",
        password: "",
        code: "",
      },
      captchaUrl: '/captcha?time='+new Date(),
      RemberMe: true,
      rules: {
        // 这里的名字和每个 form-item 的 prop="userName" 对应起来
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
    };
  },
  methods: {
    SubmitLogin() {
      // 这里的$refs.loginForm和表单的 ref="loginForm" 对应起来
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$message.success("登录成功");
        } else {
          // 手动调用弹出 消息信息
          this.$message.error("请正确输入表单");
        }
      });
    },
    updateCaptcha(){
      this.captchaUrl='/captcha?time='+ new Date()
    }
  },
};
</script>

<style>
.loginContainer {
  width: 350px;
  background-clip: padding-box;
  border-radius: 15px;
  margin: 120px auto;
  padding: 15px 35px 15px 35px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.loginTitle {
  text-align: center;
}
</style>