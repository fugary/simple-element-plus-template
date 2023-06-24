<script setup>
import LeftMenu from '@/components/LeftMenu.vue'
import TopNav from '@/components/TopNav.vue'
import { ref } from 'vue'
import dayjs from 'dayjs'

const collapseLeft = ref(false)

const value1 = ref(new Date())
const color = ref('rgba(19, 206, 102, 0.8)')

const testDay = function () {
  return dayjs.weekdays()
}

</script>

<template>
  <el-container class="index-container">
    <el-aside width="auto">
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
        <el-color-picker
          v-model="color"
          show-alpha
        />
        {{ testDay() }}
        {{ $i18n.locale }}
      </el-main>
    </el-container>
  </el-container>
</template>
