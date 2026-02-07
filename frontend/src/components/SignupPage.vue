<template>
  <div class="min-h-[80vh] flex items-center justify-center py-12 px-4">
    <div class="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
      <h2 class="text-3xl font-extrabold text-center text-slate-900 mb-6">Create Account</h2>
      
      <form class="space-y-4" @submit.prevent="handleSignup">
        <input v-model="username" type="text" required class="block w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Username">
        <input v-model="email" type="email" required class="block w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Email address">
        <input v-model="password" type="password" required class="block w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Password">
        <input v-model="rePassword" type="password" required class="block w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Confirm Password">

        <div v-if="error" class="text-red-500 text-sm text-center font-bold">{{ error }}</div>
        <div v-if="successMsg" class="text-green-500 text-sm text-center font-bold">{{ successMsg }}</div>

        <button type="submit" :disabled="loading" class="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition shadow-lg">
           {{ loading ? 'Creating Account...' : 'Sign Up' }}
        </button>
      </form>

      <div class="text-center mt-4">
          <p class="text-sm text-slate-600">
              Already have an account? 
              <button @click="$emit('switch-to-login')" class="font-bold text-indigo-600 hover:text-indigo-500">Log in</button>
          </p>
      </div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable no-undef */
import { ref } from 'vue';
const emit = defineEmits(['signup-success', 'switch-to-login']);
const API_URL = process.env.VUE_APP_API_URL || 'http://localhost:3000';

const username = ref('');
const email = ref('');
const password = ref('');
const rePassword = ref('');
const loading = ref(false);
const error = ref('');
const successMsg = ref('');

const handleSignup = async () => {
    if (password.value !== rePassword.value) { error.value = "Passwords do not match!"; return; }
    loading.value = true; error.value = '';

    try {
        const res = await fetch(`${API_URL}/api/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username.value, email: email.value, password: password.value, rePassword: rePassword.value })
        });
        const data = await res.json();

        if (res.ok) {
            successMsg.value = "Success! Redirecting to login...";
            setTimeout(() => emit('switch-to-login'), 1500);
        } else {
            error.value = data.error;
        }
    } catch (e) { error.value = "Server Error"; } finally { loading.value = false; }
};
</script>