import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ locale: string }>;
}

const AdminPage = async ({ params }: Props) => {
  const { locale } = await params;

  redirect(`/${locale}/admin/news`);
};

export default AdminPage;
