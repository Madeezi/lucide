import plugins from '@lucide/rollup-plugins';
import dts from 'rollup-plugin-dts';
import pkg from './package.json' with { type: 'json' };

const packageName = 'LucideReactNativeGmg';
const outputFileName = 'lucide-react-native-gmg';
const inputs = [`gmg/src/lucide-react-native-gmg.ts`];

const bundles = [
  {
    format: 'cjs',
    inputs,
    outputDir: 'gmg/dist/cjs',
  },
  {
    format: 'esm',
    inputs,
    outputDir: 'gmg/dist/esm',
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
        preserveModulesRoot: 'gmg/src',
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
        file: `gmg/dist/${outputFileName}.d.ts`,
        format: 'es',
      },
    ],
    plugins: [dts()],
  },
  ...configs,
];
