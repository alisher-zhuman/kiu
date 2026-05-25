import { EditProfessor } from "@/widgets/admin-professors";

import { parseEntityId } from "@/shared/helpers";

interface Props {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

const EditProfessorPage = async ({ params }: Props) => {
  const { id } = await params;

  return <EditProfessor id={parseEntityId(id)} />;
};

export default EditProfessorPage;
