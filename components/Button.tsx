export function Button({
  children,
  onClick,
  ...props
}: {
  children: React.ReactNode;
  onClick?: () => void;
} & { [key: string]: any }) {
  return (
    <button
      className="px-3 py-1 shadow-lg shadow-gray-500/50 bg-purple-800 text-white rounded-lg text-[15px] cursor-pointer active:scale-[.97]"
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
