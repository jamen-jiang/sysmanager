<template>
  <el-card class="main-container" body-style="height: 100%;display:flex;flex-direction:column;">
    <el-row>
      <el-col>
        <el-button-group class="operate-btngroup">
          <el-button size="small" type="primary" @click="addRole()" icon="el-icon-circle-plus">添加</el-button>
        </el-button-group>
      </el-col>
    </el-row>
    <el-row class="main-container-content">
      <el-col class="main-container-content-col">
        <el-table :data="roles" style="width:100%" row-key="Id" height="99%">
          <el-table-column prop="Name" label="角色名称" align="center"></el-table-column>
          <el-table-column prop="RoleCode" label="角色编码" align="center"></el-table-column>
          <el-table-column prop="Remark" label="备注" align="center"></el-table-column>
          <el-table-column prop="Sort" label="排序" align="center"></el-table-column>
          <el-table-column prop="CreateName" label="创建人" align="center"></el-table-column>
          <el-table-column prop="CreateTime" label="创建时间" align="center"></el-table-column>
          <el-table-column prop="Id" label="操作" align="center" width="300" fixed="right">
            <template slot-scope="scope">
              <el-button type="primary" @click="getRole(scope.row.Id)" size="mini">修改</el-button>
              <!-- <el-button type="danger" size="mini" @click="getAccountListAndAccountRole(scope.row.Id)">管理成员</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col></el-col>
    </el-row>
    <el-dialog title="管理成员" :visible.sync="dialogFormVisible">
      <el-transfer
        v-model="Transfer.selectList"
        :data="Transfer.list"
        :props="{key:'Id',label:'Name'}"
        :titles="["未选成员","已选成员"]"
        class="el-transfer"
      ></el-transfer>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="saveAccountRole()" size="mini">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      roles: [],
      dialogFormVisible: false,
      Transfer: {},
      roleId: ""
    };
  },
  methods: {
    getRoles() {
      getRoles().then(res => {
        this.roles = res.Data;
      });
    },
    getAccountListAndAccountRole(id) {
      this.roleId = id;
      this.dialogFormVisible = true;
      var params = { params: { id: id } };
      getAccountListAndAccountRole(params).then(res => {
        this.Transfer = res.Data;
      });
    },
    saveAccountRole() {
      this.$confirm("是否保存", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        var params = {
          roleId: this.roleId,
          accountIds: this.Transfer.selectList
        };
        saveAccountRole(params).then(res => {
          this.$message({
            type: "success",
            message: "保存成功!"
          });
          this.dialogFormVisible = false;
        });
      });
    }
  },
  components: {},
  computed: {},
  //实例刚在内存中被创建出来,此时,还没有初始化好 data 和 methods 属性
  beforeCreate() {},
  //实例已经在内存中创建OK,此时 data 和 methods 已经创建OK,此时还没有开始 编译模板
  created() {},
  //此时已经完成了模板的编译,但是还没有挂载到页面中
  beforeMount() {},
  //此时,已经将编译好的模板,挂载到了页面指定的容器中显示
  mounted() {
    this.getRoles();
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
.el-transfer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
