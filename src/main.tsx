import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, Code2, Menu, Search, X, Command, Sparkles, Copy, Check } from 'lucide-react';
import './styles.css';

type Project = {
  name: string;
  slug: string;
  summary: string;
  category: 'AI / ML' | 'Full Stack' | 'Cybersecurity' | 'IoT';
  language: string;
  stack: string[];
  href: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    name: 'ContextOCR GraphRAG',
    slug: 'OCR · LOCAL AI · GRAPH RAG',
    summary: 'Context-aware OCR post-correction with local Qwen, searchable PDF export, evaluation tooling, and a GraphRAG retrieval layer.',
    category: 'AI / ML', language: 'Python', stack: ['OCR', 'Qwen', 'GraphRAG', 'PDF'],
    href: 'https://github.com/Aravind-rr/ContextOCR-GraphRAG', featured: true,
  },
  {
    name: 'Tour Secure', slug: 'SAFETY · GEOINTELLIGENCE',
    summary: 'A tourist safety platform designed around intelligent monitoring, risk awareness, and location-sensitive assistance.',
    category: 'AI / ML', language: 'TypeScript', stack: ['TypeScript', 'AI', 'Maps'],
    href: 'https://github.com/Aravind-rr/Tour_Secure', featured: true,
  },
  {
    name: 'Last-mile Delivery Tracker', slug: 'LOGISTICS · OPERATIONS',
    summary: 'Zone-based pricing, volumetric weight, B2B/B2C rate cards, COD surcharges, nearest-agent assignment, and immutable tracking.',
    category: 'Full Stack', language: 'TypeScript', stack: ['React', 'Express', 'PostgreSQL'],
    href: 'https://github.com/Aravind-rr/last-mile-delivery-tracker', featured: true,
  },
  {
    name: 'Secure Guard Chat', slug: 'SECURE MESSAGING',
    summary: 'Context-aware secure messaging and file transfer with adaptive TOTP-based access control.',
    category: 'Cybersecurity', language: 'TypeScript', stack: ['TypeScript', 'TOTP', 'Encryption'],
    href: 'https://github.com/Aravind-rr/secure-guard-chat',
  },
  {
    name: 'Health Data Analytics', slug: 'PREDICTIVE HEALTHCARE',
    summary: 'Machine-learning analysis focused on diabetes readmission prediction and interpretable health data insights.',
    category: 'AI / ML', language: 'Python', stack: ['Python', 'ML', 'Analytics'],
    href: 'https://github.com/Aravind-rr/HDA',
  },
  {
    name: 'IntelliRoad Command', slug: 'AIOT · SMART MOBILITY',
    summary: 'A command surface for AIoT vehicle-to-vehicle traffic monitoring and congestion control.',
    category: 'IoT', language: 'TypeScript', stack: ['TypeScript', 'AIoT', 'V2V'],
    href: 'https://github.com/Aravind-rr/intelliroad-command',
  },
  {
    name: 'Item Flow System', slug: 'INVENTORY · WORKFLOW',
    summary: 'A TypeScript system for managing item movement, state, and operational workflows.',
    category: 'Full Stack', language: 'TypeScript', stack: ['TypeScript', 'Workflow', 'UI'],
    href: 'https://github.com/Aravind-rr/item-flow-sys',
  },
];

const categories = ['All', 'AI / ML', 'Full Stack', 'Cybersecurity', 'IoT'] as const;

function App() {
  const [menu, setMenu] = useState(false);
  const [palette, setPalette] = useState(false);
  const [filter, setFilter] = useState<(typeof categories)[number]>('All');
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault(); setPalette((value) => !value);
      }
      if (event.key === 'Escape') { setPalette(false); setMenu(false); }
    };
    const onScroll = () => setProgress((scrollY / (document.documentElement.scrollHeight - innerHeight)) * 100);
    const onPointer = (event: PointerEvent) => {
      document.documentElement.style.setProperty('--pointer-x', `${event.clientX}px`);
      document.documentElement.style.setProperty('--pointer-y', `${event.clientY}px`);
    };
    const sections = [...document.querySelectorAll<HTMLElement>('main section[id]')];
    const sectionObserver = new IntersectionObserver((entries) => {
      const current = entries.find((entry) => entry.isIntersecting);
      if (current?.target.id) setActive(current.target.id);
    }, { rootMargin: '-35% 0px -55%' });
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible'));
    }, { threshold: 0.12 });
    sections.forEach((section) => sectionObserver.observe(section));
    document.querySelectorAll('.reveal-on-scroll').forEach((element) => revealObserver.observe(element));
    addEventListener('keydown', onKey); addEventListener('scroll', onScroll, { passive: true }); addEventListener('pointermove', onPointer, { passive: true });
    return () => {
      removeEventListener('keydown', onKey); removeEventListener('scroll', onScroll); removeEventListener('pointermove', onPointer);
      sectionObserver.disconnect(); revealObserver.disconnect();
    };
  }, []);

  const filtered = useMemo(() => projects.filter((project) =>
    (filter === 'All' || project.category === filter) &&
    `${project.name} ${project.summary} ${project.stack.join(' ')}`.toLowerCase().includes(query.toLowerCase())
  ), [filter, query]);

  const nav = ['About', 'Work', 'Skills', 'Journey', 'Contact'];
  const go = (id: string) => { document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' }); setMenu(false); setPalette(false); };

  const copyProfile = async () => {
    await navigator.clipboard.writeText('https://github.com/Aravind-rr');
    setCopied(true); setTimeout(() => setCopied(false), 1800);
  };

  return <>
    <div className="progress" style={{ width: `${progress}%` }} />
    <div className="noise" aria-hidden="true" />
    <header className="nav-shell">
      <a href="#home" className="brand" aria-label="Aravind Raghuram T A, home"><span>AT</span><b>Aravind Raghuram <i>T A</i></b></a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {nav.map((item) => <a className={active === item.toLowerCase() ? 'active' : ''} key={item} href={`#${item.toLowerCase()}`}>{item}</a>)}
      </nav>
      <div className="nav-actions">
        <button className="command-button" onClick={() => setPalette(true)} aria-label="Open navigation palette"><Command size={15}/><span>⌘ K</span></button>
        <button className="menu-button" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-label="Toggle menu">{menu ? <X/> : <Menu/>}</button>
      </div>
    </header>
    {menu && <nav className="mobile-nav">{nav.map((item) => <button key={item} onClick={() => go(item)}>{item}</button>)}</nav>}

    <main id="home">
      <section className="hero section-grid" id="home-section">
        <div className="hero-copy reveal">
          <p className="eyebrow"><span className="status-dot"/> SOFTWARE · INTELLIGENCE · SECURITY</p>
          <div className="hero-name" aria-label="Aravind Raghuram T A">
            <span>ARAVIND</span>
            <span>RAGHURAM</span>
            <span className="surname">T A</span>
          </div>
          <p className="hero-statement">Engineering intelligent systems<br/>for the <em>real world.</em></p>
          <p className="hero-intro">Computer Science Engineering student at VIT Chennai, building practical software, AI-powered applications, and secure systems.</p>
          <div className="hero-actions">
            <button className="primary" onClick={() => go('Work')}>Explore my work <ArrowUpRight size={18}/></button>
            <a className="secondary" href="https://github.com/Aravind-rr" target="_blank" rel="noreferrer"><Code2 size={18}/> GitHub profile</a>
          </div>
        </div>
        <div className="system-panel" aria-label="Developer system overview">
          <div className="panel-top"><span>SYSTEM / ARTA-27</span><span>BUILDING</span></div>
          <div className="orbit">
            <div className="ring ring-one"/><div className="ring ring-two"/>
            <div className="core"><b>AT</b><small>BUILD MODE</small></div>
            <i className="node n1"/><i className="node n2"/><i className="node n3"/>
            <span className="orbit-label label-one">AI / 01</span><span className="orbit-label label-two">SEC / 02</span><span className="orbit-label label-three">SYS / 03</span>
          </div>
          <div className="signal-grid">
            <span><b>07</b> VERIFIED REPOS</span><span><b>04</b> BUILD DOMAINS</span><span><b>2027</b> GRADUATION</span>
          </div>
        </div>
        <div className="scroll-mark">SCROLL TO DISCOVER <span/></div>
      </section>

      <div className="signal-marquee" aria-hidden="true"><div>DOCUMENT INTELLIGENCE <i/> SECURE SYSTEMS <i/> APPLIED AI <i/> FULL-STACK ENGINEERING <i/> DOCUMENT INTELLIGENCE <i/> SECURE SYSTEMS</div></div>

      <section id="about" className="about section-grid ruled reveal-on-scroll">
        <p className="section-index">01 / ABOUT</p>
        <div className="about-lead"><h2>I turn complex problems into <span>useful systems.</span></h2></div>
        <div className="about-copy">
          <p>I work where software engineering meets applied intelligence: correcting noisy documents, improving physical-world operations, and designing safer digital experiences.</p>
          <p>Currently studying Computer Science Engineering at <strong>Vellore Institute of Technology, Chennai</strong>, with graduation expected in 2027.</p>
        </div>
        <div className="principles">
          <span>01 <b>Practical over performative</b></span><span>02 <b>Systems before features</b></span><span>03 <b>Security by design</b></span>
        </div>
      </section>

      <section id="work" className="work ruled reveal-on-scroll">
        <div className="section-heading"><p className="section-index">02 / SELECTED WORK</p><h2>Projects built for the <span>real world.</span></h2></div>
        <div className="featured-grid">
          {projects.filter(p => p.featured).map((project, index) => <ProjectCard key={project.name} project={project} index={index}/>) }
        </div>
        <div className="explorer-head">
          <div><p className="eyebrow">REPOSITORY EXPLORER</p><h3>All verified public work</h3></div>
          <label className="search"><Search size={17}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search projects" aria-label="Search projects"/></label>
        </div>
        <div className="filters" role="group" aria-label="Project filters">
          {categories.map((category) => <button className={filter === category ? 'active' : ''} onClick={() => setFilter(category)} key={category}>{category}</button>)}
        </div>
        <div className="repo-list">
          {filtered.map((project, i) => <a href={project.href} target="_blank" rel="noreferrer" className="repo-row" key={project.name}>
            <span className="repo-num">{String(i + 1).padStart(2, '0')}</span><span className="repo-name"><b>{project.name}</b><small>{project.slug}</small></span><span className="language"><i className={project.language === 'Python' ? 'python' : ''}/>{project.language}</span><span className="repo-category">{project.category}</span><ArrowUpRight/>
          </a>)}
          {filtered.length === 0 && <div className="empty">No projects match that search.</div>}
        </div>
      </section>

      <div className="chapter-break" aria-hidden="true"><span>BUILD / MEASURE / REFINE</span><b>03</b></div>
      <section id="skills" className="skills ruled reveal-on-scroll">
        <div className="section-heading"><p className="section-index">03 / CAPABILITIES</p><h2>A stack shaped by <span>shipping.</span></h2></div>
        <div className="skill-grid">
          <Skill n="01" title="Languages" items="Python · TypeScript · JavaScript · Java · SQL"/>
          <Skill n="02" title="AI & Data" items="Machine Learning · OCR · GraphRAG · Local LLMs · Explainability"/>
          <Skill n="03" title="Web Systems" items="React · Node.js · Express · REST APIs · Responsive UI"/>
          <Skill n="04" title="Infrastructure" items="PostgreSQL · Git · Docker · Linux · Vite"/>
          <Skill n="05" title="Security" items="TOTP · Access Control · Secure Transfer · Threat-aware Design"/>
          <Skill n="06" title="Applied Systems" items="AIoT · Geospatial Apps · Logistics · Document Pipelines"/>
        </div>
      </section>

      <section id="journey" className="journey ruled reveal-on-scroll">
        <div className="section-heading"><p className="section-index">04 / JOURNEY</p><h2>Learning by <span>building.</span></h2></div>
        <div className="timeline">
          <article><time>2023 — 2027</time><div><p>EDUCATION</p><h3>B.Tech, Computer Science Engineering</h3><span>Vellore Institute of Technology, Chennai</span></div></article>
          <article><time>2025 — NOW</time><div><p>PROJECT PRACTICE</p><h3>Intelligent systems & secure software</h3><span>OCR correction, predictive analytics, mobility, messaging, and operational platforms.</span></div></article>
        </div>
      </section>

      <section id="contact" className="contact ruled reveal-on-scroll">
        <p className="eyebrow"><Sparkles size={14}/> LET'S BUILD SOMETHING USEFUL</p>
        <h2>Have a hard problem?<br/><span>Let’s make it tractable.</span></h2>
        <p className="contact-copy">Explore the code, follow the work, or start a conversation through GitHub.</p>
        <div className="contact-actions">
          <a className="primary" href="https://github.com/Aravind-rr" target="_blank" rel="noreferrer"><Code2 size={18}/> Open GitHub <ArrowUpRight size={18}/></a>
          <button className="secondary" onClick={copyProfile}>{copied ? <Check size={18}/> : <Copy size={18}/>} {copied ? 'Copied' : 'Copy profile link'}</button>
        </div>
      </section>
    </main>

    <footer><div className="brand"><span>AT</span><b>Aravind Raghuram <i>T A</i></b></div><p>Designed around curiosity. Engineered for impact.</p><p>© 2026</p></footer>

    {palette && <div className="palette-backdrop" onMouseDown={() => setPalette(false)}>
      <div className="palette" role="dialog" aria-modal="true" aria-label="Quick navigation" onMouseDown={e => e.stopPropagation()}>
        <div className="palette-title"><Command size={18}/> Quick navigate <kbd>ESC</kbd></div>
        {nav.map((item, i) => <button key={item} onClick={() => go(item)}><span>0{i + 1}</span>{item}<ArrowUpRight size={16}/></button>)}
      </div>
    </div>}
  </>;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return <a className={`project-card project-${index}`} href={project.href} target="_blank" rel="noreferrer">
    <div className="project-visual" aria-hidden="true">
      <div className="visual-meta"><span>{project.slug}</span><b>0{index + 1}</b></div>
      {index === 0 && <div className="ocr-scene"><div className="paper-lines"><i/><i/><i/><i/><i/></div><div className="scan-line"/><span>96.4% CONTEXT RESTORED</span></div>}
      {index === 1 && <div className="map-scene"><i className="map-point a"/><i className="map-point b"/><i className="map-point c"/><div className="route-line"/><span>SAFE ROUTE / 12.99° N</span></div>}
      {index === 2 && <div className="logistics-scene"><div className="zone z1">01</div><div className="zone z2">02</div><div className="zone z3">03</div><div className="dispatch-line"/><span>AGENT 04 → ROUTE OPTIMAL</span></div>}
    </div>
    <div className="project-info"><div><p>{project.category}</p><h3>{project.name}</h3></div><ArrowUpRight/>
      <p className="project-summary">{project.summary}</p><div className="tags">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div>
    </div>
  </a>;
}

function Skill({ n, title, items }: { n: string; title: string; items: string }) {
  return <article><span>{n}</span><h3>{title}</h3><p>{items}</p></article>;
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
