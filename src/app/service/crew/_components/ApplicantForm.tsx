import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import useBottomSheetStore from '@/store/crew/bottomSheetStore';
import postCrewApply from '../[id]/api/postCrewApply';

interface FormValues {
  textInput: string;
}

function ApplicantForm({ id }: { id: number }) {
  const { register, handleSubmit } = useForm<FormValues>();
  const [textInputValue, setTextInputValue] = useState('');
  const { setIsSheetOpen } = useBottomSheetStore();

  const onSubmit: SubmitHandler<FormValues> = async data => {
    try {
      await postCrewApply(id, data.textInput);
      setIsSheetOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextInputValue(e.target.value);
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          {...register('textInput', { required: true })}
          className="flex w-full bg-white p-[14px] rounded-[10px] border border-gray-200 bg-background ring-offset-background placeholder:text-grey-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={textInputValue}
          rows={5}
          onChange={handleInputChange}
          placeholder="답변을 작성해 주세요"
        />

        <button
          type="submit"
          className="block flex mt-[40px] justify-center items-center h-[42px] w-full bg-violet-500 text-white font-semibold rounded-full"
        >
          가입 신청하기
        </button>
      </form>
    </div>
  );
}

export default ApplicantForm;
