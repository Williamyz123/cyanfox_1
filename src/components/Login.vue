<template>
  <div class="login-wrap">
    <el-form class="login-container">
      <h1 class="title">用户登录</h1>
      <el-form-item>
        <el-input type="text" placeholder="用户账号" v-model="username" auto-complete="off"></el-input>
        <span>{{msg}}</span>

      </el-form-item>
      <el-form-item>
        <el-input type="password" placeholder="密码" v-model="password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button  class="button" type="primary" @click="doLogin" style="width: 100%;">登录</el-button>
        <el-row style="text-align: center; margin-top: 10px;">
          <!--<el-link type="primary" @click="toRegister">用户注册</el-link>-->
          <!--<el-link type="primary">忘记密码</el-link>-->
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
export default {
  name: 'Login',
  data: function () {
    return {
      username: 'admin',
      password: '123',
      msg: '',
    }
  },
  methods: {
    doLogin: function () {

      if (this.username === 'myz' && this.password === '12345'){
        this.msg = 'xxxx'
        this.$emit('login','111');
      } else {
        this.msg = '用户名或密码错误';
        this.username = '';
        this.password = '';
      }

    },
    toRegister: function () {
      this.$router.push('/Register')
    }
  }
}

</script>

<style scoped>

.login-wrap {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-top: 10%;
  /* background-color: #112346; */
  background-repeat: no-repeat;
  background-position: center right;
  background-size: 100%;
}


.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}

span {
  margin-left: 10px ;
  color: red;
}

.button {
  background-color: #005c30;
}

</style>