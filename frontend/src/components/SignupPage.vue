<template>
  <div class="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
    <div class="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
      <div class="text-center">
        <h2 class="mt-2 text-3xl font-extrabold text-slate-900">Create Account</h2>
        <p class="mt-2 text-sm text-slate-600">Start your journey with FinBud AI.</p>
      </div>
      
      <form class="mt-8 space-y-4" @submit.prevent="handleSignup">
        <div class="grid grid-cols-2 gap-4">
            <input type="text" required class="appearance-none block w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:text-sm" placeholder="First Name">
            <input type="text" required class="appearance-none block w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:text-sm" placeholder="Last Name">
        </div>
        <input type="email" required class="appearance-none block w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:text-sm" placeholder="Email address">
        <input type="password" required class="appearance-none block w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:text-sm" placeholder="Password">
        <input type="password" required class="appearance-none block w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:text-sm" placeholder="Confirm Password">

        <div>
          <button type="submit" class="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-slate-900 hover:bg-slate-800 transition shadow-lg">
            Create Account
          </button>
        </div>
      </form>

      <div class="text-center mt-4">
          <p class="text-sm text-slate-600">
              Already a member? 
              <button @click="$emit('switch-to-login')" class="font-bold text-indigo-600 hover:text-indigo-500">Log in</button>
          </p>
      </div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable no-undef */
const emit = defineEmits(['signup-success', 'switch-to-login']);

const handleSignup = () => {
    // Giả lập đăng ký thành công
    emit('signup-success');
};
</script>