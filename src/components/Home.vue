<template>
  <div class="appOverview text-center">
    <div class="areas">
      <router-link :to="{ name: 'controll' }" class="button">zum Kontrollraum</router-link>
      <router-link :to="{ name: 'monitor' }" class="button">zum Monitor</router-link>
    </div>
    <div class="localIp">
      <small>Lokale IP</small>
      <div><span class="localIpInner">{{localIp}}</span>
        <button @click="changeIp" class="editButton">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>pencil</title><path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" /></svg>
        </button>
      </div>
      <br />
      <div class="infoText">
        Im Browser des Tablets die lokale IP als URL eingeben, um diese Seite angezeigt zu bekommen. (Das Tablet muss dabei im gleichen Netzwerk sein).
      </div>
    </div>
    <div class="topMenu dark">
      <a class="btn btn-primary btn-lg" @click="toggleFullscreen()"><span class="glyphicon glyphicon-resize-full" aria-hidden="true"></span></a>
    </div>
  </div>
</template>

<script>
import targetServer from '../services/target-server';
import fullscreen from '../services/fullscreen';

export default {
  components: {},
  mounted() {
    this.loadLocalIp();
  },
  data: () => ({
    localIp: ''
  }),
  methods: {
    toggleFullscreen() {
      if(fullscreen.isFullscreen()) {
        fullscreen.exitFullscreen();
        return;
      }
      fullscreen.doFullscreen();
    },
    loadLocalIp() {
      fetch(targetServer.get()+'settings', {
          method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
          this.localIp = data.ip;
        })
        .catch((error) => {
          this.localIp = '';
        });
    },
    async changeIp() {
      let defaultValue = this.localIp;
      if(defaultValue==='') defaultValue = '192.168.0.222';
      let newIP = await prompt('Auf welcher IP läuft diese Seite? (z.B. 192.168.0.123)'+"\n"+'ACHTUNG: der Wert dient nur hier zur Anzeige/Erinnerung, er ändert nichts an der IP unter der die Anwendung läuft.', defaultValue);
      if(!this.isValidIPv4(newIP)) {
        alert('Das ist keine gültige IPv4-Adresse.');
        return;
      }

      await fetch(targetServer.get()+'settings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ip: newIP})
        });

      this.loadLocalIp();
    },
    isValidIPv4(ip) {
      const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])$/;
      return ipv4Regex.test(ip);
    }
  }
}
</script>

<style lang="scss">
.appOverview { margin-top:30vh;
  .areas { display: flex; justify-content: center; gap: .3em; flex-direction: row; flex-wrap: wrap; }
}
.appOverview .localIp { font-size: 2em; text-align: center; margin-top:1em; }
.appOverview .localIpInner { display: inline-block; margin-left:1.5em; }
.appOverview .localIp small { font-size:.5em; display: inline-block; }
.appOverview .infoText { font-size:.5em; margin-top:1em; padding: 0 1em; line-height: 1.5;}

.editButton { background: transparent; border:none; padding: 5px; line-height: 20px; margin-left:1em; display: inline-block; color: #aaa;
  svg { width: 20px; height: 20px; }
  svg path { fill: currentColor; }
}

</style>