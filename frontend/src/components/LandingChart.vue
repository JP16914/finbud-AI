<template>
  <div class="w-full h-[350px] bg-[#1e232f]/50 rounded-xl p-4 border border-slate-700/50 backdrop-blur-sm">
    <Line v-if="chartData" :data="chartData" :options="chartOptions" />
    <div v-else class="h-full flex items-center justify-center text-slate-500">
        Loading Chart Data...
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

// Đăng ký các thành phần của Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const props = defineProps(['stockData']);

// Cấu hình dữ liệu cho Chart
const chartData = computed(() => {
  if (!props.stockData || props.stockData.length === 0) return null;

  // Lấy dữ liệu của 1 mã (ví dụ AAPL) để demo trên trang chủ
  // Trong thực tế bạn có thể cho user chọn mã
  const ticker = 'AAPL'; 
  // Lấy 30 ngày gần nhất
  const dataPoints = props.stockData.filter(d => d.Ticker === ticker).slice(-30); 

  return {
    labels: dataPoints.map(d => d.Date), // Trục hoành: Ngày
    datasets: [
      {
        label: `${ticker} Price`,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, 'rgba(59, 130, 246, 0.5)'); // Màu xanh đậm
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0.0)'); // Màu trong suốt
          return gradient;
        },
        borderColor: '#3b82f6',
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#fff',
        data: dataPoints.map(d => d.Close), // Trục tung: Giá đóng cửa
        fill: true,
        tension: 0.4 // Đường cong mềm mại
      }
    ]
  }
});

// Cấu hình giao diện Chart (Tắt lưới, đổi màu chữ cho hợp Dark Mode)
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { 
        mode: 'index', 
        intersect: false,
        backgroundColor: '#1e293b',
        titleColor: '#fff',
        bodyColor: '#cbd5e1',
        borderColor: '#475569',
        borderWidth: 1
    }
  },
  scales: {
    x: { 
        grid: { display: false },
        ticks: { color: '#64748b', maxTicksLimit: 6 }
    },
    y: { 
        grid: { color: '#334155' },
        ticks: { color: '#64748b' }
    }
  }
};
</script>