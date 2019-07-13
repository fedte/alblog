/**
 * Created by Falost on 2016/8/11.
 */
// module.exports = {
//   replaceConsole: true,
//   appenders: {
//     access: {
//       type: 'dateFile',
//       category: 'access',
//       filename: 'logs/access/access',
//       maxLogSize: 10 * 1024 * 1024, // = 10Mb
//       numBackups: 5, // keep five backup files
//       compress: true, // compress the backups
//       encoding: 'utf-8',
//       pattern: '-dd--hh.log',
//       alwaysIncludePattern: true
//     },
//     database: {
//       type: 'dateFile',
//       category: 'database',
//       filename: 'logs/database/database',
//       maxLogSize: 10 * 1024 * 1024, // = 10Mb
//       numBackups: 5, // keep five backup files
//       compress: true, // compress the backups
//       encoding: 'utf-8',
//       pattern: '-dd--hh.log',
//       alwaysIncludePattern: true
//     },
//     errors: {
//       type: 'dateFile',
//       category: 'errors',
//       filename: 'logs/errors/errors',
//       maxLogSize: 10 * 1024 * 1024, // = 10Mb
//       numBackups: 5, // keep five backup files
//       compress: true, // compress the backups
//       encoding: 'utf-8',
//       pattern: '-dd--hh.log',
//       alwaysIncludePattern: true
//     },
//     out: {
//       type: 'stdout'
//     }
//   },
//   categories: {
//     default: { appenders: ['access', 'database', 'errors', 'out'], level: 'trace' }
//   }
// };

module.exports = {
  appenders: [
    {
      type: 'console'
    },
    {
      type: 'dateFile',
      category: 'access',
      filename: 'logs/access/access',
      pattern: '-dd--hh.log',
      alwaysIncludePattern: true
    },
    {
      type: 'dateFile',
      category: 'system',
      filename: 'logs/system/system',
      pattern: '-dd.log',
      alwaysIncludePattern: true
    },
    {
      type: 'dateFile',
      category: 'database',
      filename: 'logs/database/database',
      pattern: '-dd.log',
      alwaysIncludePattern: true
    },
    {
      type: 'logLevelFilter',
      level: 'ERROR',
      appender: {
        type: 'dateFile',
        filename: 'logs/errors/error',
        pattern: '-MM-dd.log',
        alwaysIncludePattern: true
      }
    }
  ],
  replaceConsole: true
}
