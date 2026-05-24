import { EditScheduleForm } from "@/features/edit-schedule";

import { AdminFormShell } from "@/shared/ui/admin-form-shell";

interface Props {
  id: number;
}

export const EditSchedule = ({ id }: Props) => (
  <AdminFormShell backHref="/admin/schedules">
    <EditScheduleForm id={id} />
  </AdminFormShell>
);
