import { notFound } from "next/navigation";

import { EditDocument } from "@/widgets/admin-documents";

interface Props {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

const EditDocumentPage = async ({ params }: Props) => {
  const { id } = await params;

  const documentId = Number(id);

  if (!Number.isInteger(documentId) || documentId <= 0) {
    notFound();
  }

  return <EditDocument id={documentId} />;
};

export default EditDocumentPage;
