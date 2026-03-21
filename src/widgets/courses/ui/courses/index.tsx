import { useTranslations } from "next-intl";

import { type Course, type CourseLabels } from "../../types";
import { CourseCard } from "../course-card";

export const Courses = () => {
  const t = useTranslations("CoursesPage");
  const courses = t.raw("courses") as ReadonlyArray<Course>;
  const labels = t.raw("labels") as CourseLabels;

  return (
    <main className="mx-auto max-w-400 px-5 py-10 text-black md:px-10 md:py-16">
      <h1 className="sr-only">{t("pageTitle")}</h1>
      <section className="space-y-24 md:space-y-36">
        {courses.map((course) => (
          <CourseCard key={course.title} course={course} labels={labels} />
        ))}
      </section>
    </main>
  );
};
