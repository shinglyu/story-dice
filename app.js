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
    '❤️', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💖',
    '🎁', '🎂', '🎈', '🎉', '🎊', '🎋', '🎌', '🎍', '🎎',
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
