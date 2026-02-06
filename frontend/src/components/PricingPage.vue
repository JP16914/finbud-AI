<template>
  <div id="pricing" class="bg-[#0b0e14] text-white min-h-screen pt-24 pb-20">
    <div class="text-center max-w-3xl mx-auto px-4 mb-16">
      <h1 class="text-5xl font-bold mb-6">Simple Pricing</h1>
      <p class="text-slate-400 text-xl">Start for free, upgrade as you grow.</p>
    </div>

    <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div class="p-8 rounded-2xl bg-[#151921] border border-slate-800">
            <h3 class="text-xl font-bold text-slate-300">Starter</h3>
            <div class="my-4"><span class="text-4xl font-bold text-white">$0</span>/mo</div>
            <p class="text-slate-500 mb-6">For beginners.</p>
            <button class="w-full py-3 rounded-xl border border-slate-600 hover:bg-slate-700 font-bold transition">Current Plan</button>
        </div>

        <div class="p-8 rounded-2xl bg-[#1e232f] border-2 border-indigo-600 relative transform md:-translate-y-4">
            <div class="absolute top-0 right-0 bg-indigo-600 text-white text-xs px-3 py-1 rounded-bl-xl font-bold">POPULAR</div>
            <h3 class="text-xl font-bold text-white">Pro Trader</h3>
            <div class="my-4"><span class="text-4xl font-bold text-white">$29</span>/mo</div>
            <p class="text-slate-400 mb-6">Real-time data & AI.</p>
            <button class="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition">Upgrade</button>
        </div>

        <div class="p-8 rounded-2xl bg-[#151921] border border-slate-800">
            <h3 class="text-xl font-bold text-slate-300">Enterprise</h3>
            <div class="my-4"><span class="text-4xl font-bold text-white">Custom</span></div>
            <p class="text-slate-500 mb-6">For funds.</p>
            <button class="w-full py-3 rounded-xl border border-slate-600 hover:bg-slate-700 font-bold transition">Contact Sales</button>
        </div>
    </div>

    <div class="max-w-5xl mx-auto px-4">
        <h2 class="text-3xl font-bold mb-10 text-center">Feature Comparison</h2>
        <div class="bg-[#151921] rounded-2xl border border-slate-800 overflow-hidden">
            <table class="w-full text-left">
                <thead>
                    <tr class="bg-slate-800/50 text-slate-300">
                        <th class="p-4 w-1/3">Feature</th>
                        <th class="p-4 text-center">Starter</th>
                        <th class="p-4 text-center text-indigo-400">Pro</th>
                        <th class="p-4 text-center">Enterprise</th>
                    </tr>
                </thead>
                <tbody class="text-sm text-slate-400">
                    <tr><td class="p-4 border-b border-slate-800">Real-time Data</td><td class="p-4 border-b border-slate-800 text-center">Delayed</td><td class="p-4 border-b border-slate-800 text-center text-white">✅</td><td class="p-4 border-b border-slate-800 text-center text-white">✅</td></tr>
                    <tr><td class="p-4 border-b border-slate-800">AI Alerts</td><td class="p-4 border-b border-slate-800 text-center">5/mo</td><td class="p-4 border-b border-slate-800 text-center text-white">Unlimited</td><td class="p-4 border-b border-slate-800 text-center text-white">Unlimited</td></tr>
                    <tr><td class="p-4 border-b border-slate-800">API Access</td><td class="p-4 border-b border-slate-800 text-center">❌</td><td class="p-4 border-b border-slate-800 text-center">❌</td><td class="p-4 border-b border-slate-800 text-center text-white">✅</td></tr>
                </tbody>
            </table>
        </div>
    </div>
  </div>
</template>

<script setup></script>