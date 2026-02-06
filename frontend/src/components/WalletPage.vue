<template>
  <div class="min-h-screen bg-[#0b0e14] text-white pt-10 pb-20 px-4">
    <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div class="lg:col-span-8 space-y-8">
        <div class="bg-gradient-to-r from-indigo-900 to-slate-900 p-8 rounded-3xl border border-indigo-500/30">
            <h2 class="text-slate-400 font-medium mb-2">Total Balance</h2>
            <div class="text-5xl font-bold font-mono">${{ balance.toFixed(2) }}</div>
            <button @click="showDepositModal=true" class="mt-6 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-xl font-bold">+ Deposit</button>
        </div>
        <div>
            <div class="flex justify-between items-end mb-4"><h3 class="text-2xl font-bold">Cards</h3><button @click="showAddCardModal=true" class="text-indigo-400 font-bold">+ Add Card</button></div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div v-for="card in cards" :key="card._id" class="h-48 rounded-2xl p-6 shadow-xl border border-white/10" :class="card.brand==='Visa'?'bg-blue-800':'bg-orange-800'">
                    <div class="flex justify-between"><span class="font-bold">{{ card.bankName }}</span><span class="italic font-bold">{{ card.brand }}</span></div>
                    <div class="font-mono text-2xl mt-8 mb-4">**** **** **** {{ card.last4 }}</div>
                    <div class="text-xs uppercase">{{ card.cardHolder }} • {{ card.expiryDate }}</div>
                </div>
            </div>
        </div>
      </div>
      <div class="lg:col-span-4 bg-[#151921] rounded-3xl border border-slate-800 p-6">
        <h3 class="font-bold text-xl mb-6">Activity</h3>
        <div class="space-y-4">
            <div v-for="(tx, i) in transactions" :key="i" class="flex justify-between p-2 border-b border-slate-700">
                <div><div class="font-bold text-sm">{{ tx.type }} {{ tx.ticker!=='USD'?tx.ticker:'' }}</div><div class="text-xs text-slate-500">{{ new Date(tx.createdAt).toLocaleDateString() }}</div></div>
                <div class="font-mono font-bold" :class="tx.type==='DEPOSIT'||tx.type==='SELL'?'text-green-400':'text-white'">{{ tx.type==='DEPOSIT'||tx.type==='SELL'?'+':'-' }}${{ tx.totalAmount.toFixed(2) }}</div>
            </div>
        </div>
      </div>
    </div>

    <div v-if="showAddCardModal" class="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
        <div class="bg-[#1e232f] p-8 rounded-2xl w-full max-w-md border border-slate-700">
            <h3 class="text-2xl font-bold mb-6">Add Card</h3>
            <form @submit.prevent="handleAddCard" class="space-y-4">
                <input v-model="newCard.cardHolder" placeholder="Holder Name" required class="w-full bg-[#0b0e14] border border-slate-700 p-3 rounded-xl text-white">
                <input v-model="newCard.cardNumber" placeholder="Card Number" required class="w-full bg-[#0b0e14] border border-slate-700 p-3 rounded-xl text-white">
                <div class="grid grid-cols-2 gap-4"><input v-model="newCard.expiryDate" placeholder="MM/YY" required class="w-full bg-[#0b0e14] border border-slate-700 p-3 rounded-xl text-white"><input v-model="newCard.cvv" placeholder="CVV" required class="w-full bg-[#0b0e14] border border-slate-700 p-3 rounded-xl text-white"></div>
                <div v-if="modalError" class="text-red-500 text-center">{{ modalError }}</div>
                <button type="submit" class="w-full py-3 bg-indigo-600 rounded-xl font-bold text-white">Save</button>
                <button type="button" @click="showAddCardModal=false" class="w-full py-2 text-slate-400">Cancel</button>
            </form>
        </div>
    </div>
    
    <div v-if="showDepositModal" class="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
        <div class="bg-[#1e232f] p-8 rounded-2xl w-full max-w-md border border-slate-700">
            <h3 class="text-2xl font-bold mb-6">Deposit</h3>
            <select v-model="depositCardId" class="w-full bg-[#0b0e14] border border-slate-700 p-3 rounded-xl text-white mb-4"><option v-for="c in cards" :key="c._id" :value="c._id">{{ c.brand }} - {{ c.last4 }}</option></select>
            <input v-model.number="depositAmount" type="number" class="w-full bg-[#0b0e14] border border-slate-700 p-3 rounded-xl text-white text-2xl font-mono mb-6">
            <button @click="handleDeposit" class="w-full py-3 bg-green-600 rounded-xl font-bold text-white">Confirm</button>
            <button @click="showDepositModal=false" class="w-full py-2 text-slate-400">Cancel</button>
        </div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable no-undef */
import { ref, onMounted } from 'vue';
const API_URL = process.env.VUE_APP_API_URL || 'http://localhost:3000';
const balance = ref(0); const cards = ref([]); const transactions = ref([]);
const showAddCardModal = ref(false); const showDepositModal = ref(false);
const newCard = ref({ cardHolder: '', cardNumber: '', expiryDate: '', cvv: '' });
const depositAmount = ref(1000); const depositCardId = ref(''); const modalError = ref('');

const authFetch = async (endpoint, opt={}) => {
    const token = localStorage.getItem('token');
    return fetch(`${API_URL}${endpoint}`, { ...opt, headers: { 'Content-Type': 'application/json', 'Authorization': token } });
};
const loadData = async () => {
    try {
        const r1 = await authFetch('/api/wallet');
        if(r1.ok) { const d = await r1.json(); balance.value = d.balance; cards.value = d.cards; if(cards.value.length) depositCardId.value=cards.value[0]._id; }
        const r2 = await authFetch('/api/trade/history');
        if(r2.ok) transactions.value = await r2.json();
    } catch(e){
      console.error(e);
    }
};
const handleAddCard = async () => {
    const res = await authFetch('/api/wallet/add-card', { method: 'POST', body: JSON.stringify(newCard.value) });
    const data = await res.json();
    if(res.ok) { showAddCardModal.value=false; loadData(); newCard.value={}; } else modalError.value = data.error;
};
const handleDeposit = async () => {
    const res = await authFetch('/api/wallet/deposit', { method: 'POST', body: JSON.stringify({amount:depositAmount.value, cardId:depositCardId.value}) });
    if(res.ok) { showDepositModal.value=false; loadData(); } else alert('Error');
};
onMounted(loadData);
</script>