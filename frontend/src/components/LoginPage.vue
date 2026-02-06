<template>
  <div class="min-h-[80vh] flex items-center justify-center py-12 px-4 relative">
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div class="absolute top-[20%] left-[20%] w-72 h-72 bg-indigo-500/10 rounded-full blur-[80px]"></div>
    </div>

    <div class="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-extrabold text-slate-900">Welcome Back</h2>
        <p class="text-sm text-slate-500 mt-2">Login to manage your portfolio</p>
      </div>

      <div class="flex justify-center mb-6">
        <GoogleLogin :callback="handleGoogleLogin" prompt auto-login />
      </div>

      <div class="relative flex py-2 items-center mb-6">
          <div class="flex-grow border-t border-slate-300"></div>
          <span class="flex-shrink mx-4 text-slate-400 text-sm">Or with email</span>
          <div class="flex-grow border-t border-slate-300"></div>
      </div>

      <div v-if="!showOtpForm">
        <form class="space-y-6" @submit.prevent="handleLoginStep1">
          <input v-model="email" type="email" required class="block w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Email address">
          <input v-model="password" type="password" required class="block w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Password">
          
          <div v-if="error" class="text-red-500 text-sm text-center font-bold">{{ error }}</div>

          <button type="submit" :disabled="loading" class="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition shadow-lg">
             {{ loading ? 'Processing...' : 'Continue' }}
          </button>
        </form>
      </div>

      <div v-else>
        <div class="text-center mb-6">
            <p class="text-sm text-slate-500">
                Security code sent to <br/><b class="text-indigo-600">{{ email }}</b>
            </p>
        </div>
        <form class="space-y-6" @submit.prevent="handleVerifyOtp">
          <div class="flex justify-center">
            <input v-model="otpCode" type="text" maxlength="6" class="block w-40 text-center text-3xl tracking-[0.5em] font-bold border-b-2 border-slate-300 focus:border-indigo-600 outline-none transition" placeholder="------">
          </div>

          <div v-if="error" class="text-red-500 text-sm text-center font-bold">{{ error }}</div>

          <button type="submit" :disabled="loading" class="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition shadow-lg">
             {{ loading ? 'Verifying...' : 'Verify & Login' }}
          </button>
          
          <button type="button" @click="showOtpForm=false" class="w-full text-slate-400 hover:text-slate-600 text-sm">Back to Login</button>
        </form>
      </div>

      <div class="text-center mt-6">
          <p class="text-sm text-slate-600">
              Don't have an account? 
              <button @click="$emit('switch-to-signup')" class="font-bold text-indigo-600 hover:text-indigo-500">Sign up</button>
          </p>
      </div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable no-undef */
import { ref } from 'vue';
const emit = defineEmits(['login-success', 'switch-to-signup']);

const email = ref('');
const password = ref('');
const otpCode = ref('');
const showOtpForm = ref(false);
const loading = ref(false);
const error = ref('');
const API_URL = process.env.VUE_APP_API_URL || 'http://localhost:3000';

// Xử lý Google Login
const handleGoogleLogin = async (response) => {
    try {
        const res = await fetch(`${API_URL}/api/auth/google`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ credential: response.credential })
        });
        const data = await res.json();
        if (res.ok) {
            localStorage.setItem('token', data.token);
            emit('login-success');
        } else {
            error.value = data.error;
        }
    } catch (e) { error.value = "Connection Failed"; }
};

// Xử lý Login thường Step 1
const handleLoginStep1 = async () => {
    loading.value = true; error.value = '';
    try {
        const res = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email.value, password: password.value })
        });
        const data = await res.json();
        if (res.ok && data.requireOtp) {
            showOtpForm.value = true;
        } else {
            error.value = data.error || 'Login Failed';
        }
    } catch (e) { error.value = "Server Error"; } finally { loading.value = false; }
};

// Xử lý Verify OTP Step 2
const handleVerifyOtp = async () => {
    loading.value = true; error.value = '';
    try {
        const res = await fetch(`${API_URL}/api/auth/verify-otp`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email.value, otp: otpCode.value })
        });
        const data = await res.json();
        if (res.ok) {
            localStorage.setItem('token', data.token);
            emit('login-success');
        } else {
            error.value = data.error || 'Invalid Code';
        }
    } catch (e) { error.value = "Server Error"; } finally { loading.value = false; }
};
</script>