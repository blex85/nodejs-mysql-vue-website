<template>
  <div class="category">
    <h1 class="category-header">分类</h1>
    <p class="category-description">目前共计 {{categories_count}} 个分类</p>
    <ol class="category-nav">
      <li class="category-nav-item" v-for="(item, index) in categories" :key="index">
        <router-link :to="{name: 'tag', params: {tag: item.tag}}">
          <span class="category-nav-item-name">{{item.tag}}</span>
          <span class="category-nav-item-count">({{item.count}})</span>
        </router-link>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: 'category',
  props: ['categories_count', 'categories']
};
</script>

<style scoped lang="less">
.category {
  padding: 15px 10px;
  background-color: #fff;
  text-align: center;
  border-radius: 5px;
}
.category .category-header {
  font-size: @font_super_large;
  font-weight: 600;
  color: #333;
}
.category .category-description {
  color: #666;
  padding: 10px 0;
}
.category .category-nav {
  text-align: left;
  padding: 0 10px;
}
.category .category-nav .category-nav-item {
  list-style-type: circle;
  padding: 8px 0;
}
.category .category-nav .category-nav-item .category-nav-item-name {
  color: rgb(153, 47, 9);
}
.category .category-nav .category-nav-item .category-nav-item-name:hover {
  color: #ff4d00;
}

.category .category-nav .category-nav-item .category-nav-item-count {
  color: #ccc;
}
</style>