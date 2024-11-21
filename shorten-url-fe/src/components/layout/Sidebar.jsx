import { Link, useLocation } from "react-router-dom";

import Icon from "@/components/common/Icon";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const location = useLocation();
  const menuItems = [
    { label: "URL Shorten", icon: "Link", path: "/" },
    { label: "QR Code", icon: "QrCode", path: "/qr" },
    { label: "Analytics", icon: "BarChart2", path: "/analytics" },
    { label: "Settings", icon: "Settings", path: "/settings" },
  ];

  return (
    <aside className="min-h-full border-r bg-card px-5 py-6">
      <div className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all hover:bg-accent/50",
                isActive
                  ? "bg-primary-foreground text-primary"
                  : "text-foreground"
              )}
            >
              <Icon name={item.icon} size={20} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
