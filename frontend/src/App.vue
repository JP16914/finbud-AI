<template>
  <div class="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
    <TheHeader :isLoggedIn="isLoggedIn" @navigate="navigate" @logout="logout" />
    
    <main class="flex-grow">
      <template v-if="currentPage === 'home'">
        <TheLandingPage v-if="!isLoggedIn" @login="navigate('login')" @navigate="navigate" />
        <div v-else class="max-w-7xl mx-auto px-4 py-6">
             <div class="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center">
                <h2 class="text-3xl font-bold mb-4">Welcome back, Trader!</h2>
                <p class="text-slate-500 mb-6">Your portfolio is ready.</p>
                <div class="flex justify-center gap-4">
                    <button @click="navigate('market')" class="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition">Go to Market Terminal</button>
                    <button @click="navigate('wallet')" class="bg-slate-800 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-700 transition">My Wallet</button>
                </div>
             </div>
        </div>
      </template>

      <MarketPage v-if="currentPage === 'market'" :isLoggedIn="isLoggedIn" @navigate="navigate" @set-order="handleSetOrder" />
      <CheckoutPage v-if="currentPage === 'checkout'" :orderData="currentOrder" @navigate="navigate" />
      <WalletPage v-if="currentPage === 'wallet'" />
      
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
import { ref, onMounted } from 'vue';
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';
import TheLandingPage from './components/TheLandingPage.vue';
import LoginPage from './components/LoginPage.vue';
import SignupPage from './components/SignupPage.vue';
import FaqPage from './components/FaqPage.vue';
import MarketPage from './components/MarketPage.vue';
import FeaturesPage from './components/FeaturePage.vue';
import PricingPage from './components/PricingPage.vue';
import WalletPage from './components/WalletPage.vue';
import CheckoutPage from './components/CheckoutPage.vue';

const isLoggedIn = ref(false);
const currentPage = ref('home');
const currentOrder = ref(null);

const navigate = (page) => {
    // Logic cuộn trang cho Pricing
    if (page === 'pricing') {
        if (currentPage.value !== 'home') currentPage.value = 'home';
        setTimeout(() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else {
        currentPage.value = page;
        window.scrollTo(0, 0);
    }
};

const handleSetOrder = (data) => { currentOrder.value = data; };

const login = () => {
    isLoggedIn.value = true;
    // LOGIC THÔNG MINH: Kiểm tra đơn hàng treo
    const pending = localStorage.getItem('pendingTrade');
    if (pending) {
        navigate('market'); // Quay lại market để tiếp tục mua
    } else {
        navigate('home');
    }
};

const logout = () => {
    isLoggedIn.value = false;
    localStorage.removeItem('token');
    navigate('home');
};

onMounted(() => {
    const token = localStorage.getItem('token');
    if (token) isLoggedIn.value = true;
});
</script>