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

let mainMap, provinceLayer, regencyLayer;
let nationalGeoJSON, regencyGeoJSON;

// Mapping nama provinsi dari GeoJSON ke Data Excel
function normalizedProvName(name) {
    if (!name) return "";
    const n = name.toUpperCase();
    if (n.includes("JAKARTA RAYA")) return "DKI JAKARTA";
    if (n.includes("YOGYAKARTA")) return "DI YOGYAKARTA";
    return n;
}

// Fungsi untuk menentukan warna berdasarkan jumlah pengaduan
function getColorScale(jumlah) {
    if (!jumlah || jumlah === 0) return '#1e293b'; 
    if (jumlah > 100) return '#1e3a8a'; 
    if (jumlah > 30)  return '#1d4ed8'; 
    if (jumlah > 10)  return '#2563eb'; 
    if (jumlah > 5)   return '#3b82f6'; 
    if (jumlah > 0)   return '#60a5fa'; 
    return '#1e293b';
}

function renderMap() {
    mainMap = L.map('indonesiaMap', {
        zoomControl: true,
        attributionControl: false,
        scrollWheelZoom: false
    }).setView([-2.5489, 118.0148], 5);

    // Muat data Nasional (Provinsi)
    fetch('https://raw.githubusercontent.com/superpikar/indonesia-geojson/master/indonesia-province-simple.json')
        .then(res => res.json())
        .then(data => {
            nationalGeoJSON = data;
            showNationalMap();
        });

    // Pre-fetch data Kabupaten
    fetch('all-kabupaten.geojson')
        .then(res => {
            if (!res.ok) throw new Error("Gagal memuat detail kabupaten. Jalankan via server lokal (Live Server) agar fitur ini berfungsi.");
            return res.json();
        })
        .then(data => {
            regencyGeoJSON = data;
            console.log("Detail kabupaten berhasil dimuat.");
        })
        .catch(err => {
            console.warn(err.message);
            // Simpan flag bahwa data detail gagal dimuat
            regencyGeoJSON = "FAILED";
        });
}

function showNationalMap() {
    if (provinceLayer) mainMap.removeLayer(provinceLayer);
    if (regencyLayer) mainMap.removeLayer(regencyLayer);
    document.getElementById('mapBackBtn').style.display = 'none';

    mainMap.setView([-2.5489, 118.0148], 5);

    provinceLayer = L.geoJson(nationalGeoJSON, {
        style: function(feature) {
            const name = normalizedProvName(feature.properties.Propinsi);
            const found = provinceData.find(p => p.provinsi === name);
            return {
                fillColor: getColorScale(found ? found.jumlah : 0),
                weight: 1, color: 'rgba(255, 255, 255, 0.2)', fillOpacity: 0.9
            };
        },
        onEachFeature: function(feature, layer) {
            const name = normalizedProvName(feature.properties.Propinsi);
            const found = provinceData.find(p => p.provinsi === name);
            const jumlah = found ? found.jumlah : 0;

            layer.bindTooltip(`<strong>${name}</strong><br/>${jumlah} Pengaduan`, {
                sticky: true, className: 'custom-tooltip', direction: 'top'
            });

            layer.on({
                mouseover: (e) => { e.target.setStyle({ weight: 2, color: '#fff' }); },
                mouseout: (e) => { e.target.setStyle({ weight: 1, color: 'rgba(255, 255, 255, 0.2)' }); },
                click: (e) => { drillDown(feature, e.target); }
            });
        }
    }).addTo(mainMap);
}

function drillDown(feature, layer) {
    const provName = normalizedProvName(feature.properties.Propinsi);
    
    if (!regencyGeoJSON) {
        alert("Sabar, data detail kabupaten sedang dimuat...");
        return;
    }

    if (regencyGeoJSON === "FAILED") {
        alert("Gagal memuat detail wilayah. \n\nHal ini biasanya terjadi jika Anda membuka file HTML secara langsung. Silakan jalankan menggunakan 'Live Server' atau server lokal lainnya.");
        return;
    }

    if (provinceLayer) mainMap.removeLayer(provinceLayer);
    document.getElementById('mapBackBtn').style.display = 'block';

    // Filter features untuk provinsi ini
    const filteredFeatures = regencyGeoJSON.features.filter(f => normalizedProvName(f.properties.NAME_1) === provName);

    if (filteredFeatures.length === 0) {
        alert("Batas wilayah detail untuk " + provName + " tidak ditemukan di data GeoJSON.");
        showNationalMap();
        return;
    }

    const filtered = {
        type: "FeatureCollection",
        features: filteredFeatures
    };

    mainMap.fitBounds(layer.getBounds(), { padding: [20, 20] });

    regencyLayer = L.geoJson(filtered, {
        style: function(f) {
            const kabName = f.properties.NAME_2.toUpperCase();
            const dataP = kabupatenData[provName] || {};
            // Fuzzy match for KOTA/KAB
            let foundData = dataP[kabName];
            if (!foundData) {
                const key = Object.keys(dataP).find(k => k.includes(kabName) || kabName.includes(k));
                foundData = dataP[key];
            }
            return {
                fillColor: getColorScale(foundData ? foundData.total : 0),
                weight: 1, color: 'rgba(255, 255, 255, 0.3)', fillOpacity: 0.8
            };
        },
        onEachFeature: function(f, l) {
            const kabName = f.properties.NAME_2.toUpperCase();
            const dataP = kabupatenData[provName] || {};
            let foundKey = Object.keys(dataP).find(k => k.includes(kabName) || kabName.includes(k));
            const foundData = dataP[foundKey];

            let tooltipHtml = `<strong>${f.properties.NAME_2}</strong><br/>`;
            if (foundData) {
                tooltipHtml += `<span style="color:var(--accent-color); font-size:1.2em; font-weight:bold;">${foundData.total}</span> Pengaduan`;
                tooltipHtml += `<div class="unit-detail">`;
                for (const [unit, count] of Object.entries(foundData.units)) {
                    tooltipHtml += `<div class="unit-item"><span>${unit}</span> <span>${count}</span></div>`;
                }
                tooltipHtml += `</div>`;
            } else {
                tooltipHtml += `0 Pengaduan`;
            }

            l.bindTooltip(tooltipHtml, { sticky: true, className: 'custom-tooltip', direction: 'top' });
            l.on({
                mouseover: (e) => { e.target.setStyle({ weight: 2, color: '#fff', fillOpacity: 1 }); },
                mouseout: (e) => { e.target.setStyle({ weight: 1, color: 'rgba(255, 255, 255, 0.3)', fillOpacity: 0.8 }); }
            });
        }
    }).addTo(mainMap);
}

function goBackToNational() {
    showNationalMap();
}

// Initialize
populateTable();
updateChart();
renderMap();
