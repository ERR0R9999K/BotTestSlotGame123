class MoneySystem {
    constructor() {
        const savedBalance = localStorage.getItem('slotBalance');
        this.balance = savedBalance ? parseInt(savedBalance) : 150;
        this.spinCost = 15;
        this.adReward = 50;
        
        this.balanceElement = document.getElementById('balanceAmount');
        this.spinButton = document.getElementById('spinBtn');
        
        this.spinButton.setAttribute('data-dynamic', 'true');
        
        this.updateBalanceDisplay();
        this.updateSpinButton();
    }
    
    updateBalanceDisplay() {
        this.balanceElement.textContent = `${this.balance}$`;
        localStorage.setItem('slotBalance', this.balance);
        
        if (this.balance < this.spinCost) {
            this.balanceElement.style.color = '#f44336';
        } else {
            this.balanceElement.style.color = '#4caf50';
        }
    }
    
    updateSpinButton() {
        if (this.balance < this.spinCost) {
            this.spinButton.disabled = true;
            this.spinButton.textContent = 'НЕДОСТАТОЧНО СРЕДСТВ!';
        } else {
            this.spinButton.disabled = false;
            this.spinButton.textContent = `КРУТИТЬ (-${this.spinCost}$)`;
        }
    }
    
    chargeForSpin() {
        if (this.balance >= this.spinCost) {
            this.balance -= this.spinCost;
            this.updateBalanceDisplay();
            this.updateSpinButton();
            return true;
        }
        return false;
    }
    
    addWinnings(amount) {
        this.balance += amount;
        this.updateBalanceDisplay();
        this.updateSpinButton();
    }
    
    addAdReward() {
        this.balance += this.adReward;
        this.updateBalanceDisplay();
        this.updateSpinButton();
    }
    
    getBalance() {
        return this.balance;
    }
    
    getSpinCost() {
        return this.spinCost;
    }
    
    getAdReward() {
        return this.adReward;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.moneySystem = new MoneySystem();
    }, 100);
});