import React from 'react';
import { UseCaseCard } from './UseCaseCard';
import { SectionTitle } from '../SectionTitle';

const useCases = [
  {
    title: "Enterprise Tech Transformation",
    industry: "Enterprise Technology",
    challenge: "Global tech firm struggling with misaligned executive team and slow decision-making process.",
    solution: "Implemented AI-driven discovery process to identify core issues and align leadership.",
    results: "40% faster strategic implementation and eliminated executive turnover."
  },
  {
    title: "Healthcare Innovation",
    industry: "Healthcare",
    challenge: "Regional healthcare provider facing barriers in merger integration and team collaboration.",
    solution: "Used AI insights to transform executive conflicts into productive dialogue.",
    results: "$3M in synergy savings realized 6 months ahead of schedule."
  },
  {
    title: "Financial Services Growth",
    industry: "Financial Services",
    challenge: "Investment firm experiencing communication gaps between departments affecting client service.",
    solution: "Applied AI-powered discovery to identify and address organizational silos.",
    results: "25% improvement in client satisfaction and 30% faster decision-making."
  },
  {
    title: "Professional Services Excellence",
    industry: "Professional Services",
    challenge: "Consulting firm struggling with inconsistent service delivery and team alignment.",
    solution: "Leveraged AI insights to standardize discovery process and align team objectives.",
    results: "50% reduction in delivery variations and 35% increase in client retention."
  }
];

export function UseCasesSection() {
  return (
    <section id="use-cases" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Success Stories Across Industries"
          subtitle="See how organizations are transforming their sales discovery process"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <UseCaseCard key={useCase.title} {...useCase} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}