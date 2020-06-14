FROM danjellz/http-server:latest

COPY index.html /public
COPY app.js /public
COPY app.css /public
COPY face.jpg /public
