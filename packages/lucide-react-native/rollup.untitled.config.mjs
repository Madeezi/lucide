import plugins from '@lucide/rollup-plugins';
import dts from 'rollup-plugin-dts';
import pkg from './package.json' with { type: 'json' };

const packageName = 'LucideReactNativeUntitled';
const outputFileName = 'lucide-react-native-untitled';
const inputs = [`untitled/src/lucide-react-native-untitled.ts`];

const bundles = [
  {
    format: 'cjs',
    inputs,
    outputDir: 'untitled/dist/cjs',
  },
  {
    format: 'esm',
    inputs,
    outputDir: 'untitled/dist/esm',
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
        preserveModulesRoot: 'untitled/src',
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
        file: `untitled/dist/${outputFileName}.d.ts`,
        format: 'es',
      },
    ],
    plugins: [dts()],
  },
  ...configs,
];
