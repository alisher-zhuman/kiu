import { EditScheduleForm } from "@/features/edit-schedule";

import { AdminPageShell } from "@/shared/ui/admin-page-shell";

interface Props {
  id: number;
}

export const EditSchedule = ({ id }: Props) => (
  <AdminPageShell backHref="/admin/schedules" sectionClassName="space-y-6 md:space-y-8">
    <EditScheduleForm id={id} />
  </AdminPageShell>
);
