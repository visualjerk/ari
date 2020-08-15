<template>
  <div class="p-10">
    <Popover>
      <PopoverDisclosure>
        Open Popover
      </PopoverDisclosure>
      <PopoverContent aria-label="Popover">
        Take a walk in the forest and enjoy sunshine, deers and trees.
      </PopoverContent>
    </Popover>
  </div>
</template>

<script>
import Popover from './Popover.vue'
import PopoverContent from './PopoverContent.vue'
import PopoverDisclosure from './PopoverDisclosure.vue'

export default {
  name: 'App',
  components: {
    Popover,
    PopoverContent,
    PopoverDisclosure,
  },
}
</script>
