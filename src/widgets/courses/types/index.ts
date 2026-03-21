export interface CourseContact {
  href: string;
  label: string;
}

export interface CourseLabels {
  books: string;
  contacts: string;
  program: string;
  supervisor: string;
  teachers: string;
}

export interface Course {
  books?: string;
  contacts?: ReadonlyArray<CourseContact>;
  duration: ReadonlyArray<string>;
  program?: ReadonlyArray<string>;
  supervisor?: string;
  teachers?: ReadonlyArray<string>;
  title: string;
}
