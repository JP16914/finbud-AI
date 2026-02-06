<template>
  <div class="p-4 bg-white rounded-xl shadow-lg">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const props = defineProps(['history', 'label']);

// Core Code: formatting data for the library
const chartData = computed(() => ({
  labels: props.history.map(d => d.Date), // X-Axis: Dates
  datasets: [{
    label: props.label,
    data: props.history.map(d => d.Close), // Y-Axis: Prices
    borderColor: '#4F46E5', // Indigo color
    backgroundColor: 'rgba(79, 70, 229, 0.2)',
    tension: 0.4 // Makes the line curved (smooth)
  }]
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false
};
</script>