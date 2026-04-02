import { notFound } from "next/navigation";

import { EditNews } from "@/widgets/admin-news";

interface Props {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

const EditNewsPage = async ({ params }: Props) => {
  const { id } = await params;

  const newsId = Number(id);

  if (!Number.isInteger(newsId) || newsId <= 0) {
    notFound();
  }

  return <EditNews id={newsId} />;
};

export default EditNewsPage;
