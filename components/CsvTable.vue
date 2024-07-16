<template>
  <h3 v-if="title">
    {{ title }}
  </h3>
  <table>
    <thead>
      <tr>
        <th v-for="header in headers" :key="header">{{ header }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in rows" :key="index">
        <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import Papa from 'papaparse'

const props = defineProps({
  csvUrl: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: false,
    default: ''
  }
})

const headers = ref([])
const rows = ref([])

onMounted(async () => {
  try {
    const response = await fetch(props.csvUrl)
    const csvData = await response.text()

    Papa.parse(csvData, {
      complete: (result) => {
        headers.value = result.data[0]
        rows.value = result.data.slice(1)
      },
      header: false
    })
  } catch (error) {
    console.error('Error fetching or parsing CSV:', error)
  }
})
</script>
