import { isExternalHref } from "@/shared/helpers";

import { type Course, type CourseLabels } from "../../types";

interface Props {
  course: Course;
  labels: CourseLabels;
}

export const CourseCard = ({ course, labels }: Props) => {
  const contacts = course.contacts;

  return (
    <article className="space-y-8 md:space-y-10">
      <div className="border-l-2 border-black pl-3 md:pl-4">
        <h2 className="text-2xl font-bold sm:text-3xl md:text-5xl">
          {course.title}
        </h2>
      </div>

      <div className="space-y-6 pl-6 text-base leading-8 text-black/85 md:space-y-8 md:pl-16 md:text-[1.9rem] md:leading-[1.45]">
        <ul className="list-disc space-y-1 pl-5 marker:text-black/70 md:pl-7">
          {course.duration.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        {course.books ? (
          <div className="space-y-2 md:space-y-3">
            <p>{labels.books}:</p>
            <p>{course.books}</p>
          </div>
        ) : null}

        {course.teachers?.length ? (
          <div className="space-y-2 md:space-y-3">
            <p>{labels.teachers}:</p>
            <div>
              {course.teachers.map((teacher) => (
                <p key={teacher}>{teacher}</p>
              ))}
            </div>
          </div>
        ) : null}

        {course.program?.length ? (
          <div className="space-y-2 md:space-y-3">
            <p>{labels.program}:</p>
            <div>
              {course.program.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </div>
        ) : null}

        {course.supervisor ? (
          <p>
            {labels.supervisor}: {course.supervisor}
          </p>
        ) : null}

        {contacts?.length ? (
          <div className="space-y-2 md:space-y-3">
            <p>{labels.contacts}:</p>
            <div className="flex flex-wrap gap-y-1">
              {contacts.map(({ href, label }, index) => {
                const isExternal = isExternalHref(href);

                return (
                  <span key={href}>
                    <a
                      href={href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noreferrer" : undefined}
                      className="transition-colors hover:text-[#004C97]"
                    >
                      {label}
                    </a>
                    {index < contacts.length - 1 ? ", " : null}
                  </span>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
};
