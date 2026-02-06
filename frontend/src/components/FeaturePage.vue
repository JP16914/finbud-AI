<template>
  <div class="bg-[#0b0e14] text-white font-sans pb-20">
    <div class="pt-24 pb-16 text-center max-w-4xl mx-auto px-4">
      <h1 class="text-5xl font-extrabold mb-6">Built for the Modern Trader</h1>
      <p class="text-xl text-slate-400">Why thousands of investors trust FinBud AI.</p>
    </div>
    <div class="py-20 bg-[#0f1219] border-y border-slate-800">
      <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <div class="text-4xl mb-4">🛡️</div>
          <h2 class="text-3xl font-bold mb-4">Bank-Grade Security</h2>
          <p class="text-slate-400 mb-6">AES-256 Bit Encryption ensuring your assets are safe.</p>
        </div>
        <div class="bg-[#151921] h-64 rounded-2xl border border-slate-700 flex items-center justify-center text-slate-600 font-bold">Security Visualization</div>
      </div>
    </div>
    <div class="text-center pt-20">
        <button @click="$emit('navigate', 'market')" class="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold transition">Check the Market Now</button>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable no-undef */
defineEmits(['navigate']);
</script>