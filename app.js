// Constants
const EMPTY_STATE_MESSAGE = 'Click "Generate Emojis" to start!';

// Track if confetti has been triggered for current emoji set
let confettiTriggered = false;

// Story Dice Sets - Simple and Complex
const STORY_SETS = {
    'heros-journey': {
        type: 'complex',
        name: "Hero's Journey",
        icon: '🦸',
        categories: {
            hero: {
                priority: 1,
                emojis: ['🦸', '🦸‍♀️', '🧙', '🧙‍♀️', '🤴', '👸', '🧝', '🧝‍♀️', '🧚', '🧚‍♀️']
            },
            challenge: {
                priority: 2,
                emojis: ['🐉', '⚔️', '🗡️', '🛡️', '🏔️', '🌋', '🌊', '⚡', '🔥', '💀']
            },
            helper: {
                priority: 3,
                emojis: ['🧙‍♂️', '🦉', '🐴', '🦅', '🗝️', '📜', '💎', '🔮', '🧭', '⭐']
            },
            treasure: {
                priority: 4,
                emojis: ['👑', '💰', '💎', '🏆', '🗝️', '📜', '⚱️', '🏺', '💍', '🔱']
            }
        }
    },
    'child-friendly': {
        type: 'simple',
        name: 'Child Friendly',
        icon: '👶',
        emojis: [
            '🌈', '⭐', '🌟', '✨', '☀️', '🌙', '☁️', '🌸', '🌺', '🌻',
            '🌼', '🌷', '🦋', '🐝', '🐞', '🐛', '🐣', '🐥', '🦆', '🦢',
            '🐰', '🐹', '🐭', '🐨', '🐼', '🐻', '🐮', '🐷', '🐶', '🐱',
            '🦊', '🦁', '🐸', '🐢', '🐠', '🐡', '🐳', '🐬', '🦀', '🐌',
            '🍎', '🍊', '🍋', '🍌', '🍇', '🍓', '🍒', '🍑', '🥝', '🍍',
            '🎈', '🎀', '🎁', '🧸', '🪀', '🎨', '🎭', '🎪', '🎠', '🎡',
            '⚽', '🏀', '🎾', '⚾', '🥎', '🏐', '🏈', '🪁', '🚂', '🚃',
            '🚌', '🚎', '🚙', '🚗', '🚕', '🚐', '🏠', '🏡', '🏰', '🌳'
        ]
    },
    'animal': {
        type: 'simple',
        name: 'Animal',
        icon: '🦁',
        emojis: [
            '🐵', '🐒', '🦍', '🦧', '🐶', '🐕', '🦮', '🐕‍🦺', '🐩', '🐺',
            '🦊', '🦝', '🐱', '🐈', '🐈‍⬛', '🦁', '🐯', '🐅', '🐆', '🐴',
            '🐎', '🦄', '🦓', '🦌', '🦬', '🐮', '🐂', '🐃', '🐄', '🐷',
            '🐖', '🐗', '🐽', '🐏', '🐑', '🐐', '🐪', '🐫', '🦙', '🦒',
            '🐘', '🦣', '🦏', '🦛', '🐭', '🐁', '🐀', '🐹', '🐰', '🐇',
            '🐿️', '🦫', '🦔', '🦇', '🐻', '🐻‍❄️', '🐨', '🐼', '🦥', '🦦',
            '🦨', '🦘', '🦡', '🐾', '🦃', '🐔', '🐓', '🐣', '🐤', '🐥',
            '🐦', '🐧', '🕊️', '🦅', '🦆', '🦢', '🦉', '🦤', '🪶', '🦩',
            '🦚', '🦜', '🐸', '🐊', '🐢', '🦎', '🐍', '🐲', '🐉', '🦕',
            '🦖', '🐳', '🐋', '🐬', '🦭', '🐟', '🐠', '🐡', '🦈', '🐙'
        ]
    },
    'sci-fi': {
        type: 'complex',
        name: 'Sci-Fi',
        icon: '🚀',
        categories: {
            character: {
                priority: 1,
                emojis: ['🤖', '👽', '👾', '🛸', '🧑‍🚀', '👩‍🚀', '👨‍🚀', '🧬', '🦾', '🦿']
            },
            technology: {
                priority: 2,
                emojis: ['🚀', '🛸', '🛰️', '🔭', '⚡', '🔋', '💻', '📡', '🔬', '⚛️']
            },
            environment: {
                priority: 3,
                emojis: ['🌌', '🌠', '🪐', '🌍', '🌎', '🌏', '🌙', '☄️', '💫', '⭐']
            },
            item: {
                priority: 4,
                emojis: ['💎', '🔮', '⚗️', '🧪', '🧫', '💊', '🔦', '🔌', '💡', '🔧']
            }
        }
    },
    'fantasy': {
        type: 'complex',
        name: 'Fantasy',
        icon: '🧙',
        categories: {
            character: {
                priority: 1,
                emojis: ['🧙', '🧙‍♀️', '🧝', '🧝‍♀️', '🧚', '🧚‍♀️', '🧛', '🧛‍♀️', '🧜', '🧜‍♀️']
            },
            creature: {
                priority: 2,
                emojis: ['🐉', '🦄', '🦇', '🦅', '🦉', '🐺', '🦊', '🐲', '🦖', '🦕']
            },
            magic: {
                priority: 3,
                emojis: ['✨', '🔮', '⭐', '🌟', '💫', '🪄', '📜', '📖', '🗝️', '💎']
            },
            environment: {
                priority: 4,
                emojis: ['🏰', '🏛️', '⛰️', '🌋', '🏔️', '🌲', '🌳', '🌴', '🍄', '🌙']
            }
        }
    }
>>>>>>> b155a47 (Redesign with single set selection and 5 new themed story sets)
};

// Function to get random element from array
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Function to remove element from array
function removeElement(array, element) {
    const index = array.indexOf(element);
    if (index > -1) {
        array.splice(index, 1);
    }
}

// Function to generate emojis from a simple set
function generateFromSimpleSet(set, count) {
    const availableEmojis = [...set.emojis];
    const selected = [];
    const validCount = Math.min(count, availableEmojis.length);
    
    for (let i = 0; i < validCount; i++) {
        const emoji = getRandomElement(availableEmojis);
        selected.push(emoji);
        removeElement(availableEmojis, emoji);
    }
    
    return selected;
}

// Function to generate emojis from a complex set
function generateFromComplexSet(set, count) {
    const selected = [];
    const categories = Object.entries(set.categories)
        .sort((a, b) => a[1].priority - b[1].priority);
    
    // Create a pool of available emojis per category
    const availableByCategory = {};
    categories.forEach(([name, cat]) => {
        availableByCategory[name] = [...cat.emojis];
    });
    
    // First, try to get at least one from each category based on priority
    for (const [categoryName, category] of categories) {
        if (selected.length >= count) break;
        
        const available = availableByCategory[categoryName];
        if (available.length > 0) {
            const emoji = getRandomElement(available);
            selected.push(emoji);
            removeElement(availableByCategory[categoryName], emoji);
        }
    }
    
    // If we still need more emojis, draw from any remaining emojis
    while (selected.length < count) {
        // Collect all remaining emojis
        const allRemaining = [];
        categories.forEach(([name]) => {
            allRemaining.push(...availableByCategory[name]);
        });
        
        if (allRemaining.length === 0) break;
        
        const emoji = getRandomElement(allRemaining);
        selected.push(emoji);
        
        // Remove from the appropriate category
        for (const [name] of categories) {
            if (availableByCategory[name].includes(emoji)) {
                removeElement(availableByCategory[name], emoji);
                break;
            }
        }
    }
    
    return selected;
}

// Function to get random non-repeating emojis from selected set
function getRandomEmojis(count, setKey) {
    const set = STORY_SETS[setKey];
    if (!set) return [];
    
    if (set.type === 'simple') {
        return generateFromSimpleSet(set, count);
    } else {
        return generateFromComplexSet(set, count);
    }
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
    const toggleSettingsBtn = document.getElementById('toggleSettings');
    const setOptions = document.getElementById('setOptions');
    const toggleIcon = toggleSettingsBtn.querySelector('.toggle-icon');
    
    // Set initial empty state
    emojiDisplay.innerHTML = `<div class="empty-state">${EMPTY_STATE_MESSAGE}</div>`;
    
    // Initialize collapsed state based on screen size
    const initializeToggleState = () => {
        const isSmallScreen = window.innerWidth <= 600;
        if (isSmallScreen) {
            setOptions.classList.remove('expanded');
            toggleIcon.classList.remove('expanded');
        } else {
            setOptions.classList.add('expanded');
            toggleIcon.classList.add('expanded');
        }
    };
    
    initializeToggleState();
    
    // Handle window resize with debouncing
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const isSmallScreen = window.innerWidth <= 600;
            if (!isSmallScreen && !setOptions.classList.contains('expanded')) {
                // Auto-expand on large screens if currently collapsed
                setOptions.classList.add('expanded');
                toggleIcon.classList.add('expanded');
            } else if (isSmallScreen && setOptions.classList.contains('expanded')) {
                // Auto-collapse on small screens if currently expanded
                setOptions.classList.remove('expanded');
                toggleIcon.classList.remove('expanded');
            }
        }, 250);
    });
    
    // Toggle settings visibility
    toggleSettingsBtn.addEventListener('click', () => {
        setOptions.classList.toggle('expanded');
        toggleIcon.classList.toggle('expanded');
    });
    
    // Function to get selected set
    function getSelectedSet() {
        const selectedRadio = document.querySelector('.set-radio:checked');
        return selectedRadio ? selectedRadio.value : 'heros-journey';
    }
    
    // Generate emojis on button click
    generateBtn.addEventListener('click', () => {
        const inputValue = emojiCountInput.value;
        
        // Validate input before generating
        if (!validateEmojiCount(inputValue)) {
            return; // Don't generate if validation fails
        }
        
        const count = parseInt(inputValue, 10);
        const selectedSet = getSelectedSet();
        const emojis = getRandomEmojis(count, selectedSet);
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
    const initialEmojis = getRandomEmojis(parseInt(emojiCountInput.value, 10), 'heros-journey');
    displayEmojis(initialEmojis);
});
