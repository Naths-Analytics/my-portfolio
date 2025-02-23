// build.js
const fs = require('fs');

// Read the .env file
const envContent = fs.readFileSync('.env', 'utf8');
const formIdMatch = envContent.match(/FORMSPREE_FORM_ID=(.+)/);
if (!formIdMatch) {
    throw new Error('Formspree form ID not found in .env file. Please create or update .env with FORMSPREE_FORM_ID=[your-form-id]');
}
const formId = formIdMatch[1].trim();

// Read the current script.js
let scriptContent = fs.readFileSync('script.js', 'utf8');

// Replace the placeholder with the form ID
scriptContent = scriptContent.replace(/FORMSPREE_FORM_ID_PLACEHOLDER/g, formId);

// Write the updated script.js to a deploy file
fs.writeFileSync('deploy/script.js', scriptContent, 'utf8');
console.log('Built deploy/script.js with Formspree form ID.');