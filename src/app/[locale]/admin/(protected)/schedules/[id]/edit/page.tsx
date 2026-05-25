import { EditSchedule } from "@/widgets/admin-schedules";

import { parseEntityId } from "@/shared/helpers";

interface Props {
  params: Promise<{ id: string }>;
}

const EditSchedulePage = async ({ params }: Props) => {
  const { id } = await params;

  return <EditSchedule id={parseEntityId(id)} />;
};

export default EditSchedulePage;
