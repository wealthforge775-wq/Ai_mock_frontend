import { ArrowRight, ChartNoAxesCombined, LockKeyhole, ShieldCheck } from 'lucide-react';
import { Link } from '@/components/Link';
import { AppShell, PageHeading } from '@/components/AppShell';
import { ContractState } from '@/components/ContractState';

export default function Analytics() {
  return (
    <AppShell>
      <div className="analytics-page">
        <PageHeading
          eyebrow="REFLECT, THEN GROW"
          title="Your progress, in context."
          description="Good feedback is grounded in real practice. This page will reflect your actual performance when the backend can provide it."
        />
        <section className="analytics-hero-card" data-testid="card-analytics-overview">
          <div className="analytics-hero-copy">
            <span className="eyebrow" data-testid="text-analytics-overview-label">A PERSONAL PICTURE</span>
            <h2 className="font-display" data-testid="heading-analytics-overview">Progress should mean something.</h2>
            <p data-testid="text-analytics-overview-description">No invented scores, trend lines, or milestones. Only information returned by your interview backend will ever appear here.</p>
          </div>
          <div className="analytics-hero-mark" aria-hidden="true"><ChartNoAxesCombined size={30} strokeWidth={1.5} /></div>
        </section>
        <div className="analytics-metric-row" data-testid="list-analytics-metrics">
          {['Performance over time', 'Practice frequency', 'Feedback themes'].map((item, index) => (
            <article className="analytics-metric" data-testid={`card-analytics-metric-${index + 1}`} key={item}>
              <span className="analytics-metric-status" data-testid={`status-analytics-metric-${index + 1}`}><LockKeyhole size={12} /> AWAITING DATA</span>
              <h3 data-testid={`heading-analytics-metric-${index + 1}`}>{item}</h3>
              <p data-testid={`text-analytics-metric-${index + 1}`}>Requires verified backend aggregates</p>
            </article>
          ))}
        </div>
        <div className="analytics-note" data-testid="text-analytics-trust-note"><ShieldCheck size={15} /> Your progress view will never be filled with placeholder scores.</div>
        <ContractState
          title="Analytics requires a verified aggregation contract"
          description="No performance metrics, aggregation rules, score scales, or time-series responses are available in the supplied API source. All metrics remain blank until verified."
        />
        <Link className="text-link analytics-history-link" data-testid="link-analytics-history" href="/history">
          Go to interview history
          <ArrowRight size={14} />
        </Link>
      </div>
    </AppShell>
  );
}
