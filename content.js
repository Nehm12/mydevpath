// content.js
// Renders projects and testimonials from data JSON files (editable via Decap CMS)
(function () {
    const IMG_FALLBACK = 'images/nehm.jpeg';
    const codeLabels = { en: 'Code', fr: 'Code' };
    const demoLabels = { en: 'Demo', fr: 'Démo' };

    let projectsData = [];
    let testimonialsData = [];

    function getLang() {
        return localStorage.getItem('language') || 'en';
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
                    <p class="project-desc">${lang === 'fr' ? (p.description_fr || p.description_en) : (p.description_en || p.description_fr)}</p>
                    <div class="project-tags">${(p.tags || []).map(t => `<span class="tag">${t}</span>`).join('')}</div>
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
        content.innerHTML = doubled.map(t => `
            <div class="testimonial-card">
                <div class="testimonial-header">
                    <div class="testimonial-avatar-wrapper">
                        <img src="${t.photo}" alt="${t.name}" class="testimonial-avatar" onerror="this.onerror=null;this.src='${IMG_FALLBACK}'">
                    </div>
                    <div class="testimonial-identity">
                        <h4 class="testimonial-name">${t.name}</h4>
                        <p class="testimonial-role">${lang === 'fr' ? (t.role_fr || t.role_en) : (t.role_en || t.role_fr)}</p>
                    </div>
                </div>
                <div class="testimonial-stars">${starsHTML(t.rating)}</div>
                <p class="testimonial-text">"${lang === 'fr' ? (t.comment_fr || t.comment_en) : (t.comment_en || t.comment_fr)}"</p>
            </div>`).join('');
    }

    function renderAll() {
        const lang = getLang();
        renderProjects(lang);
        renderTestimonials(lang);
    }

    async function init() {
        try {
            const [pj, tm] = await Promise.all([
                loadJSON('data/projects.json'),
                loadJSON('data/testimonials.json')
            ]);
            projectsData = (pj && pj.projects) || [];
            testimonialsData = (tm && tm.testimonials) || [];
        } catch (err) {
            console.error('Content loading error:', err);
        }
        renderAll();

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
