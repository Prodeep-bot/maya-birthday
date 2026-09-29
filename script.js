document.addEventListener('DOMContentLoaded', () => {
    const introScreen = document.getElementById('intro-screen');
    const galleryScreen = document.getElementById('gallery-screen');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const bgMusic = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-btn');

    let isMusicPlaying = false;

    // YES Button Logic
    yesBtn.addEventListener('click', () => {
        // Fade out intro, fade in gallery
        introScreen.style.opacity = '0';
        setTimeout(() => {
            introScreen.classList.add('hidden');
            galleryScreen.classList.remove('hidden');
            galleryScreen.style.opacity = '1';
            
            // Show and play music
            musicBtn.classList.remove('hidden');
            playMusic();
            
            // Scroll to top
            window.scrollTo(0, 0);
        }, 500);
    });

    // NO Button Logic
    noBtn.addEventListener('click', () => {
        // Change text to "Not accepted" and shake
        noBtn.innerText = "Not accepted 🥺";
        noBtn.style.backgroundColor = "#ffe6e6";
        noBtn.style.color = "#d6336c";
        noBtn.style.borderColor = "#d6336c";
        
        // Shake animation
        noBtn.style.animation = "shake 0.5s";
        setTimeout(() => {
            noBtn.style.animation = "";
        }, 500);

        // Optional: Move the button randomly to make it harder to click
        const randomX = Math.random() * 100 - 50;
        const randomY = Math.random() * 100 - 50;
        noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
    });

    // Music Logic
    function playMusic() {
        bgMusic.play().then(() => {
            isMusicPlaying = true;
            musicBtn.innerText = "🎵 Pause Music";
        }).catch(error => {
            console.log("Autoplay blocked. User needs to click the music button.");
            musicBtn.innerText = "🎵 Play Music";
        });
    }

    musicBtn.addEventListener('click', () => {
        if (isMusicPlaying) {
            bgMusic.pause();
            isMusicPlaying = false;
            musicBtn.innerText = "🎵 Play Music";
        } else {
            playMusic();
        }
    });
});

// Shake Animation CSS injection
const style = document.createElement('style');
style.innerHTML = `
@keyframes shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
    75% { transform: translateX(-5px); }
    100% { transform: translateX(0); }
}
`;
document.head.appendChild(style);