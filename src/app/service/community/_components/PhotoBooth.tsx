'use client';

import { v4 } from 'uuid';
import { COLOR } from '@/styles/color';
import { useMemo, useState } from 'react';
import { Camera, XCircle } from 'lucide-react';
import { PhotoBoothProps } from '@/types/community/photoBooth';
import { useToast } from '@/app/_components/ui/use-toast';

import Image from 'next/image';

function PhotoBooth({ ...props }: PhotoBoothProps) {
  const [isImageLengthFull, setIsImageLengthFull] = useState(false);
  const { images, setImages } = props;
  const { toast } = useToast();

  const handleRemoveImage = (index: number) => {
    const newImages = [...images];

    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (files && files.length <= 5) {
      const newImages = Array.from(files);

      // 첨부되는 사진이 5MB 이하일때만 허용
      if (newImages.every(newImage => newImage.size > 5 * 1024 * 1024)) {
        toast({
          title: '이미지 용량 초과',
          description: '최대 5MB까지의 이미지만 업로드할 수 있습니다.',
          variant: 'warning',
          duration: 2000,
        });
      }
      setImages(prevImages => [...prevImages, ...newImages]);
    }
  };

  useMemo(() => {
    if (images.length > 5) {
      setImages(prevImages => prevImages.slice(0, 5));
      toast({
        title: '이미지 초과',
        description: '이미지는 최대 5장까지 업로드할 수 있습니다.',
        variant: 'warning',
        duration: 2000,
      });
    }
    if (images.length === 5) setIsImageLengthFull(true);
    else setIsImageLengthFull(false);
  }, [images.length, setImages, toast]);

  return (
    <div className="w-full flex gap-4">
      {!isImageLengthFull && (
        <div className="flex justify-start">
          <label
            htmlFor="photo"
            className="w-16 h-16 sm:w-32 sm:h-32 bg-grey-100 border-dashed border-2 rounded-lg flex flex-col justify-center items-center bg-camera cursor-pointer"
          >
            <Camera color={COLOR.grey100} fill={COLOR.black} size={36} />
            <span className="text-sm text-grey-300 font-semibold leading-6">
              {`(${images.length}/5)`}
            </span>
          </label>
          <input
            key={images.length}
            type="file"
            id="photo"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
      )}
      <ul className="flex gap-5">
        {images.map((image, index) => (
          <li key={v4()} className="w-16 h-16 sm:w-32 sm:h-32 relative">
            <Image
              src={URL.createObjectURL(image)}
              alt={`selected-image-${index}`}
              className="rounded-lg"
              fill
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute right-[-8px] top-[-8px]"
            >
              <XCircle size={20} color="#ffffff" fill="000" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PhotoBooth;
