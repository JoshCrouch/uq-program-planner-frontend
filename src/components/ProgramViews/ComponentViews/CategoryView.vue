<script setup lang="ts">
/* Vue imports */
import { ref } from 'vue';

/* PrimeVue imports */
import MeterGroup, { type MeterItem } from 'primevue/metergroup';
import { useToast } from 'primevue';

/* View imports */
import SectionView from "./SectionView.vue";
import AddComponent from '../../shared/AddComponent.vue';
import EditMenu from '../../shared/EditMenu.vue'

/* Logic imports */
import {Category} from "../../../consumables/ProgramClasses/ProgramComponents/Category.ts";

/* Props */
const { model, deleteCallback } = defineProps<{
  model: Category;
  deleteCallback: () => void
}>();

/* Toast for notifications */
const toast = useToast();

/* Collapse logic */
const isCollapsed = ref(false);
function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value;
}

function sectionDeleteCallback(sectionId: string) {
  toast.add({
    severity: 'success',
    summary: 'Section Deleted',
    detail: `${model.getSectionById(sectionId)?.getTitle()} has been deleted.` ,
    life: 3000
  });
  model.removeSectionById(sectionId);
}

function editCallback() {
  // Handle edit logic here
  console.log('Edit callback triggered');
}

</script>

<template>
  <div class="program-section">

    <div class="section-header">

      <h2 class="section-title">{{ model.getTitle() }}</h2>

      <div class="section-header-right">

        <span class="course-units">
          <span class="units-number">{{ model.getMinUnits() }}</span>
          <span class="units-label">min</span>
        </span>

        <span class="course-units">
          <span class="units-number">{{ model.getMaxUnits() }}</span>
          <span class="units-label">max</span>
        </span>

        <!-- collapse toggle styled as badge -->
        <span class="collapse-toggle"  @click="toggleCollapse">
          <i
              class="collapse-icon pi pi-chevron-up chevron-icon"
              :class="{ collapsed: isCollapsed }"
          />
        </span>

        <span class="edit-menu">
          <EditMenu :editCallback="editCallback" :deleteCallback="deleteCallback" />
        </span>

      </div>
    </div>

    <!--    <div v-if="sectionInfo.completionStatus" class="section-meter">-->
    <!--      <MeterGroup :value="meterInfo" class="completion-meter"/>-->
    <!--    </div>-->

    <transition name="collapse">
      <div v-show="!isCollapsed" class="collapse-content course-grid">
        <SectionView
          v-for="section in model.getSections()"
          :key="section.getId()"
          :model="section"
          :deleteCallback="() => sectionDeleteCallback(section.getId())"
          />
        <div class="add-course">
          <AddComponent :text="'Add Section'"/>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.program-section {
  border: 1px solid var(--primary-color);
  border-radius: 1.5rem;
  padding: 1rem;
  margin: 1rem 0;

  background-color: var(--surface-color);

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .section-title {
      font-size: var(--bigger-font-size);
      font-weight: bold;
      color: var(--text-color);
    }

    .section-header-right {
      display: flex;
      align-items: center;

      * {
        margin: 0 0.5rem;
      }

      .course-units {
        padding: 0.5rem 0.75rem;
        border-radius: 0.75rem;
        white-space: nowrap;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 4rem;
        height: 4rem;

        cursor: default;

        background-color: var(--primary-color);
        color: white;

        &:hover {
          background-color: var(--primary-color-hover);
        }

        .units-number {
          font-size: var(--bigger-font-size);
          font-weight: bold;
          line-height: 1;
        }

        .units-label {
          font-size: var(--small-font-size);
          opacity: 0.9;
          margin-top: 0.1rem;
        }
      }

      .collapse-toggle {
        display: flex;
        width: 4rem;
        height: 4rem;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        border-radius: 0.75rem;
        color: var(--primary-text-color);

        transition: background-color var(--colour-transition-time) ease-in-out;

        &:hover {
          background-color: var(--surface-light-color-alt);
        }
      }

      .edit-menu {
        display: flex;
        width: 4rem;
        height: 4rem;
        border-radius: 0.75rem;
      }
    }
  }

  .section-meter {
    .completion-meter {
      padding: 1rem 0;
    }
  }
}

.course-grid {
  display: grid;
  grid-template-columns: 1fr;
}

/* Collapse transition styles */
.collapse-content {
  overflow: hidden;
  padding-top: 1rem;
}
.collapse-enter-active, .collapse-leave-active {
  transition: max-height 0.3s ease-in-out, opacity var(--colour-transition-time) ease-in-out;
}
.collapse-enter-from, .collapse-leave-to {
  max-height: 0;
}
.collapse-enter-to, .collapse-leave-from {
  max-height: 1000px;
}

/* Chevron rotation */
.chevron-icon {
  display: inline-block;
  transform-origin: center;
  transition: transform 0.3s ease-in-out;
}
.chevron-icon.collapsed {
  transform: rotate(180deg);
}

.collapse-toggle:hover .chevron-icon {
  transform: scale(1.1);
}

.collapse-toggle:hover .chevron-icon.collapsed {
  transform: rotate(180deg) scale(1.1);
}
</style>