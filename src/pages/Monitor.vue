<template>
  <div class="monitorView">
    <transition name="wrapAnimated">
      <div class="wrap" v-if="currentValues.length>0">
        <h2>Bitte abholen</h2>
        <h1 :values="currentValues.length">
          <transition-group name="numberAnimated">
            <span v-for="i in currentValues" :key="i">{{i.id}}</span>
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
import $ from "jquery";
import targetServer from '../services/target-server';
import fullscreen from '../services/fullscreen';

export default {
  data () {
    return {
      currentValues: [],
      continueRefresh: true,
      refreshTimeout: null
    }
  },
  mounted: function () {
    this.refresh();
  },
  beforeDestroy: function() {
    console.log('clearTimeout monitor');
    if(this.refreshTimeout) clearTimeout(this.refreshTimeout);
  },
  computed: {},
  methods: {
    toggleFullscreen:function() {
      if(fullscreen.isFullscreen()) {
        fullscreen.exitFullscreen();
        return;
      }
      fullscreen.doFullscreen();
    },
    doClose:function() {
      this.exitFullscreen();
      this.$emit('close');
    },
    refresh: function() {
      var that = this;
      if(this.continueRefresh) {
        $.ajax({
          type:'GET',
          url: targetServer.get()+'currentEntries',
          success:function(response) {
            that.handleResponse(response);
          },
          complete: function(jqXHR) {
            //console.info('refresh done');
            that.refreshTimeout = setTimeout(function() {
              that.refresh();
            },1000);
          }
        })
      } else {
        if(that.refreshTimeout) clearTimeout(that.refreshTimeout);
      }
    },
    handleResponse: function(response) {
      //remove not existing
      for (var i = 0; i < this.currentValues.length; i++) {
        var current = this.currentValues[i];
        if(response.find(function(value) { return value.id===current.id })===undefined) {
          this.currentValues.splice(i,1);
        }
      }

      //add new
      for (var i = 0; i < response.length; i++) {
        var current = response[i];
        if(this.currentValues.find(function(value) { return value.id===current.id })===undefined) {
          this.currentValues.push(current);
        }
      }
    }
  }
}
</script>
