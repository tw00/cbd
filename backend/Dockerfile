FROM node:18-alpine AS base
WORKDIR /app

# -----------------------------------------------------------------------------
# Builder stage
# -----------------------------------------------------------------------------
FROM base AS builder

# Install python/pip
ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools

# Install make
RUN apk add g++ && apk add make

COPY package*.json ./
RUN npm ci --build-from-source

# -----------------------------------------------------------------------------
# Run stage
# -----------------------------------------------------------------------------
FROM base AS runtime
COPY --from=builder /app/ .
COPY . .
EXPOSE 9300
CMD [ "node", "src/server.js" ]
