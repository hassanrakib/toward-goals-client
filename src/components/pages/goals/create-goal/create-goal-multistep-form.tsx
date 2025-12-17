"use client"

import { Center, Steps } from "@chakra-ui/react"
import { useState } from "react"
import GoalForm from "./goal-form"
import ActivitiesForm from "./activities-form"


const CreateGoalMultiStepForm = () => {
  const [step, setStep] = useState(0)

  const goToNextStep = () => {
    setStep(step + 1);
  };

  return (
    <Center maxW="xl" mx="auto">
      <Steps.Root
        step={step}
        onStepChange={(e) => setStep(e.step)}
        count={steps.length}
      >
        <Steps.List>
          {steps.map((step, index) => (
            <Steps.Item key={index} index={index} title={step.title}>
              <Steps.Indicator />
              <Steps.Title>{step.title}</Steps.Title>
              <Steps.Separator />
            </Steps.Item>
          ))}
        </Steps.List>

        <Steps.Content index={0}>
          <GoalForm onSubmit={(data) => {
            console.log("Goal Form Data:", data);
            goToNextStep();
          }} />
        </Steps.Content>
        <Steps.Content index={1}>
          <ActivitiesForm onSubmit={(data) => {
            console.log("Activities Form Data:", data);
            goToNextStep();
          }} />
        </Steps.Content>
        <Steps.Content index={2}>
        </Steps.Content>

        <Steps.CompletedContent>All steps are complete!</Steps.CompletedContent>
      </Steps.Root>
    </Center>
  )
}

const steps = [
  {
    title: "Step 1",
  },
  {
    title: "Step 2",
  },
  {
    title: "Step 3",
  },
]


export default CreateGoalMultiStepForm;
