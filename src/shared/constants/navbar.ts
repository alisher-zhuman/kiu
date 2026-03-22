import { type NavbarLink } from "@/shared/types";

export const NAVBAR_LINKS: ReadonlyArray<NavbarLink> = [
  {
    href: "/science",
    labelKey: "science",
  },
  {
    href: "/applicants",
    labelKey: "applicants.label",
    links: [
      {
        href: "/applicants",
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
        href: "http://avn.kiu.kg/lms",
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
        href: "/structure/rectorate",
        labelKey: "structure.links.rectorate",
      },
      {
        href: "/structure/departments",
        labelKey: "structure.links.departments",
      },
      {
        href: "/structure/documents",
        labelKey: "structure.links.documents",
      },
      {
        href: "/structure/certificates-and-licenses",
        labelKey: "structure.links.certificatesAndLicenses",
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
