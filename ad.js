// ad.js
class AdSystem {
    constructor() {
        this.adOverlay = document.getElementById('adOverlay');
        this.adTimerElement = document.getElementById('adTimer');
        this.closeAdBtn = document.getElementById('closeAdBtn');
        this.adVideo = document.getElementById('adVideo');
        this.adBtn = document.getElementById('adBtn');
        
        this.adDuration = 15;
        this.timerInterval = null;
        this.timeLeft = this.adDuration;
        this.videoPlayed = false;
        
        this.closeAdBtn.setAttribute('data-dynamic', 'true');
        this.adBtn.setAttribute('data-dynamic', 'true');
        
        this.initializeEventListeners();
    }
    
    initializeEventListeners() {
        this.adBtn.addEventListener('click', () => this.showAd());
        this.closeAdBtn.addEventListener('click', () => this.closeAd());
        
        this.adVideo.addEventListener('ended', () => {
            if (this.timeLeft > 0) {
                this.adVideo.currentTime = 0;
                this.adVideo.play();
            }
        });
        
        this.adOverlay.addEventListener('click', (e) => {
            if (e.target === this.adOverlay && !this.videoPlayed) {
                this.tryPlayVideoWithSound();
            }
        });
    }
    
    showAd() {
        this.adBtn.disabled = true;
        this.timeLeft = this.adDuration;
        this.adOverlay.style.display = 'flex';
        this.closeAdBtn.disabled = true;
        this.adTimerElement.textContent = this.timeLeft;
        this.adVideo.currentTime = 0;
        this.videoPlayed = false;
        
        this.updateCloseButtonText();
        this.tryPlayVideo();
    }
    
    tryPlayVideo() {
        this.adVideo.muted = true;
        this.adVideo.volume = 0;
        
        const playPromise = this.adVideo.play();
        
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    this.videoPlayed = true;
                    this.startTimer();
                    
                    setTimeout(() => {
                        this.tryUnmuteVideo();
                    }, 1000);
                })
                .catch(error => {
                    console.log('Video play failed:', error);
                    this.startTimer();
                });
        } else {
            this.startTimer();
        }
    }
    
    tryUnmuteVideo() {
        this.adVideo.muted = false;
        this.adVideo.volume = 0.3;
        
        if (!this.adVideo.paused) {
            setTimeout(() => {
                this.adVideo.volume = 0.7;
            }, 500);
            
            setTimeout(() => {
                this.adVideo.volume = 1.0;
            }, 1000);
        }
    }
    
    tryPlayVideoWithSound() {
        if (!this.videoPlayed) {
            this.adVideo.muted = false;
            this.adVideo.volume = 1.0;
            
            const playPromise = this.adVideo.play();
            
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        this.videoPlayed = true;
                    })
                    .catch(error => {
                        console.log('Video with sound play failed:', error);
                    });
            }
        }
    }
    
    startTimer() {
        clearInterval(this.timerInterval);
        
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            this.adTimerElement.textContent = this.timeLeft;
            this.updateCloseButtonText();
            
            if (this.timeLeft <= 0) {
                this.completeAd();
            }
        }, 1000);
    }
    
    updateCloseButtonText() {
        if (this.timeLeft > 0) {
            this.closeAdBtn.textContent = `ЗАКРЫТЬ (${this.timeLeft})`;
        }
    }
    
    completeAd() {
        clearInterval(this.timerInterval);
        this.closeAdBtn.disabled = false;
        this.closeAdBtn.textContent = 'ПОЛУЧИТЬ 50$';
        
        if (window.moneySystem) {
            window.moneySystem.addAdReward();
        }
    }
    
    closeAd() {
        if (!this.closeAdBtn.disabled) {
            this.adOverlay.style.display = 'none';
            this.adVideo.pause();
            this.adVideo.currentTime = 0;
            this.adBtn.disabled = false;
            clearInterval(this.timerInterval);
            
            this.adVideo.muted = false;
            this.adVideo.volume = 1.0;
            
            this.timeLeft = this.adDuration;
            this.adTimerElement.textContent = this.timeLeft;
            this.updateCloseButtonText();
        }
    }
    
    isAdActive() {
        return this.adOverlay.style.display === 'flex';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.adSystem = new AdSystem();
    }, 100);
});