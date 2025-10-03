/**
 * Gestionnaire d'effet de parallaxe léger pour les sections
 * Applique un mouvement subtil aux images de fond lors du scroll
 */

class ParallaxManager {
    constructor() {
        this.sections = [];
        this.isScrolling = false;
        this.scrollTimeout = null;
        
        this.init();
    }

    init() {
        // Sélectionner toutes les sections avec des images de fond
        this.sections = [
            {
                element: document.getElementById('accueil'),
                speed: 0.3, // Vitesse de parallaxe (plus faible = plus lent)
                bgElement: null // Pas d'image de fond pour l'accueil
            },
            {
                element: document.getElementById('about'),
                speed: 0.4,
                bgElement: document.querySelector('#about .absolute.inset-0.bg-\\[url\\(')
            },
            {
                element: document.getElementById('parcours'),
                speed: 0.5,
                bgElement: document.querySelector('#parcours .absolute.inset-0.bg-\\[url\\(')
            },
            {
                element: document.getElementById('project'),
                speed: 0.3,
                bgElement: document.querySelector('#project .absolute.inset-0.bg-\\[url\\(')
            },
            {
                element: document.getElementById('veille'),
                speed: 0.6,
                bgElement: document.querySelector('#veille .absolute.inset-0.bg-\\[url\\(')
            },
            {
                element: document.getElementById('epreuve'),
                speed: 0.4,
                bgElement: document.querySelector('#epreuve .absolute.inset-0.bg-\\[url\\(')
            },
            {
                element: document.getElementById('contact'),
                speed: 0.5,
                bgElement: document.querySelector('#contact .absolute.inset-0.bg-\\[url\\(')
            }
        ].filter(section => section.element); // Filtrer les sections qui existent

        // Optimiser la sélection des éléments de fond
        this.sections.forEach(section => {
            if (section.element.id !== 'accueil') {
                // Trouver l'élément de fond par la classe parallax-bg
                section.bgElement = section.element.querySelector('.parallax-bg');
                
                // Ajouter les styles CSS pour l'optimisation
                if (section.bgElement) {
                    section.bgElement.style.willChange = 'transform';
                    section.bgElement.style.backfaceVisibility = 'hidden';
                    section.bgElement.style.transform = 'translateZ(0)';
                }
            }
        });

        this.bindEvents();
        this.updateParallax(); // Initialiser l'état
    }

    bindEvents() {
        // Utiliser requestAnimationFrame pour optimiser les performances
        window.addEventListener('scroll', () => {
            if (!this.isScrolling) {
                requestAnimationFrame(() => {
                    this.updateParallax();
                    this.isScrolling = false;
                });
            }
            this.isScrolling = true;
        }, { passive: true });

        // Recalculer lors du redimensionnement
        window.addEventListener('resize', () => {
            clearTimeout(this.scrollTimeout);
            this.scrollTimeout = setTimeout(() => {
                this.updateParallax();
            }, 100);
        });
    }

    updateParallax() {
        const scrollY = window.pageYOffset;
        const windowHeight = window.innerHeight;

        this.sections.forEach(section => {
            if (!section.bgElement || section.element.id === 'accueil') return;

            const rect = section.element.getBoundingClientRect();
            const elementTop = rect.top + scrollY;
            const elementHeight = rect.height;

            // Calculer si l'élément est visible
            const isVisible = (
                rect.bottom >= 0 &&
                rect.top <= windowHeight
            );

            if (isVisible) {
                // Calculer le décalage de parallaxe
                const parallaxY = (scrollY - elementTop) * section.speed;
                
                // Limiter le mouvement pour éviter les artefacts visuels
                const maxOffset = elementHeight * 0.3; // Maximum 30% de la hauteur de l'élément
                const clampedParallaxY = Math.max(-maxOffset, Math.min(maxOffset, parallaxY));
                
                // Appliquer la transformation avec translate3d pour l'accélération matérielle
                section.bgElement.style.transform = `translate3d(0, ${clampedParallaxY}px, 0)`;
            }
        });
    }

    // Méthode pour désactiver la parallaxe (utile pour les performances sur mobile)
    disable() {
        this.sections.forEach(section => {
            if (section.bgElement) {
                section.bgElement.style.transform = 'none';
                section.bgElement.style.willChange = 'auto';
            }
        });
    }

    // Méthode pour réactiver la parallaxe
    enable() {
        this.sections.forEach(section => {
            if (section.bgElement) {
                section.bgElement.style.willChange = 'transform';
            }
        });
        this.updateParallax();
    }
}

// Initialiser le gestionnaire de parallaxe quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    // Vérifier si l'utilisateur préfère les animations réduites
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        // Attendre un peu pour que les autres scripts se chargent
        setTimeout(() => {
            window.parallaxManager = new ParallaxManager();
        }, 100);
    }
    
    // Désactiver la parallaxe sur les appareils mobiles pour optimiser les performances
    if (window.innerWidth <= 768) {
        if (window.parallaxManager) {
            window.parallaxManager.disable();
        }
    }
});

// Gérer les changements d'orientation et de taille d'écran
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        if (window.parallaxManager) {
            if (window.innerWidth <= 768) {
                window.parallaxManager.disable();
            } else {
                window.parallaxManager.enable();
            }
        }
    }, 500);
});