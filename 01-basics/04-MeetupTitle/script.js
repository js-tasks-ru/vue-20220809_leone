import { createApp } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

// Требуется создать Vue приложение
const app = createApp({
  data() {
    return {
      meetupTitle: '',
      selected: null,
    };
  },

  watch: {
    selected: {
      handler(meetupId) {
        fetchMeetupById(meetupId).then((res) => (this.meetupTitle = res.title));
      },
    },
  },

});

app.mount('#app');
