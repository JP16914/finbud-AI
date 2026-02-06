<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <h1 class="text-4xl font-bold text-gray-800 mb-8">FinBud AI Dashboard</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <div v-for="(info, ticker) in summary" :key="ticker" 
           @click="selectStock(ticker)"
           class="cursor-pointer bg-white p-6 rounded-xl shadow hover:shadow-xl transition-all border-l-4"
           :class="info.Daily_Return >= 0 ? 'border-green-500' : 'border-red-500'">
        
        <div class="flex justify-between items-center">
          <h2 class="text-2xl font-bold">{{ ticker }}</h2>
          <span :class="info.Daily_Return >= 0 ? 'text-green-600' : 'text-red-600'" class="font-bold">
            {{ info.Daily_Return }}%
          </span>
        </div>
        <p class="text-3xl mt-2 font-mono">${{ info.Close }}</p>
      </div>
    </div>

    <div v-if="selectedTicker" class="h-96">
      <h3 class="text-xl font-bold mb-4">Performance Analysis: {{ selectedTicker }}</h3>
      <StockChart v-if="historyData.length" :history="historyData" :label="selectedTicker" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import StockChart from '../components/StockChart.vue';

const summary = ref({});
const selectedTicker = ref(null);
const historyData = ref([]);

// 1. Load the summary on startup
onMounted(async () => {
  const res = await fetch('http://localhost:3000/api/stocks');
  summary.value = await res.json();
});

// 2. Core Code: Fetch details when user clicks a card
const selectStock = async (ticker) => {
  selectedTicker.value = ticker;
  const res = await fetch(`http://localhost:3000/api/stocks/${ticker}`);
  historyData.value = await res.json();
};
</script>