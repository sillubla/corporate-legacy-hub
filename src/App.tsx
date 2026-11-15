import { useEffect, useMemo, useRef, useState } from "react";
import { projectId, publicAnonKey } from "../utils/supabase/info";

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-f774be72`;
const API_HEADERS = {
  Authorization: `Bearer ${publicAnonKey}`,
};

type IconName =
  | "archive"
  | "bookmark"
  | "bookOpen"
  | "chevronDown"
  | "clock"
  | "compass"
  | "filter"
  | "heart"
  | "home"
  | "message"
  | "mic"
  | "more"
  | "pause"
  | "play"
  | "plus"
  | "search"
  | "sparkles"
  | "users"
  | "video"
  | "x";

const iconPaths: Record<IconName, React.ReactNode> = {
  archive: <><rect x="3" y="4" width="18" height="4" rx="1" /><path d="M5 8v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8M9 12h6" /></>,
  bookmark: <path d="M6 4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21l-6-4-6 4z" />,
  bookOpen: <><path d="M3 5.5A2.5 2.5 0 0 1 5.5 3H11v16H5.5A2.5 2.5 0 0 0 3 21.5z" /><path d="M21 5.5A2.5 2.5 0 0 0 18.5 3H13v16h5.5a2.5 2.5 0 0 1 2.5 2.5z" /></>,
  chevronDown: <path d="m7 10 5 5 5-5" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  compass: <><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5z" /></>,
  filter: <path d="M4 7h16M7 12h10M10 17h4" />,
  heart: <path d="M20.8 4.7a5.5 5.5 0 0 0-7.8 0L12 5.8l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.4 1.1-1.1a5.5 5.5 0 0 0-.1-7.8z" />,
  home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v10h14V10M9 20v-6h6v6" /></>,
  message: <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />,
  mic: <><rect x="9" y="3" width="6" height="12" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6" /></>,
  more: <><circle cx="5" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="19" cy="12" r="1" fill="currentColor" stroke="none" /></>,
  pause: <><path d="M9 7v10M15 7v10" /></>,
  play: <path d="m9 7 8 5-8 5z" />,
  plus: <path d="M12 5v14M5 12h14" />,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  sparkles: <><path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2z" /><path d="m19 14 .7 2.3L22 17l-2.3.7L19 20l-.7-2.3L16 17l2.3-.7z" /></>,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.2a4 4 0 0 1 0 7.6" /></>,
  video: <><rect x="3" y="5" width="13" height="14" rx="2" /><path d="m16 10 5-3v10l-5-3z" /></>,
  x: <path d="M6 6l12 12M18 6 6 18" />,
};

function Icon({ name, size = 20, filled = false }: { name: IconName; size?: number; filled?: boolean }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {iconPaths[name]}
    </svg>
  );
}

const portraits = {
  teresa: "https://images.unsplash.com/photo-1758691737605-69a0e78bd193?auto=format&fit=crop&w=180&q=85",
  manuel: "https://images.unsplash.com/photo-1738566061874-2160e9f4a064?auto=format&fit=crop&w=180&q=85",
  elena: "https://images.unsplash.com/photo-1623679681421-6db68b92d5f5?auto=format&fit=crop&w=180&q=85",
  carlos: "https://images.unsplash.com/photo-1624245532111-8f4aba352ba9?auto=format&fit=crop&w=180&q=85",
};

type Capsule = {
  id: number | string;
  name: string;
  role: string;
  avatar: string;
  title: string;
  summary: string;
  type: string;
  duration: string;
  category: string;
  tags: string[];
  likes: number;
  comments: number;
  time: string;
  featured: boolean;
  audioUrl?: string;
  createdAt?: string;
};

const initialCapsules: Capsule[] = [
  {
    id: 1,
    name: "Teresa Alarcón",
    role: "Exdirectora de Operaciones · 32 años en Novacorp",
    avatar: portraits.teresa,
    title: "La decisión que salvó la planta de Valencia en 2008",
    summary: "Cuando todo indicaba que debíamos parar la producción, un dato que nadie estaba mirando cambió la conversación. Esta es la secuencia de tres decisiones que evitó una crisis mayor.",
    type: "Audio",
    duration: "3:42",
    category: "Gestión de crisis",
    tags: ["Decisiones", "Operaciones"],
    likes: 84,
    comments: 12,
    time: "Hace 2 h",
    featured: true,
  },
  {
    id: 2,
    name: "Manuel Echeverría",
    role: "Maestro de mantenimiento · 27 años en Novacorp",
    avatar: portraits.manuel,
    title: "El ruido que anticipó una avería de 120.000 €",
    summary: "Una demostración práctica para detectar el patrón de vibración que precede al fallo de los compresores Atlas. Qué escuchar, dónde medir y cuándo parar.",
    type: "Vídeo",
    duration: "2:08",
    category: "Lecciones técnicas",
    tags: ["Mantenimiento", "Prevención"],
    likes: 61,
    comments: 8,
    time: "Ayer",
    featured: false,
  },
  {
    id: 3,
    name: "Elena Rovira",
    role: "Exdirectora comercial · 24 años en Novacorp",
    avatar: portraits.elena,
    title: "Cómo recuperamos a nuestro cliente más antiguo",
    summary: "No fue una gran presentación ni un descuento. Fue una pregunta concreta, una escucha honesta y una promesa que sí podíamos cumplir.",
    type: "Caso",
    duration: "4 min",
    category: "Relaciones con clientes",
    tags: ["Negociación", "Confianza"],
    likes: 97,
    comments: 18,
    time: "Hace 3 días",
    featured: false,
  },
];

const categories = ["Para ti", "Más recientes", "Gestión", "Lecciones técnicas", "Clientes"];

function Avatar({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return <img className={`avatar ${className}`} src={src} alt={alt} />;
}

function App() {
  const [capsules, setCapsules] = useState<Capsule[]>(initialCapsules);
  const [activeCategory, setActiveCategory] = useState("Para ti");
  const [search, setSearch] = useState("");
  const [playing, setPlaying] = useState<number | string | null>(null);
  const [liked, setLiked] = useState<Array<number | string>>([]);
  const [saved, setSaved] = useState<Array<number | string>>([3]);
  const [showCreate, setShowCreate] = useState(false);
  const [createStep, setCreateStep] = useState(1);
  const [format, setFormat] = useState("Audio");
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newSummary, setNewSummary] = useState("");
  const [createdNotice, setCreatedNotice] = useState("");
  const [isLoadingCapsules, setIsLoadingCapsules] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishError, setPublishError] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioName, setAudioName] = useState("");
  const [audioDuration, setAudioDuration] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [audioError, setAudioError] = useState("");
  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const recordingStartedAtRef = useRef(0);
  const audioPlayersRef = useRef<Record<string, HTMLAudioElement>>({});

  useEffect(() => {
    const loadCapsules = async () => {
      try {
        const response = await fetch(`${API_BASE}/capsules`, { headers: API_HEADERS });
        if (!response.ok) throw new Error("No se pudo cargar el repositorio.");
        const data = await response.json();
        const remoteCapsules = Array.isArray(data.capsules) ? data.capsules as Capsule[] : [];
        setCapsules([...remoteCapsules, ...initialCapsules]);
      } catch (error) {
        console.error("Supabase capsule loading failed:", error);
      } finally {
        setIsLoadingCapsules(false);
      }
    };
    void loadCapsules();
  }, []);

  useEffect(() => {
    if (!isRecording) return;
    const timer = window.setInterval(() => setRecordingSeconds((seconds) => seconds + 1), 1000);
    return () => window.clearInterval(timer);
  }, [isRecording]);

  const visibleCapsules = useMemo(() => {
    const query = search.trim().toLowerCase();
    return capsules.filter((capsule) => {
      const matchesSearch = !query || [capsule.title, capsule.summary, capsule.name, capsule.category, ...capsule.tags].join(" ").toLowerCase().includes(query);
      const matchesCategory =
        activeCategory === "Para ti" ||
        activeCategory === "Más recientes" ||
        (activeCategory === "Gestión" && capsule.category === "Gestión de crisis") ||
        capsule.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [activeCategory, search]);

  const toggleItem = (id: number | string, current: Array<number | string>, setter: (next: Array<number | string>) => void) => {
    setter(current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${Math.round(seconds % 60).toString().padStart(2, "0")}`;
  };

  const clearAudio = () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl("");
    setAudioBlob(null);
    setAudioName("");
    setAudioDuration(0);
    setAudioError("");
  };

  const loadAudioFile = (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("audio/")) {
      setAudioError("Selecciona un archivo de audio válido.");
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      setAudioError("El archivo no puede superar los 50 MB.");
      return;
    }

    clearAudio();
    const nextUrl = URL.createObjectURL(file);
    const audio = new Audio(nextUrl);
    audio.addEventListener("loadedmetadata", () => setAudioDuration(Number.isFinite(audio.duration) ? audio.duration : 0), { once: true });
    setAudioUrl(nextUrl);
    setAudioBlob(file);
    setAudioName(file.name);
    setAudioError("");
  };

  const stopRecording = () => {
    if (recorderRef.current?.state === "recording") recorderRef.current.stop();
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setIsRecording(false);
  };

  const startRecording = async () => {
    setAudioError("");
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setAudioError("Tu navegador no permite grabar audio. Puedes adjuntar un archivo.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      streamRef.current = stream;
      recorderRef.current = recorder;
      chunksRef.current = [];
      recordingStartedAtRef.current = Date.now();
      setRecordingSeconds(0);
      recorder.addEventListener("dataavailable", (event) => {
        if (event.data.size) chunksRef.current.push(event.data);
      });
      recorder.addEventListener("stop", () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
        clearAudio();
        const nextUrl = URL.createObjectURL(blob);
        const elapsedSeconds = Math.max(1, Math.round((Date.now() - recordingStartedAtRef.current) / 1000));
        setAudioUrl(nextUrl);
        setAudioBlob(blob);
        setAudioName(`Grabación ${new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}`);
        setAudioDuration(elapsedSeconds);
        setRecordingSeconds(elapsedSeconds);
        setAudioError("");
      }, { once: true });
      recorder.start();
      setIsRecording(true);
    } catch {
      setAudioError("No hemos podido acceder al micrófono. Revisa los permisos o adjunta un archivo.");
    }
  };

  const togglePlayback = (capsule: Capsule) => {
    if (!capsule.audioUrl) {
      setPlaying(playing === capsule.id ? null : capsule.id);
      return;
    }
    const playerKey = String(capsule.id);
    const currentPlayer = audioPlayersRef.current[playerKey];
    if (playing === capsule.id && currentPlayer) {
      currentPlayer.pause();
      setPlaying(null);
      return;
    }
    Object.values(audioPlayersRef.current).forEach((player) => player.pause());
    const player = currentPlayer ?? new Audio(capsule.audioUrl);
    audioPlayersRef.current[playerKey] = player;
    player.currentTime = 0;
    player.onended = () => setPlaying(null);
    player.play().catch(() => setPlaying(null));
    setPlaying(capsule.id);
  };

  const createCapsule = async () => {
    if (!newTitle.trim() || !newCategory || !newSummary.trim() || (format === "Audio" && !audioBlob)) return;
    setIsPublishing(true);
    setPublishError("");
    const capsuleType = format === "Caso escrito" ? "Caso" : format;
    try {
      const formData = new FormData();
      formData.append("title", newTitle.trim());
      formData.append("summary", newSummary.trim());
      formData.append("category", newCategory);
      formData.append("type", capsuleType);
      formData.append("duration", capsuleType === "Vídeo" ? "2:00" : capsuleType === "Caso" ? "3 min" : formatDuration(audioDuration || recordingSeconds));
      if (capsuleType === "Audio" && audioBlob) {
        formData.append("audio", audioBlob, audioBlob instanceof File ? audioBlob.name : "grabacion.webm");
      }
      const response = await fetch(`${API_BASE}/capsules`, {
        method: "POST",
        headers: API_HEADERS,
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "No se pudo publicar la cápsula.");
      const newCapsule = data.capsule as Capsule;
      setCapsules((current) => [newCapsule, ...current]);
      setActiveCategory("Para ti");
      setSearch("");
      setShowCreate(false);
      setCreateStep(1);
      setFormat("Audio");
      setNewTitle("");
      setNewCategory("");
      setNewSummary("");
      URL.revokeObjectURL(audioUrl);
      setAudioUrl("");
      setAudioBlob(null);
      setAudioName("");
      setAudioDuration(0);
      setRecordingSeconds(0);
      setCreatedNotice(`“${newCapsule.title}” ya está guardada en Supabase.`);
      window.setTimeout(() => setCreatedNotice(""), 4000);
    } catch (error) {
      setPublishError(error instanceof Error ? error.message : "No se pudo publicar la cápsula.");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark"><Icon name="archive" size={22} /></div>
          <div><strong>Legado</strong><span>Memoria que transforma</span></div>
        </div>
        <nav className="main-nav" aria-label="Navegación principal">
          <a className="nav-item active" href="#inicio"><Icon name="home" /><span>Inicio</span></a>
          <a className="nav-item" href="#explorar"><Icon name="compass" /><span>Explorar</span></a>
          <a className="nav-item" href="#colecciones"><Icon name="bookOpen" /><span>Colecciones</span></a>
          <a className="nav-item" href="#guardados"><Icon name="bookmark" /><span>Guardados</span></a>
        </nav>
        <div className="sidebar-section">
          <p>Tu espacio</p>
          <a className="nav-item" href="#capsulas"><Icon name="mic" /><span>Mis cápsulas</span></a>
          <a className="nav-item" href="#dialogos"><Icon name="message" /><span>Mis conversaciones</span><b>3</b></a>
        </div>
        <div className="sidebar-bottom">
          <div className="impact-card">
            <span><Icon name="sparkles" size={16} /> Impacto del mes</span>
            <strong>1.284</strong>
            <p>minutos de conocimiento compartido</p>
            <div className="progress"><i /></div>
          </div>
          <button className="profile-button">
            <span className="profile-initial">AM</span>
            <span><strong>Alex Martín</strong><small>Personas & Cultura</small></span>
            <Icon name="more" size={18} />
          </button>
        </div>
      </aside>

      <main>
        <header className="topbar">
          <div className="mobile-brand"><div className="brand-mark"><Icon name="archive" size={20} /></div><strong>Legado</strong></div>
          <label className="search-field">
            <Icon name="search" size={19} />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Busca una lección, persona o tema..." aria-label="Buscar cápsulas" />
            <kbd>⌘ K</kbd>
          </label>
          <button className="create-button" onClick={() => setShowCreate(true)}><Icon name="plus" size={18} />Crear cápsula</button>
        </header>

        <div className="content" id="inicio">
          {createdNotice && (
            <div className="success-notice" role="status">
              <span><Icon name="sparkles" size={17} /></span>
              <div><strong>Cápsula creada</strong><p>{createdNotice}</p></div>
              <button className="icon-button" onClick={() => setCreatedNotice("")} aria-label="Cerrar aviso"><Icon name="x" size={17} /></button>
            </div>
          )}
          <section className="welcome">
            <div>
              <span className="eyebrow">Repositorio vivo de conocimiento</span>
              <h1>Buenos días, Alex.</h1>
              <p>Hay historias que solo existen mientras alguien las recuerda. Descubre lo que tu equipo ha aprendido.</p>
            </div>
            <div className="welcome-stat">
              <div className="avatar-stack">
                <Avatar src={portraits.teresa} alt="" />
                <Avatar src={portraits.manuel} alt="" />
                <Avatar src={portraits.elena} alt="" />
              </div>
              <p><strong>12 nuevas cápsulas</strong><br />esta semana</p>
            </div>
          </section>

          <div className="layout">
            <section className="feed" id="explorar">
              <div className="section-header">
                <div><h2>Historias para ti</h2><p>Seleccionadas según tus intereses y equipo</p></div>
                <button className="filter-button"><Icon name="filter" size={17} />Filtros</button>
              </div>
              <div className="tabs" role="tablist" aria-label="Categorías">
                {categories.map((category) => (
                  <button key={category} className={activeCategory === category ? "active" : ""} onClick={() => setActiveCategory(category)} role="tab" aria-selected={activeCategory === category}>{category}</button>
                ))}
              </div>

              <div className="capsule-list">
                {isLoadingCapsules && <div className="loading-feed"><span /><p>Sincronizando el repositorio…</p></div>}
                {visibleCapsules.map((capsule) => {
                  const isPlaying = playing === capsule.id;
                  const isLiked = liked.includes(capsule.id);
                  const isSaved = saved.includes(capsule.id);
                  return (
                    <article className="capsule-card" key={capsule.id}>
                      {capsule.featured && <div className="featured"><Icon name="sparkles" size={14} /> Selección del equipo editorial</div>}
                      <div className="author-row">
                        <Avatar src={capsule.avatar} alt={`Retrato de ${capsule.name}`} />
                        <div className="author-copy"><strong>{capsule.name}</strong><span>{capsule.role}</span></div>
                        <time>{capsule.time}</time>
                        <button className="icon-button" aria-label="Más opciones"><Icon name="more" /></button>
                      </div>
                      <div className="card-body">
                        <div className={`media-tile ${capsule.type.toLowerCase()}`}>
                          <div className="media-icon"><Icon name={capsule.type === "Vídeo" ? "video" : capsule.type === "Caso" ? "bookOpen" : "mic"} size={24} /></div>
                          <span>{capsule.type}</span>
                          <b>{capsule.duration}</b>
                          <div className="waveform" aria-hidden="true">
                            {[12, 23, 15, 30, 19, 35, 22, 29, 14, 31, 18, 25, 12, 20].map((height, index) => <i key={index} style={{ height }} />)}
                          </div>
                          <button className="play-button" onClick={() => togglePlayback(capsule)} aria-label={isPlaying ? "Pausar" : "Reproducir"}>
                            <Icon name={isPlaying ? "pause" : "play"} size={20} filled={isPlaying} />
                          </button>
                        </div>
                        <div className="capsule-copy">
                          <span className="category">{capsule.category}</span>
                          <h3>{capsule.title}</h3>
                          <p>{capsule.summary}</p>
                          <div className="tags">{capsule.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div>
                        </div>
                      </div>
                      <div className="card-actions">
                        <button className={isLiked ? "selected" : ""} onClick={() => toggleItem(capsule.id, liked, setLiked)}><Icon name="heart" size={18} filled={isLiked} />{capsule.likes + (isLiked ? 1 : 0)}</button>
                        <button><Icon name="message" size={18} />{capsule.comments} respuestas</button>
                        <button className={`save-action ${isSaved ? "selected" : ""}`} onClick={() => toggleItem(capsule.id, saved, setSaved)}><Icon name="bookmark" size={18} filled={isSaved} />{isSaved ? "Guardado" : "Guardar"}</button>
                      </div>
                    </article>
                  );
                })}
                {visibleCapsules.length === 0 && (
                  <div className="empty-state"><Icon name="search" size={28} /><h3>No encontramos cápsulas</h3><p>Prueba con otra persona, tema o categoría.</p></div>
                )}
              </div>
            </section>

            <aside className="right-rail">
              <section className="side-card storytellers">
                <div className="side-heading"><div><span className="eyebrow">Voces con experiencia</span><h2>Referentes destacados</h2></div><a href="#todos">Ver todos</a></div>
                {[
                  ["Teresa Alarcón", "Operaciones", portraits.teresa, "18 cápsulas"],
                  ["Manuel Echeverría", "Mantenimiento", portraits.manuel, "12 cápsulas"],
                  ["Carlos Núñez", "Estrategia", portraits.carlos, "9 cápsulas"],
                ].map(([name, role, image, count]) => (
                  <button className="storyteller" key={name}>
                    <Avatar src={image} alt={`Retrato de ${name}`} />
                    <span><strong>{name}</strong><small>{role}</small></span>
                    <b>{count}</b>
                  </button>
                ))}
              </section>

              <section className="side-card dialogue">
                <div className="dialogue-icon"><Icon name="message" size={20} /></div>
                <span className="eyebrow">Diálogo activo</span>
                <h3>“¿Cómo supiste que era el momento de cambiar?”</h3>
                <p>Una conversación sobre intuición, datos y liderazgo en momentos inciertos.</p>
                <div className="dialogue-meta"><div className="avatar-stack small"><Avatar src={portraits.elena} alt="" /><Avatar src={portraits.manuel} alt="" /></div><span>8 personas participando</span></div>
                <button>Unirme a la conversación <span>→</span></button>
              </section>

              <section className="weekly">
                <span className="eyebrow">Tema de la semana</span>
                <h3>Errores que nos hicieron mejores</h3>
                <p>Comparte un error que cambió tu forma de trabajar.</p>
                <div><span>26 historias</span><strong>Explorar →</strong></div>
              </section>
            </aside>
          </div>
        </div>
      </main>

      {showCreate && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setShowCreate(false)}>
          <section className="create-modal" role="dialog" aria-modal="true" aria-labelledby="create-title">
            <button className="modal-close icon-button" onClick={() => setShowCreate(false)} aria-label="Cerrar"><Icon name="x" /></button>
            <span className="step-label">Paso {createStep} de 2</span>
            <h2 id="create-title">{createStep === 1 ? "¿Cómo quieres compartir tu historia?" : "Dale contexto a tu cápsula"}</h2>
            <p>{createStep === 1 ? "Elige el formato que te resulte más cómodo. Nosotros te guiamos." : "Un buen título ayuda a que otros encuentren tu aprendizaje."}</p>
            {createStep === 1 ? (
              <div className="format-grid">
                {[
                  ["Audio", "mic", "Graba tu voz, como una nota de audio"],
                  ["Vídeo", "video", "Cuenta tu historia en menos de 2 minutos"],
                  ["Caso escrito", "bookOpen", "Resume el reto y lo que aprendiste"],
                ].map(([name, icon, description]) => (
                  <button key={name} className={format === name ? "selected" : ""} onClick={() => setFormat(name)}>
                    <span><Icon name={icon as IconName} /></span><strong>{name}</strong><small>{description}</small>
                  </button>
                ))}
              </div>
            ) : (
              <div className="form-fields">
                {format === "Audio" && (
                  <div className="audio-attachment">
                    <div className="audio-heading">
                      <div><strong>Audio de la cápsula</strong><span>Adjunta un archivo o grábalo ahora</span></div>
                      {audioUrl && <button onClick={clearAudio} type="button">Eliminar</button>}
                    </div>
                    {!audioUrl ? (
                      <div className="audio-options">
                        <label className="upload-option">
                          <input type="file" accept="audio/*,.mp3,.m4a,.wav,.ogg,.webm" onChange={(event) => loadAudioFile(event.target.files?.[0])} />
                          <span><Icon name="plus" size={20} /></span>
                          <strong>Adjuntar audio</strong>
                          <small>MP3, M4A, WAV · Máx. 50 MB</small>
                        </label>
                        <button className={`record-option ${isRecording ? "recording" : ""}`} type="button" onClick={isRecording ? stopRecording : startRecording}>
                          <span><Icon name={isRecording ? "pause" : "mic"} size={20} /></span>
                          <strong>{isRecording ? "Detener grabación" : "Grabar ahora"}</strong>
                          <small>{isRecording ? `${formatDuration(recordingSeconds)} · Grabando…` : "Usa el micrófono del dispositivo"}</small>
                        </button>
                      </div>
                    ) : (
                      <div className="audio-preview">
                        <span><Icon name="mic" size={20} /></span>
                        <div><strong>{audioName}</strong><small>{formatDuration(audioDuration || recordingSeconds)} · Listo para publicar</small></div>
                        <audio src={audioUrl} controls preload="metadata" />
                      </div>
                    )}
                    {audioError && <p className="audio-error" role="alert">{audioError}</p>}
                  </div>
                )}
                <label>
                  Título de la historia
                  <input autoFocus value={newTitle} onChange={(event) => setNewTitle(event.target.value)} placeholder="Ej. Lo que aprendimos durante la expansión de 2019" />
                </label>
                <label>
                  Tema
                  <select value={newCategory} onChange={(event) => setNewCategory(event.target.value)}>
                    <option value="" disabled>Selecciona un tema</option>
                    <option>Gestión de crisis</option>
                    <option>Lecciones técnicas</option>
                    <option>Relaciones con clientes</option>
                    <option>Liderazgo</option>
                  </select>
                </label>
                <label>
                  Aprendizaje principal
                  <textarea value={newSummary} onChange={(event) => setNewSummary(event.target.value)} placeholder="Resume qué ocurrió y qué debería recordar el equipo..." rows={4} />
                </label>
                {publishError && <p className="publish-error" role="alert">{publishError}</p>}
              </div>
            )}
            <div className="modal-actions">
              {createStep === 2 && <button className="secondary" onClick={() => setCreateStep(1)}>Atrás</button>}
              <button
                className="primary"
                disabled={isPublishing || (createStep === 2 && (!newTitle.trim() || !newCategory || !newSummary.trim() || (format === "Audio" && !audioBlob)))}
                onClick={() => createStep === 1 ? setCreateStep(2) : void createCapsule()}
              >
                {createStep === 1 ? "Continuar" : isPublishing ? "Guardando…" : "Publicar cápsula"} <span>→</span>
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
