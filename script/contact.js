// Gestion du formulaire de contact avec EmailJS
// Configuration EmailJS - À REMPLACER avec vos propres clés
const EMAILJS_CONFIG = {
    serviceID: 'service_u61rylm',      // À remplacer
    templateID: 'template_2w5tvne',    // À remplacer
    publicKey: 'LE9KPhWy4aW2cQgrR'       // À remplacer
};

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Désactivation du bouton pendant l'envoi
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = `
                <svg class="animate-spin h-5 w-5 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Envoi en cours...
            `;
            
            // Préparation des paramètres pour EmailJS
            const templateParams = {
                from_name: contactForm.prenom.value + ' ' + contactForm.nom.value,
                from_email: contactForm.email.value,
                subject: contactForm.sujet.value,
                message: contactForm.message.value,
                reply_to: contactForm.email.value
            };
            
            // Envoi via EmailJS
            emailjs.send(
                EMAILJS_CONFIG.serviceID,
                EMAILJS_CONFIG.templateID,
                templateParams,
                EMAILJS_CONFIG.publicKey
            )
            .then(function(response) {
                // Succès
                formMessage.classList.remove('hidden', 'bg-red-500/20', 'border-red-400');
                formMessage.classList.add('bg-green-500/20', 'border', 'border-green-400');
                formMessage.textContent = 'Votre message a été envoyé avec succès !';
                
                // Réinitialisation du formulaire
                contactForm.reset();
                
                // Masquer le message après 5 secondes
                setTimeout(() => {
                    formMessage.classList.add('hidden');
                }, 5000);
                
                console.log('Email envoyé avec succès!', response.status, response.text);
            })
            .catch(function(error) {
                // Erreur
                formMessage.classList.remove('hidden', 'bg-green-500/20', 'border-green-400');
                formMessage.classList.add('bg-red-500/20', 'border', 'border-red-400');
                formMessage.textContent = 'Erreur lors de l\'envoi du message. Veuillez réessayer.';
                
                console.error('Erreur EmailJS:', error);
            })
            .finally(function() {
                // Réactivation du bouton
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            });
        });
    }
});
