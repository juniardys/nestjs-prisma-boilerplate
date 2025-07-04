import * as path from 'path';
import * as fs from 'fs';

const file = process.env.npm_config_file;

// Define seeder file here sequentially
const seeders: string[] = [
  'first_data.ts',
];

async function runSingleFile() {
  const seed = await import(`./seeds/${file}`);
  console.log(`[seeder] started run seed from ${file}`);
  try {
    await seed.run();
    console.log(`[seeder] successfully run seed from ${file}`);
  } catch (error) {
    console.log(`[seeder] error when running seed from ${file}`);
    throw error;
  }
}

async function runAll() {
  for (const fileName of seeders) {
    const seedPath = path.join(__dirname, 'seeds', fileName);
    if (fs.existsSync(seedPath)) {
      const seed = await import(`./seeds/${fileName}`);
      console.log(`[seeder] started run seed from ${fileName}`);
      try {
        await seed.run();
        console.log(`[seeder] successfully run seed from ${fileName}`);
      } catch (error) {
        console.log(`[seeder] error when running seed from ${fileName}`);
        throw error;
      }
    } else {
      console.log(`[seeder] seed file not found: ${fileName}`);
    }
  }
}

if (file) {
  runSingleFile();
} else {
  runAll();
}
