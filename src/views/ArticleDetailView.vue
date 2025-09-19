<template>
  <div class="article-detail-container">
    <article class="article-detail">
      <h1 class="article-title">{{ article.title }}</h1>
      
      <div class="article-meta">
        <span class="meta-item">
          <el-icon><User /></el-icon>
          {{ article.author }}
        </span>
        <span class="meta-item">
          <el-icon><Calendar /></el-icon>
          {{ formatDate(article.createTime) }}
        </span>
        <span class="meta-item">
          <el-icon><View /></el-icon>
          {{ article.viewCount }} 阅读
        </span>
        <span class="meta-item">
          <el-icon><Message /></el-icon>
          {{ article.commentCount }} 评论
        </span>
      </div>
      
      <div class="article-tags">
        <span class="tag-label">标签：</span>
        <router-link v-for="tag in article.tags" :key="tag.id" :to="`/tag/${tag.id}`" class="tag-item">
          {{ tag.name }}
        </router-link>
      </div>
      
      <div class="article-content" v-html="article.content"></div>
      
      <div class="article-actions">
        <el-button @click="handleLike" :type="isLiked ? 'primary' : 'default'" :icon="Star" :icon-class="isLiked ? 'is-liked' : ''">
          {{ isLiked ? '已点赞' : '点赞' }} ({{ article.likeCount }})
        </el-button>
        <el-button @click="handleShare" type="default" :icon="Share">
          分享
        </el-button>
      </div>
    </article>
    
    <!-- 作者信息 -->
    <div class="author-info">
      <img :src="article.authorAvatar" alt="作者头像" class="author-avatar">
      <div class="author-details">
        <h3 class="author-name">{{ article.author }}</h3>
        <p class="author-bio">{{ article.authorBio }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { User, Calendar, View, Message, Star, Share } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

export default {
  name: 'ArticleDetailView',
  components: {
    User,
    Calendar,
    View,
    Message,
    Star,
    Share
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const router = useRouter();
    const article = ref({
      id: '',
      title: '',
      author: '',
      authorAvatar: '',
      authorBio: '',
      createTime: '',
      content: '',
      viewCount: 0,
      likeCount: 0,
      commentCount: 0,
      tags: []
    });
    const isLiked = ref(false);
    
    // 格式化日期
    const formatDate = (dateString) => {
      // 检查日期字符串是否有效
      if (!dateString) return '';
      
      const date = new Date(dateString);
      // 检查是否是有效日期
      if (isNaN(date.getTime())) return '';
      
      return new Intl.DateTimeFormat('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
    };
    
    // 模拟获取文章数据
    const fetchArticleData = async () => {
      try {
        // 在实际应用中，这里会调用API获取文章数据
        // 这里使用模拟数据
        console.log('获取文章数据，文章ID:', props.id);
        
        // 模拟网络延迟
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // 模拟数据
        article.value = {
          id: props.id,
          title: `Vue 3 项目实战：博客系统的设计与实现 ${props.id}`,
          author: '技术博主',
          authorAvatar: 'https://picsum.photos/id/1005/200/200',
          authorBio: '专注于前端技术分享，热爱 Vue.js、React 等现代前端框架。',
          createTime: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
          content: `
            <h2>项目初始化</h2>
            <p>在开始任何项目之前，我们需要进行项目的初始化工作。Vue 3 提供了官方的脚手架工具 Vite，可以快速创建一个基于 Vue 3 的项目。</p>
            <pre><code>npm create vite@latest . -- --template vue</code></pre>
            
            <h2>安装依赖</h2>
            <p>项目初始化完成后，我们需要安装一些必要的依赖包，包括 Element Plus 组件库、Vue Router 路由管理等。</p>
            <pre><code>npm install element-plus vue-router axios</code></pre>
            
            <h2>项目结构设计</h2>
            <p>一个良好的项目结构可以提高开发效率，便于后期维护。以下是我们的博客系统的项目结构：</p>
            <ul>
              <li><strong>src/views/</strong> - 存放页面组件</li>
              <li><strong>src/components/</strong> - 存放可复用的组件</li>
              <li><strong>src/router/</strong> - 路由配置</li>
              <li><strong>src/api/</strong> - API 请求封装</li>
            </ul>
          `,
          viewCount: Math.floor(Math.random() * 1000),
          likeCount: Math.floor(Math.random() * 100),
          commentCount: Math.floor(Math.random() * 50),
          tags: [
            { id: '1', name: 'Vue 3' },
            { id: '2', name: '前端开发' },
            { id: '3', name: '项目实战' }
          ]
        };
        
        // 模拟增加阅读量
        article.value.viewCount++;
      } catch (error) {
        console.error('获取文章数据失败:', error);
        // 在实际应用中，这里应该显示错误提示
      }
    };
    
    // 处理点赞
    const handleLike = () => {
      if (isLiked.value) {
        article.value.likeCount--;
      } else {
        article.value.likeCount++;
      }
      isLiked.value = !isLiked.value;
    };
    
    // 处理分享
    const handleShare = () => {
      // 在实际应用中，这里会实现分享功能
      alert('分享功能已触发');
    };
    
    // 组件挂载时获取数据
    onMounted(() => {
      fetchArticleData();
    });
    
    return {
      article,
      isLiked,
      formatDate,
      handleLike,
      handleShare
    };
  }
};
</script>

<style scoped>
.article-detail-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.article-detail {
  background-color: #fff;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.article-title {
  margin: 0 0 20px 0;
  font-size: 28px;
  font-weight: 600;
  color: #303133;
  line-height: 1.4;
}

.article-meta {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  font-size: 14px;
  color: #909399;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.article-tags {
  margin-bottom: 25px;
  padding-bottom: 25px;
  border-bottom: 1px solid #e4e7ed;
}

.tag-label {
  color: #606266;
  font-size: 14px;
}

.tag-item {
  display: inline-block;
  margin-left: 10px;
  padding: 4px 12px;
  background-color: #f0f2f5;
  color: #606266;
  text-decoration: none;
  border-radius: 16px;
  font-size: 14px;
  transition: all 0.3s;
}

.tag-item:hover {
  background-color: #409eff;
  color: #fff;
}

.article-content {
  margin-bottom: 30px;
  color: #303133;
  line-height: 1.8;
  font-size: 16px;
}

.article-content h2 {
  margin: 30px 0 15px 0;
  font-size: 22px;
  font-weight: 600;
  color: #303133;
}

.article-content p {
  margin: 15px 0;
}

.article-content pre {
  background-color: #f8f8f8;
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
  margin: 15px 0;
}

.article-content code {
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 14px;
  color: #e96900;
}

.article-content ul {
  margin: 15px 0;
  padding-left: 20px;
}

.article-content li {
  margin: 8px 0;
}

.article-actions {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.is-liked {
  color: #f56c6c;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.author-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid #fff;
}

.author-details {
  flex: 1;
}

.author-name {
  margin: 0 0 10px 0;
  font-size: 18px;
  font-weight: 600;
  color: #303133;
}

.author-bio {
  margin: 0;
  font-size: 14px;
  color: #606266;
  line-height: 1.5;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .article-detail {
    padding: 20px;
  }
  
  .article-title {
    font-size: 24px;
  }
  
  .article-meta {
    gap: 15px;
  }
  
  .author-info {
    flex-direction: column;
    text-align: center;
  }
}
</style>