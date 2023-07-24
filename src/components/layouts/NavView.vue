<template>
  <a-layout-sider v-model:collapsed="collapsed" collapsible>
    <div class="logo"></div>
    <a-menu
    theme="dark"
    mode="inline"
    :style="{ lineHeight: '64px' }"
    >
      <a-menu-item key="1">
        <template #title>
          <span>
            <user-outlined />
            Menu
          </span>
        </template>
      </a-menu-item>
      <s-sub-menu>
        <a-menu-item>
          <template #title>
            <span>
              <!-- 图标 -->
              子Menu1
            </span>
          </template>
        </a-menu-item>
        <a-menu-item>
          <template #title>
            <span>
              <!-- 图标 -->
              子Menu12
            </span>
          </template>
        </a-menu-item>
      </s-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>
<script lang="ts" setup>
import {ref} from 'vue'
const collapsed=ref<boolean>(false);
</script>
