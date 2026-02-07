<template>
  <div class="min-h-screen bg-[#0b0e14] text-white pt-10 pb-20 px-4 md:px-8 font-sans">
    
    <div class="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row justify-between items-end gap-4">
      <div>
        <h1 class="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">My Wallet</h1>
        <p class="text-slate-400 mt-2">Manage your funds and payment methods securely.</p>
      </div>
      <div class="flex gap-4">
         <div class="bg-[#151921] border border-slate-800 px-4 py-2 rounded-xl flex items-center gap-3">
             <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
             <span class="text-sm text-slate-400">Status: <span class="text-white font-bold">Active</span></span>
         </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      <div class="lg:col-span-8 space-y-8">
        
        <div class="relative overflow-hidden rounded-3xl p-8 shadow-2xl transition-all hover:shadow-indigo-900/20 group">
            <div class="absolute inset-0 bg-gradient-to-br from-indigo-600 to-violet-900 opacity-90"></div>
            <div class="absolute -right-10 -top-10 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition"></div>
            
            <div class="relative z-10">
                <div class="flex justify-between items-start">
                    <div>
                        <h2 class="text-indigo-100 font-medium mb-1 text-sm uppercase tracking-wider">Total Balance</h2>
                        <div class="text-5xl md:text-6xl font-bold font-mono tracking-tight text-white mb-2">
                            ${{ balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
                        </div>
                        <div class="flex items-center gap-2 text-indigo-200 text-sm bg-white/10 w-fit px-3 py-1 rounded-full backdrop-blur-md">
                            <span>📈</span> <span>Available for trading</span>
                        </div>
                    </div>
                    <div class="hidden md:block text-5xl opacity-50">💰</div>
                </div>

                <div class="mt-8 flex gap-4">
                    <button @click="showDepositModal = true" class="bg-white text-indigo-900 px-8 py-3 rounded-xl font-bold hover:bg-indigo-50 transition shadow-lg flex items-center gap-2">
                        <span class="text-lg">+</span> Deposit Funds
                    </button>
                    <button class="bg-indigo-800/50 text-white border border-indigo-400/30 px-8 py-3 rounded-xl font-bold hover:bg-indigo-800 transition backdrop-blur-md">
                        Withdraw
                    </button>
                </div>
            </div>
        </div>

        <div>
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-2xl font-bold flex items-center gap-2">
                    <span>💳</span> Linked Cards
                </h3>
                <button @click="showAddCardModal = true" class="text-sm font-bold text-indigo-400 hover:text-white transition bg-[#151921] px-4 py-2 rounded-lg border border-slate-700 hover:border-indigo-500">
                    + Add New Card
                </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div v-for="card in cards" :key="card._id" 
                     class="relative h-56 rounded-2xl p-6 text-white shadow-xl transition-transform hover:-translate-y-2 cursor-pointer border border-white/10 overflow-hidden group"
                     :class="getCardGradient(card.brand)">
                    
                    <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
                    <div class="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl transform -translate-x-5 translate-y-5"></div>

                    <div class="relative z-10 flex flex-col h-full justify-between">
                        <div class="flex justify-between items-start">
                            <div class="font-bold text-lg tracking-wider opacity-90">{{ card.bankName }}</div>
                            <div class="italic font-serif text-xl font-bold opacity-80">{{ card.brand }}</div>
                        </div>
                        
                        <div class="flex items-center gap-4">
                            <div class="w-10 h-7 bg-yellow-500/20 rounded-md border border-yellow-400/40 flex items-center justify-center">
                                <div class="w-6 h-4 border border-yellow-400/60 rounded-sm"></div>
                            </div>
                            <div class="text-xl">
                                <span class="tracking-widest opacity-60">•••• •••• •••• </span>
                                <span class="font-mono font-bold text-2xl">{{ card.last4 }}</span>
                            </div>
                        </div>

                        <div class="flex justify-between text-xs uppercase tracking-widest opacity-75">
                            <div>
                                <div class="text-[10px] opacity-70">Card Holder</div>
                                <div class="font-bold">{{ card.cardHolder }}</div>
                            </div>
                            <div class="text-right">
                                <div class="text-[10px] opacity-70">Expires</div>
                                <div class="font-bold">{{ card.expiryDate }}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <button v-if="cards.length === 0" @click="showAddCardModal = true" class="h-56 border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-2xl flex flex-col items-center justify-center text-slate-500 hover:text-indigo-400 hover:bg-[#151921] transition group">
                    <div class="w-12 h-12 rounded-full bg-slate-800 group-hover:bg-indigo-500/20 flex items-center justify-center mb-3 transition">
                        <span class="text-2xl group-hover:scale-110 transition">+</span>
                    </div>
                    <div class="font-bold">Link your first card</div>
                    <div class="text-xs opacity-60 mt-1">Visa or Mastercard</div>
                </button>
            </div>
        </div>
      </div>

      <div class="lg:col-span-4 space-y-6">
        <div class="bg-[#151921] rounded-3xl border border-slate-800 p-6 h-fit sticky top-24">
            <div class="flex justify-between items-center mb-6">
                <h3 class="font-bold text-xl">Recent Activity</h3>
                <button class="text-xs text-indigo-400 hover:underline">View All</button>
            </div>
            
            <div class="space-y-4">
                <div v-for="(tx, i) in transactions.slice(0, 5)" :key="i" class="flex justify-between items-center p-3 hover:bg-white/5 rounded-xl transition cursor-default group">
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition group-hover:scale-110"
                             :class="getTransactionStyle(tx.type).bg">
                            {{ getTransactionStyle(tx.type).icon }}
                        </div>
                        <div>
                            <div class="font-bold text-sm text-slate-200">
                                {{ getTransactionText(tx) }}
                            </div>
                            <div class="text-xs text-slate-500">{{ formatDate(tx.createdAt) }}</div>
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="font-mono font-bold" :class="tx.type === 'DEPOSIT' || tx.type === 'SELL' ? 'text-green-400' : 'text-white'">
                            {{ tx.type === 'DEPOSIT' || tx.type === 'SELL' ? '+' : '-' }}${{ tx.totalAmount.toFixed(2) }}
                        </div>
                        <div class="text-[10px] uppercase font-bold" :class="tx.status === 'COMPLETED' ? 'text-green-500' : 'text-orange-500'">
                            {{ tx.status }}
                        </div>
                    </div>
                </div>

                <div v-if="transactions.length === 0" class="text-center py-10">
                    <div class="text-4xl mb-3 opacity-30">📜</div>
                    <div class="text-slate-500 text-sm">No transactions yet.</div>
                </div>
            </div>
        </div>

        <div class="bg-indigo-900/20 border border-indigo-500/30 rounded-2xl p-4 flex items-center gap-4">
            <div class="text-2xl">🛡️</div>
            <div>
                <h4 class="font-bold text-sm text-indigo-200">Bank-Grade Security</h4>
                <p class="text-xs text-indigo-300/70">Your payment data is encrypted with AES-256.</p>
            </div>
        </div>
      </div>

    </div>

    <div v-if="showAddCardModal" class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div class="bg-[#1e232f] p-8 rounded-3xl w-full max-w-md border border-slate-700 shadow-2xl relative">
            <button @click="showAddCardModal = false" class="absolute top-4 right-4 text-slate-400 hover:text-white">✕</button>
            <h3 class="text-2xl font-bold mb-1">Add New Card</h3>
            <p class="text-slate-400 text-sm mb-6">Enter your card details securely.</p>
            
            <form @submit.prevent="handleAddCard" class="space-y-4">
                <div>
                    <label class="text-xs text-slate-400 ml-1 mb-1 block">Card Holder Name</label>
                    <input v-model="newCard.cardHolder" type="text" placeholder="ALEX JOHNSON" required class="w-full bg-[#0b0e14] border border-slate-700 p-3 rounded-xl focus:border-indigo-500 outline-none text-white uppercase placeholder:normal-case">
                </div>
                <div>
                    <label class="text-xs text-slate-400 ml-1 mb-1 block">Card Number</label>
                    <input v-model="newCard.cardNumber" type="text" placeholder="0000 0000 0000 0000" required class="w-full bg-[#0b0e14] border border-slate-700 p-3 rounded-xl focus:border-indigo-500 outline-none text-white font-mono">
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="text-xs text-slate-400 ml-1 mb-1 block">Expiry</label>
                        <input v-model="newCard.expiryDate" type="text" placeholder="MM/YY" required class="w-full bg-[#0b0e14] border border-slate-700 p-3 rounded-xl focus:border-indigo-500 outline-none text-white text-center">
                    </div>
                    <div>
                        <label class="text-xs text-slate-400 ml-1 mb-1 block">CVV</label>
                        <input v-model="newCard.cvv" type="password" placeholder="123" required class="w-full bg-[#0b0e14] border border-slate-700 p-3 rounded-xl focus:border-indigo-500 outline-none text-white text-center">
                    </div>
                </div>
                
                <div v-if="modalError" class="bg-red-500/10 border border-red-500/50 text-red-500 text-sm text-center p-3 rounded-xl mt-2">{{ modalError }}</div>
                
                <button type="submit" class="w-full py-4 mt-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition shadow-lg shadow-indigo-900/20">
                    Save Card
                </button>
            </form>
        </div>
    </div>

    <div v-if="showDepositModal" class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div class="bg-[#1e232f] p-8 rounded-3xl w-full max-w-md border border-slate-700 shadow-2xl relative">
            <button @click="showDepositModal = false" class="absolute top-4 right-4 text-slate-400 hover:text-white">✕</button>
            <h3 class="text-2xl font-bold mb-6">Deposit Funds</h3>
            
            <div class="mb-6 bg-[#0b0e14] p-4 rounded-xl border border-slate-700 text-center">
                <label class="text-xs text-slate-400 block mb-2 uppercase tracking-wider">Amount to Deposit</label>
                <div class="flex items-center justify-center">
                    <span class="text-2xl text-slate-500 mr-2">$</span>
                    <input v-model.number="depositAmount" type="number" min="1" class="bg-transparent text-4xl font-bold text-white outline-none w-32 text-center" placeholder="0">
                </div>
            </div>

            <div class="mb-6">
                <label class="text-sm text-slate-400 block mb-2">Select Payment Method</label>
                <select v-model="depositCardId" class="w-full bg-[#0b0e14] border border-slate-700 p-3 rounded-xl outline-none text-white cursor-pointer">
                    <option v-for="card in cards" :key="card._id" :value="card._id">
                        {{ card.brand }} •••• {{ card.last4 }}
                    </option>
                </select>
            </div>
            
            <button @click="handleDeposit" class="w-full py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition shadow-lg shadow-green-900/20">
                Confirm Deposit
            </button>
        </div>
    </div>

  </div>
</template>

<script setup>
/* eslint-disable no-undef */
import { ref, onMounted } from 'vue';

const API_URL = process.env.VUE_APP_API_URL || 'http://localhost:3000';
const balance = ref(0);
const cards = ref([]);
const transactions = ref([]);
const showAddCardModal = ref(false);
const showDepositModal = ref(false);
const modalError = ref('');

// Form Data
const newCard = ref({ cardHolder: '', cardNumber: '', expiryDate: '', cvv: '' });
const depositAmount = ref(1000);
const depositCardId = ref('');

// --- HELPERS CHO UI ĐẸP HƠN ---
const getCardGradient = (brand) => {
    if (brand === 'Visa') return 'bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900';
    if (brand === 'MasterCard') return 'bg-gradient-to-br from-orange-700 via-red-800 to-rose-900';
    return 'bg-gradient-to-br from-slate-700 to-slate-900';
};

const getTransactionStyle = (type) => {
    if (type === 'DEPOSIT') return { icon: '↓', bg: 'bg-green-500/20 text-green-400' };
    if (type === 'BUY') return { icon: 'B', bg: 'bg-blue-500/20 text-blue-400' };
    if (type === 'SELL') return { icon: 'S', bg: 'bg-orange-500/20 text-orange-400' };
    return { icon: '?', bg: 'bg-slate-700 text-slate-400' };
};

const getTransactionText = (tx) => {
    if (tx.type === 'DEPOSIT') return 'Funds Deposited';
    if (tx.type === 'BUY') return `Bought ${tx.ticker}`;
    if (tx.type === 'SELL') return `Sold ${tx.ticker}`;
    return 'Unknown Transaction';
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
};

// --- LOGIC GỌI API ---
const authFetch = async (endpoint, options = {}) => {
    const token = localStorage.getItem('token');
    const headers = { 'Content-Type': 'application/json', 'Authorization': token, ...options.headers };
    return fetch(`${API_URL}${endpoint}`, { ...options, headers });
};

const loadData = async () => {
    try {
        // 1. Get Wallet
        const resWallet = await authFetch('/api/wallet');
        if(resWallet.ok) {
            const data = await resWallet.json();
            balance.value = data.balance;
            cards.value = data.cards;
            if(cards.value.length > 0) depositCardId.value = cards.value[0]._id;
        }
        // 2. Get History
        const resHistory = await authFetch('/api/trade/history');
        if(resHistory.ok) transactions.value = await resHistory.json();
    } catch(e) { console.error(e); }
};

const handleAddCard = async () => {
    modalError.value = '';
    try {
        const res = await authFetch('/api/wallet/add-card', {
            method: 'POST', body: JSON.stringify(newCard.value)
        });
        const data = await res.json();
        if(res.ok) {
            showAddCardModal.value = false;
            loadData();
            alert('Card Linked Successfully!');
            newCard.value = { cardHolder: '', cardNumber: '', expiryDate: '', cvv: '' };
        } else {
            modalError.value = data.error;
        }
    } catch(e) { 
        console.error(e);
        modalError.value = "Connection Error"; 
    }
};

const handleDeposit = async () => {
    try {
        const res = await authFetch('/api/wallet/deposit', {
            method: 'POST', body: JSON.stringify({ amount: depositAmount.value, cardId: depositCardId.value })
        });
        if(res.ok) {
            showDepositModal.value = false;
            loadData();
            alert('Deposit Successful!');
        } else {
            const data = await res.json();
            alert(data.error);
        }
    } catch(e) { 
        console.error(e);
        alert("Error"); 
    }
};

onMounted(loadData);
</script>