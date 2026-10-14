import { AlertCircle, ArrowRight, Cable, RefreshCw } from 'lucide-react';
import { Link } from '@/components/Link';

type ContractStateProps = {
  title?: string;
  description?: string;
  retry?: () => void;
};

export function ContractState({
  title = 'Waiting for a verified API contract',
  description = 'InterviewAce is connected to a separate backend, but no InterviewAce endpoint contracts are present in this workspace. This view will stay empty rather than inventing records, questions, reports, or scores.',
  retry,
}: ContractStateProps) {
  return (
    <section className="contract-state" data-testid="state-missing-api-contract">
      <div className="contract-state-mark" aria-hidden="true">
        <Cable size={20} strokeWidth={1.7} />
      </div>
      <div className="contract-state-copy">
        <span className="eyebrow" data-testid="text-contract-state-label">INTEGRATION REQUIRED</span>
        <h2 data-testid="text-contract-state-title">{title}</h2>
        <p data-testid="text-contract-state-description">{description}</p>
        <div className="contract-state-actions">
          {retry ? (
            <button
              className="button button-secondary"
              data-testid="button-retry-integration"
              onClick={retry}
              type="button"
            >
              <RefreshCw size={15} />
              Try again
            </button>
          ) : null}
          <Link className="text-link" data-testid="link-integration-details" href="/profile">
            Review connection details
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
      <AlertCircle className="contract-state-alert" size={17} aria-hidden="true" />
    </section>
  );
}

export function MissingAuthState() {
  return (
    <div className="callout callout-warm" data-testid="state-auth-configuration">
      <div className="callout-icon" aria-hidden="true">
        <AlertCircle size={17} />
      </div>
      <div>
        <strong data-testid="text-auth-required-title">Authentication is not configured</strong>
        <p data-testid="text-auth-required-description">
          Add the external Clerk publishable key as VITE_CLERK_PUBLISHABLE_KEY to enable sign-in and profile details.
        </p>
      </div>
    </div>
  );
}
