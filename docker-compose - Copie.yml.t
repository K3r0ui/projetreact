version: "3.9"
services:
  front:
    build: ./client-side/
    image: partie-front
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_BACKEND_DNS=localhost
    volumes:
      - type: bind
        source: ./client-side/src
        target: /usr/src/app/src
  node-server:
    build: ./server-side/
    image: partie-back
    ports:
      - "8080:8080"
    environment:
      - PORT=8080
      - JWTSECRETKEY_C=havertz
      - JWTSECRETKEY_J=werner
      - DB_DNS=mongo-server
      - DB_PORT=27017
    volumes:
      - type: bind
        source: ./server-side/src
        target: /usr/src/app/src
    depends_on:
      - mongo-server
  mongo-server:
    image: mongo:5.0
    ports:
      - "27017:27017"
    volumes:
      - project-data:/data/db

volumes:
  project-data:
