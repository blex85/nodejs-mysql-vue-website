<template>
  <div class="waterfall-container" ref="waterfall_container">
    <div
      class="waterfall-item"
      :style="{transition: 'all .4s', 'padding': `0 ${gutter/2}px`}"
      ref="waterfall_item"
      v-for="(item, index) in cards"
      :key="index"
    >
      <slot :data="item"></slot>
    </div>
  </div>
</template>
<script>
import { debounce, throttle, addEvent, removeEvent } from "@/lib/tool.js";
export default {
  activated() {
    //解决 失活的瀑布流组件 再次被激活时 定位发生错乱的bug
    this.setPostion();
  },
  name: "waterFall",
  props: {
    gap: {
      type: Number,
      default: 0
    },
    gutter: {
      type: Number,
      default: 32
    },
    cards: {
      type: Array,
      default: () => []
    },
    backgroundColor: {
      type: String,
      default: "#eee"
    }
  },
  data() {
    return {
      screenWidth: document.documentElement.clientWidth, //number
      rowLeftX: [],
      rowHeightArr: [],
      width: 240,
      loadPage: 1,
      canLoad: true,
      handleDebounce: "",
      handleThrottle: ""
    };
  },
  created() {
    let _self = this;
    this.handleDebounce = debounce(function() {
      _self.setPostion();
    }, 550);
    this.handleThrottle = throttle(function() {
      if (_self.isloadedMore()) {
        _self.canLoad = false;
        _self.loadData();
      }
    }, 400);
  },
  mounted() {
    this.init();
  },
  updated() {
    this.setPostion();
  },
  watch: {
    cards: {
      handler() {
        this.canLoad = true;
      },
      immediate: true
    }
  },
  methods: {
    init() {
      addEvent(window, "resize", this.handleDebounce);
      addEvent(window, "scroll", this.handleThrottle);
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
      let imgs =
        this.$refs.waterfall_container &&
        this.$refs.waterfall_container.getElementsByTagName("img");
      let totalCount = imgs && imgs.length,
        count = 0;
      for (let i = 0; i < totalCount; i++) {
        this.preLoadImg(imgs[i], () => {
          count++;
          if (count === totalCount) {
            //所有图片加载完成
            fn(this.$refs.waterfall_item); //表示可以获取包含图片的元素的实际高度
          }
        });
      }
    },
    setPostion() {
      //避免累加
      this.rowHeightArr = [];
      this.rowLeftX = [];
      this.screenWidth = document.documentElement.clientWidth; //获取实时减去滚动条的视口宽度
      const { screenWidth, gutter, rowLeftX, rowHeightArr } = this;
      let oWidth, columns;
      const container = this.$refs.waterfall_container;
      this.preLoadImgs(eleNodeLists => {
        //图片加载完成
        if (eleNodeLists && eleNodeLists.length) {
          oWidth = eleNodeLists[0].offsetWidth;
          columns = Math.floor(screenWidth / oWidth);

          for (let i = 0; i < columns; i++) {
            if (i < columns) {
              //第一行
              rowLeftX.push(i * oWidth);
              if (i == 0 || i == 1) {
                //处理特殊元素
                rowHeightArr.push(this.gap + gutter);
              } else {
                rowHeightArr.push(0);
              }
            }
          }
          eleNodeLists.forEach(item => {
            //遍历所有元素
            //第二行开始，按照指定的规则来排版布局
            //获取上一行高度数组中最矮的那个元素的高度
            const minHeight = Math.min.apply(null, rowHeightArr);
            const minHeightIndex = rowHeightArr.indexOf(minHeight);
            item.style.transform = `translate(${rowLeftX[minHeightIndex]}px, ${minHeight}px)`;
            item.style.opacity = 1;
            rowHeightArr[minHeightIndex] +=
              Math.ceil(item.offsetHeight) + gutter;
          });
        }
        container.style.height = Math.max.apply(null, rowHeightArr) + "px";
        this.$parent.loading_gif = false;
        this.$parent.showQuotation = "visible";
        if (this.isloadedMore()) {
          //防止 刚载入页面时的留白现象
          this.canLoad = false;
          this.loadData();
        }
      });
    },
    isloadedMore() {
      if (this.canLoad) {
        const { rowHeightArr } = this;
        let lastIndex =
          this.$refs.waterfall_item && this.$refs.waterfall_item.length - 1;
        //获取最后一个插入到页面的DOM元素
        const lastDom = this.$refs.waterfall_item[lastIndex];
        const minHeight = Math.min.apply(null, rowHeightArr);
        const lastDomHeight = lastDom && lastDom.offsetHeight;
        if (
          lastDomHeight / 8 + minHeight <
          window.innerHeight +
            document.documentElement.scrollTop +
            document.body.scrollTop
        ) {
          return true;
        }
      }
    },
    loadData() {
      this.loadPage++;
      this.$emit("loadData", this.loadPage);
    }
  },
  destroyed() {
    removeEvent(window, "resize", this.handleDebounce);
    removeEvent(window, "scroll", this.handleThrottle);
  }
};
</script>

<style scoped>
.waterfall-container {
  width: 100%;
  position: relative;
}
.waterfall-item {
  width: 24.9%;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
@media screen and (max-width: 1200px) {
  .waterfall-item {
    width: 33.33% !important;
  }
}
@media screen and (max-width: 992px) {
  .waterfall-item {
    width: 50% !important;
  }
}
@media screen and (max-width: 768px) {
  .waterfall-item {
    width: 100% !important;
  }
}
</style>