<template>
  <div class="reply-list">
    <List
      :labels="labels"
      :tableData="tableData"
      :amount="amount"
      :pageSize="pageSize"
      :pageBtns="pageBtns"
      @getCurrentItem="getCurrentItem"
    >
      <template slot="only" slot-scope="{scopeProp}">
        <el-button type="danger" @click="handleDelete(scopeProp.$index, scopeProp.row)">删除</el-button>
      </template>
    </List>
  </div>
</template>

<script>
import api from '@/api/reply.js';
import List from '@/components/List';
export default {
  created() {
    api
      .getReplyAll()
      .then(res => {
        if (res.data && res.data.data) {
          this.tableData = res.data.data;
          this.amount = res.data.meta.count;
          this.pageSize = res.data.meta.pageSize;
          this.cacheData.set(1, res.data.data); //缓存第一页数据 {1 => [...]}
        }
      })
  },
  components: {
    List
  },
  data() {
    return {
      search: '',
      tableData: [],
      cacheData: new Map(), //缓存条目数据
      amount: 0, //总条数-
      pageSize: 5, //每页的条数
      pageBtns: 5, //页码按钮显示数量
      labels: {
        created_at: '日期',
        id: 'id',
        name: '名字',
        content: '回复内容',
      },
      curPage: 1
    };
  },
  methods: {
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该评论, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          api.deleteReply(row.id).then(res => {
            if (res.data && res.data.success) {
              this.$message.success(res.data.msg);
              this.tableData.splice(index, 1); //删除纪录
              this.amount--;
            }
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    getCurrentItem(page) {
      //获取当前页的数据
      this.curPage = page;
      if (this.cacheData.has(page)) {
        //若是已经缓存数据了则不必发送网络请求
        this.tableData = this.cacheData.get(page); //从缓存中取数据
        return;
      }
      api
        .getReplyAll({ page })
        .then(res => {
          if (res.data && res.data.data) {
            this.tableData = res.data.data; //更新显示数据
            this.cacheData.set(page, res.data.data); //缓存每次获取到的数据
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
