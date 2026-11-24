interface KiralyteLogoProps {
  className?: string;
  iconOnly?: boolean;
  darkText?: boolean;
}

export function KiralyteLogo({
  className = '',
  iconOnly = false,
  darkText = true,
}: KiralyteLogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <svg
        width="32"
        height="34"
        viewBox="0 0 36 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        {/* Shield outline matching Kiralyte Technology Solutions banner */}
        <path
          d="M18 2.5L4.5 7.8V19.6C4.5 27.6 10.3 33.4 18 36C25.7 33.4 31.5 27.6 31.5 19.6V7.8L18 2.5Z"
          stroke="#EB5E00"
          strokeWidth="2.8"
          strokeLinejoin="round"
          fill="#EB5E00"
          fillOpacity="0.1"
        />
        {/* Upward-right rocket mark inside shield */}
        <path
          d="M23.8 11.2C20.2 11.4 16.8 13.4 14.5 16.4L11.2 16.8L9.6 19.8L13.1 20.6L15.4 22.9L16.2 26.4L19.2 24.8L19.6 21.5C22.6 19.2 24.6 15.8 24.8 12.2C24.8 11.6 24.4 11.2 23.8 11.2Z"
          fill="#EB5E00"
        />
        <circle cx="19.8" cy="16.2" r="1.7" fill="#FFFFFF" />
        <path
          d="M12.5 23.5L10 26M14.2 25.2L12.2 27.2"
          stroke="#EB5E00"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      {!iconOnly && (
        <span
          className={`font-display text-xl font-extrabold tracking-tight whitespace-nowrap ${
            darkText ? 'text-[#111315]' : 'text-white'
          }`}
        >
          Kiralyte
        </span>
      )}
    </span>
  );
}
