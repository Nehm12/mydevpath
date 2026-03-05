import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Add lang-toggle button next to theme-toggle
button_html = """
    <!-- Language Toggle -->
    <button class="lang-toggle" id="lang-toggle" aria-label="Toggle language">
        FR
    </button>
"""
if "id=\"lang-toggle\"" not in content:
    content = content.replace(
        "    <!-- Theme Toggle -->\n    <button class=\"theme-toggle\" id=\"theme-toggle\" aria-label=\"Toggle dark mode\">\n        <i class=\"fas fa-moon\"></i>\n    </button>",
        "    <!-- Theme Toggle -->\n    <button class=\"theme-toggle\" id=\"theme-toggle\" aria-label=\"Toggle dark mode\">\n        <i class=\"fas fa-moon\"></i>\n    </button>" + button_html
    )

# Add script at the end
if "lang.js" not in content:
    content = content.replace("</body>", "    <script src=\"lang.js\"></script>\n</body>")

# Add data-i18n tags
replacements = [
    ('<h1 class="hero-title">', '<h1 class="hero-title" data-i18n="hero-title">'),
    ('<p class="hero-subtitle">', '<p class="hero-subtitle" data-i18n="hero-subtitle">'),
    ('<p class="hero-text">', '<p class="hero-text" data-i18n="hero-text">'),
    ('<button class="btn-primary" id="btn-view-cv">', '<button class="btn-primary" id="btn-view-cv" data-i18n="btn-view-cv">'),
    ('<a href="https://t.me/Nehm00" class="btn-outline">', '<a href="https://t.me/Nehm00" class="btn-outline" data-i18n="btn-contact">'),
    
    ('<h2 class="section-title">About Me</h2>', '<h2 class="section-title" data-i18n="about-title">About Me</h2>'),
    ('<p>I am a Software Development Engineer specialized in Java and cloud-native architectures', '<p data-i18n="about-p1">I am a Software Development Engineer specialized in Java and cloud-native architectures'),
    ('<p>Based in Cotonou, Republic of Benin', '<p data-i18n="about-p2">Based in Cotonou, Republic of Benin'),
    
    ('<h3 class="service-title">Backend Engineering</h3>', '<h3 class="service-title" data-i18n="services-be">Backend Engineering</h3>'),
    ('<p class="service-desc">Designing robust and scalable server-side architectures</p>', '<p class="service-desc" data-i18n="services-be-desc">Designing robust and scalable server-side architectures</p>'),
    ('<h3 class="service-title">Data Engineering</h3>', '<h3 class="service-title" data-i18n="services-de">Data Engineering</h3>'),
    ('<p class="service-desc">Designing and optimizing database architectures</p>', '<p class="service-desc" data-i18n="services-de-desc">Designing and optimizing database architectures</p>'),
    ('<h3 class="service-title">Cloud Architecture</h3>', '<h3 class="service-title" data-i18n="services-ca">Cloud Architecture</h3>'),
    ('<p class="service-desc">Deploying and managing cloud infrastructure</p>', '<p class="service-desc" data-i18n="services-ca-desc">Deploying and managing cloud infrastructure</p>'),
    ('<h3 class="service-title">Prompt Engineering</h3>', '<h3 class="service-title" data-i18n="services-pe">Prompt Engineering</h3>'),
    ('<p class="service-desc">Crafting effective prompts for AI models to achieve desired outcomes</p>', '<p class="service-desc" data-i18n="services-pe-desc">Crafting effective prompts for AI models to achieve desired outcomes</p>'),
    ('<h3 class="service-title">Mobile Development </h3>', '<h3 class="service-title" data-i18n="services-md">Mobile Development </h3>'),
    ('<p class="service-desc">Building mobile applications for iOS and Android</p>', '<p class="service-desc" data-i18n="services-md-desc">Building mobile applications for iOS and Android</p>'),
    
    ('<h2 class="section-title">Skills & Expertise</h2>', '<h2 class="section-title" data-i18n="skills-title">Skills & Expertise</h2>'),
    ('<h3 class="skill-card-title">Programming Languages</h3>', '<h3 class="skill-card-title" data-i18n="skills-pl">Programming Languages</h3>'),
    ('<h3 class="skill-card-title">Frameworks</h3>', '<h3 class="skill-card-title" data-i18n="skills-fw">Frameworks</h3>'),
    ('<h3 class="skill-card-title">Tools & Platforms</h3>', '<h3 class="skill-card-title" data-i18n="skills-tp">Tools & Platforms</h3>'),
    ('<h3 class="skill-card-title">Databases</h3>', '<h3 class="skill-card-title" data-i18n="skills-db">Databases</h3>'),
    ('<h3 class="skill-card-title">Other</h3>', '<h3 class="skill-card-title" data-i18n="skills-ot">Other</h3>'),
    
    ('<h2 class="section-title">Featured Projects</h2>', '<h2 class="section-title" data-i18n="projects-title">Featured Projects</h2>'),
    ('<p class="project-desc">A full Backend-Frontend website for NovaTech Vision, a company that\n                            specializes in IT solutions.</p>', '<p class="project-desc" data-i18n="desc-nova">A full Backend-Frontend website for NovaTech Vision, a company that\n                            specializes in IT solutions.</p>'),
    ('<p class="project-desc">AgriTwin a digital agriculture platform,\n                            PWA available online that transforms every farm into a digital twin\n                            intelligent, usable even on a simple smartphone.\n                            More productive, sustainable and resilient agriculture thanks to satellite data.</p>', '<p class="project-desc" data-i18n="desc-agri">AgriTwin a digital agriculture platform,\n                            PWA available online that transforms every farm into a digital twin\n                            intelligent, usable even on a simple smartphone.\n                            More productive, sustainable and resilient agriculture thanks to satellite data.</p>'),
    ('<p class="project-desc">Creation of an application to facilitate invoice entry for the financial\n                            sector.\n                            Automating financial flows, tracking transactions and generating accurate reports for\n                            users.\n                            Implementation of an intuitive interface to simplify accounting operations and\n                            improve efficiency.</p>', '<p class="project-desc" data-i18n="desc-speed">Creation of an application to facilitate invoice entry for the financial\n                            sector.\n                            Automating financial flows, tracking transactions and generating accurate reports for\n                            users.\n                            Implementation of an intuitive interface to simplify accounting operations and\n                            improve efficiency.</p>'),
    ('<p class="project-desc">A complete platform for managing industrial equipment and e-commerce for\n                            the Bénin Moto Industry (BMI) factory.</p>', '<p class="project-desc" data-i18n="desc-ai4bmi">A complete platform for managing industrial equipment and e-commerce for\n                            the Bénin Moto Industry (BMI) factory.</p>'),
    ('<p class="project-desc">The university platform\n                            that makes academic life easier. University announcements, room reservations, collaborative\n                            workspace.</p>', '<p class="project-desc" data-i18n="desc-campus">The university platform\n                            that makes academic life easier. University announcements, room reservations, collaborative\n                            workspace.</p>'),
    ('<p class="project-desc">Mobile store for auto & motorcycle parts. Complete journey: catalog,\n                            shopping cart, checkout, and Mobile Money payment (FedaPay).</p>', '<p class="project-desc" data-i18n="desc-bmishop">Mobile store for auto & motorcycle parts. Complete journey: catalog,\n                            shopping cart, checkout, and Mobile Money payment (FedaPay).</p>'),
    ('<p class="project-desc">Mobile App for food delivery in Bénin.</p>', '<p class="project-desc" data-i18n="desc-kifood">Mobile App for food delivery in Bénin.</p>'),
    ('<p class="project-desc">High School LTC Manage APP is a full web application Backend-Frontend\n                            for managing high school students, teachers, and courses.</p>', '<p class="project-desc" data-i18n="desc-ltc">High School LTC Manage APP is a full web application Backend-Frontend\n                            for managing high school students, teachers, and courses.</p>'),
    ('<p class="project-desc"> House of Transformation is a spiritual community website </p>', '<p class="project-desc" data-i18n="desc-house"> House of Transformation is a spiritual community website </p>'),
    ('<a href="https://github.com/" class="project-link"><i class="fab fa-github"></i> Code</a>', '<a href="https://github.com/" class="project-link" data-i18n="btn-code"><i class="fab fa-github"></i> Code</a>'),
    ('<a href="https://novatechvision.com/" class="project-link"><i\n                                    class="fas fa-external-link-alt"></i> Demo</a>', '<a href="https://novatechvision.com/" class="project-link" data-i18n="btn-demo"><i\n                                    class="fas fa-external-link-alt"></i> Demo</a>'),
    ('<a href="https://agritwin.vercel.app/" class="project-link"><i\n                                    class="fas fa-external-link-alt"></i> Demo</a>', '<a href="https://agritwin.vercel.app/" class="project-link" data-i18n="btn-demo"><i\n                                    class="fas fa-external-link-alt"></i> Demo</a>'),
    ('<a href="https://speedx-eta.vercel.app/" class="project-link"><i\n                                    class="fas fa-external-link-alt"></i> Demo</a>', '<a href="https://speedx-eta.vercel.app/" class="project-link" data-i18n="btn-demo"><i\n                                    class="fas fa-external-link-alt"></i> Demo</a>'),
    ('<a href="https://ai4bmi.cabinet-xaviertermeau.com/" class="project-link"><i\n                                    class="fas fa-external-link-alt"></i> Demo</a>', '<a href="https://ai4bmi.cabinet-xaviertermeau.com/" class="project-link" data-i18n="btn-demo"><i\n                                    class="fas fa-external-link-alt"></i> Demo</a>'),
    ('<a href="https://github.com/Nehm12/CampusConnect" class="project-link"><i\n                                    class="fas fa-external-link-alt"></i> Demo</a>', '<a href="https://github.com/Nehm12/CampusConnect" class="project-link" data-i18n="btn-demo"><i\n                                    class="fas fa-external-link-alt"></i> Demo</a>'),
    ('<a href="https://github.com/Nehm12/LTC" class="project-link"><i\n                                    class="fas fa-external-link-alt"></i> Demo</a>', '<a href="https://github.com/Nehm12/LTC" class="project-link" data-i18n="btn-demo"><i\n                                    class="fas fa-external-link-alt"></i> Demo</a>'),
    ('<a href="https://maisondelatransformation.netlify.app/" class="project-link"><i\n                                    class="fas fa-external-link-alt"></i> Demo</a>', '<a href="https://maisondelatransformation.netlify.app/" class="project-link" data-i18n="btn-demo"><i\n                                    class="fas fa-external-link-alt"></i> Demo</a>'),

    ('<h2 class="section-title">Get in Touch</h2>', '<h2 class="section-title" data-i18n="contact-title">Get in Touch</h2>'),
    ('<label for="name">Name</label>', '<label for="name" data-i18n="label-name">Name</label>'),
    ('<label for="email">Email</label>', '<label for="email" data-i18n="label-email">Email</label>'),
    ('<label for="message">Message</label>', '<label for="message" data-i18n="label-msg">Message</label>'),
    ('<button type="submit" class="btn-primary">Send Message</button>', '<button type="submit" class="btn-primary" data-i18n="btn-send">Send Message</button>'),
    ('<h3 class="contact-info-title">Contact Information</h3>', '<h3 class="contact-info-title" data-i18n="contact-info-title">Contact Information</h3>'),
    
    ('<p class="footer-roles">Software Engineer | Solutions Architect | Consultant</p>', '<p class="footer-roles" data-i18n="footer-roles">Software Engineer | Solutions Architect | Consultant</p>'),
    ('<h4 class="footer-heading">Quick Links</h4>', '<h4 class="footer-heading" data-i18n="footer-quick">Quick Links</h4>'),
    ('<li><a href="#">About</a></li>', '<li><a href="#" data-i18n="link-about">About</a></li>'),
    ('<li><a href="#projects">Projects</a></li>', '<li><a href="#projects" data-i18n="link-projects">Projects</a></li>'),
    ('<li><a href="#skills">Skills</a></li>', '<li><a href="#skills" data-i18n="link-skills">Skills</a></li>'),
    ('<li><a href="#contact">Contact</a></li>', '<li><a href="#contact" data-i18n="link-contact">Contact</a></li>'),
    ('<h4 class="footer-heading">Contact</h4>', '<h4 class="footer-heading" data-i18n="footer-contact">Contact</h4>'),
    ('<p>&copy; 2026 Nehm HOUNGA. All rights reserved.</p>', '<p data-i18n="footer-rights">&copy; 2026 Nehm HOUNGA. All rights reserved.</p>')
]

for old, new in replacements:
    content = content.replace(old, new)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('Done applying i18n tags and lang button')
