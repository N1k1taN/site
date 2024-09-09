const http = require('http');
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

// Create an HTTP server
const server = http.createServer((req, res) => {
    let url = req.url === "/" ? "/site.html" : req.url;
    const filePath = path.join(__dirname, url);

    // Determine content type based on file extension
    const contentType = getContentType(url);

    // Read and serve the file
    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 Not Found');
                console.log("404 Not Found: ", filePath);
            } else {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                console.error(err);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
});

// Define the port to listen to
const PORT = process.env.PORT || 3000;  // Vercel will use process.env.PORT
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
