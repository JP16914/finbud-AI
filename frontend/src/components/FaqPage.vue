<template>
  <div class="min-h-screen bg-[#0b0e14] text-white pt-24 pb-20 px-4">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-16">
        <button @click="$emit('navigate', 'home')" class="text-indigo-400 hover:text-white mb-6">← Back to Home</button>
        <h1 class="text-4xl font-bold mb-6">Help Center</h1>
        <div class="relative max-w-xl mx-auto">
          <input v-model="searchQuery" type="text" placeholder="Search questions..." class="w-full bg-[#151921] border border-slate-700 rounded-full py-4 pl-6 pr-6 focus:border-indigo-500 outline-none">
        </div>
      </div>

      <div class="space-y-4">
        <details v-for="(item, i) in filteredFaq" :key="i" class="group bg-[#151921] rounded-xl border border-slate-800 open:border-indigo-500/50 transition">
            <summary class="flex justify-between cursor-pointer p-6 font-medium text-lg list-none hover:text-indigo-400">
                <span>{{ item.question }}</span>
                <span class="group-open:rotate-180 transition">⌄</span>
            </summary>
            <div class="px-6 pb-6 text-slate-400 text-sm border-t border-slate-800/50 pt-4">{{ item.answer }}</div>
        </details>
        <div v-if="filteredFaq.length===0" class="text-center text-slate-500 py-10">No results found.</div>
      </div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable no-undef */
import { ref, computed } from 'vue';
defineEmits(['navigate']);

const searchQuery = ref("");
const faqList = [
    { question: "What is FinBud AI?", answer: "FinBud AI is a financial analytics platform using AI to predict trends." },
    { question: "Is it free?", answer: "Yes, the Starter plan is free forever." },
    { question: "Is data real-time?", answer: "Pro users get real-time data. Free users have 15m delay." },
    { question: "How to deposit?", answer: "Go to Wallet -> Deposit -> Select Card." },
    { question: "Can I withdraw?", answer: "Withdrawals are processed within 24 hours to your linked bank account." },
    { question: "Is my card safe?", answer: "We use AES-256 encryption. We never see your full card number." },
    { question: "Do you support Crypto?", answer: "Yes, major coins like BTC and ETH are supported." },
    { question: "Can I use on mobile?", answer: "Yes, the web is responsive. App coming soon." },
    { question: "What is the fee?", answer: "0.1% per trade." },
    { question: "How to contact support?", answer: "Email support@finbud.com." },
    { question: "Forgot password?", answer: "Use the 'Forgot Password' link on login page." },
    { question: "Can I cancel Pro?", answer: "Yes, cancel anytime in Settings." },
    { question: "Do you offer API?", answer: "Only for Enterprise clients." },
    { question: "What is AI Score?", answer: "A score from 0-100 indicating bullish sentiment." },
    { question: "Max deposit limit?", answer: "$50,000 per day." },
    { question: "Supported countries?", answer: "USA, UK, Canada, and Vietnam." },
    { question: "Can I short sell?", answer: "Not yet, feature coming in Q4." },
    { question: "Is there a demo mode?", answer: "Yes, enable 'Paper Trading' in settings." },
    { question: "Tax reports?", answer: "Downloadable from your Profile page." },
    { question: "Refund policy?", answer: "7-day money back guarantee for Pro." }
];

const filteredFaq = computed(() => faqList.filter(i => i.question.toLowerCase().includes(searchQuery.value.toLowerCase()) || i.answer.toLowerCase().includes(searchQuery.value.toLowerCase())));
</script>
<style scoped>details > summary { list-style: none; } details > summary::-webkit-details-marker { display: none; }</style>