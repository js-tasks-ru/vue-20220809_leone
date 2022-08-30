<template>
      <div class="dropdown" :class="{ dropdown_opened: isOpen }">
        <button
          type="button"
          class="dropdown__toggle"
          :class="{ dropdown__toggle_icon: haveIcon }"
          @click="isOpen = !isOpen"
        >
          <ui-icon v-if="selectedItem && haveIcon && selectedItem?.icon" :icon="selectedItem.icon" class="dropdown__icon" />
          <span> {{ selectedItem ? selectedItem.text : title }} </span>
        </button>
        <div v-show="isOpen" class="dropdown__menu" role="listbox">
          <button
            v-for="item in options"
            class="dropdown__item"
            :class="{ dropdown__item_icon: haveIcon }"
            role="option"
            type="button"
            @click="selectItem(item)"
          >
            <ui-icon v-if="item.icon" :icon="item.icon" class="dropdown__icon" />
            {{ item.text }}
          </button>
        </div>
      </div>
  <select v-show="false" v-model="hiddenValue">
    <option v-for="item in options" :value="item.value">{{ item.text }}</option>
  </select>
</template>

<script>
import UiIcon from './UiIcon';

export default {
  name: 'UiDropdown',

  components: { UiIcon },

  data() {
    return {
      isOpen: false,
      hiddenValue: this.modelValue,
    };
  },

  props: {
    options: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
  },

  emits: ['update:modelValue'],

  computed: {
    selectedItem() {
      return this.options.find((item) => item.value === this.modelValue);
    },
    haveIcon() {
      return this.options.filter((item) => !!item.icon).length ? true : false;
    },
  },

  watch: {
    hiddenValue: {
      handler(newValue) {
        this.$emit('update:modelValue', newValue);
      },
    },
    modelValue: {
      handler(newValue) {
        this.hiddenValue = newValue;
      },
    },
  },

  methods: {
    selectItem(item) {
      this.isOpen = false;
      this.$emit('update:modelValue', item.value);
    },
  },

};
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown__toggle {
  display: inline-block;
  background-color: var(--white);
  background-position: calc(100% - 10px) calc(100% - 10px);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  position: relative;
  padding: 10px 56px 10px 24px;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: initial;
  text-align: center;
  transition-duration: 0.2s;
  transition-property: background-color, fill, color;
  outline: none;
  box-shadow: none;
  cursor: pointer;
  text-decoration: none;
}

.dropdown__toggle:after {
  content: '';
  position: absolute;
  top: 15px;
  right: 16px;
  transform: none;
  background: url('@/assets/icons/icon-chevron-down.svg') no-repeat;
  background-size: cover;
  display: block;
  width: 24px;
  height: 24px;
  transition: 0.2s transform;
}

.dropdown__toggle_icon {
  padding-left: 56px;
}

.dropdown_opened .dropdown__toggle {
  border-color: var(--blue);
  border-bottom-color: transparent;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.dropdown_opened .dropdown__toggle:after {
  transform: rotate(180deg);
}

.dropdown__menu {
  background-clip: padding-box;
  border-radius: 0 0 8px 8px;
  border: 2px solid var(--blue);
  border-top: none;
  bottom: auto;
  display: flex;
  flex-direction: column;
  left: 0;
  margin: 0;
  overflow: hidden;
  padding: 0;
  position: absolute;
  right: auto;
  top: -1px;
  transform: translate3d(0px, 52px, 0px);
  width: 100%;
  will-change: transform;
  z-index: 95;
}

.dropdown__item {
  padding: 8px 16px;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  background-color: var(--white);
  box-shadow: none;
  border: none;
  cursor: pointer;
  text-align: left;
  transition-duration: 0.2s;
  transition-property: background-color, border-color, color;
  outline: none;
  text-decoration: none;
}

.dropdown__item:hover,
.dropdown__item:focus {
  background-color: var(--grey-light);
}

.dropdown__item_icon {
  padding-left: 56px;
  position: relative;
}

.dropdown__item_icon .dropdown__icon,
.dropdown__toggle_icon .dropdown__icon {
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translate(0, -50%);
}
</style>
