import { ArrowRight, AudioLines, ChartNoAxesCombined, FileClock, ShieldCheck } from 'lucide-react';
import { Link } from '@/components/Link';
import { AppShell, PageHeading } from '@/components/AppShell';
import { ContractState } from '@/components/ContractState';

const unavailableData = [
  { title: 'Practice sessions', detail: 'Completed interview count', icon: AudioLines },
  { title: 'Your momentum', detail: 'Performance over time', icon: ChartNoAxesCombined },
  { title: 'Recent activity', detail: 'Your latest practice sessions', icon: FileClock },
];

export default function Dashboard() {
  return (
    <AppShell>
      <div className="dashboard-page">
        <PageHeading
          eyebrow="YOUR PRACTICE SPACE"
          title="Good to have you here."
          description="A clear view of your preparation, whenever you’re ready to begin."
        />
        <div className="dashboard-welcome-row reveal-1" data-testid="card-dashboard-welcome">
          <div className="welcome-copy">
            <div className="welcome-label"><span className="welcome-spark" aria-hidden="true" /> YOUR NEXT STEP</div>
            <h2 className="font-display" data-testid="heading-dashboard-welcome">Start with a little practice.</h2>
            <p data-testid="text-dashboard-welcome">Choose the conversation you’re preparing for. You can take it one question at a time.</p>
            <Link className="button button-dark" data-testid="link-dashboard-start-practice" href="/interviews/new">
              Set up a practice
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="welcome-illustration" aria-hidden="true">
            <div className="welcome-orbit" />
            <div className="welcome-orbit welcome-orbit-inner" />
            <div className="welcome-center"><AudioLines size={26} /></div>
            <span className="welcome-orbit-label welcome-orbit-label-top">PREPARE</span>
            <span className="welcome-orbit-label welcome-orbit-label-bottom">AT YOUR PACE</span>
          </div>
        </div>

        <div className="dashboard-section-heading reveal-2">
          <div>
            <span className="eyebrow" data-testid="text-dashboard-overview-label">YOUR OVERVIEW</span>
            <h2 className="font-display" data-testid="heading-dashboard-overview">The picture, when it’s ready.</h2>
          </div>
          <span className="privacy-indicator" data-testid="status-dashboard-data-source">
            <ShieldCheck size={14} />
            Backend-sourced only
          </span>
        </div>

        <div className="unavailable-grid reveal-2" data-testid="list-dashboard-data-sections">
          {unavailableData.map((item, index) => {
            const Icon = item.icon;

            return (
              <article className="unavailable-tile" data-testid={`card-dashboard-data-${index + 1}`} key={item.title}>
                <div className="unavailable-tile-top">
                  <span className="unavailable-icon"><Icon size={17} /></span>
                  <span className="data-unavailable-label" data-testid={`status-dashboard-data-${index + 1}`}>NOT CONNECTED</span>
                </div>
                <h3 data-testid={`heading-dashboard-data-${index + 1}`}>{item.title}</h3>
                <p data-testid={`text-dashboard-data-${index + 1}`}>{item.detail}</p>
                <div className="unavailable-tile-line" aria-hidden="true" />
              </article>
            );
          })}
        </div>

        <ContractState />
        <div className="dashboard-footnote" data-testid="text-dashboard-no-sample-data">
          <span className="footnote-rule" />
          <span>No sample statistics or interview records are shown here.</span>
          <Link className="text-link" data-testid="link-dashboard-history" href="/history">View history space <ArrowRight size={14} /></Link>
        </div>
      </div>
    </AppShell>
  );
}
