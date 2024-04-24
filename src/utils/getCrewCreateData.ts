/**
 * FormData 생성을 위한 유틸리티 함수
 *
 * @param options.jsonData - JSON 데이터를 담은 BlobPart
 * @param options.image - 이미지 파일을 담은 배열
 * @returns 생성된 FormData 객체
 */

interface GetCrewCreateDataProps {
  jsonData?: BlobPart;
  image: File | null;
}

export const GetCrewCreateData = ({
  image,
  jsonData,
}: GetCrewCreateDataProps) => {
  const formData = new FormData();

  if (jsonData) {
    formData.append(
      'request',
      new Blob([jsonData], { type: 'application/json' }),
    );
  }

  if (image) {
    formData.append('image', image);
  }

  return formData;
};
