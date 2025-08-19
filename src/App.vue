<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
    <div class="max-w-7xl mx-auto space-y-6">
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold">Forzeit Dashboard</h1>
          <p class="text-gray-500">Marketing metrics overview</p>
        </div>
        <button class="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">
          Download Report
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader class="pb-2">
            <CardTitle class="text-sm font-medium text-gray-500">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">£{{ data.currentMRR.toLocaleString() }}</div>
            <p class="text-xs text-green-600">+20.1% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader class="pb-2">
            <CardTitle class="text-sm font-medium text-gray-500">Annual Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">£{{ data.currentARR.toLocaleString() }}</div>
            <p class="text-xs text-green-600">+15% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader class="pb-2">
            <CardTitle class="text-sm font-medium text-gray-500">Total Signups</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ totalSignups }}</div>
            <p class="text-xs text-green-600">+{{ lastMonthGrowth }}% this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader class="pb-2">
            <CardTitle class="text-sm font-medium text-gray-500">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">7.6%</div>
            <p class="text-xs text-green-600">+0.18% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Live Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="flex items-center space-x-4">
              <div class="p-2 bg-green-100 rounded-full">
                <div class="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <p class="text-sm text-gray-500">Active Now (5 sec)</p>
                <p class="text-xl font-semibold">{{ liveStats.activeNow }}</p>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <Users class="h-8 w-8 text-blue-500" />
              <div>
                <p class="text-sm text-gray-500">Last 24 Hours</p>
                <p class="text-xl font-semibold">{{ liveStats.last24Hours }}</p>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <CreditCard class="h-8 w-8 text-purple-500" />
              <div>
                <p class="text-sm text-gray-500">Cards Created (24h)</p>
                <p class="text-xl font-semibold">{{ liveStats.cardsCreated }}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Visitor Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <canvas ref="visitorsChart" height="300"></canvas>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <canvas ref="revenueChart" height="300"></canvas>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Users, CreditCard } from 'lucide-vue-next'
import Chart from 'chart.js/auto'

import { dashboardData, generateLiveStats } from './api/mockData'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'

const data = dashboardData
const liveStats = ref(generateLiveStats())
let interval: any = null

const totalSignups = computed(() => 
  data.signups.reduce((sum, val) => sum + val, 0)
)

const lastMonthGrowth = computed(() => {
  const current = data.signups[11]
  const previous = data.signups[10]
  return Math.round(((current - previous) / previous) * 100)
})

const visitorsChart = ref<HTMLCanvasElement>()
const revenueChart = ref<HTMLCanvasElement>()

onMounted(() => {
  /*  Update live stats every 5 secs   */
  interval = setInterval(() => {
    liveStats.value = generateLiveStats()
  }, 5000)

  // Create visitors chart
  if (visitorsChart.value) {
    new Chart(visitorsChart.value, {
      type: 'bar',
      data: {
        labels: data.months,
        datasets: [{
          label: 'Visitors',
          data: data.visitors,
          backgroundColor: 'rgba(99, 102, 241, 0.8)',
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } }
      }
    })
  }

  // Create revenue chart
  if (revenueChart.value) {
    new Chart(revenueChart.value, {
      type: 'line',
      data: {
        labels: data.months,
        datasets: [{
          label: 'MRR',
          data: data.mrr,
          borderColor: 'rgb(34, 197, 94)',
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } }
      }
    })
  }
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>