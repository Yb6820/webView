<template>
  <a-layout style="min-height: 100vh">
    <NavView></NavView>
    <a-layout>
      <Header></Header>
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          Bill is a cat.
        </div>
      </a-layout-content>
      <Footer></Footer>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import Footer from '@/components/layouts/FooterView.vue';
import Header from '@/components/layouts/HeaderView.vue';
import NavView from '@/components/layouts/NavView.vue';
import { Options, Vue } from 'vue-class-component';

@Options({
  components: {
    HelloWorld,
    NavView,
    Header,
    Footer
  },
})
export default class AdminView extends Vue {}
</script>
