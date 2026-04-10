const NOTIFICATION_HTML = `
<div id="custom-notification" class="custom-notification">
    <div class="custom-notification-icon">
        <i class="fas fa-check-circle"></i>
    </div>
    <div class="custom-notification-content">
        <div class="custom-notification-title">Thông báo</div>
        <div class="custom-notification-message">Nội dung thông báo</div>
    </div>
    <div class="custom-notification-close">
        <i class="fas fa-times"></i>
    </div>
</div>
`;

document.addEventListener('DOMContentLoaded', () => {
    // Inject notification HTML
    document.body.insertAdjacentHTML('beforeend', NOTIFICATION_HTML);

    const notification = document.getElementById('custom-notification');
    const notifTitle = notification.querySelector('.custom-notification-title');
    const notifMessage = notification.querySelector('.custom-notification-message');
    const notifIcon = notification.querySelector('.custom-notification-icon i');
    const closeBtn = notification.querySelector('.custom-notification-close');
    let hideTimeout;

    window.showNotification = (title, message, type = 'success') => {
        notifTitle.textContent = title;
        notifMessage.textContent = message;
        
        // Reset classes
        notification.className = 'custom-notification active';
        notification.classList.add(type);

        // Icon
        if (type === 'success') {
            notifIcon.className = 'fas fa-check-circle';
        } else if (type === 'error') {
            notifIcon.className = 'fas fa-exclamation-circle';
        } else {
            notifIcon.className = 'fas fa-info-circle';
        }

        // Auto hide
        clearTimeout(hideTimeout);
        hideTimeout = setTimeout(() => {
            notification.classList.remove('active');
        }, 5000);
    };

    closeBtn.addEventListener('click', () => {
        notification.classList.remove('active');
        clearTimeout(hideTimeout);
    });

    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Optional: Toggle icon between bars and times (close)
            const icon = menuToggle.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        })
    }

    // Registration Form Handling
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent page reload

            // Basic Validation (HTML5 'required' handles most of it)
            const name = document.getElementById('name').value;
            const userClass = document.getElementById('class').value;
            const email = document.getElementById('email').value;

            if (name && userClass && email) {
                // Firework Effect!
                var duration = 3 * 1000;
                var animationEnd = Date.now() + duration;
                var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

                function randomInRange(min, max) {
                    return Math.random() * (max - min) + min;
                }

                var interval = setInterval(function() {
                    var timeLeft = animationEnd - Date.now();

                    if (timeLeft <= 0) {
                        return clearInterval(interval);
                    }

                    var particleCount = 50 * (timeLeft / duration);
                    // since particles fall down, start a bit higher than random
                    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
                    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
                }, 250);

                // Show Success Message
                setTimeout(() => {
                    // alert(`🎉 Chúc mừng ${name} đã gia nhập CLB "Hiệp Sĩ Số"! Check email để nhận huy hiệu nhé!`);
                    window.showNotification('Thành công!', `Chào mừng ${name} đã gia nhập CLB!`, 'success');
                    registerForm.reset(); // Clear form
                }, 500);
            }
        });
    }
});
