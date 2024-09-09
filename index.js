const fs = require('fs');
const path = require('path');

// Helper function to get content type based on file extension
const getContentType = (url) => {
    const ext = path.extname(url);
    switch (ext) {
        case '.html': return 'text/html';
        case '.css': return 'text/css';
        case '.jpg': return 'image/jpeg';
        case '.png': return 'image/png';
        case '.ico': return 'image/x-icon';
        default: return 'text/plain';
    }
};

// Main handler function for Vercel
module.exports = (req, res) => {
    let url = req.url === "/" ? "/site.html" : req.url;
    const filePath = `.${url}`;

    // Determine content type based on file extension
    const contentType = getContentType(url);

    // Read and serve the file
    fs.readFile(filePath, (err, data) => {
        if (err) {
            // If file not found, return 404
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 Not Found');
                console.log("404 Not Found: ", filePath);
            } else {
                // Handle other errors (e.g., permission issues)
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                console.error(err);
            }
        } else {
            // If file found, return it with the appropriate content type
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
};