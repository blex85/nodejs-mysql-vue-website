<template>
  <div class="about">
    <Header :opacity="1" bgc="#fff" />
    <div class="inner">
      <h1 class="cover">关于我</h1>
      <div class="content">
        <p>你好啊，来访的朋友！我是南瓜(Pumpkin)，出于对南瓜这种食物的喜爱，给自己起了这个名字。</p>
        <p>我身高178 || 179 || 180的样子，不过都差不多啦，体重130-135，目标145!</p>
        <p>22岁，大四老油条一枚，不抽烟不喝酒也不蹦迪，</p>
        <p>外冷内热，有时很逗比、有时很安静、有时(用长沙话说就是)"做好事"......</p>
        <p>爱走动，爱搞事情；腰包鼓时，游玩可是说走就走，</p>
        <p>爬过的山有：晚秋的武功山、初冬的衡山、夏天的武当山、有机会要去去玉龙雪山瞅瞅~</p>
        <p>在学校里，常泡图书馆和健身房，健康与学习一个都不能落下。</p>
        <p>挂过科（共计2科，难受~），也逃过课（图书馆敲代码）</p>
        <p>爱看NBA，古装剧，美剧，悬疑推理片，高中前两年曾痴迷于动漫，LOL和篮球，</p>
        <p>到高三，想考大学了便放弃动漫和LOL，脚踝伤了三次后也放弃篮球了。</p>
        <p>饮食中规中距，相对清淡，不油腻也不辛辣，怕起痘...</p>
        <p>爱吃各种水果与蔬菜</p>
        <p>最爱的宠物是：英姿飒爽的狗狗（边牧，哈士奇......</p>
        <p>养过小仓鼠（在宿舍），鱼，王八，狗狗，以后自己再养只🐱猫，哈哈哈~</p>
        <p>食物禁忌：葱× 香菜✓ 蒜子✓ 大蒜× 肥肉× 味精和鸡精× 鸡鱼鸭皮×</p>
        <p>爱听：纯音乐，古风，流行；唱歌老跑调，室友都拿这个开我玩笑emmmm~</p>
        <p>偶像：詹姆斯和彭于晏</p>
        <p>个人网站1.0版本于2020-1-23上线，选择了阿里云服务器，技术栈为vue+express+mysql。</p>
        <p>~加油给力搞事情~</p>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
export default {
  components: {
    Header
  }
};
</script>

<style scoped>
.about {
  padding-top: 50px;
  min-width: 100%;
  min-height: 100vh;
  text-align: center;
}
.about .inner {
  position: relative;
  width: 60%;
  margin: 0 auto;
}
.about .inner .cover {
  height: 200px;
  line-height: 200px;
  position: relative;
  color: #fff;
  font-weight: 500;
  background: url('../assets/image/cover.jpg') center center no-repeat;
  background-size: cover;
}
.about .inner .cover::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.3;
  top: 0;
  left: 0;
}
.about .inner .content {
  font-size: 14px;
  background-color: #fff;
  opacity: 0.8;
}
.about .inner .content p {
  /* padding-top: 12px; */
  line-height: 24px;
  transition: all 0.3s;
}
/* .about .inner .content p:last-child {
  padding-bottom: 10px;
} */
@media screen and (max-width: 768px) {
  .about .inner {
    width: 100%;
  }
  .about .inner .content {
    padding: 8px;
  }
}
</style>