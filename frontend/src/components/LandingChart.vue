<template>
  <div class="w-full h-full flex flex-col">
    <div class="flex justify-end gap-2 mb-4">
      <button 
        v-for="period in ['1W', '1M', '1Y', 'ALL']" 
        :key="period"
        @click="changePeriod(period)"
        class="text-sm font-bold px-4 py-2 rounded-lg transition border border-transparent"
        :class="selectedFrame === period 
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
          : 'bg-slate-800 text-slate-400 hover:text-white hover:border-slate-600'"
      >
        {{ period }}
      </button>
    </div>

    <div class="flex-1 relative min-h-[500px]">
       <canvas ref="canvasRef"></canvas>
       
       <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-[#0b0e14]/50 backdrop-blur-sm z-10">
           <div class="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
       </div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable no-undef */
import { ref, onMounted, watch } from 'vue';
import Chart from 'chart.js/auto';

const props = defineProps(['ticker']);
const API_URL = process.env.VUE_APP_API_URL || 'http://localhost:3000';

const canvasRef = ref(null);
let chartInstance = null;
const selectedFrame = ref('ALL');
const loading = ref(false);

const fetchChartData = async (period) => {
    if (!props.ticker) return;
    loading.value = true;
    
    try {
        const res = await fetch(`${API_URL}/api/stocks/${props.ticker}?period=${period}`);
        if (res.ok) {
            const data = await res.json();
            renderChart(data, period);
        }
    } catch (e) {
        console.error("Chart Error:", e);
    } finally {
        loading.value = false;
    }
};

const changePeriod = (period) => {
    selectedFrame.value = period;
    fetchChartData(period);
};

const renderChart = (data, period) => {
    if (!canvasRef.value) return;
    
    const labels = data.map(d => d.Date);
    const prices = data.map(d => d.Close);

    if (chartInstance) chartInstance.destroy();

    const ctx = canvasRef.value.getContext('2d');
    
    // Gradient màu tím nhạt đẹp mắt
    const gradient = ctx.createLinearGradient(0, 0, 0, 500); // Tăng chiều cao gradient theo chart
    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.4)'); 
    gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');

    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Price',
                data: prices,
                borderColor: '#6366f1',
                backgroundColor: gradient,
                borderWidth: 3, // Đường vẽ dày hơn chút cho rõ
                pointRadius: 0, // Ẩn điểm tròn mặc định cho mượt
                pointHoverRadius: 6, // Rê chuột vào mới hiện to
                hitRadius: 10, // Dễ rê chuột trúng hơn
                fill: true,
                tension: 0.4 
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(17, 24, 39, 0.95)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#374151',
                    borderWidth: 1,
                    padding: 10,
                    callbacks: {
                        label: function(context) {
                            return ` Price: $${context.parsed.y.toFixed(2)}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { 
                        color: '#9ca3af',
                        font: {
                            size: 12, // Chữ to hơn chút
                            weight: 'bold'
                        },
                        maxRotation: 0,
                        autoSkip: true,
                        autoSkipPadding: 30, // Tăng khoảng cách để chữ không dính nhau
                        
                        // Cho phép hiện nhiều nhãn hơn
                        maxTicksLimit: (period === '1Y' || period === 'ALL') ? 12 : 8,

                        // --- LOGIC HIỂN THỊ NGÀY THÁNG ---
                        callback: function(val) {
                            const label = this.getLabelForValue(val);
                            const date = new Date(label);

                            // 1. Nếu là 1Y: Hiện "Jan 2026"
                            if (period === '1Y') {
                                return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
                            }
                            
                            // 2. Nếu là ALL: Chỉ hiện Năm (2024, 2025...)
                            if (period === 'ALL') {
                                return date.getFullYear(); 
                            }
                            
                            // 3. Còn lại (1W, 1M): Hiện Ngày/Tháng (22 Jan)
                            return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
                        }
                    }
                },
                y: {
                    grid: { color: '#374151', borderDash: [5, 5] },
                    ticks: { 
                        color: '#9ca3af',
                        font: { size: 12 }
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });
};

onMounted(() => {
    if (props.ticker) fetchChartData('ALL');
});

watch(() => props.ticker, (newTicker) => {
    if (newTicker) {
        selectedFrame.value = 'ALL';
        fetchChartData('ALL');
    }
});
</script>