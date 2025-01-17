import type { FC } from 'react';

interface FooterSectionProps {
  title: string;
  links: readonly string[];
}

const FooterSection: FC<FooterSectionProps> = ({ title, links }) => {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
        {title}
      </h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link}>
            <a href={`#${link.toLowerCase()}`} className="text-gray-600 hover:text-blue-900">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterSection;