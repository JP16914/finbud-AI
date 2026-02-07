<template>
  <div class="min-h-screen bg-[#0b0e14] text-white pt-24 px-4">
    <div class="max-w-2xl mx-auto bg-[#151921] rounded-3xl border border-slate-800 p-8 shadow-2xl">
      <h2 class="text-3xl font-bold mb-8 text-center">Confirm Your Order</h2>
      
      <div v-if="orderData" class="space-y-6">
        <div class="flex justify-between items-center p-4 bg-[#0b0e14] rounded-xl border border-slate-700">
            <div><span class="text-slate-500 text-xs block">ASSET</span><span class="text-xl font-bold">{{ orderData.ticker }}</span></div>
            <div class="text-right"><span class="text-slate-500 text-xs block">ACTION</span><span :class="orderData.type === 'BUY' ? 'text-green-400' : 'text-red-400'" class="font-bold">{{ orderData.type }}</span></div>
        </div>

        <div class="grid grid-cols-2 gap-4 text-sm">
            <div class="p-4 bg-[#0b0e14] rounded-xl border border-slate-700"><span>Quantity</span><div class="text-lg font-bold">{{ orderData.quantity }}</div></div>
            <div class="p-4 bg-[#0b0e14] rounded-xl border border-slate-700"><span>Current Price</span><div class="text-lg font-bold">${{ orderData.price }}</div></div>
        </div>

        <div class="p-6 bg-indigo-600/10 border border-indigo-500/30 rounded-2xl flex justify-between items-center">
            <span class="text-lg font-bold text-indigo-200">Total Cost</span>
            <span class="text-3xl font-mono font-bold text-white">${{ (orderData.quantity * orderData.price).toFixed(2) }}</span>
        </div>

        <div v-if="error" class="bg-red-500/10 border border-red-500/30 text-red-500 p-4 rounded-xl text-center text-sm font-bold">{{ error }}</div>

        <div class="flex gap-4">
            <button @click="$emit('navigate', 'market')" class="flex-1 py-4 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold transition">Cancel</button>
            <button @click="confirmTrade" :disabled="loading" class="flex-1 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold transition shadow-lg shadow-indigo-900/40">
                {{ loading ? 'Processing...' : 'Confirm Trade' }}
            </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps(['orderData']);
const emit = defineEmits(['navigate']);
const API_URL = process.env.VUE_APP_API_URL || 'http://localhost:3000';
const loading = ref(false);
const error = ref('');

const confirmTrade = async () => {
    loading.value = true;
    try {
        const endpoint = props.orderData.type === 'BUY' ? '/api/trade/buy' : '/api/trade/sell';
        const res = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
            body: JSON.stringify({ ticker: props.orderData.ticker, quantity: props.orderData.quantity })
        });
        const data = await res.json();
        if (res.ok) {
            alert("Trade Successful!");
            emit('navigate', 'wallet');
        } else { error.value = data.error; }
    } catch (e) { error.value = "Server Connection Failed"; } finally { loading.value = false; }
};
</script>