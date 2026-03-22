import { type ReactNode } from "react";

import { BackButton } from "../back-button";
import { Footer } from "../footer";
import { Header } from "../header";
import { Navbar } from "../navbar";

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => (
  <>
    <Header />
    <Navbar />
    <BackButton />
    {children}
    <Footer />
  </>
);
