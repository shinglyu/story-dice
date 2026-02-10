// Constants
const EMPTY_STATE_MESSAGE = 'Click "Generate Emojis" to start!';

// Collection of UTF-8 emojis for story dice
const EMOJI_COLLECTION = [
    '🎲', '🎭', '🎨', '🎪', '🎬', '🎮', '🎯', '🎰', '🎳',
    '🚀', '🚁', '🚂', '🚃', '🚄', '🚅', '🚆', '🚇', '🚌',
    '🏰', '🏡', '🏢', '🏣', '🏤', '🏥', '🏦', '🏧', '🏨',
    '🌍', '🌎', '🌏', '🌐', '🌑', '🌒', '🌓', '🌔', '🌕',
    '🍀', '🍁', '🍂', '🍃', '🍄', '🍅', '🍆', '🍇', '🍈',
    '🐀', '🐁', '🐂', '🐃', '🐄', '🐅', '🐆', '🐇', '🐈',
    '👑', '👒', '👓', '👔', '👕', '👖', '👗', '👘', '👙',
    '⚽', '⚾', '🏀', '🏈', '🏉', '🎾', '🎱', '🎣', '🎤',
    '🔥', '💧', '🌊', '⭐', '🌟', '💫', '✨', '☀️', '🌙',
    '❤️', '🎁', '🎂', '🎈', '🎉', '🎊', '🎋', '🎌', '🎍', '🎎',
    '🔑', '🔒', '🔓', '🔔', '🔕', '🔖', '🔗', '🔨', '🔪',
    '📱', '📲', '📳', '📴', '📵', '📶', '📷', '📸', '📹',
    '🌸', '🌺', '🌻', '🌼', '🌷', '🌹', '🥀', '🌾', '🌿',
    '🦁', '🦂', '🦃', '🦄', '🦅', '🦆', '🦇', '🦈', '🦉',
    '🍕', '🍔', '🍟', '🍗', '🍖', '🍝', '🍜', '🍛', '🍚'
];

// Function to get random non-repeating emojis
function getRandomEmojis(count) {
    // Validate count
    const validCount = Math.min(Math.max(1, count), EMOJI_COLLECTION.length);
    
    // Create a copy of the emoji collection to avoid modifying the original
    const availableEmojis = [...EMOJI_COLLECTION];
    const selectedEmojis = [];
    
    // Select random emojis without repetition
    for (let i = 0; i < validCount; i++) {
        const randomIndex = Math.floor(Math.random() * availableEmojis.length);
        selectedEmojis.push(availableEmojis[randomIndex]);
        // Remove the selected emoji to ensure no repetition
        availableEmojis.splice(randomIndex, 1);
    }
    
    return selectedEmojis;
}

// Confetti effect function
function triggerConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size to full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Show canvas
    canvas.style.display = 'block';
    
    const confettiPieces = [];
    const confettiCount = 150;
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f7b731', '#5f27cd', '#00d2d3', '#ff9ff3', '#54a0ff'];
    
    // Create confetti pieces
    for (let i = 0; i < confettiCount; i++) {
        confettiPieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            w: Math.random() * 10 + 5,
            h: Math.random() * 5 + 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            speed: Math.random() * 3 + 2,
            rotationSpeed: Math.random() * 5 - 2.5,
            opacity: 1
        });
    }
    
    let animationFrameId;
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        let allOffScreen = true;
        
        confettiPieces.forEach(piece => {
            ctx.save();
            ctx.translate(piece.x + piece.w / 2, piece.y + piece.h / 2);
            ctx.rotate((piece.rotation * Math.PI) / 180);
            ctx.globalAlpha = piece.opacity;
            ctx.fillStyle = piece.color;
            ctx.fillRect(-piece.w / 2, -piece.h / 2, piece.w, piece.h);
            ctx.restore();
            
            piece.y += piece.speed;
            piece.rotation += piece.rotationSpeed;
            piece.x += Math.sin(piece.y / 50) * 0.5;
            
            if (piece.y < canvas.height) {
                allOffScreen = false;
            }
            
            // Fade out near the bottom
            if (piece.y > canvas.height - 100) {
                piece.opacity -= 0.01;
            }
        });
        
        if (allOffScreen) {
            canvas.style.display = 'none';
            cancelAnimationFrame(animationFrameId);
        } else {
            animationFrameId = requestAnimationFrame(animate);
        }
    }
    
    animate();
}

// Function to check if all emojis are clicked
function checkAllClicked() {
    const emojiItems = document.querySelectorAll('.emoji-item');
    if (emojiItems.length === 0) return false;
    
    const allClicked = Array.from(emojiItems).every(item => item.classList.contains('used'));
    
    if (allClicked) {
        triggerConfetti();
    }
}

// Function to display emojis
function displayEmojis(emojis) {
    const emojiDisplay = document.getElementById('emojiDisplay');
    emojiDisplay.innerHTML = '';
    
    if (emojis.length === 0) {
        emojiDisplay.innerHTML = `<div class="empty-state">${EMPTY_STATE_MESSAGE}</div>`;
        return;
    }
    
    emojis.forEach((emoji, index) => {
        const emojiElement = document.createElement('div');
        emojiElement.className = 'emoji-item';
        emojiElement.textContent = emoji;
        emojiElement.style.animationDelay = `${index * 0.05}s`;
        
        // Add click handler to toggle used state
        emojiElement.addEventListener('click', () => {
            emojiElement.classList.toggle('used');
            // Check if all emojis are now clicked
            checkAllClicked();
        });
        
        emojiDisplay.appendChild(emojiElement);
    });
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const emojiCountInput = document.getElementById('emojiCount');
    const emojiDisplay = document.getElementById('emojiDisplay');
    
    // Set initial empty state
    emojiDisplay.innerHTML = `<div class="empty-state">${EMPTY_STATE_MESSAGE}</div>`;
    
    // Generate emojis on button click
    generateBtn.addEventListener('click', () => {
        const count = parseInt(emojiCountInput.value, 10);
        const emojis = getRandomEmojis(count);
        displayEmojis(emojis);
    });
    
    // Allow Enter key to generate emojis
    emojiCountInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            generateBtn.click();
        }
    });
    
    // Generate initial set of emojis on load using the default value from the input
    const initialEmojis = getRandomEmojis(parseInt(emojiCountInput.value, 10));
    displayEmojis(initialEmojis);
});
