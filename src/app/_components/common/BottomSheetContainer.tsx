import { useRef } from 'react';
import useCss from '@/hooks/common/useCss';
import { BottomSheet, BottomSheetRef } from 'react-spring-bottom-sheet';
import type { BottomSheetProps } from '@/types/community/bottomSheet';

function BottomSheetContainer({
  ContentComponent,
  isPost,
  ...props
}: BottomSheetProps) {
  useCss('https://unpkg.com/react-spring-bottom-sheet/dist/style.css');

  const { bottomSheetTitle, isSheetOpen, setIsSheetOpen, onDisMiss } = props;
  const focusRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<BottomSheetRef>(null);

  return (
    <BottomSheet
      open={isSheetOpen}
      skipInitialTransition
      ref={sheetRef}
      blocking={false}
      draggable={!isSheetOpen}
      initialFocusRef={focusRef}
      defaultSnap={500}
      snapPoints={({ maxHeight }) => {
        return maxHeight;
      }}
      header={
        <h1 className="flex items-center text-xl justify-center font-bold text-gray-800">
          {bottomSheetTitle}
        </h1>
      }
      onDismiss={onDisMiss}
      expandOnContentDrag={isSheetOpen}
    >
      <ContentComponent
        setIsSheetOpen={setIsSheetOpen}
        {...(isPost && { isPost })}
      />
    </BottomSheet>
  );
}

export default BottomSheetContainer;
