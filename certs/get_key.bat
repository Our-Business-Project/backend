openssl genpkey -algorithm RSA -out server.key
openssl req -new -key server.key -out server.csr
openssl req -x509 -sha256 -days 365 -key server.key -in server.csr -out server.crt
rm server.csr