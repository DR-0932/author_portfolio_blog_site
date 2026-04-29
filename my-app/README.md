✍️ Author Portfolio
A full-stack author portfolio website featuring animated UI, a public blog, a fiction section, and a secure admin panel for content management.

//----Tech Stack------//,
Frontend;
Next.js 14 (App Router),  
TypeScript ,              
GSAP   ,                  
Tailwind   ,              

Backend:
Node.js ,       
Express.js,      
TypeScript ,     
MongoDB ,        


✨ Features

📝 Blog Section — Publicly readable blog posts with rich content, headers, and metadata
📖 Fiction Section — Dedicated section for fiction writing with individual post pages
🔐 Admin Panel — Protected dashboard to create, edit, and delete blogs and fiction posts
🖼️ Image Uploads — Upload cover images and media for posts
💬 Comments — Comment section on blog posts
🎨 GSAP Animations — Smooth page transitions, hero animations, and scroll effects
🌙 Dark Mode — Toggle between light and dark themes
📱 Responsive Design — Mobile-friendly with hamburger navigation
🎠 Marquee & Testimonials — Animated marquee and testimonial sections on homepage
🗂️ Work Samples — Showcase of work/portfolio pieces


Client Request
      ↓
  server.ts  →  mounts all routes
      ↓
  routes/
  ├── public/*     →  no auth  →  controllers  →  db  →  JSON response
  └── admin/*      →  admin.middleware.ts (verify token)
                              ↓
                         controllers  →  db  →  JSON response


