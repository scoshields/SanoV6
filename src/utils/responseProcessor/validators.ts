import { SESSION_SECTIONS, ASSESSMENT_SECTIONS, REQUIRED_ACRONYMS, MAX_SENTENCES_PER_SECTION } from './constants';

export function validateSectionHeaders(content: string, isAssessment: boolean): boolean {
  const sections = isAssessment ? ASSESSMENT_SECTIONS : SESSION_SECTIONS;
  return sections.every(section => content.includes(section));
}

export function validateAcronymUsage(content: string): boolean {
  return Object.keys(REQUIRED_ACRONYMS).every(acronym => 
    content.includes(acronym)
  );
}

export function countSentences(text: string): number {
  return text.split(/[.!?]+/).filter(sentence => 
    sentence.trim().length > 0
  ).length;
}

export function validateSectionLength(section: string): boolean {
  const sentences = countSentences(section);
  return sentences <= MAX_SENTENCES_PER_SECTION;
}

export function validateHIPAACompliance(content: string): boolean {
  // Basic HIPAA validation - check for common identifiers
  const identifierPatterns = [
    /\b\d{3}-\d{2}-\d{4}\b/, // SSN
    /\b\d{10}\b/, // Phone numbers
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/, // Email
    /\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}\b/, // Dates
  ];

  return !identifierPatterns.some(pattern => pattern.test(content));
}