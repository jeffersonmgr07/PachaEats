// Funcionalidades principales para Pacha Eats

document.addEventListener('DOMContentLoaded', function() {
    // Menú móvil
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');
    
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevenir scroll
        });
    }
    
    if (closeMenu) {
        closeMenu.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = ''; // Restaurar scroll
        });
    }
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(event) {
        if (!mobileMenu.contains(event.target) && !hamburgerMenu.contains(event.target)) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
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
            
            // Simular filtrado (en una implementación real harías una petición AJAX)
            // filterRestaurants(filter);
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
                
                // Aquí iría la lógica de búsqueda real
                // searchRestaurants(address);
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
    function showNotification(message, type = 'success') {
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
        `;
        
        // Agregar al DOM
        document.body.appendChild(notification);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
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
    }
    
    // Simular datos iniciales
    updateCartCount(3);
    
    // Hacer que las cards de restaurantes sean clickeables
    const restaurantCards = document.querySelectorAll('.restaurant-card');
    
    restaurantCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function() {
            const restaurantName = this.querySelector('h3').textContent;
            showNotification(`Redirigiendo a ${restaurantName}...`, 'info');
            
            // En una implementación real, redirigirías a la página del restaurante
            // window.location.href = `/restaurante/${restaurantId}`;
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
                dropdownContent.style.display = 
                    dropdownContent.style.display === 'block' ? 'none' : 'block';
            });
            
            // Cerrar dropdown al hacer clic fuera
            document.addEventListener('click', function(event) {
                if (!userBtn.contains(event.target) && !dropdownContent.contains(event.target)) {
                    dropdownContent.style.display = 'none';
                }
            });
        }
    }
    
    // Función para simular la carga de datos
    function simulateLoading() {
        // Esta función simularía la carga de datos desde un servidor
        console.log('Cargando datos de restaurantes...');
        
        // Simular una petición AJAX
        setTimeout(() => {
            showNotification('¡Datos actualizados!', 'info');
        }, 2000);
    }
    
    // Inicializar funcionalidades
    console.log('Pacha Eats - Plataforma de comida lista');
});
