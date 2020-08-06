const logError = (...messages) => console.error(`[${process.env.APP_NAME}]`, ...messages);
const logWarning = (...messages) => console.warn(`[${process.env.APP_NAME}]`, ...messages);
const logInfo = (...messages) => console.info(`[${process.env.APP_NAME}]`, ...messages);
const logDebug = (...messages) => console.log(`[${process.env.APP_NAME}]`, ...messages);

module.exports = { logError, logWarning, logInfo, logDebug };
