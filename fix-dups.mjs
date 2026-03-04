import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (file === 'node_modules' || file === '.next' || file === '.git') continue;
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(filePath));
    } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
      results.push(filePath);
    }
  }
  return results;
}

const files = walk('./');
let changed = 0;
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  // Find all <Link tags.
  // We'll replace occurrences of prefetch={true} if there's more than one in the same tag.
  // Actually, simpler: replace `<Link prefetch={true}` with `<Link` if there's ANOTHER `prefetch={true}` inside the tag.
  // Even simpler, if we just run a regex to remove ALL `prefetch={...}` and then add it back?
  // Let's just remove duplicate `prefetch={true}` that are right next to each other, or anywhere.
  // The error tells us the files: AdminMobileNav, AdminSidebar, etc.
  
  // A safer regex to remove `prefetch={true}` if it appears twice in a Link tag:
  // Since we only added `<Link prefetch={true}`, we probably created `<Link prefetch={true} ... prefetch={true}`
  let newContent = content.replace(/<Link\s+prefetch=\{true\}\s+([\s\S]*?)prefetch=\{true\}/g, '<Link prefetch={true} $1');
  // run it twice in case of 3?
  newContent = newContent.replace(/<Link\s+prefetch=\{true\}\s+([\s\S]*?)prefetch=\{true\}/g, '<Link prefetch={true} $1');
  
  if (newContent !== content) {
    fs.writeFileSync(file, newContent);
    console.log('Fixed ' + file);
    changed++;
  }
}
console.log(`Finished. Fixed ${changed} files.`);
