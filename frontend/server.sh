#!/bin/bash

if [[ ! -f server.key ]]; then
  openssl req \
    -x509 -out server.crt -keyout server.key \
    -newkey rsa:2048 -nodes -sha256 \
    -subj '/CN=localhost' -extensions EXT -config <( \
    printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
fi

./bin/sws \
  --log-level info \
  --port 9000 \
  --root ./static/ \
  --directory-listing true \
  --cache-control-headers false \
  --http2 true \
  --http2-tls-cert ./server.crt \
  --http2-tls-key ./server.key
