// promo.js
class PromoSystem {
    constructor() {
        this.promoOverlay = document.getElementById('promoOverlay');
        this.promoInput = document.getElementById('promoInput');
        this.promoSubmitBtn = document.getElementById('promoSubmitBtn');
        this.promoBtn = document.getElementById('promoBtn');
        this.closePromoBtn = document.getElementById('closePromoBtn');
        
        this.promoDatabase = {
            'WELCOME100': { reward: 100 },
            'FREEMONEY50': { reward: 50 },
            'SLOTLOVER': { reward: 200 },
            'JACKPOT': { reward: 500 },
            'DAILY10': { reward: 10 },
            'NEWYEAR2024': { reward: 150 },
            'ERROR9999K': { reward: 999 },
            'FREERANKS': { reward: 250 },
            '777': { reward: 777 },
            'ILOVESLOTS': { reward: 1000 },
            'YOUTUBE': { reward: 100 },
            'DISCORD': { reward: 150 },
            'GITHUB': { reward: 200 }
        };
        
        this.usedPromos = JSON.parse(localStorage.getItem('usedPromos') || '{}');
        
        this.initializeEventListeners();
    }
    
    initializeEventListeners() {
        this.promoBtn.addEventListener('click', () => this.showPromoWindow());
        this.closePromoBtn.addEventListener('click', () => this.closePromoWindow());
        this.promoSubmitBtn.addEventListener('click', () => this.activatePromo());
        
        this.promoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.activatePromo();
        });
        
        this.promoInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.toUpperCase();
        });
        
        this.promoOverlay.addEventListener('click', (e) => {
            if (e.target === this.promoOverlay) this.closePromoWindow();
        });
    }
    
    showPromoWindow() {
        if (window.adSystem?.isAdActive()) return;
        this.promoOverlay.style.display = 'flex';
        this.promoInput.value = '';
        this.promoInput.focus();
    }
    
    closePromoWindow() {
        this.promoOverlay.style.display = 'none';
    }
    
    activatePromo() {
        const promoCode = this.promoInput.value.trim().toUpperCase();
        if (!promoCode) return;
        
        const promo = this.promoDatabase[promoCode];
        if (!promo) return;
        
        if (this.usedPromos[promoCode]) return;
        
        if (window.moneySystem) {
            window.moneySystem.addWinnings(promo.reward);
            this.usedPromos[promoCode] = true;
            localStorage.setItem('usedPromos', JSON.stringify(this.usedPromos));
            this.promoInput.value = '';
            this.closePromoWindow();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.promoSystem = new PromoSystem();
    }, 150);
});