import { useEffect, useRef, useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import { useSidebar } from '../../context/SidebarContext';
import './WhistlezRingtone.css';

const initialRingtones = [
  {
    id: 'bell-classic',
    name: 'Bell Classic',
    duration: 15,
    isDefault: true,
    active: true,
    tone: 'bell',
    audioUrl: null,
  },
  {
    id: 'synth-wave-ring',
    name: 'Synth Wave Ring',
    duration: 28,
    isDefault: false,
    active: false,
    tone: 'synth',
    audioUrl: null,
  },
  {
    id: 'chiptune-laugh',
    name: 'Chiptune Laugh',
    duration: 8,
    isDefault: false,
    active: false,
    tone: 'chiptune',
    audioUrl: null,
  },
  {
    id: 'corporate-ring',
    name: 'Corporate Ring',
    duration: 30,
    isDefault: false,
    active: false,
    tone: 'corporate',
    audioUrl: null,
  },
];

const toneOptions = [
  { value: 'bell', label: 'Bell Chime' },
  { value: 'synth', label: 'Synth Wave' },
  { value: 'chiptune', label: 'Chiptune Blip' },
  { value: 'corporate', label: 'Corporate Tone' },
];

const MusicNoteIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 18V5L21 3V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="2"/>
    <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const PlayIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 4L20 12L6 20V4Z" />
  </svg>
);

const PauseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="4" width="4" height="16" rx="1" />
    <rect x="14" y="4" width="4" height="16" rx="1" />
  </svg>
);

const PencilIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 4H4C3.44772 4 3 4.44772 3 5V20C3 20.5523 3.44772 21 4 21H19C19.5523 21 20 20.5523 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 6V4C8 3.44772 8.44772 3 9 3H15C15.5523 3 16 3.44772 16 4V6M19 6V20C19 20.5523 18.5523 21 18 21H6C5.44772 21 5 20.5523 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const UploadIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 16V4M12 4L7 9M12 4L17 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 16V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function formatTime(totalSeconds) {
  const seconds = Math.max(0, Math.round(totalSeconds || 0));
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;
  return `${minutes}:${remaining.toString().padStart(2, '0')}`;
}

const toneRecipes = {
  bell: [
    { freq: 880, type: 'sine', at: 0, dur: 0.5 },
    { freq: 660, type: 'sine', at: 0.4, dur: 0.5 },
    { freq: 990, type: 'sine', at: 0.8, dur: 0.6 },
  ],
  synth: [
    { freq: 220, type: 'sawtooth', at: 0, dur: 0.6 },
    { freq: 330, type: 'sawtooth', at: 0.5, dur: 0.6 },
    { freq: 440, type: 'sawtooth', at: 1.0, dur: 0.8 },
  ],
  chiptune: [
    { freq: 523, type: 'square', at: 0, dur: 0.12 },
    { freq: 659, type: 'square', at: 0.14, dur: 0.12 },
    { freq: 784, type: 'square', at: 0.28, dur: 0.18 },
  ],
  corporate: [
    { freq: 392, type: 'triangle', at: 0, dur: 0.7 },
    { freq: 494, type: 'triangle', at: 0.6, dur: 0.7 },
    { freq: 587, type: 'triangle', at: 1.2, dur: 0.9 },
  ],
};

const emptyForm = {
  name: '',
  toneType: 'bell',
  audioFile: null,
  audioUrl: null,
  duration: 10,
  setAsDefault: false,
};

function WhistlezRingtone() {
  const { isCollapsed } = useSidebar();
  const [ringtones, setRingtones] = useState(initialRingtones);
  const [playingId, setPlayingId] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState('');

  const audioCtxRef = useRef(null);
  const intervalRef = useRef(null);
  const stopTimeoutRef = useRef(null);
  const audioElRef = useRef(null);
  const activeOscillatorsRef = useRef([]);
  const endedHandlerRef = useRef(null);

  if (!audioElRef.current && typeof window !== 'undefined') {
    audioElRef.current = new Audio();
  }

  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioCtxRef.current = new AudioContextClass();
    }
    return audioCtxRef.current;
  };

  const clearPlaybackTimers = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (stopTimeoutRef.current) {
      clearTimeout(stopTimeoutRef.current);
      stopTimeoutRef.current = null;
    }
  };

  const clearActiveOscillators = () => {
    if (activeOscillatorsRef.current.length) {
      activeOscillatorsRef.current.forEach((osc) => {
        try {
          osc.stop();
        } catch (error) {
          // ignore if already stopped
        }
      });
      activeOscillatorsRef.current = [];
    }
  };

  const scheduleTone = (ctx, recipe, loopDuration, totalDuration) => {
    let cursor = 0;
    while (cursor < totalDuration) {
      recipe.forEach((note) => {
        const startAt = ctx.currentTime + cursor + note.at;
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        oscillator.type = note.type;
        oscillator.frequency.setValueAtTime(note.freq, startAt);
        gainNode.gain.setValueAtTime(0, startAt);
        gainNode.gain.linearRampToValueAtTime(0.18, startAt + 0.03);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, startAt + note.dur);
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        oscillator.start(startAt);
        oscillator.stop(startAt + note.dur + 0.05);
        activeOscillatorsRef.current.push(oscillator);
      });
      cursor += loopDuration;
    }
  };

  const stopPlayback = () => {
    clearPlaybackTimers();
    if (audioElRef.current) {
      if (endedHandlerRef.current) {
        audioElRef.current.removeEventListener('ended', endedHandlerRef.current);
        endedHandlerRef.current = null;
      }
      audioElRef.current.pause();
      audioElRef.current.currentTime = 0;
      audioElRef.current.src = '';
    }
    clearActiveOscillators();
    setPlayingId(null);
    setElapsed(0);
  };

  const playRingtone = (ringtone) => {
    if (playingId === ringtone.id) {
      stopPlayback();
      return;
    }

    stopPlayback();

    if (ringtone.audioUrl) {
      const audioEl = audioElRef.current;
      audioEl.src = ringtone.audioUrl;
      audioEl.currentTime = 0;
      audioEl.play();
      setPlayingId(ringtone.id);

      intervalRef.current = setInterval(() => {
        setElapsed(audioEl.currentTime);
      }, 100);

      if (endedHandlerRef.current) {
        audioEl.removeEventListener('ended', endedHandlerRef.current);
      }
      const handleEnded = () => {
        stopPlayback();
      };
      endedHandlerRef.current = handleEnded;
      audioEl.addEventListener('ended', handleEnded);
      return;
    }

    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const recipe = toneRecipes[ringtone.tone] || toneRecipes.bell;
    const loopDuration = 1.6;
    scheduleTone(ctx, recipe, loopDuration, ringtone.duration);

    setPlayingId(ringtone.id);
    setElapsed(0);

    const startedAt = Date.now();
    intervalRef.current = setInterval(() => {
      const secondsPassed = (Date.now() - startedAt) / 1000;
      setElapsed(Math.min(secondsPassed, ringtone.duration));
    }, 100);

    stopTimeoutRef.current = setTimeout(() => {
      stopPlayback();
    }, ringtone.duration * 1000);
  };

  const toggleActive = (id) => {
    setRingtones((prev) =>
      prev.map((ringtone) =>
        ringtone.id === id
          ? { ...ringtone, active: true }
          : { ...ringtone, active: false }
      )
    );
  };

  const deleteRingtone = (id) => {
    if (playingId === id) {
      stopPlayback();
    }
    setRingtones((prev) => prev.filter((ringtone) => ringtone.id !== id));
  };

  const openDeleteConfirm = (id) => {
    setConfirmDeleteId(id);
  };

  const cancelDelete = () => {
    setConfirmDeleteId(null);
  };

  const confirmDelete = () => {
    if (confirmDeleteId) {
      deleteRingtone(confirmDeleteId);
      setConfirmDeleteId(null);
    }
  };

  const ringtonePendingDelete = ringtones.find((ringtone) => ringtone.id === confirmDeleteId);

  const openAddModal = () => {
    setForm(emptyForm);
    setFormError('');
    setIsModalOpen(true);
  };

  const closeAddModal = () => {
    setIsModalOpen(false);
    setFormError('');
  };

  const handleFileChange = (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    const probeEl = new Audio(objectUrl);
    probeEl.addEventListener('loadedmetadata', () => {
      setForm((prev) => ({
        ...prev,
        audioFile: file,
        audioUrl: objectUrl,
        duration: Number.isFinite(probeEl.duration) ? probeEl.duration : prev.duration,
      }));
    });
  };

  const removeSelectedFile = () => {
    if (form.audioUrl) {
      URL.revokeObjectURL(form.audioUrl);
    }
    setForm((prev) => ({ ...prev, audioFile: null, audioUrl: null }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedName = form.name.trim();
    if (!trimmedName) {
      setFormError('Please give your ringtone a name.');
      return;
    }

    const newRingtone = {
      id: `${trimmedName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      name: trimmedName,
      duration: form.audioUrl ? form.duration : Number(form.duration) || 10,
      isDefault: form.setAsDefault,
      active: form.setAsDefault,
      tone: form.toneType,
      audioUrl: form.audioUrl,
    };

    setRingtones((prev) =>
      form.setAsDefault
        ? [...prev.map((r) => ({ ...r, isDefault: false })), newRingtone]
        : [...prev, newRingtone]
    );

    setIsModalOpen(false);
    setForm(emptyForm);
    setFormError('');
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isModalOpen) {
        closeAddModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  useEffect(() => () => {
    clearPlaybackTimers();
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
    }
  }, []);

  return (
    <div className="page-main-container">
      <Sidebar />
      <div className={`page-inner-container ${isCollapsed ? 'collapsed' : 'expanded'}`}>
        <Navbar />
        <div className="page-content">
          <section className="whistlez-ringtone-section">
            <div className="ringtone-page-header">
              <h1>Whistlez Ringtone</h1>
              <button type="button" className="add-ringtone-button" onClick={openAddModal}>
                <PlusIcon />
                Add New Ringtone
              </button>
            </div>

            <div className="ringtone-grid">
              {ringtones.map((ringtone) => {
                const isPlaying = playingId === ringtone.id;
                return (
                  <div key={ringtone.id} className="ringtone-card">
                    <div className="ringtone-card-top">
                      <div className="ringtone-icon">
                        <MusicNoteIcon />
                      </div>

                      <div className="ringtone-info">
                        <div className="ringtone-name-row">
                          <h2>{ringtone.name}</h2>
                          {ringtone.isDefault && <span className="default-badge">DEFAULT</span>}
                        </div>
                        <p className="ringtone-duration">{formatTime(ringtone.duration)} sec</p>
                      </div>

                      <div className="ringtone-status">
                        <span className={`status-badge ${ringtone.active ? 'status-badge--active' : 'status-badge--disabled'}`}>
                          {ringtone.active ? 'Active' : 'Disabled'}
                        </span>
                        <button
                          type="button"
                          className={`status-toggle ${ringtone.active ? 'status-toggle--on' : ''}`}
                          onClick={() => toggleActive(ringtone.id)}
                          aria-label={`Toggle ${ringtone.name}`}
                        >
                          <span className="status-toggle-knob" />
                        </button>
                      </div>
                    </div>

                    <div className="ringtone-divider" />

                    <div className="ringtone-card-bottom">
                      {isPlaying ? (
                        <div className="ringtone-progress-row">
                          <button
                            type="button"
                            className="ringtone-play-badge"
                            onClick={() => playRingtone(ringtone)}
                            aria-label="Stop"
                          >
                            <PauseIcon />
                          </button>
                          <span className="progress-time">{formatTime(elapsed)}</span>
                          <div className="progress-track">
                            <div
                              className="progress-fill"
                              style={{ width: `${Math.min(100, (elapsed / ringtone.duration) * 100)}%` }}
                            />
                          </div>
                          <span className="progress-time progress-time--total">{formatTime(ringtone.duration)} sec</span>
                        </div>
                      ) : (
                        <button type="button" className="ringtone-play-button" onClick={() => playRingtone(ringtone)}>
                          <span className="ringtone-play-badge">
                            <PlayIcon />
                          </span>
                          Play
                        </button>
                      )}

                      <div className="ringtone-card-icons">
                        <button type="button" className="icon-button" aria-label={`Edit ${ringtone.name}`}>
                          <PencilIcon />
                        </button>
                        <button
                          type="button"
                          className="icon-button icon-button--danger"
                          aria-label={`Delete ${ringtone.name}`}
                          onClick={() => openDeleteConfirm(ringtone.id)}
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>

      {confirmDeleteId && (
        <div className="ringtone-modal-overlay" onClick={cancelDelete}>
          <div className="ringtone-modal" onClick={(event) => event.stopPropagation()}>
            <div className="ringtone-modal-header">
              <h2>Delete Ringtone</h2>
              <button type="button" className="modal-close-button" onClick={cancelDelete} aria-label="Close">
                <CloseIcon />
              </button>
            </div>
            <div className="ringtone-modal-form">
              <p className="confirmation-message">
                Are you sure you want to delete <strong>{ringtonePendingDelete?.name || 'this ringtone'}</strong>?
              </p>
              <div className="ringtone-modal-actions">
                <button type="button" className="business-button business-button--outline" onClick={cancelDelete}>
                  No, keep it
                </button>
                <button type="button" className="business-button business-button--solid" onClick={confirmDelete}>
                  Yes, delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="ringtone-modal-overlay" onClick={closeAddModal}>
          <div className="ringtone-modal" onClick={(event) => event.stopPropagation()}>
            <div className="ringtone-modal-header">
              <h2>Add New Ringtone</h2>
              <button type="button" className="modal-close-button" onClick={closeAddModal} aria-label="Close">
                <CloseIcon />
              </button>
            </div>

            <form className="ringtone-modal-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="ringtone-name">Ringtone Name</label>
                <input
                  id="ringtone-name"
                  type="text"
                  placeholder="e.g. Marimba Pulse"
                  value={form.name}
                  onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                />
              </div>

              <div className="form-group">
                <label>Upload Audio File</label>
                {form.audioFile ? (
                  <div className="file-selected-row">
                    <span className="file-selected-name">{form.audioFile.name}</span>
                    <span className="file-selected-duration">{formatTime(form.duration)} sec</span>
                    <button type="button" className="file-remove-button" onClick={removeSelectedFile}>
                      Remove
                    </button>
                  </div>
                ) : (
                  <label className="file-dropzone" htmlFor="ringtone-file">
                    <UploadIcon />
                    <span>Click to upload an audio file</span>
                    <small>MP3, WAV, or OGG</small>
                  </label>
                )}
                <input
                  id="ringtone-file"
                  type="file"
                  accept="audio/*"
                  className="file-input-hidden"
                  onChange={handleFileChange}
                />
              </div>

              {!form.audioFile && (
                <div className="form-group">
                  <label htmlFor="ringtone-tone">Preview Tone</label>
                  <select
                    id="ringtone-tone"
                    value={form.toneType}
                    onChange={(event) => setForm((prev) => ({ ...prev, toneType: event.target.value }))}
                  >
                    {toneOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <p className="form-hint">No file? We'll play a short synthesized preview instead.</p>
                </div>
              )}

              {!form.audioFile && (
                <div className="form-group">
                  <label htmlFor="ringtone-duration">Duration (seconds)</label>
                  <input
                    id="ringtone-duration"
                    type="number"
                    min="1"
                    max="120"
                    value={form.duration}
                    onChange={(event) => setForm((prev) => ({ ...prev, duration: Number(event.target.value) }))}
                  />
                </div>
              )}

              <label className="checkbox-row">
                <input
                  type="checkbox"
                  checked={form.setAsDefault}
                  onChange={(event) => setForm((prev) => ({ ...prev, setAsDefault: event.target.checked }))}
                />
                Set as default ringtone
              </label>

              {formError && <p className="form-error">{formError}</p>}

              <div className="ringtone-modal-actions">
                <button type="button" className="business-button business-button--outline" onClick={closeAddModal}>
                  Cancel
                </button>
                <button type="submit" className="business-button business-button--solid">
                  Add Ringtone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default WhistlezRingtone;