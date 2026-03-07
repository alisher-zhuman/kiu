import { NAVBAR_ITEMS } from "@/shared/constants";

export const Navbar = () => {
  return (
    <nav className="bg-[#004C97] p-5 sticky top-0 z-10">
      <ul className="max-w-400 m-auto flex items-center justify-evenly gap-5 px-10 text-white font-semibold text-lg">
        {NAVBAR_ITEMS.map((item) => (
          <li
            key={item}
            className="relative py-1 text-white/92 transition-all duration-200 hover:-translate-y-px hover:text-[#ffea00] after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-0 after:-translate-x-1/2 after:bg-[#ffea00] after:transition-all after:duration-200 hover:after:w-full"
          >
            {item}
          </li>
        ))}
      </ul>
    </nav>
  );
};
