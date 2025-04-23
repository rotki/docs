<script setup>
import Papa from 'papaparse';
import { onBeforeMount, ref } from 'vue';

const props = defineProps({
  csvUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: false,
    default: '',
  },
});

const headers = ref([]);
const rows = ref([]);

onBeforeMount(async () => {
  try {
    const response = await fetch(props.csvUrl);
    const csvData = await response.text();

    Papa.parse(csvData, {
      complete: (result) => {
        headers.value = result.data[0];
        rows.value = result.data.slice(1);
      },
      header: false,
    });
  }
  catch (error) {
    console.error('Error fetching or parsing CSV:', error);
  }
});
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
          v-for="header in headers"
          :key="header"
        >
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, index) in rows"
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
