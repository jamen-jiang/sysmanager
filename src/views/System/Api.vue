<template>
  <div style="height: 100%;">
    <el-button-group class="operate-btngroup">
      <!-- <el-button size="small" type="primary" @click="addAccount()" icon="el-icon-circle-plus">添加</el-button> -->
      <ktbutton label="新增" perms="System_Api_Add" type="primary"></ktbutton>
    </el-button-group>
    <el-table :data="userList" style="width:100%" row-key="Id" height="95%">
      <el-table-column prop="AssemblyName" label="程序集名称" align="center"></el-table-column>
      <el-table-column prop="ClassName" label="接口名称" align="center"></el-table-column>
      <el-table-column prop="MethodName" label="接口方法名称" align="center"></el-table-column>
      <el-table-column prop="Remark" label="备注" align="center"></el-table-column>
      <el-table-column prop="IsEnable" label="状态" align="center" width="100">
        <template slot-scope="scope">
          <el-tag size="small" type="success" effect="dark" v-if="scope.row.IsEnable">正常</el-tag>
          <el-tag size="small" type="danger" effect="dark" v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="Id" label="操作" align="center" width="300" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" @click="editApi(scope.row.Id)" size="mini">修改</el-button>
          <!-- <el-button type="danger" size="mini">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="接口信息" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form :model="api" ref="api" :rules="rules">
        <el-form-item label="程序集名称" :label-width="formLabelWidth" prop="AssemblyName">
          <el-input v-model="api.AssemblyName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="接口名称" :label-width="formLabelWidth" prop="ClassName">
          <el-input v-model="api.ClassName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="接口方法名称" :label-width="formLabelWidth" prop="MethodName">
          <el-input v-model="api.MethodName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth" prop="Remark">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="api.Remark"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="IsEnable" :label-width="formLabelWidth" v-if="api.Id">
          <el-switch v-model="api.IsEnable"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="submitForm('api')" size="mini">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ktbutton from "@/components/ktbutton";
export default {
  props: {},
  data() {
    return {
      apiList: [],
      api: {},
      dialogFormVisible: false,
      formLabelWidth: "120px",
      rules: {
        Name: [
          { required: true, message: "请输入程序集名称", trigger: "blur" },
          { min: 5, max: 50, message: "长度在 5 到 50 个字符", trigger: "blur" }
        ],
        UserName: [
          { required: true, message: "请输入接口名称", trigger: "blur" },
          { min: 5, max: 50, message: "长度在 5 到 50 个字符", trigger: "blur" }
        ],
        UserName: [
          { required: true, message: "请输入接口方法名称", trigger: "blur" },
          { min: 5, max: 50, message: "长度在 5 到 50 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    getApis() {
      this.$api.api.list().then(res => {
        this.apiList = res.Data.apiList;
      });
    },
    editApi(id) {
      if (this.$refs["api"]) this.$refs["api"].resetFields();
      this.$api.api.detail(id).then(res => {
        this.api = res.Data.Api;
        this.dialogFormVisible = true;
      });
    },
    addApi() {
      if (this.$refs["api"]) this.$refs["api"].resetFields();
      this.api = {};
      this.dialogFormVisible = true;
    },
    saveApi(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var params = this.api;
          this.$api.api.save(params).then(res => {
            this.$message("保存成功");
            this.getApis();
          });
          this.dialogFormVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  components: {
    ktbutton
  },
  computed: {},
  //实例刚在内存中被创建出来,此时,还没有初始化好 data 和 methods 属性
  beforeCreate() {},
  //实例已经在内存中创建OK,此时 data 和 methods 已经创建OK,此时还没有开始 编译模板
  created() {},
  //此时已经完成了模板的编译,但是还没有挂载到页面中
  beforeMount() {},
  //此时,已经将编译好的模板,挂载到了页面指定的容器中显示
  mounted() {
    this.getApis();
  },
  //状态更新之前执行此函数,此时 data 中的状态值是最新的,但是界面上显示的 数据还是旧的,因为此时还没有开始重新渲染DOM节点
  beforeUpdate() {},
  //实例更新完毕之后调用此函数,此时 data 中的状态值 和 界面上显示的数据,都已经完成了更新,界面已经被重新渲染好了!
  updated() {},
  //Vue实例销毁之前调用.在这一步,Vue实例仍然完全可用
  beforeDestroy() {},
  //Vue实例销毁后调用.调用后,Vue实例指示的所有东西都会解绑定,所有的事件监听器会被移除,所有的子实例也会被销毁
  destroyed() {},
  watch: {}
};
</script>

<style scoped>
.el-dialog {
  width: 500px;
}
</style>
