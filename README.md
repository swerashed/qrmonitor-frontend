# 📊 QR Monitor — Smart QR Code Analytics

**QR Monitor** is a powerful and lightweight analytics platform that lets you generate QR codes and track how, where, and when they're scanned — with deep insights into device types, locations, and unique scan patterns.

----------

### 🚀 Features

- ✅ **QR Code Generation** (custom URLs, campaigns, etc.)
- ✅ **Real-time Analytics Dashboard**
- ✅ **Scan Tracking**
    - Unique vs. repeat scans
    - Location & device info
    - Timestamped events
- ✅ **Dynamic URL Redirects**
- ✅ **RESTful API** with secure endpoints
- ✅ **PWA Support** with push notifications
- ✅ **PostgreSQL + Prisma** for database management
- ✅ **Built with Next.js (Frontend) + Express (Backend)**

----------

### 🧱 Tech Stack

- **Frontend:** Next.js (App Router), Tailwind CSS, TypeScript
- **Backend:** Express.js + TypeScript
- **Database:** PostgreSQL via Prisma ORM
- **Tracking:** Fingerprinting, GeoIP, and device detection

----------

### 🛠️ Getting Started

#### Prerequisites
- Node.js (v18 or higher)
- npm or bun

#### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd qrcodeproject/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   bun install
   ```
3. Set up environment variables:
   Copy `.env.example` to `.env.local` and fill in the required values.

#### Running Locally
```bash
npm run dev
# or
bun dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

----------

### 📦 Use Cases
- 📌 Marketing campaign tracking
- 📌 Dynamic link management
- 📌 Physical-to-digital bridge for businesses

----------

### 📁 Versioning
Current Version: **1.0.0**

----------

### 📝 Changelog

#### [1.0.0] - 2026-01-16
- **Initial Release:** Official 1.0.0 release.
- **Improved:** High-quality SVG support for QR code downloads.
- **Fixed:** Build errors and application-wide security improvements.
- **Added:** Automatic redirection logic for empty QR lists.
- **Merged:** Integrated development branch changes into main.
- **Added:** Robust URL validation and UI improvements for QR creation.
- **Added:** New navigation menu and resolved active menu state issues.
- **Added:** QR code deletion functionality.
- **Added:** Comprehensive schema validation for API requests.
- **Enhanced:** Improved scan tracking logic and mobile device detection.
- **Added:** Development environment configuration.
- **Added:** Contact endpoint and specialized email templates.
- **Added:** Email support using SendGrid integration.
- **Added:** Payment request routing.
- **Misc:** Created `.env.example` files and updated project documentation.
