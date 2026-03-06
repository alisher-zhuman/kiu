import { Globe } from "lucide-react";

export const LangSwitcher = () => {
  return (
    <button className="flex items-center gap-1 cursor-pointer">
      <p className="font-light text-xl">РУ</p> <Globe size={30} />
    </button>
  );
};
