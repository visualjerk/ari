<template>
  <div class="p-10">
    <Composite v-bind="compositeState">
      <CompositeItem v-bind="compositeState" @click="shout">
        Foo
      </CompositeItem>
      <CompositeItem v-bind="compositeState">Bar</CompositeItem>
      <CompositeItem v-bind="compositeState">Baz</CompositeItem>
    </Composite>
  </div>
</template>

<script>
import { useCompositeState, CompositeItem, Composite } from 'vue-ari'

export default {
  name: 'App',
  components: {
    CompositeItem,
    Composite,
  },
  setup() {
    return {
      compositeState: useCompositeState(),
      shout: function () {
        alert('hey')
      },
    }
  },
}
</script>
