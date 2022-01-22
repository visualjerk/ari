<script>
import { Modal, ModalBackdrop, ModalDisclosure, useModalState } from 'vue-ari'

export default {
  name: 'App',
  components: {
    Modal,
    ModalBackdrop,
    ModalDisclosure,
  },
  setup() {
    const modal = useModalState()
    modal.show()
    return {
      modal,
    }
  },
}
</script>

<template>
  <ModalDisclosure v-bind="modal" class="button">Open Modal</ModalDisclosure>
  <ModalBackdrop v-bind="modal" class="modal-backdrop">
    <Modal v-bind="modal" class="modal">
      <form>
        <h2>Create New Ticket</h2>
        <div class="form-item">
          <label for="name">Name</label>
          <input id="name" name="name" />
        </div>
        <div class="form-item">
          <label for="description">Description</label>
          <textarea id="description" name="description" rows="5"></textarea>
        </div>
        <div class="form-actions">
          <button class="button button--primary" type="submit">
            Create Ticket
          </button>
          <button class="button" type="button" @click="modal.hide">
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  </ModalBackdrop>
</template>

<style>
:root {
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 1rem;
  --space-4: 1.5rem;
  --space-5: 2rem;
  --space-6: 4rem;
  --space-7: 6rem;

  --radius-sm: var(--space-1);
  --radius-base: var(--space-2);

  --color-brand-h: 256;
  --color-brand-s: 57%;
  --color-brand-l: 46%;

  --color-brand: hsl(
    var(--color-brand-h),
    var(--color-brand-s),
    var(--color-brand-l)
  );

  --color-brand-alt: hsl(var(--color-brand-h), var(--color-brand-s), 50%);
  --color-brand-inverse: hsl(var(--color-brand-h), var(--color-brand-s), 95%);
  --color-text: hsl(var(--color-brand-h), 12%, 14%);
  --color-border: hsl(var(--color-brand-h), 14%, 80%);
  --color-surface: hsl(var(--color-brand-h), 10%, 97%);
  --color-surface-alt: hsl(var(--color-brand-h), 10%, 99%);
  --color-backdrop: hsla(var(--color-brand-h), 14%, 10%, 0.9);
}

body {
  padding: var(--space-4);
  font-family: 'system-ui', sans-serif;
  color: var(--color-text);
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button {
  -webkit-appearance: none;
  -moz-appearance: none;
  border: 0;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-sm);
  font-size: 1rem;
  cursor: pointer;
}

.button--primary {
  background-color: var(--color-brand);
  color: var(--color-brand-inverse);
}

.button--primary:hover {
  background-color: var(--color-brand-alt);
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: var(--space-4);
  background-color: var(--color-backdrop);
}

.modal {
  width: 100%;
  max-width: 50ch;
  max-height: 80vh;
  overflow: auto;
  padding: var(--space-4);
  background-color: var(--color-surface);
  border-radius: var(--radius-base);
  box-shadow: var(--color-backdrop) 0 1rem 2rem;
}

form {
  display: grid;
  gap: var(--space-3);
}

.form-item {
  display: grid;
  gap: var(--space-1);
}

.form-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-2);
}

input,
textarea {
  padding: var(--space-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background-color: var(--color-surface-alt);
}

textarea {
  resize: none;
}
</style>
