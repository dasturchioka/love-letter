import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { Send } from 'lucide-react';
import { content } from './content.js';
import { MOTION_SPEED } from './motion.js';

function FadeText({ text, delay = 0, stagger = 22, maxStagger = 1400, display = false, start = true, onComplete }) {
  const [finished, setFinished] = useState(false);
  const completedRef = useRef(false);
  const letterCount = Array.from(text.replace(/\s/g, '')).length;
  const step = Math.min(stagger, maxStagger / Math.max(1, letterCount - 1));
  const tokens = text.split(/(\n|[^\S\n]+)/);
  const fadeDuration = (display ? 550 : 450) * MOTION_SPEED;
  let lastWordIndex = -1;
  let letterIndex = 0;
  tokens.forEach((word, index) => { if (/\S/.test(word)) lastWordIndex = index; });

  useEffect(() => {
    if (!start || completedRef.current) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finishWithoutMotion = () => {
      if ((preference.matches || lastWordIndex === -1) && !completedRef.current) {
        completedRef.current = true;
        setFinished(true);
        onComplete?.();
      }
    };
    finishWithoutMotion();
    preference.addEventListener('change', finishWithoutMotion);
    return () => preference.removeEventListener('change', finishWithoutMotion);
  }, [start, onComplete, lastWordIndex, finished]);

  const complete = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    setFinished(true);
    onComplete?.();
  };

  return (
    <span className={`fade-typing${finished ? ' is-complete' : start ? ' is-typing' : ' is-pending'}${display ? ' display-typing' : ''}`}>
      <span className="sr-only">{text.replace(/\n/g, ' ')}</span>
      <span aria-hidden="true">
        {tokens.map((word, wordIndex) => {
          if (word === '\n') return <br key={wordIndex} />;
          if (/^\s*$/.test(word)) return word;
          const length = Array.from(word).length;
          const wordDelay = (delay + letterIndex * step) * MOTION_SPEED;
          const wordDuration = Math.max(1, length * step) * MOTION_SPEED;
          letterIndex += length;
          const completionAnimation = display
            ? (wordDuration > fadeDuration ? 'ink-word-type' : 'ink-word-focus')
            : 'ink-word-fade';
          return (
            <span
              className="typing-word"
              key={wordIndex}
              style={{ '--word-delay': `${wordDelay}ms`, '--word-duration': `${wordDuration}ms`, '--word-steps': length }}
              onAnimationEnd={wordIndex === lastWordIndex ? (event) => {
                if (event.target === event.currentTarget && event.animationName === completionAnimation) complete();
              } : undefined}
            >
              {word}
            </span>
          );
        })}
      </span>
    </span>
  );
}

function LetterParagraphs({ onComplete }) {
  const [activeParagraph, setActiveParagraph] = useState(0);

  useEffect(() => {
    if (!content.message.length) onComplete();
  }, [onComplete]);

  return (
    <div className="letter-body">
      {content.message.map((paragraph, index) => (
        <p key={paragraph}>
          <FadeText
            text={paragraph}
            delay={100}
            stagger={12}
            maxStagger={2400}
            start={index <= activeParagraph}
            onComplete={() => {
              setActiveParagraph((current) => Math.max(current, index + 1));
              if (index === content.message.length - 1) onComplete();
            }}
          />
        </p>
      ))}
    </div>
  );
}

function DevelopingTitle({ text }) {
  return <div className="developing-title"><h1><FadeText text={text} delay={120} stagger={34} display /></h1></div>;
}

const stickers = [
  { name: 'bow', file: 'bow.webp' },
  { name: 'sparkles', file: 'sparkles.webp' },
  { name: 'flower', file: 'flower.webp' },
  { name: 'sketched-heart', file: 'sketched-heart.webp' },
  { name: 'fingerprint-heart', file: 'fingerprint-heart.webp' },
];

function FloatingStickers({ stage }) {
  const layerRef = useRef(null);

  useEffect(() => {
    const layer = layerRef.current;
    const scene = layer.parentElement;
    const updateVisibility = () => { scene.dataset.pageHidden = String(document.hidden); };
    updateVisibility();
    document.addEventListener('visibilitychange', updateVisibility);

    let observer;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => { entry.target.dataset.inView = String(entry.isIntersecting); });
      });
      observer.observe(scene);
      layer.querySelectorAll('.floating-sticker').forEach((sticker) => observer.observe(sticker));
      scene.querySelectorAll('.sender-credit').forEach((element) => observer.observe(element));
    }

    return () => {
      observer?.disconnect();
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, [stage]);

  return (
    <div className="sticker-layer" ref={layerRef} aria-hidden="true">
      {stickers.map(({ name, file }) => (
        <span className={`floating-sticker sticker-${name}`} key={name}>
          <span className="sticker-motion">
            <img src={`/stickers/${file}`} alt="" draggable={false} decoding="async" />
          </span>
        </span>
      ))}
    </div>
  );
}

export default function App() {
  const [stage, setStage] = useState('intro');
  const [letterComplete, setLetterComplete] = useState(false);
  const audioSrc = content.musicSrc;
  const [imageSrc, setImageSrc] = useState(content.imageSrc);
  const [audioNotice, setAudioNotice] = useState('');
  const audioRef = useRef(null);
  const printRef = useRef(null);
  const panelRef = useRef(null);
  const stageRef = useRef(stage);
  const viewTransitionRef = useRef(null);
  const exitAnimationRef = useRef(null);
  const transitionSequenceRef = useRef(0);

  useEffect(() => () => {
    transitionSequenceRef.current += 1;
    viewTransitionRef.current?.skipTransition();
    exitAnimationRef.current?.cancel();
  }, []);

  useEffect(() => {
    stageRef.current = stage;
  }, [stage]);

  useEffect(() => {
    if (stage === 'intro') return;
    printRef.current?.focus({ preventScroll: true });
  }, [stage]);

  const playMusic = async () => {
    if (!audioSrc || !audioRef.current) return;
    audioRef.current.volume = 1;
    try {
      await audioRef.current.play();
      setAudioNotice('');
    } catch {
      setAudioNotice('The music could not start. Please check the audio file.');
    }
  };

  const transitionTo = (nextStage) => {
    if (nextStage === 'letter') setLetterComplete(false);
    const sequence = ++transitionSequenceRef.current;
    viewTransitionRef.current?.skipTransition();
    exitAnimationRef.current?.cancel();

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStage(nextStage);
      return;
    }

    if (document.startViewTransition) {
      const transition = document.startViewTransition(() => {
        flushSync(() => setStage(nextStage));
      });
      viewTransitionRef.current = transition;
      void transition.finished.catch(() => {}).then(() => {
        if (viewTransitionRef.current === transition) viewTransitionRef.current = null;
      });
      return;
    }

    if (!panelRef.current?.animate) {
      setStage(nextStage);
      return;
    }

    const exit = panelRef.current.animate([
      { opacity: 1, filter: 'blur(0px)', transform: 'translateY(0)' },
      { opacity: 0, filter: 'blur(3px)', transform: 'translateY(-8px)' },
    ], { duration: 180 * MOTION_SPEED, easing: 'ease-in', fill: 'forwards' });
    exitAnimationRef.current = exit;
    void exit.finished.catch(() => {}).then(() => {
      if (transitionSequenceRef.current === sequence) setStage(nextStage);
    });
  };

  const openLetter = () => {
    void playMusic();
    transitionTo('letter');
  };

  return (
    <div className={`darkroom stage-${stage}`}>
      {import.meta.env.DEV && audioNotice && <p className="audio-notice" role="status"><FadeText key={audioNotice} text={audioNotice} /></p>}

      <main className="room-main" id="letter">
        <div className="letter-scene">
          <FloatingStickers stage={stage} />
          <article className="print" ref={printRef} tabIndex={-1} aria-label="A personal letter for Shahlo">
            <div className="stage-panel" ref={panelRef} key={stage}>
              {stage === 'intro' && (
                <div className="intro-content">
                  <h1 className="intro-title">
                    <button className="title-open" onClick={openLetter} aria-label="What I want to say… — open the letter">
                      <FadeText text={content.title} delay={180} stagger={38} display />
                    </button>
                  </h1>
                </div>
              )}

              {stage === 'letter' && (
                <div className="letter-content">
                  <DevelopingTitle text={content.title} />
                  {imageSrc && (
                    <figure className="personal-photo">
                      <img
                        src={imageSrc}
                        alt={content.imageAlt || 'A photo chosen for this letter'}
                        onError={() => setImageSrc('')}
                      />
                    </figure>
                  )}
                  <LetterParagraphs onComplete={() => setLetterComplete(true)} />
                  <div className={`reply-section${letterComplete ? ' is-revealed' : ''}`} inert={!letterComplete} aria-hidden={!letterComplete}>
                    <a className="button answer-button" href={content.replyUrl} target="_blank" rel="noopener noreferrer">
                      <FadeText text={content.replyLabel} delay={100} start={letterComplete} />
                      <Send size={18} aria-hidden="true" />
                    </a>
                    <p className="sender-credit">
                      <FadeText text={content.senderCredit} delay={350} stagger={32} display start={letterComplete} />
                      <span className="sender-credit-heart" aria-hidden="true">
                        <img src="/stickers/fingerprint-heart.webp" alt="" draggable={false} decoding="async" />
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </article>
        </div>

      </main>

      <audio
        ref={audioRef}
        src={audioSrc || undefined}
        loop
        preload="none"
        onError={() => setAudioNotice('The audio file could not be opened. Please check the file path.')}
        onLoadedMetadata={() => {
          if (stageRef.current !== 'intro') void playMusic();
        }}
      />
    </div>
  );
}
