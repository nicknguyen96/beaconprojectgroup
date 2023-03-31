const hbs = require('handlebars');

const email = 'nhatnguyen@gmail.com';
const link = 'https://google.com';

const html = hbs.compile(`<header>
              Hello {{email}}! Welcome to my project management app!
          </header>
          <main>
              <p>Please click <a href={{link}}>here</a> to sign up your account.</p>
              <p>This link will expire in 3 hours.</p>
          </main>`);
console.log(html({email,link}));
