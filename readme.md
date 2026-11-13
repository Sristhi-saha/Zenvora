<div align="center">

# 🛒 E-Commerce App

**A 100% free, full-stack MERN platform built for Computer Science & Engineering students to discover topper-curated notes, practice with exam cheat sheets, and chat directly with PDFs using Google Gemini AI.**

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-Rolldown-646CFF?logo=vite&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.x-764ABC?logo=redux&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-1.5_Flash-8E75C2?logo=google&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow)

[Overview](#-overview) • [User & Data Flow](#-end-to-end-system-flow) • [Features](#-core-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [API](#-api-reference) • [Roadmap](#-roadmap)

</div>

---

## 📖 Table of Contents

- [📌 Overview](#-overview)
- [🔄 End-to-End System Flow](#-end-to-end-system-flow)
- [✨ Core Features](#-core-features)
- [🤖 AI Integration](#-ai-features-powered-by-gemini)
- [🧰 Tech Stack](#-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [🔑 Environment Variables](#-environment-variables)
- [📡 API Reference](#-api-reference)
- [🗺️ Roadmap](#-roadmap)
- [👤 Author](#-author)

---

## 📌 Overview

**Zenvora** is an open-access academic platform engineered specifically for Computer Science & Engineering students. Instead of hoarding study material or locking knowledge behind paywalls, Zenvora democratizes semester exam prep, GATE preparation, and coding interview readiness.

Students can browse topper-curated notes across core CS pillars (DSA, OS, DBMS, Networks, System Design), save materials to their personal study queue, read PDFs in-browser, and **chat directly with their notes using Google Gemini AI** for instant concept explanations and auto-generated quizzes.

---

## 🔄 End-to-End System Flow

Here is the complete architectural and user journey through Zenvora:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           1. DISCOVERY & LANDING                            │
│  • Student visits /shop/home (Zenvora aesthetic neo-brutalist hero)         │
│  • Selects a CS pillar (DSA, OS, DBMS, Networks, System Design, AI/ML)       │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          2. CATALOG & FREE PREVIEW                          │
│  • /shop/listing loads filtered notes from MongoDB via Redux               │
│  • Student views note cards (ratings, tags, contributor, preview)           │
│  • Clicks "Save to Study Queue" (dispatches addToCart Redux thunk)          │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         3. STUDY QUEUE (CART DRAWER)                        │
│  • Real-time sliding Sheet drawer from Navbar                               │
│  • Displays queued notes, removes duplicates, calculates zero-cost summary  │
│  • Student clicks "Add to My Saved Library"                                 │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                   4. MY DIGITAL LIBRARY & IN-BROWSER READER                 │
│  • Student opens /shop/account (Personal Study Vault)                       │
│  • Selects any saved PDF note for full-screen clean reading                 │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                      5. GOOGLE GEMINI 1.5 FLASH AI SUITE                    │
│  • "Ask AI": Student asks questions directly to the PDF in real-time        │
│  • "Practice Quiz": Gemini analyzes the note and generates 5 MCQs           │
│  • "Auto-Summary": 3-bullet concept breakdown for fast revision             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## ✨ Core Features

### 🎓 For Students (100% Free & Open)
- **Aesthetic Retro Interface**: Warm `#FAF8F5` paper canvas with `Redaction 35` typography, custom selection indicators, and tactile drop-shadow cards.
- **6 Core CS Subject Channels**:
  - 🧠 **DSA & LeetCode**: Trees, Graphs, DP patterns, Big-O cheat sheets.
  - 💻 **Operating Systems**: Processes, Concurrency, Virtual Memory, Linux internals.
  - 🗄️ **DBMS & SQL**: Relational algebra, Normalization, Transactions, NoSQL.
  - 🌐 **Computer Networks**: OSI stack, TCP/IP, Sockets, HTTP/HTTPS, Routing.
  - 🏗️ **System Design & Web Dev**: Scalability, Microservices, Caching, REST.
  - 🤖 **AI & Machine Learning**: Math for ML, Neural Nets, Python foundations.
- **Study Queue & Bookmarks**: Save notes in one click and access them anytime.
- **In-Browser Reader**: Read PDFs without downloading bloated third-party tools.

### ✍️ For Contributors & Community
- **Crowdsourced Uploads**: Students can upload their handwritten or typed notes.
- **Cloudinary Storage**: Secure, high-speed PDF and thumbnail delivery.
- **Admin Control Center**: Review uploads, verify syllabus accuracy, and manage tags.

---

## 🤖 AI Features (Powered by Gemini)

| Feature | How It Works |
| :--- | :--- |
| 💬 **"Chat with Note"** | Sends the PDF text + user doubt to `/api/ai/chat`. Gemini 1.5 Flash explains formulas, code blocks, or algorithms step-by-step. |
| ⚡ **Instant Quiz Generator** | One click generates 5 gate/exam-style multiple choice questions with answers and hints. |
| 📝 **Smart Summarizer** | Extracts the top 3 high-yield takeaways from any chapter for 5-minute pre-exam revision. |

---

## 🧰 Tech Stack

### Frontend Architecture
- **React 19** with **Vite (Rolldown)** for instant HMR
- **Redux Toolkit & React Redux** for predictable global state (auth, notes, queue)
- **React Router DOM v7** with declarative nested route layouts (`<Outlet />`)
- **Tailwind CSS v4** & **shadcn/ui** (Sheet, Dialog, Select, Dropdown, Sonner toasts)
- **Lucide React** for modern developer icons
- **Google Fonts**: `Redaction 35` (headlines) & `Nunito Sans` (body)

### Backend Architecture
- **Node.js & Express 5** REST API
- **MongoDB Atlas & Mongoose 9** with subdocument schemas & `.populate()` joins
- **Google Gemini 1.5 Flash API** for document reasoning (free tier)
- **Cloudinary SDK** for media & PDF storage
- **JWT & Cookie-Parser** for secure HTTP-only session management

---

## 📁 Project Structure

```
Zenvora/
├── CLIENT/                      # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── shopping-view/   # Header, Study Queue Drawer, Note Tile, Filter
│   │   │   ├── auth/            # AuthLayout with unified theme
│   │   │   ├── common/          # CommonForm, Route guards (CheckAuth)
│   │   │   └── ui/              # shadcn/ui components (Sheet, Button, Input)
│   │   ├── pages/
│   │   │   ├── shopping-view/   # Home, Note Listing, Library, Checkout
│   │   │   ├── admin-view/      # Note Upload portal, Catalog management
│   │   │   └── auth/            # Login, Register
│   │   ├── store/               # Redux slices (auth, notes, cart/queue, address)
│   │   ├── config/              # CS categories, form controls, navbar links
│   │   └── App.jsx              # Main routing architecture
│   └── package.json
│
└── server/                      # Express backend
    ├── controllers/             # Business logic (cart, notes, auth, ai)
    ├── models/                  # Mongoose models (Cart, Product/Note, User)
    ├── routes/                  # Express routers (/api/shop/carts, /api/auth, etc)
    ├── helpers/                 # Cloudinary & Gemini AI service helpers
    ├── db/                      # MongoDB connection handler
    └── server.js                # Server entry point
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) 18+ installed
- [MongoDB Atlas](https://www.mongodb.com/atlas) cluster URL
- [Cloudinary](https://cloudinary.com/) account (for PDF uploads)
- [Google AI Studio](https://aistudio.google.com/) Gemini API Key (Free)

### 1. Clone the repository
```bash
git clone https://github.com/Sristhi-saha/E_Commerce_App.git
cd E_Commerce_App
```

### 2. Configure Backend (`server/.env`)
```bash
cd server
npm install
```

Create `server/.env`:
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_session_key
CLIENT_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
GEMINI_API_KEY=your_gemini_api_key
```

Start the backend:
```bash
npm run dev
```

### 3. Configure Frontend (`CLIENT`)
```bash
cd ../CLIENT
npm install
npm run dev
```
Open **`http://localhost:5173`** in your browser.

---

## 📡 API Reference

### Study Notes (Catalog)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/shop/products` | Fetch all notes with category & price filters |
| `GET` | `/api/shop/products/:id` | Fetch specific note details and preview pages |

### Study Queue (Saved Notes)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/shop/carts/get/:userId` | Retrieve user's study queue |
| `POST` | `/api/shop/carts/add` | Save a note to study queue |
| `PUT` | `/api/shop/carts/updateCart` | Update quantity or status |
| `DELETE`| `/api/shop/carts/:userId/:productId` | Remove a note from queue |

### AI Study Suite
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/ai/chat` | Send a query to Gemini with note context |
| `POST` | `/api/ai/generate-quiz` | Auto-generate 5 practice MCQs from a note |
| `POST` | `/api/ai/summarize` | Generate high-yield bullet takeaways |

---

## 🗺️ Roadmap

- [x] Full-Stack JWT Authentication & Protected Routes
- [x] Redux Toolkit Study Queue Drawer with Live Sync
- [x] MongoDB Schemas with Populated Mongoose Relationships
- [x] Zenvora Neo-Brutalist Academic Landing Page (`#FAF8F5`)
- [x] Core CS Subject Routing (DSA, OS, DBMS, Networks)
- [ ] In-Browser PDF Reader with Dark Mode & Zoom
- [ ] Google Gemini 1.5 Flash "Chat with Note" Sidebar
- [ ] AI Multiple-Choice Practice Quiz Modal
- [ ] Community Upload Portal with Cloudinary PDF Parser

---

## 👤 Author

**Sristhi Saha**
- GitHub: [@sristhi-saha](https://github.com/Sristhi-saha)
- LinkedIn: [sristhi-saha](https://linkedin.com/in/sristhi-saha)

---

<div align="center">

⭐ If you find **Zenvora** helpful for your studies, give it a star on GitHub!

</div>
