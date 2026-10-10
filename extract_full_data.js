const fs = require('fs');
const js = fs.readFileSync('reference.js', 'utf8');

// The profile, projects, skills, seasons etc are located around index 2000 - 15000.
// Let's extract that entire segment and format it.
const slice = js.slice(2400, 15000);
fs.writeFileSync('data_slice.js', slice);
console.log('Saved data_slice.js, length:', slice.length);
