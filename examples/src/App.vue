<template>
  <div class="p-10">
    <button @click="reverse">reverse</button>
    <Composite
      v-bind="compositeState"
      class="focus:outline-none flex gap-2 group"
    >
      <CompositeItem
        v-bind="compositeState"
        v-for="option in options"
        :key="option"
        as="button"
        #="slotProps"
      >
        <div
          class="font-bold py-2 px-4 rounded"
          :class="[
            slotProps['aria-selected']
              ? 'text-white bg-blue-600 group-focus:shadow-outline'
              : 'text-blue-800 bg-blue-100',
          ]"
        >
          {{ option }}
        </div>
      </CompositeItem>
    </Composite>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useCompositeState, CompositeItem, Composite } from 'vue-ari'

export default defineComponent({
  name: 'App',
  components: {
    CompositeItem,
    Composite,
  },
  setup() {
    const options = ref(['Foo', 'Bar', 'Baz', 'Bauz'])

    function reverse() {
      options.value.reverse()
    }

    return {
      reverse,
      options,
      compositeState: useCompositeState(),
    }
  },
})
</script>
