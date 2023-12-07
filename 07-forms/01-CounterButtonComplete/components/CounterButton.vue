<template>
  <button @click="increment">{{ count }}</button>
</template>
<script>
export default {
  name: 'CounterButton',
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      clickCount: 0
    };
  },
  methods: {
    increment() {
      this.clickCount++;
      if (this.clickCount >= 3) {
        this.$emit('update:count', this.count + 3);
        this.clickCount = 0;
      } else {
        this.$emit('update:count', this.count + 1);
      }
    }
  }
};
</script>
