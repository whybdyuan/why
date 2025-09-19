<template>
  <div class="register-container">
    <div class="register-form-wrapper">
      <div class="register-header">
        <h2>用户注册</h2>
        <p>欢迎加入忆点博客</p>
      </div>

      <form class="register-form">
        <div class="form-group">
          <label for="username">用户名</label>
          <el-input id="username" v-model="form.username" placeholder="请输入用户名" prefix-icon="User"
            :validate-event="false" />
        </div>

        <div class="form-group">
          <label for="name">你的昵称</label>
          <el-input id="name" v-model="form.name" placeholder="请输入真实姓名" prefix-icon="UserFilled"
            :validate-event="false" />
        </div>

        <div class="form-group">
          <label for="password">密码</label>
          <el-input id="password" v-model="form.password" type="password" placeholder="请输入密码" prefix-icon="Lock"
            show-password :validate-event="false" />
        </div>

        <div class="form-group">
          <label for="confirmPassword">确认密码</label>
          <el-input id="confirmPassword" v-model="form.confirmPassword" type="password" placeholder="请再次输入密码"
            prefix-icon="Lock" show-password :validate-event="false" />
        </div>

        <div class="form-group">
          <label for="sex">性别</label>
          <el-radio-group v-model="form.sex" class="sex-group">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </div>

        <div class="form-group">
          <label for="comment">个人简介</label>
          <el-input id="comment" v-model="form.comment" type="textarea" placeholder="请输入个人简介" :rows="3"
            :validate-event="false" />
        </div>

        <el-button type="primary" class="register-button" :loading="loading" @click="handleRegister()">
          注册
        </el-button>

        <div class="login-link">
          <span>已有账号?</span>
          <router-link to="/login">立即登录</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { register } from '@/api/user'
import { useRouter } from 'vue-router'
import { useUserInfo } from '@/store/userInfo.js'

const router = useRouter()
const userInfo = useUserInfo()

// 表单数据
const form = ref({
  username: '',
  name: '',
  password: '',
  confirmPassword: '',
  sex: '男',
  comment: ''
})

// 加载状态
const loading = ref(false)

// 注册方法
async function handleRegister() {
  // 简单的表单验证
  if (!form.value.username.trim()) {
    ElMessage.warning('请输入用户名')
    return
  }

  if (!form.value.name.trim()) {
    ElMessage.warning('请输入姓名')
    return
  }

  if (!form.value.password.trim()) {
    ElMessage.warning('请输入密码')
    return
  }

  if (form.value.password !== form.value.confirmPassword) {
    ElMessage.warning('两次输入的密码不一致')
    return
  }

  if (form.value.password.length < 6) {
    ElMessage.warning('密码长度至少为6位')
    return
  }

  try {
    // 显示加载状态
    loading.value = true

    // 准备注册数据（不包含确认密码字段）
    const registerData = {
      username: form.value.username,
      name: form.value.name,
      password: form.value.password,
      sex: form.value.sex,
      comment: form.value.comment
    }

    // 发送注册请求
    const response = await register(registerData)

    // 注册成功处理
    ElMessage.success('注册成功，请登录！')
    
    // 如果注册成功后API返回了用户信息，也可以更新到store
    if (response.data && response.data.data) {
      Object.assign(userInfo, response.data.data)
    }

    // 跳转到登录页面
    router.push('/login')
  } catch (error) {
    // 错误处理
    console.error('注册失败:', error)
    ElMessage.error('注册失败，请稍后重试')
  } finally {
    // 隐藏加载状态
    loading.value = false
  }
}
</script>

<style scoped>
.register-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.register-form-wrapper {
  width: 400px;
  padding: 40px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.register-header {
  text-align: center;
  margin-bottom: 32px;
}

.register-header h2 {
  margin: 0 0 8px 0;
  font-size: 24px;
  color: #303133;
}

.register-header p {
  margin: 0;
  color: #909399;
  font-size: 14px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #606266;
  font-size: 14px;
}

.sex-group {
  display: flex;
  gap: 20px;
}

.register-button {
  width: 100%;
  margin-bottom: 16px;
}

.login-link {
  text-align: center;
  font-size: 14px;
  color: #606266;
}

.login-link a {
  color: #409eff;
  text-decoration: none;
}

.login-link a:hover {
  color: #66b1ff;
}
</style>