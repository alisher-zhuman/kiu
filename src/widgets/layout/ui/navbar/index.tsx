import { Link } from "@/i18n/navigation";

import { NAVBAR_ITEMS } from "@/shared/constants";
import { cn } from "@/shared/helpers";

export const Navbar = () => {
  return (
    <nav className="bg-[#004C97] sticky top-0 z-10">
      <ul className="max-w-400 m-auto flex items-center justify-evenly gap-5 px-10 text-white font-semibold text-lg">
        {NAVBAR_ITEMS.map((item) => (
          <li key={item.href} className="group relative">
            <Link
              href={item.href}
              className="relative block py-1 text-white/92 transition-all duration-200 hover:-translate-y-px hover:text-[#ffea00] after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-0 after:-translate-x-1/2 after:bg-[#ffea00] after:transition-all after:duration-200 hover:after:w-full"
            >
              {item.label}
            </Link>

            {item.items && (
              <div
                className={cn(
                  "pointer-events-none invisible absolute left-1/2 top-full z-20 w-72 -translate-x-1/2 translate-y-2 scale-95 rounded-[1.75rem] border border-white/15 bg-[#0a3f79]/96 p-3 opacity-0 shadow-[0_20px_45px_rgba(0,0,0,0.24)] backdrop-blur-sm transition-all duration-200 ease-out",
                  "group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100",
                )}
              >
                <div className="flex flex-col gap-1">
                  {item.items.map((subItem) => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      className="rounded-2xl px-4 py-3 text-sm font-medium text-white/92 transition-colors duration-200 hover:bg-white/8 hover:text-[#ffea00]"
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
