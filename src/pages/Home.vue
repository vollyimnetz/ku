<template>
    <div class="appOverview text-center">
        <router-link :to="{ name: 'controll' }" class="btn btn-primary btn-lg">zum Kontrollraum</router-link>
        <router-link :to="{ name: 'monitor' }" class="btn btn-primary btn-lg">zum Monitor</router-link>
        <div class="localIp">
            Lokale IP : <span v-if="localIp!==''">{{localIp}}</span><span v-if="localIp===''">{{localIp}}</span><br />
            <small><i>oder</i></small><br />
            http://ku/<br />
            <small>(Im Tablet aufrufen.)</small>
        </div>
        <div class="topMenu dark">
          <a class="btn btn-primary btn-lg" @click="toggleFullscreen()"><span class="glyphicon glyphicon-resize-full" aria-hidden="true"></span></a>
        </div>
    </div>
</template>

<script>
import $ from "jquery";
import targetServer from '../services/target-server';
import fullscreen from '../services/fullscreen';

export default {
  name: 'home',
  components: {},
  mounted: function() {
    this.getLocalIp();
  },
  data: function() {
    return {
      localIp: ''
    }
  },
  methods: {
    toggleFullscreen:function() {
      if(fullscreen.isFullscreen()) {
        fullscreen.exitFullscreen();
        return;
      }
      fullscreen.doFullscreen();
    },
    getLocalIp: function() {
      var that = this;
      $.ajax({
          type:'GET',
          url: targetServer.get()+'my-local-ip',
        })
        .done(function(response) {
          that.localIp = response.result;
        })
        .fail(function() {
          that.localIp = '127.0.0.1';
        });
    }
  }
}
</script>