import { notFound } from "next/navigation";

import { EditProfessor } from "@/widgets/admin-professors";

interface Props {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

const EditProfessorPage = async ({ params }: Props) => {
  const { id } = await params;

  const professorId = Number(id);

  if (!Number.isInteger(professorId) || professorId <= 0) {
    notFound();
  }

  return <EditProfessor id={professorId} />;
};

export default EditProfessorPage;
