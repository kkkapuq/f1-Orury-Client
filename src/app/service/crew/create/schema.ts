import { z } from 'zod';

export const FormDataSchema = z.object({
  name: z.string().min(3, '필수 입력사항입니다.').max(15),
  description: z.string().min(1, '필수 입력사항입니다.'),
  tags: z
    .array(z.string())
    .min(1, '최소 1개의 태그를 선택해주세요.')
    .max(3, '최대 3개의 태그를 선택할 수 있습니다.'),
  regions: z
    .array(z.string())
    .min(1, '최소 1개 이상의 지역을 선택해주세요.')
    .max(3, '최대 3개까지 지역을 선택할 수 있습니다.'),
  min_age: z.number().min(12).nullable(),
  max_age: z.number().max(100).nullable(),
  gender: z.string().min(1, '필수 입력사항입니다.'),
  capacity: z.number().min(2).max(50),
  permission_required: z.boolean(),
  question: z.string(),
  answer_required: z.boolean(),
});

export type FormData = z.infer<typeof FormDataSchema>;
