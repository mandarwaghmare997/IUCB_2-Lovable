# IUCB Documentation Portal — doc.iucb.org

The official documentation portal for IUCB governance documents, policies, procedures, and guidance materials.

## Features

- Browse and search official IUCB documents
- Filter by category (Policy, Procedure, Manual, Guidance)
- View documents online or download PDFs
- Responsive design with dark/light theme

## Setup

```sh
cd docs
npm install
npm run dev
```

## Build & Deploy

```sh
npm run build
```

Upload the contents of `dist/` to the `doc.iucb.org` subdomain folder on Hostinger.

## Document Management

Place PDF and document files in the `public/files/` directory:

```
docs/
├── public/
│   └── files/
│       ├── policies/
│       │   └── impartiality-policy-v2.pdf
│       ├── procedures/
│       │   └── accreditation-procedure-v3.pdf
│       └── manuals/
│           └── quality-manual-v1.pdf
├── src/
│   └── ...
└── index.html
```

Reference documents in your page data using relative paths like `/files/policies/impartiality-policy-v2.pdf`.
