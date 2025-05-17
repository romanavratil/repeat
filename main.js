// Current screen tracking
        let currentScreen = 'customer-login';
        let currentRestaurant = 'Cafe Deluxe';
        
        // Show screen function
        function showScreen(screenId, restaurantName = null) {
            // Hide current screen
            document.getElementById(currentScreen).classList.remove('active');
            
            // Show new screen
            document.getElementById(screenId).classList.add('active');
            currentScreen = screenId;
            
            // Set restaurant name if provided
            if (restaurantName) {
                currentRestaurant = restaurantName;
                document.getElementById('restaurant-name').textContent = restaurantName;
            }
            
            // Special handling for reward unlocked screen
            if (screenId === 'reward-unlocked') {
                createConfetti();
            }
            
            // If showing restaurant dashboard, initialize tabs
            if (screenId === 'restaurant-dashboard') {
                initTabs();
            }
        }
        
        // Tab switching for restaurant dashboard
        function switchTab(tabId) {
            // Hide all tab contents
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Show selected tab content
            document.getElementById(tabId).classList.add('active');
            
            // Update tab buttons
            document.querySelectorAll('.tab-btn').forEach(btn => {
                if (btn.dataset.tab === tabId) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }
        
        // Initialize tabs
        function initTabs() {
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    switchTab(btn.dataset.tab);
                });
            });
        }
        
        // Toggle between login and signup forms
        document.getElementById('login-tab-btn').addEventListener('click', function() {
            this.classList.add('border-b-2', 'border-green-500', 'text-green-500');
            document.getElementById('signup-tab-btn').classList.remove('border-b-2', 'border-green-500', 'text-green-500');
            document.getElementById('signup-tab-btn').classList.add('text-gray-400');
            
            document.getElementById('login-form-container').classList.remove('hidden');
            document.getElementById('signup-form-container').classList.add('hidden');
        });
        
        document.getElementById('signup-tab-btn').addEventListener('click', function() {
            this.classList.add('border-b-2', 'border-green-500', 'text-green-500');
            document.getElementById('login-tab-btn').classList.remove('border-b-2', 'border-green-500', 'text-green-500');
            document.getElementById('login-tab-btn').classList.add('text-gray-400');
            
            document.getElementById('signup-form-container').classList.remove('hidden');
            document.getElementById('login-form-container').classList.add('hidden');
        });
        
        // Form submissions
        document.getElementById('customer-login-form').addEventListener('submit', function(e) {
            e.preventDefault();
            showScreen('customer-home');
        });
        
        document.getElementById('customer-signup-form').addEventListener('submit', function(e) {
            e.preventDefault();
            showScreen('customer-home');
        });
        
        document.getElementById('restaurant-login-form').addEventListener('submit', function(e) {
            e.preventDefault();
            showScreen('restaurant-dashboard');
        });
        
        document.getElementById('onboarding-form').addEventListener('submit', function(e) {
            e.preventDefault();
            showScreen('restaurant-dashboard');
        });
        
        document.getElementById('create-offer-form').addEventListener('submit', function(e) {
            e.preventDefault();
            switchTab('active-offers');
        });
        
        // Button ripple effect
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', function(e) {
                const x = e.clientX - e.target.getBoundingClientRect().left;
                const y = e.clientY - e.target.getBoundingClientRect().top;
                
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
        
        // Create confetti animation
        function createConfetti() {
            const container = document.getElementById('confetti-container');
            container.innerHTML = '';
            
            const colors = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];
            
            for (let i = 0; i < 100; i++) {
                const confetti = document.createElement('div');
                confetti.classList.add('confetti');
                
                const size = Math.random() * 10 + 5;
                const color = colors[Math.floor(Math.random() * colors.length)];
                
                confetti.style.width = `${size}px`;
                confetti.style.height = `${size}px`;
                confetti.style.backgroundColor = color;
                
                confetti.style.left = `${Math.random() * 100}%`;
                confetti.style.top = `-20px`;
                
                const duration = Math.random() * 3 + 2;
                confetti.style.animation = `fall ${duration}s linear forwards`;
                confetti.style.animationDelay = `${Math.random() * 2}s`;
                
                container.appendChild(confetti);
            }
        }