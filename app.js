// Constants
const EMPTY_STATE_MESSAGE = 'Click "Generate Emojis" to start!';

// Track if confetti has been triggered for current emoji set
let confettiTriggered = false;

// Categorized emoji sets for fine-grained control
const EMOJI_SETS = {
    environment: [
        '🏰', '🏡', '🏢', '🏣', '🏤', '🏥', '🏦', '🏧', '🏨',
        '🌍', '🌎', '🌏', '🌐', '🌑', '🌒', '🌓', '🌔', '🌕',
        '🔥', '💧', '🌊', '⭐', '🌟', '💫', '✨', '☀️', '🌙',
        '🌸', '🌺', '🌻', '🌼', '🌷', '🌹', '🥀', '🌾', '🌿',
        '🍀', '🍁', '🍂', '🍃', '🍄'
    ],
    character: [
        '🐀', '🐁', '🐂', '🐃', '🐄', '🐅', '🐆', '🐇', '🐈',
        '🦁', '🦂', '🦃', '🦄', '🦅', '🦆', '🦇', '🦈', '🦉'
    ],
    item: [
        '👑', '👒', '👓', '👔', '👕', '👖', '👗', '👘', '👙',
        '🔑', '🔒', '🔓', '🔔', '🔕', '🔖', '🔗', '🔨', '🔪',
        '📱', '📲', '📳', '📴', '📵', '📶', '📷', '📸', '📹',
        '⚽', '⚾', '🏀', '🏈', '🏉', '🎾', '🎱', '🎣', '🎤',
        '🍕', '🍔', '🍟', '🍗', '🍖', '🍝', '🍜', '🍛', '🍚',
        '🍅', '🍆', '🍇', '🍈'
    ],
    event: [
        '🎲', '🎭', '🎨', '🎪', '🎬', '🎮', '🎯', '🎰', '🎳',
        '❤️', '🎁', '🎂', '🎈', '🎉', '🎊', '🎋', '🎌', '🎍', '🎎'
    ],
    transport: [
        '🚀', '🚁', '🚂', '🚃', '🚄', '🚅', '🚆', '🚇', '🚌'
    ]
};

// Combine all sets into one collection for backwards compatibility
const EMOJI_COLLECTION = Object.values(EMOJI_SETS).flat();

// Function to get emojis from selected sets
function getEmojiPool(selectedSets) {
    if (selectedSets.length === 0 || selectedSets.includes('all')) {
        return [...EMOJI_COLLECTION];
    }
    
    const pool = [];
    selectedSets.forEach(setName => {
        if (EMOJI_SETS[setName]) {
            pool.push(...EMOJI_SETS[setName]);
        }
    });
    
    return pool;
}

// Function to get random non-repeating emojis
function getRandomEmojis(count, selectedSets = ['all']) {
    const emojiPool = getEmojiPool(selectedSets);
    
    // Validate count
    const validCount = Math.min(Math.max(1, count), emojiPool.length);
    
    // Create a copy of the emoji pool to avoid modifying the original
    const availableEmojis = [...emojiPool];
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

// Function to validate emoji count input
function validateEmojiCount(value) {
    const errorMessage = document.getElementById('errorMessage');
    const emojiCountInput = document.getElementById('emojiCount');
    
    // Clear previous error state
    errorMessage.textContent = '';
    emojiCountInput.classList.remove('invalid');
    
    // Check if value is empty or not a number
    if (value === '' || value === null || value === undefined) {
        errorMessage.textContent = 'Please enter a number';
        emojiCountInput.classList.add('invalid');
        return false;
    }
    
    const count = parseInt(value, 10);
    
    // Check if parsing resulted in NaN
    if (isNaN(count)) {
        errorMessage.textContent = 'Please enter a valid number';
        emojiCountInput.classList.add('invalid');
        return false;
    }
    
    // Check minimum value
    if (count < 1) {
        errorMessage.textContent = 'Please enter a number greater than 0';
        emojiCountInput.classList.add('invalid');
        return false;
    }
    
    // Check maximum value
    if (count > 50) {
        errorMessage.textContent = 'Please enter a number no greater than 50';
        emojiCountInput.classList.add('invalid');
        return false;
    }
    
    // Check against available emoji collection
    if (count > EMOJI_COLLECTION.length) {
        errorMessage.textContent = `Only ${EMOJI_COLLECTION.length} unique emojis available`;
        emojiCountInput.classList.add('invalid');
        return false;
    }
    
    return true;
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
            
            // Fade out near the bottom based on speed for consistency
            if (piece.y > canvas.height - 100) {
                piece.opacity -= piece.speed * 0.004;
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
    
    if (allClicked && !confettiTriggered) {
        confettiTriggered = true;
        triggerConfetti();
    }
}

// Function to display emojis
function displayEmojis(emojis) {
    const emojiDisplay = document.getElementById('emojiDisplay');
    emojiDisplay.innerHTML = '';
    
    // Reset confetti trigger flag for new emoji set
    confettiTriggered = false;
    
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
            const wasUsed = emojiElement.classList.contains('used');
            emojiElement.classList.toggle('used');
            
            // Reset confetti flag if unchecking an emoji
            if (wasUsed) {
                confettiTriggered = false;
            }
            
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
    const errorMessage = document.getElementById('errorMessage');
    const setCheckboxes = document.querySelectorAll('.set-checkbox');
    const allSetsCheckbox = document.querySelector('.set-checkbox[value="all"]');
    
    // Set initial empty state
    emojiDisplay.innerHTML = `<div class="empty-state">${EMPTY_STATE_MESSAGE}</div>`;
    
    // Handle "All Sets" checkbox behavior
    setCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            if (checkbox.value === 'all' && checkbox.checked) {
                // When "All Sets" is checked, uncheck all other sets
                setCheckboxes.forEach(cb => {
                    if (cb.value !== 'all') {
                        cb.checked = false;
                    }
                });
            } else if (checkbox.value !== 'all' && checkbox.checked) {
                // When any specific set is checked, uncheck "All Sets"
                allSetsCheckbox.checked = false;
            }
            
            // Ensure at least one checkbox is checked
            const anyChecked = Array.from(setCheckboxes).some(cb => cb.checked);
            if (!anyChecked) {
                allSetsCheckbox.checked = true;
            }
        });
    });
    
    // Function to get selected emoji sets
    function getSelectedSets() {
        const checkboxes = document.querySelectorAll('.set-checkbox:checked');
        return Array.from(checkboxes).map(cb => cb.value);
    }
    
    // Generate emojis on button click
    generateBtn.addEventListener('click', () => {
        const inputValue = emojiCountInput.value;
        
        // Validate input before generating
        if (!validateEmojiCount(inputValue)) {
            return; // Don't generate if validation fails
        }
        
        const count = parseInt(inputValue, 10);
        const selectedSets = getSelectedSets();
        const emojis = getRandomEmojis(count, selectedSets);
        displayEmojis(emojis);
    });
    
    // Allow Enter key to generate emojis
    emojiCountInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            generateBtn.click();
        }
    });
    
    // Clear error message when user starts typing
    emojiCountInput.addEventListener('input', () => {
        errorMessage.textContent = '';
        emojiCountInput.classList.remove('invalid');
    });
    
    // Generate initial set of emojis on load using the default value from the input
    const initialEmojis = getRandomEmojis(parseInt(emojiCountInput.value, 10), ['all']);
    displayEmojis(initialEmojis);
});
