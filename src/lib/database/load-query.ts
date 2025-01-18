import { readFileSync } from 'fs';
import { join } from 'path';

export function loadQuery(path: string): string {
	const fullPath = join(process.cwd(), path);
	return readFileSync(fullPath, 'utf8');
}
