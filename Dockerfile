###
#https://medium.com/@singh_sandeep/host-angular8-application-on-google-cloud-run-28642bfa0cc5
###

### STAGE 1: Build ###
# We label our stage as ‘builder’
FROM node:18 as builder

WORKDIR /app
COPY package.json package-lock.json ./
## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm install 
COPY . .
## Build the angular app in production mode and store the artifacts in dist folder
RUN npm run build --output-path=dist
FROM nginx
## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/configfile.template

ENV PORT 8080
ENV HOST 0.0.0.0
RUN sh -c "envsubst '\$PORT'  < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf"
## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*
## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]