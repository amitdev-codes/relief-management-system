<div align="center">

<br/>

<img width="140" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Flag_of_Nepal.svg/800px-Flag_of_Nepal.svg.png" alt="Nepal Flag"/>

<br/>

# 🏔️ Grant & Loan Management System
### *सहयोग | राहत | विकास — Support · Relief · Development*

<br/>

[![Laravel](https://img.shields.io/badge/Laravel-11.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![PHP](https://img.shields.io/badge/PHP-8.2+-777BB4?style=for-the-badge&logo=php&logoColor=white)](https://php.net)
[![MySQL](https://img.shields.io/badge/MySQL-8.0+-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://mysql.com)
[![Inertia](https://img.shields.io/badge/Inertia.js-Powered-9553E9?style=for-the-badge)](https://inertiajs.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)]()

<br/>

> A comprehensive, fully dynamic **Grant, Loan & Relief Management System** for Nepal — enabling citizens from all **7 Provinces** and **77 Districts** to apply for financial assistance, scholarships, disaster relief, and small business loans through their local **Municipality / Gaupalika**. Built with **Laravel 11 + React (Inertia.js)**.

<br/>

</div>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Screenshots](#-screenshots)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [System Workflow](#-system-workflow)
- [Installation](#-installation)
- [Project Structure](#-project-structure)
- [Roles & Permissions](#-roles--permissions)
- [Database Overview](#-database-overview)
- [API Routes](#-api-routes)
- [Deployment](#-deployment)
- [License](#-license)

---

## 🌏 Overview

The **Grant & Loan Management System** is a government-grade web application designed to digitize and streamline the entire process of distributing **grants, relief funds, scholarships, and loans** to deserving citizens across Nepal.

Citizens from any of Nepal's **7 Provinces → 77 Districts → Local Municipalities / Gaupalika** can register, submit applications, upload required documents, and track their aid status — all online. Local government officers review applications, verify eligibility, and approve or reject based on defined criteria.

### 🎯 Who It Serves

| Applicant Type | Aid Type |
|---|---|
| 🎓 Students | Scholarship, Education Grant |
| 🏚️ Poor & Needy Individuals | Monthly Relief, One-time Grant |
| 🌊 Disaster / Flood Affected | Emergency Relief Fund |
| 🏪 Small Business Owners | Business Loan, Startup Grant |

---

## 📸 Screenshots

> 💡 *Replace the placeholder paths below with your actual screenshots after adding them to `/screenshots` folder in your repo.*
> 
<img width="1824" height="965" alt="Screenshot from 2026-03-28 12-57-30" src="https://github.com/user-attachments/assets/bf3aabbf-317d-4e4a-ab9f-80d73af76bcb" />
<img width="1824" height="965" alt="Screenshot from 2026-03-28 12-<img width="1824" height="965" alt="Screenshot from 2026-03-28 12-57-44" src="https://github.com/user-attachments/assets/cd8b2d41-00a0-46c6-90cb-51bdf15c94e2" />
57-38" src="https://github.com/user-attachments/assets/69c78668-e5bf-4249-ba20-d15a3253372d" />
<img width="1824" height="965" alt="Screenshot from 2026-03-28 12-58-10" src="https://github.com/user-attachments/assets/368ed18d-814e-49ad-a2c2-34306b1cf3b7" />

<br/>

### 🏠 Homepage & Public Portal
```
screenshots/homepage.png
```
![Homepage](screenshots/<img width="1824" height="965" alt="Screenshot from 2026-03-28 12-57-30" src="https://github.com/user-attachments/assets/5c8c48fa-73c6-4ef9-87db-3bdcd52a0a7d" />
homepage.png)

---

### 📋 Citizen Application Form
```
screenshots/application-form.png
```
![Application Form](screenshots/application-form.png)

---

### 🗺️ Province → District → Municipality Selection
```
screenshots/location-selector.png
```
![Location Selector](screenshots/location-selector.png)

---

### 📊 Admin Dashboard
```
screenshots/admin-dashboard.png
```
![Admin Dashboard](screenshots/admin-dashboard.png)

---

### ✅ Application Review Panel
```
screenshots/review-panel.png
```
![Review Panel](screenshots/review-panel.png)

---

### 📁 Document Verification
```
screenshots/document-verification.png
```
![Document Verification](screenshots/document-verification.png)

---

> 📷 **To add screenshots:** Create a `/screenshots` folder in the root of your repo and add PNG/JPG images with the filenames above.

---

## ✨ Features

### 🌍 Geographic Coverage
- Covers all **7 Provinces** of Nepal
- All **77 Districts** with dynamic dropdown
- Local government levels — **Metropolitan, Sub-Metropolitan, Municipality, Gaupalika**
- Cascading location selector (Province → District → Local Level)

### 👤 Citizen Portal
- Citizen self-registration with NID / citizenship number verification
- Multi-step dynamic application form per aid category
- Document upload — citizenship, income certificate, land ownership, photos
- Real-time application status tracking
- Application history and disbursement records
- SMS / email notification on status changes

### 🎓 Student Scholarship & Education Grant
- Apply for school, college, or university scholarships
- Institution verification with school/college registration number
- Academic document uploads (marksheet, enrollment letter)
- Income threshold eligibility check
- Renewal application support for multi-year scholarships

### 🏚️ Poor & Needy Individual Relief
- Household poverty assessment form
- Family member details and income declaration
- Recurring monthly relief or one-time grant
- Priority scoring based on vulnerability index

### 🌊 Disaster & Flood Relief
- Emergency fast-track application flow
- Damage assessment form with photo evidence
- Ward-level bulk victim registration by local officers
- Immediate disbursement tracking

### 🏪 Small Business Loan
- Business plan submission
- Loan amount calculation based on business type and collateral
- Repayment schedule generation
- Guarantor information and documents

### 🏛️ Municipal / Local Level Admin
- Review and verify applications within jurisdiction
- Approve, reject, or request additional documents
- Set ward-wise quotas and budget limits
- Generate disbursement reports

### 📊 Province & District Admin
- Oversight dashboard for all municipalities under jurisdiction
- Budget allocation and fund tracking per local level
- Consolidated reporting across districts

### 🖥️ Super Admin (Central)
- Full system control across all provinces
- User and role management
- Aid category and eligibility criteria configuration
- System-wide analytics and reporting
- Audit logs for all actions

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Backend Framework | Laravel 11 |
| Frontend Framework | React 18 (via Inertia.js) |
| PHP Version | 8.2+ |
| Bridge | Inertia.js (Laravel ↔ React) |
| Database | MySQL 8.0+ |
| Styling | Tailwind CSS |
| Auth | Laravel Breeze (Inertia + React) |
| File Storage | Laravel Storage / AWS S3 |
| PDF Reports | Laravel DomPDF / Snappy |
| State Management | React useState / Context API |
| Form Handling | React Hook Form |
| HTTP Client | Axios |
| Notifications | Laravel Notifications (Email + SMS) |
| Queue | Laravel Queue (database / Redis) |

---

## 🔄 System Workflow

```
👤 Citizen Registers
        │
        ▼
📋 Selects Province → District → Municipality
        │
        ▼
📝 Fills Application Form (Category: Grant / Loan / Relief / Scholarship)
        │
        ▼
📎 Uploads Required Documents
        │
        ▼
✅ Application Submitted → Ref. Number Generated
        │
        ▼
🏛️ Ward Officer Reviews & Verifies Documents
        │
        ├──── ❌ Rejected (with reason) ────► 📩 Citizen Notified
        │
        ▼
🏢 Municipality / Gaupalika Officer Approves
        │
        ▼
📊 District Admin Oversight (for larger amounts)
        │
        ▼
💰 Fund Disbursed → Citizen Notified via SMS/Email
        │
        ▼
📁 Disbursement Record Saved → Reports Generated
```

---

## ⚙️ Requirements

- PHP >= 8.2
- Composer >= 2.x
- Node.js >= 18.x & NPM
- MySQL >= 8.0
- Apache or Nginx

**Required PHP Extensions:** BCMath, Ctype, Fileinfo, JSON, Mbstring, OpenSSL, PDO, Tokenizer, XML, GD

---

## 🚀 Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/grant-loan-management-system.git
cd grant-loan-management-system
```

### 2. Install PHP & JS dependencies
```bash
composer install
npm install
```

### 3. Environment setup
```bash
cp .env.example .env
php artisan key:generate
```

Configure your `.env`:
```env
APP_NAME="Grant & Loan Management System - Nepal"
APP_URL=http://localhost

DB_DATABASE=grant_loan_system
DB_USERNAME=root
DB_PASSWORD=

FILESYSTEM_DISK=local

MAIL_MAILER=smtp
MAIL_HOST=your-mail-host
MAIL_PORT=587

# SMS Gateway (Sparrow SMS / Prabhu SMS for Nepal)
SMS_GATEWAY_URL=https://api.sparrowsms.com/v2/sms/
SMS_TOKEN=your-sms-token
SMS_FROM=YourAppName
```

### 4. Run migrations & seeders
```bash
php artisan migrate --seed
```
> Seeders will populate all 7 Provinces, 77 Districts, and local municipalities automatically.

### 5. Build frontend assets
```bash
npm run dev
# Production:
npm run build
```

### 6. Storage link
```bash
php artisan storage:link
```

### 7. Run queue worker (for notifications)
```bash
php artisan queue:work
```

### 8. Serve the application
```bash
php artisan serve
```

🌐 Visit: `http://localhost:8000`
🔐 Admin: `http://localhost:8000/admin`

**Default Admin Credentials (after seeding):**
```
Email:    admin@glms.gov.np
Password: password
```

---

## 📁 Project Structure

```
grant-loan-management-system/
│
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Auth/
│   │   │   ├── Citizen/
│   │   │   │   ├── ApplicationController.php
│   │   │   │   ├── DocumentController.php
│   │   │   │   └── StatusController.php
│   │   │   ├── Admin/
│   │   │   │   ├── DashboardController.php
│   │   │   │   ├── ReviewController.php
│   │   │   │   ├── DisbursementController.php
│   │   │   │   └── ReportController.php
│   │   │   └── Location/
│   │   │       └── LocationController.php   # Province/District/Municipality API
│   │   └── Middleware/
│   │       └── CheckRole.php
│   │
│   ├── Models/
│   │   ├── User.php
│   │   ├── Application.php
│   │   ├── AidCategory.php
│   │   ├── Document.php
│   │   ├── Disbursement.php
│   │   ├── Province.php
│   │   ├── District.php
│   │   ├── Municipality.php
│   │   └── Ward.php
│   │
│   └── Services/
│       ├── EligibilityService.php       # Checks eligibility criteria
│       ├── DisbursementService.php      # Handles fund disbursement logic
│       └── NotificationService.php     # SMS + Email notifications
│
├── resources/
│   └── js/
│       ├── Pages/
│       │   ├── Home/
│       │   │   └── Index.jsx
│       │   ├── Citizen/
│       │   │   ├── Register.jsx
│       │   │   ├── Apply.jsx            # Multi-step application form
│       │   │   ├── Status.jsx
│       │   │   └── Dashboard.jsx
│       │   ├── Admin/
│       │   │   ├── Dashboard.jsx
│       │   │   ├── Applications/
│       │   │   │   ├── Index.jsx
│       │   │   │   └── Review.jsx
│       │   │   ├── Reports/
│       │   │   │   └── Index.jsx
│       │   │   └── Settings/
│       │   └── Auth/
│       │       ├── Login.jsx
│       │       └── Register.jsx
│       │
│       ├── Components/
│       │   ├── LocationSelector.jsx     # Province → District → Municipality
│       │   ├── ApplicationStepper.jsx  # Multi-step form
│       │   ├── DocumentUploader.jsx
│       │   ├── StatusBadge.jsx
│       │   └── DashboardStats.jsx
│       │
│       └── Layouts/
│           ├── AppLayout.jsx
│           └── AdminLayout.jsx
│
├── database/
│   ├── migrations/
│   └── seeders/
│       ├── ProvinceSeeder.php           # All 7 provinces
│       ├── DistrictSeeder.php           # All 77 districts
│       ├── MunicipalitySeeder.php       # All local levels
│       └── AidCategorySeeder.php
│
└── routes/
    ├── web.php
    └── api.php                          # Location cascading API
```

---

## 👥 Roles & Permissions

| Role | Access Level | Jurisdiction |
|---|---|---|
| **Super Admin** | Full system access | National |
| **Province Admin** | Province dashboard & reporting | 1 Province |
| **District Admin** | District oversight & fund tracking | 1 District |
| **Municipality Officer** | Application approval & disbursement | 1 Municipality |
| **Ward Officer** | Application review & document verification | 1 Ward |
| **Citizen** | Apply, upload docs, track status | Self only |

---

## 🗄️ Database Overview

```
provinces          — id, name, name_np (Nepali name)
districts          — id, province_id, name, name_np
municipalities     — id, district_id, name, type (metro/sub-metro/municipality/gaupalika)
wards              — id, municipality_id, ward_number

users              — id, name, citizenship_no, phone, email, role, municipality_id
applications       — id, user_id, category_id, amount_requested, status, submitted_at
aid_categories     — id, name, type (grant/loan/relief/scholarship), eligibility_criteria (JSON)
documents          — id, application_id, type, file_path, verified, verified_by
disbursements      — id, application_id, amount, method, disbursed_at, disbursed_by
reviews            — id, application_id, reviewed_by, action, remarks, reviewed_at
notifications      — id, user_id, channel (sms/email), message, sent_at
```

---

## 🔌 Key API Routes

```
GET  /api/districts/{province_id}          → Districts by Province
GET  /api/municipalities/{district_id}     → Municipalities by District
GET  /api/wards/{municipality_id}          → Wards by Municipality

POST /api/applications                     → Submit new application
GET  /api/applications/{ref_no}/status     → Track application by reference no.
POST /api/documents/upload                 → Upload supporting document

GET  /api/admin/applications               → List all applications (admin)
PUT  /api/admin/applications/{id}/review   → Approve / Reject application
POST /api/admin/disbursements              → Record disbursement
GET  /api/admin/reports/summary            → Summary report
```

---

## 🔐 Security

- CSRF protection on all forms
- Role & permission middleware on every admin route
- Citizenship number uniqueness enforced
- Document file type & size validation
- Input sanitization on all endpoints
- Rate limiting on application submission
- All sensitive config via environment variables
- Audit log for every approval/rejection action

---

## 🌐 Deployment

```bash
# Optimize for production
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

# Build React assets
npm run build

# Run queue worker as a service (supervisor recommended)
php artisan queue:work --daemon
```

Set in `.env`:
```env
APP_ENV=production
APP_DEBUG=false
```

> **Recommended:** Use [Laravel Forge](https://forge.laravel.com) or deploy on a VPS with Ubuntu 22.04 + Nginx + PHP 8.2 + MySQL 8.

---

## 📊 Reports & Exports

- Application summary by Province / District / Municipality
- Category-wise disbursement reports (Grant, Loan, Relief, Scholarship)
- Monthly and yearly financial reports
- Export to **PDF** and **Excel**
- Printable disbursement receipts for citizens

---

## 🤝 Contributing

1. Fork the repository
2. Create your branch — `git checkout -b feature/your-feature`
3. Commit your changes — `git commit -m 'Add: your feature description'`
4. Push to branch — `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

<br/>

**🇳🇵 Built for the People of Nepal**

*Digitizing relief, empowering communities — from Province 1 to Sudurpashchim.*

<br/>

[![Laravel](https://img.shields.io/badge/Laravel-11-FF2D20?style=flat-square&logo=laravel)](https://laravel.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Made in Nepal](https://img.shields.io/badge/Made%20in-Nepal%20🇳🇵-blue?style=flat-square)]()

</div>
