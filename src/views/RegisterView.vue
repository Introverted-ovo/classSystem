<template>
  <div :xl="6" :lg="7" style="background: linear-gradient(45deg ,#8e44ad, #87739a)">
    <!--logo-->
    <el-image :src="require('@/assets/jnlogo.png')" class="logo"/>
    <!--标题-->
    <el-row type="flex" class="row-bg row-two" justify="center" align="middle">
      <el-col :span="6"></el-col>
      <el-col :span="6">
        <!--标题-->
        <h1 class="title">注册页面</h1>
      </el-col>
      <el-col :span="6"></el-col>
    </el-row>
    <!--form表单-->
    <el-row type="flex" class="row-bg card" justify="center" align="bottom">
      <el-col :span="7" class="login-card">
        <!--loginForm-->
        <el-form :model="admin" :rules="rules" ref="loginForm" label-width="21%" class="loginForm">
          <el-form-item label="账户" prop="username" style="width: 380px">
            <el-input v-model="admin.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" style="width: 380px">
            <el-input type="password" v-model="admin.password"></el-input>
          </el-form-item>
          <el-form-item label="身份" prop="role" style="width: 380px">
            <el-select v-model="admin.role" placeholder="请选择身份">
              <el-option label="学生" value="Student"></el-option>
              <el-option label="教师" value="Teacher"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="btn-ground">
            <el-button type="primary" @click="register()">立即注册</el-button>
            <el-button @click="resetForm()">重置</el-button>
            <el-button @click="toLink()">返回登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "Register",
  data() {
    return {
      // 表单信息
      admin: {},
    };
  },
  methods: {

    toLink() {
      this.$router.push('/login');
    },

    register(){
      request.post("/admin/register", this.admin).then(res => {
        if(res.code === '0'){
          this.$message({
            message: '注册成功！',
            type: 'success'
          });
          this.$router.push("/login");
        } else {
          this.$message.error(res.msg);
        }
      })
    },
    // 重置表单
    resetForm() {
      this.admin.name = "";
      this.admin.password = "";
    }
  },
}
</script>

<style scoped>

.btn-ground {
  text-align: center;
}

.logo {
  margin: 30px;
  height: 70px;
  width: 70px;
  position: fixed;
}

.title {
  text-shadow: -3px 3px 1px #5f565e;
  text-align: center;
  margin-top: 60%;
  color: #41b9a6;
  font-size: 40px;
}

.login-card {
  background-color: #ffffff;
  opacity: 0.9;
  box-shadow: 0 0 20px #ffffff;
  border-radius: 10px;
  padding: 40px 40px 30px 15px;
  width: auto;
}
</style>
