<template>
  <div class="controllroom">
    <h2 class="container-fluid info1">Zahl auswählen die auf dem Monitor erscheinen soll.</h2>
    <div class="numberpad">
      <button type="button" v-for="i in allowedValues" :key="i.number" @click="addToCurrent(i)" :class="{'active':isNumberActive(i.number)}">{{i.number}}</button>
    </div>

    <div class="container-fluid currentValuesWrap">
      <h2 class="info2">Zahlen entfernen sobald die Speisen abgeholt wurden.</h2>
      <div class="currentValues">
        <div v-for="entry in currentValues" :key="entry.id">
          <button type="button" class="removeButton" @click="removeFromCurrent(entry)">&times;</button>
          {{entry.number}}
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
import targetServer from '../services/target-server';
import fullscreen from '../services/fullscreen';

export default {
  data: () => ({
    currentValues : [],
    continueRefresh: true,
    intervalObject: null,
    intervalDuration: 5000,
  }),
  mounted() {
    this.doSetup();
  },
  beforeDestroy() {
    this.tearDown();
  },
  computed: {
    allowedValues() {
      let result = [];
      for(let i=1; i<=50; i++) {
        result.push({number:i});
      }
      return result;
    },
  },
  methods: {
    doSetup() {
      this.intervalObject = setInterval(() => {
          this.loadData();
        },this.intervalDuration);
      this.loadData();
    },
    tearDown() {
      if(this.refreshTimeout) clearTimeout(this.refreshTimeout);
    },
    toggleFullscreen() {
      if(fullscreen.isFullscreen()) {
        fullscreen.exitFullscreen();
        return;
      }
      fullscreen.doFullscreen();
    },
    isNumberActive(id) {
      let result = this.currentValues.find(value => value.number===id);
      return result!==undefined;
    },
    loadData() {
      fetch(targetServer.get()+'currentEntries', {
          method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
          this.currentValues = data;
        })
        .catch((error) => {
          console.error('error',error);
        });
    },
    async addToCurrent(theEntry) {
      if(this.isNumberActive(theEntry.number)) return;

      await fetch(targetServer.get()+'currentEntries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ number: theEntry.number }),
        });
      this.loadData();
    },
    async removeFromCurrent(theEntry) {
      await fetch(targetServer.get()+'currentEntries/'+theEntry.id, {
          method: 'DELETE'
        });
      this.loadData();
    }
  }
};
</script>
