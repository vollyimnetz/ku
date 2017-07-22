<template>
  <div id="app">
    <controllroom v-if="view==='controll'" @close="setView(null)"></controllroom>
    <monitor v-if="view==='monitor'" @close="setView(null)"></monitor>
    <div v-if="view===null" class="appOverview text-center">
      <button type="button" class="btn btn-primary btn-lg" @click="setView('controll')">zum Kontrollraum</button>
      <button type="button" class="btn btn-primary btn-lg" @click="setView('monitor')">zum Monitor</button>
    </div>
  </div>
</template>

<script>
import Monitor from './components/Monitor';
import Controllroom from './components/Controllroom';

export default {
  name: 'app',
  components: {
    'monitor':Monitor,
    'controllroom':Controllroom
  },
  data: function() {
    return {
      view:null
    }
  },
  methods: {
    setView : function(view) {
      this.view = view;
    }
  }
}
</script>
