<template>
  <div>
    <a-table
        :columns="columns"
        :dataSource="hotelList"
        rowKey="ID"
        :scroll="{x:2000}"
    >
    </a-table>
  </div>
  <div v-html="markedToHTML">

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {marked} from "marked";
export default defineComponent({
  name:"HotelList",
  setup(){
    const columns = [
  {
    title: 'ID',
    dataIndex: 'ID',
    width: '10%',
    key: 'id',
    align: 'center',
    fixed:''
  },
  {
    title: '酒店名',
    dataIndex: 'name',
    width: '15%',
    key: 'name',
    align: 'center'
  },
  {
    title: '位置',
    dataIndex: 'location',
    width: '15%',
    key: 'location',
    align: 'center',
    scopedSlots: { customRender: 'location' }
  },
  {
    title: '评价',
    dataIndex: 'evaluate',
    width: '15%',
    key: 'evaluate',
    align: 'center',
    scopedSlots: { customRender: 'evaluate' }
  },
  {
    title: '电话',
    dataIndex: 'phone',
    width: '15%',
    key: 'phone',
    align: 'center',
    scopedSlots: { customRender: 'phone' }
  },
  {
    title: '操作',
    width: '30%',
    key: 'action',
    align: 'center',
    scopedSlots: { customRender: 'action' }
  }
];
const hotelList= [
        {ID:1,name:'国际大酒店',location:'广州',evaluate:'5',phone:'123456789',},
        {ID:2,name:'国际小酒店',location:'广州',evaluate:'5',phone:'123456789'},
        {ID:3,name:'国际大酒店',location:'深圳',evaluate:'5',phone:'123456789'},
        {ID:4,name:'国际大酒店',location:'广州',evaluate:'5',phone:'123456789'},
      ];
      columns[0].fixed='left';
      columns[2].fixed='left';
    const markedToHTML =marked('# 标题');
    return {
      columns,
      hotelList,
      markedToHTML,
    };
  }
})

</script>

<style scoped>
.actionSlot{
    display: flex;
    justify-content: center;
}
</style>
