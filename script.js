// Data Pengaduan (Sumber: Sampel Laporan-Call-Center-DJKI)
const rawData = [
    { kota: 'KOTA ADM. JAKARTA SELATAN', jumlah: 153 },
    { kota: 'KOTA ADM. JAKARTA PUSAT', jumlah: 49 },
    { kota: 'KOTA ADM. JAKARTA BARAT', jumlah: 34 },
    { kota: 'KOTA SURABAYA', jumlah: 17 },
    { kota: 'KOTA ADM. JAKARTA UTARA', jumlah: 13 },
    { kota: 'KOTA ADM. JAKARTA TIMUR', jumlah: 10 },
    { kota: 'KOTA BANDUNG', jumlah: 9 },
    { kota: 'KOTA MEDAN', jumlah: 8 },
    { kota: 'KOTA TANGERANG', jumlah: 6 },
    { kota: 'KAB. TANGERANG', jumlah: 5 },
    { kota: 'KOTA BEKASI', jumlah: 5 },
    { kota: 'KOTA SEMARANG', jumlah: 5 },
    { kota: 'KAB. BANDUNG', jumlah: 4 },
    { kota: 'KOTA DEPOK', jumlah: 4 },
    { kota: 'KOTA BOGOR', jumlah: 4 },
    { kota: 'KOTA SURAKARTA', jumlah: 3 },
    { kota: 'KAB. SIDOARJO', jumlah: 3 },
    { kota: 'KOTA YOGYAKARTA', jumlah: 3 },
    { kota: 'KAB. JEMBER', jumlah: 3 },
    { kota: 'KOTA PEKALONGAN', jumlah: 2 },
    { kota: 'KAB. CILACAP', jumlah: 2 },
    { kota: 'KOTA PADANG', jumlah: 2 },
    { kota: 'KOTA MALANG', jumlah: 2 },
    { kota: 'KOTA BATAM', jumlah: 2 },
    { kota: 'KAB. SERANG', jumlah: 2 },
    { kota: 'KOTA TANGERANG SELATAN', jumlah: 2 },
    { kota: 'KAB. SLEMAN', jumlah: 2 },
    { kota: 'KOTA PONTIANAK', jumlah: 2 },
    { kota: 'KAB. BEKASI', jumlah: 1 },
    { kota: 'KAB. BOGOR', jumlah: 1 },
    { kota: 'KOTA SAMARINDA', jumlah: 1 },
    { kota: 'KAB. CIANJUR', jumlah: 1 },
    { kota: 'KAB. BANTUL', jumlah: 1 },
    { kota: 'KOTA BANDAR LAMPUNG', jumlah: 1 },
    { kota: 'KAB. BREBES', jumlah: 1 },
    { kota: 'KAB. LOMBOK TENGAH', jumlah: 1 },
    { kota: 'KOTA MOJOKERTO', jumlah: 1 },
    { kota: 'KAB. SUKABUMI', jumlah: 1 },
    { kota: 'KAB. SAMPANG', jumlah: 1 },
    { kota: 'KAB. PASURUAN', jumlah: 1 },
    { kota: 'KOTA BANDA ACEH', jumlah: 1 },
    { kota: 'KAB. BALANGAN', jumlah: 1 },
    { kota: 'KAB. BOJONEGORO', jumlah: 1 },
    { kota: 'KAB. KONAWE SELATAN', jumlah: 1 },
    { kota: 'KOTA PEKANBARU', jumlah: 1 },
    { kota: 'KOTA CIMAHI', jumlah: 1 },
    { kota: 'KAB. SUKOHARJO', jumlah: 1 },
    { kota: 'KAB. NGANJUK', jumlah: 1 }
];

// Mengurutkan data dari jumlah terbanyak ke terkecil
const sortedData = [...rawData].sort((a, b) => b.jumlah - a.jumlah);

// Inisialisasi setelah DOM dimuat
document.addEventListener('DOMContentLoaded', () => {
    populateTable();
    renderChart();
});

// Fungsi untuk mengisi tabel
function populateTable() {
    const tbody = document.querySelector('#complaintTable tbody');
    tbody.innerHTML = '';

    sortedData.forEach((item, index) => {
        const tr = document.createElement('tr');
        
        // Animasi keterlambatan untuk setiap baris
        tr.style.animation = `fadeInUp 0.5s ease-out ${0.1 * index}s both`;

        tr.innerHTML = `
            <td>${index + 1}</td>
            <td style="font-weight: 600;">${item.kota}</td>
            <td><span class="count-badge">${item.jumlah.toLocaleString('id-ID')}</span></td>
        `;
        tbody.appendChild(tr);
    });
}

// Fungsi untuk merender grafik menggunakan Chart.js
function renderChart() {
    const ctx = document.getElementById('complaintChart').getContext('2d');
    
    // Gradient untuk batang grafik
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, '#8b5cf6');   // Purple
    gradient.addColorStop(1, '#3b82f6');   // Blue
    
    const hoverGradient = ctx.createLinearGradient(0, 0, 0, 400);
    hoverGradient.addColorStop(0, '#a78bfa'); 
    hoverGradient.addColorStop(1, '#60a5fa');

    // Extract label dan data
    const labels = sortedData.map(item => item.kota);
    const dataValues = sortedData.map(item => item.jumlah);

    // Konfigurasi Chart
    Chart.defaults.color = '#94a3b8';
    Chart.defaults.font.family = "'Outfit', sans-serif";

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Jumlah Pengaduan',
                data: dataValues,
                backgroundColor: gradient,
                hoverBackgroundColor: hoverGradient,
                borderRadius: 8,
                borderSkipped: false,
                barThickness: 'flex',
                maxBarThickness: 40
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false // Sembunyikan legend karena hanya 1 dataset
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    titleFont: { size: 14, weight: '600' },
                    bodyFont: { size: 14 },
                    padding: 12,
                    cornerRadius: 8,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return `Jumlah: ${context.parsed.y.toLocaleString('id-ID')}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        font: { size: 12 }
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        font: { size: 12 },
                        callback: function(value) {
                            return value.toLocaleString('id-ID');
                        }
                    },
                    beginAtZero: true
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });
}
