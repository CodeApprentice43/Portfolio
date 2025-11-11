# Nafis Mortuza Portfolio

A modern, dark-themed portfolio website built with Next.js, featuring projects, skills, book reviews, and a technical blog.

## Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** TailwindCSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Language:** JavaScript (JSX)

## Project Structure

```
portfolio-nextjs/
├── app/
│   ├── layout.jsx           # Root layout with Navbar and Footer
│   ├── page.jsx             # Landing page (About, Education, Interests)
│   ├── projects/page.jsx    # Projects showcase
│   ├── skills/page.jsx      # Skills and technologies
│   ├── reviews/page.jsx     # Book reviews
│   ├── blog/page.jsx        # Technical blog posts
│   ├── admin/page.jsx       # Admin dashboard (placeholder)
│   ├── api/                 # API routes (for future backend)
│   └── globals.css          # Global styles
├── components/
│   ├── Navbar.jsx           # Navigation component
│   ├── Footer.jsx           # Footer component
│   └── ui/
│       └── Button.jsx       # Reusable button component
├── lib/
│   └── utils.js             # Utility functions (cn)
└── public/                  # Static assets

```

## Getting Started

The development server is already running at:
- Local: http://localhost:3000
- Network: http://192.168.1.162:3000

### Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Design System

### Colors
- Background: `#0D1117`
- Accent: `#1F6FEB`
- Text: `#E6EDF3`
- Secondary Background: `#161B22`

### Fonts
- Sans: Inter
- Mono: JetBrains Mono (via font-mono class)

## Features Implemented

- Landing page with hero section and about cards
- Projects page with dynamic project cards
- Skills page with categorized skills and progress bars
- Book reviews page with cover images and ratings
- Blog page with post cards and metadata
- Responsive navigation with mobile menu
- Dark theme with consistent styling
- Smooth animations using Framer Motion

## Next Steps

Based on your PRD, here are the next steps to complete the portfolio:

1. **Backend Integration**
   - Set up Prisma ORM
   - Connect to Supabase PostgreSQL
   - Create database schema
   - Implement API routes for CRUD operations

2. **Authentication**
   - Set up Supabase Auth
   - Implement protected routes
   - Add login functionality
   - Secure admin dashboard

3. **Dynamic Data**
   - Replace static data with database queries
   - Implement create/edit/delete for projects
   - Implement create/edit/delete for blog posts
   - Implement create/edit/delete for book reviews

4. **Additional Features**
   - Markdown rendering for blog posts
   - Image upload for book covers and project images
   - Individual blog post pages (/blog/[id])
   - Individual review pages (/reviews/[id])

5. **Deployment**
   - Deploy to Vercel
   - Configure environment variables
   - Set up production database

## Customization

### Update Content

Edit the data arrays in each page file:
- `app/page.jsx` - Landing page content
- `app/projects/page.jsx` - Projects data
- `app/skills/page.jsx` - Skills and proficiency levels
- `app/reviews/page.jsx` - Book reviews
- `app/blog/page.jsx` - Blog posts

### Update Personal Info

- Update name and links in `components/Navbar.jsx`
- Update social links in `components/Footer.jsx`
- Update metadata in `app/layout.jsx`

## Notes

- All components use JSX (not TypeScript) as requested
- UI components adapted from Figma designs in the parent directory
- Dark theme matches PRD specifications
- Responsive design works on mobile and desktop
# Portfolio
