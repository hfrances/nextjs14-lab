import Link, { LinkProps } from "next/link";
import Button from "./Button";

type ButtonLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & LinkProps & {
  variant?: 'primary' | 'danger' | 'secondary';
  children: React.ReactNode;
  disabled?: boolean;
} & React.RefAttributes<HTMLAnchorElement>

function getVariant(variant: 'primary' | 'danger' | 'secondary') {
  const variants = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300'
  };
  return variants[variant];
}

/**
 * Un React Component que extiende de `<Link>` pero con la apariencia de un botón.
 * 
 * It is the primary way to navigate between routes in Next.js.
 */
function ButtonLink({ variant = 'primary', className, disabled, children, ...props }: ButtonLinkProps) {

  return (
    disabled ?
      <Button variant={variant} className={className} disabled>
        {children}
      </Button>
      :
      <Link
        {...props}
        className={`px-4 py-2 rounded-md font-medium transition-colors ${getVariant(variant)} ${className || ''}`}
      >
        {children}
      </Link>
  );
}

export { ButtonLink, getVariant };
export default ButtonLink;