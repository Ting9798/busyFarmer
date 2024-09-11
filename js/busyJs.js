let witheTopbar = document.querySelector('.witheTopbar');
let greenTopbar = document.querySelector('.greenTopbar');



const mapSearchBtn = document.getElementById('map-search-btn');
const farmerSearchBtn = document.getElementById('farmer-search-btn');
const mapDisplay = document.getElementById('map-display');
const farmerDisplay = document.getElementById('farmer-display');

// 初始化 Leaflet 地图
let map;

// 檢查按鈕是否存在
if (mapSearchBtn && farmerSearchBtn) {
    function setActiveButton(activeButton, inactiveButton) {
        activeButton.classList.add('active');
        inactiveButton.classList.remove('active');
    }

    function displaySearch(active, inactive) {
        active.classList.add('active');
        inactive.classList.remove('active');
    }

    function initializeMap() {
        if (!map) {
            map = L.map('map-display').setView([24.9457, 121.3576], 13); // 設置中心為台北市

            // 添加 OpenStreetMap 圖層
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            // 確保地圖容器尺寸正確
            setTimeout(() => {
                map.invalidateSize();
            }, 0);

            // 創建自定義圖標
            var customIcon = L.icon({
                iconUrl: './images/shared/icon2_sign.svg', // 圖標的 URL 路徑
                iconSize: [48, 48], // 圖標的大小 [寬, 高]
                iconAnchor: [24, 48], // 圖標的錨點，通常是圖標的底部中心 [x, y]
                popupAnchor: [0, -48] // 彈出窗的錨點相對於圖標錨點的位置 [x, y]
            });

            // 創建標記組
            var markers = L.layerGroup();

            // 添加多個標記到標記組
            var locations = [
                [24.9457, 121.3576],/* 柑橘、蘋果、葡萄 */
                [23.7681, 120.9674],/* 荔枝、香蕉 */
                [22.8851, 120.5630],/* 芒果、木瓜、龍眼 */
                [23.982002, 121.597182],/* 釋迦、番荔枝、柚子 */
                [23.579977, 119.604850]/* 柑橘、葡萄柚、香蕉 */


            ];

            locations.forEach(function (location) {
                var marker = L.marker(location, { icon: customIcon }).addTo(markers);
                // 添加彈出窗口
                marker.bindPopup('<b>台北市</b><br>這是一個自定義地圖標記。');
            });

            // 將標記組添加到地圖上
            markers.addTo(map);
        }
    }

    // 點選事件-地圖
    function showMap() {
        displaySearch(farmerDisplay, mapDisplay);
        setActiveButton(mapSearchBtn, farmerSearchBtn);
        initializeMap(); // 確保地圖初始化

        setTimeout(() => {
            map.invalidateSize(); // 確保地圖正確顯示
        }, 0); // 使用延遲來確保 DOM 完全渲染後再調整地圖尺寸
    }

    // 點選事件-小農
    function showFarmer() {
        displaySearch(mapDisplay, farmerDisplay);
        setActiveButton(farmerSearchBtn, mapSearchBtn);
    }

    // 進入尋找小農時先開啟地圖
    showMap();

    // 點選事件-地圖
    mapSearchBtn.addEventListener('click', showMap);

    // 點選事件-小農
    farmerSearchBtn.addEventListener('click', showFarmer);
}
