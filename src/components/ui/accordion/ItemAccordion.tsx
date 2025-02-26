type AccordionProps = {
  title: string;
  content: string;
};

export const ItemAccordion = ({ title, content }: AccordionProps) => {
  return (
    <details className="p-5 shadow-lg text-lg bg-white rounded-lg">
      <summary className="cursor-pointer font-black text-purple-700 hover:text-purple-900 transition-all">
        {title}
      </summary>
      <p className="mt-2 antialiased">{content}</p>
    </details>
  );
};
