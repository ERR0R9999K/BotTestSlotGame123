// ============================================================
// nft_manager.js — Управление инвентарём и магазином NFT
// Поддерживает множественные копии одинаковых NFT
// ============================================================

// ---- Конфиг инвентаря (купленные NFT) ----
// Теперь можно иметь несколько одинаковых NFT с разными параметрами!
const InventoryData = [
    // Стандартные NFT (по одной копии)
    { id: "Airpods", background: "Airpods", color: "Airpods", icons: "headphones" },
    { id: "Book", background: "Book", color: "Book", icons: "book" },
    { id: "Cactus", background: "Cactus", color: "Cactus", icons: "seedling" },
    { id: "Dog", background: "Dog", color: "Dog", icons: "paw" },
    { id: "Fan", background: "Fan", color: "Fan", icons: "wind" },
    { id: "Mask", background: "Mask", color: "Mask", icons: "mask" },
    { id: "Shark", background: "Shark", color: "Shark", icons: "fish" },
    
    // Множественные копии Tea (3 штуки с одинаковыми параметрами)
    { id: "Tea", background: "Tea", color: "Tea", icons: "leaf" },
    { id: "Tea", background: "Tea", color: "Tea", icons: "leaf" },
    { id: "Tea", background: "Tea", color: "Tea", icons: "leaf" },
    
    { id: "Coconut", background: "Coconut", color: "Coconut", icons: "circle" },
    { id: "Socks", background: "Socks", color: "Socks", icons: "socks" },
    { id: "Sneakers", background: "Sneakers", color: "Sneakers", icons: "shoe" },
    { id: "Joystick", background: "Joystick", color: "Joystick", icons: "gamepad" },
    
    // Кастомные варианты (уникальные комбинации!)
    { id: "Airpods", background: "UfcPack", color: "Coconut", icons: "zap" },        // Airpods с фоном UFC и жёлтым названием
    { id: "Book", background: "ToxicWaste", color: "DustyRose", icons: "magic" },   // Книга с кислотным фоном
    { id: "Dog", background: "Goldfish", color: "AbyssalTeal", icons: "fire" },     // Собачка с золотым фоном
    { id: "Cactus", background: "Cyberpunk2077", color: "FrostedMint", icons: "star" }, // Кактус в киберпанке
    { id: "Cactus", background: "Cyberpunk2077", color: "FrostedMint", icons: "star" }, // Ещё один Кактус в киберпанке
    { id: "Sneakers", background: "MintyBreeze", color: "SteelBlue", icons: "crown" }, // Кроссовки
    { id: "Shark", background: "ArcticDawn", color: "FoggyLavender", icons: "dragon" }, // Акула
];

// ---- Основной менеджер NFT ----
const NFTManager = {
    /**
     * Создаёт фоновый узор из иконок для инвентаря (сетка 8x4)
     */
    createInventoryBackground(iconCode) {
        if (!iconCode) return '';
        const rows = 4;
        const cols = 8;
        let pattern = '';
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                pattern += iconCode;
            }
            if (r < rows - 1) pattern += '\n';
        }
        return pattern;
    },

    /**
     * Создаёт фоновый узор из иконок для магазина (сетка 16x2)
     */
    createShopBackground(iconCode) {
        if (!iconCode) return '';
        const rows = 2;
        const cols = 16;
        let pattern = '';
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                pattern += iconCode;
            }
            if (r < rows - 1) pattern += '\n';
        }
        return pattern;
    },

    /**
     * Получает базовые данные NFT по ID из глобального NFT_Config
     */
    getBaseNFTData(nftId) {
        if (typeof NFT_Config === 'undefined') {
            console.error('NFT_Config не загружен!');
            return null;
        }
        return NFT_Config.find(item => item.id === nftId) || null;
    },

    /**
     * Полная информация об NFT с учётом кастомных параметров из инвентаря
     */
    getFullNFTInfo(nftId, customConfig = null) {
        const base = this.getBaseNFTData(nftId);
        if (!base) return null;

        // Если передан кастомный конфиг - используем его, иначе берём из базы
        const bgKey = customConfig?.background || base.background;
        const colorKey = customConfig?.color || base.color;
        const iconKey = customConfig?.icons || base.icons;

        const background = NFT_Backgrounds?.[bgKey] || { gradient: '#333' };
        const color = NFT_Colors?.[colorKey] || { hex: '#fff' };
        const icon = NFT_Icons?.[iconKey] || { code: '\uf128' };

        return {
            id: base.id,
            name: base.name,
            file: base.file,
            basePrice: base.basePrice || 0,
            background: bgKey,
            color: colorKey,
            icons: iconKey,
            backgroundGradient: background.gradient || '#333',
            colorHex: color.hex || '#fff',
            iconCode: icon.code || '\uf128',
            totalPrice: typeof calculateNFTPrice === 'function' 
                ? calculateNFTPriceWithCustom(base.id, bgKey, colorKey, iconKey)
                : (base.basePrice || 0)
        };
    },

    /**
     * Получает количество копий определённого NFT в инвентаре
     */
    getCount(nftId) {
        return InventoryData.filter(item => item.id === nftId).length;
    },

    /**
     * Проверяет, есть ли NFT в инвентаре (хотя бы одна копия)
     */
    isOwned(nftId) {
        return this.getCount(nftId) > 0;
    },

    /**
     * Рендерит инвентарь (создаёт отдельную карточку для каждого NFT)
     */
    renderInventory() {
        const grid = document.getElementById('inventoryGrid');
        if (!grid) return;

        grid.innerHTML = '';

        if (InventoryData.length === 0) {
            grid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 40px 20px; color: #888;">
                    <i class="fas fa-box-open" style="font-size: 40px; display: block; margin-bottom: 15px;"></i>
                    Инвентарь пуст. Купите NFT в магазине!
                </div>
            `;
            return;
        }

        // Создаём карточку для КАЖДОГО NFT в инвентаре
        InventoryData.forEach((item, index) => {
            const info = this.getFullNFTInfo(item.id, {
                background: item.background,
                color: item.color,
                icons: item.icons
            });
            
            if (!info) return;

            const card = document.createElement('div');
            card.className = 'nft-card';
            card.style.background = info.backgroundGradient;

            // Фоновый узор (8x4)
            const bgPattern = this.createInventoryBackground(info.iconCode);
            const bgDiv = document.createElement('div');
            bgDiv.className = 'nft-icons-background';
            bgDiv.textContent = bgPattern;
            card.appendChild(bgDiv);

            // Изображение
            const imgDiv = document.createElement('div');
            imgDiv.className = 'nft-image';
            imgDiv.style.backgroundImage = `url(nft/${info.file})`;
            card.appendChild(imgDiv);

            // Название (без номера копии)
            const nameDiv = document.createElement('div');
            nameDiv.className = 'nft-name';
            nameDiv.style.color = info.colorHex;
            nameDiv.textContent = info.name;
            card.appendChild(nameDiv);

            // Кнопка "Посмотреть"
            const btn = document.createElement('button');
            btn.className = 'nft-view-btn';
            btn.textContent = 'Посмотреть';
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const count = this.getCount(info.id);
                alert(
                    `NFT: ${info.name}\n` +
                    `Количество: ${count}\n` +
                    `Фон: ${info.background}\n` +
                    `Цвет: ${info.color}\n` +
                    `Иконка: ${info.icons}\n` +
                    `Цена: ${info.totalPrice}$`
                );
            });
            card.appendChild(btn);

            grid.appendChild(card);
        });
    },

    /**
     * Рендерит магазин (показывает все доступные NFT из NFT_Config)
     */
    renderShop() {
        const list = document.getElementById('shopList');
        if (!list) return;

        list.innerHTML = '';

        if (typeof NFT_Config === 'undefined' || !NFT_Config.length) {
            list.innerHTML = `
                <div style="text-align: center; padding: 40px 20px; color: #888;">
                    <i class="fas fa-store" style="font-size: 40px; display: block; margin-bottom: 15px;"></i>
                    Магазин временно закрыт
                </div>
            `;
            return;
        }

        NFT_Config.forEach(baseNft => {
            const info = this.getFullNFTInfo(baseNft.id);
            if (!info) return;

            const count = this.getCount(baseNft.id);

            const card = document.createElement('div');
            card.className = 'shop-card';
            card.style.background = info.backgroundGradient;

            // Фоновый узор для магазина (16x2)
            const bgPattern = this.createShopBackground(info.iconCode);
            const bgDiv = document.createElement('div');
            bgDiv.className = 'nft-icons-background-shop';
            bgDiv.textContent = bgPattern;
            card.appendChild(bgDiv);

            // Иконка NFT
            const iconDiv = document.createElement('div');
            iconDiv.className = 'shop-nft-icon';
            iconDiv.style.backgroundImage = `url(nft/${info.file})`;
            card.appendChild(iconDiv);

            // Информация
            const infoDiv = document.createElement('div');
            infoDiv.className = 'shop-info';

            const nameDiv = document.createElement('div');
            nameDiv.className = 'shop-item-name';
            nameDiv.style.color = info.colorHex;
            nameDiv.textContent = info.name;
            infoDiv.appendChild(nameDiv);

            // Цена
            const priceDiv = document.createElement('div');
            priceDiv.className = 'shop-price';
            priceDiv.textContent = `${info.totalPrice}$`;
            infoDiv.appendChild(priceDiv);

            // Кнопка (всегда "Купить", даже если уже есть в инвентаре)
            const btn = document.createElement('button');
            btn.className = 'shop-buy-btn';
            btn.innerHTML = '<i class="fas fa-shopping-cart"></i> Купить';
            
            // Добавляем индикатор количества, если есть
            if (count > 0) {
                const countBadge = document.createElement('span');
                countBadge.style.cssText = `
                    background: rgba(248, 211, 71, 0.2);
                    padding: 2px 8px;
                    border-radius: 12px;
                    font-size: 10px;
                    margin-left: 6px;
                    color: #f8d347;
                `;
                countBadge.textContent = `×${count}`;
                btn.appendChild(countBadge);
            }

			btn.addEventListener('click', (e) => {
				e.stopPropagation();
				
				// Открываем модальное окно вместо confirm
				if (typeof NFTModal !== 'undefined') {
					NFTModal.open(info.id);
				} else {
					// Fallback если модалка не загружена
					if (confirm(`Купить ${info.name} за ${info.totalPrice}$?`)) {
						InventoryData.push({ 
							id: info.id, 
							background: info.background, 
							color: info.color, 
							icons: info.icons 
						});
						
						this.renderInventory();
						this.renderShop();
						
						const newCount = this.getCount(info.id);
						alert(`✅ ${info.name} куплен! (всего: ${newCount})`);
					}
				}
			});

            infoDiv.appendChild(btn);
            card.appendChild(infoDiv);
            list.appendChild(card);
        });
    },

    /**
     * Добавляет NFT в инвентарь с кастомными параметрами
     */
    addToInventory(nftId, customConfig = null) {
        const base = this.getBaseNFTData(nftId);
        if (!base) return false;

        const item = {
            id: nftId,
            background: customConfig?.background || base.background,
            color: customConfig?.color || base.color,
            icons: customConfig?.icons || base.icons
        };

        InventoryData.push(item);
        this.renderInventory();
        this.renderShop();
        return true;
    },

    /**
     * Удаляет NFT из инвентаря по индексу или ID (удаляет последний экземпляр)
     */
    removeFromInventory(indexOrId) {
        if (typeof indexOrId === 'number') {
            InventoryData.splice(indexOrId, 1);
        } else {
            // Удаляем последний экземпляр с таким ID
            const indices = [];
            InventoryData.forEach((item, index) => {
                if (item.id === indexOrId) indices.push(index);
            });
            if (indices.length > 0) {
                InventoryData.splice(indices[indices.length - 1], 1);
            }
        }
        this.renderInventory();
        this.renderShop();
    },

    /**
     * Получить все NFT в инвентаре
     */
    getInventory() {
        return InventoryData;
    },

    /**
     * Получить количество копий конкретного NFT
     */
    getCount(nftId) {
        return InventoryData.filter(item => item.id === nftId).length;
    }
};

// ---- Функция для расчёта цены с кастомными параметрами ----
function calculateNFTPriceWithCustom(nftId, bgKey, colorKey, iconKey) {
    const base = NFT_Config.find(item => item.id === nftId);
    if (!base) return 0;
    
    const basePrice = base.basePrice || 0;
    const backgroundPrice = NFT_Backgrounds[bgKey]?.price || 0;
    const colorPrice = NFT_Colors[colorKey]?.price || 0;
    const iconPrice = NFT_Icons[iconKey]?.price || 0;
    
    return basePrice + backgroundPrice + colorPrice + iconPrice;
}

// Делаем доступным глобально
window.NFTManager = NFTManager;
window.calculateNFTPriceWithCustom = calculateNFTPriceWithCustom;

// Автоматическая инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('inventoryGrid') && document.getElementById('shopList')) {
        NFTManager.renderInventory();
        NFTManager.renderShop();
    }
});

console.log('✅ NFT Manager загружен!');
console.log('📦 Инвентарь:', NFTManager.getInventory().length, 'NFT');
console.log('🔄 Поддерживаются множественные копии (каждая копия - отдельная карточка)!');