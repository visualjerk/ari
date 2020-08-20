<template>
  <div class="p-10">
    <Popover>
      <PopoverDisclosure class="mr-4">Open Popover</PopoverDisclosure>
      <PopoverContent
        aria-label="Popover"
      >Take a walk in the forest and enjoy sunshine, deers and trees.</PopoverContent>
    </Popover>
    <Modal>
      <ModalDisclosure>Open Modal</ModalDisclosure>
      <ModalContent
        aria-label="Modal"
      >Take a walk in the forest and enjoy sunshine, deers and trees.</ModalContent>
    </Modal>
  </div>
</template>

<script>
import Popover from './Popover.vue'
import PopoverContent from './PopoverContent.vue'
import PopoverDisclosure from './PopoverDisclosure.vue'

import Modal from './Modal.vue'
import ModalContent from './ModalContent.vue'
import ModalDisclosure from './ModalDisclosure.vue'

export default {
  name: 'App',
  components: {
    Popover,
    PopoverContent,
    PopoverDisclosure,
    Modal,
    ModalContent,
    ModalDisclosure,
  },
}
</script>
