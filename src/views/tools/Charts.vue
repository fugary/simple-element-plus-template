<script setup>
import { useEchartsConfig } from '@/vendors/echarts'
const { VChart, theme } = useEchartsConfig()

const chartConfig = {
  title: {
    text: 'Referer of a Website',
    subtext: 'Fake Data',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}

</script>

<template>
  <el-container class="container-center">
    <v-chart
      v-if="chartConfig"
      class="chart"
      :theme="theme"
      :option="chartConfig"
      autoresize
    />
  </el-container>
</template>

<style scoped>
.chart {
  height: 400px;
  width: 600px;
}
</style>
