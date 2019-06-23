FROM node:12.4.0-alpine

RUN apk add --no-cache ca-certificates

COPY . /dump
WORKDIR /dump
RUN yarn
CMD ["node", "express-server"]
