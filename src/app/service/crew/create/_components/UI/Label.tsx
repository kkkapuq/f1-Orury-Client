import React from 'react';
import clsx from 'clsx';

interface LabelProps {
  className?: string;
  htmlFor?: string;
  children: React.ReactNode;
}

function Label(props: LabelProps) {
  const { className, htmlFor, children } = props;

  const labelClass = clsx('block mb-[10px] font-medium text-[16px]', className);

  return (
    <label className={labelClass} htmlFor={htmlFor}>
      {children}
    </label>
  );
}

export default Label;
