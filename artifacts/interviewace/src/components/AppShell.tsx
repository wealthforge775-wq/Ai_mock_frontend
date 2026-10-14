import { useState, type ReactNode } from 'react';
import {
  Activity,
  ArrowUpRight,
  ChartNoAxesCombined,
  ChevronDown,
  ClipboardCheck,
  FileClock,
  LayoutDashboard,
  Menu,
  Mic2,
  Plus,
  UserRound,
  X,
} from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Link } from '@/components/Link';
import { MissingAuthState } from '@/components/ContractState';
import { integrationStatus } from '@/lib/config';

const navigation = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/interviews/new', label: 'Practice interview', icon: Mic2 },
  { href: '/history', label: 'Interview history', icon: FileClock },
  { href: '/analytics', label: 'Your progress', icon: ChartNoAxesCombined },
];

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const location = useLocation().pathname;
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeItem = navigation.find((item) => location === item.href)?.label ?? 'InterviewAce';

  return (
    <div className="workspace" data-testid="layout-workspace">
      <aside className={`workspace-sidebar${mobileOpen ? ' workspace-sidebar-open' : ''}`} data-testid="navigation-sidebar">
        <Link className="brand brand-sidebar" data-testid="link-brand-dashboard" href="/dashboard">
          <span className="brand-mark" aria-hidden="true">
            <Mic2 size={19} strokeWidth={2.2} />
          </span>
          <span className="brand-wordmark">interview<span>ace</span></span>
        </Link>
        <div className="sidebar-caption" data-testid="text-sidebar-workspace-label">YOUR PRACTICE SPACE</div>
        <nav className="sidebar-nav" aria-label="Main navigation" data-testid="navigation-main">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = item.href === '/interviews/new'
              ? location === item.href
              : location === item.href || (item.href !== '/dashboard' && location.startsWith(`${item.href}/`));

            return (
              <Link
                className={`sidebar-link${isActive ? ' sidebar-link-active' : ''}`}
                data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`}
                href={item.href}
                key={item.href}
                onClick={() => setMobileOpen(false)}
              >
                <Icon size={17} strokeWidth={1.8} />
                <span>{item.label}</span>
                {item.href === '/interviews/new' ? <ArrowUpRight className="sidebar-link-arrow" size={14} /> : null}
              </Link>
            );
          })}
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-note" data-testid="card-sidebar-encouragement">
            <span className="sidebar-note-index">A SMALL REMINDER</span>
            <p>Good interviews are built one thoughtful answer at a time.</p>
            <span className="sidebar-note-line" aria-hidden="true" />
          </div>
          <Link
            className={`profile-nav${location === '/profile' ? ' profile-nav-active' : ''}`}
            data-testid="link-nav-profile"
            href="/profile"
            onClick={() => setMobileOpen(false)}
          >
            <span className="profile-avatar" aria-hidden="true"><UserRound size={16} /></span>
            <span className="profile-nav-copy">
              <strong data-testid="text-sidebar-profile-label">Your profile</strong>
              <small>{integrationStatus.clerkConfigured ? 'Account settings' : 'Connect account'}</small>
            </span>
            <ChevronDown className="profile-nav-chevron" size={15} />
          </Link>
        </div>
      </aside>
      {mobileOpen ? (
        <button
          aria-label="Close navigation"
          className="sidebar-scrim"
          data-testid="button-close-navigation-overlay"
          onClick={() => setMobileOpen(false)}
          type="button"
        />
      ) : null}
      <div className="workspace-main">
        <header className="workspace-topbar" data-testid="navigation-topbar">
          <button
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="mobile-menu-button"
            data-testid="button-toggle-navigation"
            onClick={() => setMobileOpen(!mobileOpen)}
            type="button"
          >
            {mobileOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
          <div className="breadcrumb" data-testid="text-current-page">
            <span>Practice space</span>
            <span className="breadcrumb-divider">/</span>
            <strong>{activeItem}</strong>
          </div>
          <div className="topbar-right">
            <span className={`connection-pill${integrationStatus.apiConfigured ? ' connection-pill-ready' : ''}`} data-testid="status-backend-connection">
              <span className="connection-dot" aria-hidden="true" />
              {integrationStatus.apiConfigured ? 'API address set' : 'Awaiting backend'}
            </span>
            <Link className="button button-primary topbar-cta" data-testid="link-topbar-new-interview" href="/interviews/new">
              <Plus size={16} />
              <span>New practice</span>
            </Link>
          </div>
        </header>
        <main className="workspace-content" data-testid="main-workspace-content">
          {!integrationStatus.clerkConfigured ? (
            <div className="shell-auth-notice" data-testid="state-shell-auth-notice">
              <MissingAuthState />
            </div>
          ) : null}
          {children}
        </main>
        <footer className="workspace-footer" data-testid="footer-workspace">
          <span><Activity size={13} /> Private practice, at your pace.</span>
          <span className="font-mono">INTERVIEWACE / PERSONAL WORKSPACE</span>
        </footer>
      </div>
    </div>
  );
}

export function PageHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="page-heading page-enter">
      <span className="eyebrow" data-testid="text-page-eyebrow">{eyebrow}</span>
      <h1 className="font-display" data-testid="heading-page-title">{title}</h1>
      <p data-testid="text-page-description">{description}</p>
    </div>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="section-label" data-testid="text-section-label">
      <ClipboardCheck size={15} />
      <span>{children}</span>
    </div>
  );
}
