# TS3AudioBot-Control-Panel

# [Instalacja po polsku](https://egcforum.pl/topic/3027-ts3audiobot-control-panel/)

TS3AudioBot Control Panel allows you to easily create and manipulate bots. Assign them between users and allow users to add play rights to own bots.

### Suported languages

- English
- Polish

Feel free to pull request with translation :)

### Tech

- reactjs.org
- nodejs.org
- nestjs.com
- [Matx](https://github.com/uilibrary/matx-react) - styling for dashboard

### Installation v2

TS3AudioBot Control Panel requires [Docker](https://docs.docker.com/engine/install/)

```sh
$ mkdir abdash
$ cd abdash
$ wget https://github.com/elipeF/TS3AudioBot-Control-Panel/releases/download/2.0.0/kickstartv2.tar.gz
$ tar -xvf kickstartv2.tar.gz
$ chown -R 9999:9999 $(pwd)/ts3ab
!IMPORTANT: Edit docker-compose and change JWT_SECRET
$ docker-compose up -d
```

Create admin user

```sh
$ wget https://gist.githubusercontent.com/elipeF/192e10d114696c6771b29466169cefd5/raw/64b960776c78a11aa30304ad71aa554d73429790/addadmin.sh
$ chmod +x addadmin.sh
!IMPORTANT: Default port 80, if you have changed, also change below
$ ./addadmin.sh 80 PASS_HERE
```

### Upgrade from v1

Example docker-compose: https://gist.githubusercontent.com/elipeF/b54b70c36c023e76ccc14c060b0f680c/raw/4ca8561c3eca881397aed1e772fdb60f661e5f94/docker-compose.yml

```sh
$ cd abdash
$ docker-compose down
$ rm docker-compose.yml
$ wget https://gist.githubusercontent.com/elipeF/b54b70c36c023e76ccc14c060b0f680c/raw/4ca8561c3eca881397aed1e772fdb60f661e5f94/docker-compose.yml
!IMPORTANT: Edit docker-compose and change JWT_SECRET
$ docker-compose pull
$ docker-compose up -d
```


### Screenshots

![Dashboard](https://i.imgur.com/qRQufwL.png)
![Botsettings](https://i.imgur.com/Iuk1HbI.png)
![Botcreate](https://i.imgur.com/8xObKLQ.png)
![Usercreate](https://i.imgur.com/b0LjaLc.png)

## License

MIT
