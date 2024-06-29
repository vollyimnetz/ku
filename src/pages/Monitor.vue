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
      <a class="button viewFullsize" @click="toggleFullscreen()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>resize</title><path d="M10.59,12L14.59,8H11V6H18V13H16V9.41L12,13.41V16H20V4H8V12H10.59M22,2V18H12V22H2V12H6V2H22M10,14H4V20H10V14Z" /></svg>
      </a>
      <router-link :to="{ name: 'home' }" class="button viewClose">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close</title><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>
      </router-link>
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

<style lang="scss">
.monitorView { color:#fff; position: absolute; width: 100%; height: 100%; background: #000; text-align: center; display: table-cell; vertical-align: middle;
  &>.wrap { transform:translateY(-50%); position: absolute; top:50%; left:0; width: 100%; }
  h1 { color:#fff; font-size: 23vh; font-weight: bold; }
  h1 span { display: inline-block; letter-spacing: -0.08em; padding:0 .2em; }
  h1[values="1"] { font-size: 35vh; }
  h2 { text-transform: uppercase; font-size: 5vw; }

  .topMenu { color: #fff; }

  .numberAnimated-item { display: inline-block; margin-right: 10px; }
  .numberAnimated-enter,
  .numberAnimated-enter-to { animation-name: numberAnimation; animation-timing-function: ease-in-out; animation-duration: .7s; }
  .numberAnimated-leave-to { animation-name: numberAnimation; animation-timing-function: ease-in-out; animation-direction:reverse; animation-duration: .7s; }


  .wrapAnimated-item { display: inline-block; margin-right: 10px; }
  .wrapAnimated-enter,
  .wrapAnimated-enter-to { animation-name: wrapAnimation; animation-timing-function: ease-in-out; animation-duration: .4s; }
  .wrapAnimated-leave-to { animation-name: wrapAnimation; animation-timing-function: ease-in-out; animation-direction:reverse; animation-duration: .4s; }
}

@keyframes wrapAnimation {
    0%   { opacity: 0; font-size:0;    }
    100% { opacity: 1; font-size:1em;  }
}

@keyframes numberAnimation {
    0%   { opacity: 0; transform: translateY(30px); font-size:0;   padding:0 .0em; }
    50%  { opacity: 0; transform: translateY(30px); font-size:1em; padding:0 .2em; }
    100% { opacity: 1; transform: translateY(0);    font-size:1em; padding:0 .2em; }
}


</style>