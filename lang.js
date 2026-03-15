// lang.js
const currentYear = new Date().getFullYear();

const translations = {
    en: {
        // Hero Section
        "hero-title": "Nehm Hounga<br>",
        "hero-subtitle": "Software Developer Engineer |🔹Amazon Certified |<br>AWS & GCP Ecosystem | Google Cloud Innovator |<br>Consultant Solution Architect | Serial Entrepreneur ",
        "hero-text": "Building resilient software solutions at the intersection of cloud computing and software engineering. Focused on scalable architectures, distributed systems, and delivering impactful solutions within AWS and Google Cloud environments.",
        "btn-view-cv": "View CV",
        "btn-contact": "DM on LinkedIn",
        "btn-entrepreneur": "Entrepreneurship Path",
        "trusted-title": "Trusted By",
        "about-title": "About Me",
        "about-p1": "I am not just another developer. I have been immersed in computer science since high school before specializing at the university level. This early, foundational deep-dive into general IT has shaped my holistic approach to problem-solving, giving me a broader understanding of how systems interlock beneath the surface. Today, as an Amazon Certified Software Development Engineer and Google Cloud Innovator, I leverage this lifelong technical culture to build robust, end-to-end architectures.",
        "about-p2": "Often seen as an \"All-in-One\" technical asset, I bridge the gap between low-level system understanding and high-level cloud strategies (AWS & GCP). Based in Cotonou, Republic of Benin, I act as a Consultant Solution Architect, bringing a natural intuition and pragmatic engineering to organizations that need resilient, scalable digital products rather than just lines of code.",

        // Services
        "services-be": "Backend Engineering",
        "services-be-desc": "Designing robust and scalable server-side architectures",
        "services-de": "Data Engineering",
        "services-de-desc": "Designing and optimizing database architectures",
        "services-ca": "Cloud Architecture",
        "services-ca-desc": "Deploying and managing cloud infrastructure",
        "services-pe": "Prompt Engineering",
        "services-pe-desc": "Crafting effective prompts for AI models to achieve desired outcomes",
        "services-md": "Mobile Development ",
        "services-md-desc": "Building mobile applications for iOS and Android",

        // Skills
        "skills-title": "Skills & Expertise",
        "skills-pl": "Programming Languages",
        "skills-fw": "Frameworks",
        "skills-tp": "Tools & Platforms",
        "skills-db": "Databases",
        "skills-ot": "Other",

        // Projects
        "projects-title": "What we've built",
        "desc-nova": "A full Backend-Frontend website for NovaTech Vision, a company that\n                            specializes in IT solutions.",
        "desc-agri": "AgriTwin a digital agriculture platform,\n                            PWA available online that transforms every farm into a digital twin\n                            intelligent, usable even on a simple smartphone.\n                            More productive, sustainable and resilient agriculture thanks to satellite data.",
        "desc-speed": "Creation of an application to facilitate invoice entry for the financial\n                            sector.\n                            Automating financial flows, tracking transactions and generating accurate reports for\n                            users.\n                            Implementation of an intuitive interface to simplify accounting operations and\n                            improve efficiency.",
        "desc-ai4bmi": "A complete platform for managing industrial equipment and e-commerce for\n                            the Bénin Moto Industry (BMI) factory.",
        "desc-campus": "The university platform\n                            that makes academic life easier. University announcements, room reservations, collaborative\n                            workspace.",
        "desc-bmishop": "Mobile store for auto & motorcycle parts. Complete journey: catalog,\n                            shopping cart, checkout, and Mobile Money payment (FedaPay).",
        "desc-kifood": "Mobile App for food delivery in Bénin.",
        "desc-ltc": "High School LTC Manage APP is a full web application Backend-Frontend\n                            for managing high school students, teachers, and courses.",
        "desc-house": " House of Transformation is a spiritual community website ",
        "btn-code": "<i class=\"fab fa-github\"></i> Code",
        "btn-demo": "<i class=\"fas fa-external-link-alt\"></i> Demo",

        // Contact
        "contact-title": "Let's Work Together",
        "label-name": "Name",
        "label-email": "Email",
        "label-msg": "Message",
        "btn-send": "Send Message",
        "contact-info-title": "Contact Information",

        // Footer
        "footer-roles": "Software Engineer | IT Solutions Architect | Consultant",
        "footer-quick": "Quick Links",
        "link-about": "About",
        "link-projects": "Projects",
        "link-skills": "Skills",
        "link-contact": "Contact",
        "footer-contact": "Contact",
        "footer-rights": `&copy; ${currentYear} Nehm HOUNGA. All rights reserved.`
    },
    fr: {
        // Hero Section
        "hero-title": "Nehm Hounga<br>",
        "hero-subtitle": "Ingénieur Développeur Logiciel |🔹Certifié Amazon |<br>Écosystème AWS & GCP | Google Cloud Innovateur |<br>Consultant Architecte Solutions | Entrepreneur Multi-Secteur ",
        "hero-text": "Création de solutions logicielles résilientes à l'intersection du cloud computing et de l'ingénierie logicielle. Axé sur les architectures évolutives, les systèmes distribués et la fourniture de solutions percutantes dans les environnements AWS et Google Cloud.",
        "btn-view-cv": "Voir le CV",
        "btn-contact": "DM sur LinkedIn",
        "btn-entrepreneur": "Parcours entrepreneurial ",
        "trusted-title": "Ils m'ont fait confiance",
        "about-title": "À Propos de Moi",
        "about-p1": "Je ne suis pas le développeur habituel. Baignant dans l'informatique depuis le lycée avant même de me spécialiser à l'université, j'ai acquis une culture générale de la tech profonde et organique. Ce bagage précoce me donne une véritable mentalité de « couteau suisse » et une compréhension globale de la façon dont les systèmes s'articulent, de la base jusqu'au cloud. Aujourd'hui, en tant qu'Ingénieur Logiciel certifié Amazon et innovateur Google Cloud, je mets à profit cette intuition technique pour concevoir des architectures globales et ultra-résilientes.",
        "about-p2": "Véritable ressource « All-in-One » (Tout-en-Un), je fais le pont entre les couches basses du système et les stratégies Cloud modernes (AWS & GCP). Basé à Cotonou au Bénin, j'interviens comme Consultant Architecte Solutions auprès d'organisations qui recherchent un pragmatisme naturel et une vision d'ensemble pour transformer leurs concepts en produits numériques pérennes.",

        // Services
        "services-be": "Ingénierie Backend",
        "services-be-desc": "Conception d'architectures côté serveur robustes et évolutives",
        "services-de": "Ingénierie des Données",
        "services-de-desc": "Conception et optimisation d'architectures de bases de données",
        "services-ca": "Architecture Cloud",
        "services-ca-desc": "Déploiement et gestion d'infrastructures cloud",
        "services-pe": "Ingénierie de Prompt",
        "services-pe-desc": "Création de prompts efficaces pour les modèles d'IA afin d'atteindre les résultats souhaités",
        "services-md": "Développement Mobile ",
        "services-md-desc": "Création d'applications mobiles pour iOS et Android",

        // Skills
        "skills-title": "Compétences & Expertise",
        "skills-pl": "Langages de Programmation",
        "skills-fw": "Frameworks",
        "skills-tp": "Outils & Plateformes",
        "skills-db": "Bases de Données",
        "skills-ot": "Autres",

        // Projects
        "projects-title": "Ce que nous avons construit",
        "desc-nova": "Un site complet Backend-Frontend pour NovaTech Vision, une entreprise spécialisée dans les solutions informatiques.",
        "desc-agri": "AgriTwin une plateforme d'agriculture numérique,\n                            PWA disponible en ligne qui transforme chaque ferme en un jumeau numérique\n                            intelligent, utilisable même sur un simple smartphone.\n                            Une agriculture plus productive, durable et résiliente grâce aux données satellitaires.",
        "desc-speed": "Création d'une application pour faciliter la saisie des factures dans le secteur financier.\n                            Automatisation des flux financiers, suivi des transactions et génération de rapports précis pour les\n                            utilisateurs.\n                            Mise en place d'une interface intuitive pour simplifier les opérations comptables et\n                            améliorer l'efficacité.",
        "desc-ai4bmi": "Une plateforme complète pour la gestion des équipements industriels et le commerce électronique pour\n                            l'usine Bénin Moto Industry (BMI).",
        "desc-campus": "La plateforme universitaire\n                            qui facilite la vie académique. Annonces universitaires, réservation de salles, espace de travail collaboratif.",
        "desc-bmishop": "Boutique mobile pour pièces auto et moto. Parcours complet : catalogue,\n                            panier, caisse, et paiement Mobile Money (FedaPay).",
        "desc-kifood": "Application mobile pour la livraison de repas au Bénin.",
        "desc-ltc": "High School LTC Manage APP est une application web complète Backend-Frontend\n                            pour gérer les élèves, les enseignants et les cours au lycée.",
        "desc-house": " House of Transformation est un site de communauté spirituelle ",
        "btn-code": "<i class=\"fab fa-github\"></i> Code",
        "btn-demo": "<i class=\"fas fa-external-link-alt\"></i> Démo",

        // Contact
        "contact-title": "Travaillons ensemble",
        "label-name": "Nom",
        "label-email": "E-mail",
        "label-msg": "Message",
        "btn-send": "Envoyer le Message",
        "contact-info-title": "Informations de Contact",

        // Footer
        "footer-roles": "Ingénieur Développeur Logiciel | Architecte Solutions IT | Consultant",
        "footer-quick": "Liens Rapides",
        "link-about": "À Propos",
        "link-projects": "Projets",
        "link-skills": "Compétences",
        "link-contact": "Contact",
        "footer-contact": "Contact",
        "footer-rights": `&copy; ${currentYear} Nehm HOUNGA. Tous droits réservés.`
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const langToggleBtn = document.getElementById('lang-toggle');
    if (!langToggleBtn) return;

    // Check saved language (defaulting to fr since the rest of the conversation is in french)
    // Actually the initial HTML is in EN, so we start with EN matching HTML
    let currentLang = localStorage.getItem('language') || 'en';

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('language', lang);

        // Update button text to show the OTHER language (what clicking will change to)
        const langText = langToggleBtn.querySelector('.lang-text');
        if (langText) langText.textContent = lang === 'en' ? 'FR' : 'EN';

        // Update all elements with data-i18n attribute
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });

        // Ensure language toggle has proper title
        langToggleBtn.setAttribute('aria-label', lang === 'en' ? 'Passer en Français' : 'Switch to English');
    }

    // Set initial language without overriding raw HTML initially (unless it differs)
    if (localStorage.getItem('language')) {
        setLanguage(currentLang);
    } else {
        // Just set the correct text for the button, keeping current string from HTML
        const langText = langToggleBtn.querySelector('.lang-text');
        if (langText) langText.textContent = 'FR';
        langToggleBtn.setAttribute('aria-label', 'Passer en Français');
    }

    // Toggle language on click
    langToggleBtn.addEventListener('click', () => {
        const newLang = currentLang === 'en' ? 'fr' : 'en';
        setLanguage(newLang);
    });
});
