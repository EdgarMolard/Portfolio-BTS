/**
 * Gestion du système de changement de thème
 * Bascule entre le thème sombre (vert/noir) et le thème clair (vert/blanc)
 */

class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.body = document.getElementById('body');
        this.sunIcon = document.getElementById('sunIcon');
        this.moonIcon = document.getElementById('moonIcon');
        
        this.init();
    }

    init() {
        // Charger le thème sauvegardé ou utiliser le thème sombre par défaut
        const savedTheme = localStorage.getItem('theme') || 'dark';
        this.applyTheme(savedTheme);

        // Événement de clic sur le bouton
        this.themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });
    }

    toggleTheme() {
        const currentTheme = this.body.classList.contains('dark-theme') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        this.applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    }

    applyTheme(theme) {
        if (theme === 'dark') {
            this.body.className = 'transition-all duration-500 dark-theme bg-gradient-to-br from-green-800 to-black';
            this.sunIcon.classList.remove('hidden');
            this.moonIcon.classList.add('hidden');
        } else {
            this.body.className = 'transition-all duration-500 light-theme bg-gradient-to-br from-green-800 to-white';
            this.sunIcon.classList.add('hidden');
            this.moonIcon.classList.remove('hidden');
        }
    }
}

// Initialiser le gestionnaire de thème quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
});