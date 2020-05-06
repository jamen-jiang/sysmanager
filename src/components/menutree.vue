<template>
    <div>
        <label v-for="(menu,index) in data" :key="menu.Id">
            <el-submenu v-if="menu.Children.length>0" :index='index+""'>
                <template slot="title">
                    <i :class="menu.Icon"></i><span slot="title">{{menu.Name}}</span>
                </template>
                <menutree :data="menu.Children"></menutree>
                <!-- <el-menu-item-group v-if="m.Children && m.Children.length > 0">
                    <el-menu-item v-for="c in m.Children" :key="c.Id" :index='c.VueUrl' > 
                        {{c.Name}}
                    </el-menu-item>
                </el-menu-item-group> -->
            </el-submenu>
            <el-menu-item v-else :index='menu.VueUri'>
                <i :class="menu.Icon"></i><span slot="title">{{menu.Name}}</span>
            </el-menu-item>
        </label>
    </div>
</template>

<script>
import menutree from "@/components/menutree";
export default {
    name: "menutree",
    props: {
        data: {
            type: Array,
            default: function () {
                return []
            }
        },
        
    },
    data() {
        return {

        };
    },
    methods: {

    },
    components: {
        menutree
    },
    computed: {

    },
    //实例刚在内存中被创建出来,此时,还没有初始化好 data 和 methods 属性
    beforeCreate() {

    },
    //实例已经在内存中创建OK,此时 data 和 methods 已经创建OK,此时还没有开始 编译模板
    created() {

    },
    //此时已经完成了模板的编译,但是还没有挂载到页面中
    beforeMount() {

    },
    //此时,已经将编译好的模板,挂载到了页面指定的容器中显示
    mounted() {
        
    },
    //状态更新之前执行此函数,此时 data 中的状态值是最新的,但是界面上显示的 数据还是旧的,因为此时还没有开始重新渲染DOM节点
    beforeUpdate() {

    },
    //实例更新完毕之后调用此函数,此时 data 中的状态值 和 界面上显示的数据,都已经完成了更新,界面已经被重新渲染好了!
    updated() {
        
    },
    //Vue实例销毁之前调用.在这一步,Vue实例仍然完全可用
    beforeDestroy() {

    },
    //Vue实例销毁后调用.调用后,Vue实例指示的所有东西都会解绑定,所有的事件监听器会被移除,所有的子实例也会被销毁
    destroyed() {

    },
    watch: {

    },
};
</script>

<style scoped>

</style>
