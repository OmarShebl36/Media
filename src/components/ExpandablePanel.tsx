import React from 'react';

interface Props {
  children: React.ReactNode;
  header: JSX.Element;
}

function ExpandablePanel({ children, header }: Props) {
  return (
    <div className='mb-2 border rounded'>
      <div className='flex p-2 justify-between items-center cursor-pointer'>
        <div className='flex flex-row items-center justify-between'>
          {header}
        </div>
      </div>
      <div className='p-2 border-t'>

      </div>
    </div>
  );
}

export default ExpandablePanel;
