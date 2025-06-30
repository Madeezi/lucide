import plugins from '@lucide/rollup-plugins';
import pkg from './package.json' with { type: 'json' };
import dts from 'rollup-plugin-dts';

const packageName = 'LucideReactNativeFreud';
const outputFileName = 'lucide-react-native-freud';
const inputs = [`freud/src/lucide-react-native-freud.ts`];

const bundles = [
  {
    format: 'cjs',
    inputs,
    outputDir: 'freud/dist/cjs',
  },
  {
    format: 'esm',
    inputs,
    outputDir: 'freud/dist/esm',
    preserveModules: true,
  },
];

const configs = bundles
  .map(({ inputs, outputDir, format, preserveModules }) =>
    inputs.map((input) => ({
      input,
      plugins: [...plugins({ pkg })],
      external: ['react', 'react-native', 'react-native-svg'],
      output: {
        name: packageName,
        ...(preserveModules ? { dir: outputDir } : { file: `${outputDir}/${outputFileName}.js` }),
        format,
        sourcemap: true,
        preserveModules,
        preserveModulesRoot: 'freud/src',
        globals: {
          react: 'react',
          'react-native': 'ReactNative',
          'react-native-svg': 'ReactNativeSvg',
        },
      },
    })),
  )
  .flat();

export default [
  {
    input: inputs[0],
    output: [
      {
        file: `freud/dist/${outputFileName}.d.ts`,
        format: 'es',
      },
    ],
    plugins: [dts()],
  },
  ...configs,
];
