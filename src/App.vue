<template>
  <router-view></router-view>
</template>

<script>
</script>

<style lang="scss">
html, body { margin:0; padding:0; width: 100%; overflow: hidden; }
body {
  font-family: Fira Sans, Arial, sans-serif;
  --colorMain: 59, 159, 97;
}
svg { width: 1em; height: 1em; }

.topMenu { position: absolute; top:0; right: 0;
  .button { background: transparent; opacity: .3; border:none; padding: 5px; line-height: 20px;
    svg { width: 20px; height: 20px; }
    svg path { fill: currentColor; }
  }
  &.dark .button { color:#000; }

}

.button { background-color: rgba(var(--colorMain), 1); border-radius: .3em; color:#fff; display: inline-block; text-decoration: none; padding: 1em 2em; font-size: 2em; border: 0; transition: background-color .5s ease;
  &:hover { background-color: rgba(var(--colorMain), .9); }
}
</style>