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

### Installation

TS3AudioBot Control Panel requires [Docker](https://docs.docker.com/engine/install/)

```sh
$ mkdir abdash
$ cd abdash
$ wget https://github.com/elipeF/TS3AudioBot-Control-Panel/files/5282994/kickstart.tar.gz
$ tar -xvf kickstart.tar.gz
$ chown -R 9999:9999 $(pwd)/ts3ab
!IMPORTANT: Edit docker-compose and change JWT_SECRET
$ docker-compose up -d
```

Create admin user

```sh
$ wget https://gist.githubusercontent.com/elipeF/670234003ef0d00e542f66f1b2625e27/raw/26ad3d415e5378dd65ee5ed50d4fca92003f5654/addadmin.sh
$ chmod +x addadmin.sh
$ ./addadmin.sh PASS_HERE
```

### Screenshots

![Dashboard](https://i.imgur.com/98qFizh.png)
![Botsettings](https://i.imgur.com/Iuk1HbI.png)
![Botcreate](https://i.imgur.com/8xObKLQ.png)
![Usercreate](https://i.imgur.com/b0LjaLc.png)

## License

MIT
