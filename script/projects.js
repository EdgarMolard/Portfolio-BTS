/**
 * Gestionnaire de carousel pour les projets
 * Permet de naviguer entre les différents projets avec des flèches
 */

class ProjectCarousel {
    constructor() {
        this.currentIndex = 0;
        this.projectsContainer = document.getElementById('projectsContainer');
        this.prevButton = document.getElementById('prevProject');
        this.nextButton = document.getElementById('nextProject');
        this.indicators = document.querySelectorAll('.project-indicator');
        this.totalProjects = document.querySelectorAll('.project-card').length;
        
        this.init();
    }

    init() {
        if (!this.projectsContainer) return;

        // Événements pour les boutons de navigation
        this.prevButton.addEventListener('click', () => this.navigateTo(this.currentIndex - 1));
        this.nextButton.addEventListener('click', () => this.navigateTo(this.currentIndex + 1));

        // Événements pour les indicateurs
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.navigateTo(index));
        });

        // Support du swipe sur mobile
        this.addSwipeSupport();

        // Navigation au clavier
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.navigateTo(this.currentIndex - 1);
            if (e.key === 'ArrowRight') this.navigateTo(this.currentIndex + 1);
        });

        // Mettre à jour l'indicateur initial
        this.updateIndicators();
    }

    navigateTo(index) {
        // Boucler le carousel
        if (index < 0) {
            this.currentIndex = this.totalProjects - 1;
        } else if (index >= this.totalProjects) {
            this.currentIndex = 0;
        } else {
            this.currentIndex = index;
        }

        // Appliquer la transformation
        const offset = -this.currentIndex * 100;
        this.projectsContainer.style.transform = `translateX(${offset}%)`;

        // Mettre à jour les indicateurs
        this.updateIndicators();

        // Animation des boutons
        this.animateButton(this.currentIndex > 0 ? this.prevButton : this.nextButton);
    }

    updateIndicators() {
        this.indicators.forEach((indicator, index) => {
            if (index === this.currentIndex) {
                indicator.classList.add('bg-white');
                indicator.classList.remove('bg-white/50');
                indicator.style.width = '2rem';
            } else {
                indicator.classList.remove('bg-white');
                indicator.classList.add('bg-white/50');
                indicator.style.width = '0.75rem';
            }
        });
    }

    animateButton(button) {
        button.style.transform = 'scale(0.9)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    }

    addSwipeSupport() {
        let touchStartX = 0;
        let touchEndX = 0;

        this.projectsContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        this.projectsContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        }, { passive: true });

        const handleSwipe = () => {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe gauche - projet suivant
                    this.navigateTo(this.currentIndex + 1);
                } else {
                    // Swipe droite - projet précédent
                    this.navigateTo(this.currentIndex - 1);
                }
            }
        };

        this.handleSwipe = handleSwipe;
    }

    // Navigation automatique (optionnelle)
    startAutoPlay(interval = 5000) {
        this.autoPlayInterval = setInterval(() => {
            this.navigateTo(this.currentIndex + 1);
        }, interval);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
    }
}

// Initialiser le carousel quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    window.projectCarousel = new ProjectCarousel();
    
    // Initialiser le gestionnaire de modales
    window.modalManager = new ModalManager();
    
    // Optionnel : démarrer le défilement automatique
    // window.projectCarousel.startAutoPlay(6000);
    
    // Arrêter le défilement auto quand l'utilisateur interagit
    const projectSection = document.getElementById('project');
    if (projectSection) {
        projectSection.addEventListener('mouseenter', () => {
            if (window.projectCarousel) {
                window.projectCarousel.stopAutoPlay();
            }
        });
    }
});

/**
 * Gestionnaire de modales pour les détails des projets
 * Gère l'ouverture, la fermeture et les animations des modales
 */

class ModalManager {
    constructor() {
        this.modals = document.querySelectorAll('.project-modal');
        this.openButtons = document.querySelectorAll('.open-modal');
        this.closeButtons = document.querySelectorAll('.close-modal');
        
        this.init();
    }

    init() {
        // Événements pour ouvrir les modales
        this.openButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const modalId = button.getAttribute('data-modal');
                this.openModal(modalId);
            });
        });

        // Événements pour fermer les modales
        this.closeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const modal = button.closest('.project-modal');
                this.closeModal(modal);
            });
        });

        // Fermer en cliquant sur le fond
        this.modals.forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal);
                }
            });
        });

        // Fermer avec la touche Échap
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        // Afficher la modal
        modal.classList.remove('hidden');
        modal.classList.add('flex');

        // Bloquer le scroll du body
        document.body.style.overflow = 'hidden';

        // Animation d'entrée
        setTimeout(() => {
            const content = modal.querySelector('.modal-content');
            content.style.transform = 'scale(1)';
            content.style.opacity = '1';
        }, 10);
    }

    closeModal(modal) {
        if (!modal) return;

        const content = modal.querySelector('.modal-content');
        
        // Animation de sortie
        content.style.transform = 'scale(0.95)';
        content.style.opacity = '0';

        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            
            // Restaurer le scroll si aucune modal n'est ouverte
            const openModals = document.querySelectorAll('.project-modal.flex');
            if (openModals.length === 0) {
                document.body.style.overflow = '';
            }
        }, 300);
    }

    closeAllModals() {
        this.modals.forEach(modal => {
            if (modal.classList.contains('flex')) {
                this.closeModal(modal);
            }
        });
    }
}