import fs from 'fs'
import util from 'util'
const logPath = 'upgrade.log'
const logFile = fs.createWriteStream(logPath, { flags: 'w' })
console.log = function () {
  logFile.write(util.format.apply(null, arguments) + '\n')
  process.stdout.write(util.format.apply(null, arguments) + '\n')
}

console.error = function () {
  logFile.write(util.format.apply(null, arguments) + '\n')
  process.stderr.write(util.format.apply(null, arguments) + '\n')
}
export default console