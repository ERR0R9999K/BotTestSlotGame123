// ============================================================
// nft_modal.js — Модальное окно покупки NFT с выбором параметров
// ============================================================

const NFTModal = {
    /**
     * Создаёт фоновый узор для превью (сетка 16x4)
     */
    createPreviewBackground(iconCode) {
        if (!iconCode) return '';
        const rows = 4;
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
     * Получает символ иконки из Unicode кода
     */
    getIconChar(iconCode) {
        if (!iconCode) return '?';
        try {
            return String.fromCharCode(parseInt(iconCode.replace('\\u', ''), 16));
        } catch (e) {
            return '?';
        }
    },

    /**
     * Создаёт кружок для предпросмотра в виде текстового символа
     */
    getColorCircle(color) {
        return `●`;
    },

    /**
     * Открывает модальное окно покупки
     */
    open(nftId) {
        const base = NFT_Config.find(item => item.id === nftId);
        if (!base) return;

        let selectedBackground = base.background;
        let selectedColor = base.color;
        let selectedIcon = base.icons;

        const overlay = document.createElement('div');
        overlay.className = 'nft-modal-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.92);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
            padding: 16px;
            animation: fadeIn 0.3s ease;
        `;

        const modal = document.createElement('div');
        modal.style.cssText = `
            background: linear-gradient(145deg, #2a2a3a, #1a1a2e);
            border-radius: 20px;
            width: 100%;
            max-width: 500px;
            max-height: 95vh;
            overflow: hidden;
            border: 2px solid #444;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
            display: flex;
            flex-direction: column;
        `;

        // ===== ВЕРХНЯЯ ЧАСТЬ - ПРЕВЬЮ NFT =====
        const previewSection = document.createElement('div');
        previewSection.style.cssText = `
            flex: 1;
            min-height: 200px;
            padding: 16px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;
            border-bottom: 2px solid #333;
        `;

        function updatePreview() {
            const info = NFTModal.getPreviewInfo(nftId, selectedBackground, selectedColor, selectedIcon);
            
            previewSection.innerHTML = '';
            previewSection.style.background = info.backgroundGradient;

            // Фоновый узор превью (16x4)
            const bgPattern = NFTModal.createPreviewBackground(info.iconCode);
            const bgDiv = document.createElement('div');
            bgDiv.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 0;
                opacity: 0.08;
                font-family: 'Font Awesome 6 Free', 'Font Awesome 5 Free', Arial, sans-serif;
                font-weight: 900;
                font-size: 20px;
                color: rgba(255, 255, 255, 0.7);
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: center;
                padding: 12px;
                letter-spacing: 8px;
                line-height: 2.4;
                transform: rotate(-3deg) scale(1.05);
                white-space: pre-wrap;
                word-break: break-all;
                overflow: hidden;
            `;
            bgDiv.textContent = bgPattern;
            previewSection.appendChild(bgDiv);

            // Изображение NFT
            const img = document.createElement('div');
            img.style.cssText = `
                width: 30%;
                aspect-ratio: 1/1;
                background-image: url(nft/${info.file});
                background-size: cover;
                background-position: center;
                position: relative;
                z-index: 1;
                margin-bottom: 4px;
            `;
            previewSection.appendChild(img);

            // Название NFT
            const nftName = document.createElement('div');
            nftName.style.cssText = `
                position: relative;
                z-index: 1;
                color: ${info.colorHex};
                font-size: 18px;
                font-weight: bold;
                margin-top: 12px;
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
            `;
            nftName.textContent = info.name;
            previewSection.appendChild(nftName);
        }

        updatePreview();

        // ===== НИЖНЯЯ ЧАСТЬ - ХАРАКТЕРИСТИКИ =====
        const infoSection = document.createElement('div');
        infoSection.style.cssText = `
            flex: 1;
            padding: 16px;
            overflow-y: auto;
        `;

        const infoCard = document.createElement('div');
        infoCard.style.cssText = `
            background: rgba(0, 0, 0, 0.3);
            border-radius: 12px;
            padding: 12px;
            border: 1px solid #333;
        `;

        const table = document.createElement('div');
        table.style.cssText = `
            display: flex;
            flex-direction: column;
            gap: 6px;
        `;

        function createTableRow(label, type, value) {
            const row = document.createElement('div');
            row.style.cssText = `
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 6px 10px;
                border-radius: 6px;
                background: rgba(255, 255, 255, 0.03);
            `;

            const labelDiv = document.createElement('div');
            labelDiv.style.cssText = `
                font-size: 13px;
                font-weight: 600;
                color: #f8d347;
                min-width: 80px;
            `;
            labelDiv.textContent = label;
            row.appendChild(labelDiv);

            const valueDiv = document.createElement('div');
            valueDiv.style.cssText = `
                display: flex;
                align-items: center;
                gap: 8px;
                flex: 1;
                justify-content: flex-end;
            `;

            if (type === 'background') {
                const select = NFTModal.createBackgroundSelect(selectedBackground, (newValue) => {
                    selectedBackground = newValue;
                    updatePreview();
                    updateInfo();
                });
                valueDiv.appendChild(select);
            } else if (type === 'color') {
                const select = NFTModal.createColorSelect(selectedColor, (newValue) => {
                    selectedColor = newValue;
                    updatePreview();
                    updateInfo();
                });
                valueDiv.appendChild(select);
            } else if (type === 'icon') {
                const select = NFTModal.createIconSelect(selectedIcon, (newValue) => {
                    selectedIcon = newValue;
                    updatePreview();
                    updateInfo();
                });
                valueDiv.appendChild(select);
            } else if (type === 'price') {
                const priceSpan = document.createElement('span');
                priceSpan.style.cssText = `
                    font-size: 15px;
                    font-weight: bold;
                    color: #4caf50;
                `;
                priceSpan.textContent = value;
                valueDiv.appendChild(priceSpan);
            } else {
                const textSpan = document.createElement('span');
                textSpan.style.cssText = `
                    font-size: 13px;
                    color: ${label === 'Название' ? value : '#ddd'};
                `;
                textSpan.textContent = value;
                valueDiv.appendChild(textSpan);
            }

            row.appendChild(valueDiv);
            return row;
        }

        function updateInfo() {
            const info = NFTModal.getPreviewInfo(nftId, selectedBackground, selectedColor, selectedIcon);
            table.innerHTML = '';

            const nameRow = document.createElement('div');
            nameRow.style.cssText = `
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 6px 10px;
                border-radius: 6px;
                background: rgba(255, 255, 255, 0.03);
            `;
            const nameLabel = document.createElement('div');
            nameLabel.style.cssText = `
                font-size: 13px;
                font-weight: 600;
                color: #f8d347;
                min-width: 80px;
            `;
            nameLabel.textContent = 'Название';
            nameRow.appendChild(nameLabel);
            const nameValue = document.createElement('div');
            nameValue.style.cssText = `
                font-size: 13px;
                color: ${info.colorHex};
            `;
            nameValue.textContent = info.name;
            nameRow.appendChild(nameValue);
            table.appendChild(nameRow);

            table.appendChild(createTableRow('Фон', 'background', ''));
            table.appendChild(createTableRow('Цвет', 'color', ''));
            table.appendChild(createTableRow('Узор', 'icon', ''));

            const totalPrice = NFTModal.calculateTotalPrice(nftId, selectedBackground, selectedColor, selectedIcon);
            table.appendChild(createTableRow('Ценность', 'price', `${totalPrice}$`));
        }

        updateInfo();
        infoCard.appendChild(table);
        infoSection.appendChild(infoCard);

        // Кнопка КУПИТЬ
        const buyButton = document.createElement('button');
        buyButton.className = 'shop-buy-btn';
        buyButton.style.cssText = `
            width: 100%;
            padding: 14px;
            font-size: 16px;
            font-weight: bold;
            margin-top: 12px;
            border-radius: 12px;
            background: linear-gradient(145deg, #4caf50, #388e3c);
            border: none;
            color: white;
            cursor: pointer;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        `;
        buyButton.innerHTML = '<i class="fas fa-shopping-cart"></i> КУПИТЬ';
        buyButton.addEventListener('click', () => {
            const totalPrice = NFTModal.calculateTotalPrice(nftId, selectedBackground, selectedColor, selectedIcon);
            if (confirm(`Купить ${base.name} за ${totalPrice}$?`)) {
                if (typeof NFTManager !== 'undefined') {
                    NFTManager.addToInventory(nftId, {
                        background: selectedBackground,
                        color: selectedColor,
                        icons: selectedIcon
                    });
                }
                document.body.removeChild(overlay);
                alert(`✅ ${base.name} куплен!`);
            }
        });

        // Кнопка ЗАКРЫТЬ
        const closeButton = document.createElement('button');
        closeButton.style.cssText = `
            width: 100%;
            padding: 10px;
            font-size: 14px;
            font-weight: bold;
            margin-top: 6px;
            border-radius: 10px;
            background: linear-gradient(145deg, #666, #444);
            border: none;
            color: white;
            cursor: pointer;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        `;
        closeButton.innerHTML = '<i class="fas fa-times"></i> ЗАКРЫТЬ';
        closeButton.addEventListener('click', () => {
            document.body.removeChild(overlay);
        });

        modal.appendChild(previewSection);
        modal.appendChild(infoSection);
        modal.appendChild(buyButton);
        modal.appendChild(closeButton);
        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
            }
        });
    },

    getPreviewInfo(nftId, bgKey, colorKey, iconKey) {
        const base = NFT_Config.find(item => item.id === nftId);
        if (!base) return null;

        const background = NFT_Backgrounds?.[bgKey] || { gradient: '#333' };
        const color = NFT_Colors?.[colorKey] || { hex: '#fff' };
        const icon = NFT_Icons?.[iconKey] || { code: '\uf128' };

        return {
            name: base.name,
            file: base.file,
            backgroundGradient: background.gradient || '#333',
            colorHex: color.hex || '#fff',
            iconCode: icon.code || '\uf128',
            background: bgKey,
            color: colorKey,
            icons: iconKey
        };
    },

    calculateTotalPrice(nftId, bgKey, colorKey, iconKey) {
        if (typeof calculateNFTPriceWithCustom === 'function') {
            return calculateNFTPriceWithCustom(nftId, bgKey, colorKey, iconKey);
        }
        
        const base = NFT_Config.find(item => item.id === nftId);
        if (!base) return 0;
        
        const basePrice = base.basePrice || 0;
        const backgroundPrice = NFT_Backgrounds[bgKey]?.price || 0;
        const colorPrice = NFT_Colors[colorKey]?.price || 0;
        const iconPrice = NFT_Icons[iconKey]?.price || 0;
        
        return basePrice + backgroundPrice + colorPrice + iconPrice;
    },

	/**
	 * Создаёт кастомный выпадающий список для фонов с предпросмотром градиента
	 */
	createBackgroundSelect(selected, onChange) {
		const container = document.createElement('div');
		container.style.cssText = `
			position: relative;
			display: inline-block;
			width: 200px;
		`;

		// Создаем кнопку-триггер
		const trigger = document.createElement('div');
		trigger.style.cssText = `
			display: flex;
			align-items: center;
			gap: 10px;
			padding: 6px 12px;
			background: rgba(255,255,255,0.05);
			border: 1px solid #444;
			border-radius: 6px;
			cursor: pointer;
			color: #ddd;
			font-size: 12px;
			min-height: 32px;
			transition: all 0.2s;
			user-select: none;
		`;
		trigger.onmouseover = () => trigger.style.background = 'rgba(255,255,255,0.1)';
		trigger.onmouseout = () => trigger.style.background = 'rgba(255,255,255,0.05)';

		// Предпросмотр текущего выбора
		const previewCircle = document.createElement('div');
		previewCircle.style.cssText = `
			width: 18px;
			height: 18px;
			border-radius: 50%;
			border: 2px solid #444;
			flex-shrink: 0;
			background: ${NFT_Backgrounds[selected]?.gradient || '#333'};
		`;
		trigger.appendChild(previewCircle);

		const triggerText = document.createElement('span');
		triggerText.textContent = selected;
		trigger.appendChild(triggerText);

		// Стрелка
		const arrow = document.createElement('span');
		arrow.textContent = '▼';
		arrow.style.cssText = `
			margin-left: auto;
			font-size: 10px;
			opacity: 0.6;
		`;
		trigger.appendChild(arrow);

		// Выпадающий список
		const dropdown = document.createElement('div');
		dropdown.style.cssText = `
			display: none;
			position: fixed;
			min-width: 200px;
			max-width: 300px;
			max-height: 200px;
			background: #1a1a2e;
			border: 1px solid #444;
			border-radius: 6px;
			overflow-y: auto;
			z-index: 9999;
			padding: 4px 0;
			box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
		`;

		// Стилизация скроллбара
		dropdown.style.scrollbarWidth = 'thin';
		dropdown.style.scrollbarColor = '#444 transparent';

		const sorted = Object.entries(NFT_Backgrounds).sort((a, b) => a[1].price - b[1].price);

		sorted.forEach(([key, value]) => {
			const item = document.createElement('div');
			item.style.cssText = `
				display: flex;
				align-items: center;
				gap: 10px;
				padding: 6px 12px;
				cursor: pointer;
				color: #ddd;
				font-size: 12px;
				transition: background 0.2s;
				white-space: nowrap;
			`;
			item.onmouseover = () => item.style.background = 'rgba(255,255,255,0.1)';
			item.onmouseout = () => item.style.background = key === selected ? 'rgba(255,255,255,0.05)' : 'transparent';

			const circle = document.createElement('div');
			circle.style.cssText = `
				width: 18px;
				height: 18px;
				border-radius: 50%;
				border: 2px solid #444;
				flex-shrink: 0;
				background: ${value.gradient};
			`;
			item.appendChild(circle);

			const text = document.createElement('span');
			text.textContent = `${key} - ${value.price}$`;
			item.appendChild(text);

			if (key === selected) {
				item.style.background = 'rgba(255,255,255,0.05)';
			}

			item.addEventListener('click', () => {
				// Обновляем выбранное значение
				previewCircle.style.background = value.gradient;
				triggerText.textContent = key;
				dropdown.style.display = 'none';
				onChange(key);
			});

			dropdown.appendChild(item);
		});

		// Функция для позиционирования dropdown
		function positionDropdown() {
			const rect = trigger.getBoundingClientRect();
			const dropdownHeight = Math.min(200, dropdown.scrollHeight);
			const spaceBelow = window.innerHeight - rect.bottom - 10;
			const spaceAbove = rect.top - 10;

			dropdown.style.width = rect.width + 'px';
			dropdown.style.left = rect.left + 'px';

			if (spaceBelow >= dropdownHeight || spaceBelow >= spaceAbove) {
				// Показываем снизу
				dropdown.style.top = (rect.bottom + 4) + 'px';
				dropdown.style.bottom = 'auto';
			} else {
				// Показываем сверху
				dropdown.style.top = 'auto';
				dropdown.style.bottom = (window.innerHeight - rect.top + 4) + 'px';
			}
		}

		// Toggle dropdown
		trigger.addEventListener('click', (e) => {
			e.stopPropagation();
			if (dropdown.style.display === 'none') {
				positionDropdown();
				dropdown.style.display = 'block';
			} else {
				dropdown.style.display = 'none';
			}
		});

		// Закрываем при клике вне
		document.addEventListener('click', (e) => {
			if (!container.contains(e.target) && !dropdown.contains(e.target)) {
				dropdown.style.display = 'none';
			}
		});

		// Закрываем при скролле
		window.addEventListener('scroll', () => {
			if (dropdown.style.display === 'block') {
				positionDropdown();
			}
		});

		// Закрываем при изменении размера окна
		window.addEventListener('resize', () => {
			if (dropdown.style.display === 'block') {
				positionDropdown();
			}
		});

		container.appendChild(trigger);
		container.appendChild(dropdown);
		return container;
	},

	/**
	 * Создаёт кастомный выпадающий список для цветов с предпросмотром цвета
	 */
	createColorSelect(selected, onChange) {
		const container = document.createElement('div');
		container.style.cssText = `
			position: relative;
			display: inline-block;
			width: 200px;
		`;

		// Создаем кнопку-триггер
		const trigger = document.createElement('div');
		trigger.style.cssText = `
			display: flex;
			align-items: center;
			gap: 10px;
			padding: 6px 12px;
			background: rgba(255,255,255,0.05);
			border: 1px solid #444;
			border-radius: 6px;
			cursor: pointer;
			color: #ddd;
			font-size: 12px;
			min-height: 32px;
			transition: all 0.2s;
			user-select: none;
		`;
		trigger.onmouseover = () => trigger.style.background = 'rgba(255,255,255,0.1)';
		trigger.onmouseout = () => trigger.style.background = 'rgba(255,255,255,0.05)';

		// Предпросмотр текущего выбора
		const previewCircle = document.createElement('div');
		previewCircle.style.cssText = `
			width: 18px;
			height: 18px;
			border-radius: 50%;
			border: 2px solid #444;
			flex-shrink: 0;
			background: ${NFT_Colors[selected]?.hex || '#fff'};
		`;
		trigger.appendChild(previewCircle);

		const triggerText = document.createElement('span');
		triggerText.textContent = selected;
		trigger.appendChild(triggerText);

		// Стрелка
		const arrow = document.createElement('span');
		arrow.textContent = '▼';
		arrow.style.cssText = `
			margin-left: auto;
			font-size: 10px;
			opacity: 0.6;
		`;
		trigger.appendChild(arrow);

		// Выпадающий список
		const dropdown = document.createElement('div');
		dropdown.style.cssText = `
			display: none;
			position: fixed;
			min-width: 200px;
			max-width: 300px;
			max-height: 200px;
			background: #1a1a2e;
			border: 1px solid #444;
			border-radius: 6px;
			overflow-y: auto;
			z-index: 9999;
			padding: 4px 0;
			box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
		`;

		// Стилизация скроллбара
		dropdown.style.scrollbarWidth = 'thin';
		dropdown.style.scrollbarColor = '#444 transparent';

		const sorted = Object.entries(NFT_Colors).sort((a, b) => a[1].price - b[1].price);

		sorted.forEach(([key, value]) => {
			const item = document.createElement('div');
			item.style.cssText = `
				display: flex;
				align-items: center;
				gap: 10px;
				padding: 6px 12px;
				cursor: pointer;
				color: #ddd;
				font-size: 12px;
				transition: background 0.2s;
				white-space: nowrap;
			`;
			item.onmouseover = () => item.style.background = 'rgba(255,255,255,0.1)';
			item.onmouseout = () => item.style.background = key === selected ? 'rgba(255,255,255,0.05)' : 'transparent';

			const circle = document.createElement('div');
			circle.style.cssText = `
				width: 18px;
				height: 18px;
				border-radius: 50%;
				border: 2px solid #444;
				flex-shrink: 0;
				background: ${value.hex};
			`;
			item.appendChild(circle);

			const text = document.createElement('span');
			text.textContent = `${key} - ${value.price}$`;
			item.appendChild(text);

			if (key === selected) {
				item.style.background = 'rgba(255,255,255,0.05)';
			}

			item.addEventListener('click', () => {
				// Обновляем выбранное значение
				previewCircle.style.background = value.hex;
				triggerText.textContent = key;
				dropdown.style.display = 'none';
				onChange(key);
			});

			dropdown.appendChild(item);
		});

		// Функция для позиционирования dropdown
		function positionDropdown() {
			const rect = trigger.getBoundingClientRect();
			const dropdownHeight = Math.min(200, dropdown.scrollHeight);
			const spaceBelow = window.innerHeight - rect.bottom - 10;
			const spaceAbove = rect.top - 10;

			dropdown.style.width = rect.width + 'px';
			dropdown.style.left = rect.left + 'px';

			if (spaceBelow >= dropdownHeight || spaceBelow >= spaceAbove) {
				// Показываем снизу
				dropdown.style.top = (rect.bottom + 4) + 'px';
				dropdown.style.bottom = 'auto';
			} else {
				// Показываем сверху
				dropdown.style.top = 'auto';
				dropdown.style.bottom = (window.innerHeight - rect.top + 4) + 'px';
			}
		}

		// Toggle dropdown
		trigger.addEventListener('click', (e) => {
			e.stopPropagation();
			if (dropdown.style.display === 'none') {
				positionDropdown();
				dropdown.style.display = 'block';
			} else {
				dropdown.style.display = 'none';
			}
		});

		// Закрываем при клике вне
		document.addEventListener('click', (e) => {
			if (!container.contains(e.target) && !dropdown.contains(e.target)) {
				dropdown.style.display = 'none';
			}
		});

		// Закрываем при скролле
		window.addEventListener('scroll', () => {
			if (dropdown.style.display === 'block') {
				positionDropdown();
			}
		});

		// Закрываем при изменении размера окна
		window.addEventListener('resize', () => {
			if (dropdown.style.display === 'block') {
				positionDropdown();
			}
		});

		container.appendChild(trigger);
		container.appendChild(dropdown);
		return container;
	},

	/**
	 * Создаёт кастомный выпадающий список для иконок с предпросмотром иконки
	 */
	createIconSelect(selected, onChange) {
		const container = document.createElement('div');
		container.style.cssText = `
			position: relative;
			display: inline-block;
			width: 200px;
		`;

		// Создаем кнопку-триггер
		const trigger = document.createElement('div');
		trigger.style.cssText = `
			display: flex;
			align-items: center;
			gap: 10px;
			padding: 6px 12px;
			background: rgba(255,255,255,0.05);
			border: 1px solid #444;
			border-radius: 6px;
			cursor: pointer;
			color: #ddd;
			font-size: 12px;
			min-height: 32px;
			transition: all 0.2s;
			user-select: none;
			font-family: 'Font Awesome 6 Free', 'Font Awesome 5 Free', Arial, sans-serif;
			font-weight: 900;
		`;
		trigger.onmouseover = () => trigger.style.background = 'rgba(255,255,255,0.1)';
		trigger.onmouseout = () => trigger.style.background = 'rgba(255,255,255,0.05)';

		// Предпросмотр текущего выбора
		const previewIcon = document.createElement('span');
		const iconData = NFT_Icons[selected];
		const iconChar = iconData?.code || '?';
		previewIcon.style.cssText = `
			width: 24px;
			height: 24px;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 16px;
			color: rgba(255, 255, 255, 0.8);
			border: 2px solid #444;
			border-radius: 50%;
			flex-shrink: 0;
			background: rgba(255,255,255,0.05);
			font-family: 'Font Awesome 6 Free', 'Font Awesome 5 Free', Arial, sans-serif;
			font-weight: 900;
		`;
		previewIcon.textContent = iconChar;
		trigger.appendChild(previewIcon);

		const triggerText = document.createElement('span');
		triggerText.textContent = selected;
		triggerText.style.cssText = `
			font-family: Arial, sans-serif;
			font-weight: normal;
		`;
		trigger.appendChild(triggerText);

		// Стрелка
		const arrow = document.createElement('span');
		arrow.textContent = '▼';
		arrow.style.cssText = `
			margin-left: auto;
			font-size: 10px;
			opacity: 0.6;
			font-family: Arial, sans-serif;
			font-weight: normal;
		`;
		trigger.appendChild(arrow);

		// Выпадающий список
		const dropdown = document.createElement('div');
		dropdown.style.cssText = `
			display: none;
			position: fixed;
			min-width: 200px;
			max-width: 300px;
			max-height: 200px;
			background: #1a1a2e;
			border: 1px solid #444;
			border-radius: 6px;
			overflow-y: auto;
			z-index: 9999;
			padding: 4px 0;
			box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
		`;

		// Стилизация скроллбара
		dropdown.style.scrollbarWidth = 'thin';
		dropdown.style.scrollbarColor = '#444 transparent';

		const sorted = Object.entries(NFT_Icons).sort((a, b) => a[1].price - b[1].price);

		sorted.forEach(([key, value]) => {
			const item = document.createElement('div');
			item.style.cssText = `
				display: flex;
				align-items: center;
				gap: 10px;
				padding: 6px 12px;
				cursor: pointer;
				color: #ddd;
				font-size: 12px;
				transition: background 0.2s;
				white-space: nowrap;
			`;
			item.onmouseover = () => item.style.background = 'rgba(255,255,255,0.1)';
			item.onmouseout = () => item.style.background = key === selected ? 'rgba(255,255,255,0.05)' : 'transparent';

			// Иконка
			const iconSpan = document.createElement('span');
			const iconChar = value.code || '?';
			iconSpan.style.cssText = `
				width: 24px;
				height: 24px;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 16px;
				color: rgba(255, 255, 255, 0.8);
				border: 2px solid #444;
				border-radius: 50%;
				flex-shrink: 0;
				background: rgba(255,255,255,0.05);
				font-family: 'Font Awesome 6 Free', 'Font Awesome 5 Free', Arial, sans-serif;
				font-weight: 900;
			`;
			iconSpan.textContent = iconChar;
			item.appendChild(iconSpan);

			const text = document.createElement('span');
			text.textContent = `${key} - ${value.price}$`;
			text.style.cssText = `
				font-family: Arial, sans-serif;
				font-weight: normal;
			`;
			item.appendChild(text);

			if (key === selected) {
				item.style.background = 'rgba(255,255,255,0.05)';
			}

			item.addEventListener('click', () => {
				// Обновляем выбранное значение
				const newIconChar = NFT_Icons[key]?.code || '?';
				previewIcon.textContent = newIconChar;
				triggerText.textContent = key;
				dropdown.style.display = 'none';
				onChange(key);
			});

			dropdown.appendChild(item);
		});

		// Функция для позиционирования dropdown
		function positionDropdown() {
			const rect = trigger.getBoundingClientRect();
			const dropdownHeight = Math.min(200, dropdown.scrollHeight);
			const spaceBelow = window.innerHeight - rect.bottom - 10;
			const spaceAbove = rect.top - 10;

			dropdown.style.width = rect.width + 'px';
			dropdown.style.left = rect.left + 'px';

			if (spaceBelow >= dropdownHeight || spaceBelow >= spaceAbove) {
				// Показываем снизу
				dropdown.style.top = (rect.bottom + 4) + 'px';
				dropdown.style.bottom = 'auto';
			} else {
				// Показываем сверху
				dropdown.style.top = 'auto';
				dropdown.style.bottom = (window.innerHeight - rect.top + 4) + 'px';
			}
		}

		// Toggle dropdown
		trigger.addEventListener('click', (e) => {
			e.stopPropagation();
			if (dropdown.style.display === 'none') {
				positionDropdown();
				dropdown.style.display = 'block';
			} else {
				dropdown.style.display = 'none';
			}
		});

		// Закрываем при клике вне
		document.addEventListener('click', (e) => {
			if (!container.contains(e.target) && !dropdown.contains(e.target)) {
				dropdown.style.display = 'none';
			}
		});

		// Закрываем при скролле
		window.addEventListener('scroll', () => {
			if (dropdown.style.display === 'block') {
				positionDropdown();
			}
		});

		// Закрываем при изменении размера окна
		window.addEventListener('resize', () => {
			if (dropdown.style.display === 'block') {
				positionDropdown();
			}
		});

		container.appendChild(trigger);
		container.appendChild(dropdown);
		return container;
	}
};

window.NFTModal = NFTModal;
console.log('✅ NFT Modal загружен!');