# IUCB – International Unified Certification Board

## About IUCB

The **International Unified Certification Board (IUCB)** is a global accreditation and certification body that provides internationally recognized accreditation for certification bodies, auditors, and training providers across ISO, Cybersecurity, and Privacy domains.

IUCB serves **500+ accredited organizations** across **80+ countries**, covering **50+ standards** with **2,000+ certified auditors**.

### Core Services

- **Accreditation** — Recognition for certification bodies, auditors & training providers to issue certifications with international weight.
- **Certification Programs** — Professional certification programs for individuals across management systems, cybersecurity, and privacy.
- **Training & Examination** — Accredited training courses and globally recognized examinations.

## Repository Structure

This monorepo contains three deployable sites:

```
├── /                    → Main website (iucb.org)
├── /docs/               → Documentation portal (doc.iucb.org)
└── /verify/             → Certificate verification portal (verify.iucb.org)
```

### Main Website (`iucb.org`)

The primary IUCB web application — a trust platform featuring:
- Homepage with value proposition and social proof
- Accreditation, Certifications, and Training pages
- Contact form with email queue integration
- Admin dashboard for managing certificates, organizations, and users
- Multi-language support (EN, AR, FR, ES)
- Dark/Light theme

### Documentation Portal (`doc.iucb.org`)

A separate static site for hosting IUCB's governance documents, policies, procedures, manuals, and guidance materials. See [`docs/README.md`](docs/README.md) for setup instructions.

### Verification Portal (`verify.iucb.org`)

A standalone certificate verification tool where users can look up certificate validity using a certificate number. Uses an Excel sheet as the data source. See [`verify/README.md`](verify/README.md) for setup instructions.

---

## Tech Stack (Main Site)

- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** + **shadcn/ui**
- **Lovable Cloud** (backend: database, auth, edge functions, storage)
- **i18next** for internationalization
- **React Router** for client-side routing

## Local Development

```sh
# Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

## Building for Production

```sh
# Build main site
npm run build
# Output: dist/

# Build docs site
cd docs && npm install && npm run build
# Output: docs/dist/

# Build verify site
cd verify && npm install && npm run build
# Output: verify/dist/
```

## Deployment (Hostinger)

1. **Main site** → Upload `dist/` contents to `public_html/`
2. **doc.iucb.org** → Upload `docs/dist/` contents to the subdomain's `public_html/`
3. **verify.iucb.org** → Upload `verify/dist/` contents to the subdomain's `public_html/`

Ensure subdomains are configured in Hostinger's DNS settings pointing to the correct folders.

## Publishing via Lovable

Open [Lovable](https://lovable.dev) → Share → Publish. Connect a custom domain under Project → Settings → Domains.
