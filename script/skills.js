/**
 * Gestionnaire d'animations pour les compétences
 * Ajoute des animations au scroll et des effets interactifs sur les bulles
 */

class SkillsManager {
    constructor() {
        this.skillBubbles = document.querySelectorAll('.skill-bubble');
        this.skillsSection = document.getElementById('parcours');
        this.hasAnimated = false;
        
        this.init();
    }

    init() {
        // Observer pour détecter quand la section entre dans le viewport
        this.setupIntersectionObserver();
        
        // Ajouter des événements de clic sur les bulles
        this.setupBubbleInteractions();
        
        // Ajouter un effet de tooltip au survol
        this.setupTooltips();
    }

    setupIntersectionObserver() {
        const options = {
            root: null,
            threshold: 0.3, // Déclencher quand 30% de la section est visible
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.triggerAnimations();
                    this.hasAnimated = true;
                }
            });
        }, options);

        if (this.skillsSection) {
            observer.observe(this.skillsSection);
        }
    }

    triggerAnimations() {
        // Déclencher les animations CSS en ajoutant une classe
        this.skillBubbles.forEach((bubble, index) => {
            setTimeout(() => {
                bubble.classList.add('animate-in');
            }, index * 100);
        });
    }

    setupBubbleInteractions() {
        this.skillBubbles.forEach(bubble => {
            const skillName = bubble.getAttribute('data-skill');
            
            // Effet au clic : afficher des informations
            bubble.addEventListener('click', () => {
                this.showSkillInfo(skillName, bubble);
            });

            // Effet au survol : légère rotation
            bubble.addEventListener('mouseenter', () => {
                const content = bubble.querySelector('.skill-content');
                content.style.transform = 'scale(1.15) rotate(5deg)';
            });

            bubble.addEventListener('mouseleave', () => {
                const content = bubble.querySelector('.skill-content');
                content.style.transform = 'scale(1) rotate(0deg)';
            });
        });
    }

    setupTooltips() {
        // Descriptions des compétences
        const skillDescriptions = {
            'Python': 'Language de programmation polyvalent haut niveau',
            'js': 'Script Web et Framework front-end',
            'PHP': 'Language Web back-end',
            'linux': 'OS et environnement Linux',
            'SQL': 'Language de base de données',
            'csharp': 'Language haut niveau orienté objet',
            'Git': 'Outils de versionning',
            'aws': 'Environnement du cloud AWS',
            'cpp': 'Language bas niveau orienté objet'
        };

        this.skillBubbles.forEach(bubble => {
            const skillName = bubble.getAttribute('data-skill');
            const description = skillDescriptions[skillName] || skillName;
            
            // Créer un élément tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'skill-tooltip absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm opacity-0 pointer-events-none transition-all duration-300 whitespace-nowrap z-50';
            tooltip.textContent = description;
            
            bubble.style.position = 'absolute';
            bubble.appendChild(tooltip);
            
            // Afficher le tooltip au survol
            bubble.addEventListener('mouseenter', () => {
                tooltip.style.opacity = '1';
                tooltip.style.transform = 'translateX(-50%) translateY(-5px)';
            });
            
            bubble.addEventListener('mouseleave', () => {
                tooltip.style.opacity = '0';
                tooltip.style.transform = 'translateX(-50%) translateY(0)';
            });
        });
    }

    showSkillInfo(skillName, bubbleElement) {
        // Informations détaillées sur chaque compétence
        const skillDetails = {
            'Python': {
                level: '90%',
                experience: '3 ans',
                projects: 'Scripts d\'automatisation, analyse de données, projets scolaires'
            },
            'JavaScript': {
                level: '80%',
                experience: '2 ans',
                projects: 'Applications web interactives, portfolio, projets React'
            },
            'PHP': {
                level: '75%',
                experience: '2 ans',
                projects: 'Sites web dynamiques, APIs REST, systèmes de gestion'
            },
            'HTML': {
                level: '65%',
                experience: '2 ans',
                projects: 'Nombreux sites web et applications'
            },
            'CSS': {
                level: '60%',
                experience: '2 ans',
                projects: 'Design responsive, Tailwind CSS, animations'
            },
            'SQL': {
                level: '55%',
                experience: '1.5 ans',
                projects: 'Bases de données MySQL, requêtes complexes'
            },
            'Java': {
                level: '40%',
                experience: '1 an',
                projects: 'Programmation orientée objet, projets scolaires'
            },
            'C': {
                level: '30%',
                experience: '6 mois',
                projects: 'Programmation système, apprentissage des bases'
            }
        };

        const details = skillDetails[skillName];
        
        if (details) {
            // Animation de feedback visuel
            const content = bubbleElement.querySelector('.skill-content');
            content.style.animation = 'none';
            setTimeout(() => {
                content.style.animation = '';
            }, 10);
            
            // Vous pouvez ajouter une modal ici ou un affichage d'informations
            console.log(`${skillName}: ${details.level} - ${details.experience} - ${details.projects}`);
            
            // Effet de "ping" visuel
            const ping = document.createElement('div');
            ping.className = 'absolute inset-0 rounded-full bg-white opacity-75 animate-ping';
            content.appendChild(ping);
            setTimeout(() => ping.remove(), 1000);
        }
    }

    // Méthode pour réinitialiser les animations (utile pour le développement)
    resetAnimations() {
        this.hasAnimated = false;
        this.skillBubbles.forEach(bubble => {
            bubble.classList.remove('animate-in');
        });
    }
}

// Initialiser le gestionnaire de compétences quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    window.skillsManager = new SkillsManager();
});

// Animation de la flèche (pulsation légère)
document.addEventListener('DOMContentLoaded', () => {
    const arrowTip = document.querySelector('.border-l-green-400');
    if (arrowTip) {
        setInterval(() => {
            arrowTip.style.transition = 'transform 0.5s ease-in-out';
            arrowTip.style.transform = 'translateX(5px)';
            setTimeout(() => {
                arrowTip.style.transform = 'translateX(0)';
            }, 500);
        }, 2000);
    }
});