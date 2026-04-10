<script setup lang="ts">
interface NavCard {
  title: string;
  description: string;
  link: string;
  icon?: string;
}

defineProps<{
  cards: NavCard[];
}>();
</script>

<template>
  <div class="nav-cards">
    <a
      v-for="card in cards"
      :key="card.link"
      :href="card.link"
      class="nav-card"
    >
      <span
        v-if="card.icon"
        class="nav-card-icon"
      >
        {{ card.icon }}
      </span>
      <div class="nav-card-content">
        <h3 class="nav-card-title">{{ card.title }}</h3>
        <p class="nav-card-description">{{ card.description }}</p>
      </div>
    </a>
  </div>
</template>

<style scoped>
.nav-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin: 1.5rem 0;
}

@media (max-width: 640px) {
  .nav-cards {
    grid-template-columns: 1fr;
  }
}

.nav-card {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1.25rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg);
  text-decoration: none;
  color: inherit;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.nav-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.dark .nav-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.nav-card-icon {
  font-size: 1.5rem;
  line-height: 1;
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.nav-card-content {
  min-width: 0;
}

.nav-card-title {
  margin: 0 0 0.25rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  line-height: 1.4;
}

.nav-card-description {
  margin: 0;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}
</style>
