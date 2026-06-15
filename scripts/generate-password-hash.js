const bcrypt = require('bcryptjs')
const password = process.argv[2]
if (!password) {
  console.error('Usage: node scripts/generate-password-hash.js <password>')
  process.exit(1)
}
bcrypt.hash(password, 10).then(hash => {
  console.log('\nPaste this into ADMIN_PASSWORD in .env.local:\n')
  console.log(hash)
})
