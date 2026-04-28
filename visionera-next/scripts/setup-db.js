import 'dotenv/config';
import { initDb } from '../src/lib/init-db.js';

console.log('Starting database initialization...');
initDb().then(() => {
  console.log('Database check complete.');
  process.exit(0);
}).catch(err => {
  console.error('Database initialization failed:', err);
  process.exit(1);
});
