<template>
  <div class="bg-[#0b0e14] text-white min-h-screen pt-24 pb-20">
    
    <div class="text-center max-w-3xl mx-auto px-4 mb-16">
      <h1 class="text-5xl font-bold mb-6">Plans for Every Trader</h1>
      <p class="text-slate-400 text-xl">Transparent pricing. No hidden fees. Cancel anytime.</p>
    </div>

    <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div class="p-8 rounded-2xl bg-[#151921] border border-slate-800 flex flex-col">
            <h3 class="text-xl font-bold text-slate-300">Starter</h3>
            <div class="my-4"><span class="text-4xl font-bold text-white">$0</span>/mo</div>
            <p class="text-slate-500 mb-6 flex-grow">Best for beginners learning the ropes.</p>
            <button class="w-full py-3 rounded-xl border border-slate-600 hover:bg-slate-700 font-bold transition mt-auto">Get Started</button>
        </div>

        <div class="p-8 rounded-2xl bg-[#1e232f] border-2 border-indigo-600 relative flex flex-col transform md:-translate-y-4 shadow-2xl shadow-indigo-900/20">
            <div class="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">POPULAR</div>
            <h3 class="text-xl font-bold text-white">Pro Trader</h3>
            <div class="my-4"><span class="text-4xl font-bold text-white">$29</span>/mo</div>
            <p class="text-slate-400 mb-6 flex-grow">For serious investors needing real-time edge.</p>
            <button class="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition mt-auto">Upgrade Now</button>
        </div>

        <div class="p-8 rounded-2xl bg-[#151921] border border-slate-800 flex flex-col">
            <h3 class="text-xl font-bold text-slate-300">Enterprise</h3>
            <div class="my-4"><span class="text-4xl font-bold text-white">Custom</span></div>
            <p class="text-slate-500 mb-6 flex-grow">For funds managing >$1M assets.</p>
            <button class="w-full py-3 rounded-xl border border-slate-600 hover:bg-slate-700 font-bold transition mt-auto">Contact Sales</button>
        </div>
    </div>

    <div class="max-w-5xl mx-auto px-4">
        <h2 class="text-3xl font-bold mb-10 text-center">Feature Comparison</h2>
        <div class="bg-[#151921] rounded-2xl border border-slate-800 overflow-hidden">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-slate-800/50 text-slate-300">
                        <th class="p-4 border-b border-slate-700 w-1/3">Features</th>
                        <th class="p-4 border-b border-slate-700 text-center">Starter</th>
                        <th class="p-4 border-b border-slate-700 text-center text-indigo-400 font-bold">Pro</th>
                        <th class="p-4 border-b border-slate-700 text-center">Enterprise</th>
                    </tr>
                </thead>
                <tbody class="text-sm text-slate-400">
                    <tr><td colspan="4" class="p-4 bg-slate-800/20 font-bold text-white">Market Data</td></tr>
                    <tr>
                        <td class="p-4 border-b border-slate-800">Real-time Quotes</td>
                        <td class="p-4 border-b border-slate-800 text-center">Delayed (15m)</td>
                        <td class="p-4 border-b border-slate-800 text-center text-white">✅ NASDAQ/NYSE</td>
                        <td class="p-4 border-b border-slate-800 text-center text-white">✅ All Global</td>
                    </tr>
                    <tr>
                        <td class="p-4 border-b border-slate-800">Level 2 Data (Order Book)</td>
                        <td class="p-4 border-b border-slate-800 text-center">❌</td>
                        <td class="p-4 border-b border-slate-800 text-center text-white">✅ Included</td>
                        <td class="p-4 border-b border-slate-800 text-center text-white">✅ Included</td>
                    </tr>
                    
                    <tr><td colspan="4" class="p-4 bg-slate-800/20 font-bold text-white">AI Analysis</td></tr>
                    <tr>
                        <td class="p-4 border-b border-slate-800">Sentiment Score</td>
                        <td class="p-4 border-b border-slate-800 text-center">Basic</td>
                        <td class="p-4 border-b border-slate-800 text-center text-white">Advanced</td>
                        <td class="p-4 border-b border-slate-800 text-center text-white">Custom Models</td>
                    </tr>
                    <tr>
                        <td class="p-4 border-b border-slate-800">Predictive Alerts</td>
                        <td class="p-4 border-b border-slate-800 text-center">5 / month</td>
                        <td class="p-4 border-b border-slate-800 text-center text-white">Unlimited</td>
                        <td class="p-4 border-b border-slate-800 text-center text-white">Unlimited + API</td>
                    </tr>

                    <tr><td colspan="4" class="p-4 bg-slate-800/20 font-bold text-white">Support</td></tr>
                    <tr>
                        <td class="p-4 border-b border-slate-800">Customer Service</td>
                        <td class="p-4 border-b border-slate-800 text-center">Email</td>
                        <td class="p-4 border-b border-slate-800 text-center text-white">Priority Chat</td>
                        <td class="p-4 border-b border-slate-800 text-center text-white">Dedicated Agent</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

  </div>
</template>

<script setup>
/* eslint-disable no-undef */
// Logic trang pricing nếu cần
</script>