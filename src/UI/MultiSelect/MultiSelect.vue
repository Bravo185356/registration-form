<template>
  <div @keydown.esc.capture="$emit('setDropMenu', '')" class="multi-select">
    <div tabindex="0" @keydown.enter="toggleOptionMenu" :class="{ 'input-error': isError }" @click.self="toggleOptionMenu" class="selected-groups">
      <div
        class="selected-item"
        tabindex="0"
        v-for="selectedOption in selectedOptions"
        :key="selectedOption"
        @click="removeSelectedOption(selectedOption)"
        @keydown.enter.stop="removeSelectedOption(selectedOption)"
      >
        {{ selectedOption }} X
      </div>
    </div>
    <div v-if="currentOpenDropMenu === selectName" class="select">
      <div
        @keydown.9="changeOptionFocusWithTab"
        @keydown.shift.9="changeOptionFocusWithTab"
        @keydown.down="changeOptionFocusWithArrows"
        @keydown.up="changeOptionFocusWithArrows"
        @click="selectOption(option)"
        @keydown.enter="selectOption(option)"
        tabindex="0"
        class="option"
        :class="{ selected: isSelected(option) }"
        v-for="option in options"
        :key="option"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>
<script>
import "./MultiSelect.scss";
export default {
  props: ["options", "selectedOptions", "selectName", "currentOpenDropMenu", 'isError'],
  emits: ["input", "setDropMenu"],
  methods: {
    removeSelectedOption(removedOption) {
      const filteredOptions = this.selectedOptions.filter((option) => option !== removedOption);
      this.$emit("input", filteredOptions);
    },
    changeOptionFocusWithTab(e) {
      const result = this.checkVisibleOnTabPress(e);
      if (!result) {
        this.$emit("setDropMenu", "");
      }
    },
    toggleOptionMenu() {
      this.$emit("setDropMenu", this.currentOpenDropMenu ? "" : this.selectName);
    },
    isSelected(option) {
      return this.selectedOptions.find((selectedOption) => selectedOption === option);
    },
    checkVisibleOnTabPress(e) {
      // Если нажимаем Tab + Shift
      if (e.shiftKey) {
        const prevElement = document.activeElement.previousElementSibling;
        return !prevElement ? false : true;
      }
      // Если просто Tab
      const nextElement = document.activeElement.nextElementSibling;
      return !nextElement ? false : true;
    },
    selectOption(selectedOption) {
      const isAlreadySelected = this.selectedOptions.find((option) => option === selectedOption);
      let newSelectedOptions = this.selectedOptions;

      if (isAlreadySelected) {
        const filteredOptions = this.selectedOptions.filter((option) => option !== selectedOption);
        newSelectedOptions = filteredOptions;
      } else {
        newSelectedOptions.push(selectedOption);
      }

      this.$emit("input", newSelectedOptions);
    },
    changeOptionFocusWithArrows(e) {
      const currectFocus = document.activeElement;

      if (e.key === "ArrowDown") {
        const nextElement = currectFocus.nextElementSibling;
        if (nextElement) {
          nextElement.focus();
        }
      } else {
        const prevElement = currectFocus.previousElementSibling;
        if (prevElement) {
          prevElement.focus();
        }
      }
    },
  },
  mounted: () => {
    window.addEventListener("keydown", (e) => {
        if ((e.key === "ArrowDown" || e.key === "ArrowUp") && document.activeElement.classList.contains("option")) {
          e.preventDefault();
        }
    }, false);
  },
};
</script>
