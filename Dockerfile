FROM node:12.12.0-alpine as build
WORKDIR /app
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
RUN npm install -g -s --no-progress yarn
RUN yarn install
COPY public /app/public
COPY src /app/src
RUN yarn run build
RUN yarn cache clean

FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN sed -i '/index  index.html index.htm;/a try_files $uri /index.html;' /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
