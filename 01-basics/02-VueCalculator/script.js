import { createApp } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение
const app = createApp({
  data() {
    return {
      mode: '',
      numberOne: 0,
      numberTwo: 0,
    };
  },
  computed: {
    calculateResult() {
      return this.mode === 'sum' ? this.numberOne + this.numberTwo :
        this.mode === 'subtract' ? this.numberOne - this.numberTwo :
        this.mode === 'multiply' ? this.numberOne * this.numberTwo :
        this.mode === 'divide' ? this.numberOne / this.numberTwo :
          0;
    },
  },
});

app.mount('#app');
