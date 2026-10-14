import {
  ArrowDown,
  ArrowRight,
  AudioLines,
  Check,
  CircleHelp,
  FileText,
  Focus,
  MessagesSquare,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Link } from '@/components/Link';
import { integrationStatus } from '@/lib/config';

const practiceSteps = [
  {
    number: '01',
    title: 'Set the scene',
    detail: 'Choose the role and context you want to rehearse for.',
    icon: Focus,
  },
  {
    number: '02',
    title: 'Find your words',
    detail: 'Work through a conversation built around your interview.',
    icon: MessagesSquare,
  },
  {
    number: '03',
    title: 'Leave with clarity',
    detail: 'Review considered feedback and decide what to practice next.',
    icon: AudioLines,
  },
];

export default function Home() {
  return (
    <div className="landing-page" data-testid="page-home">
      <header className="landing-header" data-testid="navigation-public">
        <Link className="brand" data-testid="link-brand-home" href="/">
          <span className="brand-mark brand-mark-light" aria-hidden="true"><AudioLines size={19} /></span>
          <span className="brand-wordmark">interview<span>ace</span></span>
        </Link>
        <nav className="landing-nav" aria-label="Public navigation">
          <a className="landing-nav-anchor" data-testid="link-home-how-it-works" href="#approach">The approach</a>
          <a className="landing-nav-anchor" data-testid="link-home-principles" href="#principles">Our principles</a>
        </nav>
        <div className="landing-actions">
          <Link className="landing-sign-in" data-testid="link-home-sign-in" href="/sign-in">
            Sign in
          </Link>
          <Link className="button button-dark" data-testid="link-home-sign-up" href="/sign-up">
            Start practicing
            <ArrowRight size={16} />
          </Link>
        </div>
      </header>

      <main>
        <section className="hero-section" data-testid="section-home-hero">
          <div className="hero-grain" aria-hidden="true" />
          <div className="hero-copy">
            <div className="hero-kicker reveal-1">
              <span className="hero-kicker-dot" aria-hidden="true" />
              A steadier way to get ready
            </div>
            <h1 className="hero-title font-display reveal-2">
              Your next answer
              <br />
              <em>starts here.</em>
            </h1>
            <p className="hero-description reveal-3" data-testid="text-home-hero-description">
              Make space to think out loud. Practice for the conversations that matter, then meet them feeling more like yourself.
            </p>
            <div className="hero-buttons reveal-3">
              <Link className="button button-light button-large" data-testid="link-hero-practice" href="/sign-up">
                Find your footing
                <ArrowRight size={17} />
              </Link>
              <Link className="hero-text-link" data-testid="link-hero-dashboard" href="/dashboard">
                Explore your practice space
              </Link>
            </div>
            <div className="hero-assurance reveal-3" data-testid="text-home-privacy-note">
              <ShieldCheck size={15} />
              Your practice is personal. Your pace is your own.
            </div>
          </div>
          <div className="hero-art" aria-label="An abstract editorial illustration of a prepared speaker finding their voice" data-testid="illustration-home-hero">
            <div className="hero-art-orbit hero-art-orbit-one" aria-hidden="true" />
            <div className="hero-art-orbit hero-art-orbit-two" aria-hidden="true" />
            <div className="hero-art-stamp" aria-hidden="true"><span>TAKE</span><span>YOUR</span><span>TIME</span></div>
            <div className="hero-art-paper" aria-hidden="true">
              <div className="paper-overline">A NOTE TO SELF</div>
              <div className="paper-title font-display">Breathe.<br />Begin.<br /><i>Be clear.</i></div>
              <div className="paper-signature">one answer at a time</div>
            </div>
            <div className="hero-art-sun" aria-hidden="true" />
            <div className="hero-art-caption" data-testid="text-hero-art-caption">
              <span className="hero-caption-mark"><Sparkles size={15} /></span>
              Practice makes room for possibility.
            </div>
            <div className="hero-art-index font-mono" aria-hidden="true">FIG. 01 / PREPARATION</div>
          </div>
          <a className="hero-scroll" href="#approach" data-testid="link-home-scroll-approach">
            <span>SCROLL TO EXPLORE</span>
            <ArrowDown size={15} />
          </a>
          <span className="hero-index font-mono" aria-hidden="true">INTERVIEWACE — PERSONAL PRACTICE, REAL PROGRESS</span>
        </section>

        <section className="manifesto-section" id="approach" data-testid="section-home-approach">
          <div className="manifesto-meta">
            <span className="eyebrow" data-testid="text-approach-eyebrow">A BETTER KIND OF REHEARSAL</span>
            <span className="font-mono manifesto-number" aria-hidden="true">01 / 03</span>
          </div>
          <div className="manifesto-content">
            <h2 className="manifesto-title font-display" data-testid="heading-approach">
              Preparation isn’t about having a perfect answer.
              <span> It’s about trusting the one that’s yours.</span>
            </h2>
            <p className="manifesto-description" data-testid="text-approach-description">
              The right practice gives you a little more room to think, a little more confidence in your story, and a calmer start when it counts.
            </p>
          </div>
          <div className="manifesto-line" aria-hidden="true" />
          <span className="manifesto-side-note">THOUGHTFUL PREPARATION / ALWAYS</span>
        </section>

        <section className="steps-section" data-testid="section-home-steps">
          <div className="steps-intro">
            <span className="eyebrow" data-testid="text-steps-eyebrow">A SIMPLE RHYTHM</span>
            <h2 className="font-display" data-testid="heading-steps">Practice, without<br /><em>the pressure.</em></h2>
            <p data-testid="text-steps-description">A quiet space to prepare for the real thing. No performance required.</p>
          </div>
          <div className="steps-list" data-testid="list-practice-steps">
            {practiceSteps.map((step) => {
              const Icon = step.icon;

              return (
                <article className="step-item" data-testid={`card-practice-step-${step.number}`} key={step.number}>
                  <div className="step-number font-mono" data-testid={`text-practice-step-number-${step.number}`}>{step.number}</div>
                  <div className="step-icon" aria-hidden="true"><Icon size={19} /></div>
                  <div className="step-content">
                    <h3 data-testid={`heading-practice-step-${step.number}`}>{step.title}</h3>
                    <p data-testid={`text-practice-step-${step.number}`}>{step.detail}</p>
                  </div>
                  <Check className="step-check" size={16} aria-hidden="true" />
                </article>
              );
            })}
          </div>
        </section>

        <section className="principles-section" id="principles" data-testid="section-home-principles">
          <div className="principles-topline">
            <span className="eyebrow" data-testid="text-principles-eyebrow">BUILT AROUND YOU</span>
            <span className="font-mono principles-side-note">CLEAR / PRIVATE / HUMAN</span>
          </div>
          <div className="principles-grid">
            <article className="principle-card principle-card-primary" data-testid="card-principle-personal">
              <span className="principle-index font-mono">01</span>
              <div className="principle-icon"><MessagesSquare size={19} /></div>
              <h3 className="font-display" data-testid="heading-principle-personal">Practice that feels personal.</h3>
              <p data-testid="text-principle-personal">Bring the role, the nerves, and the questions you’re carrying. Start where you are.</p>
              <span className="principle-rule" aria-hidden="true" />
            </article>
            <article className="principle-card principle-card-secondary" data-testid="card-principle-private">
              <span className="principle-index font-mono">02</span>
              <div className="principle-icon"><ShieldCheck size={19} /></div>
              <h3 className="font-display" data-testid="heading-principle-private">A private place to prepare.</h3>
              <p data-testid="text-principle-private">Your preparation belongs to you. Come back when you’re ready for another round.</p>
              <span className="principle-rule" aria-hidden="true" />
            </article>
            <article className="principle-card principle-card-plain" data-testid="card-principle-useful">
              <span className="principle-index font-mono">03</span>
              <div className="principle-icon"><FileText size={19} /></div>
              <h3 className="font-display" data-testid="heading-principle-useful">Feedback you can use.</h3>
              <p data-testid="text-principle-useful">Thoughtful reflection should give you a next step, not another reason to second-guess.</p>
              <span className="principle-rule" aria-hidden="true" />
            </article>
          </div>
        </section>

        <section className="landing-cta-section" data-testid="section-home-closing">
          <div className="cta-ornament" aria-hidden="true"><CircleHelp size={22} /></div>
          <span className="eyebrow" data-testid="text-closing-eyebrow">WHEN YOU’RE READY</span>
          <h2 className="font-display" data-testid="heading-closing">Take a breath.<br /><em>Then take the next step.</em></h2>
          <p data-testid="text-closing-description">Your next interview matters. So does feeling ready for it.</p>
          <Link className="button button-light button-large" data-testid="link-closing-sign-up" href="/sign-up">
            Begin your practice
            <ArrowRight size={17} />
          </Link>
          {!integrationStatus.clerkConfigured ? (
            <p className="closing-auth-note" data-testid="text-closing-auth-note">Sign-in becomes available when your existing Clerk publishable key is configured.</p>
          ) : null}
        </section>
      </main>

      <footer className="landing-footer" data-testid="footer-public">
        <Link className="brand footer-brand" data-testid="link-footer-brand" href="/">
          <span className="brand-mark brand-mark-light" aria-hidden="true"><AudioLines size={17} /></span>
          <span className="brand-wordmark">interview<span>ace</span></span>
        </Link>
        <span className="footer-note" data-testid="text-footer-note">Thoughtful practice for what comes next.</span>
        <span className="footer-legal font-mono" data-testid="text-footer-system">A PERSONAL PRACTICE SPACE</span>
      </footer>
    </div>
  );
}
