import plugins from '@lucide/rollup-plugins';
import preserveDirectives from 'rollup-plugin-preserve-directives';
import pkg from './package.json' with { type: 'json' };
import dts from 'rollup-plugin-dts';

const packageName = 'LucideReactFreud';
const outputFileName = 'lucide-react-freud';
const inputs = [`freud/src/lucide-react-freud.ts`];

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
        preserveModulesRoot: 'freud/src',
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
        file: `freud/dist/${outputFileName}.d.ts`,
        format: 'es',
      },
    ],
    plugins: [dts()],
  },
  ...configs,
];
