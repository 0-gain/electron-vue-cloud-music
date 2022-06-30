#### Layout布局文件
    1.先创建一个Layout文件夹
        有Sidebar、CloudHeader还有footer
    2.使用element-ui插件来做侧边菜单栏(Sidebar)
        功能：
            1.点击选中的背景需要高亮
                遇到的问题：
                    在使用NavMenu 导航菜单时，用v-for去遍历出侧边菜单栏的菜单选项，因为默认被点击的属性：default-active = index 是根据index来实现的，并且要实现点击就让当前的li高亮，而其他的去除高亮，通过v-for的id就可以得出当前所点击的是哪个选项，:index="id.toString()"，由于v-for给出的id是数字，但是default-active要的是字符串，所以需要调用toString()
            2.点击之后需要进行路由跳转
                使用vue的内置组件
                    currentTabComponent: 已注册组件的名字，或 一个组件的选项对象
                    <component :is="currentTabComponent"></component>

#### discover组件
    1.使用vuex来存储组件状态，使用模块化开发，如果使用了namespaced命名空间，则需要在方法之前加上模块名称
        this.$store.dispatch('discover/getInfo')
    
    2.子组件
        Recommend,Customize,MusicList,Rank,Singer,NewMusic
