<template>
  <Layout>
    <div class="pt-8 md:pt-16">
      <div class="flex flex-col items-center">
        <div class="flex flex-col items-center mb-2 text-ui-primary">
          <Logo :width="80" />
          <h2 class="text-3xl text-6xl font-black tracking-tight">ari</h2>
        </div>
        <h1 class="text-4xl text-center lg:text-5xl">Accessible unstyled Vue components</h1>
        <p
          class="text-xl font-medium text-center"
        >Creating a11y compliant Vue components has never been easier.</p>

        <div class="py-4">
          <code class="block px-4 py-1 select-all bg-ui-border text-ui-typo">yarn add vue-ari</code>
        </div>

        <div class="flex justify-center mt-8">
          <g-link
            to="/docs/"
            class="flex items-center px-6 py-4 ml-auto text-2xl font-bold leading-none text-white border rounded-lg shadow-lg bg-ui-primary border-ui-primary transition-all duration-200 ease-out transform hover:shadow-xl hover:-translate-y-1"
          >
            Get started
            <ArrowRightCircleIcon class="ml-4" size="1x" />
          </g-link>
        </div>

        <p class="mt-8 text-center">Open Source. MIT License.</p>
      </div>
    </div>
  </Layout>
</template>

<script>
import Logo from '@/components/Logo'
import { ArrowRightCircleIcon } from 'vue-feather-icons'

export default {
  components: {
    Logo,
    ArrowRightCircleIcon,
  },

  metaInfo() {
    const title = 'Accessible unstyled Vue components'
    const description =
      'Creating a11y compliant Vue components has never been easier.'

    return {
      title: title,
      meta: [
        {
          name: 'description',
          content: description,
        },
        {
          key: 'og:title',
          name: 'og:title',
          content: title,
        },
        {
          key: 'twitter:title',
          name: 'twitter:title',
          content: title,
        },
        {
          key: 'og:description',
          name: 'og:description',
          content: description,
        },
        {
          key: 'twitter:description',
          name: 'twitter:description',
          content: description,
        },
      ],
    }
  },
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
