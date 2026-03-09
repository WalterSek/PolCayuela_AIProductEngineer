# Image Loading Issue Investigation & Fix Plan

## Root Cause Analysis

**Current Implementation:**
- Uses native HTML `<img>` tags in both [`app/page.tsx`](app/page.tsx:75) and [`app/projects/[slug]/page.tsx`](app/projects/%5Bslug%5D/page.tsx:62)
- Image paths in [`data/projects.ts`](data/projects.ts:198): `/culinaria-cover.jpg`, `/infinitevisuals-cover.jpg`, etc.
- Images exist in the `public/` folder
- No `basePath` configured in [`next.config.ts`](next.config.ts:1)

**Why images work in AI Studio but not in production:**
The `<img>` tag with absolute paths like `/culinaria-cover.jpg` should work for files in the `public/` folder in Next.js. However, there can be environment-specific issues:
- AI Studio runs with different static file serving
- Production deployments may have different path resolution
- The images (especially `pxlmorph-cover.jpg` at 2.17MB) may be timing out

## Solution Plan

### Approach
Switch from native HTML `<img>` tags to Next.js's `next/image` component with the `unoptimized` prop (as requested by user). This provides:
1. Better path resolution across environments
2. Native Next.js image handling
3. The `unoptimized` prop to bypass image optimization (as specified)

### Files to Modify

#### 1. [`app/page.tsx`](app/page.tsx:1)
- Import `Image` from 'next/image'
- Replace `<img src={project.imageUrl}>` with `<Image src={project.imageUrl} unoptimized fill />`
- Use `fill` prop since parent container has aspect-video (already set)

**Current code (lines 73-82):**
```tsx
{project.imageUrl && (
  <div className="relative aspect-video w-full overflow-hidden border-b border-zinc-100">
    <img
      src={project.imageUrl}
      alt={project.name}
      className="w-full h-full object-cover"
      loading="lazy"
    />
  </div>
)}
```

**New code:**
```tsx
{project.imageUrl && (
  <div className="relative aspect-video w-full overflow-hidden border-b border-zinc-100">
    <Image
      src={project.imageUrl}
      alt={project.name}
      fill
      className="object-cover"
      unoptimized
    />
  </div>
)}
```

#### 2. [`app/projects/[slug]/page.tsx`](app/projects/%5Bslug%5D/page.tsx:1)
- Import `Image` from 'next/image'
- Replace `<img src={project.imageUrl}>` with `<Image src={project.imageUrl} unoptimized fill />`

**Current code (lines 60-69):**
```tsx
{project.imageUrl && (
  <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-zinc-200 mb-8 shadow-sm">
    <img
      src={project.imageUrl}
      alt={project.name}
      className="w-full h-full object-cover"
      loading="eager"
    />
  </div>
)}
```

**New code:**
```tsx
{project.imageUrl && (
  <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-zinc-200 mb-8 shadow-sm">
    <Image
      src={project.imageUrl}
      alt={project.name}
      fill
      className="object-cover"
      unoptimized
    />
  </div>
)}
```

## Execution Steps

1. [ ] Modify `app/page.tsx` - Add Image import and update project card images
2. [ ] Modify `app/projects/[slug]/page.tsx` - Add Image import and update project detail image
3. [ ] Run build to verify no errors
4. [ ] Verify the fix works in both development and production

## Notes
- The `unoptimized` prop disables Next.js image optimization but ensures images load correctly
- The `fill` prop makes the image fill its parent container (which has `aspect-video`)
- This is the simplest fix that maintains compatibility across environments
