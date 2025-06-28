import path from 'path';
import { readSvgDirectory } from '@lucide/helpers';
import { type IconMetadata } from '../types.ts';

async function getIconMetaData(iconDirectory: string): Promise<Record<string, IconMetadata>> {
  // Get all SVG files to know which icons exist
  const svgFiles = await readSvgDirectory(iconDirectory, '.svg');
  const allIconNames = svgFiles.map((svgFile) => path.basename(svgFile, '.svg'));

  // Get existing JSON files
  const iconJsons = await readSvgDirectory(iconDirectory, '.json');
  const aliasesEntries = await Promise.all(
    iconJsons.map(async (jsonFile: string) => {
      /** eslint-disable */
      const file = await import(path.join(iconDirectory, jsonFile), { with: { type: 'json' } });
      return [path.basename(jsonFile, '.json'), file.default];
    })
  );

  const existingMetadata = Object.fromEntries(aliasesEntries);

  // Create default metadata for icons without JSON files
  const defaultMetadata: IconMetadata = {
    $schema: '../icon.schema.json',
    tags: [],
    categories: [],
  };

  // Ensure all icons have metadata (either existing or default)
  const completeMetadata: Record<string, IconMetadata> = {};
  allIconNames.forEach((iconName) => {
    completeMetadata[iconName] = existingMetadata[iconName] || defaultMetadata;
  });

  return completeMetadata;
}

export default getIconMetaData;
