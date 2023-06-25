<template>
  <div class="calendar-view">
    <div class="calendar-view__controls">
      <div class="calendar-view__controls-inner">
        <button class="calendar-view__control-left" type="button" aria-label="Previous month" @click="getFirstDateOfPreviousMonth"></button>
        <div class="calendar-view__date">{{ title }}</div>
        <button class="calendar-view__control-right" type="button" aria-label="Next month" @click="getFirstDateOfNextMonth"></button>
      </div>
    </div>

    <div class="calendar-view__grid">
      <div v-for="day in days" class="calendar-view__cell" :class="{ 'calendar-view__cell_inactive': !day.isCurrentMonth}" tabindex="0">
        <div class="calendar-view__cell-day">{{ day.date }}</div>
        <div class="calendar-view__cell-content">
          <a v-for="meetup in day.meetups" :href="`/meetups/${meetup.id}`" class="calendar-event">{{ meetup.title }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeetupsCalendar',

  data() {
    return {
      currentDate: new Date(),
      days: this.getDaysForCalendarPage(this.currentDate),
    };
  },

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  computed: {
    title() {
      return this.currentDate.toLocaleDateString(navigator.language, {
        month: 'long',
        year: 'numeric',
      });
    }
  },

  methods: {
    getFirstDateOfMonth(date) {
      if(!date) {
        date = new Date();
      }
      const dayMilliseconds = 24*60*60*1000;
      const firstDate = new Date(new Date().setTime(date.getTime() - dayMilliseconds * (date.getDate() - 1)));
      const year = firstDate.getFullYear();
      const month = firstDate.getMonth();
      return new Date(year, month, 1);
    },

    getLastDateOfMonth(date) {
      if(!date) {
        date = new Date();
      }
      const year = date.getFullYear();
      const month = date.getMonth();
      return new Date(year, month + 1, 0);
    },

    getFirstDateOfNextMonth() {
      let year = this.currentDate.getFullYear();
      let month = this.currentDate.getMonth() + 1;

      if(month >= 12) {
        year += 1;
        month = 0;
      }
      this.currentDate = this.getFirstDateOfMonth(new Date(year, month, 1));
      this.days = this.getDaysForCalendarPage(this.currentDate);
    },

    getFirstDateOfPreviousMonth() {
      let year = this.currentDate.getFullYear();
      let month = this.currentDate.getMonth();

      if (month === 0) {
        year -= 1;
        month = 12;
      }
      this.currentDate = this.getFirstDateOfMonth(new Date(year, month, 0));
      this.days = this.getDaysForCalendarPage(this.currentDate);
    },

    getDaysForCalendarPage(date) {
      if(!date) {
        date = new Date();
      }
      const dayMilliseconds = 24*60*60*1000;
      const days = [];

      // получим первое и последнее число месяца
      const firstDayOfMonth = this.getFirstDateOfMonth(date);
      const lastDayOfMonth = this.getLastDateOfMonth(date);

      // положим в массив числа предыдущего месяца
      for(let i=firstDayOfMonth.getDay() - 1; i>0; i--) {
        const calcDate = new Date().setTime(firstDayOfMonth.getTime() - dayMilliseconds * i);
        days.push(this.fillCalendarDate(calcDate, false));
      }

      // положим в массив числа текущего месяца
      for(let i=0; i<lastDayOfMonth.getDate(); i++) {
        const calcDate = new Date().setTime(firstDayOfMonth.getTime() + dayMilliseconds * i);
        days.push(this.fillCalendarDate(calcDate, true));
      }

      // положим в массив числа следующего месяца
      if(lastDayOfMonth.getDay() > 0) {
        for(let i=lastDayOfMonth.getDay() + 1, j=0; i<8; i++, j++) {
          const calcDate = new Date(new Date().setTime(firstDayOfMonth.getTime() + dayMilliseconds * (lastDayOfMonth.getDate() + j)));
          days.push(this.fillCalendarDate(calcDate, false));
        }
      }

      return days;
    },

    fillCalendarDate(date, isCurrentMonth) {
      const dateMeetups = [];
      date = new Date(date);

      this.meetups.forEach((meetup) => {
        const meetupDate = new Date(new Date().setTime(meetup.date));

        // сравнение дат без учёта времени и часового пояса
        if(meetupDate.getFullYear() === date.getFullYear() && meetupDate.getMonth() === date.getMonth() && meetupDate.getDate() === date.getDate()) {
          dateMeetups.push(meetup);
        }
      });

      return {
        date: date.getDate(),
        isCurrentMonth: isCurrentMonth,
        meetups: dateMeetups,
      };
    }
  }
};
</script>

<style scoped>
.calendar-view {
}

.calendar-view__controls {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: var(--blue);
  background-color: var(--blue-extra);
  padding: 24px;
  display: flex;
  justify-content: center;
}

.calendar-view__controls-inner {
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}

.calendar-view__controls-inner button {
  border: none;
  padding: 0;
}

.calendar-view__control-left,
.calendar-view__control-right {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
  background: url('@/assets/icons/icon-pill-active.svg') left center no-repeat;
  background-size: cover;
}

.calendar-view__control-left:hover,
.calendar-view__control-right:hover {
  opacity: 0.8;
}

.calendar-view__control-right {
  transform: rotate(180deg);
}

.calendar-view__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

.calendar-view__grid {
  border: 1px solid var(--grey);
  border-bottom: none;
}

.calendar-view__cell {
  position: relative;
  height: auto;
  padding: 6px 8px;
  background-color: var(--white);
  color: var(--grey-8);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid var(--grey);
  border-left: 1px solid var(--grey);
  text-align: right;
}

.calendar-view__cell.calendar-view__cell_inactive {
  background-color: var(--grey-light);
}

@media all and (max-width: 767px) {
  .calendar-view__cell:nth-child(5n + 1) {
    border-left: none;
  }
}

@media all and (min-width: 767px) {
  .calendar-view__grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .calendar-view__cell {
    height: 144px;
  }

  .calendar-view__cell:nth-child(7n + 1) {
    border-left: none;
  }
}

.calendar-event {
  --max-lines: 2;
  --line-height: 16px;

  display: block;
  text-align: left;
  text-decoration: none;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
  font-weight: 600;
  line-height: var(--line-height);
  color: var(--white);
  padding: 4px 6px;
  border-radius: 2px;
  background-color: var(--blue);
  margin-top: 4px;
}

@media all and (min-width: 767px) {
  .calendar-event {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: calc(var(--max-lines) * var(--line-height) + 6px);
  }
}
</style>
