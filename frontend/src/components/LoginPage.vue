<template>
  <div class="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div class="absolute top-[20%] left-[20%] w-72 h-72 bg-indigo-500/10 rounded-full blur-[80px]"></div>
        <div class="absolute bottom-[20%] right-[20%] w-96 h-96 bg-purple-500/10 rounded-full blur-[80px]"></div>
    </div>

    <div class="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
      <div class="text-center">
        <h2 class="mt-2 text-3xl font-extrabold text-slate-900">Welcome Back</h2>
        <p class="mt-2 text-sm text-slate-600">
          Access your intelligent portfolio dashboard.
        </p>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="space-y-4">
          <div>
            <label for="email" class="sr-only">Email address</label>
            <input id="email" type="email" required class="appearance-none relative block w-full px-4 py-3 border border-slate-300 placeholder-slate-400 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address">
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input id="password" type="password" required class="appearance-none relative block w-full px-4 py-3 border border-slate-300 placeholder-slate-400 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password">
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input id="remember-me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
            <label for="remember-me" class="ml-2 block text-sm text-slate-900">Remember me</label>
          </div>
          <div class="text-sm">
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Forgot password?</a>
          </div>
        </div>

        <div>
          <button type="submit" class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition shadow-lg shadow-indigo-500/30">
            Sign in
          </button>
        </div>
      </form>
      
      <div class="text-center mt-4">
          <p class="text-sm text-slate-600">
              Don't have an account? 
              <button @click="$emit('switch-to-signup')" class="font-bold text-indigo-600 hover:text-indigo-500">Sign up now</button>
          </p>
      </div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable no-undef */
const emit = defineEmits(['login-success', 'switch-to-signup']);

const handleLogin = () => {
    // Giả lập login thành công sau 1 giây
    setTimeout(() => {
        emit('login-success');
    }, 500);
};
</script>