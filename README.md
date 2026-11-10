# Chinmaya Kumar Mishra – Personal Portfolio

> **Full-Stack Developer · Application Security**  
> *Building secure web apps and security tools.*

Personal portfolio website for **Chinmaya Kumar Mishra** ([`chinmaya00111`](https://github.com/chinmaya0011)), built with modern JavaScript, Next.js 15 (App Router), React 19, Tailwind CSS, and Framer Motion. 

Live at: **[chinmayakumarmishra.sbs](https://chinmayakumarmishra.sbs)**

---

## 🚀 Technology Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, JavaScript)
- **Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS 3](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Image Processing:** [Sharp](https://sharp.pixelplumbing.com/) (favicon and Open Graph generator)

---

## 📂 Project Structure

```
.
├── app/
│   ├── globals.css                # Global theme, dark palette, cyber-grid backdrops
│   ├── layout.js                  # SEO metadata, Open Graph, Twitter cards, Schema.org JSON-LD
│   ├── not-found.js               # Custom 404 page
│   ├── robots.js                  # Dynamic robots.txt generation
│   ├── sitemap.js                 # Dynamic sitemap.xml generation
│   └── page.js                    # Main landing page combining all sections
├── components/
│   ├── Navbar.js                  # Fixed pill navbar with brand (chinmaya00111) & socials
│   ├── Hero.js                    # Hero section with MERN code review workspace
│   ├── About.js                   # "Developer by Experience. Security by Interest."
│   ├── InteractiveTerminal.js     # Simulated Linux developer terminal (bash)
│   ├── Skills.js                  # Technical Expertise: Development, AppSec, Tools
│   ├── SecurityInterests.js       # 4 compact security learning focus areas
│   ├── Projects.js                # Featured projects (Scanner, AI Chatbot, BookSaathi)
│   ├── ProjectModal.js            # Grounded project specification modal
│   ├── SecurityResearch.js        # Security Notes & Research
│   ├── ResearchModal.js           # Learning note reader modal
│   ├── Experience.js              # Employment history (Secure Code, Metadee, Freelance)
│   ├── EducationCertifications.js # B.Tech degree & certified skill assessments
│   ├── Contact.js                 # Contact details, copy buttons, and message form
│   ├── ResumeModal.js             # Direct CV.pdf download options
│   └── Footer.js                  # Minimal footer with quick jumps & copyright
├── data/
│   └── portfolioData.js           # Central source of truth for all content
├── public/
│   ├── favicon.ico                # Multi-resolution C monogram favicon
│   ├── icon.png                   # 32x32 web icon
│   ├── apple-icon.png             # 180x180 Apple touch icon
│   ├── og-image.png               # 1200x630 Open Graph preview image
│   ├── robots.txt                 # Search engine crawling rules
│   ├── sitemap.xml                # Search engine index sitemap
│   ├── resume.pdf                 # Default CV document
│   └── resumes/                   # Stored resume variants
├── scripts/
│   └── generate-assets.js         # Favicon & Open Graph image asset builder
└── package.json
```

---

## 🛠️ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Locally in Development Mode
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Generate Favicons & Open Graph Image
```bash
npm run generate-assets
```

### 4. Build for Production
```bash
npm run build
npm start
```

---

## ✏️ Updating Content

All text, links, project details, and experience information are centralized in:
```
data/portfolioData.js
```
To update your profile, simply edit that single file—all sections, cards, and modals will reflect the updates automatically.

---

## 🔗 Professional Links & Branding

- **Website:** [https://chinmayakumarmishra.sbs](https://chinmayakumarmishra.sbs)
- **Brand / Username:** `chinmaya00111`
- **GitHub:** [https://github.com/chinmaya0011](https://github.com/chinmaya0011)
- **LinkedIn:** [https://www.linkedin.com/in/chinmaya00111/](https://www.linkedin.com/in/chinmaya00111/)
- **Email:** `imchinu17@gmail.com`
