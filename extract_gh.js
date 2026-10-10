const fs = require('fs');
const html = fs.readFileSync('C:/Users/babli/.gemini/antigravity/brain/08fa2f2a-489c-4e5a-9b79-86f6f113f72f/.system_generated/steps/118/content.md', 'utf8');

const regex = /href="\/AdityaSharma1305\/([a-zA-Z0-9_\-\.]+)"/g;
let m;
const repos = new Set();
while ((m = regex.exec(html)) !== null) {
  if (!['tab=', 'followers', 'following', 'stars'].some(x => m[1].includes(x))) {
    repos.add(m[1]);
  }
}
console.log('Repositories on GitHub:', Array.from(repos));
