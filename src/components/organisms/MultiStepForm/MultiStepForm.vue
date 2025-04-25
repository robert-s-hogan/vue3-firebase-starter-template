// src/components/organisms/MultiStepForm/MultiStepForm.vue
<template>
  <div>
    <ProgressIndicator
      :totalSteps="steps.length"
      :currentStep="currentStepIndex + 1"
    />
    <component
      :is="currentStep.component"
      v-model="formData[currentStep.key]"
    />
    <FormNavigation
      :disableBack="currentStepIndex === 0"
      :disableNext="false"
      @back="back"
      @next="next"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, type Component } from 'vue'
import FormNavigation from '@/components/molecules/FormNavigation/FormNavigation.vue'
import ProgressIndicator from '@/components/molecules/ProgressIndicator/ProgressIndicator.vue'

export interface Step {
  key: string
  title: string
  component: Component
}

interface Props {
  steps: Step[]
  onSubmit: (data: Record<string, unknown>) => void
}
const props = defineProps<Props>()

const currentStepIndex = ref(0)
const formData = ref<Record<string, unknown>>(
  Object.fromEntries(props.steps.map((s) => [s.key, undefined])),
)
const currentStep = computed(() => props.steps[currentStepIndex.value])
const isLastStep = computed(
  () => currentStepIndex.value === props.steps.length - 1,
)

function next() {
  if (isLastStep.value) {
    props.onSubmit({ ...formData.value })
  } else {
    currentStepIndex.value++
  }
}

function back() {
  if (currentStepIndex.value > 0) {
    currentStepIndex.value--
  }
}
</script>
