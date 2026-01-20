# Configuration du formulaire de contact avec EmailJS

Ce formulaire utilise **EmailJS**, un service gratuit qui permet d'envoyer des emails directement depuis JavaScript, sans serveur backend PHP.

## Avantages
- ✅ Pas besoin de serveur PHP
- ✅ Gratuit jusqu'à 200 emails/mois
- ✅ Fonctionne sur tous les hébergements (GitHub Pages, Netlify, etc.)
- ✅ Configuration simple en 5 minutes

---

## Configuration étape par étape

### Étape 1 : Créer un compte EmailJS

1. Allez sur https://www.emailjs.com/
2. Cliquez sur "Sign Up" (gratuit)
3. Créez votre compte avec Google, GitHub ou email

### Étape 2 : Configurer un service email

1. Une fois connecté, allez dans **Email Services**
2. Cliquez sur **Add New Service**
3. Choisissez votre fournisseur d'email (Gmail recommandé)
4. Suivez les instructions pour connecter votre compte Gmail
5. **Notez votre Service ID** (ex: `service_abc123`)

### Étape 3 : Créer un template d'email

1. Allez dans **Email Templates**
2. Cliquez sur **Create New Template**
3. Configurez le template comme suit :

**Template Name:** `portfolio_contact`

**Subject:** `Portfolio - {{subject}}`

**Content (HTML):**
```html
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #15803d 0%, #000000 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .info { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #15803d; }
        .label { font-weight: bold; color: #15803d; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Nouveau message depuis votre portfolio</h2>
        </div>
        <div class="content">
            <div class="info">
                <p><span class="label">De :</span> {{from_name}}</p>
            </div>
            <div class="info">
                <p><span class="label">Email :</span> {{from_email}}</p>
            </div>
            <div class="info">
                <p><span class="label">Sujet :</span> {{subject}}</p>
            </div>
            <div class="info">
                <p><span class="label">Message :</span></p>
                <p>{{message}}</p>
            </div>
        </div>
    </div>
</body>
</html>
```

4. Dans les **Settings** du template :
   - **To Email:** Votre email (où vous recevrez les messages)
   - **Reply To:** `{{reply_to}}` (pour pouvoir répondre directement)
   
5. Cliquez sur **Save**
6. **Notez votre Template ID** (ex: `template_xyz789`)

### Étape 4 : Obtenir votre clé publique

1. Allez dans **Account** → **General**
2. Trouvez votre **Public Key** (ex: `abcDEF123ghiJKL`)
3. **Copiez-la**

### Étape 5 : Configurer le code JavaScript

1. Ouvrez le fichier `script/contact.js`
2. Remplacez les valeurs suivantes au début du fichier :

```javascript
const EMAILJS_CONFIG = {
    serviceID: 'VOTRE_SERVICE_ID',      // Remplacez par votre Service ID
    templateID: 'VOTRE_TEMPLATE_ID',    // Remplacez par votre Template ID
    publicKey: 'VOTRE_PUBLIC_KEY'       // Remplacez par votre Public Key
};
```

**Exemple :**
```javascript
const EMAILJS_CONFIG = {
    serviceID: 'service_abc123',
    templateID: 'template_xyz789',
    publicKey: 'abcDEF123ghiJKL'
};
```

### Étape 6 : Tester le formulaire

1. Ouvrez votre fichier `index.html` dans un navigateur
2. Allez à la section "Me Contacter"
3. Remplissez le formulaire et envoyez un message test
4. Vérifiez votre boîte de réception

---

## Sécurité de la clé publique

⚠️ **La Public Key peut être partagée** - C'est normal !

Contrairement aux clés privées, la Public Key d'EmailJS est conçue pour être utilisée côté client (dans le navigateur). Elle ne permet que d'envoyer des emails via vos templates configurés, pas de modifier vos paramètres.

**Bonnes pratiques :**
- ✅ Partagez la Public Key dans votre code
- ✅ Configurez des limites d'envoi dans EmailJS (déjà par défaut)
- ✅ Activez le CAPTCHA si vous recevez du spam
- ❌ Ne partagez JAMAIS votre mot de passe EmailJS

---

## Limites du plan gratuit

- 📧 **200 emails/mois**
- 🔄 **1 template email**
- 📊 **Historique de 2 mois**

Si vous dépassez ces limites, vous pouvez :
- Passer à un plan payant (à partir de 7$/mois)
- Utiliser plusieurs comptes EmailJS
- Limiter les soumissions du formulaire

---

## Dépannage

### Erreur 412: "Request had insufficient authentication scopes"

Cette erreur signifie que les permissions Gmail dans EmailJS ne sont pas correctement configurées.

**Solution :**

1. **Supprimer et recréer le service Gmail :**
   - Allez dans EmailJS → **Email Services**
   - Supprimez votre service Gmail actuel
   - Cliquez sur **Add New Service**
   - Choisissez **Gmail**
   - **IMPORTANT** : Lors de la connexion Google, assurez-vous de :
     - ✅ Cocher TOUTES les cases de permissions demandées
     - ✅ Autoriser l'accès complet à l'envoi d'emails
     - ✅ Ne pas sélectionner "Accès limité"

2. **Vérifier les autorisations Google :**
   - Allez sur https://myaccount.google.com/permissions
   - Cherchez "EmailJS"
   - Supprimez l'accès
   - Reconnectez EmailJS avec toutes les permissions

3. **Alternative : Utiliser un autre service email**
   
   Si le problème persiste avec Gmail, utilisez **Outlook/Hotmail** :
   - Dans EmailJS → **Add New Service**
   - Choisissez **Outlook.com**
   - Connectez votre compte Microsoft
   - Les erreurs de scope sont moins fréquentes avec Outlook

4. **Tester avec un email personnel**
   
   Créez un nouvel email Gmail spécifiquement pour ce portfolio :
   - Créez une nouvelle adresse Gmail
   - Connectez-la à EmailJS (permissions complètes)
   - Utilisez-la uniquement pour ce formulaire

**Vérification que ça fonctionne :**
- Le service doit afficher "Connected" avec une coche verte
- Testez avec le bouton "Send Test Email" dans EmailJS
- Si le test fonctionne dans EmailJS, alors votre formulaire fonctionnera aussi

### Le message ne s'envoie pas
1. Ouvrez la console du navigateur (F12)
2. Vérifiez les erreurs JavaScript
3. Vérifiez que les 3 clés (serviceID, templateID, publicKey) sont correctes
4. Vérifiez que le script EmailJS est bien chargé

### Erreur "Template not found"
- Vérifiez que le Template ID est correct
- Vérifiez que le template est bien activé dans EmailJS

### Erreur "Service not found"
- Vérifiez que le Service ID est correct
- Vérifiez que le service est bien connecté dans EmailJS

### Les emails arrivent dans les spams
- Ajoutez votre propre email à vos contacts
- Vérifiez les paramètres SPF/DKIM de votre domaine (si applicable)

---

## Alternative : FormSpree

Si vous préférez une autre solution, vous pouvez aussi utiliser **FormSpree** :
- https://formspree.io/
- Encore plus simple (juste un email à configurer)
- Gratuit jusqu'à 50 emails/mois

---

## Support

- 📚 Documentation EmailJS : https://www.emailjs.com/docs/
- 💬 Support EmailJS : https://www.emailjs.com/support/
- 🐛 En cas de problème : Ouvrez la console du navigateur (F12) pour voir les erreurs

