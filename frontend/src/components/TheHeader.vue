<template>
  <header class="bg-[#0b0e14]/80 backdrop-blur-md border-b border-slate-800 fixed w-full z-50 transition-all duration-300">
    <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      
      <div class="flex items-center gap-2 cursor-pointer" @click="$emit('navigate', 'home')">
        <div class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white">F</div>
        <span class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">FinBud AI</span>
      </div>

      <nav class="hidden md:flex gap-8">
        <a href="#" @click.prevent="$emit('navigate', 'home')" class="text-sm font-medium text-slate-400 hover:text-white transition">Home</a>
        <a href="#" @click.prevent="$emit('navigate', 'market')" class="text-sm font-medium text-slate-400 hover:text-white transition">Market</a>
        <a href="#" class="text-sm font-medium text-slate-400 hover:text-white transition">Features</a>
        <a href="#" class="text-sm font-medium text-slate-400 hover:text-white transition">Pricing</a>
      </nav>

      <div class="flex items-center gap-4">
        
        <div v-if="!isLoggedIn" class="flex items-center gap-3">
           <button @click="$emit('navigate', 'login')" class="text-sm font-bold text-slate-300 hover:text-white px-3 py-2 transition">
             Sign In
           </button>
           <button @click="$emit('navigate', 'signup')" class="text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg transition shadow-lg shadow-indigo-500/20">
             Sign Up
           </button>
        </div>

        <div v-else class="relative" ref="dropdownRef">
            <button @click="toggleMenu" class="flex items-center gap-2 focus:outline-none group">
                <div class="w-10 h-10 rounded-full border-2 border-slate-700 group-hover:border-indigo-500 transition overflow-hidden p-0.5">
                    <img :src="userInfo?.picture || defaultAvatar" alt="User" class="w-full h-full rounded-full object-cover">
                </div>
            </button>

            <transition name="fade">
                <div v-if="isOpen" class="absolute right-0 mt-3 w-64 bg-[#151921] border border-slate-700 rounded-xl shadow-2xl py-2 z-50 origin-top-right">
                    <div class="px-4 py-3 border-b border-slate-700/50 mb-2">
                        <p class="text-white font-bold truncate">{{ userInfo?.name || 'User' }}</p> 
                        <p class="text-xs text-slate-400 truncate">{{ userInfo?.email }}</p>
                    </div>

                    <a href="#" @click.prevent="goToWallet" class="flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:bg-indigo-600 hover:text-white transition group">
                        <span class="bg-slate-800 group-hover:bg-white/20 p-1.5 rounded-md transition">💳</span> My Wallet
                    </a>
                    
                    <div class="border-t border-slate-700/50 my-2"></div>

                    <button @click="handleLogout" class="w-full text-left flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition">
                        <span class="bg-red-500/10 p-1.5 rounded-md">🚪</span> Sign Out
                    </button>
                </div>
            </transition>
        </div>

      </div>
    </div>
  </header>
</template>

<script setup>
/* eslint-disable no-undef */
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { googleLogout } from "vue3-google-login";

defineProps(['isLoggedIn']); // Đã sửa lỗi eslint 'props assigned but never used'
const emit = defineEmits(['navigate', 'logout']);

const isOpen = ref(false);
const dropdownRef = ref(null);
const defaultAvatar = "https://ui-avatars.com/api/?name=User&background=random";

// Lấy thông tin User (Google Name & Picture) từ LocalStorage
const userInfo = computed(() => {
    const stored = localStorage.getItem('user_info');
    return stored ? JSON.parse(stored) : null;
});

const toggleMenu = () => isOpen.value = !isOpen.value;

const goToWallet = () => {
    isOpen.value = false;
    emit('navigate', 'wallet');
};

const handleLogout = () => {
    googleLogout();
    localStorage.removeItem('token');
    localStorage.removeItem('user_info'); // Xóa thông tin khi logout
    isOpen.value = false;
    emit('logout');
    emit('navigate', 'home');
};

// Click outside logic
const handleClickOutside = (event) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
        isOpen.value = false;
    }
};

onMounted(() => document.addEventListener('click', handleClickOutside));
onUnmounted(() => document.removeEventListener('click', handleClickOutside));
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-10px) scale(0.95); }
</style>