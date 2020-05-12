<template>
  <div class="main-container">
    <el-row :gutter="20" class="main-container-content">
      <el-col :span="5" class="main-container-content-col">
        <el-card class="box-card box-role" body-style="height: 100%;overflow: auto;">
          <div slot="header" class="clearfix">
            <span>角色</span>
            <el-button type="text" class="el-btn-save" @click="saveOperate()">保存</el-button>
          </div>
          <div class="box-role-list">
            <div class="text item role-item" v-for="r in roles" :key="r.Id" :class="{ active: roleId == r.Id }" @click="setTabContent(r.Id)">
              {{ r.Name }}
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="19" class="main-container-content-col">
        <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card" class="tab-container" body-style="height: 100%;">
          <el-tab-pane label="菜单权限" name="menurole" class="pane-menu">
            <div class="custom-tree-container">
              <el-tree :data="menus.list" show-checkbox node-key="Id" default-expand-all :expand-on-click-node="false" :props="{ children: 'children', label: 'Name' }" :default-checked-keys="menus.selectList" :indent="40" ref="menuTree" :check-strictly="true">
                <div class="custom-tree-node" slot-scope="{ node, data }">
                  <span style="width:150px;" @click="getdata1(data)">{{
                    node.label
                  }}</span>
                  <el-checkbox-group v-if="data.PId > 0" v-model="operates.selectList">
                    <el-checkbox :label="m.Id" v-for="m in getMenuOperate(data.Id)" :key="m.Id" border size="mini">{{ m.Name }}</el-checkbox>
                  </el-checkbox-group>
                </div>
              </el-tree>
            </div>
          </el-tab-pane>
          <el-tab-pane label="角色分配" name="userrole">
            <div class="user-group">
              <el-tag v-for="a in accounts.list" type="success" :key="a.Id" :effect="
                  accounts.selectList.indexOf(a.Id) != -1 ? 'dark' : 'plain'
                " @click="userSelect(a.Id)">{{ a.Name }}</el-tag>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      roles: [],
      roleId: "",
      menus: {},
      operates: {},
      accounts: {},
      activeName: "menurole",
      index: 0
    };
  },
  methods: {
    getRoles() {
      getRoles().then(res => {
        this.roles = res.Data;
      });
    },
    handleClick(tab, event) {
      this.index = tab.index;
      this.setTabContent();
    },
    setTabContent(roleId) {
      if (roleId) this.roleId = roleId;
      else {
        if (!this.roleId) return;
      }
      if (this.index == 0) {
        this.getMenuListAndMenuRole();
      } else {
        this.getAccountListAndAccountRole();
      }
    },
    getMenuListAndMenuRole() {
      var params = { params: { roleId: this.roleId } };
      getMenuListAndMenuRole(params).then(res => {
        this.menus = {
          list: res.Data.menulist,
          selectList: res.Data.selectMenuList
        };
        this.operates = {
          list: res.Data.operateList,
          selectList: res.Data.selectOperateList
        };
      });
    },
    getAccountListAndAccountRole() {
      var params = { params: { roleId: this.roleId } };
      getAccountListAndAccountRole(params).then(res => {
        this.accounts = res.Data;
      });
    },
    userSelect(accountId) {
      var index = this.accounts.selectList.indexOf(accountId);
      if (index != -1) {
        this.accounts.selectList.splice(index, 1);
      } else {
        this.accounts.selectList.push(accountId);
      }
    },
    // operateSelect(operateId){
    //     debugger
    //     //console.log(this.operates.selectList)
    //     var index = this.operates.selectList.indexOf(operateId);
    //     if(index!=-1){
    //         this.operates.selectList.splice(index,1)
    //     }else{
    //         this.operates.selectList.push(operateId)
    //     }
    // },
    saveOperate() {
      if (!this.roleId) {
        this.$message.error("你还未选中角色");
        return;
      }
      this.$confirm("是否保存", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        if (this.index == 0) {
          this.saveMenuRole();
        } else {
          this.saveAccountRole();
        }
      });
    },
    saveAccountRole() {
      var params = {
        roleId: this.roleId,
        accountIds: this.accounts.selectList
      };
      saveAccountRole(params).then(res => {
        this.$message({
          type: "success",
          message: "保存成功!"
        });
      });
    },
    saveMenuRole() {
      var menuSelectList = this.$refs.menuTree
        .getCheckedKeys()
        .concat(this.$refs.menuTree.getHalfCheckedKeys());
      var params = {
        roleId: this.roleId,
        menuIds: menuSelectList,
        operateIds: this.operates.selectList
      };
      saveMenuRole(params).then(res => {
        this.$message({
          type: "success",
          message: "保存成功!"
        });
      });
    }
  },
  components: {},
  computed: {
    getMenuOperate: function () {
      return function (menuId) {
        var list = [];
        this.operates.list.forEach(operate => {
          if (operate.MenuId == menuId) list.push(operate);
        });
        return list;
      };
    }
  },
  //实例刚在内存中被创建出来,此时,还没有初始化好 data 和 methods 属性
  beforeCreate() { },
  //实例已经在内存中创建OK,此时 data 和 methods 已经创建OK,此时还没有开始 编译模板
  created() { },
  //此时已经完成了模板的编译,但是还没有挂载到页面中
  beforeMount() { },
  //此时,已经将编译好的模板,挂载到了页面指定的容器中显示
  mounted() {
    this.getRoles();
  },
  //状态更新之前执行此函数,此时 data 中的状态值是最新的,但是界面上显示的 数据还是旧的,因为此时还没有开始重新渲染DOM节点
  beforeUpdate() { },
  //实例更新完毕之后调用此函数,此时 data 中的状态值 和 界面上显示的数据,都已经完成了更新,界面已经被重新渲染好了!
  updated() { },
  //Vue实例销毁之前调用.在这一步,Vue实例仍然完全可用
  beforeDestroy() { },
  //Vue实例销毁后调用.调用后,Vue实例指示的所有东西都会解绑定,所有的事件监听器会被移除,所有的子实例也会被销毁
  destroyed() { },
  watch: {}
};
</script>
<style>
.custom-tree-container .el-tree-node__content {
  height: 40px;
}
</style>
<style scoped>
.role-item {
  padding: 10px;
  cursor: pointer;
}
.role-item.active,
.role-item:hover {
  background: #ebf5ff;
}
.custom-tree-node {
  display: flex;
  align-items: center;
}
.el-checkbox-group {
  flex: 1;
  text-align: right;
  overflow: hidden;
}
.custom-tree-container {
  display: grid;
  overflow: auto;
}
.tab-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.tab-container >>> .el-tabs__content {
  height: 100%;
}
.box-role,
.box-menu {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.pane-menu {
  height: 100%;
}
.user-group .el-tag {
  margin-left: 10px;
  cursor: pointer;
}
.custom-tree-container {
  height: 100%;
}
.el-btn-save {
  float: right;
  padding: 0px;
}
</style>
