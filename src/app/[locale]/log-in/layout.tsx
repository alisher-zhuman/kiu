import { type ReactNode } from "react";

import { ReactQueryProvider } from "@/shared/providers";

interface Props {
  children: ReactNode;
}

const LogInLayout = ({ children }: Props) => {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
};

export default LogInLayout;
