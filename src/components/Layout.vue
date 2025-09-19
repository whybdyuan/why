<template>
  <div class="app-layout">
    <!-- 顶部导航 -->
    <header class="top-header">
      <div class="header-content">
        <h1 class="logo"><a href="/">博客系统</a></h1>
        <nav class="nav">
          <ul class="nav-list">
            <li class="nav-item"><a href="/" class="nav-link" :class="{ active: $route.path === '/' }">首页</a></li>
            <li class="nav-item" v-for="category in categories" :key="category.id">
              <a :href="`/category/${category.id}`" class="nav-link" :class="{ active: $route.path === `/category/${category.id}` }">
                {{ category.name }}
              </a>
            </li>
          </ul>
        </nav>
        <div class="search-box">
          <el-input v-model="searchKeyword" placeholder="搜索文章" prefix-icon="Search" @keyup.enter="handleSearch" />
        </div>
        <!-- 登录/退出登录按钮 -->
        <div class="user-actions">
          <el-button v-if="!isLoggedIn" @click="handleLogin" type="primary" :icon="User">
            登录
          </el-button>
          <el-button v-else @click="handleLogout" type="default">
            退出登录 ({{ username }})
          </el-button>
        </div>
      </div>
    </header>

    <!-- 主体内容区域 -->
    <div class="main-layout">
      <!-- 左侧边栏 -->
      <aside class="left-sidebar">
        <!-- 关于博主 -->
        <div class="sidebar-card about">
          <h3 class="sidebar-title">关于博主</h3>
          <div class="about-content">
              <img src="https://picsum.photos/id/237/100/100" alt="博主头像" class="avatar">
              <p class="author-desc">热爱技术分享的程序员，致力于传播前端知识。</p>
            <div class="social-links">
              <a href="#" class="social-link">GitHub</a>
            </div>
          </div>
        </div>

        <!-- 热门文章 -->
        <div class="sidebar-card hot-articles">
          <h3 class="sidebar-title">热门文章</h3>
          <ul class="hot-articles-list">
            <li v-for="hot in hotArticles" :key="hot.id">
              <a :href="`/article/${hot.id}`" class="hot-article-link">
                <span class="hot-rank">{{ hot.rank }}</span>
                <span class="hot-title">{{ hot.title }}</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- 标签云 -->
        <div class="sidebar-card tags">
          <h3 class="sidebar-title">标签云</h3>
          <div class="tags-cloud">
            <a v-for="tag in tags" :key="tag.id" :href="`/search/${tag.name}`" class="tag-item">
              {{ tag.name }} ({{ tag.count }})
            </a>
          </div>
        </div>
      </aside>

      <!-- 右侧主内容 -->
      <main class="right-content">
        <router-view />
      </main>
    </div>

    <!-- 底部 -->
    <footer class="app-footer">
      <div class="footer-content">
        <p class="copyright">© 2024 博客系统 版权所有</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { Search, User } from '@element-plus/icons-vue'
import { ElButton, ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import 'element-plus/es/components/input/style/css'
import 'element-plus/es/components/button/style/css'
import 'element-plus/es/components/message/style/css'

export default {
  name: 'Layout',
  components: {
    Search,
    ElButton,
    ElMessage
  },
  setup() {
    const router = useRouter()
    const searchKeyword = ref('')
    const isLoggedIn = ref(false) // 登录状态
    const username = ref('') // 用户名
    const categories = ref([
      { id: 1, name: '前端开发' },
      { id: 2, name: '后端开发' },
      { id: 3, name: '数据库' },
      { id: 4, name: '算法' },
      { id: 5, name: '工具' }
    ])
    const hotArticles = ref([
      { id: 1, rank: 1, title: 'Vue 3 组合式API详解' },
      { id: 2, rank: 2, title: 'React Hooks 最佳实践' },
      { id: 3, rank: 3, title: 'TypeScript 高级类型' },
      { id: 4, rank: 4, title: 'CSS Grid 布局完全指南' },
      { id: 5, rank: 5, title: 'JavaScript 异步编程模式' }
    ])
    const tags = ref([
      { id: 1, name: 'Vue.js', count: 25 },
      { id: 2, name: 'React', count: 20 },
      { id: 3, name: 'TypeScript', count: 18 },
      { id: 4, name: 'CSS', count: 15 },
      { id: 5, name: 'JavaScript', count: 30 },
      { id: 6, name: 'Node.js', count: 12 },
      { id: 7, name: 'Webpack', count: 8 },
      { id: 8, name: 'Vite', count: 6 }
    ])

    const handleSearch = () => {
      if (searchKeyword.value.trim()) {
        window.location.href = `/search/${encodeURIComponent(searchKeyword.value.trim())}`
      }
    }

    // 跳转到登录页面
    const handleLogin = () => {
      router.push('/login')
    }

    // 模拟退出登录功能
    const handleLogout = () => {
      username.value = ''
      isLoggedIn.value = false
      ElMessage.info('已退出登录')
    }

    return {
      searchKeyword,
      categories,
      hotArticles,
      tags,
      isLoggedIn,
      username,
      handleSearch,
      handleLogin,
      handleLogout
    }
  }
}
</script>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* 顶部导航 */
.top-header {
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}

.logo a {
  color: #303133;
  text-decoration: none;
}

.nav {
  flex: 1;
  margin: 0 40px;
}

.nav-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin-right: 30px;
}

.nav-link {
  display: flex;
  align-items: center;
  color: #606266;
  text-decoration: none;
  font-size: 16px;
  padding: 5px 0;
  position: relative;
}

.nav-link:hover {
  color: #409eff;
}

.nav-link.active {
  color: #409eff;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #409eff;
}

.nav-link el-icon {
  margin-right: 6px;
  font-size: 14px;
}

.search-box {
  width: 200px;
}

.user-actions {
  margin-left: 15px;
}

/* 主体布局 */
.main-layout {
  display: flex;
  max-width: 1400px;
  margin: 100px auto 0;
  flex: 1;
  padding: 20px;
  gap: 20px;
}

/* 左侧边栏 */
.left-sidebar {
  width: 280px;
  flex-shrink: 0;
}

.sidebar-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.sidebar-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ebeef5;
  display: flex;
  align-items: center;
}

.sidebar-title el-icon {
  margin-right: 8px;
  color: #409eff;
}

/* 关于博主 */
.about-content {
  text-align: center;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 0 auto 12px;
  display: block;
}

.social-links {
  margin-top: 12px;
}

.social-link {
  display: inline-flex;
  align-items: center;
  padding: 6px 16px;
  background-color: #f5f7fa;
  color: #606266;
  border-radius: 20px;
  text-decoration: none;
  transition: all 0.3s;
}

.social-link:hover {
  background-color: #e4e7ed;
  color: #409eff;
}

.social-link el-icon {
  margin-right: 6px;
}

.author-desc {
  color: #606266;
  line-height: 1.6;
  margin: 0;
  text-align: left;
  text-indent: 2em;
}

/* 热门文章 */
.hot-articles-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.hot-articles-list li {
  margin-bottom: 12px;
}

.hot-article-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #606266;
  transition: all 0.3s;
}

.hot-article-link:hover {
  color: #409eff;
}

.hot-title {
  display: flex;
  align-items: center;
}

.hot-title el-icon {
  margin-right: 6px;
  color: #909399;
  font-size: 12px;
}

.hot-rank {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background-color: #f0f2f5;
  border-radius: 4px;
  margin-right: 10px;
  font-size: 14px;
  font-weight: 500;
}

.hot-articles-list li:nth-child(1) .hot-rank,
.hot-articles-list li:nth-child(2) .hot-rank,
.hot-articles-list li:nth-child(3) .hot-rank {
  background-color: #f56c6c;
  color: #fff;
}

.hot-title {
  flex: 1;
  font-size: 14px;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 标签云 */
.tags-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-item {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  background-color: #f0f2f5;
  border-radius: 16px;
  color: #606266;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.3s;
}

.tag-item:hover {
  background-color: #409eff;
  color: #fff;
}

.tag-item el-icon {
  margin-right: 4px;
  font-size: 12px;
}

/* 右侧主内容 */
.right-content {
  flex: 1;
  min-width: 0;
}

/* 底部 */
.app-footer {
  background-color: #fff;
  border-top: 1px solid #ebeef5;
  padding: 20px 0;
  margin-top: 40px;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
}

.copyright {
  color: #909399;
  font-size: 14px;
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .main-layout {
    flex-direction: column;
  }
  
  .left-sidebar {
    width: 100%;
    order: 2;
  }
  
  .right-content {
    order: 1;
  }
  
  .sidebar-card.tags,
  .sidebar-card.hot-articles {
    display: inline-block;
    width: calc(50% - 10px);
    vertical-align: top;
  }
  
  .sidebar-card.tags {
    margin-right: 20px;
  }
}

@media (max-width: 768px) {
  .header-content {
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .logo {
    font-size: 20px;
  }
  
  .nav {
    margin: 10px 0;
    width: 100%;
  }
  
  .nav-list {
    overflow-x: auto;
    padding-bottom: 5px;
  }
  
  .nav-item {
    margin-right: 20px;
  }
  
  .search-box {
    width: 100%;
  }
  
  .sidebar-card.tags,
  .sidebar-card.hot-articles {
    width: 100%;
    margin-right: 0;
  }
}
</style>