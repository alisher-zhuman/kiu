import { useTranslations } from "next-intl";

import { AddScheduleForm } from "@/features/add-schedule";

import { AdminPageShell } from "@/shared/ui/admin-page-shell";

export const AddSchedule = () => {
  const t = useTranslations("AdminLayout.pages");

  return (
    <AdminPageShell backHref="/admin/schedules" sectionClassName="space-y-6 md:space-y-8">
      <h1 className="text-2xl font-bold tracking-tight text-black md:text-3xl">
        {t("addSchedules")}
      </h1>

      <AddScheduleForm />
    </AdminPageShell>
  );
};
