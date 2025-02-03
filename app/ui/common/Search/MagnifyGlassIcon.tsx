const MagnifyingGlassIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-4.35-4.35m1.8-5.4a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
      />
    </svg>
  );
};

export { MagnifyingGlassIcon };
export default MagnifyingGlassIcon;
