<template>
  <el-container class="is-vertical" style="background-color: #ebf1f6;" id="sysmain">
    <HeadBar></HeadBar>
    <el-container>
      <MenuBar></MenuBar>
      <el-container>
        <Main></Main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import MenuBar from "./MenuBar";
import HeadBar from "./HeadBar";
import Main from "./Main";
import FootBar from "./FootBar";
export default {
  props: {},
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {},
  components: {
    MenuBar,
    HeadBar,
    Main,
    FootBar
  }
};
</script>

<style scoped>
</style>
<style>
#sysmain .el-menu {
  background-color: #ebf1f6;
  border: 0px;
}
</style>
