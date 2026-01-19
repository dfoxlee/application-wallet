const consoleLogger = (message, label = '') => {
  // Capture stack trace to get caller information
  const stack = new Error().stack;
  const stackLines = stack.split('\n');
  
  // Get the caller line (skip Error, consoleLog, and get actual caller)
  const callerLine = stackLines[2] || '';
  
  // Extract file path and line number using regex
  // Matches patterns like: at functionName (/path/to/file.js:line:column)
  // or: at /path/to/file.js:line:column
  const match = callerLine.match(/\((.+):(\d+):(\d+)\)/) || callerLine.match(/at (.+):(\d+):(\d+)/);
  
  let location = 'unknown location';
  if (match) {
    const fullPath = match[1];
    const lineNumber = match[2];
    const columnNumber = match[3];
    
    // Extract just the filename from full path
    const fileName = fullPath.split('/').pop();
    location = `${fileName}:${lineNumber}:${columnNumber}`;
  }
  
  // Format the log output
  const timestamp = new Date().toISOString();
  const labelText = label ? `[${label}] ` : '';
  
  console.log('\n' + '='.repeat(80));
  console.log(`${labelText}Location: ${location}`);
  console.log(`Time: ${timestamp}`);
  console.log('-'.repeat(80));
  
  // Handle different types of messages
  if (typeof message === 'object' && message !== null) {
    if (message instanceof Error) {
      console.log('Error Object:');
      console.log(`  Name: ${message.name}`);
      console.log(`  Message: ${message.message}`);
      console.log(`  Stack:\n${message.stack}`);
    } else if (Array.isArray(message)) {
      console.log(`Array (length: ${message.length}):`);
      console.log(JSON.stringify(message, null, 2));
    } else {
      console.log('Object:');
      console.log(JSON.stringify(message, null, 2));
    }
  } else {
    console.log(`Type: ${typeof message}`);
    console.log(`Value: ${message}`);
  }
  
  console.log('='.repeat(80) + '\n');
  
  return message; // Return the message for chaining
};

export default consoleLogger;