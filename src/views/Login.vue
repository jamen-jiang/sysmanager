<template>
  <div id="login">
    <el-form ref="form" :model="loginForm" class="login-container">
      <h2>系统登录</h2>
      <el-form-item>
        <el-input type="text" v-model="loginForm.userName" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "login",
  props: {},
  data() {
    return {
      loginForm: {
        userName: "admin",
        password: "system"
      }
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    login() {
      let params = {};
      params.UserName = this.loginForm.userName;
      params.PassWord = this.loginForm.password;
      this.$api.passport.login(params).then(res => {
        localStorage.setItem("token", res.Data.Token);
        localStorage.setItem("permission", JSON.stringify(res.Data.Permission));
        this.$router.push("/");
      });
    }
  },
  components: {}
};
</script>

<style scoped lang='less'>
#login {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  min-height: 500px;
}
.login-container {
  width: 250px;
  margin: 0px auto;
  border: 1px solid #ebebeb;
  border-radius: 5px;
  padding: 20px 50px;
}
.login-container button {
  width: 100%;
}
</style>
