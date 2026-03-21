import { HandCoins } from "lucide-react";

interface Props {
  text: string;
}

export const SupportCard = ({ text }: Props) => (
  <section className="mt-16 rounded-xl border border-black/20 px-4 py-5 md:mt-20 md:px-7 md:py-6">
    <div className="flex items-start gap-4 md:items-center md:gap-8">
      <div className="flex size-18 shrink-0 items-center justify-center rounded-xl bg-[#004C97] text-white md:size-20">
        <HandCoins size={42} strokeWidth={1.75} />
      </div>

      <p className="text-base leading-7 text-black/85 md:text-[1.7rem] md:leading-[1.5]">
        {text}
      </p>
    </div>
  </section>
);
