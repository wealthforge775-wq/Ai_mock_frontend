import { useClerk, useUser } from '@clerk/react';
import { ArrowRight, LogOut, Mail, ShieldCheck, UserRound } from 'lucide-react';
import { Link } from '@/components/Link';
import { AppShell, PageHeading } from '@/components/AppShell';
import { ContractState, MissingAuthState } from '@/components/ContractState';
import { integrationStatus } from '@/lib/config';

function ClerkProfileDetails() {
  const { isLoaded, user } = useUser();
  const { signOut } = useClerk();

  if (!isLoaded) {
    return (
      <div className="profile-loading" data-testid="state-profile-loading">
        <div className="skeleton-line skeleton-avatar" />
        <div className="skeleton-stack">
          <div className="skeleton-line" />
          <div className="skeleton-line skeleton-line-short" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-signed-out" data-testid="state-profile-signed-out">
        <UserRound size={21} />
        <p data-testid="text-profile-signed-out">Sign in to view your Clerk profile.</p>
        <Link className="text-link" data-testid="link-profile-sign-in" href="/sign-in">Go to sign in <ArrowRight size={14} /></Link>
      </div>
    );
  }

  const primaryEmail = user.primaryEmailAddress?.emailAddress;
  const displayName = [user.firstName, user.lastName].filter(Boolean).join(' ') || user.username || 'Clerk account';

  return (
    <div className="profile-details" data-testid="panel-profile-clerk-details">
      <div className="profile-identity">
        <div className="profile-photo-wrap" data-testid="img-profile-avatar">
          {user.imageUrl ? <img alt="" src={user.imageUrl} /> : <span>{displayName.slice(0, 1).toUpperCase()}</span>}
        </div>
        <div>
          <span className="eyebrow" data-testid="text-profile-identity-label">SIGNED IN ACCOUNT</span>
          <h2 className="font-display" data-testid="text-profile-display-name">{displayName}</h2>
        </div>
      </div>
      <div className="profile-detail-row" data-testid="row-profile-email">
        <span className="profile-detail-icon"><Mail size={16} /></span>
        <span><small>Email address</small><strong data-testid="text-profile-email">{primaryEmail ?? 'No primary email provided by Clerk'}</strong></span>
      </div>
      <div className="profile-detail-row" data-testid="row-profile-auth-provider">
        <span className="profile-detail-icon"><ShieldCheck size={16} /></span>
        <span><small>Account source</small><strong data-testid="text-profile-auth-provider">Your existing Clerk account</strong></span>
      </div>
      <button
        className="button button-secondary profile-sign-out"
        data-testid="button-profile-sign-out"
        onClick={() => signOut({ redirectUrl: import.meta.env.BASE_URL })}
        type="button"
      >
        <LogOut size={15} />
        Sign out
      </button>
    </div>
  );
}

export default function Profile() {
  return (
    <AppShell>
      <div className="profile-page">
        <PageHeading
          eyebrow="ACCOUNT & CONNECTIONS"
          title="Your profile."
          description="Your account belongs to your existing Clerk setup. InterviewAce does not create or manage a separate identity."
        />
        <section className="profile-card page-enter" data-testid="card-profile-account">
          <div className="profile-card-heading">
            <span className="profile-card-icon"><UserRound size={17} /></span>
            <div>
              <h2 data-testid="heading-profile-account">Your account</h2>
              <p data-testid="text-profile-account-description">Identity details from your Clerk session.</p>
            </div>
          </div>
          {integrationStatus.clerkConfigured ? <ClerkProfileDetails /> : <MissingAuthState />}
        </section>
        <section className="profile-card profile-connection-card page-enter reveal-1" data-testid="card-profile-api-connection">
          <div className="profile-card-heading">
            <span className="profile-card-icon"><ShieldCheck size={17} /></span>
            <div>
              <h2 data-testid="heading-profile-api-connection">Backend connection</h2>
              <p data-testid="text-profile-api-description">A separate API URL is required for InterviewAce data.</p>
            </div>
            <span className={`connection-pill${integrationStatus.apiConfigured ? ' connection-pill-ready' : ''}`} data-testid="status-profile-api-url">
              <span className="connection-dot" aria-hidden="true" />
              {integrationStatus.apiConfigured ? 'URL configured' : 'VITE_API_BASE_URL missing'}
            </span>
          </div>
          <ContractState
            title="No InterviewAce endpoint contract is available"
            description="Only the workspace’s generic health check is documented. No candidate data is requested until explicit verified endpoint paths and response contracts are supplied."
          />
          <div className="profile-route-links" data-testid="list-profile-capability-links">
            <Link className="text-link" data-testid="link-profile-dashboard" href="/dashboard">Dashboard <ArrowRight size={14} /></Link>
            <Link className="text-link" data-testid="link-profile-analytics" href="/analytics">Analytics <ArrowRight size={14} /></Link>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
