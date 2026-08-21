- React (next.js)

- routing
"With the App Router, Next.js uses file-system based routing. Each page.tsx represents a route, and the directory structure determines the URL. Dynamic segments use conventions like [id]. Unlike Angular, you generally don't maintain a centralized routing module. Navigation can be done with the Link component or programmatically using useRouter from next/navigation."

Folders organize routes; page.tsx activates a route; other .tsx files are ordinary React components.

- File Naming
Only certain special filenames have Next.js routing/layout meaning:

page.tsx       → route
layout.tsx     → shared layout for that route segment
loading.tsx    → loading UI
error.tsx      → error UI
not-found.tsx  → 404 UI

