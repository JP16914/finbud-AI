<template>
  <div class="bg-[#0b0e14] text-white font-sans relative overflow-x-hidden scroll-smooth">
    
    <div class="relative pt-24 pb-32 overflow-hidden">
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div class="max-w-7xl mx-auto px-4 text-center relative z-10">
            <div class="inline-block px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-sm font-semibold mb-6">
                🚀 #1 AI Platform for Retail Investors
            </div>
            <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
                Stop Guessing. <br />
                Start <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Precision Trading</span>
            </h1>
            <p class="text-slate-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
                Harness the power of AI to analyze FAANG stocks, predict market movements, and manage risk like a Wall Street quant.
            </p>
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button @click="$emit('login')" class="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-indigo-500/40 transition">Start Free Trial</button>
                <button class="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-lg border border-slate-700 transition">View Demo</button>
            </div>
        </div>
    </div>

    <div class="py-20 bg-[#0f1219]">
        <div class="max-w-7xl mx-auto px-4">
            <div class="text-center mb-16">
                <h2 class="text-3xl font-bold mb-4">Why Choose FinBud AI?</h2>
                <p class="text-slate-400 max-w-2xl mx-auto">Most trading platforms just show you the price. We tell you what the price means.</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="p-8 rounded-2xl bg-[#151921] border border-slate-800 hover:border-indigo-500/50 transition duration-300">
                    <div class="text-4xl mb-4">⚡</div>
                    <h3 class="text-xl font-bold mb-2">Real-Time Speed</h3>
                    <p class="text-slate-400 text-sm">Direct connection to NASDAQ ensures you see price changes the millisecond they happen.</p>
                </div>
                <div class="p-8 rounded-2xl bg-[#151921] border border-slate-800 hover:border-indigo-500/50 transition duration-300">
                    <div class="text-4xl mb-4">🧠</div>
                    <h3 class="text-xl font-bold mb-2">AI-Driven Insights</h3>
                    <p class="text-slate-400 text-sm">Our Neural Network analyzes millions of data points to predict trend reversals with 87% accuracy.</p>
                </div>
                <div class="p-8 rounded-2xl bg-[#151921] border border-slate-800 hover:border-indigo-500/50 transition duration-300">
                    <div class="text-4xl mb-4">🔒</div>
                    <h3 class="text-xl font-bold mb-2">Bank-Level Security</h3>
                    <p class="text-slate-400 text-sm">Your data and portfolio are encrypted with AES-256 bit encryption. We never sell your data.</p>
                </div>
            </div>
        </div>
    </div>

    <div id="market" class="max-w-7xl mx-auto px-4 py-20 border-t border-slate-800">
        <h2 class="text-3xl font-bold mb-10 text-center">Live Market Overview</h2>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2 bg-[#151921] p-6 rounded-2xl border border-slate-800">
                <h3 class="font-bold mb-4 flex items-center gap-2">🔥 AAPL Analysis (Live)</h3>
                <LandingChart :stockData="fullHistoryData" />
            </div>
            <div class="bg-[#151921] p-6 rounded-2xl border border-slate-800 h-[400px] overflow-y-auto">
                <h3 class="font-bold mb-4 sticky top-0 bg-[#151921] pb-2 border-b border-slate-700">Top Movers</h3>
                <div v-if="loading" class="text-center py-10 text-slate-500">Loading Data...</div>
                <div v-else class="space-y-3">
                    <div v-for="(stock, ticker) in displayedStocks" :key="ticker" class="flex justify-between items-center text-sm p-2 hover:bg-slate-800 rounded transition cursor-pointer">
                        <span class="font-bold">{{ ticker }}</span>
                        <div class="text-right">
                            <div class="font-mono">${{ stock.Close }}</div>
                            <span :class="stock.Daily_Return >= 0 ? 'text-green-400' : 'text-red-400'">{{ stock.Daily_Return }}%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="py-20 bg-[#0b0e14] relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-purple-900/10 skew-y-3"></div>
        <div class="max-w-7xl mx-auto px-4 relative z-10">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 class="text-3xl md:text-4xl font-bold mb-6">Built for Every Trader</h2>
                    <div class="space-y-8">
                        <div>
                            <h3 class="text-xl font-bold text-white mb-2">For Beginners</h3>
                            <p class="text-slate-400">Simple interface, educational pop-ups, and risk-free paper trading mode to learn the ropes.</p>
                        </div>
                        <div>
                            <h3 class="text-xl font-bold text-white mb-2">For Day Traders</h3>
                            <p class="text-slate-400">Hotkeys, Level 2 data, and customizable multi-chart layouts for rapid execution.</p>
                        </div>
                        <div>
                            <h3 class="text-xl font-bold text-white mb-2">For Long-term Investors</h3>
                            <p class="text-slate-400">Fundamental analysis tools, dividend tracking, and automated portfolio rebalancing.</p>
                        </div>
                    </div>
                </div>
                <div class="relative">
                    <div class="absolute inset-0 bg-indigo-500 blur-[100px] opacity-20"></div>
                    <div class="bg-[#151921] border border-slate-700 rounded-2xl p-6 relative shadow-2xl transform rotate-3 hover:rotate-0 transition duration-500">
                        <div class="flex items-center gap-4 mb-6">
                            <div class="w-12 h-12 rounded-full bg-slate-700"></div>
                            <div>
                                <div class="h-4 w-32 bg-slate-700 rounded mb-2"></div>
                                <div class="h-3 w-20 bg-slate-800 rounded"></div>
                            </div>
                        </div>
                        <div class="space-y-3">
                            <div class="h-20 w-full bg-gradient-to-r from-green-500/20 to-transparent rounded-lg border-l-4 border-green-500 p-4">
                                <div class="text-green-400 font-bold">+124.5% Portfolio Growth</div>
                                <div class="text-xs text-slate-400 mt-1">Since joining FinBud AI</div>
                            </div>
                             <div class="h-20 w-full bg-slate-800/50 rounded-lg p-4">
                                <div class="text-slate-300 font-bold">Risk Analysis</div>
                                <div class="w-full bg-slate-700 h-2 rounded-full mt-2">
                                    <div class="bg-blue-500 h-2 rounded-full w-[70%]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="pricing" class="py-20 border-t border-slate-800">
        <div class="max-w-7xl mx-auto px-4 text-center">
            <h2 class="text-3xl font-bold mb-10">Simple Pricing</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <div class="p-8 rounded-2xl bg-[#151921] border border-slate-800">
                    <h3 class="text-xl font-bold text-slate-300">Starter</h3>
                    <div class="my-4"><span class="text-4xl font-bold text-white">$0</span>/mo</div>
                    <ul class="space-y-3 mb-8 text-sm text-slate-300 text-left">
                        <li>✅ Delayed Data (15m)</li>
                        <li>✅ 5 Stocks Watchlist</li>
                    </ul>
                    <button class="w-full py-3 rounded-xl border border-slate-600 hover:bg-slate-700 font-bold transition">Sign Up Free</button>
                </div>
                <div class="p-8 rounded-2xl bg-[#1e232f] border-2 border-indigo-600 relative transform md:-translate-y-4">
                    <div class="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">POPULAR</div>
                    <h3 class="text-xl font-bold text-white">Pro</h3>
                    <div class="my-4"><span class="text-4xl font-bold text-white">$29</span>/mo</div>
                    <ul class="space-y-3 mb-8 text-sm text-slate-200 text-left">
                        <li>✅ <span class="text-indigo-400 font-bold">Real-time Data</span></li>
                        <li>✅ AI Predictions</li>
                        <li>✅ Unlimited Watchlist</li>
                    </ul>
                    <button @click="$emit('login')" class="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition">Get Pro</button>
                </div>
                <div class="p-8 rounded-2xl bg-[#151921] border border-slate-800">
                    <h3 class="text-xl font-bold text-slate-300">Enterprise</h3>
                    <div class="my-4"><span class="text-4xl font-bold text-white">Custom</span></div>
                     <ul class="space-y-3 mb-8 text-sm text-slate-300 text-left">
                        <li>✅ API Access</li>
                        <li>✅ Dedicated Support</li>
                    </ul>
                    <button class="w-full py-3 rounded-xl border border-slate-600 hover:bg-slate-700 font-bold transition">Contact Sales</button>
                </div>
            </div>
        </div>
    </div>

    <div id="faq" class="py-24 bg-[#0f1219]">
        <div class="max-w-3xl mx-auto px-4">
            <h2 class="text-4xl font-bold text-center mb-4">Frequently Asked Questions</h2>
            <p class="text-slate-400 text-center mb-12">Everything you need to know about FinBud AI.</p>
            
            <div class="space-y-4">
                <details v-for="(item, index) in faqList.slice(0, 5)" :key="index" class="group bg-[#151921] rounded-xl border border-slate-800 open:border-indigo-500/50 transition duration-300">
                    <summary class="flex justify-between items-center cursor-pointer p-6 font-medium text-lg list-none text-slate-200 hover:text-white">
                        <span>{{ item.question }}</span>
                        <span class="transform group-open:rotate-180 transition duration-300 text-indigo-500">⌄</span>
                    </summary>
                    <div class="px-6 pb-6 text-slate-400 text-sm leading-relaxed border-t border-slate-800/50 pt-4">
                        {{ item.answer }}
                    </div>
                </details>
            </div>

            <div class="text-center mt-10">
                <button @click="$emit('navigate', 'faq')" class="text-indigo-400 hover:text-white font-bold border-b border-indigo-500 hover:border-white pb-1 transition">
                    View All 20+ Questions →
                </button>
            </div>
        </div>
    </div>

    <div class="py-24 text-center bg-indigo-900/20 border-t border-indigo-900/50">
        <h2 class="text-3xl md:text-5xl font-bold mb-6">Ready to beat the market?</h2>
        <p class="text-slate-400 mb-8 text-lg">Join 50,000+ investors utilizing AI today.</p>
        <button @click="$emit('login')" class="px-10 py-5 bg-white text-indigo-900 hover:bg-slate-100 rounded-full font-bold text-xl shadow-[0_0_30px_rgba(255,255,255,0.3)] transition transform hover:scale-105">
            Create Free Account
        </button>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import LandingChart from './LandingChart.vue';

defineEmits(['login', 'navigate']);

// --- DATA LOGIC ---
const summaryStocks = ref({});
const fullHistoryData = ref([]);
const loading = ref(true);

const displayedStocks = computed(() => {
    const keys = Object.keys(summaryStocks.value).slice(0, 10);
    const result = {};
    keys.forEach(k => result[k] = summaryStocks.value[k]);
    return result;
});

// --- FAQ DATA (20 Questions) ---
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

onMounted(async () => {
    try {
        const resSummary = await fetch('http://localhost:3000/api/stocks');
        if (resSummary.ok) summaryStocks.value = await resSummary.json();
        const resHistory = await fetch('http://localhost:3000/api/stocks/AAPL');
        if (resHistory.ok) fullHistoryData.value = await resHistory.json();
    } catch (e) {
        console.error("Data load error", e);
    } finally {
        loading.value = false;
    }
});
</script>

<style scoped>
/* Hiệu ứng mượt mà khi mở FAQ */
details > summary {
  list-style: none;
}
details > summary::-webkit-details-marker {
  display: none;
}
</style>