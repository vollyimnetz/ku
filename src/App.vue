<template>
  <div id="app">
    <controllroom v-if="view==='controll'" @close="setView(null)"></controllroom>
    <monitor v-if="view==='monitor'" @close="setView(null)"></monitor>
    <div v-if="view===null" class="appOverview text-center">
      <button type="button" class="btn btn-primary btn-lg" @click="setView('controll')">zum Kontrollraum</button>
      <button type="button" class="btn btn-primary btn-lg" @click="setView('monitor')">zum Monitor</button>
      <div class="localIp">
        Lokale IP : <span v-if="localIp!==''">{{localIp}}</span><span v-if="localIp===''">{{localIp}}</span>
      </div>
    </div>

  </div>
</template>

<script>
import Monitor from './components/Monitor';
import Controllroom from './components/Controllroom';
import $ from "jquery";

export default {
  name: 'app',
  components: {
    'monitor':Monitor,
    'controllroom':Controllroom
  },
  mounted: function() {
    console.log('hier');
    this.getLocalIp();
  },
  data: function() {
    return {
      view:null,
      localIp: ''
    }
  },
  methods: {
    setView : function(view) {
      this.view = view;
    },
    getTargetServer: function() {
      var targetServer = window.location.href;
      return targetServer.replace(':8080','');
    },
    getLocalIp: function() {
      var that = this;
      $.ajax({
        type:'GET',
        url: this.getTargetServer()+'my-local-ip',
        success:function(response) {
          that.localIp = response.result;
        }
      })
    }
  }
}
</script>
