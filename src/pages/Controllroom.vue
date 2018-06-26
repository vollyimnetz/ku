<template>
  <div class="controllroom">
    <h2 class="container-fluid info1">Zahl auswählen die auf dem Monitor erscheinen soll.</h2>
    <div class="numberpad">
      <button type="button" v-for="i in allowedValues" :key="i.id" @click="addToCurrent(i)" :class="{'active':isActive(i)}">{{i.id}}</button>
    </div>

    <div class="container-fluid currentValuesWrap">
      <h2 class="info2">Zahlen entfernen sobald die Speisen abgeholt wurden.</h2>
      <div class="currentValues">
        <div v-for="i in currentValues" :key="i.id">
          <button type="button" class="removeButton" @click="removeFromCurrent(i)">&times;</button>
          {{i.id}}
        </div>
      </div>
    </div>
    <div class="topMenu dark">
      <a class="btn btn-primary btn-lg" @click="toggleFullscreen()"><span class="glyphicon glyphicon-resize-full" aria-hidden="true"></span></a>
      <router-link :to="{ name: 'home' }" class="btn btn-primary btn-lg viewClose">&times;</router-link>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import targetServer from '../services/target-server';
import fullscreen from '../services/fullscreen';

export default {
  data : function() {
    return {
      allowedValues : [
        {id:'1'}, {id:'2'}, {id:'3'}, {id:'4'}, {id:'5'}, {id:'6'}, {id:'7'}, {id:'8'}, {id:'9'}, {id:'10'},
        {id:'11'}, {id:'12'}, {id:'13'}, {id:'14'}, {id:'15'}, {id:'16'}, {id:'17'}, {id:'18'}, {id:'19'}, {id:'20'},
        {id:'21'}, {id:'22'}, {id:'23'}, {id:'24'}, {id:'25'}, {id:'26'}, {id:'27'}, {id:'28'}, {id:'29'}, {id:'30'},
        {id:'31'}, {id:'32'}, {id:'33'}, {id:'34'}, {id:'35'}, {id:'36'}, {id:'37'}, {id:'38'}, {id:'39'}, {id:'40'},
        {id:'41'}, {id:'42'}, {id:'43'}, {id:'44'}, {id:'45'}, {id:'46'}, {id:'47'}, {id:'48'}, {id:'49'}, {id:'50'}
      ],
      currentValues : [],
      continueRefresh: true,
      refreshTimeout: null
    }
  },
  mounted: function () {
    this.refresh();
  },
  beforeDestroy: function() {
    if(this.refreshTimeout) clearTimeout(this.refreshTimeout);
  },
  methods: {
    toggleFullscreen:function() {
      if(fullscreen.isFullscreen()) {
        fullscreen.exitFullscreen();
        return;
      }
      fullscreen.doFullscreen();
    },
    isActive: function(entry) {
      var result = this.currentValues.find(function(value) {
        return (value.id===entry.id);
      });

      return result!==undefined;
    },
    refresh: function() {
      var that = this;
      if(this.continueRefresh) {
        $.ajax({
          type:'GET',
          url: targetServer.get()+'currentEntries',
          success:function(response) {
            that.currentValues = response;
          },
          complete: function(jqXHR) {
            //console.info('refresh done');
            that.refreshTimeout = setTimeout(function() {
              that.refresh();
            },500);
          }
        })
      } else {
        if(that.refreshTimeout) clearTimeout(that.refreshTimeout);
      }
    },
    addToCurrent: function(v) {
      if(this.isActive(v)) return;
      $.ajax({
        type:'POST',
        url: targetServer.get()+'currentEntries',
        data: v,
        success:function(response) {}
      })
    },
    removeFromCurrent: function(v) {
      $.ajax({
        type:'DELETE',
        url: targetServer.get()+'currentEntries/'+v.id,
        success:function(response) {}
      })
    }
  }
};
</script>
