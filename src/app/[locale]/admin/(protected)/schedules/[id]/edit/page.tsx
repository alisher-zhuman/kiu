import { notFound } from "next/navigation";

import { EditSchedule } from "@/widgets/admin-schedules";

interface Props {
  params: Promise<{ id: string }>;
}

const EditSchedulePage = async ({ params }: Props) => {
  const { id } = await params;
  const scheduleId = Number(id);

  if (!Number.isInteger(scheduleId) || scheduleId <= 0) {
    notFound();
  }

  return <EditSchedule id={scheduleId} />;
};

export default EditSchedulePage;
