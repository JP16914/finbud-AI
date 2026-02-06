<template>
  <header class="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      
      <div class="flex items-center gap-2 cursor-pointer" @click="$emit('navigate', 'home')">
        <div class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">F</div>
        <h1 class="text-2xl font-bold text-slate-800 tracking-tight">FinBud <span class="text-indigo-600">AI</span></h1>
      </div>

      <nav class="hidden md:flex gap-8 text-sm font-medium text-slate-600">
        <button @click="$emit('navigate', 'home')" class="hover:text-indigo-600 transition">Home</button>
        <button @click="$emit('navigate', 'market')" class="hover:text-indigo-600 transition">Market</button>
        <button @click="$emit('navigate', 'features')" class="hover:text-indigo-600 transition">Features</button>
        <button @click="$emit('navigate', 'pricing')" class="hover:text-indigo-600 transition">Pricing</button>
        <button @click="$emit('navigate', 'faq')" class="hover:text-indigo-600 transition">FAQ</button>
      </nav>

      <div class="flex items-center gap-4">
        <div v-if="isLoggedIn" class="flex items-center gap-3">
            <span class="text-sm font-bold text-slate-700">Trader Joe</span>
            <button @click="$emit('logout')" class="text-xs text-red-500 hover:underline">Sign Out</button>
        </div>
        <div v-else class="flex items-center gap-3">
          <button @click="$emit('navigate', 'login')" class="text-slate-600 hover:text-indigo-600 font-medium text-sm">Log In</button>
          <button @click="$emit('navigate', 'signup')" class="bg-slate-900 text-white px-5 py-2 rounded-full font-medium text-sm hover:bg-slate-800 transition">Sign Up</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
/* eslint-disable no-undef */
defineProps(['isLoggedIn']);
defineEmits(['navigate', 'logout']);
</script>