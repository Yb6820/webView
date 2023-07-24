<template>
  <a-layout>
    <Nav></Nav>
    <a-layout>
      <a-layout-header>
        <Header></Header>
      </a-layout-header>
      <a-layout-content>
        <!-- 路由组件 -->
        <router-view :key="$route.path"></router-view>
      </a-layout-content>
      <a-layout-footer>
        <Footer></Footer>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import Nav from '@/components/layouts/NavView.vue';
import Header from '@/components/layouts/HeaderView.vue'
import Footer from '@/components/layouts/FooterView.vue'

@Options({
  components: {
    HelloWorld,
    Nav,
    Header,
    Footer
  },
})
export default class AdminView extends Vue {}
</script>
