import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
  sidebar: ReactNode;
}

export const AdminSidebarLayout = ({ children, sidebar }: Props) => (
  <div className="md:flex md:items-start md:gap-10">
    <div className="min-w-0 flex-1">{children}</div>
    <div className="hidden md:block">{sidebar}</div>
  </div>
);
