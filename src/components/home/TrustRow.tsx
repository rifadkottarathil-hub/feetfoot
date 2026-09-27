const ITEMS = [
  { title: "Free delivery over ₹2,000", icon: "truck" },
  { title: "14-day returns", icon: "return" },
  { title: "100% authentic products", icon: "shield" },
  { title: "Cash on Delivery available", icon: "cash" },
] as const;

function Icon({ name }: { name: (typeof ITEMS)[number]["icon"] }) {
  const common = {
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    className: "text-ink",
  };
  switch (name) {
    case "truck":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M2 6h11v10H2V6Z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M13 10h4l3 3v3h-7v-6Z" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="6" cy="18" r="1.6" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="17" cy="18" r="1.6" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "return":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M4 9a8 8 0 1 1 1.5 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M4 4v5h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common} aria-hidden="true">
          <path
            d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "cash":
      return (
        <svg {...common} aria-hidden="true">
          <rect x="2" y="6" width="20" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
  }
}

export default function TrustRow() {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
      {ITEMS.map((item) => (
        <div key={item.title} className="flex flex-col items-center gap-2 text-center">
          <Icon name={item.icon} />
          <p className="text-sm font-medium">{item.title}</p>
        </div>
      ))}
    </div>
  );
}
