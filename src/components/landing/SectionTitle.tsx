interface SectionTitleProps {
  title: string;
  subtitle: string;
}

export function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="text-center mb-16">
      <h2 className="text-3xl font-bold text-blue-900 mb-4">
        {title}
      </h2>
      <p className="text-xl text-gray-600">
        {subtitle}
      </p>
    </div>
  );
}