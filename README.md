# Author Portfolio

A modern personal portfolio website showcasing professional experience, testimonials, and work samples. The project focuses on clean UI design, structured content presentation, and reusable React components.

## Overview

This portfolio highlights professional work experience, client testimonials, and projects in a visually structured layout. The design emphasizes readability, minimalism, and component-driven architecture.

Key ideas behind the project:

* Modular UI components
* Clean and readable layouts
* Consistent color palette
* Reusable data-driven sections
* Modern frontend practices using React and Next.js

## Tech Stack

* **Next.js**
* **React**
* **TypeScript**
* **Tailwind CSS**

## Project Structure

```
my-app
│
├── app
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
│
├── component
│   ├── home
│   │   ├── Hero.tsx
│   │   ├── Testimonials.tsx
│   │   └── WorkExperience.tsx
│   │
│   └── ui
│       ├── expCard.tsx
│       ├── expCardInverted.tsx
│       └── testimonialCard.tsx
│
├── public
│   ├── icons
│   └── images
│
└── package.json
```

## Features

* Reusable card components
* Alternating experience layout
* Data-driven rendering with arrays
* Responsive layout using Tailwind CSS
* Component-based architecture
* Clean typography and spacing

## Sections

### Work Experience

Displays professional roles with an alternating layout where:

* Text and graphics swap sides
* Each experience entry includes company, role, description, and date

### Testimonials

Client and collaborator testimonials displayed in a card layout.

### Hero Section

Introduces the portfolio owner and establishes the visual theme.

## Component Design

The UI is built using reusable components such as:

* **ExpCard** – experience card layout
* **ExpCardInverted** – reversed layout version
* **TestimonialCard** – testimonial display component

Data is stored in arrays and rendered dynamically using `.map()`.

## Running the Project

Install dependencies:

```
npm install
```

Run the development server:

```
npm run dev
```

Open the project:

```
http://localhost:3000
```

## Deployment

The project can be deployed using platforms such as:

* Vercel
* Netlify
* Cloud hosting with Node.js support

## Design Goals

* Minimal and calm visual aesthetic
* Clear content hierarchy
* Reusable UI patterns
* Maintainable component structure

## Future Improvements

* Interactive animations
* Improved graphics inside experience cards
* Project showcase section
* Dark mode support
* Performance optimizations

## License

This project is open for learning and portfolio demonstration purposes.
