<template>
  <div class="login-container">
    <div class="login-form-wrapper">
      <div class="login-header">
        <h2>欢迎登录</h2>
        <p>忆点博客 - 技术与生活分享的平台</p>
      </div>

      <form class="login-form">
        <div class="form-group">
          <label for="username">用户名</label>
          <el-input id="username" v-model="form.username" placeholder="请输入用户名" prefix-icon="User"
            :validate-event="false" />
        </div>

        <div class="form-group">
          <label for="password">密码</label>
          <el-input id="password" v-model="form.password" type="password" placeholder="请输入密码" prefix-icon="Lock"
            show-password :validate-event="false" />
        </div>

        <div class="form-options">
          <el-checkbox v-model="form.remember">记住我</el-checkbox>
          <a href="#" class="forgot-password">忘记密码?</a>
        </div>

        <el-button type="primary" class="login-button" :loading="loading" @click="handleLogin()">
          登录
        </el-button>

        <div class="register-link">
          <span>还没有账号?</span>
          <router-link to="/register">立即注册</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { login } from '@/api/user'
import { useUserInfo } from '@/store/userInfo.js'
import { useRouter, RouterLink } from 'vue-router'

const router = useRouter()

const userInfo = useUserInfo()

onMounted(() => {
  // 组件挂载时可以从localStorage获取用户信息（如果需要）
  // 这里可以根据实际需求添加逻辑
})

// 表单数据
const form = ref({
  username: '',
  password: '',
  remember: false
})

// 加载状态
const loading = ref(false)

// 登录方法
async function handleLogin() {
  // 简单的表单验证
  if (!form.value.username.trim()) {
    ElMessage.warning('请输入用户名')
    return
  }

  if (!form.value.password.trim()) {
    ElMessage.warning('请输入密码')
    return
  }

  try {
    // 显示加载状态
    loading.value = true

    // 发送登录请求
    const response = await login(form.value)

    // 检查响应数据结构是否正确
    if (response && response.data && response.data && response.data.username) {
      // 登录成功处理
      ElMessage.success(`登录成功，欢迎 ${response.data.name}！`)

      // 保存登录状态到localStorage
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('username', response.data.username)
      localStorage.setItem('token', response.data.token || '')
      localStorage.setItem('name', response.data.name || '')
      localStorage.setItem('sex', response.data.sex || '')
      localStorage.setItem('comment', response.data.comment || '')
      localStorage.setItem('img', response.data?.img || '')

      // 更新用户信息到store
      Object.assign(userInfo, {
        name: response.data.name,
        username: response.data.username,
        sex: response.data.sex || '',
        comment: response.data.comment || '',
        img: response.data?.img || ''
      })

      // 跳转到首页
      router.push('/')
    } else {
      console.log(response.data)
      // 数据结构不正确
      ElMessage.error('登录失败，返回数据格式错误')
    }
  } catch (error) {
    // 错误处理
    console.error('登录失败:', error)
    ElMessage.error('登录失败，请稍后重试')
  } finally {
    // 隐藏加载状态
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.login-form-wrapper {
  width: 400px;
  padding: 40px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.login-header h2 {
  margin: 0 0 8px 0;
  font-size: 24px;
  color: #303133;
}

.login-header p {
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

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  font-size: 14px;
}

.forgot-password {
  color: #409eff;
  text-decoration: none;
  transition: color 0.3s;
}

.forgot-password:hover {
  color: #66b1ff;
}

.login-button {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
}

.register-link {
  text-align: center;
  margin-top: 16px;
  font-size: 14px;
  color: #909399;
}

.register-link a {
  color: #409eff;
  text-decoration: none;
  transition: color 0.3s;
}

.register-link a:hover {
  color: #66b1ff;
}

/* 响应式调整 */
@media (max-width: 500px) {
  .login-form-wrapper {
    width: 90%;
    padding: 30px 20px;
  }
}
</style>