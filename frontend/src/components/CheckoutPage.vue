<template>
  <div class="min-h-screen bg-[#0b0e14] text-white pt-6 pb-20 px-4">
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 h-[85vh]">
      
      <div class="lg:col-span-3 bg-[#151921] rounded-xl border border-slate-800 flex flex-col">
          <div class="p-4 border-b border-slate-800"><input v-model="searchQuery" placeholder="Search..." class="w-full bg-[#0b0e14] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white outline-none"></div>
          <div class="flex-1 overflow-y-auto custom-scrollbar">
              <div v-for="(stock, ticker) in filteredStocks" :key="ticker" @click="selectStock(ticker)"
                   class="p-4 border-b border-slate-800/50 cursor-pointer hover:bg-slate-700/30 flex justify-between"
                   :class="selectedTicker === ticker ? 'bg-indigo-900/20 border-l-4 border-l-indigo-500' : ''">
                   <div><div class="font-bold">{{ ticker }}</div></div>
                   <div class="text-right"><div class="font-mono">${{ stock.Close }}</div><div :class="stock.Daily_Return >= 0 ? 'text-green-400' : 'text-red-400'" class="text-xs">{{ stock.Daily_Return }}%</div></div>
              </div>
          </div>
      </div>

      <div class="lg:col-span-6 flex flex-col gap-4">
         <div v-if="currentStockData" class="bg-[#151921] p-4 rounded-xl border border-slate-800 flex justify-between">
             <div><span class="text-slate-500 text-xs">Price</span><div class="text-2xl font-bold font-mono">${{ currentStockData.Close }}</div></div>
             <div><span class="text-slate-500 text-xs">High</span><div class="text-green-400 font-mono">${{ currentStockData.High }}</div></div>
             <div><span class="text-slate-500 text-xs">Low</span><div class="text-red-400 font-mono">${{ currentStockData.Low }}</div></div>
         </div>
         <div class="flex-1 bg-[#151921] rounded-xl border border-slate-800 p-4 relative">
             <LandingChart v-if="chartHistory.length" :stockData="chartHistory" />
             <div v-else class="h-full flex items-center justify-center text-slate-500">Select a stock to view chart</div>
         </div>
      </div>

      <div class="lg:col-span-3 bg-[#151921] rounded-xl border border-slate-800 p-6 flex flex-col">
         <h3 class="font-bold text-xl mb-6">Trade</h3>
         <div v-if="selectedTicker">
             <div class="flex gap-2 mb-6 bg-[#0b0e14] p-1 rounded-lg">
                 <button @click="orderType='BUY'" :class="orderType==='BUY'?'bg-green-600 text-white':'text-slate-400'" class="flex-1 py-2 rounded font-bold transition">Buy</button>
                 <button @click="orderType='SELL'" :class="orderType==='SELL'?'bg-red-600 text-white':'text-slate-400'" class="flex-1 py-2 rounded font-bold transition">Sell</button>
             </div>
             <div class="space-y-4">
                 <div><label class="text-xs text-slate-400">Quantity</label><input v-model.number="quantity" type="number" min="1" class="w-full bg-[#0b0e14] border border-slate-700 p-3 rounded-lg text-white font-mono font-bold outline-none"></div>
                 <div class="p-4 bg-[#0b0e14] rounded-lg flex justify-between"><span>Total</span><span class="font-mono text-indigo-400">${{ (currentStockData?.Close * quantity).toFixed(2) }}</span></div>
                 
                 <button @click="proceedToCheckout" class="w-full py-4 rounded-xl font-bold text-lg shadow-lg transition"
                    :class="orderType==='BUY'?'bg-green-600 hover:bg-green-500':'bg-red-600 hover:bg-red-500'">
                     {{ orderType }} {{ selectedTicker }}
                 </button>
                 <p v-if="!isLoggedIn" class="text-xs text-center text-orange-400 mt-2">Login required to finalize trade</p>
             </div>
         </div>
         <div v-else class="text-center text-slate-500 mt-10">Select a stock</div>
      </div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable no-undef */
import { ref, onMounted, computed } from 'vue';
import LandingChart from './LandingChart.vue';

const props = defineProps(['isLoggedIn']);
const emit = defineEmits(['navigate', 'set-order']);
const API_URL = process.env.VUE_APP_API_URL || 'http://localhost:3000';
const stocks = ref({});
const chartHistory = ref([]);
const selectedTicker = ref(null);
const searchQuery = ref("");
const quantity = ref(1);
const orderType = ref('BUY');

const filteredStocks = computed(() => {
    if(!searchQuery.value) return stocks.value;
    const res = {}; Object.keys(stocks.value).forEach(k => {if(k.includes(searchQuery.value.toUpperCase())) res[k]=stocks.value[k]}); return res;
});
const currentStockData = computed(() => selectedTicker.value ? stocks.value[selectedTicker.value] : null);

const selectStock = async (ticker) => {
    selectedTicker.value = ticker;
    try { const res = await fetch(`${API_URL}/api/stocks/${ticker}`); if(res.ok) chartHistory.value = await res.json(); 
    } catch(e) {
        console.error("Failed to fetch stock history:", e);
    }
};

const proceedToCheckout = () => {
    const orderData = { ticker: selectedTicker.value, quantity: quantity.value, type: orderType.value, price: currentStockData.value.Close };
    
    if (!props.isLoggedIn) {
        // GUEST: Lưu đơn hàng treo và chuyển sang Login
        localStorage.setItem('pendingTrade', JSON.stringify(orderData));
        if(confirm("You must login to trade. Redirect to Login?")) emit('navigate', 'login');
    } else {
        // USER: Chuyển sang Checkout
        emit('set-order', orderData);
        emit('navigate', 'checkout');
    }
};

onMounted(async () => {
    const res = await fetch(`${API_URL}/api/stocks`);
    if(res.ok) stocks.value = await res.json();
    
    // Khôi phục đơn hàng treo (nếu có)
    const pending = localStorage.getItem('pendingTrade');
    if (pending) {
        const order = JSON.parse(pending);
        searchQuery.value = order.ticker;
        await selectStock(order.ticker);
        quantity.value = order.quantity;
        orderType.value = order.type;
        localStorage.removeItem('pendingTrade');
    }
});
</script>
<style scoped>.custom-scrollbar::-webkit-scrollbar{width:5px}.custom-scrollbar::-webkit-scrollbar-thumb{background:#333}</style>