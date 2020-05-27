<template>
  <el-container class="is-vertical jyz-layout">
    <HeadBar class="jyz-header"></HeadBar>
    <el-container class="jyz-middle">
      <MenuBar></MenuBar>
      <el-container>
        <Main class="jyz-middle-main"></Main>
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
  mounted() {
  },
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
<style lang="scss">
@import '@/styles/theme/register.scss';
</style>
