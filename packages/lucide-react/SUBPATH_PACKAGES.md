# Lucide React Subpath Packages

Lucide React supports subpath packages for organizing icons into different collections.

## Available Subpaths

### `lucide-react/untitled`

Contains untitled icons from the `/icons/untitled/` directory.

### `lucide-react/gmg`

Contains GMG project specific icons from the `/icons/gmg/` directory.

### `lucide-react/freud`

Contains Freud icons from the `/icons/freud/` directory.

## Usage

### Import from Subpath Packages

```javascript
// Import from untitled collection
import { Mail, Search, User } from 'lucide-react/untitled';

// Import from GMG collection
import { Bell, Heart, Star } from 'lucide-react/gmg';

// Import from Freud collection
import { Brain, Stethoscope, Pill } from 'lucide-react/freud';

// Use in React components
function MyComponent() {
  return (
    <div>
      <Mail size={24} />
      <Bell size={24} />
      <Brain size={24} />
    </div>
  );
}
```

### Import Individual Icons

```javascript
// Import specific icons from subpaths
import Mail from 'lucide-react/untitled/icons/mail';
import Bell from 'lucide-react/gmg/icons/bell';
import Brain from 'lucide-react/freud/icons/brain';
```

## TypeScript Support

All subpath packages include full TypeScript definitions:

```typescript
import { Mail, Search } from 'lucide-react/untitled';
import { Brain } from 'lucide-react/freud';
import { LucideProps } from 'lucide-react';

const MyIcon: React.FC<LucideProps> = (props) => {
  return <Mail {...props} />;
};

const HealthIcon: React.FC<LucideProps> = (props) => {
  return <Brain {...props} />;
};
```

## Build Process

Subpath packages are automatically built when running:

```bash
pnpm build
```

This will:

1. Generate icons from `/icons/untitled/`, `/icons/gmg/`, and `/icons/freud/` directories
2. Create TypeScript definitions
3. Build ESM and CommonJS bundles
4. Update package.json exports

## Adding New Subpath Packages

1. Create a new directory in `/icons/` (e.g., `/icons/my-collection/`)
2. Add SVG and JSON files for your icons
3. Update build scripts in `package.json` to include the new collection
4. Add exports configuration for the new subpath

## File Structure

```
packages/lucide-react/
├── untitled/
│   ├── dist/
│   │   ├── esm/lucide-react-untitled.js
│   │   ├── cjs/lucide-react-untitled.js
│   │   └── lucide-react-untitled.d.ts
│   └── src/
│       └── icons/
├── gmg/
│   ├── dist/
│   │   ├── esm/lucide-react-gmg.js
│   │   ├── cjs/lucide-react-gmg.js
│   │   └── lucide-react-gmg.d.ts
│   └── src/
│       └── icons/
├── freud/
│   ├── dist/
│   │   ├── esm/lucide-react-freud.js
│   │   ├── cjs/lucide-react-freud.js
│   │   └── lucide-react-freud.d.ts
│   └── src/
│       └── icons/
└── package.json (with exports configuration)
```
