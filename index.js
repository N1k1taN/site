const fs = require('fs');
const path = require('path');

// Helper function to get content type based on file extension
const getContentType = (url) => {
    const ext = path.extname(url);
    switch (ext) {
        case '.html': return 'text/html';
        case '.css': return 'text/css';
        case '.js': return 'application/javascript';
        case '.json': return 'application/json';
        case '.jpg': return 'image/jpeg';
        case '.png': return 'image/png';
        case '.ico': return 'image/x-icon';
        default: return 'text/plain';
    }
};

// Main handler function for Vercel serverless function
module.exports = (req, res) => {
    let url = req.url === "/" ? "/index.html" : req.url;
    url = path.normalize(url).replace(/^(\.\.[\/\\])+/, ''); // Sanitize path
    
    // Determine folder based on file type
    let folder;
    if (url.endsWith('.css')) {
        folder = 'styles';
    } else if (url.endsWith('.js')) {
        folder = 'components';
    } else {
        folder = ''; // Default folder (root) for HTML or other files
    }

    const filePath = path.join(__dirname, folder, url);

    const contentType = getContentType(url);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 Not Found');
            } else {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
};
