export type LocalInterviewSetupPreview = {
  role: string;
  experienceLevel: string;
  language: string;
  difficulty: string;
  context: string;
  resume: {
    name: string;
    size: number;
  } | null;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function isLocalInterviewSetupPreview(value: unknown): value is LocalInterviewSetupPreview {
  if (!isRecord(value)) {
    return false;
  }

  const textFields = ['role', 'experienceLevel', 'language', 'difficulty', 'context'];
  const hasTextFields = textFields.every((field) => typeof value[field] === 'string');
  const resume = value.resume;
  const hasValidResume = resume === null || (
    isRecord(resume) &&
    typeof resume.name === 'string' &&
    typeof resume.size === 'number'
  );

  return hasTextFields && hasValidResume;
}
