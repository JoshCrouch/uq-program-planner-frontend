<script setup lang="ts">
// UQ Program Planner Frontend
import CourseCard from './components/CourseCard.vue'

// Sample course data
const sampleCourses = [
  "CSSE1001",
  "CSSE2002",
  "ELEC2300",
  "CSSE3010"
]
</script>

<template>
  <div id="app">
    <h1>UQ Program Planner</h1>
    <p>Welcome to the UQ Program Planner!</p>
    
    <div class="course-grid">
      <CourseCard 
        v-for="course in sampleCourses" 
        :key = "course"
        :courseCode="course"
      />
    </div>
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  color: #2c3e50;
  margin-bottom: 1rem;
  text-align: center;
}

p {
  color: #7f8c8d;
  font-size: 1.1rem;
  text-align: center;
  margin-bottom: 2rem;
}

.course-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .course-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  #app {
    padding: 1rem;
  }
}
</style>00
