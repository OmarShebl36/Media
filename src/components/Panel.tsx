import classNames from "classnames";
import { ReactNode } from "react";

interface Props {
  className?: string;
  children?: ReactNode;
  [key: string]: any;
}

function Panel({ className, children, ...rest }: Props) {
  const finalClassNames = classNames(
    "border rounded p-3 shadow bg-white w-full",
    className
  );
  return (
    <div {...rest} className={finalClassNames}>
      {children}
    </div>
  );
}

export default Panel;
