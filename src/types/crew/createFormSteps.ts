import z from 'zod';
import { FormDataSchema } from '@/app/service/crew/create/schema';
import { UseFormReturn } from 'react-hook-form';

export type Inputs = z.infer<typeof FormDataSchema>;

export type StepProps = {
  formMethods: UseFormReturn<Inputs>;
  setIsStepValid: React.Dispatch<React.SetStateAction<boolean>>;
  setIconImage?: React.Dispatch<React.SetStateAction<File | null>>;
};
