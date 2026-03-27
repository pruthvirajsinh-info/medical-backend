# Phase 2: Onboarding System

## Goal
Create a resilient, multi-step onboarding flow for Patients, including personal data, medical history, and doctor selection, with robust draft saving.

## Implementation Steps
1. **Schema Extension**: Added `Patient` and `OnboardingDraft` models to `schema.prisma`.
2. **Backend API**:
   - `POST /onboarding/draft`: Upserts JSON data for the current step.
   - `GET /onboarding/draft`: Retrieves existing draft for seamless resumption.
   - `POST /onboarding/finalize`: Consolidates draft JSON into the strongly typed `Patient` model.
3. **Frontend Architecture**: Built `/onboarding/page.tsx` utilizing a `step` state variable integer.
4. **Draft Persistence Handling**: Hooked `useEffect` to trigger `saveDraft` mutation upon successful validation of each step section before animating to the next.
5. **UI Enhancements**: Integrated Framer Motion (`AnimatePresence`) for fluid horizontal slide transitions between steps. 
6. **Doctor Selection Integration**: Step 3 triggers a query to `GET /doctors` and displays them via radio inputs.

## High-Value Code Patterns
```typescript
// Draft saving pattern
const nextStep = async () => {
  const isValid = await trigger(currentFieldsToValidate);
  if (isValid) {
    await saveDraft({
       [`step${step}Data`]: getValues(),
       currentStep: step + 1
    });
    setStep(s => s + 1);
  }
};
```
