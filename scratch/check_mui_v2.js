try {
    const material = require('@mui/material');
    console.log('alpha in @mui/material:', !!material.alpha);
} catch (e) { console.log('Error loading @mui/material', e.message); }

try {
    const styles = require('@mui/material/styles');
    console.log('alpha in @mui/material/styles:', !!styles.alpha);
} catch (e) { console.log('Error loading @mui/material/styles', e.message); }

try {
    const system = require('@mui/system');
    console.log('alpha in @mui/system:', !!system.alpha);
} catch (e) { console.log('Error loading @mui/system', e.message); }
