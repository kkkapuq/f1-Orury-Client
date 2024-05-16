import clsx from 'clsx';

function ProgressBar({ currentStep }: { currentStep: number }) {
  const isLastStep = currentStep === 2;

  const leftBarClassName = clsx(
    'w-1/2 transition-all duration-500 bg-primary',
    isLastStep && 'w-full bg-primary',
  );

  return (
    <div className="flex h-[6px]">
      <div className={leftBarClassName}></div>
      {!isLastStep && <div className="w-1/2 bg-grey-100" />}
    </div>
  );
}

export default ProgressBar;
