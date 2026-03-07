import { type NavbarLink } from "@/shared/types";

export const NAVBAR_LINKS: ReadonlyArray<NavbarLink> = [
  {
    href: "/applicants",
    label: "Абитуриенттерге",
    links: [
      {
        href: "/applicants/for-applicants",
        label: "Для абитуриентов",
      },
      {
        href: "/applicants/tuition",
        label: "Информация об оплате",
      },
      {
        href: "/applicants/required-documents",
        label: "Перечень необходимых документов",
      },
    ],
  },
  {
    href: "/students",
    label: "Студенттерге",
    links: [
      {
        href: "/students/bachelor",
        label: "Учебное (бакалавр)",
      },
      {
        href: "/students/avn-portal",
        label: "Образовательный портал AVN",
      },
      {
        href: "/students/schedule",
        label: "Расписание",
      },
      {
        href: "/students/tuition",
        label: "Оплата за обучение",
      },
    ],
  },
  {
    href: "/research",
    label: "Илим изилдоо",
  },
  {
    href: "/structure",
    label: "Структура",
    links: [
      {
        href: "/structure/rector",
        label: "Ректор",
      },
      {
        href: "/structure/administration",
        label: "Администрация",
      },
      {
        href: "/structure/documents",
        label: "Документы",
      },
    ],
  },
  {
    href: "/courses",
    label: "Курстар",
  },
  {
    href: "/news",
    label: "Жанылыктар",
  },
] as const;
