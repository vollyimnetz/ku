<template>
  <card class="text-center">
    <h3 class="mb-4">Seite konnte nicht gefunden werden</h3>

    <div class="links">
      <router-link :to="'/'">
        Zur Startseite
      </router-link>
    </div>
  </card>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>
