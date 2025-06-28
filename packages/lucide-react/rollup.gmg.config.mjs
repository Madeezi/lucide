import plugins from '@lucide/rollup-plugins';
import preserveDirectives from 'rollup-plugin-preserve-directives';
import pkg from './package.json' with { type: 'json' };
import dts from 'rollup-plugin-dts';

const packageName = 'LucideReactGmg';
const outputFileName = 'lucide-react-gmg';
const inputs = [`gmg/src/lucide-react-gmg.ts`];

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
      plugins: [
        ...plugins({ pkg }),
        preserveDirectives({
          suppressPreserveModulesWarning: true,
        }),
      ],
      external: ['react', 'prop-types'],
      output: {
        name: packageName,
        ...(preserveModules ? { dir: outputDir } : { file: `${outputDir}/${outputFileName}.js` }),
        format,
        sourcemap: true,
        preserveModules,
        preserveModulesRoot: 'gmg/src',
        globals: {
          react: 'react',
          'prop-types': 'PropTypes',
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
