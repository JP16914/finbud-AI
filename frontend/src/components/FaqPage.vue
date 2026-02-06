<template>
  <div class="min-h-screen bg-[#0b0e14] text-white pt-24 pb-20 px-4">
    <div class="max-w-4xl mx-auto">
      
      <div class="text-center mb-16">
        <button @click="$emit('navigate', 'home')" class="text-indigo-400 hover:text-indigo-300 mb-6 flex items-center justify-center gap-2 transition">
          ← Back to Home
        </button>
        <h1 class="text-4xl md:text-5xl font-bold mb-6">Help Center</h1>
        <p class="text-slate-400 text-lg mb-8">Search our knowledge base or browse categories below.</p>
        
        <div class="relative max-w-xl mx-auto">
          <input v-model="searchQuery" type="text" placeholder="e.g., How to upgrade plan?" 
                 class="w-full bg-[#151921] border border-slate-700 rounded-full py-4 pl-12 pr-6 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition">
          <span class="absolute left-4 top-4 text-slate-500">🔍</span>
        </div>
      </div>

      <div class="space-y-4">
        <div v-if="filteredFaq.length === 0" class="text-center text-slate-500 py-10">
            No results found for "{{ searchQuery }}"
        </div>

        <details v-for="(item, index) in filteredFaq" :key="index" class="group bg-[#151921] rounded-xl border border-slate-800 open:border-indigo-500/50 transition duration-300">
            <summary class="flex justify-between items-center cursor-pointer p-6 font-medium text-lg list-none text-slate-200 hover:text-white">
                <span>{{ item.question }}</span>
                <span class="transform group-open:rotate-180 transition duration-300 text-indigo-500">⌄</span>
            </summary>
            <div class="px-6 pb-6 text-slate-400 text-sm leading-relaxed border-t border-slate-800/50 pt-4">
                {{ item.answer }}
            </div>
        </details>
      </div>

      <div class="mt-20 text-center border-t border-slate-800 pt-10">
        <p class="text-slate-400 mb-4">Still have questions?</p>
        <button class="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold transition">Contact Support</button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

defineEmits(['navigate']);

const searchQuery = ref("");

// Full list 20 câu hỏi
const faqList = [
    { question: "What is FinBud AI?", answer: "FinBud AI is an advanced financial analytics platform that uses artificial intelligence to predict stock market trends and help retail investors make data-driven decisions." },
    { question: "Is FinBud AI free to use?", answer: "Yes, we offer a 'Starter' plan that is completely free forever. It includes delayed market data and basic charting tools." },
    { question: "How accurate are the AI predictions?", answer: "Our models have shown an 87% accuracy rate in predicting trend reversals over a 48-hour period in backtesting environments." },
    { question: "Is the market data real-time?", answer: "Real-time data from NASDAQ and NYSE is available on our Pro and Enterprise plans. The free plan has a 15-minute delay." },
    { question: "Can I trade directly on FinBud?", answer: "Not yet. Currently, we are an analytics platform. However, we are integrating with major brokers like Robinhood and Interactive Brokers in Q4 2026." },
    { question: "Is my data secure?", answer: "Absolutely. We use bank-grade AES-256 encryption and never share your personal financial data with third parties." },
    { question: "Do you support cryptocurrency?", answer: "Yes, we support major cryptocurrencies including Bitcoin, Ethereum, and Solana with real-time volatility tracking." },
    { question: "Can I use FinBud on mobile?", answer: "Yes! Our web platform is fully responsive, and we have dedicated iOS and Android apps available for download." },
    { question: "What payment methods do you accept?", answer: "We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and even Bitcoin for Pro subscriptions." },
    { question: "Can I cancel my subscription anytime?", answer: "Yes, there are no long-term contracts. You can cancel your subscription instantly from your account settings." },
    { question: "Do you offer API access?", answer: "API access is available exclusively for our Enterprise clients. Please contact sales for documentation." },
    { question: "Is this platform suitable for beginners?", answer: "Yes, we have a dedicated 'Learn' mode that explains complex terms and offers a paper trading simulator." },
    { question: "What stocks are covered?", answer: "We cover all stocks listed on US exchanges (NYSE, NASDAQ) and major ETFs. International markets are coming soon." },
    { question: "Does FinBud offer tax reporting?", answer: "We provide exportable transaction reports compatible with TurboTax and other accounting software." },
    { question: "How do I contact support?", answer: "Pro users get 24/7 live chat support. Free users can access our extensive help center or email support with a 24-hour response time." },
    { question: "Are there alerts?", answer: "Yes, you can set unlimited price alerts and AI-trigger alerts (e.g., 'Notify me when RSI < 30') via SMS or Email." },
    { question: "Can I share my charts?", answer: "Yes, FinBud has built-in social features allowing you to share charts and analysis directly to Twitter or our internal community feed." },
    { question: "What chart indicators are available?", answer: "We support over 100+ technical indicators including RSI, MACD, Bollinger Bands, Ichimoku Cloud, and custom scripts." },
    { question: "Is there a limit to my portfolio size?", answer: "No, you can track a portfolio of any value. However, the number of individual tickers you can watch depends on your plan." },
    { question: "Do you offer a refund policy?", answer: "We offer a 7-day money-back guarantee for all new Pro subscriptions if you are not satisfied." }
];

// Logic tìm kiếm
const filteredFaq = computed(() => {
  return faqList.filter(item => 
    item.question.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
    item.answer.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<style scoped>
details > summary { list-style: none; }
details > summary::-webkit-details-marker { display: none; }
</style>