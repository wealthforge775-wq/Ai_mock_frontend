import { ArrowLeft, KeyRound, ShieldCheck } from 'lucide-react';
import { Link } from '@/components/Link';
import { integrationStatus } from '@/lib/config';

type AuthUnavailableProps = {
  mode: 'sign-in' | 'sign-up';
};

export default function AuthUnavailable({ mode }: AuthUnavailableProps) {
  const isSignIn = mode === 'sign-in';

  return (
    <main className="auth-unavailable-page" data-testid={`page-${mode}-unavailable`}>
      <Link className="brand auth-brand" data-testid="link-auth-brand-home" href="/">
        <span className="brand-mark brand-mark-light" aria-hidden="true"><KeyRound size={18} /></span>
        <span className="brand-wordmark">interview<span>ace</span></span>
      </Link>
      <div className="auth-unavailable-card">
        <span className="auth-card-mark" aria-hidden="true"><ShieldCheck size={22} /></span>
        <span className="eyebrow" data-testid="text-auth-unavailable-eyebrow">EXISTING CLERK ACCOUNT</span>
        <h1 className="font-display" data-testid="heading-auth-unavailable">{isSignIn ? 'Welcome back.' : 'A good next step.'}</h1>
        <p data-testid="text-auth-unavailable-description">
          {integrationStatus.clerkConfigured
            ? 'Your existing Clerk sign-in is ready to load.'
            : 'Sign-in and sign-up are held until the existing Clerk publishable key is configured. No new identity provider has been created.'}
        </p>
        {!integrationStatus.clerkConfigured ? (
          <div className="auth-config-note" data-testid="status-auth-key-required">
            <KeyRound size={15} />
            <span>Set <code>VITE_CLERK_PUBLISHABLE_KEY</code> to enable the existing Clerk flow.</span>
          </div>
        ) : null}
        <Link className="button button-dark auth-back-button" data-testid="link-auth-back-home" href="/">
          <ArrowLeft size={15} />
          Back to InterviewAce
        </Link>
        <div className="auth-switch" data-testid="text-auth-mode-switch">
          {isSignIn ? 'New to InterviewAce?' : 'Already have an account?'}
          <Link data-testid={isSignIn ? 'link-auth-switch-sign-up' : 'link-auth-switch-sign-in'} href={isSignIn ? '/sign-up' : '/sign-in'}>
            {isSignIn ? 'Create an account' : 'Sign in'}
          </Link>
        </div>
      </div>
      <span className="auth-footer font-mono" data-testid="text-auth-footer">A QUIETER WAY TO GET READY</span>
    </main>
  );
}
