// slotgame.js
class SlotGame {
    constructor() {
        this.symbols = ['🍒', '🍋', '🍊', '🍇', '🍉', '7️⃣', '💰', '🔔'];
        this.winProcent = 0.05;
        
        this.reels = [
            document.getElementById('reel1'),
            document.getElementById('reel2'),
            document.getElementById('reel3')
        ];
        this.spinBtn = document.getElementById('spinBtn');
        this.resultMessage = document.getElementById('resultMessage');
        
        this.spinBtn.setAttribute('data-dynamic', 'true');
        this.resultMessage.setAttribute('data-dynamic', 'true');
        
        this.winningCombinations = [
            ['7️⃣', '7️⃣', '7️⃣'],
            ['💰', '💰', '💰'],
            ['🍒', '🍒', '🍒'],
            ['🔔', '🔔', '🔔'],
            ['🍇', '🍇', '🍇'],
            ['🍋', '🍋', '🍋'],
            ['🍊', '🍊', '🍊'],
            ['🍉', '🍉', '🍉']
        ];
        
        this.isSpinning = false;
        this.itemHeight = 120; // значение по умолчанию
        
        this.initializeSlots();
        this.attachEventListeners();
        this.updateUI();
    }
    
    initializeSlots() {
        this.reels.forEach(reel => {
            reel.innerHTML = '';
            for (let i = 0; i < 20; i++) {
                const randomSymbol = this.symbols[Math.floor(Math.random() * this.symbols.length)];
                const slotItem = document.createElement('div');
                slotItem.className = 'slot-item';
                slotItem.textContent = randomSymbol;
                reel.appendChild(slotItem);
            }
        });
        
        // Определяем реальную высоту элемента
        this.updateItemHeight();
    }
    
    updateItemHeight() {
        // Получаем высоту первого элемента .slot-item
        const firstItem = document.querySelector('.slot-item');
        if (firstItem) {
            // Получаем вычисленную высоту
            const height = firstItem.offsetHeight;
            if (height > 0) {
                this.itemHeight = height;
            }
        }
        
        // Устанавливаем высоту для всех элементов
        this.reels.forEach(reel => {
            const items = reel.querySelectorAll('.slot-item');
            items.forEach(item => {
                item.style.height = this.itemHeight + 'px';
            });
        });
    }
    
    attachEventListeners() {
        this.spinBtn.addEventListener('click', () => this.spin());
    }
    
    spin() {
        if (this.isSpinning || window.adSystem?.isAdActive()) return;
        
        if (!window.moneySystem?.chargeForSpin()) {
            this.resultMessage.textContent = 'Недостаточно средств!';
            this.resultMessage.className = 'result-message lose';
            return;
        }
        
        this.isSpinning = true;
        this.spinBtn.disabled = true;
        this.resultMessage.textContent = 'Крутим...';
        this.resultMessage.className = 'result-message';
        
        // Обновляем высоту перед анимацией (на случай изменения размера)
        this.updateItemHeight();
        
        const isWin = Math.random() < this.winProcent;
        let result;
        
        if (isWin) {
            result = this.winningCombinations[Math.floor(Math.random() * this.winningCombinations.length)];
        } else {
            result = [
                this.symbols[Math.floor(Math.random() * this.symbols.length)],
                this.symbols[Math.floor(Math.random() * this.symbols.length)],
                this.symbols[Math.floor(Math.random() * this.symbols.length)]
            ];
            while (this.isWinningCombination(result)) {
                result = [
                    this.symbols[Math.floor(Math.random() * this.symbols.length)],
                    this.symbols[Math.floor(Math.random() * this.symbols.length)],
                    this.symbols[Math.floor(Math.random() * this.symbols.length)]
                ];
            }
        }
        
        this.animateReels(result);
    }
    
    animateReels(result) {
        const itemHeight = this.itemHeight;
        const lastIndex = 19; // последний элемент (индекс 19 из 20)
        
        this.reels.forEach((reel, index) => {
            const items = reel.querySelectorAll('.slot-item');
            let currentPosition = 0;
            
            // Вращение
            const spinInterval = setInterval(() => {
                currentPosition += 1;
                if (currentPosition >= items.length) currentPosition = 0;
                reel.style.top = `-${currentPosition * itemHeight}px`;
            }, 50);
            
            // Остановка барабана через разное время
            setTimeout(() => {
                clearInterval(spinInterval);
                // Устанавливаем позицию последнего элемента
                reel.style.top = `-${lastIndex * itemHeight}px`;
                
                // Меняем содержимое последнего элемента на нужный символ
                setTimeout(() => {
                    items[lastIndex].textContent = result[index];
                }, 50);
                
                // Когда все барабаны остановились
                if (index === this.reels.length - 1) {
                    setTimeout(() => this.checkResult(result), 500);
                }
            }, 1000 + index * 500);
        });
    }
    
    isWinningCombination(combination) {
        return this.winningCombinations.some(winCombo => 
            winCombo[0] === combination[0] && 
            winCombo[1] === combination[1] && 
            winCombo[2] === combination[2]
        );
    }
    
    checkResult(result) {
        this.isSpinning = false;
        this.spinBtn.disabled = false;
        
        if (window.moneySystem) {
            window.moneySystem.updateSpinButton();
        }
        
        if (this.isWinningCombination(result)) {
            let winAmount;
            
            if (result[0] === '7️⃣') {
                winAmount = 1000;
                this.resultMessage.textContent = 'ДЖЕКПОТ! ВЫ ВЫИГРАЛИ 1000$!';
                this.resultMessage.className = 'result-message jackpot';
            } else {
                winAmount = 100;
                this.resultMessage.textContent = 'ПОЗДРАВЛЯЕМ! ВЫ ВЫИГРАЛИ 100$!';
                this.resultMessage.className = 'result-message win';
            }
            
            if (window.moneySystem) {
                window.moneySystem.addWinnings(winAmount);
            }
        } else {
            this.resultMessage.textContent = 'Повезёт в следующий раз!';
            this.resultMessage.className = 'result-message lose';
        }
    }
    
    updateUI() {
        if (window.moneySystem) {
            const balance = window.moneySystem.getBalance();
            const spinCost = window.moneySystem.getSpinCost();
            
            if (balance < spinCost) {
                this.resultMessage.textContent = 'Недостаточно средств!';
                this.resultMessage.className = 'result-message lose';
            } else {
                this.resultMessage.textContent = 'Нажмите "Крутить" чтобы начать игру';
                this.resultMessage.className = 'result-message';
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.slotGame = new SlotGame();
    }, 100);
});