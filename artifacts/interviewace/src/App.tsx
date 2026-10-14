import { useEffect, type ReactNode } from 'react';
import { ClerkProvider, SignIn, SignUp, useAuth } from '@clerk/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Link } from '@/components/Link';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { clerkPublishableKey, integrationStatus } from '@/lib/config';
import { setSessionTokenGetter } from '@/lib/api-client';
import Analytics from '@/pages/Analytics';
import AuthUnavailable from '@/pages/AuthUnavailable';
import Dashboard from '@/pages/Dashboard';
import History from '@/pages/History';
import Home from '@/pages/Home';
import InterviewReport from '@/pages/InterviewReport';
import InterviewSession from '@/pages/InterviewSession';
import NewInterview from '@/pages/NewInterview';
import Profile from '@/pages/Profile';
import NotFound from '@/pages/not-found';
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';

const queryClient = new QueryClient();
const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
const clerkPubKey = clerkPublishableKey;

function stripBase(path: string) {
  return basePath && path.startsWith(basePath) ? path.slice(basePath.length) || '/' : path;
}

function TokenBridge() {
  const { getToken } = useAuth();

  useEffect(() => {
    setSessionTokenGetter(() => getToken());

    return () => {
      setSessionTokenGetter(null);
    };
  }, [getToken]);

  return null;
}

function SignedInOnly({ children }: { children: ReactNode }) {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <div className="auth-loading" data-testid="state-auth-loading">
        <div className="auth-loading-mark" />
        <span data-testid="text-auth-loading">Preparing your private practice space…</span>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <main className="access-page" data-testid="page-auth-required">
        <div className="access-card">
          <span className="auth-card-mark" aria-hidden="true"><span /></span>
          <span className="eyebrow" data-testid="text-access-eyebrow">YOUR PRACTICE SPACE</span>
          <h1 className="font-display" data-testid="heading-access-required">Sign in when you’re ready.</h1>
          <p data-testid="text-access-required">This area is personal to your account. Sign in through your existing Clerk setup to continue.</p>
          <Link className="button button-dark" data-testid="link-access-sign-in" href="/sign-in">Sign in to continue</Link>
        </div>
      </main>
    );
  }

  return children;
}

function PrivateRoute({ children }: { children: ReactNode }) {
  return integrationStatus.clerkConfigured
    ? <SignedInOnly>{children}</SignedInOnly>
    : <AuthUnavailable mode="sign-in" />;
}

function InterviewReportRoute() {
  const { id } = useParams();
  return (
    <PrivateRoute>
      <InterviewReport id={id} />
    </PrivateRoute>
  );
}

function InterviewSessionRoute() {
  const { id } = useParams();
  return (
    <PrivateRoute>
      <InterviewSession id={id} />
    </PrivateRoute>
  );
}

function RouteMap() {
  const location = useLocation();

  return (
    <ErrorBoundary resetKey={location.pathname}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/sign-in/*"
          element={
            integrationStatus.clerkConfigured ? (
              <div className="clerk-page" data-testid="page-clerk-sign-in">
                <SignIn
                  path={`${basePath}/sign-in`}
                  routing="path"
                  signUpUrl={`${basePath}/sign-up`}
                />
              </div>
            ) : (
              <AuthUnavailable mode="sign-in" />
            )
          }
        />
        <Route
          path="/sign-up/*"
          element={
            integrationStatus.clerkConfigured ? (
              <div className="clerk-page" data-testid="page-clerk-sign-up">
                <SignUp
                  path={`${basePath}/sign-up`}
                  routing="path"
                  signInUrl={`${basePath}/sign-in`}
                />
              </div>
            ) : (
              <AuthUnavailable mode="sign-up" />
            )
          }
        />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/interviews/new" element={<PrivateRoute><NewInterview /></PrivateRoute>} />
        <Route path="/interviews/:id/report" element={<InterviewReportRoute />} />
        <Route path="/interviews/:id" element={<InterviewSessionRoute />} />
        <Route path="/history" element={<PrivateRoute><History /></PrivateRoute>} />
        <Route path="/analytics" element={<PrivateRoute><Analytics /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  );
}

function ClerkRoutes() {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: '#263a4a',
          colorForeground: '#293542',
          colorMutedForeground: '#707d85',
          colorBackground: '#fcfaf5',
          colorInput: '#fffdf9',
          colorInputForeground: '#293542',
          colorDanger: '#a5473f',
          colorNeutral: '#ded8cc',
          fontFamily: 'DM Sans, sans-serif',
          borderRadius: '0.85rem',
        },
        elements: {
          cardBox: 'w-[440px] max-w-full',
          card: '!shadow-none !border !border-[#ded8cc] !rounded-2xl',
          headerTitle: 'font-semibold tracking-tight',
          formButtonPrimary: 'font-semibold',
        },
      }}
      localization={{
        signIn: {
          start: {
            title: 'Welcome back',
            subtitle: 'Make a little room to prepare.',
          },
        },
        signUp: {
          start: {
            title: 'Start your practice',
            subtitle: 'A steadier way to get ready.',
          },
        },
      }}
      publishableKey={clerkPubKey}
      routerPush={(to: string) => navigate(stripBase(to))}
      routerReplace={(to: string) => navigate(stripBase(to), { replace: true })}
      signInUrl={`${basePath}/sign-in`}
      signUpUrl={`${basePath}/sign-up`}
    >
      <TokenBridge />
      <RouteMap />
    </ClerkProvider>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const location = useLocation();
  return <ErrorBoundary resetKey={location.pathname}>{children}</ErrorBoundary>;
}

function AppRoutes() {
  return integrationStatus.clerkConfigured ? <ClerkRoutes /> : <RouteMap />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter basename={basePath || '/'}>
          <RoutedErrorBoundary>
            <AppRoutes />
          </RoutedErrorBoundary>
        </BrowserRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
