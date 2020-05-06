<template>
  <div style="height: 100%;">
    <el-button-group class="operate-btngroup">
      <!-- <el-button size="small" type="primary" @click="addAccount()" icon="el-icon-circle-plus">添加</el-button> -->
      <ktbutton label="新增模块" perms="System_Module_Add" type="primary" @click="addModule"></ktbutton>
      <ktbutton label="新增目录" perms="System_Module_Add" type="primary"></ktbutton>
      <ktbutton label="新增菜单" perms="System_Module_Add" type="primary"></ktbutton>
    </el-button-group>
    <!-- <div slot="header" class="clearfix" >
          <el-input class="el-search" placeholder="请输入内容" size="small"></el-input>
          <el-button size="small" type="primary" style="margin-left:10px" icon="el-icon-search">查询</el-button>
    </div>-->
    <!-- <el-row>
        <el-col>
          <el-button-group class="operate-btngroup">
            <el-button size="small" type="primary" @click="addMenu()" icon="el-icon-circle-plus">添加菜单</el-button>
            <el-button size="small" type="primary" icon="el-icon-edit" @click="editMenu()">编辑菜单</el-button>
            <el-button size="small" type="primary" icon="el-icon-circle-plus" @click="addOperate()">添加按钮</el-button>
            <el-button size="small" type="primary" icon="el-icon-edit" @click="editOperate()">编辑按钮</el-button>
          </el-button-group>
        </el-col>
    </el-row>-->
    <el-table
      ref="table"
      :data="tree"
      style="width:100%"
      row-key="Name"
      height="95%"
      :tree-props="{ children: 'Children', hasChildren: 'hasChildren' }"
      highlight-current-row
      @row-click="setCurrentRow"
    >
      <el-table-column prop="Name" label="模块名称" align="left" width="250">
        <template slot-scope="scope">
          <i :class="scope.row.Icon"></i>
          <span>{{ scope.row.Name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="Type" label="类型" align="center"></el-table-column>
      <el-table-column prop="VueUri" label="VueUri" align="center"></el-table-column>
      <el-table-column prop="Sort" label="排序" align="center"></el-table-column>
      <el-table-column prop="Remark" label="备注" align="center"></el-table-column>
      <el-table-column prop="IsEnable" label="状态" align="center" width="100">
        <template slot-scope="scope">
          <el-tag size="small" type="success" effect="dark" v-if="scope.row.IsEnable">正常</el-tag>
          <el-tag size="small" type="danger" effect="dark" v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="Id" label="操作" align="center" width="300" fixed="right">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="editUser(scope.row.Id)"
            size="mini"
            v-if="scope.row.Operates"
          >查看操作库</el-button>
          <!-- <el-button type="danger" size="mini">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="模块信息" :visible.sync="moduleDialogVisible" :close-on-click-modal="false">
      <el-form :model="module" ref="module" :rules="moduleRules">
        <el-form-item label="名称" :label-width="formLabelWidth" prop="Name">
          <el-input v-model="module.Name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图标" :label-width="formLabelWidth" prop="Icon">
          <el-input v-model="module.Icon" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Sort" :label-width="formLabelWidth" prop="Sort">
          <el-input v-model="module.Sort" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth" prop="Remark">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="module.Remark"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="IsEnable" :label-width="formLabelWidth" v-if="module.Id">
          <el-switch v-model="module.IsEnable"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="moduleDialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="saveModule('module')" size="mini">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="按钮信息" :visible.sync="operateDialogVisible" :close-on-click-modal="false">
      <el-form :model="operate" ref="operate" :rules="rules">
        <el-form-item label="名称" :label-width="formLabelWidth" prop="Name">
          <el-input v-model="operate.Name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Code" :label-width="formLabelWidth" prop="Code">
          <el-input v-model="operate.Code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图标" :label-width="formLabelWidth" prop="Icon">
          <el-input v-model="operate.Icon" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Controller" :label-width="formLabelWidth" prop="Controller">
          <el-input v-model="operate.Controller" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Action" :label-width="formLabelWidth" prop="Action">
          <el-input v-model="operate.Action" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth" prop="Remark">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="operate.Remark"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="IsEnable" :label-width="formLabelWidth" v-if="operate.Id">
          <el-switch v-model="operate.IsEnable"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="operateDialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="submitForm('operate')" size="mini">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="菜单信息" :visible.sync="menuDialogVisible" :close-on-click-modal="false">
      <el-form :model="menu" ref="menu" :rules="menuRules">
        <el-form-item label="名称" :label-width="formLabelWidth" prop="Name">
          <el-input v-model="menu.Name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图标" :label-width="formLabelWidth" prop="Icon">
          <el-input v-model="menu.Icon" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Controller" :label-width="formLabelWidth" prop="Controller">
          <el-input v-model="menu.Controller" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Action" :label-width="formLabelWidth" prop="Action">
          <el-input v-model="menu.Action" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="VueUrl" :label-width="formLabelWidth" prop="VueUrl">
          <el-input v-model="menu.VueUrl" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth" prop="Remark">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="menu.Remark"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="IsEnable" :label-width="formLabelWidth" v-if="menu.Id">
          <el-switch v-model="menu.IsEnable"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="menuDialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="saveMenu('menu')" size="mini">确 定</el-button>
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
      tree: [],
      module: {},
      menu: {},
      operates: [],
      operate: {},
      currentOperate: {},
      currentMenu: {},
      operateDialogVisible: false,
      moduleDialogVisible: false,
      menuDialogVisible: false,
      formLabelWidth: "120px",
      rules: {
        Name: [{ required: true, message: "请输入按钮名称", trigger: "blur" }],
        Code: [{ required: true, message: "请输入按钮代码", trigger: "blur" }]
      },
      moduleRules: {
        Name: [{ required: true, message: "请输入模块名称", trigger: "blur" }]
      },
      menuRules: {
        Name: [{ required: true, message: "请输入菜单名称", trigger: "blur" }]
      }
    };
  },
  methods: {
    setCurrentRow(row) {
      debugger;
    },
    getModules() {
      this.$api.module.list().then(res => {
        this.tree = res.Data.Tree;
      });
    },
    editModule(id) {
      if (this.$refs["module"]) this.$refs["module"].resetFields();
      this.$api.module.detail(id).then(res => {
        this.module = res.Data;
        this.moduleDialogVisible = true;
      });
    },
    addModule() {
      if (this.$refs["module"]) this.$refs["module"].resetFields();
      this.module = {};
      this.moduleDialogVisible = true;
    },
    saveModule(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var params = this.module;
          this.$api.module.save(params).then(res => {
            this.$message("保存成功");
            this.menuDialogVisible = false;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    addMenu() {
      if (this.$refs["menu"]) this.$refs["menu"].resetFields();
      this.menu = {};
      this.menuDialogVisible = true;
    },
    getOperates(data, node, e) {
      this.currentMenu = data;
      var params = { params: { menuId: this.currentMenu.Id } };
      getOperates(params).then(res => {
        this.operates = res.Data;
      });
    },
    getOperateRow(obj) {
      this.currentOperate = obj;
    },
    editMenu() {
      if (this.$refs["menu"]) this.$refs["menu"].resetFields();
      if (!this.currentMenu.Id) {
        this.$message({
          message: "没有选中菜单项",
          type: "warning"
        });
        return;
      }
      var params = { params: { id: this.currentMenu.Id } };
      var _this = this;
      getMenu(params).then(res => {
        this.menu = res.Data;
        this.menuDialogVisible = true;
      });
    },
    saveMenu(formName) {
      var _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          var params = _this.menu;
          saveMenu(params).then(res => {
            this.$message("保存成功");
            this.menuDialogVisible = false;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    addOperate() {
      if (!this.currentMenu.PId || this.currentMenu.PId == 0) {
        this.$message({
          message: "没有选中一行或者不是菜单项",
          type: "warning"
        });
        return;
      }
      if (this.$refs["operate"]) this.$refs["operate"].resetFields();
      this.operate = {};
      this.operateDialogVisible = true;
    },
    editOperate() {
      if (!this.currentOperate.Id) {
        this.$message({
          message: "没有选中一行",
          type: "warning"
        });
        return;
      }
      if (this.$refs["operate"]) this.$refs["operate"].resetFields();
      var params = { params: { operateId: this.currentOperate.Id } };
      getOperate(params).then(res => {
        this.operate = res.Data;
        this.operateDialogVisible = true;
      });
    },
    submitForm(formName) {
      var _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          _this.operate.MenuId = _this.menu.Id;
          var params = _this.operate;
          saveOperate(params).then(res => {
            this.$message("保存成功");
          });
          this.operateDialogVisible = false;
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
    this.getModules();
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
.box-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.col-operate-container {
  display: flex;
  flex-direction: column;
}
</style>
