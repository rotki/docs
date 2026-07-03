<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

interface Plan {
  price: string;
}

interface Tier {
  name: string;
  referrer_reward_percentage: number;
  monthly_plan: Plan;
  yearly_plan: Plan;
}

interface ReferralProgram {
  referee_discount_percentage: string;
  tiers: Tier[];
}

const { endpoint = 'https://rotki.com/webapi/2/referral/program' } = defineProps<{
  endpoint?: string;
}>();

const data = ref<ReferralProgram>();
const loading = ref(true);
const error = ref(false);

const tiers = computed(() => {
  if (!data.value)
    return [];

  return [...data.value.tiers].sort(
    (a, b) => Number(a.monthly_plan.price) - Number(b.monthly_plan.price),
  );
});

const hasTiers = computed(() => tiers.value.length > 0);

const refereeDiscount = computed(() => {
  if (!data.value)
    return '';

  return formatPercentage(data.value.referee_discount_percentage);
});

function formatPercentage(value: string | number): string {
  return `${Number(value)}%`;
}

function reward(price: string, percentage: number): string {
  return `${(Number(price) * (percentage / 100)).toFixed(2)}€`;
}

onMounted(async () => {
  try {
    const response = await fetch(endpoint);
    if (!response.ok)
      throw new Error(`Request failed with status ${response.status}`);

    data.value = await response.json();
  }
  catch {
    error.value = true;
  }
  finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="referral-table">
    <p
      v-if="loading"
      class="referral-table__status"
    >
      Loading current rates&hellip;
    </p>

    <div
      v-else-if="error || !hasTiers"
      class="referral-table__empty"
    >
      <p class="referral-table__empty-title">
        Current rates couldn't be loaded
      </p>
      <p class="referral-table__empty-body">
        The live rates aren't available right now. You can always see the exact
        discount and reward on your
        <a href="https://rotki.com/home/subscription">subscription page</a>,
        where they're shown at the point they apply.
      </p>
    </div>

    <template v-else>
      <p class="referral-table__caption">
        People who use your code get <strong>{{ refereeDiscount }}</strong> off
        their first subscription payment. Here is the account credit you earn
        when they subscribe:
      </p>
      <div class="referral-table__wrap">
        <table>
          <thead>
            <tr>
              <th>Plan</th>
              <th>Monthly earn</th>
              <th>Yearly earn</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="tier in tiers"
              :key="tier.name"
            >
              <td>{{ tier.name }}</td>
              <td>{{ reward(tier.monthly_plan.price, tier.referrer_reward_percentage) }}</td>
              <td>{{ reward(tier.yearly_plan.price, tier.referrer_reward_percentage) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="referral-table__note">
        Rates are pulled live from rotki and may change. You earn a percentage
        of what the referred person pays, added to your account credit.
      </p>
    </template>
  </div>
</template>

<style scoped>
.referral-table__status,
.referral-table__caption {
  margin-top: 1rem;
}

.referral-table__wrap {
  margin: 1rem 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: auto;
}

.referral-table__wrap table {
  display: table;
  width: 100%;
  margin: 0;
}

.referral-table__wrap tr:first-child th {
  border-top: none;
}

.referral-table__wrap th:first-child,
.referral-table__wrap td:first-child {
  border-left: none;
}

.referral-table__wrap th:last-child,
.referral-table__wrap td:last-child {
  border-right: none;
}

.referral-table th:not(:first-child),
.referral-table td:not(:first-child) {
  text-align: right;
}

.referral-table__note {
  font-size: 0.85em;
  opacity: 0.75;
}

.referral-table__empty {
  margin-top: 1rem;
  padding: 1rem 1.25rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
}

.referral-table__empty-title {
  margin: 0 0 0.25rem;
  font-weight: 600;
}

.referral-table__empty-body {
  margin: 0;
  font-size: 0.9em;
  color: var(--vp-c-text-2);
}
</style>
