import { ArrowLeft, ArrowRight, LockKeyhole, ShieldCheck } from 'lucide-react';
import { Link } from '@/components/Link';
import { AppShell, PageHeading } from '@/components/AppShell';
import { ContractState } from '@/components/ContractState';

type InterviewReportProps = {
  id?: string;
};

export default function InterviewReport({ id }: InterviewReportProps) {
  return (
    <AppShell>
      <div className="report-page">
        <Link className="back-link page-enter" data-testid="link-report-back" href={`/interviews/${id ?? ':id'}`}>
          <ArrowLeft size={15} />
          Back to practice session
        </Link>
        <PageHeading
          eyebrow="REFLECTION, WHEN IT’S READY"
          title="Your report."
          description="A useful reflection should be grounded in what you actually said. No score or feedback is fabricated here."
        />
        <div className="report-intro-card page-enter" data-testid="card-report-overview">
          <div className="report-shield"><ShieldCheck size={20} /></div>
          <div>
            <span className="eyebrow" data-testid="text-report-session-label">SESSION REPORT</span>
            <h2 className="font-display" data-testid="heading-report-session">Waiting for your interview’s feedback.</h2>
            <p data-testid="text-report-session">Interview reference: <span className="font-mono">{id ?? 'UNAVAILABLE'}</span></p>
          </div>
          <span className="report-unavailable-pill" data-testid="status-report-availability"><LockKeyhole size={13} /> NOT AVAILABLE</span>
        </div>
        <div className="report-content-placeholder" data-testid="state-report-content-unavailable">
          <div className="report-placeholder-mark" aria-hidden="true"><span /><span /><span /></div>
          <span className="eyebrow" data-testid="text-report-waiting-label">NO REPORT DATA RECEIVED</span>
          <h2 className="font-display" data-testid="heading-report-waiting">The honest answer is: not yet.</h2>
          <p data-testid="text-report-waiting">Strengths, areas to work on, answer-level guidance and recommendations will only appear when returned by your AI interview backend.</p>
          <Link className="text-link" data-testid="link-report-history" href="/history">Return to history <ArrowRight size={14} /></Link>
        </div>
        <ContractState
          title="Report retrieval is blocked until its endpoint contract is supplied"
          description="No report path, payload, response shape, scoring model, or field availability is defined in this workspace. InterviewAce will not invent a score, critique, or recommendation."
        />
      </div>
    </AppShell>
  );
}
