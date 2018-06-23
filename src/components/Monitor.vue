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
    <button type="button" class="btn btn-primary btn-lg viewClose" @click="doClose">&times;</button>
  </div>
</template>

<script>
import $ from "jquery";
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
    this.doFullscreen();
  },
  beforeDestroy: function() {
    console.log('clearTimeout monitor');
    if(this.refreshTimeout) clearTimeout(this.refreshTimeout);
  },
  methods: {
    doFullscreen:function() {
      if(document.body.parentElement.requestFullScreen) document.body.parentElement.requestFullScreen();
      else if(document.body.parentElement.webkitRequestFullScreen) document.body.parentElement.webkitRequestFullScreen();
      else if(document.body.parentElement.mozRequestFullScreen) document.body.parentElement.mozRequestFullScreen();
    },
    exitFullscreen:function() {
      if(document.exitFullscreen) document.exitFullscreen();
      else if(document.webkitExitFullscreen) document.webkitExitFullscreen();
      else if(document.mozCancelFullScreen) document.mozCancelFullScreen();
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
          url: this.getTargetServer()+'currentEntries',
          success:function(response) {
            that.handleResponse(response);
          },
          complete: function(jqXHR) {
            console.log('refresh done');
            that.refreshTimeout = setTimeout(function() {
              that.refresh();
            },1000);
          }
        })
      } else {
        if(that.refreshTimeout) clearTimeout(that.refreshTimeout);
      }
    },
    getTargetServer: function() {
      var targetServer = window.location.href;
      return targetServer.replace(':8080','');
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
