'use strict';


require('fs').writeFileSync(
  require('path').resolve(__dirname, '../lib/locales_browser_data.json'),
  JSON.stringify(require('./utils').all_locales())
);
