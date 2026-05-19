"use client";

import { useState } from "react";

import { type Section } from "@/shared/types";

import { AccordionSection } from "./accordion-section";

interface Props {
  sections: ReadonlyArray<Section>;
}

export const SectionsAccordion = ({ sections }: Props) => {
  const [openSection, setOpenSection] = useState<number | null>(0);

  const handleToggle = (index: number) =>
    setOpenSection((current) => (current === index ? null : index));

  return (
    <div className="mt-10 md:mt-16">
      {sections.map((section, index) => (
        <AccordionSection
          key={section.title}
          index={index}
          isLast={index === sections.length - 1}
          isOpen={openSection === index}
          onToggle={handleToggle}
          section={section}
        />
      ))}
    </div>
  );
};
