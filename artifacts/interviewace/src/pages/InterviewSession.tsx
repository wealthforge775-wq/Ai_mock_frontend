import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, AudioLines, LockKeyhole, Mic2, RotateCcw, StopCircle } from 'lucide-react';
import { Link } from '@/components/Link';
import { AppShell, PageHeading } from '@/components/AppShell';
import { ContractState } from '@/components/ContractState';
import type { LocalInterviewSetupPreview } from '@/lib/local-interview-preview';

type InterviewSessionProps = {
  id?: string;
  setupPreview?: LocalInterviewSetupPreview | null;
};

export default function InterviewSession({ id, setupPreview }: InterviewSessionProps) {
  const [answer, setAnswer] = useState('');
  const [transcript, setTranscript] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingUrl, setRecordingUrl] = useState('');
  const [recordingError, setRecordingError] = useState('');
  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const recordingUrlRef = useRef('');
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
      recorderRef.current?.stop();
      streamRef.current?.getTracks().forEach((track) => track.stop());
      if (recordingUrlRef.current) {
        URL.revokeObjectURL(recordingUrlRef.current);
      }
    };
  }, []);

  async function startRecording() {
    setRecordingError('');

    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      setRecordingError('Audio recording is not supported in this browser.');
      return;
    }

    let stream: MediaStream | null = null;

    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      if (!mountedRef.current) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }

      const recorder = new MediaRecorder(stream);
      streamRef.current = stream;
      recorderRef.current = recorder;
      chunksRef.current = [];

      recorder.addEventListener('dataavailable', (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      });

      recorder.addEventListener('stop', () => {
        if (!mountedRef.current) {
          stream?.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
          recorderRef.current = null;
          return;
        }

        const audio = new Blob(chunksRef.current, {
          type: recorder.mimeType || 'audio/webm',
        });
        const nextUrl = URL.createObjectURL(audio);

        if (recordingUrlRef.current) {
          URL.revokeObjectURL(recordingUrlRef.current);
        }

        recordingUrlRef.current = nextUrl;
        setRecordingUrl(nextUrl);
        stream?.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
        recorderRef.current = null;
        setIsRecording(false);
      });

      recorder.start();
      setIsRecording(true);
    } catch (error) {
      stream?.getTracks().forEach((track) => track.stop());
      const denied = error instanceof DOMException && error.name === 'NotAllowedError';
      setRecordingError(denied
        ? 'Microphone permission was denied. Allow microphone access to record an answer.'
        : 'The microphone could not be started. Check its permission and try again.');
    }
  }

  function stopRecording() {
    if (recorderRef.current?.state === 'recording') {
      recorderRef.current.stop();
    }
  }

  function clearRecording() {
    if (recorderRef.current?.state === 'recording') {
      recorderRef.current.stop();
    }

    if (recordingUrlRef.current) {
      URL.revokeObjectURL(recordingUrlRef.current);
      recordingUrlRef.current = '';
    }

    setRecordingUrl('');
    setTranscript('');
    setRecordingError('');
  }

  function recordAgain() {
    clearRecording();
    void startRecording();
  }

  return (
    <AppShell>
      <div className="session-page">
        <Link className="back-link page-enter" data-testid="link-session-back" href={setupPreview ? '/interviews/new' : '/history'}>
          <ArrowLeft size={15} />
          {setupPreview ? 'Back to setup' : 'Back to interview history'}
        </Link>
        <PageHeading
          eyebrow={setupPreview ? 'LOCAL SETUP PREVIEW' : 'YOUR PRACTICE SESSION'}
          title={setupPreview ? 'Your setup, in one place.' : 'A little space to think.'}
          description={setupPreview
            ? 'This is a browser-local preview, not a saved interview. Real questions and session progress require the verified backend.'
            : 'Your interview state and questions will appear here once a verified session contract is available.'}
        />
        <div className="session-layout">
          <section className="session-workspace page-enter" data-testid="panel-session-workspace">
            <div className="session-topline">
              <div className="session-state-pill" data-testid="status-session-state">
                <span />
                {setupPreview ? 'LOCAL PREVIEW · NOT SAVED' : 'SESSION NOT LOADED'}
              </div>
              <span className="session-id-label font-mono" data-testid="text-session-reference">
                {setupPreview ? 'SETUP PREVIEW' : `SESSION / ${id ?? 'UNAVAILABLE'}`}
              </span>
            </div>
            {setupPreview ? (
              <section className="local-setup-preview" data-testid="card-local-setup-preview" aria-label="Local interview setup preview">
                <div className="local-setup-preview-heading">
                  <span className="eyebrow">YOUR DETAILS</span>
                  <span className="local-preview-badge">NOT SAVED</span>
                </div>
                <dl className="local-setup-preview-grid">
                  <div>
                    <dt>Role or position</dt>
                    <dd>{setupPreview.role || 'Not provided'}</dd>
                  </div>
                  <div>
                    <dt>Experience level</dt>
                    <dd>{setupPreview.experienceLevel || 'Not provided'}</dd>
                  </div>
                  <div>
                    <dt>Interview language</dt>
                    <dd>{setupPreview.language || 'Not provided'}</dd>
                  </div>
                  <div>
                    <dt>Difficulty</dt>
                    <dd>{setupPreview.difficulty || 'Not provided'}</dd>
                  </div>
                  {setupPreview.context ? (
                    <div className="local-setup-preview-wide">
                      <dt>Your note</dt>
                      <dd>{setupPreview.context}</dd>
                    </div>
                  ) : null}
                  {setupPreview.resume ? (
                    <div className="local-setup-preview-wide">
                      <dt>Selected resume</dt>
                      <dd>{setupPreview.resume.name} · {(setupPreview.resume.size / 1024).toFixed(1)} KB · not uploaded</dd>
                    </div>
                  ) : null}
                </dl>
                <p className="local-setup-preview-note" role="status" data-testid="status-session-local-preview">
                  No session was created. This preview contains only the details you entered in the previous step.
                </p>
              </section>
            ) : null}
            <div className="session-question-placeholder" data-testid="state-session-question-unavailable">
              <span className="session-question-icon"><AudioLines size={19} /></span>
              <span className="eyebrow" data-testid="text-session-question-label">YOUR NEXT QUESTION</span>
              <h2 className="font-display" data-testid="heading-session-question">Waiting for the real conversation.</h2>
              <p data-testid="text-session-question-description">Interview questions must come from your interview backend. No sample or placeholder question is shown.</p>
            </div>
            <label className="session-answer-label" htmlFor="session-answer" data-testid="label-session-answer">Your answer</label>
            <textarea
              data-testid="input-session-answer"
              id="session-answer"
              onChange={(event) => setAnswer(event.currentTarget.value)}
              placeholder="You can jot down a local draft here. It will not be saved or sent."
              rows={6}
              value={answer}
            />
            <div className="session-answer-meta">
              <span data-testid="text-session-answer-local">Draft is only held in this browser tab.</span>
              <span className="font-mono" data-testid="text-session-answer-length">{answer.length} CHARACTERS</span>
            </div>
            <section className="session-recording" data-testid="panel-session-recording">
              <div className="session-recording-heading">
                <div>
                  <span className="eyebrow" data-testid="text-session-recording-label">VOICE ANSWER</span>
                  <p data-testid="text-session-recording-description">Record and play back audio locally. It is not uploaded.</p>
                </div>
                {isRecording ? (
                  <button className="button button-secondary" data-testid="button-session-stop-recording" onClick={stopRecording} type="button">
                    <StopCircle size={15} />
                    Stop recording
                  </button>
                ) : (
                  <button className="button button-secondary" data-testid="button-session-record" onClick={() => void startRecording()} type="button">
                    <Mic2 size={15} />
                    {recordingUrl ? 'Record again' : 'Start recording'}
                  </button>
                )}
              </div>
              {recordingUrl ? (
                <div className="session-recording-playback" data-testid="state-session-recording-ready">
                  <audio controls data-testid="audio-session-playback" src={recordingUrl}>
                    Your browser cannot play this recording.
                  </audio>
                  <button className="text-link" data-testid="button-session-rerecord" onClick={recordAgain} type="button">
                    <RotateCcw size={14} />
                    Re-record
                  </button>
                </div>
              ) : null}
              {recordingError ? (
                <p className="session-recording-error" data-testid="status-session-recording-error" role="alert">{recordingError}</p>
              ) : null}
              <label className="session-answer-label" htmlFor="session-transcript" data-testid="label-session-transcript">Transcript or local draft</label>
              <textarea
                data-testid="input-session-transcript"
                id="session-transcript"
                onChange={(event) => setTranscript(event.currentTarget.value)}
                placeholder="A real transcription will appear here after its verified backend endpoint is connected. You can also keep a local draft."
                rows={3}
                value={transcript}
              />
              <div className="session-recording-footer">
                <span data-testid="text-session-transcript-local">Transcript text stays in this browser tab.</span>
                <button className="button button-secondary" data-testid="button-session-transcribe" disabled type="button">
                  Transcribe
                </button>
              </div>
            </section>
            <div className="session-actions">
              <button className="button button-dark" data-testid="button-session-submit-answer" disabled type="button">
                Submit answer
                <ArrowRight size={16} />
              </button>
            </div>
            <div className="session-blocked-note" data-testid="status-session-actions-blocked"><LockKeyhole size={14} /> Saving answers, uploading audio, transcription, progression and completion require verified endpoints.</div>
          </section>
          <aside className="session-aside" data-testid="panel-session-progress">
            <span className="eyebrow" data-testid="text-session-progress-label">SESSION GUIDE</span>
            <div className="session-progress-empty" data-testid="state-session-progress-unavailable">
              <div className="session-progress-empty-mark" aria-hidden="true"><span /><span /><span /></div>
              <h3 className="font-display" data-testid="heading-session-progress">Your progress lives in your session.</h3>
              <p data-testid="text-session-progress">
                {setupPreview
                  ? 'A real session and question sequence will appear after the backend contract is connected.'
                  : 'The backend has not supplied a session or question sequence for this route.'}
              </p>
            </div>
            {setupPreview ? (
              <span className="text-link" data-testid="status-session-report-pending">Reports appear after a real interview is completed.</span>
            ) : (
              <Link className="text-link" data-testid="link-session-report" href={`/interviews/${id ?? ':id'}/report`}>
                Open report page
                <ArrowRight size={14} />
              </Link>
            )}
          </aside>
        </div>
        <ContractState
          title={setupPreview ? 'This local preview is not a live interview' : 'Interview session data is not available'}
          description="The available source contains no InterviewAce session, question, answer submission, voice transcription, completion, or evaluation contracts. This page intentionally makes no backend request."
        />
      </div>
    </AppShell>
  );
}
