import { type CreateDocumentPayload, type DocumentItem } from "@/entities/documents";

import { type AddDocumentFormValues } from "../types";

export const checkIsPdfFile = (file: File) => {
  return (
    file.type === "application/pdf" ||
    file.name.toLowerCase().endsWith(".pdf")
  );
};

export const createDefaultDocumentFormValues = (): AddDocumentFormValues => ({
  content: "",
  docType: "LOCAL_KIU_DOCUMENTS",
  title: "",
});

export const mapDocumentFormValuesToPayload = (
  values: AddDocumentFormValues,
): CreateDocumentPayload => ({
  content: values.content,
  docType: values.docType,
  title: values.title,
});

export const mapDocumentItemToFormValues = (
  documentItem: DocumentItem,
): AddDocumentFormValues => ({
  content: documentItem.content,
  docType: documentItem.docType,
  title: documentItem.title,
});
