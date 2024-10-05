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
            v-for="(item, key) in comparisonResult.original"
            :key="key"
            :class="item.class"
          >
            {{ key }}: {{ item.value }}
          </li>
        </ul>
      </div>
      <div class="right">
        <h3>Новый объект</h3>
        <ul>
          <li
            v-for="(item, key) in comparisonResult.updated"
            :key="key"
            :class="item.class"
          >
            {{ key }}: {{ item.value }}
          </li>
          <li
            v-for="(item, key) in comparisonResult.removed"
            :key="'removed-' + key"
            class="removed"
          >
            {{ key }}: {{ item.value }}
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
    comparisonResult() {
      const originalResult = {};
      const updatedResult = {};
      const removedResult = {};

      const compareClasses = (originalClass, updatedClass) => {
        return JSON.stringify(originalClass) === JSON.stringify(updatedClass);
      };

      for (const key in this.original) {
        if (this.exceptions[key]) continue;

        if (key in this.updated) {
          if (!compareClasses(this.original[key], this.updated[key])) {
            originalResult[key] = {
              value: this.original[key],
              class: "changed",
            };
            updatedResult[key] = {
              value: this.updated[key],
              class: "changed",
            };
          } else {
            originalResult[key] = {
              value: this.original[key],
              class: this.showUnchanged ? "unchanged" : "hidden",
            };
            updatedResult[key] = {
              value: this.updated[key],
              class: this.showUnchanged ? "unchanged" : "hidden",
            };
          }
        } else {
          removedResult[key] = {
            value: this.original[key],
            class: "removed",
          };
        }
      }

      for (const key in this.updated) {
        if (this.exceptions[key]) continue;

        if (!(key in this.original)) {
          updatedResult[key] = {
            value: this.updated[key],
            class: "added",
          };
        }
      }

      return {
        original: originalResult,
        updated: updatedResult,
        removed: removedResult,
      };
    },
  },
  methods: {
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
