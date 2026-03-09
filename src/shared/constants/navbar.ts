import { type NavbarLink } from "@/shared/types";

export const NAVBAR_LINKS: ReadonlyArray<NavbarLink> = [
  {
    href: "/research",
    labelKey: "research",
  },
  {
    href: "/applicants",
    labelKey: "applicants.label",
    links: [
      {
        href: "/applicants/for-applicants",
        labelKey: "applicants.links.forApplicants",
      },
      {
        href: "/applicants/tuition",
        labelKey: "applicants.links.tuition",
      },
      {
        href: "/applicants/required-documents",
        labelKey: "applicants.links.requiredDocuments",
      },
    ],
  },
  {
    href: "/students",
    labelKey: "students.label",
    links: [
      {
        href: "/students/bachelor",
        labelKey: "students.links.bachelor",
      },
      {
        href: "/students/avn-portal",
        labelKey: "students.links.avnPortal",
      },
      {
        href: "/students/schedule",
        labelKey: "students.links.schedule",
      },
      {
        href: "/students/tuition",
        labelKey: "students.links.tuition",
      },
    ],
  },
  {
    href: "/structure",
    labelKey: "structure.label",
    links: [
      {
        href: "/structure/rector",
        labelKey: "structure.links.rector",
      },
      {
        href: "/structure/administration",
        labelKey: "structure.links.administration",
      },
      {
        href: "/structure/documents",
        labelKey: "structure.links.documents",
      },
    ],
  },
  {
    href: "/courses",
    labelKey: "courses",
  },
  {
    href: "/news",
    labelKey: "news",
  },
] as const;
