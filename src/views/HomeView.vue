<template>
  <div>
    <div>
      <p style="font-size: 20px; color: #333; font-weight: bold;">
        欢迎您，{{ user.name }}！您的身份是{{ user.role }}。
      </p>
      <p v-if="user.role === 'Student'" style="font-size: 18px; color: #666;">
        您所属的班级是：{{ user.class0 }}。
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}
    };
  }
};
</script>

