<template>
  <el-container class="is-vertical jyz-wrapper">
    <HeadBar class="jyz-header"></HeadBar>
    <el-container>
      <MenuBar class="jyz-menu"></MenuBar>
      <el-container>
        <Main class="jyz-main"></Main>
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
  created() { },
  mounted() { },
  watch: {},
  methods: {},
  components: {
    HeadBar,
    MenuBar,
    Main,
    FootBar,
  },
};
</script>

<style lang="scss" scoped></style>
<style lang="scss">
.jyz-wrapper {
  background: #ebf1f6;
  .el-menu {
    background-color: #ebf1f6;
    border: 0px;
  }
}
</style>
