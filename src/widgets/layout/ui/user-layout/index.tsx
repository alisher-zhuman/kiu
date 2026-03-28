import { type ReactNode } from "react";

import { PageReveal } from "@/shared/ui/page-reveal";

import { BackButton } from "../back-button";
import { Footer } from "../footer";
import { Header } from "../header";
import { Navbar } from "../navbar";

interface Props {
  children: ReactNode;
}

export const UserLayout = ({ children }: Props) => (
  <>
    <Header />
    <Navbar />
    <BackButton />
    <PageReveal>{children}</PageReveal>
    <Footer />
  </>
);
