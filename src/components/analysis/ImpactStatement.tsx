import React from 'react';

interface ImpactStatementProps {
  title: string;
  statement: string;
  type?: 'warning' | 'success';
}

export const ImpactStatement: React.FC<ImpactStatementProps> = ({
  title,
  statement,
  type = 'warning',
}) => {
  const bgColor = type === 'warning' ? 'bg-yellow-50' : 'bg-green-50';
  const borderColor = type === 'warning' ? 'border-yellow-100' : 'border-green-100';

  return (
    <div>
      <h4 className="text-sm font-medium text-gray-700 mb-2">{title}</h4>
      <p className={`text-gray-700 ${bgColor} p-4 rounded-md border ${borderColor}`}>
        {statement}
      </p>
    </div>
  );
};