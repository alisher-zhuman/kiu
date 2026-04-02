export {
  createNews,
  deleteNews,
  getNews,
  getNewsById,
  getNewsByIdForEdit,
  toggleNewsArchive,
  updateNews,
} from "./api";
export type {
  CreateNewsPayload,
  EditableNews,
  NewsContentField,
  NewsItem,
} from "./model/types";
