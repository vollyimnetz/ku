<template>
  <div class="monitorView">
    <transition name="wrapAnimated">
      <div class="wrap" v-if="currentValues.length>0">
        <h2>Bitte abholen</h2>
        <h1 :values="currentValues.length">
          <transition-group name="numberAnimated">
            <span v-for="i in currentValues" :key="i">{{i.number}}</span>
          </transition-group>
        </h1>
      </div>
    </transition>

    <div class="topMenu">
      <a class="btn btn-primary btn-lg" @click="toggleFullscreen()"><span class="glyphicon glyphicon-resize-full" aria-hidden="true"></span></a>
      <router-link :to="{ name: 'home' }" class="btn btn-primary btn-lg">&times;</router-link>
    </div>
  </div>
</template>

<script>
import targetServer from '../services/target-server';
import fullscreen from '../services/fullscreen';

export default {
  data () {
    return {
      currentValues: [],
      intervalObject: null,
      intervalDuration: 500,
    }
  },
  mounted() {
    this.doSetup();
  },
  beforeDestroy() {
    console.log('clearTimeout monitor');
    if(this.refreshTimeout) clearTimeout(this.refreshTimeout);
  },
  computed: {},
  methods: {
    doSetup() {
      this.intervalObject = setInterval(() => {
          this.loadData();
        },this.intervalDuration);
      this.loadData();
    },
    toggleFullscreen() {
      if(fullscreen.isFullscreen()) {
        fullscreen.exitFullscreen();
        return;
      }
      fullscreen.doFullscreen();
    },
    doClose() {
      this.exitFullscreen();
      this.$emit('close');
    },
    loadData() {
      fetch(targetServer.get()+'currentEntries', {
        method:'GET'
      })
      .then(response => response.json())
      .then(data => {
          this.handleResponse(data);
        });
    },
    handleResponse(response) {
      //remove not existing
      for(var i = 0; i < this.currentValues.length; i++) {
        var current = this.currentValues[i];
        if(response.find(value => value.id===current.id) === undefined) {
          this.currentValues.splice(i, 1);
        }
      }

      //add new
      for (var i = 0; i < response.length; i++) {
        var current = response[i];
        if(this.currentValues.find(value => value.id===current.id)===undefined) {
          this.currentValues.push(current);
        }
      }
    }
  }
}
</script>
