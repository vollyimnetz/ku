<template>
  <div class="controllroom">
    <div class="numberpad">
      <button type="button" v-for="i in allowedValues" @click="addToCurrent(i)" :class="{'active':isActive(i)}">{{i.id}}</button>
    </div>

    <div class="container-fluid">
      <div class="row">
        <div class="col-xs-12">

          <h2>Bitte abholen</h2>
          <div class="currentValues">
            <div v-for="i in currentValues">
              <button type="button" class="removeButton" @click="removeFromCurrent(i)">&times;</button>
              {{i.id}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <button type="button" class="btn btn-primary btn-lg viewClose" @click="doClose">Schließen</button>
  </div>
</template>

<script>
import $ from "jquery";
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
    console.log('clearTimeout monitor');
    if(this.refreshTimeout) clearTimeout(this.refreshTimeout);
  },
  methods: {
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
          url: this.getTargetServer()+'currentEntries',
          success:function(response) {
            that.currentValues = response;
          },
          complete: function(jqXHR) {
            console.log('refresh done');
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
        url: this.getTargetServer()+'currentEntries',
        data: v,
        success:function(response) {}
      })
    },
    getTargetServer: function() {
      var targetServer = window.location.href;
      return targetServer.replace(':8080','');
    },
    removeFromCurrent: function(v) {
      $.ajax({
        type:'DELETE',
        url: this.getTargetServer()+'currentEntries/'+v.id,
        success:function(response) {}
      })
    },
    doClose:function() {
      this.$emit('close');
    }
  }
};
</script>
