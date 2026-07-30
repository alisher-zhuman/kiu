import { notFound } from "next/navigation";

import { AdminNewsDetail } from "@/widgets/admin-news";

interface Props {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

const NewsDetailPage = async ({ params }: Props) => {
  const { id } = await params;

  const newsId = Number(id);

  if (!Number.isInteger(newsId) || newsId <= 0) {
    notFound();
  }

  return <AdminNewsDetail id={newsId} />;
};

export default NewsDetailPage;
