<template>
  <div class="search-result-view">
    <!-- 搜索结果列表 -->
    <section class="article-list">
        <div class="search-header">
          <h2 class="search-title">搜索结果："{{ keyword }}"</h2>
          <p class="search-stats">共找到 {{ total }} 条相关结果，用时 {{ searchTime }} 秒</p>
        </div>
        
        <article class="article-item" v-for="article in articles" :key="article.id">
          <div class="article-header">
            <h2 class="article-title"><router-link :to="`/article/${article.id}`" v-html="highlightKeyword(article.title)"></router-link></h2>
            <div class="article-meta">
              <span class="meta-item"><el-icon><Calendar /></el-icon>{{ formatDate(article.createTime) }}</span>
              <span class="meta-item"><el-icon><User /></el-icon>{{ article.author }}</span>
              <span class="meta-item"><el-icon><Folder /></el-icon><a :href="`/category/${article.categoryId}`">{{ article.categoryName }}</a></span>
              <span class="meta-item"><el-icon><View /></el-icon>{{ article.viewCount }} 阅读</span>
              <span class="meta-item"><el-icon><Message /></el-icon>{{ article.commentCount }} 评论</span>
            </div>
          </div>
          <div class="article-content">
            <p v-html="highlightKeyword(article.summary)"></p>
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
import { Calendar, User, Folder, View, Message, ArrowRight } from '@element-plus/icons-vue'
import { RouterLink } from 'vue-router'

export default {
  name: 'SearchResultView',
  components: {
    RouterLink,
    Calendar,
    User,
    Folder,
    View,
    Message,
    ArrowRight
  },
  props: {
    keyword: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const articles = ref([])
    const currentPage = ref(1)
    const pageSize = ref(10)
    const total = ref(0)
    const searchTime = ref(0.12)

    // 格式化日期
    const formatDate = (dateString) => {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date)
    }

    // 高亮关键词
    const highlightKeyword = (text) => {
      if (!props.keyword || !text) return text
      const regex = new RegExp(`(${props.keyword})`, 'gi')
      return text.replace(regex, '<mark class="highlight">$1</mark>')
    }

    // 获取搜索结果
    const fetchSearchResults = async () => {
      try {
        // 模拟数据
        const keyword = props.keyword.toLowerCase()
        const allArticles = Array.from({ length: 50 }, (_, i) => ({
          id: i + 1,
          title: `Vue 3 + Element Plus 开发博客系统的最佳实践（${i + 1}）`,
          summary: `本文介绍了使用 Vue 3 和 Element Plus 开发博客系统的最佳实践，包括项目结构、组件设计、状态管理等方面的内容。${keyword} 相关内容也在本文中有详细介绍。希望对大家有所帮助。`,
          createTime: new Date(Date.now() - i * 86400000).toISOString(),
          author: '技术博主',
          categoryId: Math.floor(i / 10) + 1,
          categoryName: ['前端开发', '后端开发', '移动开发', '人工智能', '技术杂谈'][Math.floor(i / 10)],
          viewCount: Math.floor(Math.random() * 1000),
          commentCount: Math.floor(Math.random() * 50)
        }))
        
        // 简单过滤模拟搜索结果
        const filteredArticles = allArticles.filter(article => 
          article.title.toLowerCase().includes(keyword) || 
          article.summary.toLowerCase().includes(keyword) ||
          article.categoryName.toLowerCase().includes(keyword)
        )
        
        // 分页
        const startIndex = (currentPage.value - 1) * pageSize.value
        const endIndex = startIndex + pageSize.value
        articles.value = filteredArticles.slice(startIndex, endIndex)
        total.value = filteredArticles.length
      } catch (error) {
        console.error('获取搜索结果失败:', error)
      }
    }



    // 分页处理
    const handleSizeChange = (size) => {
      pageSize.value = size
      fetchSearchResults()
    }

    const handleCurrentChange = (current) => {
      currentPage.value = current
      fetchSearchResults()
    }

    onMounted(() => {
      fetchSearchResults()
    })

    return {
      articles,
      currentPage,
      pageSize,
      total,
      searchTime,
      formatDate,
      highlightKeyword,
      handleSizeChange,
      handleCurrentChange
    }
  }
}
</script>

<style scoped>
.search-result-view {
  padding: 20px 0;
}

.article-list {}

.search-header {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.search-title {
  margin: 0 0 5px 0;
  font-size: 24px;
  font-weight: 600;
  color: #303133;
}

.search-stats {
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

.meta-item a {
  color: #409eff;
  text-decoration: none;
}

.meta-item a:hover {
  color: #66b1ff;
}

.article-content {
  margin-bottom: 15px;
  color: #606266;
  line-height: 1.6;
}

.highlight {
  background-color: #fff2e8;
  color: #e6a23c;
  padding: 2px 4px;
  border-radius: 2px;
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


</style>