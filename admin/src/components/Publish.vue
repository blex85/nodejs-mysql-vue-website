<template>
  <div class="publish">
    <el-table :data="tableData" style="width: 100%" align="center">
      <el-table-column
        align="center"
        :label="value"
        :prop="attr"
        :min-width="attr == 'title' ? 180 : 100"
        fixed
        v-for="(value, attr, index) in labels"
        :key="index"
      ></el-table-column>
      <el-table-column align="center" min-width="160" fixed="right">
        <template slot-scope="scope">
          <el-button type="info" @click="dialogFormVisible = true">{{btnText}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="tableData[0]">
        <el-form-item
          :label="val"
          label-width="80px"
          v-for="(val, attr) in labels"
          :key="attr"
          :rules="[{required: true, message: `${val}不能为空`}]"
          :prop="attr"
        >
          <el-input
            :disabled="attr == 'cover'"
            v-model="tableData[0][attr]"
            autocomplete="off"
          >{{ attr }}</el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false">确定</el-button>
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button @click="resetDialog">重置</el-button>
      </div>
    </el-dialog>
    <div class="wrapper">
      <el-upload
        class="picture-upload"
        :show-file-list="false"
        ref="upload"
        :auto-upload="false"
        action
        :on-change="handleFileChange"
        :http-request="uploadCompressImage"
      ></el-upload>
      <el-button type="info" @click="handlePreview" class="preview-btn">预览文章</el-button>
      <el-button class="submit-btn" @click="handleSumbit" v-if="!edit" type="primary">发布文章</el-button>
      <el-button class="submit-btn" type="primary" @click="handleSumbit" v-else>修改完成，点击提交</el-button>
      <quill-editor ref="quillEditor" :options="editorOption"></quill-editor>
    </div>
  </div>
</template>
<script>

import { quillEditor } from "vue-quill-editor";
import config from "@/config.js";
import api from "@/api/upload.js";
import { compress } from "@/util/compress.js";
import { debounce } from "@/util/debounce.js";
window.hljs.configure({
  languages: ["javascript", "html", "css"],
  useBR: false
});
window.hljs.initHighlighting();
const toolbarOptions = [
  // toolbar btns
  ["bold", "italic", "underline", "strike", "blockquote", "code-block"], // toggled buttons
  [{ list: "ordered" }, { list: "bullet" }],
  [{ size: [false, "large", "huge"] }], // custom dropdown
  [{ header: [3, 4, false] }],
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }, { align: [] }],
  ["clean", "link", "image"] // add upload image btn
];
export default {
  components: {
    quillEditor
  },
  props: {
    title: String,
    labels: {
      type: Object,
      reqiured: true
    },
    tableData: Array,
    btnText: String,
    edit: Boolean
  },
  data() {
    return {
      quill: null,
      serverUrl: config.serverUrl,
      dialogFormVisible: false,
      editorOption: {
        placeholder: "让你的手动起来吧！！！",
        theme: "snow",
        modules: {
          syntax: true,
          history: {
            delay: 2000
          },
          toolbar: {
            container: toolbarOptions,
            handlers: {
              image: function(value) {
                if (value) {
                  //value->true :表示点击了图片上传选项
                  //触发 el-upload身上的点击上传事件
                  document.querySelector(".picture-upload input").click();
                } else {
                  this.quill.format("image", false);
                }
              }
            }
          }
        }
      }
    };
  },
  mounted() {
    this.init();
  },
  destroyed() {
    this.quill.off("text-change", this.handleTextChange);
  },
  methods: {
    init() {
      this.quill = this.$refs.quillEditor.quill;
      this.handleTextChange = debounce(() => {
        //实现文章内容html的缓存
        sessionStorage.setItem("text", this.quill.root.innerHTML);
      }, 500);
      this.quill.on("text-change", this.handleTextChange);
      //从缓存中提取
      this.quill.root.innerHTML = sessionStorage.getItem("text");
    },
    uploadCompressImage(file) {
      let formData = new FormData();
      file.blob && formData.append("picture", file.blob, file.name);
      api
        .uploadImg(formData)
        .then(res => {
          res.data && this.uploadSuccess(res.data);
        })
        .catch(() => {
          this.$message.error("upload failed");
        });
    },
    handleFileChange(file) {
      let _self = this;
      compress({
        target: file.raw,
        target_size: 450,
        maxWidth: 650,
        maxHeight: 500,
        onSuccess: data => {
          _self.uploadCompressImage(data);
        }
      });
    },
    uploadSuccess(response) {
      //获取光标的位置
      let quill = this.quill;
      let position = quill.getSelection().index;
      //插入img标签到光标显示处
      quill.insertEmbed(
        position,
        "image",
        `${this.serverUrl}/${response.path.replace(/\\/gi, "/")}`
      );
      //光标到最后
      quill.setSelection(position + 1);
    },
    handleSumbit() {
      const data = {},
        regSpecialCharacter = /[^\u4e00-\u9fa5\w]/gim;
      Object.assign(data, this.tableData[0], {
        content: this.$refs.quillEditor.quill.root.innerHTML,
        total_char: this.$refs.quillEditor.quill.root.innerText.replace(
          regSpecialCharacter,
          ""
        ).length
      });
      if (!this.$refs.quillEditor.quill.root.innerText.trim()) {
        return this.$message.error("内容不能为空");
      }
      this.$emit("handleSumbit", data);
    },
    resetDialog() {
      this.$emit("resetDialog");
    },
    handlePreview() {
      this.$store.state.showPreview = true;
      this.$store.state.previewData = sessionStorage.getItem("text");
    }
  }
};
</script>
<style scoped>
.el-button {
  border: none;
}
.submit-btn {
  margin-bottom: 15px;
}
</style>