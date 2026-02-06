<template>
  <div class="min-h-screen bg-[#0b0e14] text-white pt-6 pb-20 px-4 md:px-8">
    
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold">Market Terminal</h1>
        <p class="text-slate-400 text-sm">Real-time data from NASDAQ & NYSE</p>
      </div>
      <div class="text-right hidden sm:block">
        <div class="text-sm text-slate-400">Market Status</div>
        <div class="text-green-500 font-bold animate-pulse">● OPEN</div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[80vh]">
      
      <div class="lg:col-span-3 bg-[#151921] rounded-xl border border-slate-800 flex flex-col overflow-hidden">
        <div class="p-4 border-b border-slate-800">
          <input v-model="searchQuery" type="text" placeholder="Search Ticker..." 
                 class="w-full bg-[#0b0e14] border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 transition">
        </div>
        
        <div class="flex-1 overflow-y-auto custom-scrollbar">
          <div v-if="loadingList" class="p-4 text-center text-slate-500">Loading Stocks...</div>
          
          <div v-else v-for="(stock, ticker) in filteredStocks" :key="ticker" 
               @click="selectStock(ticker)"
               :class="['p-4 border-b border-slate-800/50 cursor-pointer hover:bg-slate-700/30 transition flex justify-between items-center', 
                        selectedTicker === ticker ? 'bg-indigo-600/10 border-l-4 border-l-indigo-500' : 'border-l-4 border-l-transparent']">
            
            <div>
              <div class="font-bold text-sm">{{ ticker }}</div>
              <div class="text-xs text-slate-500">Vol: {{ formatVolume(stock.Volume) }}</div>
            </div>
            
            <div class="text-right">
              <div class="font-mono font-medium text-sm">${{ stock.Close }}</div>
              <div :class="stock.Daily_Return >= 0 ? 'text-green-400' : 'text-red-400'" class="text-xs font-bold">
                {{ stock.Daily_Return > 0 ? '+' : '' }}{{ stock.Daily_Return }}%
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:col-span-9 flex flex-col gap-6">
        
        <div v-if="currentStockData" class="bg-[#151921] rounded-xl border border-slate-800 p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
           <div>
             <div class="text-slate-500 text-xs uppercase">Current Price</div>
             <div class="text-3xl font-bold font-mono">${{ currentStockData.Close }}</div>
           </div>
           <div>
             <div class="text-slate-500 text-xs uppercase">Open</div>
             <div class="text-xl font-mono">${{ currentStockData.Open }}</div>
           </div>
           <div>
             <div class="text-slate-500 text-xs uppercase">Day High</div>
             <div class="text-xl font-mono text-green-400">${{ currentStockData.High }}</div>
           </div>
           <div>
             <div class="text-slate-500 text-xs uppercase">Day Low</div>
             <div class="text-xl font-mono text-red-400">${{ currentStockData.Low }}</div>
           </div>
        </div>

        <div class="flex-1 bg-[#151921] rounded-xl border border-slate-800 p-4 relative min-h-[400px]">
           <div class="flex justify-between items-center mb-4 px-2">
             <h3 class="font-bold flex items-center gap-2">
               <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
               {{ selectedTicker }} Price History
             </h3>
             <div class="flex gap-2 text-xs">
                <button class="px-3 py-1 rounded bg-indigo-600 text-white">1Y</button>
                <button class="px-3 py-1 rounded bg-slate-800 text-slate-400 hover:bg-slate-700">All</button>
             </div>
           </div>

           <div class="h-[90%] w-full">
              <div v-if="loadingChart" class="h-full flex items-center justify-center text-slate-500">
                Loading Chart Data...
              </div>
              <LandingChart v-else-if="chartHistory.length > 0" :stockData="chartHistory" />
              <div v-else class="h-full flex items-center justify-center text-slate-500">
                Select a stock to view chart
              </div>
           </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable no-undef */
import { ref, onMounted, computed } from 'vue';
import LandingChart from './LandingChart.vue'; // Tái sử dụng Component Chart cũ

const stocks = ref({});
const chartHistory = ref([]);
const selectedTicker = ref(null);
const searchQuery = ref("");
const loadingList = ref(true);
const loadingChart = ref(false);

// Format Volume (e.g. 1.2M)
const formatVolume = (num) => {
  return (num / 1000000).toFixed(1) + 'M';
};

// Filter Search
const filteredStocks = computed(() => {
  if (!searchQuery.value) return stocks.value;
  const result = {};
  Object.keys(stocks.value).forEach(ticker => {
    if (ticker.includes(searchQuery.value.toUpperCase())) {
      result[ticker] = stocks.value[ticker];
    }
  });
  return result;
});

// Get current stock details based on selection
const currentStockData = computed(() => {
  if (!selectedTicker.value || !stocks.value[selectedTicker.value]) return null;
  return stocks.value[selectedTicker.value];
});

// Select Stock Action
const selectStock = async (ticker) => {
  selectedTicker.value = ticker;
  loadingChart.value = true;
  try {
    const res = await fetch(`http://localhost:3000/api/stocks/${ticker}`);
    if (res.ok) {
      chartHistory.value = await res.json();
    }
  } catch (err) {
    console.error("Chart load error", err);
  } finally {
    loadingChart.value = false;
  }
};

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:3000/api/stocks');
    if (res.ok) {
      stocks.value = await res.json();
      // Auto select first stock
      const firstTicker = Object.keys(stocks.value)[0];
      if (firstTicker) selectStock(firstTicker);
    }
  } catch (err) {
    console.error("List load error", err);
  } finally {
    loadingList.value = false;
  }
});
</script>

<style scoped>
/* Custom Scrollbar for list */
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: #0b0e14; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; }
</style>