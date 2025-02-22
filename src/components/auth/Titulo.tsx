export const Titulo = ({
  title,
  subtitle,
}: {
  title?: string;
  subtitle?: boolean;
}) => {
  return (
    <h1 className="text-4xl font-black text-blue-800 text-center">
      {title}{" "}
      {subtitle ? (
        <span className="text-3xl block font-bold">
          aqui puedes <strong className="text-amber-500">reestablecerla</strong>
        </span>
      ) : (
        <span className="text-3xl block font-bold">
          y controla tus <strong className="text-amber-400">finanzas</strong>
        </span>
      )}
    </h1>
  );
};
