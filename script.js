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

// Data Provinsi (Sumber: Hasil Agregasi Data)
const provinceData = [
    { provinsi: 'DKI JAKARTA', jumlah: 261 },
    { provinsi: 'JAWA TIMUR', jumlah: 32 },
    { provinsi: 'JAWA BARAT', jumlah: 31 },
    { provinsi: 'BANTEN', jumlah: 15 },
    { provinsi: 'JAWA TENGAH', jumlah: 14 },
    { provinsi: 'SUMATERA UTARA', jumlah: 8 },
    { provinsi: 'DI YOGYAKARTA', jumlah: 6 },
    { provinsi: 'KEPULAUAN RIAU', jumlah: 2 },
    { provinsi: 'KALIMANTAN BARAT', jumlah: 2 },
    { provinsi: 'SUMATERA BARAT', jumlah: 2 },
    { provinsi: 'NUSA TENGGARA BARAT', jumlah: 1 },
    { provinsi: 'KALIMANTAN TIMUR', jumlah: 1 },
    { provinsi: 'LAMPUNG', jumlah: 1 },
    { provinsi: 'RIAU', jumlah: 1 },
    { provinsi: 'KALIMANTAN SELATAN', jumlah: 1 },
    { provinsi: 'ACEH', jumlah: 1 },
    { provinsi: 'SULAWESI TENGGARA', jumlah: 1 },
    { provinsi: 'BALI', jumlah: 1 }
];

let currentChart = null;

// Inisialisasi setelah DOM dimuat
document.addEventListener('DOMContentLoaded', () => {
    updateDashboardView(); // Render tabel & chart pertama kali
    renderMap();           // Render peta (statis berdasarkan provinsi)
});

// Fungsi untuk mengganti data berdasarkan dropdown
function updateDashboardView() {
    const selector = document.getElementById('viewSelector');
    const selectedView = selector.value;
    
    // Ambil data dari data.js
    const dataToRender = dashboardData[selectedView] || [];
    
    // Update Judul pada Header Tabel dan Chart jika perlu
    let columnHeader = "Kategori Data";
    if (selectedView === "Kota") columnHeader = "Kota";
    else if (selectedView === "Rezim") columnHeader = "Rezim (Unit)";
    else if (selectedView === "Bulan") columnHeader = "Bulan (01-12)";
    else if (selectedView === "Kategori") columnHeader = "Kategori Pengaduan";
    else if (selectedView === "AsalPemohon") columnHeader = "Asal Pemohon";
    else if (selectedView === "Kanal") columnHeader = "Kanal Masuk";
    else if (selectedView === "Status") columnHeader = "Status Laporan";

    document.querySelector('#complaintTable th:nth-child(2)').textContent = columnHeader;

    populateTable(dataToRender);
    renderChart(dataToRender);
}

// Fungsi untuk mengisi tabel
function populateTable(dataArray) {
    const tbody = document.querySelector('#complaintTable tbody');
    tbody.innerHTML = '';

    dataArray.forEach((item, index) => {
        const tr = document.createElement('tr');
        
        // Animasi keterlambatan untuk setiap baris
        tr.style.animation = `fadeInUp 0.5s ease-out ${Math.min(0.05 * index, 1.5)}s both`;

        tr.innerHTML = `
            <td>${index + 1}</td>
            <td style="font-weight: 600;">${item.label}</td>
            <td><span class="count-badge">${item.jumlah.toLocaleString('id-ID')}</span></td>
        `;
        tbody.appendChild(tr);
    });
}

// Fungsi untuk merender grafik menggunakan Chart.js
function renderChart(dataArray) {
    const ctx = document.getElementById('complaintChart').getContext('2d');
    
    // Gradient untuk batang grafik
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, '#8b5cf6');   // Purple
    gradient.addColorStop(1, '#3b82f6');   // Blue
    
    const hoverGradient = ctx.createLinearGradient(0, 0, 0, 400);
    hoverGradient.addColorStop(0, '#a78bfa'); 
    hoverGradient.addColorStop(1, '#60a5fa');

    // Extract label dan data (batasi maksimal 30 agar chart tidak terlalu sesak)
    const renderData = dataArray.slice(0, 30);
    const labels = renderData.map(item => item.label);
    const dataValues = renderData.map(item => item.jumlah);

    // Konfigurasi Chart
    Chart.defaults.color = '#94a3b8';
    Chart.defaults.font.family = "'Outfit', sans-serif";

    if (currentChart) {
        currentChart.destroy(); // Hancurkan chart lama sebelum membuat yang baru
    }

    currentChart = new Chart(ctx, {
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

// Fungsi untuk menentukan warna provinsi berdasarkan jumlah pengaduan
function getProvinceColor(jumlah) {
    if (!jumlah || jumlah === 0) return '#1e293b'; // Default / no data (dark slate)
    if (jumlah > 100) return '#1e3a8a'; // Paling banyak (biru sangat tua)
    if (jumlah > 30)  return '#1d4ed8'; // Biru tua
    if (jumlah > 10)  return '#2563eb'; // Biru sedang
    if (jumlah > 5)   return '#3b82f6'; // Biru standar
    if (jumlah > 0)   return '#60a5fa'; // Biru muda (paling sedikit)
    return '#1e293b';
}

// Fungsi untuk merender peta Indonesia menggunakan Leaflet
function renderMap() {
    const map = L.map('indonesiaMap', {
        zoomControl: true,
        attributionControl: false,
        scrollWheelZoom: false // Disable scroll wheel zoom for better page scrolling
    }).setView([-2.5489, 118.0148], 5);

    // Fetch GeoJSON Indonesia
    fetch('https://raw.githubusercontent.com/superpikar/indonesia-geojson/master/indonesia-province-simple.json')
        .then(response => response.json())
        .then(data => {
            L.geoJson(data, {
                style: function(feature) {
                    const provName = feature.properties.Propinsi ? feature.properties.Propinsi.toUpperCase() : '';
                    const found = provinceData.find(p => p.provinsi === provName || provName.includes(p.provinsi) || p.provinsi.includes(provName));
                    const jumlah = found ? found.jumlah : 0;
                    return {
                        fillColor: getProvinceColor(jumlah),
                        weight: 1,
                        opacity: 1,
                        color: 'rgba(255, 255, 255, 0.2)', // Border antar provinsi
                        fillOpacity: 0.9
                    };
                },
                onEachFeature: function(feature, layer) {
                    const provName = feature.properties.Propinsi || 'Tidak Diketahui';
                    const upName = provName.toUpperCase();
                    const found = provinceData.find(p => p.provinsi === upName || upName.includes(p.provinsi) || p.provinsi.includes(upName));
                    const jumlah = found ? found.jumlah : 0;
                    
                    const popupContent = `<div style="text-align: center;">
                        <strong style="font-size: 1.1em; color: #fff;">${provName}</strong><br/>
                        <span style="color: #60a5fa; font-weight: bold; font-size: 1.2em;">${jumlah}</span><span style="color: #94a3b8;"> Pengaduan</span>
                    </div>`;
                    
                    layer.bindTooltip(popupContent, {
                        sticky: true,
                        className: 'custom-tooltip',
                        direction: 'top'
                    });
                    
                    layer.on({
                        mouseover: function(e) {
                            const l = e.target;
                            l.setStyle({
                                weight: 2,
                                color: '#fff',
                                fillOpacity: 1
                            });
                            if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                                l.bringToFront();
                            }
                        },
                        mouseout: function(e) {
                            // Reset style
                            l.setStyle({
                                weight: 1,
                                color: 'rgba(255, 255, 255, 0.2)',
                                fillOpacity: 0.9
                            });
                        }
                    });
                }
            }).addTo(map);
        })
        .catch(err => console.error("Gagal memuat data peta: ", err));
}
