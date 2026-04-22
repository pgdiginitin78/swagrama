const styles = require('@mui/material/styles');
console.log('Available exports in @mui/material/styles:', Object.keys(styles));
if (styles.alpha) {
    console.log('SUCCESS: alpha is available');
} else {
    console.log('FAILURE: alpha is missing');
}
