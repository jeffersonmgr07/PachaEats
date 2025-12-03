// Funcionalidades principales para Pacha Eats - CORREGIDO

document.addEventListener('DOMContentLoaded', function() {
    // Menú móvil
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');
    const body = document.body;
    
    // Crear overlay si no existe
    let menuOverlay = document.querySelector('.menu-overlay');
    if (!menuOverlay) {
        menuOverlay = document.createElement('div');
        menuOverlay.className = 'menu-overlay';
        document.body.appendChild(menuOverlay);
        
        // Estilos para el overlay
        menuOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 1000;
            display: none;
        `;
    }
    
    // Función para abrir menú móvil
    function openMobileMenu() {
        mobileMenu.classList.add('active');
        menuOverlay.classList.add('active');
        menuOverlay.style.display = 'block';
        body.style.overflow = 'hidden';
    }
    
    // Función para cerrar menú móvil
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        menuOverlay.style.display = 'none';
        body.style.overflow = '';
    }
    
    // Abrir menú al hacer clic en hamburguesa
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', openMobileMenu);
    }
    
    // Cerrar menú con botón X
    if (closeMenu) {
        closeMenu.addEventListener('click', closeMobileMenu);
    }
    
    // Cerrar menú al hacer clic en overlay
    menuOverlay.addEventListener('click', closeMobileMenu);
    
    // Cerrar menú al hacer clic en un enlace del menú
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Si el enlace es interno (no #), cerrar el menú
            if (this.getAttribute('href') !== '#') {
                closeMobileMenu();
            }
        });
    });
    
    // Cerrar menú con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Filtros de restaurantes
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            // Aquí iría la lógica para filtrar restaurantes
            const filter = this.textContent.toLowerCase();
            console.log('Filtrando por:', filter);
        });
    });
    
    // Botones de favoritos
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const icon = this.querySelector('i');
            
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.style.backgroundColor = 'var(--primary-color)';
                this.style.color = 'var(--white)';
                
                // Mostrar notificación
                showNotification('¡Agregado a favoritos!');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.style.backgroundColor = 'var(--white)';
                this.style.color = 'inherit';
                
                showNotification('¡Eliminado de favoritos!');
            }
        });
    });
    
    // Barra de búsqueda
    const addressInput = document.getElementById('address-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const address = addressInput.value.trim();
            
            if (address) {
                console.log('Buscando restaurantes cerca de:', address);
                showNotification(`Buscando restaurantes en: ${address}`);
            } else {
                addressInput.focus();
                showNotification('Por favor, ingresa una dirección', 'error');
            }
        });
    }
    
    // Permitir búsqueda con Enter
    if (addressInput) {
        addressInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }
    
    // Carrito de compras (funcionalidad básica)
    const cartIcon = document.querySelector('.cart-icon');
    const cartCount = document.querySelector('.cart-count');
    
    if (cartIcon) {
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Carrito de compras (próximamente)', 'info');
        });
    }
    
    // Contador de carrito (simulado)
    function updateCartCount(count) {
        if (cartCount) {
            cartCount.textContent = count;
        }
    }
    
    // Función para mostrar notificaciones
    window.showNotification = function(message, type = 'success') {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Estilos para la notificación
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: ${type === 'error' ? '#dc3545' : type === 'info' ? '#17a2b8' : '#28a745'};
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            z-index: 10000;
            animation: slideIn 0.3s ease;
            font-family: 'Roboto', sans-serif;
            max-width: 300px;
            word-wrap: break-word;
        `;
        
        // Agregar al DOM
        document.body.appendChild(notification);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
        
        // Animaciones CSS
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    };
    
    // Simular datos iniciales
    updateCartCount(3);
    
    // Hacer que las cards de restaurantes sean clickeables
    const restaurantCards = document.querySelectorAll('.restaurant-card');
    
    restaurantCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function() {
            const restaurantName = this.querySelector('h3').textContent;
            showNotification(`Redirigiendo a ${restaurantName}...`, 'info');
        });
    });
    
    // Manejo del dropdown de usuario en móviles
    const userBtn = document.querySelector('.user-btn');
    const dropdownContent = document.querySelector('.dropdown-content');
    
    if (userBtn && dropdownContent) {
        // En móvil, hacer que el dropdown sea clickeable
        if (window.innerWidth < 768) {
            userBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                dropdownContent.style.display = 
                    dropdownContent.style.display === 'block' ? 'none' : 'block';
            });
            
            // Cerrar dropdown al hacer clic fuera
            document.addEventListener('click', function(event) {
                if (!userBtn.contains(event.target) && !dropdownContent.contains(event.target)) {
                    dropdownContent.style.display = 'none';
                }
            });
            
            // Cerrar dropdown al hacer clic en un enlace
            dropdownContent.addEventListener('click', function(e) {
                if (e.target.tagName === 'A') {
                    dropdownContent.style.display = 'none';
                }
            });
        }
    }
    
    // Búsqueda móvil
    const mobileSearchBtn = document.querySelector('.mobile-search');
    if (mobileSearchBtn) {
        mobileSearchBtn.addEventListener('click', function() {
            showNotification('Función de búsqueda móvil (próximamente)', 'info');
        });
    }
    
    // Inicializar funcionalidades
    console.log('Pacha Eats - Plataforma de comida lista');
});
