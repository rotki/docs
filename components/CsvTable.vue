<script setup lang="ts">
import { computed } from 'vue';
import { data } from './csv-loader.data';

const { csvUrl, title = '' } = defineProps<{
  csvUrl: string;
  title?: string;
}>();

const csvData = computed(() => data[csvUrl]);
</script>

<template>
  <div class="title-section">
    <h3 v-if="title">
      {{ title }}
    </h3>
    <a
      :href="csvUrl"
      download
    >
      [Download CSV Example]
    </a>
  </div>
  <table>
    <thead>
      <tr>
        <th
          v-for="header in csvData.headers"
          :key="header"
        >
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, index) in csvData.rows"
        :key="index"
      >
        <td
          v-for="(cell, cellIndex) in row"
          :key="cellIndex"
        >
          {{ cell }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.title-section {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1rem;
}

.title-section h3 {
  margin-top: 0;
}
</style>
