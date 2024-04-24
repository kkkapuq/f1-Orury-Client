'use client';

import { useToast } from '@/app/_components/ui/use-toast';
import { Plus, XCircle } from 'lucide-react';

import Image from 'next/image';

import { Dispatch, SetStateAction } from 'react';

export interface SingleImageSubmitProps {
  image: File | null;
  setImage: Dispatch<SetStateAction<File | null>>;
}


function SingleImageSubmit({ ...props }: SingleImageSubmitProps) {
  const { image, setImage } = props;
  const { toast } = useToast();

  const handleRemoveImage = () => {
    setImage(null);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (files) {
      const newImage = files[0];

      // 첨부되는 사진이 5MB 이하일 때만 허용
      if (newImage.size > 5 * 1024 * 1024) {
        toast({
          title: '이미지 용량 초과',
          description: '최대 5MB까지의 이미지만 업로드할 수 있습니다.',
          variant: 'warning',
          duration: 2000,
        });
      } else {
        setImage(newImage);
      }
    }
  };

  return (
    <div className="w-full flex justify-between">
      {image ? (
        <div className="w-16 h-16 sm:w-32 sm:h-32 relative">
          <Image
            src={typeof image === 'string' ? "" : URL.createObjectURL(image)}
            alt="selected-image"
            className="rounded-lg"
            fill
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute right-[-8px] top-[-8px]"
          >
            <XCircle size={20} color="#ffffff" fill="000" />
          </button>
        </div>
      ) : (
        <div className="flex">
          <label
            htmlFor="photo"
            className="w-16 h-16 sm:w-32 sm:h-32 bg-grey-100 border-dashed border-2 rounded-lg flex justify-center items-center bg-camera cursor-pointer"
          >
            <Plus />
          </label>
          <input
            type="file"
            id="photo"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
}

export default SingleImageSubmit;
