<template>
  <div class="category-view">
    <!-- 左侧文章列表 -->
    <section class="article-list">
        <div class="category-header">
          <h2 class="category-title">分类：{{ currentCategory.name }}</h2>
          <p class="category-desc">共 {{ total }} 篇文章</p>
        </div>
        
        <article class="article-item" v-for="article in articles" :key="article.id">
          <div class="article-header">
            <h2 class="article-title"><router-link :to="`/article/${article.id}`">{{ article.title }}</router-link></h2>
            <div class="article-meta">
              <span class="meta-item"><el-icon><Calendar /></el-icon>{{ formatDate(article.createTime) }}</span>
              <span class="meta-item"><el-icon><User /></el-icon>{{ article.author }}</span>
              <span class="meta-item"><el-icon><View /></el-icon>{{ article.viewCount }} 阅读</span>
              <span class="meta-item"><el-icon><Message /></el-icon>{{ article.commentCount }} 评论</span>
            </div>
          </div>
          <div class="article-content">
            <p>{{ article.summary }}</p>
          </div>
          <div class="article-footer">
            <router-link :to="`/article/${article.id}`" class="read-more">阅读全文 <el-icon><ArrowRight /></el-icon></router-link>
          </div>
        </article>

        <!-- 分页 -->
        <div class="pagination">
          <el-pagination
            v-model:current-page="currentPage"
            :page-sizes="[5, 10, 20, 50]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </section>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { Calendar, User, View, Message, ArrowRight } from '@element-plus/icons-vue'
import { RouterLink } from 'vue-router'

export default {
  name: 'CategoryView',
  components: {
    Calendar,
    RouterLink,
    User,
    View,
    Message,
    ArrowRight
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const articles = ref([])
    const categories = ref([])
    const currentCategory = ref({ id: '', name: '' })
    const currentPage = ref(1)
    const pageSize = ref(10)
    const total = ref(0)

    // 格式化日期
    const formatDate = (dateString) => {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date)
    }

    // 获取文章列表
    const fetchArticles = async () => {
      try {
        // 模拟数据
        articles.value = Array.from({ length: 10 }, (_, i) => ({
          id: i + 1,
          title: `${currentCategory.value.name}相关：Vue 3 + Element Plus 开发博客系统的最佳实践（${i + 1}）`,
          summary: '本文介绍了使用 Vue 3 和 Element Plus 开发博客系统的最佳实践，包括项目结构、组件设计、状态管理等方面的内容。希望对大家有所帮助。',
          createTime: new Date(Date.now() - i * 86400000).toISOString(),
          author: '技术博主',
          viewCount: Math.floor(Math.random() * 1000),
          commentCount: Math.floor(Math.random() * 50)
        }))
        total.value = 100
      } catch (error) {
        console.error('获取文章列表失败:', error)
      }
    }

    // 获取分类列表
    const fetchCategories = async () => {
      try {
        // 模拟数据
        categories.value = [
          { id: 1, name: '前端开发', count: 128 },
          { id: 2, name: '后端开发', count: 95 },
          { id: 3, name: '移动开发', count: 76 },
          { id: 4, name: '人工智能', count: 62 }
        ]
        
        // 设置当前分类
        currentCategory.value = categories.value.find(cat => cat.id === parseInt(props.id)) || {
          id: props.id,
          name: '未分类'
        }
      } catch (error) {
        console.error('获取分类列表失败:', error)
      }
    }



    // 分页处理
    const handleSizeChange = (size) => {
      pageSize.value = size
      fetchArticles()
    }

    const handleCurrentChange = (current) => {
      currentPage.value = current
      fetchArticles()
    }

    onMounted(() => {
      fetchCategories()
      fetchArticles()
    })

    return {
      articles,
      categories,
      currentCategory,
      currentPage,
      pageSize,
      total,
      formatDate,
      handleSizeChange,
      handleCurrentChange
    }
  }
}
</script>

<style scoped>
.category-view {
  padding: 20px 0;
}

.article-list {}

.category-header {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.category-title {
  margin: 0 0 5px 0;
  font-size: 24px;
  font-weight: 600;
  color: #303133;
}

.category-desc {
  margin: 0;
  color: #909399;
  font-size: 14px;
}

.article-item {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s, box-shadow 0.3s;
}

.article-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.article-title {
  margin: 0 0 10px 0;
  font-size: 20px;
  font-weight: 600;
}

.article-title a {
  color: #303133;
  text-decoration: none;
  transition: color 0.3s;
}

.article-title a:hover {
  color: #409eff;
}

.article-meta {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
  font-size: 14px;
  color: #909399;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.article-content {
  margin-bottom: 15px;
  color: #606266;
  line-height: 1.6;
}

.read-more {
  color: #409eff;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  transition: color 0.3s;
}

.read-more:hover {
  color: #66b1ff;
}

.pagination {
  margin-top: 30px;
  text-align: center;
}



@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
  }
  
  .nav-list {
    display: none;
  }
  
  .search-box {
    width: 150px;
  }
}
</style>