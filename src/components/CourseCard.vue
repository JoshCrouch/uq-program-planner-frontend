<script setup lang="ts">
import { ref, onMounted } from 'vue'

import Card from 'primevue/card'

export interface Course {
    code: string;
    name: string;
    units: number;
}

const props = defineProps<{ courseCode: string }>();

const course = ref<Course | null>(null);
const loading = ref<boolean>(true);
const error = ref<string | null>(null);

onMounted(async () => {
    
    try {
        const response = await fetch(`/api/course/${props.courseCode}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        course.value = await response.json();
    } catch (err) {
        error.value = err instanceof Error ? err.message : 'An unknown error occurred';
    } finally {
        loading.value = false;
    }
});
</script>

<template>
    <Card class="course-card">
        <template #title>
            <div class="card-header">
                <span class="course-title">{{ course?.name }}</span>
                <span class="course-credits">
                    <span class="credits-number">{{ course?.units }}</span>
                    <span class="credits-label">units</span>
                </span>
            </div>
        </template>
        <template #subtitle>{{ courseCode }}</template>
    </Card>
</template>

<style scoped>
/* Base transition for smooth animations */
.course-card {
    transition: all 0.15s ease-in-out;
}

/* Make the card "pop" on hover, also transition out once hover removed */
.course-card:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
}

/* Card header with title and credits */
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.course-title {
    flex: 1;
    font-weight: bold;
}

.course-credits {
    background: var(--primary-color);
    color: white;
    padding: 0.5rem 0.75rem;
    border-radius: 12px;
    font-weight: 500;
    white-space: nowrap;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    min-width: 60px;
}

.credits-number {
    font-size: 1.5rem;
    font-weight: bold;
    line-height: 1;
}

.credits-label {
    font-size: 0.75rem;
    opacity: 0.9;
    margin-top: 0.1rem;
}

.credits-number {
    font-size: 1.25rem;
    font-weight: 600;
}

.credits-label {
    font-size: 0.75rem;
    font-weight: 400;
    display: block;
}
</style>
