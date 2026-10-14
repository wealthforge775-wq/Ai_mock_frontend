import { useState, type FormEvent } from 'react';
import { ArrowRight, FileClock, LockKeyhole } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Link } from '@/components/Link';
import { AppShell, PageHeading } from '@/components/AppShell';
import { ContractState } from '@/components/ContractState';

export default function History() {
  const [sessionReference, setSessionReference] = useState('');
  const navigate = useNavigate();

  function openExistingSession(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedReference = sessionReference.trim();

    if (normalizedReference) {
      navigate(`/interviews/${encodeURIComponent(normalizedReference)}`);
    }
  }

  return (
    <AppShell>
      <div className="history-page">
        <PageHeading
          eyebrow="YOUR PRACTICE, OVER TIME"
          title="A record of your work."
          description="Your past interviews belong to your history. We’ll show real records only, never a made-up example."
        />
        <div className="history-toolbar" data-testid="toolbar-interview-history">
          <div className="history-toolbar-copy">
            <span className="history-toolbar-icon"><FileClock size={17} /></span>
            <span>
              <strong data-testid="heading-history-list">Interview history</strong>
              <small data-testid="text-history-list-description">Backend records will appear here when available.</small>
            </span>
          </div>
          <span className="history-count" data-testid="status-history-record-count"><LockKeyhole size={13} /> NOT LOADED</span>
        </div>
        <form className="history-reference-form" data-testid="form-open-existing-session" onSubmit={openExistingSession}>
          <label htmlFor="history-session-reference" data-testid="label-history-session-reference">Already have a session reference?</label>
          <div className="history-reference-controls">
            <input
              autoComplete="off"
              data-testid="input-history-session-reference"
              id="history-session-reference"
              onChange={(event) => setSessionReference(event.currentTarget.value)}
              placeholder="Enter an existing session ID"
              value={sessionReference}
            />
            <button
              className="button button-secondary"
              data-testid="button-open-existing-session"
              disabled={!sessionReference.trim()}
              type="submit"
            >
              Open session
              <ArrowRight size={14} />
            </button>
          </div>
          <span className="field-hint" data-testid="text-history-session-reference-hint">This only opens the requested screen; session data remains blocked until the backend contract is verified.</span>
        </form>
        <div className="history-empty" data-testid="state-history-empty">
          <div className="history-empty-mark" aria-hidden="true"><FileClock size={22} /></div>
          <span className="eyebrow" data-testid="text-history-empty-eyebrow">NO HISTORY DATA</span>
          <h2 className="font-display" data-testid="heading-history-empty">Your story starts when you do.</h2>
          <p data-testid="text-history-empty-description">There are no interview records to display because no verified history endpoint is available. We won’t imply that a session exists.</p>
          <Link className="button button-dark" data-testid="link-history-new-practice" href="/interviews/new">
            Set up a practice
            <ArrowRight size={15} />
          </Link>
        </div>
        <ContractState
          title="Interview history is waiting for a verified endpoint"
          description="The workspace API source defines only a generic health check. History retrieval and deletion are therefore unavailable, and no records are shown."
        />
      </div>
    </AppShell>
  );
}
