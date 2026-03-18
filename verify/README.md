# IUCB Certificate Verification Portal — verify.iucb.org

A standalone verification tool where users can check the validity of IUCB-issued certificates by entering a certificate number.

## Features

- Certificate number lookup
- Displays accreditation status (Valid / Not Valid)
- Excel-based data source for easy management
- Contact support link for invalid results
- Responsive design

## Setup

```sh
cd verify
npm install
npm run dev
```

## Build & Deploy

```sh
npm run build
```

Upload the contents of `dist/` to the `verify.iucb.org` subdomain folder on Hostinger.

## Certificate Data Management

Place your Excel file at `public/data/certificates.xlsx`:

```
verify/
├── public/
│   └── data/
│       └── certificates.xlsx
├── src/
│   └── ...
└── index.html
```

### Excel Sheet Format

The Excel file should have the following columns:

| Certificate Number | Organization Name | Standard | Issue Date | Expiry Date | Status |
|---|---|---|---|---|---|
| IUCB-2024-001 | Acme Corp | ISO 27001 | 2024-01-15 | 2027-01-15 | Valid |
| IUCB-2024-002 | Beta Inc | ISO 9001 | 2024-03-20 | 2027-03-20 | Valid |

To update certificate data, simply replace the `certificates.xlsx` file on the server — no rebuild required.
