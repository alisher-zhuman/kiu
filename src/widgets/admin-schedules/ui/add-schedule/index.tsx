import { useTranslations } from "next-intl";

import { AddScheduleForm } from "@/features/add-schedule";

import { AdminFormShell } from "@/shared/ui/admin-form-shell";

export const AddSchedule = () => {
  const t = useTranslations("AdminLayout.pages");

  return (
    <AdminFormShell backHref="/admin/schedules">
      <h1 className="text-2xl font-bold tracking-tight text-black md:text-3xl">
        {t("addSchedules")}
      </h1>
      <AddScheduleForm />
    </AdminFormShell>
  );
};
