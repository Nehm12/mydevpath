// content.js
// Renders projects, testimonials, services, skills, social links, contact & CV
// from data JSON files (all editable via Decap CMS)
(function () {
    const IMG_FALLBACK = 'images/nehm.jpeg';
    const codeLabels = { en: 'Code', fr: 'Code' };
    const demoLabels = { en: 'Demo', fr: 'Démo' };

    let projectsData = [];
    let testimonialsData = [];
    let servicesData = [];
    let skillsData = [];
    let socialsData = [];
    let contactData = {};
    let cvData = {};

    function getLang() {
        return localStorage.getItem('language') || 'en';
    }

    function t(key) {
        const lang = getLang();
        return (translations[lang] && translations[lang][key]) || '';
    }

    async function loadJSON(url) {
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load ' + url);
        return res.json();
    }

    function starsHTML(rating) {
        rating = Number(rating) || 0;
        let html = '';
        for (let i = 1; i <= 5; i++) {
            if (rating >= i) {
                html += '<i class="fas fa-star"></i>';
            } else if (rating >= i - 0.5) {
                html += '<i class="fas fa-star-half-alt"></i>';
            } else {
                html += '<i class="far fa-star"></i>';
            }
        }
        return html;
    }

    function pick(lang, obj, enKey, frKey) {
        return lang === 'fr' ? (obj[frKey] || obj[enKey]) : (obj[enKey] || obj[frKey]);
    }

    function renderProjects(lang) {
        const grid = document.getElementById('projects-grid');
        if (!grid) return;
        if (!projectsData.length) {
            grid.innerHTML = '<p class="empty-hint">No projects yet.</p>';
            return;
        }
        grid.innerHTML = projectsData.map(p => `
            <div class="project-card">
                <img src="${p.image}" alt="${p.title}" class="project-img" onerror="this.onerror=null;this.src='${IMG_FALLBACK}'">
                <div class="project-content">
                    <h3 class="project-title">${p.title}</h3>
                    <p class="project-desc">${pick(lang, p, 'description_en', 'description_fr')}</p>
                    <div class="project-tags">${(p.tags || []).map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
                    <div class="project-links">
                        <a href="${p.code_url || '#'}" class="project-link" target="_blank"><i class="fab fa-github"></i> ${codeLabels[lang]}</a>
                        <a href="${p.demo_url || '#'}" class="project-link" target="_blank"><i class="fas fa-external-link-alt"></i> ${demoLabels[lang]}</a>
                    </div>
                </div>
            </div>`).join('');
    }

    function renderTestimonials(lang) {
        const content = document.getElementById('testimonials-marquee-content');
        if (!content) return;
        if (!testimonialsData.length) {
            content.innerHTML = '<p class="empty-hint">No testimonials yet.</p>';
            return;
        }
        const doubled = testimonialsData.concat(testimonialsData);
        content.innerHTML = doubled.map(test => `
            <div class="testimonial-card">
                <div class="testimonial-header">
                    <div class="testimonial-avatar-wrapper">
                        <img src="${test.photo}" alt="${test.name}" class="testimonial-avatar" onerror="this.onerror=null;this.src='${IMG_FALLBACK}'">
                    </div>
                    <div class="testimonial-identity">
                        <h4 class="testimonial-name">${test.name}</h4>
                        <p class="testimonial-role">${pick(lang, test, 'role_en', 'role_fr')}</p>
                    </div>
                </div>
                <div class="testimonial-stars">${starsHTML(test.rating)}</div>
                <p class="testimonial-text">"${pick(lang, test, 'comment_en', 'comment_fr')}"</p>
            </div>`).join('');
    }

    function renderServices(lang) {
        const grid = document.getElementById('services-grid');
        if (!grid) return;
        if (!servicesData.length) {
            grid.innerHTML = '<p class="empty-hint">No services yet.</p>';
            return;
        }
        grid.innerHTML = servicesData.map(s => `
            <div class="service-card">
                <div class="service-icon"><i class="${s.icon}"></i></div>
                <div class="service-content">
                    <h3 class="service-title">${pick(lang, s, 'title_en', 'title_fr')}</h3>
                    <p class="service-desc">${pick(lang, s, 'desc_en', 'desc_fr')}</p>
                    <div class="service-tags">${(s.tags || []).map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
                </div>
            </div>`).join('');
    }

    function renderSkills(lang) {
        const grid = document.getElementById('skills-grid');
        if (!grid) return;
        if (!skillsData.length) {
            grid.innerHTML = '<p class="empty-hint">No skills yet.</p>';
            return;
        }
        grid.innerHTML = skillsData.map(cat => `
            <div class="skill-card">
                <h3 class="skill-card-title">${pick(lang, cat, 'title_en', 'title_fr')}</h3>
                ${(cat.items || []).map(item => `
                    <div class="skill-item">
                        <div class="skill-info">
                            <span>${item.name}</span>
                            <span>${item.level}%</span>
                        </div>
                        <div class="skill-bar-bg">
                            <div class="skill-bar-fill" style="width: ${item.level}%;"></div>
                        </div>
                    </div>`).join('')}
            </div>`).join('');
    }

    function renderSocials() {
        const hero = document.getElementById('hero-social');
        const footer = document.getElementById('footer-social');
        const html = socialsData.map(s => {
            const blank = /^https?:\/\//.test(s.url) ? ' target="_blank" rel="noopener"' : '';
            return `<a href="${s.url}"${blank}><i class="${s.icon}"></i></a>`;
        }).join('');
        if (hero) hero.innerHTML = html;
        if (footer) footer.innerHTML = html;
    }

    function renderContact() {
        const info = document.getElementById('contact-info');
        if (info) {
            info.innerHTML = `
                <div class="contact-info-item"><i class="fas fa-map-marker-alt"></i><span>${contactData.location || ''}</span></div>
                <div class="contact-info-item"><i class="fas fa-phone-alt"></i><span>${contactData.phone || ''}</span></div>
                <div class="contact-info-item"><i class="far fa-envelope"></i><span>${contactData.email || ''}</span></div>`;
        }
        const fcl = document.getElementById('footer-contact-list');
        if (fcl) {
            const parts = (contactData.location || '').split(',').map(x => x.trim()).filter(Boolean);
            fcl.innerHTML = parts.map(part => `<li>${part}</li>`).join('') + `<li>${contactData.email || ''}</li>`;
        }
    }

    function renderCV() {
        const file = cvData.file || 'Nehm_CV.pdf';
        const name = cvData.name || 'Nehm_CV.pdf';
        const iframe = document.getElementById('cv-iframe');
        const link = document.getElementById('cv-download-link');
        const title = document.getElementById('cv-title');
        if (iframe) iframe.src = `${file}#toolbar=0`;
        if (link) link.href = file;
        if (title) title.textContent = name;
    }

    function renderAll() {
        const lang = getLang();
        renderProjects(lang);
        renderTestimonials(lang);
        renderServices(lang);
        renderSkills(lang);
        renderSocials();
        renderContact();
        renderCV();
    }

    function setupContactForm() {
        const form = document.querySelector('.contact-form');
        if (!form) return;
        const status = document.createElement('div');
        status.className = 'form-status';
        form.appendChild(status);

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            status.textContent = t('form-sending');
            status.className = 'form-status';
            btn.disabled = true;
            try {
                const res = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { 'Accept': 'application/json' }
                });
                if (!res.ok) throw new Error('HTTP ' + res.status);
                status.textContent = t('form-success');
                status.className = 'form-status success';
                form.reset();
            } catch (err) {
                status.textContent = t('form-error');
                status.className = 'form-status error';
            } finally {
                btn.disabled = false;
            }
        });
    }

    async function init() {
        try {
            const [pj, tm, sv, sk, so, ct, cv] = await Promise.all([
                loadJSON('data/projects.json'),
                loadJSON('data/testimonials.json'),
                loadJSON('data/services.json'),
                loadJSON('data/skills.json'),
                loadJSON('data/social.json'),
                loadJSON('data/contact.json'),
                loadJSON('data/cv.json')
            ]);
            projectsData = (pj && pj.projects) || [];
            testimonialsData = (tm && tm.testimonials) || [];
            servicesData = (sv && sv.services) || [];
            skillsData = (sk && sk.skills) || [];
            socialsData = (so && so.socials) || [];
            contactData = (ct && ct.contact) || {};
            cvData = (cv && cv.cv) || {};
        } catch (err) {
            console.error('Content loading error:', err);
        }
        renderAll();
        setupContactForm();

        document.addEventListener('languageChanged', () => {
            renderAll();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
