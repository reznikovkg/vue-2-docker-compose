<template>
  <div class="object-comparator">
    <div class="toggle">
      <label>
        <input
          type="checkbox"
          :checked="showUnchanged"
          @change="toggleUnchanged"
        />
        Показать поля без изменений
      </label>
    </div>
    <div class="comparator">
      <div class="left">
        <h3>Исходный объект</h3>
        <ul>
          <li
            v-for="(value, key) in filteredOriginal"
            :key="key"
            :class="getOriginalClass(key)"
          >
            {{ key }}: {{ value }}
          </li>
        </ul>
      </div>
      <div class="right">
        <h3>Новый объект</h3>
        <ul>
          <li
            v-for="(value, key) in filteredUpdated"
            :key="key"
            :class="getUpdatedClass(key)"
          >
            {{ key }}: {{ value }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    original: {
      type: Object,
      required: true,
    },
    updated: {
      type: Object,
      required: true,
    },
    exceptions: {
      type: Object,
      default: () => ({}),
    },
    showUnchanged: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    filteredOriginal() {
      return this.filterExceptions(this.original);
    },
    filteredUpdated() {
      return this.filterExceptions(this.updated);
    },
  },
  methods: {
    filterExceptions(obj) {
      return Object.fromEntries(
        Object.entries(obj).filter(([key]) => !this.exceptions[key]),
      );
    },
    getOriginalClass(key) {
      if (!(key in this.updated)) return "removed";
      if (this.original[key] !== this.updated[key]) return "changed";
      return this.showUnchanged ? "unchanged" : "hidden";
    },
    getUpdatedClass(key) {
      if (key in this.original) {
        if (this.original[key] !== this.updated[key]) return "changed";
      } else {
        return "added";
      }
      return this.showUnchanged ? "unchanged" : "hidden";
    },
    toggleUnchanged() {
      this.$emit("update:showUnchanged", !this.showUnchanged);
    },
  },
};
</script>

<style scoped>
.object-comparator {
  display: flex;
  flex-direction: column;
}

.toggle {
  margin-bottom: 20px;
}

.comparator {
  display: flex;
}

.left,
.right {
  width: 50%;
  padding: 10px;
  border: 1px solid #ccc;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 5px 0;
}

.added {
  color: green;
}

.removed {
  color: red;
}

.changed {
  background-color: yellow;
}

.unchanged {
  color: gray;
}

.hidden {
  display: none;
}
</style>
