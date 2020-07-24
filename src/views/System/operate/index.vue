<template>
  <jyz-container>
    <el-tree node-key="Id" :data="modules" :props="treeProps" @node-click='nodeClick' default-expand-all :expand-on-click-node='false' ref="tree" slot="aside"></el-tree>
    <el-button-group class="operate-btngroup" slot="header">
      <!-- <el-button size="small" type="primary" @click="addAccount()" icon="el-icon-circle-plus">添加</el-button> -->
      <jyz-authorizebtn label="新增功能" code="Add" type="primary" @click="addOperate"></jyz-authorizebtn>
    </el-button-group>
    <el-table ref="table" :data="operates" style="width:100%" row-key="Name" height="100%" highlight-current-row>
      <el-table-column prop="Name" label="名称" align="center"></el-table-column>
      <el-table-column prop="Action" label="Action" align="center"></el-table-column>
      <el-table-column prop="TypeName" label="类型" align="center"></el-table-column>
      <el-table-column prop="Remark" label="备注" align="center"></el-table-column>
      <el-table-column prop="IsEnable" label="状态" align="center" width="100">
        <template slot-scope="scope">
          <el-tag size="mini" type="success" effect="dark" v-if="scope.row.IsEnable">正常</el-tag>
          <el-tag size="mini" type="danger" effect="dark" v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="Id" label="操作" width="300" fixed="right">
        <template slot-scope="scope">
          <jyz-authorizebtn code="Modify" type="primary" icon='el-icon-edit-outline' circle @click="modifyOperate(scope.row.Id)"></jyz-authorizebtn>
          <jyz-authorizebtn code="Disable" type="danger" icon='el-icon-delete' circle v-if="scope.row.IsEnable"></jyz-authorizebtn>
          <jyz-authorizebtn code="Enable" type="Success" icon='el-icon-refresh-left' circle v-else></jyz-authorizebtn>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="功能信息" :visible.sync="operateDialogVisible" :close-on-click-modal="false">
      <el-form :model="operate" ref="operate" :rules="rules">
        <el-form-item label="名称" :label-width="formLabelWidth" prop="Name">
          <el-input v-model="operate.Name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Action" :label-width="formLabelWidth" prop="Action">
          <el-input v-model="operate.Action" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth" prop="Type">
          <el-select v-model="operate.Type" placeholder="请选择">
            <el-option v-for="item in operateTypes" :key="item.Value" :label="item.Name" :value="item.Value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth" prop="Remark">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="operate.Remark"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="IsEnable" :label-width="formLabelWidth" v-if="operate.Id">
          <el-switch v-model="operate.IsEnable"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="operateDialogVisible = false" size="mini">取 消
        </el-button>
        <el-button type="primary" @click="submitForm('operate')" size="mini">确 定</el-button>
      </div>
    </el-dialog>
  </jyz-container>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      modules: [],
      module: '',
      operates: [],
      operate: {},
      operateTypes: [],
      operateDialogVisible: false,
      formLabelWidth: "120px",
      rules: {
        Name: [{ required: true, message: "请输入功能名称", trigger: "blur" }],
        Action: [{ required: true, message: "请输入功能Action", trigger: "blur" }],
        Type: [{ required: true, message: "请选择类型", trigger: "blur" }],
      },
      treeProps: {
        label: 'Name',
        children: 'Children'
      }
    };
  },
  methods: {
    getModules() {
      this.$api.operate.getModules().then(res => {
        this.modules = res.Data;
      })
    },
    getOperateTypes() {
      this.$api.common.getOperateTypes().then(res => {
        this.operateTypes = res.Data;
      })
    },
    getOperates() {
      this.$api.operate.get(this.module.Id).then(res => {
        this.operates = res.Data;
      })
    },
    addOperate() {
      if (!this.module.Id) {
        this.$message({
          message: "请选中菜单",
          type: "warning",
        });
        return;
      }
      if (this.$refs["operate"]) this.$refs["operate"].resetFields();
      this.operate = {};
      this.operateDialogVisible = true;
    },
    modifyOperate(operateId) {
      if (this.$refs["operate"]) this.$refs["operate"].resetFields();
      this.$api.operate.detail(operateId).then((res) => {
        this.operate = res.Data;
        this.operateDialogVisible = true;
      });
    },
    submitForm(formName) {
      var _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          _this.operate.ModuleId = _this.module.Id;
          _this.save();
          _this.operateDialogVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    save() {
      var data = this.operate;
      if (data.Id) {
        this.$api.operate.modify(data).then(res => {
          this.$message({
            showClose: true,
            message: '保存成功',
            type: 'success'
          });
          this.getOperates();
        })
      } else {
        this.$api.operate.add(data).then(res => {
          this.$message({
            showClose: true,
            message: '保存成功',
            type: 'success'
          });
          this.getOperates();
        })
      }
    },
    nodeClick(data, node) {
      if (node.childNodes.length <= 0) {
        this.module = node.data;
        this.getOperates();
      }
      else {
        if (this.module != {})
          this.$refs.tree.setCurrentKey(this.module.Id)
      }
    }
  },
  components: {
  },
  computed: {},
  //实例刚在内存中被创建出来,此时,还没有初始化好 data 和 methods 属性
  beforeCreate() { },
  //实例已经在内存中创建OK,此时 data 和 methods 已经创建OK,此时还没有开始 编译模板
  created() { },
  //此时已经完成了模板的编译,但是还没有挂载到页面中
  beforeMount() { },
  //此时,已经将编译好的模板,挂载到了页面指定的容器中显示
  mounted() {
    this.getModules();
    this.getOperateTypes();
  },
  //状态更新之前执行此函数,此时 data 中的状态值是最新的,但是界面上显示的 数据还是旧的,因为此时还没有开始重新渲染DOM节点
  beforeUpdate() { },
  //实例更新完毕之后调用此函数,此时 data 中的状态值 和 界面上显示的数据,都已经完成了更新,界面已经被重新渲染好了!
  updated() { },
  //Vue实例销毁之前调用.在这一步,Vue实例仍然完全可用
  beforeDestroy() { },
  //Vue实例销毁后调用.调用后,Vue实例指示的所有东西都会解绑定,所有的事件监听器会被移除,所有的子实例也会被销毁
  destroyed() { },
  watch: {},
};
</script>

<style scoped>
.box-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.col-operate-container {
  display: flex;
  flex-direction: column;
}
.btngroup {
  padding: 20px;
}
</style>
