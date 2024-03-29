<script lang="ts">
import { defineComponent, Transition } from 'vue'
import { Modal, ModalBackdrop, ModalDisclosure, useModalState } from 'vue-ari'

export default defineComponent({
  name: 'App',
  components: {
    Modal,
    ModalBackdrop,
    ModalDisclosure,
    Transition,
  },
  setup() {
    const modal = useModalState()

    return {
      modal,
    }
  },
})
</script>

<template>
  <ModalDisclosure v-bind="modal" class="button">Create Ticket</ModalDisclosure>
  <Transition name="fade">
    <ModalBackdrop v-bind="modal" class="modal-backdrop">
      <Transition name="fade">
        <Modal v-bind="modal" class="modal">
          <form class="stack">
            <h2>Create New Ticket</h2>
            <div class="form-item">
              <label for="name">Name</label>
              <input id="name" name="name" autocomplete="off" />
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
      </Transition>
    </ModalBackdrop>
  </Transition>
</template>

<style>
:root {
  --space-0: 0.25rem;
  --space-1: 0.4rem;
  --space-2: 0.7rem;
  --space-3: 1rem;
  --space-4: 1.5rem;
  --space-5: 2rem;
  --space-6: 4rem;
  --space-7: 6rem;

  --font-size-sm: 0.85rem;

  --font-weight-md: 500;
  --font-weight-lg: 600;

  --letter-spacing-md: 0.03em;

  --radius-base: var(--space-1);

  --color-brand-h: 256;
  --color-brand-s: 57%;
  --color-brand-l: 46%;

  --color-brand: hsl(
    var(--color-brand-h),
    var(--color-brand-s),
    var(--color-brand-l)
  );

  --color-secondary-h: 195;
  --color-secondary-s: 40%;
  --color-secondary-l: 46%;

  --color-secondary: hsl(
    var(--color-secondary-h),
    var(--color-secondary-s),
    var(--color-secondary-l)
  );

  --color-brand-alt: hsl(var(--color-brand-h), var(--color-brand-s), 50%);
  --color-brand-inverse: hsl(var(--color-brand-h), var(--color-brand-s), 95%);
  --color-text: hsl(var(--color-brand-h), 12%, 14%);
  --color-border: hsl(var(--color-brand-h), 14%, 80%);
  --color-border-active: hsl(var(--color-brand-h), var(--color-brand-s), 60%);
  --color-border-focus: hsl(var(--color-brand-h), var(--color-brand-s), 78%);
  --color-surface: hsl(var(--color-brand-h), 10%, 96%);
  --color-surface-alt: hsl(var(--color-brand-h), 10%, 99%);
  --color-surface-dark: hsl(var(--color-brand-h), 10%, 92%);
  --color-surface-dark-alt: hsl(var(--color-brand-h), 10%, 89%);
  --color-backdrop: hsla(var(--color-brand-h), 14%, 10%, 0.9);
}

body {
  padding: var(--space-4);
  font-family: system-ui, sans-serif;
  color: var(--color-text);
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: var(--font-weight-lg);
  color: var(--color-brand);
}

.button {
  -webkit-appearance: none;
  -moz-appearance: none;
  border: 0;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-base);
  font-size: 1rem;
  text-transform: capitalize;
  letter-spacing: var(--letter-spacing-md);
  cursor: pointer;
  background-color: var(--color-surface-dark);
  color: var(--color-text);
}

.button:hover {
  background-color: var(--color-surface-dark-alt);
}

.button:focus-visible {
  outline: var(--color-border-focus) solid var(--space-0);
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
  backdrop-filter: blur(2px);
}

.modal {
  width: 100%;
  max-width: 50ch;
  max-height: 80vh;
  overflow: auto;
  padding: var(--space-5);
  background-color: var(--color-surface);
  border-radius: var(--radius-base);
  border: 1px solid var(--color-surface-alt);
  box-shadow: var(--color-backdrop) 0 1rem 2rem;
}

.stack {
  display: grid;
  gap: var(--space-4);
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

label {
  padding-left: var(--space-1);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-md);
}

input,
textarea {
  padding: var(--space-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-base);
  background-color: var(--color-surface);
  transition: background-color 0.3s ease;
}

input:focus,
textarea:focus {
  outline: var(--color-border-focus) solid var(--space-0);
  border-color: var(--color-border-active);
  background-color: var(--color-surface-alt);
}

textarea {
  resize: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
