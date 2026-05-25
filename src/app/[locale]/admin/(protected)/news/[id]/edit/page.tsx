import { EditNews } from "@/widgets/admin-news";

import { parseEntityId } from "@/shared/helpers";

interface Props {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

const EditNewsPage = async ({ params }: Props) => {
  const { id } = await params;

  return <EditNews id={parseEntityId(id)} />;
};

export default EditNewsPage;
