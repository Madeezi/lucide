# Lucide React Native Subpath Packages

Lucide React Native supports subpath packages for organizing icons into different collections.

## Available Subpaths

### `lucide-react-native/untitled`

Contains untitled icons from the `/icons/untitled/` directory.

### `lucide-react-native/gmg`

Contains GMG project specific icons from the `/icons/gmg/` directory.

### `lucide-react-native/freud`

Contains Freud icons from the `/icons/freud/` directory.

## Usage

### Import from Subpath Packages

```javascript
// Import from untitled collection
import { Mail, Search, User } from 'lucide-react-native/untitled';

// Import from GMG collection  
import { Bell, Heart, Star } from 'lucide-react-native/gmg';

// Import from Freud collection
import { Brain, Stethoscope, Pill } from 'lucide-react-native/freud';

// Use in React Native components
function MyComponent() {
  return (
    <View>
      <Mail size={24} />
      <Bell size={24} />
      <Brain size={24} />
    </View>
  );
}
```

### Import Individual Icons

```javascript
// Import specific icons from subpaths
import Mail from 'lucide-react-native/untitled/icons/mail';
import Bell from 'lucide-react-native/gmg/icons/bell';
import Brain from 'lucide-react-native/freud/icons/brain';
```

## TypeScript Support

All subpath packages include full TypeScript definitions:

```typescript
import { Mail, Search } from 'lucide-react-native/untitled';
import { Brain } from 'lucide-react-native/freud';
import { LucideProps } from 'lucide-react-native';

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
packages/lucide-react-native/
├── untitled/
│   ├── dist/
│   │   ├── esm/lucide-react-native-untitled.js
│   │   ├── cjs/lucide-react-native-untitled.js
│   │   └── lucide-react-native-untitled.d.ts
│   └── src/
│       └── icons/
├── gmg/
│   ├── dist/
│   │   ├── esm/lucide-react-native-gmg.js
│   │   ├── cjs/lucide-react-native-gmg.js
│   │   └── lucide-react-native-gmg.d.ts
│   └── src/
│       └── icons/
├── freud/
│   ├── dist/
│   │   ├── esm/lucide-react-native-freud.js
│   │   ├── cjs/lucide-react-native-freud.js
│   │   └── lucide-react-native-freud.d.ts
│   └── src/
│       └── icons/
└── package.json (with exports configuration)
```

## React Native Specific Notes

- All icons are compatible with React Native SVG
- No additional setup required beyond installing `react-native-svg`
- Icons work with both Expo and bare React Native projects
- Supports all React Native platforms (iOS, Android, Web)
