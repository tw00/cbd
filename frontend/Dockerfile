FROM joseluisq/static-web-server:2-alpine

ENV SERVER_PORT=80
ENV SERVER_ROOT=./static

WORKDIR /usr/src/app
COPY . .

EXPOSE 8787
CMD ["static-web-server"]
