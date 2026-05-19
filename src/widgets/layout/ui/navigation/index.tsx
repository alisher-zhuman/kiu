import { FOOTER_NAVBAR_LINKS } from "../../constants";
import { NavSection } from "../nav-section";
import { NavigationLink } from "../navigation-link";

interface Props {
  getLabel: (key: string) => string;
  menuTitle: string;
  onToggleSection: (href: string) => void;
  openSection: string | null;
}

export const Navigation = ({
  getLabel,
  menuTitle,
  onToggleSection,
  openSection,
}: Props) => (
  <nav aria-label={menuTitle} className="md:pt-12">
    <ul className="mt-6 flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-10 md:text-center">
      {FOOTER_NAVBAR_LINKS.map(({ href, labelKey, links }) => (
        <li key={href}>
          {links ? (
            <NavSection
              getLabel={getLabel}
              href={href}
              isOpen={openSection === href}
              label={getLabel(labelKey)}
              links={links}
              onToggle={() => onToggleSection(href)}
            />
          ) : (
            <NavigationLink
              href={href}
              className="block border-b border-white/15 pb-4 text-xl font-medium transition-colors hover:text-white/75 md:border-0 md:pb-0 md:text-2xl"
            >
              {getLabel(labelKey)}
            </NavigationLink>
          )}
        </li>
      ))}
    </ul>
  </nav>
);
