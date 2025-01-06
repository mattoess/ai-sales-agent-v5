import FooterSection from './FooterSection';

const footerSections = [
  {
    title: "Product",
    links: ["Features", "Use Cases", "Pricing", "About"]
  },
  {
    title: "Resources",
    links: ["Documentation", "Blog", "Support"]
  },
  {
    title: "Company",
    links: ["Contact", "Privacy", "Terms"]
  }
] as const;

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {footerSections.map((section) => (
            <FooterSection
              key={section.title}
              title={section.title}
              links={section.links}
            />
          ))}
        </div>
      </div>
    </footer>
  );
}