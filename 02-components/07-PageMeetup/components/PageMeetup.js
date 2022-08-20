import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from '../meetupService.js';
import MeetupView from "../../06-MeetupView/components/MeetupView";
import MeetupDescription from "../../02-MeetupDescription/components/MeetupDescription";
import MeetupCover from "../../03-MeetupCover/components/MeetupCover";
import MeetupInfo from "../../04-MeetupInfo/components/MeetupInfo";
import MeetupAgendaItem from "../../05-MeetupAgenda/components/MeetupAgendaItem";
import MeetupAgenda from "../../05-MeetupAgenda/components/MeetupAgenda";


export default defineComponent({
  name: 'PageMeetup',

  data() {
    return {
      meetup: undefined,
      errorMessage: undefined,
    };
  },

  components: {
    UiAlert,
    UiContainer,
    MeetupDescription,
    MeetupCover,
    MeetupInfo,
    MeetupAgendaItem,
    MeetupAgenda,
    MeetupView,
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    }
  },

  watch: {
    meetupId: {
      immediate: true,
      handler(newValue) {
        this.meetup = undefined;
        this.errorMessage = undefined;
        fetchMeetupById(newValue)
          .then((res) => {
            this.meetup = res;
          })
          .catch((error) => {
            this.errorMessage = error.message;
          });
      },
    },
  },

  template: `
    <div class="page-meetup">
      <!-- meetup view -->
      <meetup-view v-if="meetup" :meetup="meetup" />

      <UiContainer v-if="!meetup && !errorMessage">
        <UiAlert>Загрузка...</UiAlert>
      </UiContainer>

      <UiContainer v-if="errorMessage">
        <UiAlert> {{ this.errorMessage }} </UiAlert>
      </UiContainer>
    </div>`,
});
