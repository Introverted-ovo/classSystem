<template>
  <div id="app">
    <el-container>
      <el-header style="background-color: #7E57C2; height: 150px;"> <!-- 紫色 -->
        <img src="@/assets/jnlogo.png" alt="" style="width: 100px; position: relative; top: 25px;">
        <span style="font-size: 50px; margin-left: 30px; color: white; font-family: SimSun;">高校排课系统</span>

        <el-dropdown style="float: right; height: 60px; margin-top: 100px">
          <span class="el-dropdown-link" style="color: white; font-size: 20px">{{ user.name }}，欢迎你<i class="el-icon-arrow-down el-icon--right"></i></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <div @click="logout()">
                退出登录
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

      </el-header>
    </el-container>

    <el-container>
      <el-aside style="overflow: hidden; min-height: 100vh; background-color: #7E57C2; width: 250px"> <!-- 金色 -->
        <el-menu
            :default-active="$router.path"
            router
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#7E57C2"
            text-color="#fff"
            active-text-color="#ffd04b">
          <el-menu-item index="/home">
            <i class="el-icon-menu"></i>
            <span slot="title">系统首页</span>
          </el-menu-item>

          <el-submenu index="1" v-if="user.role === 'Admin'">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/admin">管理员信息</el-menu-item>
              <el-menu-item index="/teacher">教师信息</el-menu-item>
            </el-menu-item-group>
            <el-menu-item index="/student">学生信息</el-menu-item>
          </el-submenu>

          <el-submenu index="2" v-if="user.role === 'Admin'">
            <template slot="title">
              <i class="el-icon-coin"></i>
              <span>信息管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/course">课程信息</el-menu-item>
              <el-menu-item index="/teacher0">教师信息</el-menu-item>
            </el-menu-item-group>
            <el-menu-item index="/classroom">教室信息</el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-coin"></i>
              <span>排课管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/timetable">课表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

        </el-menu>

      </el-aside>

      <el-main>
        <router-view/><!-- 这个玩意需要挪到main中间 -->
      </el-main>
    </el-container>


  </div>
</template>

<style>
.el-menu{
  border-right: none !important;
}

.el-dropdown-link {
  font-family: "楷体", KaiTi, serif;
}

</style>

<script>
export default {
  name: "SystemView",

  data(){
    return {
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
    }
  },

  methods: {
    logout() {
      localStorage.removeItem("user");
      this.$router.push("/login");
    }
  }
}
</script>

