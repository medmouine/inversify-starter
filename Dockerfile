FROM node:8
ARG env=dev

ENV ACTIVE_PROFILE="${ACTIVE_PROFILE}"

ENV SUBDIR=appDir

RUN useradd --user-group --create-home --shell /bin/false $USER &&\
    npm install --global tsc-watch npm ntypescript typescript gulp-cli

ENV HOME=/home/$USER

COPY package.json $HOME/$SUBDIR/

RUN chown -R $USER:$USER $HOME/*

USER $USER

WORKDIR $HOME/$SUBDIR

RUN npm install

RUN npm run build:${ACTIVE_PROFILE}

EXPOSE 8080

CMD ["node", "dist/index.js"]