const other = require('./export')

console.log(
  'other test 1:',
  other
)

other.push('x')

console.log(
  'other test 2:',
  other
)

const again = require('./export')

console.log(
  'again test:', again
)

