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
import { HeadBar, MenuBar, Main, FootBar } from "./components";
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
    HeadBar,
    MenuBar,
    Main,
    FootBar
  }
};
</script>

<style lang='scss' scoped>
</style>
<style lang='scss'>
#sysmain {
  .el-menu {
    background-color: #ebf1f6;
    border: 0px;
  }
}
</style>
