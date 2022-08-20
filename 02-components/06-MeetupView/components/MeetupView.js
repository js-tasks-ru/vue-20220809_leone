import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiAlert from './UiAlert.js';
import UiContainer from './UiContainer.js';
import MeetupDescription from "../../02-MeetupDescription/components/MeetupDescription";
import MeetupCover from "../../03-MeetupCover/components/MeetupCover";
import MeetupInfo from "../../04-MeetupInfo/components/MeetupInfo";
import MeetupAgendaItem from "../../05-MeetupAgenda/components/MeetupAgendaItem";
import MeetupAgenda from "../../05-MeetupAgenda/components/MeetupAgenda";

export default defineComponent({
  name: 'MeetupView',

  components: {
    UiAlert,
    UiContainer,
    MeetupDescription,
    MeetupCover,
    MeetupInfo,
    MeetupAgendaItem,
    MeetupAgenda,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },

  template: `
    <div>
      <!-- meetup cover-->
      <meetup-cover :title="meetup.title" :image="meetup.image" />
      <ui-container>
        <div class="meetup">
          <div class="meetup__content">
            <h3>Описание</h3>
            <!-- meetup description -->
            <meetup-description :description="meetup.description" />
            <h3>Программа</h3>
            <!-- meetup agenda -->
            <meetup-agenda v-if="meetup.agenda.length" :agenda="meetup.agenda"></meetup-agenda>
            <ui-alert v-else>Программа пока пуста...</ui-alert>
          </div>
          <div class="meetup__aside">
            <!-- meetup info -->
            <meetup-info :organizer="meetup.organizer" :place="meetup.place" :date="meetup.date" />
          </div>
        </div>
      </ui-container>
    </div>`,
});
