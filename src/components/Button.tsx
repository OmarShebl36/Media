import { ReactNode } from 'react';
import classnames from 'classnames';
import '../index.css';
import { twMerge } from 'tailwind-merge';
import { GoSync } from 'react-icons/go';

interface Props {
  children: ReactNode;
  rounded?: boolean;
  outline?: boolean;
  primary?: boolean;
  secondary?: boolean;
  success?: boolean;
  danger?: boolean;
  warning?: boolean;
  loading?: boolean;
  onClick?: () => void;
  [key: string]: any;
}

function Button({
  children,
  rounded,
  outlined,
  primary,
  secondary,
  success,
  danger,
  warning,
  loading,
  onClick,
  ...rest
}: Props) {
  const classes = twMerge(
    classnames(
      rest.className,
      'px-3 py-1.5 border border-black h-8 flex items-center',
      {
        'opacity-80': loading,
        'border-blue-500 bg-blue-500 text-white': primary,
        'border-gray-900 bg-gray-900 text-white': secondary,
        'border-green-500 bg-green-500 text-white': success,
        'border-yellow-400 bg-yellow-400 text-white': warning,
        'border-red-500 bg-red-500 text-white': danger,
        'rounded-full': rounded,
        'bg-white': outlined,
        'text-blue-500': outlined && primary,
        'text-red-500': outlined && danger,
        'text-gray-900': outlined && secondary,
        'text-green-500': outlined && success,
        'text-yellow-400': outlined && warning,
      }
    )
  );

  return (
    <button disabled={loading} {...rest} onClick={onClick} className={classes}>
      {loading ? <GoSync className='animate-spin'/> : children}
    </button>
  );
}

Button.propTypes = {
  NameItAsYouWish: ({
    primary = false,
    secondary = false,
    success = false,
    danger = false,
    warning = false,
  }: Props) => {
    // !! operator is used to convert undefined into 0 or false
    const count =
      Number(!!primary) +
      Number(!!secondary) +
      Number(!!success) +
      Number(!!danger) +
      Number(!!warning);
    if (count > 1) return new Error('Error: Only one variation can be true');
  },
};

// * The type used in TypeScript to do the above propTypes custom function

// type ExcludeFromTuple<T extends any[], U> = {
//   [K in keyof T]: T[K] extends U ? never : T[K];
// }[number];

// type Exclusive<T extends PropertyKey[], U = any> = T[number] extends infer E
//   ? E extends string
//     ? Record<E, U> & { [k in ExcludeFromTuple<T, E>]?: never }
//     : never
//   : never & {};

// type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
//   Partial<{
//     outline?: boolean;
//     rounded?: boolean;
//   }> &
//   Exclusive<["primary", "secondary", "success", "warning", "danger"], boolean>;

export default Button;
