import Image from 'next/image'

interface AvatarProps {
  avatarUrl: string | null;
  name: string;
  className?: string;
}

/**
 * Un React Component para visualizar el avatar de un usuario.
 * 
 * En caso de no tener avatar, se mostrará un avatar por defecto.
 * 
 * Se renderiza en el lado del **servidor**.
 */
function Avatar({ avatarUrl, name, className = '' }: AvatarProps) {
  return (
    <>
      <Image
        src={avatarUrl || '/default-avatar.png'}
        alt={`${name}'s avatar`}
        className={`rounded-full object-cover h-12 w-12 ${className}`}
        width={128} height={128}
      />
    </>
  );
}

export { Avatar };
export default Avatar;