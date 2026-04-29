# ✍️ Author Portfolio

A full-stack author portfolio website featuring animated UI, a public blog, a fiction section, and a secure admin panel for content management.

---

## 🚀 Tech Stack

**Frontend**

| Technology | Purpose |
| :--- | :--- |
| Next.js 14 (App Router) | Framework & routing |
| TypeScript | Type safety |
| GSAP | Animations & page transitions |
| Tailwind CSS | Styling |

**Backend**

| Technology | Purpose |
| :--- | :--- |
| Node.js | Runtime |
| Express.js | REST API server |
| TypeScript | Type safety |
| MongoDB | Database |

---

## ✨ Features

- 📝 **Blog Section** — Publicly readable blog posts with rich content, headers, and metadata
- 📖 **Fiction Section** — Dedicated section for fiction writing with individual post pages
- 🔐 **Admin Panel** — Protected dashboard to create, edit, and delete blogs and fiction posts
- 🖼️ **Image Uploads** — Upload cover images and media for posts
- 💬 **Comments** — Comment section on blog posts
- 🎨 **GSAP Animations** — Smooth page transitions, hero animations, and scroll effects
- 🌙 **Dark Mode** — Toggle between light and dark themes
- 📱 **Responsive Design** — Mobile-friendly with hamburger navigation
- 🎠 **Marquee & Testimonials** — Animated marquee and testimonial sections on homepage
- 🗂️ **Work Samples** — Showcase of work and portfolio pieces

---

## 📁 Project Structure

```
/
├── my-app/                         # Next.js Frontend
│   ├── app/
│   │   ├── about/                  # About page
│   │   ├── admin/
│   │   │   ├── dashboard/          # Admin dashboard
│   │   │   └── login/              # Admin login
│   │   ├── api/contact/            # Contact form API route
│   │   ├── blogs/[slug]/           # Dynamic blog post pages
│   │   ├── contact/                # Contact page
│   │   ├── data/                   # Static data (workSamples.ts)
│   │   ├── fiction/[slug]/         # Dynamic fiction post pages
│   │   ├── lib/                    # Utility functions
│   │   ├── ui-kit/                 # Component showcase
│   │   ├── globals.css
│   │   ├── layout.tsx              # Root layout
│   │   └── page.tsx                # Homepage
│   │
│   └── components/
│       ├── about/                  # AboutHero, Description, WorkExperience
│       ├── admin/                  # BlogFormModal, FictionFormModal, Editor, etc.
│       ├── blog/                   # BlogCard, BlogContent, BlogHero, CommentSection, etc.
│       ├── contact/                # ContactPage
│       ├── fiction/                # FictionListClient, FictionPostClient
│       ├── home/
│       │   ├── HeroSection/        # Hero, SocialMediaLinks, Title
│       │   └── ...                 # Marquee, Services, Testimonial, WorkSample, etc.
│       ├── layout/                 # ClientRoot, Footer, LoadingScreen, NavbarWrapper, PageTransition
│       ├── navbar/                 # Navbar, NavLink, NavLogo, HamburgerMenu, DarkModeToggle
│       └── ui/                     # Button, CategoryFilter, fields, FloatingBook, etc.
│
└── backend/                        # Express Backend
    └── src/
        ├── controllers/
        │   ├── about.controllers.ts
        │   ├── blog.controllers.ts
        │   ├── contact.controllers.ts
        │   └── fiction.controllers.ts
        ├── middleware/
        │   └── admin.middleware.ts  # Auth protection
        ├── routes/
        │   ├── admin/              # Protected routes (auth required)
        │   │   ├── about.routes.ts
        │   │   ├── auth.routes.ts
        │   │   ├── blog.routes.ts
        │   │   ├── fiction.routes.ts
        │   │   ├── upload.routes.ts
        │   │   └── workSample.routes.ts
        │   └── public/             # Public routes (no auth)
        │       ├── about.routes.ts
        │       ├── blog.routes.ts
        │       ├── contact.routes.ts
        │       ├── fiction.routes.ts
        │       └── workSample.routes.ts
        ├── db.ts                   # Database connection
        └── server.ts               # Express app entry point
```

---

## 🔄 Data Flow

```
Client Request
      ↓
  server.ts  →  mounts all routes
      ↓
  routes/
  ├── public/*  →  no auth needed  →  controllers  →  db  →  JSON response
  └── admin/*   →  admin.middleware.ts (verify token)
                            ↓
                       controllers  →  db  →  JSON response
```

---

## 🔐 Admin Panel

Navigate to `/admin/login` to access the admin panel.

From the dashboard you can:

- ✏️ Create, edit, and delete **blog posts**
- 📖 Create, edit, and delete **fiction posts**
- 🖼️ Upload images for posts
- 🗂️ Manage **work samples** and **about** content

---

## 📡 API Endpoints

**Public Routes**

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | `/api/blogs` | Get all blog posts |
| GET | `/api/blogs/:slug` | Get single blog post |
| GET | `/api/fiction` | Get all fiction posts |
| GET | `/api/fiction/:slug` | Get single fiction post |
| GET | `/api/about` | Get about content |
| GET | `/api/work-samples` | Get work samples |
| POST | `/api/contact` | Submit contact form |

**Admin Routes** *(require auth token)*

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/admin/auth/login` | Admin login |
| POST | `/admin/blogs` | Create blog post |
| PUT | `/admin/blogs/:id` | Update blog post |
| DELETE | `/admin/blogs/:id` | Delete blog post |
| POST | `/admin/fiction` | Create fiction post |
| PUT | `/admin/fiction/:id` | Update fiction post |
| DELETE | `/admin/fiction/:id` | Delete fiction post |
| POST | `/admin/upload` | Upload image |

---

## 🎬 Animations (GSAP)

- **Page Transitions** — Smooth route change animations via `PageTransition.tsx`
- **Loading Screen** — Animated intro on first load via `LoadingScreen.tsx`
- **Hero Section** — Staggered text and element entrance animations
- **Scroll Triggers** — Elements animate as they enter the viewport
- **Marquee** — Continuously scrolling text and content strip

