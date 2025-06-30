# Gatsby to Astro Migration PRD

## Executive Summary
This document outlines the migration plan for transitioning the Riley Miller personal website from Gatsby to Astro.build, with a focus on implementing a modern dark mode theme featuring a liquid glass aesthetic.

## Current State Analysis

### Technology Stack
- **Framework**: Gatsby 2.21
- **UI Library**: React 16.12
- **Styling**: Emotion CSS-in-JS
- **Content**: MDX for blog posts
- **Typography**: Typography.js
- **Data Layer**: GraphQL
- **Languages**: TypeScript

### Site Structure
```
riley-miller-personal-site/
├── content/
│   └── blog/          # Blog posts in MDX format
├── src/
│   ├── components/    # React components
│   ├── pages/         # Page components
│   ├── templates/     # Page templates
│   ├── styles/        # Global styles
│   └── utils/         # Utilities (colors, typography)
└── static/            # Static assets
```

### Key Dependencies
- Gatsby plugins for MDX, images, and SEO
- Emotion for CSS-in-JS styling
- Typography.js for consistent text styling
- Prism.js for code syntax highlighting

## Migration Strategy

### Phase 1: Project Setup & Core Migration

#### 1.1 Initialize Astro Project
```bash
npm create astro@latest riley-miller-site -- --template blog
```
- Select TypeScript support
- Install React integration for gradual migration

#### 1.2 Install Essential Dependencies
```bash
npx astro add react mdx tailwind
npm install @astrojs/prism @astrojs/sitemap @astrojs/rss
```

#### 1.3 Directory Structure Migration
- Move `/content/blog/` → `/src/content/blog/`
- Move `/src/images/` → `/public/images/`
- Move `/static/` → `/public/`
- Create `astro.config.mjs` based on `gatsby-config.js`

### Phase 2: Component Migration

#### 2.1 Layout Components
Convert React components to Astro components:
- `layout.tsx` → `Layout.astro`
- `seo.tsx` → Built-in Astro SEO in `<head>`
- `bio.tsx` → `Bio.astro` or keep as React component

#### 2.2 Blog Post Template
Create `/src/pages/blog/[...slug].astro`:
```astro
---
import { getCollection } from 'astro:content';
import Layout from '../../layouts/Layout.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post }
  }));
}

const { post } = Astro.props;
const { Content } = await post.render();
---

<Layout title={post.data.title}>
  <article class="glass-panel">
    <h1>{post.data.title}</h1>
    <time>{post.data.date}</time>
    <Content />
  </article>
</Layout>
```

#### 2.3 Homepage Migration
Convert `index.tsx` to `index.astro` with blog post listing

### Phase 3: Dark Mode Theme Implementation

#### 3.1 Design System
Create a liquid glass dark theme with these specifications:

```css
/* /src/styles/global.css */
:root {
  /* Dark mode colors */
  --bg-primary: #0a0a0a;
  --bg-secondary: #141414;
  --bg-tertiary: #1a1a1a;
  
  /* Glass effect backgrounds */
  --bg-glass: rgba(20, 20, 20, 0.7);
  --bg-glass-hover: rgba(30, 30, 30, 0.8);
  
  /* Text colors */
  --text-primary: #e4e4e7;
  --text-secondary: #a1a1aa;
  --text-muted: #71717a;
  
  /* Accent colors */
  --accent-primary: #3b82f6;
  --accent-secondary: #60a5fa;
  --accent-glow: 0 0 20px rgba(59, 130, 246, 0.5);
  
  /* Borders and effects */
  --border-glass: rgba(255, 255, 255, 0.1);
  --shadow-glass: 0 8px 32px rgba(0, 0, 0, 0.4);
  --blur-glass: blur(10px);
}

/* Liquid glass components */
.glass-panel {
  background: var(--bg-glass);
  backdrop-filter: var(--blur-glass);
  -webkit-backdrop-filter: var(--blur-glass);
  border: 1px solid var(--border-glass);
  border-radius: 12px;
  box-shadow: var(--shadow-glass);
  transition: all 0.3s ease;
}

.glass-panel:hover {
  background: var(--bg-glass-hover);
  box-shadow: var(--accent-glow), var(--shadow-glass);
}

/* Code blocks with glass effect */
pre {
  background: var(--bg-glass) !important;
  backdrop-filter: var(--blur-glass);
  border: 1px solid var(--border-glass);
  border-radius: 8px;
  padding: 1.5rem;
}

/* Smooth animations */
* {
  transition: background-color 0.2s ease, border-color 0.2s ease;
}
```

#### 3.2 Component Styling
Apply glass effects to key components:
- Navigation bar with glass background
- Blog post cards with hover effects
- Code blocks with syntax highlighting
- Form inputs with glass borders

### Phase 4: Data Migration

#### 4.1 Replace GraphQL Queries
Convert from GraphQL to Astro's content collections:

```typescript
// Old Gatsby approach
export const pageQuery = graphql`
  query {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          frontmatter {
            title
            date
          }
        }
      }
    }
  }
`;

// New Astro approach
const posts = await getCollection('blog', ({ data }) => {
  return data.draft !== true;
});
posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
```

#### 4.2 Content Collections Setup
Create `/src/content/config.ts`:
```typescript
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { blog };
```

### Phase 5: Performance Optimization

#### 5.1 Image Optimization
- Replace `gatsby-image` with Astro's `<Image />` component
- Convert image imports to use Astro's image optimization

#### 5.2 JavaScript Reduction
- Use Astro Islands for interactive components
- Add `client:load` directive only where needed
- Keep most components static

#### 5.3 Build Optimization
- Enable build caching
- Configure proper output formats
- Set up proper compression

## Migration Timeline

### Week 1: Foundation
- [ ] Set up Astro project structure
- [ ] Install dependencies
- [ ] Migrate static assets
- [ ] Create base layout component

### Week 2: Components & Styling
- [ ] Convert React components to Astro
- [ ] Implement dark mode theme
- [ ] Apply liquid glass styling
- [ ] Set up Tailwind configuration

### Week 3: Content & Data
- [ ] Migrate blog posts to content collections
- [ ] Replace GraphQL with Astro data fetching
- [ ] Update internal links and routing
- [ ] Implement search functionality

### Week 4: Polish & Deploy
- [ ] Performance testing and optimization
- [ ] SEO and meta tags setup
- [ ] Deployment configuration
- [ ] Redirects and 404 handling
- [ ] Final testing and launch

## Technical Considerations

### Benefits
- **Performance**: 90%+ reduction in JavaScript bundle size
- **Simplicity**: No GraphQL layer needed
- **Flexibility**: Mix frameworks as needed
- **Modern**: Built-in TypeScript and MDX support
- **SEO**: Better Core Web Vitals scores

### Challenges & Solutions
1. **Typography.js replacement**
   - Solution: Use Tailwind Typography plugin with custom configuration

2. **Emotion CSS migration**
   - Solution: Convert to Tailwind utilities or vanilla CSS

3. **Client-side navigation**
   - Solution: Implement View Transitions API for smooth page transitions

4. **Dynamic routes**
   - Solution: Use Astro's dynamic routing with getStaticPaths()

## Deployment Strategy

### Hosting Options
1. **Vercel** (recommended)
   - Zero-config deployment
   - Automatic preview deployments
   - Edge functions support

2. **Netlify**
   - Similar features to Vercel
   - Good build plugin ecosystem

### Deployment Configuration
```javascript
// astro.config.mjs
export default defineConfig({
  site: 'https://rileymiller.dev',
  output: 'static',
  adapter: vercel(),
  integrations: [
    mdx(),
    react(),
    tailwind(),
    sitemap(),
  ],
});
```

## Success Metrics

### Performance Targets
- Lighthouse score: 95+
- First Contentful Paint: < 1s
- Time to Interactive: < 2s
- Cumulative Layout Shift: < 0.1

### SEO Goals
- Maintain existing search rankings
- Improve Core Web Vitals
- Ensure proper meta tags and structured data

## Rollback Plan
1. Keep Gatsby site in separate branch
2. Maintain DNS control for quick switching
3. Document all breaking changes
4. Test thoroughly in staging environment

## Conclusion
This migration will modernize the Riley Miller personal site with improved performance, a stunning dark mode aesthetic, and simplified maintenance. The liquid glass theme will provide a unique, modern look while Astro's architecture ensures optimal performance and developer experience.