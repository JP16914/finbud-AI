<template>
  <div class="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
    
    <TheHeader :isLoggedIn="isLoggedIn" @navigate="navigate" @logout="logout" />
    
    <main class="flex-grow">
      
      <template v-if="currentPage === 'home'">
        <TheLandingPage v-if="!isLoggedIn" @login="navigate('login')" @navigate="navigate" />
        <div v-else class="max-w-7xl mx-auto px-4 py-6">
             <div class="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center">
                <h2 class="text-2xl font-bold mb-4">Welcome back, Trader!</h2>
                <button @click="navigate('market')" class="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold">Go to Market Terminal</button>
             </div>
        </div>
      </template>

      <MarketPage v-if="currentPage === 'market'" />

      <FeaturesPage v-if="currentPage === 'features'" @navigate="navigate" />

      <PricingPage v-if="currentPage === 'pricing'" />

      <FaqPage v-if="currentPage === 'faq'" @navigate="navigate" />

      <LoginPage v-if="currentPage === 'login'" @login-success="login" @switch-to-signup="navigate('signup')" />
      <SignupPage v-if="currentPage === 'signup'" @signup-success="login" @switch-to-login="navigate('login')" />

    </main>

    <TheFooter />
  </div>
</template>

<script setup>
/* eslint-disable no-undef */
import { ref } from 'vue';

// IMPORT TẤT CẢ PAGE
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';
import TheLandingPage from './components/TheLandingPage.vue';
import LoginPage from './components/LoginPage.vue';
import SignupPage from './components/SignupPage.vue';
import FaqPage from './components/FaqPage.vue';
import MarketPage from './components/MarketPage.vue';
import FeaturesPage from './components/FeaturePage.vue';
import PricingPage from './components/PricingPage.vue';

// STATE
const isLoggedIn = ref(false);
const currentPage = ref('home'); 

// NAVIGATION (Đơn giản hóa: Chỉ chuyển trang)
const navigate = (page) => {
    currentPage.value = page;
    window.scrollTo(0, 0);
};

// AUTH
const login = () => {
    isLoggedIn.value = true;
    navigate('home'); 
};

const logout = () => {
    isLoggedIn.value = false;
    navigate('home'); 
};
</script>