<template>
  <div class="clearfix detail" ref="main">
    <div class="detail-inner fl">
      <img class="heimao-gif" width="50" alt="gif" src="../assets/image/heimao.gif" />
      <div class="post-date">
        <div class="post-month">{{ details.created_at && details.created_at.split('-')[1] }}月</div>
        <div class="post-day">{{ details.created_at && details.created_at.split('-')[2] }}</div>
      </div>
      <div class="post-badge">
        <router-link
          :to="{name: 'tag', params: {tag: details.tag}}"
          class="post-tag"
        >{{details.tag}}</router-link>
      </div>
      <main class="ql-snow">
        <section>
          <h1>{{details.title}}</h1>
          <ul class="post-meta">
            <li class="post-time">Posted on: {{details.created_at}}</li>
            <li class="post-browse">Visited: {{details.browse}}</li>
            <li class="post-words">Words: {{details.total_char}}</li>
          </ul>
          <div class="description">{{ details.description }}</div>
        </section>
        <div ref="detail" v-html="details.content" class="content ql-editor"></div>
        <section class="wrap-comment">
          <Comment :article_title="details.title" />
        </section>
      </main>
    </div>
    <aside class="fr right-catalog">
      <AsideBar>
        <template>
          <ul class="catalog-wrap">
            <h2>文章目录</h2>
            <transition-group appear mode="out-in">
              <li v-for="(item, index) in catalogs" :key="index">
                <a
                  :class="[curIndex == index ? 'active': '']"
                  @click="handleClick(item.top, index)"
                >{{index + 1}}.{{item.text}}</a>
              </li>
            </transition-group>
          </ul>
        </template>
      </AsideBar>
    </aside>
  </div>
</template>

<script>
import AsideBar from '@/components/AsideBar';
import { getArticleDetail, updateBrowse } from '@/api/index.js';
import Comment from '@/components/Comment';
import {
  throttle,
  addEvent,
  removeEvent,
  getElementPosition
} from '@/lib/tool.js';
export default {
  components: {
    AsideBar,
    Comment
  },
  beforeRouteEnter(to, from, next) {
    //请求数据
    getArticleDetail(to.params.articleId).then(res => {
      if (res && res.data) {
        next(vm => vm.setData(res.data));
      }
    });
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      curIndex: null,
      catalogDoms: '',
      details: {},
      catalogs: [],
      stayTime: 0,
      browse: 0,
      second: 0,
      timer: null,
      timerId: null,
      readingTime: 0 //阅读时长，大于该值访问量才会+1
    };
  },
  mounted() {
    this.startCount();
    setTimeout(() => {
      this.$nextTick(() => {
        //只有等到页面的DOM全部加载完毕后在进行DOM的获取与操作
        //setTimeout不能省，它的延迟时间是测试出来的，最好不低于100
        this.init();
      });
    }, 120);
  },
  beforeRouteLeave(to, from, next) {
    if (this.second > this.readingTime) {
      //更新访问量
      updateBrowse(this.$route.params.articleId, {
        browse: this.browse
      });
    }
    next();
  },
  methods: {
    init() {
      this.catalogDoms = Array.from(
        this.$refs.detail.getElementsByTagName('h3')
      );
      this.createCatalog(this.catalogDoms);
      this.handleScroll = throttle(this.onScroll, 45);
      addEvent(window, 'scroll', this.handleScroll);
    },
    createCatalog(arr) {
      //生成文章目录
      this.preLoadImgs(() => {
        arr.forEach(item => {
          let text = item.innerText.trim();

          this.catalogs.push({
            text,
            top: getElementPosition(item).y
          });
        });
      });
    },
    preLoadImg(img, fn) {
      if (img && img.complete) {
        fn(img);
      } else {
        img.onload = () => {
          fn(img);
        };
        img.onerror = () => {
          fn(img);
        };
      }
    },
    preLoadImgs(fn) {
      let imgs = Array.from(this.$refs.detail.getElementsByTagName('img'));
      //当文章内没有图片时，则执行回调函数=>生成目录
      if (imgs && imgs.length == 0) {
        fn();
        return;
      }
      let count = 0,
        totalCount = imgs.length;
      imgs.forEach(item => {
        this.preLoadImg(item, img => {
          // 放大图片事件
          img.style.cursor = 'zoom-in';
          addEvent(
            img,
            'click',
            () => {
              this.dialogVisible = true;
              this.dialogImageUrl = img.src;
            },
            false
          );
          count++;
          if (count === totalCount) {
            //所有图片加载完成
            //表示可以获取包含图片的元素的实际高度
            fn();
            imgs = null;
          }
        });
      });
    },
    scrollAnimate(end) {
      let k = 4;
      let speed_ms = 30;
      let scroll_top = document.scrollingElement.scrollTop;
      let scrollInterval = null;
      if (scroll_top !== end) {
        clearInterval(scrollInterval);
        scrollInterval = setInterval(function() {
          let speed = (end - scroll_top) / k;
          speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
          scroll_top += speed;
          document.scrollingElement.scrollTop = scroll_top;
          if (Math.abs(end - scroll_top) <= Math.abs(speed)) {
            document.scrollingElement.scrollTop = end;
            clearInterval(scrollInterval);
          }
        }, speed_ms);
      }
    },
    onScroll() {
      //实现目录导航滚动效果
      let len = this.catalogs.length;
      // 100为预留距离
      if (len <= 0) return;
      if (document.scrollingElement.scrollTop + 100 < this.catalogs[0].top) {
        this.curIndex = null;
        return;
      }
      this.catalogs.forEach((item, index) => {
        if (document.scrollingElement.scrollTop + 100 >= item.top) {
          this.curIndex = index;
        }
      });
    },
    handleClick(end, index) {
      //实现目录导航点击动画效果
      this.curIndex = index;
      this.scrollAnimate(end);
    },
    startCount() {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.second++;
        if (this.second > this.readingTime) {
          clearInterval(this.timer);
          this.browse++; //访问量+1
        }
      }, 1000);
    },
    setData(data) {
      this.details = data;
      this.readingTime = Math.floor(data.total_char / 40);
      this.browse = data.browse;
    },
    destroyed() {
      removeEvent(window, 'scroll', this.handleScroll);
    }
  }
};
</script>

<style scoped lang="less">
.detail {
  position: relative;
}
.detail img.heimao-gif {
  position: absolute;
  top: 120px;
  right: -32px;
  z-index: 1;
}
.detail-inner {
  padding: 20px 30px;
  width: 70%;
  background: rgba(255,255,255,.9);
  position: relative;
  box-shadow: 0 0 40px #dcdbff;
}
.detail-inner main h1 {
  width: 100%;
  font-size: @font_super_large;
  text-align: center;
}
.detail .detail-inner .ql-snow img {
  display: block;
  margin: 3px 0;
  max-width: 100%;
  min-width: 80%;
}
.detail-inner main .content {
  margin: 30px 0;
  line-height: 15px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
  font-size: @font_medium_s;
  overflow: hidden;
}
.detail-inner main .description {
  color: #3a3a3a;
  font-weight: 400;
  line-height: 15px;
  word-break: break-all;
}
.right-catalog {
  position: sticky;
  top: 40px;
  width: 25%;
}
.right-catalog .catalog-wrap {
  text-align: left;
}
.right-catalog .catalog-wrap h2 {
  font-size: @font_large;
  color: #555;
  padding-bottom: 12px;
  padding-top: 5px;
  text-align: center;
}
.right-catalog .catalog-wrap li {
  padding: 4px 0;
}
.right-catalog .catalog-wrap li a {
  width: 100%;
  transition: color 0.3s;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.right-catalog .catalog-wrap li a.active {
  color: #ff8a00;
}
.right-catalog .catalog-wrap li a:hover {
  color: #ff8a00;
}
@media screen and (max-width: 768px) {
  .detail-inner main h1 {
    width: 100%;
    margin-right: 0;
    margin-bottom: 10px;
    text-align: center;
  }
  .detail-inner {
    width: 100%;
    padding: 20px 0;
  }
  .detail img.heimao-gif {
    display: none;
  }
  .detail-inner main .content,
  .detail-inner main .description,
  .wrap-comment {
    padding: 0 10px;
    font-size: @font_small;
  }
  .right-catalog {
    display: none;
  }
}
</style>
