"use client";
import { getVariant } from "./ButtonLink";

interface ButtonProps<TEntity> extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  data?: TEntity;
  variant?: 'primary' | 'danger' | 'secondary';
  children: React.ReactNode;
  onAction?: (data?: TEntity) => void
}

/**
 * A React component that extends the HTML `<button>` element to provide variant styles and the `onAction` callback with customized `data`.
 *
 */
function Button<TEntity = any>({ data, variant = 'primary', className, children, onAction, onClick, ...props }: ButtonProps<TEntity>) {

  const handleButton = onAction ? (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
    }
    onAction(data);
  } : onClick;

  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-md font-medium transition-colors disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed ${getVariant(variant)} ${className || ''}`}
      onClick={handleButton}
    >
      {children}
    </button>
  );
}

export { Button };
export default Button;