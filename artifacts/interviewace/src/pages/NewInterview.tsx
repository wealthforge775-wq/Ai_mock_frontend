import { useState, type ChangeEvent, type FormEvent } from 'react';
import { ArrowLeft, ArrowRight, BriefcaseBusiness, FileUp, Info, LockKeyhole, Mic2, X } from 'lucide-react';
import { Link } from '@/components/Link';
import { AppShell, PageHeading, SectionLabel } from '@/components/AppShell';
import { ContractState } from '@/components/ContractState';

export default function NewInterview() {
  const [role, setRole] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [language, setLanguage] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [context, setContext] = useState('');
  const [resume, setResume] = useState<File | null>(null);
  const [notice, setNotice] = useState('');

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0] ?? null;

    if (file && file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setResume(null);
      setNotice('Please choose a PDF file. No file has been uploaded.');
      event.currentTarget.value = '';
      return;
    }

    setNotice('');
    setResume(file);
  }

  function clearResume() {
    setResume(null);
    setNotice('');
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice('Practice cannot be started yet: the verified InterviewAce creation and resume-processing API contract is missing.');
  }

  return (
    <AppShell>
      <div className="new-interview-page">
        <Link className="back-link page-enter" data-testid="link-new-interview-back" href="/dashboard">
          <ArrowLeft size={15} />
          Back to overview
        </Link>
        <PageHeading
          eyebrow="A MOMENT TO PREPARE"
          title="Set the scene."
          description="Shape a practice around the opportunity ahead. Nothing leaves this screen until a verified backend connection is available."
        />

        <div className="setup-layout">
          <form className="setup-form page-enter" data-testid="form-create-interview" onSubmit={handleSubmit}>
            <div className="form-section-head">
              <SectionLabel>THE CONVERSATION</SectionLabel>
              <span className="form-step-indicator font-mono" data-testid="text-interview-setup-step">01 / 01</span>
            </div>
            <div className="form-field">
              <label htmlFor="practice-role" data-testid="label-interview-role">Role or position</label>
              <div className="input-with-icon">
                <BriefcaseBusiness size={16} aria-hidden="true" />
                <input
                  autoComplete="organization-title"
                  data-testid="input-interview-role"
                  id="practice-role"
                  onChange={(event) => setRole(event.currentTarget.value)}
                  placeholder="The role you’re preparing for"
                  value={role}
                />
              </div>
              <span className="field-hint" data-testid="text-interview-role-hint">Use your own words. We won’t guess a role or level.</span>
            </div>
            <div className="form-field">
              <label htmlFor="practice-experience" data-testid="label-interview-experience">Experience level</label>
              <input
                autoComplete="off"
                data-testid="input-interview-experience"
                id="practice-experience"
                onChange={(event) => setExperienceLevel(event.currentTarget.value)}
                placeholder="Your experience level"
                value={experienceLevel}
              />
              <span className="field-hint" data-testid="text-interview-experience-hint">The supported values must be confirmed by the backend contract.</span>
            </div>
            <div className="form-field">
              <label htmlFor="practice-language" data-testid="label-interview-language">Interview language</label>
              <input
                autoComplete="off"
                data-testid="input-interview-language"
                id="practice-language"
                onChange={(event) => setLanguage(event.currentTarget.value)}
                placeholder="Your preferred language"
                value={language}
              />
              <span className="field-hint" data-testid="text-interview-language-hint">The supported values must be confirmed by the backend contract.</span>
            </div>
            <div className="form-field">
              <label htmlFor="practice-difficulty" data-testid="label-interview-difficulty">Difficulty</label>
              <input
                autoComplete="off"
                data-testid="input-interview-difficulty"
                id="practice-difficulty"
                onChange={(event) => setDifficulty(event.currentTarget.value)}
                placeholder="Your preferred difficulty"
                value={difficulty}
              />
              <span className="field-hint" data-testid="text-interview-difficulty-hint">No backend-specific difficulty options are assumed.</span>
            </div>
            <div className="form-field">
              <label htmlFor="practice-context" data-testid="label-interview-context">Anything you’d like the practice to know <span>OPTIONAL</span></label>
              <textarea
                data-testid="input-interview-context"
                id="practice-context"
                onChange={(event) => setContext(event.currentTarget.value)}
                placeholder="Add a company, interview focus, or a detail you want to keep in mind."
                rows={4}
                value={context}
              />
              <span className="field-hint" data-testid="text-interview-context-hint">This stays in your browser until an API contract is available.</span>
            </div>
            <div className="form-field">
              <label htmlFor="resume-upload" data-testid="label-interview-resume">A resume for context <span>OPTIONAL</span></label>
              {resume ? (
                <div className="selected-file" data-testid="file-interview-resume">
                  <span className="selected-file-icon"><FileUp size={17} /></span>
                  <span className="selected-file-copy">
                    <strong data-testid="text-interview-resume-name">{resume.name}</strong>
                    <small data-testid="text-interview-resume-size">{(resume.size / 1024).toFixed(1)} KB · selected locally only</small>
                  </span>
                  <button
                    aria-label="Remove selected resume"
                    className="remove-file-button"
                    data-testid="button-remove-interview-resume"
                    onClick={clearResume}
                    type="button"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label className="upload-dropzone" htmlFor="resume-upload" data-testid="dropzone-interview-resume">
                  <span className="upload-icon"><FileUp size={18} /></span>
                  <span className="upload-copy"><strong>Choose a PDF to attach</strong><small>Optional · accepted file type: PDF</small></span>
                  <span className="upload-action">Browse</span>
                </label>
              )}
              <input
                accept="application/pdf,.pdf"
                className="visually-hidden-input"
                data-testid="input-interview-resume"
                id="resume-upload"
                onChange={handleFileChange}
                type="file"
              />
              <span className="field-hint" data-testid="text-interview-resume-hint">The backend’s upload size requirements are not available, so no size limit is assumed. The selected file is not uploaded.</span>
            </div>
            {notice ? (
              <div className="form-notice" data-testid="status-interview-form-notice" role="status">{notice}</div>
            ) : null}
            <div className="form-submit-row">
              <button className="button button-dark" data-testid="button-submit-interview" type="submit">
                Start practice
                <ArrowRight size={16} />
              </button>
              <span className="submit-blocked-label" data-testid="status-interview-create-blocked"><LockKeyhole size={13} /> SUBMISSION BLOCKED UNTIL CONTRACT VERIFIED</span>
            </div>
          </form>

          <aside className="setup-aside page-enter reveal-1" data-testid="aside-interview-setup">
            <div className="setup-aside-art" aria-hidden="true">
              <div className="setup-aside-circle setup-aside-circle-one" />
              <div className="setup-aside-circle setup-aside-circle-two" />
              <div className="setup-mic"><Mic2 size={27} /></div>
              <span className="setup-aside-caption font-mono">FIND YOUR VOICE / 01</span>
            </div>
            <div className="setup-aside-copy">
              <span className="eyebrow" data-testid="text-setup-aside-eyebrow">KEEP IT SIMPLE</span>
              <h2 className="font-display" data-testid="heading-setup-aside">A good rehearsal begins with context.</h2>
              <p data-testid="text-setup-aside-description">Add only what feels useful. The goal isn’t to script your story, it’s to make room to tell it.</p>
              <div className="aside-private-note" data-testid="text-setup-local-only-note"><Info size={14} /> Nothing is submitted while the API contract is unavailable.</div>
            </div>
          </aside>
        </div>

        <div className="setup-integration-state">
          <ContractState
            title="Practice creation is unavailable until the backend contract is verified"
            description="This form is a local setup preview only. Interview creation, supported settings, resume upload requirements, and the returned session format are not defined by the available API source. No request or file upload will be sent."
          />
        </div>
      </div>
    </AppShell>
  );
}
