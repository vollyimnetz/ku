<template>
  <div class="controllroom">
    <section class="numberpadWrap">
      <h2>Markiere fertige Bestellungen</h2>
      <div class="numberpad">
        <button type="button" v-for="i in allowedValues" :key="i.number" @click="addToCurrent(i)" :class="{'active':isNumberActive(i.number)}">{{i.number}}</button>
      </div>
    </section>

    <section class="currentValuesWrap">
      <h2>Bereit zum Abholen</h2>
      <div class="currentValues">
        <button v-for="entry in currentValues" :key="entry.id" @click="removeFromCurrent(entry)">
          {{entry.number}}
        </button>
      </div>
    </section>

    <div class="topMenu dark">
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
  data: () => ({
    currentValues : [],
    continueRefresh: true,
    intervalObject: null,
    intervalDuration: 5000,
    maxNumber: 48,
  }),
  mounted() {
    this.doSetup();
  },
  beforeUnmount() {
    this.tearDown();
  },
  computed: {
    allowedValues() {
      let result = [];
      for(let i=1; i<=48; i++) {
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
      console.log('clearInterval controllroom');
      if(this.intervalObject) clearInterval(this.intervalObject);
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


<style lang="scss">
.controllroom { position: absolute; background: #fff; left:0; top:0; width: 100%; height: 100%; z-index: 2;
  --totalEntries:48;
  --entriesPerRow:6;

  --gapWidth:5px;
  --fontSize: 6vw;
  --borderRadius:.1em;
  @media (min-aspect-ratio: 1/3) {
    --entriesPerRow:6;
  }

  @media (min-aspect-ratio: 1/2) {
    --entriesPerRow:8;
    --fontSize: 6vw;
  }

  @media (min-aspect-ratio: 3/2) {
    --entriesPerRow:12;
    --fontSize: 3vw;
  }

  @media(max-width: 600px) {
    --fontSizeHeadline: 20px;
  }

  .numberpadWrap { padding: var(--gapWidth); display: flex; flex-direction: column; height: 75vh;
    h2 { font-size:var(--fontSizeHeadline); font-weight: normal; margin:0; color: #aaa; margin-bottom: .5em; }

    .numberpad { display:flex; flex-wrap:wrap; gap: var(--gapWidth); flex-grow: 1;
      &>button { width: calc((100% / var(--entriesPerRow)) - (var(--gapWidth) - var(--gapWidth) / var(--entriesPerRow))); text-align: center; line-height: 1; padding:0; background: #f0f0f0; display: block; border:none; border-radius:var(--borderRadius); font-size: var(--fontSize); overflow: hidden;}
      &>button.active { background: red; color:#fff; }
    }
  }

  .currentValuesWrap { padding: var(--gapWidth); display: flex; flex-direction: column; height: 25vh; background: rgba(var(--colorGreen),0.3);
    --colorGreen: 0, 144, 0;
    h2 { font-size:var(--fontSizeHeadline); font-weight: normal; margin:0; color: #aaa; margin-bottom: .5em; color: rgba(var(--colorGreen),1); }
    .currentValues { display:flex; flex-wrap:wrap; gap: var(--gapWidth); flex-grow: 1;
      &>button { width: calc((100% / var(--entriesPerRow)) - (var(--gapWidth) - var(--gapWidth) / var(--entriesPerRow))); text-align: center; line-height: 1; padding:0; background: #fff; display: block; border:none; border-radius:var(--borderRadius); font-size: var(--fontSize); }
    }
  }
  button.removeButton { position: absolute; top: -10%; right: -10%; background: #999; padding: 2%; font-size: 45%; line-height: 45%; border: 0; width: 45%; height: 45%; color: #fff }
}




</style>