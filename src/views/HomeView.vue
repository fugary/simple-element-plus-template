<script setup>
import LeftMenu from '@/layout/LeftMenu.vue'
import TopNav from '@/layout/TopNav.vue'
import { ref } from 'vue'
import dayjs from 'dayjs'

const collapseLeft = ref(false)

const value1 = ref(new Date())

const testDay = function () {
  return dayjs.weekdays()
}

</script>

<template>
  <el-container class="index-container">
    <el-aside
      class="index-aside"
      width="auto"
    >
      <left-menu v-model:collapse-left="collapseLeft" />
    </el-aside>
    <el-container>
      <el-header>
        <top-nav v-model:collapse-left="collapseLeft" />
      </el-header>
      <el-main>
        <el-date-picker
          v-model="value1"
          type="date"
          placeholder="Pick a day"
        />
        {{ testDay() }}
        {{ $i18n.locale }}
      </el-main>
    </el-container>
  </el-container>
</template>
