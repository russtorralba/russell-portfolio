import { useState } from "react";
import "./App.css";
import "./fixpro.css";
import "./hero-animation.css";
import "./contact.css";
import "./v2-hero.css";
import "./v2-projects.css";
import "./v2-about.css";
import "./v2-bottom.css";
import "./v2-responsive-polish.css";

const projects = [
  [
    "ChordHouse Music Academy",
    "Music lesson booking demo",
    "A welcoming lesson-booking experience designed to make finding the right music class feel simple.",
    "music",
    "https://chordhouse-music-academy-cr7gb2481-rus17.vercel.app/",
    "https://github.com/russtorralba/chordhouse-music-academy",
  ],
  [
    "SupportDesk Mini",
    "Browser-based support ticket tracker",
    "A focused support workspace for creating, sorting, and following up on customer tickets.",
    "support",
    "https://supportdesk-mini.vercel.app",
    "https://github.com/russtorralba/supportdesk-mini",
  ],
  [
    "DayMark",
    "Task and deadline planner",
    "A calm planning tool that keeps everyday tasks and upcoming deadlines in clear view.",
    "daymark",
    "https://daymark-lemon.vercel.app/",
    "https://github.com/russtorralba/daymark",
  ],
  [
    "PocketTrack",
    "Personal income and expense tracker",
    "A practical dashboard for tracking money in, money out, and monthly goals.",
    "pocket",
    "https://pockettrack-liard.vercel.app",
    "https://github.com/russtorralba/pockettrack",
  ],
  [
    "The Last Sound",
    "Eight-level sound-sequence puzzle game",
    "A gentle browser game where players listen closely and rebuild melodies one sound at a time.",
    "sound",
    "https://the-last-sound.vercel.app/",
    "https://github.com/russtorralba/the-last-sound",
  ],
  [
    "FixPro Home Services",
    "Home services demo website",
    "A home services demo website.",
    "fixpro",
    "https://fixpro-home-services-demo.vercel.app/",
    "https://github.com/russtorralba/fixpro-home-services-demo",
  ],
  [
    "CarePoint Family Clinic",
    "React, Vite, Supabase, Vercel",
    "A client-editable family clinic website with a private admin dashboard for managing services, team members, clinic hours, announcements, contact details, and website images.",
    "carepoint",
    "https://carepoint-family-clinic.vercel.app/#home",
  ],
];

const featuredProjects = [
  {
    project: projects[6],
    technologies: ["React", "Vite", "Supabase", "Vercel"],
  },
  {
    project: projects[0],
    technologies: ["Web Design", "Front-End", "Responsive"],
  },
  {
    project: projects[5],
    technologies: ["Web Design", "Front-End", "Vercel"],
  },
];

const experimentalProjects = [projects[1], projects[2], projects[3], projects[4]];

function Preview({ kind, title }) {
  const content = {
    music: (
      <>
        <span className="preview-label">CHORDHOUSE</span>
        <div className="music-lines">
          <i />
          <i />
          <i />
          <i />
        </div>
        <b className="big-mark">♬</b>
      </>
    ),
    support: (
      <>
        <span className="preview-label">SUPPORTDESK</span>
        <div className="tickets">
          <p>
            <i />
            Open ticket
          </p>
          <p>
            <i />
            In progress
          </p>
          <p>
            <i />
            Resolved
          </p>
        </div>
      </>
    ),
    daymark: (
      <>
        <span className="preview-label">DAYMARK</span>
        <div className="calendar">
          <b>12</b>
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
        <p className="preview-task">● Finish project notes</p>
      </>
    ),
    pocket: (
      <>
        <span className="preview-label">POCKETTRACK</span>
        <b className="balance">$2,480</b>
        <div className="bars">
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
      </>
    ),
    sound: (
      <>
        <span className="preview-label">THE LAST SOUND</span>
        <b className="sound-orb">✦</b>
        <div className="sound-tiles">
          <i>◒</i>
          <i>≈</i>
          <i>☼</i>
          <i>☾</i>
        </div>
      </>
    ),
    fixpro: (
      <>
        <span className="preview-label">FIXPRO</span>
        <b className="fixpro-mark">⌂</b>
        <p className="fixpro-copy">
          HOME SERVICES
          <br />
          <strong>MADE SIMPLE</strong>
        </p>
        <div className="fixpro-tools">
          <i>⌁</i>
          <i>✦</i>
          <i>●</i>
        </div>
      </>
    ),
    carepoint: (
      <>
        <span className="preview-label">CAREPOINT</span>
        <div className="carepoint-browser">
          <div className="carepoint-browser-bar">
            <span className="browser-dots">
              <i />
              <i />
              <i />
            </span>
            <b>✦ CarePoint</b>
            <small>Services&nbsp;&nbsp;Team</small>
          </div>
          <div className="carepoint-mini-hero">
            <p>
              Care for every
              <br />
              <em>chapter of your life.</em>
            </p>
            <span>OPEN TODAY</span>
          </div>
          <div className="carepoint-mini-content">
            <i />
            <i />
            <i />
          </div>
        </div>
      </>
    ),
  };
  return (
    <div
      className={`project-preview ${kind}`}
      role="img"
      aria-label={`${title} interface preview`}
    >
      {content[kind]}
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main>
      <header className="site-header">
        <a className="site-wordmark" href="#top" aria-label="Russell Torralba home">
          RUSSELL <span>TORRALBA</span>
        </a>
        <div className="site-header-actions">
          <nav
            className={`site-nav${menuOpen ? " is-open" : ""}`}
            id="site-navigation"
            aria-label="Main navigation"
          >
            <a href="#projects" onClick={() => setMenuOpen(false)}>
              Work
            </a>
            <a href="#services" onClick={() => setMenuOpen(false)}>
              Services
            </a>
            <a href="#about" onClick={() => setMenuOpen(false)}>
              About
            </a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>
              Contact
            </a>
            <a className="mobile-talk" href="#contact" onClick={() => setMenuOpen(false)}>
              Let&apos;s Talk <span>→</span>
            </a>
          </nav>
          <a className="header-talk" href="#contact">
            Let&apos;s Talk <span>→</span>
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="site-navigation"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>
      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="hero-eyebrow">
            <span /> WEB DESIGNER &amp; FRONT-END DEVELOPER
          </p>
          <h1 id="hero-title">
            I design &amp; build
            <br />
            digital experiences
            <br />
            that <em>feel different.</em>
          </h1>
          <p className="hero-intro">
            Modern websites and web apps through design, code, and AI-assisted
            development — built to look great, work smoothly, and help real
            businesses grow.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#projects">
              View My Work <span>→</span>
            </a>
            <a className="text-link" href="#about">
              About Me <span>→</span>
            </a>
          </div>
          <ul className="hero-capabilities" aria-label="Capabilities">
            <li>
              <strong>7</strong>
              <span>Projects</span>
            </li>
            <li>
              <strong>Modern</strong>
              <span>Websites &amp; Web Apps</span>
            </li>
            <li>
              <strong>AI-Assisted</strong>
              <span>Design + Development</span>
            </li>
          </ul>
        </div>
        <div className="hero-workspace" aria-hidden="true">
          <i className="workspace-aura" />
          <div className="workspace-window">
            <div className="workspace-bar">
              <span className="window-dots"><i /><i /><i /></span>
              <span>RUSSELL / STUDIO</span>
              <b>LIVE</b>
            </div>
            <div className="workspace-screen">
              <div className="workspace-sidebar">
                <i />
                <i />
                <i />
                <i />
              </div>
              <div className="workspace-code">
                <span className="code-file">portfolio-v2.jsx</span>
                <i className="code-line violet wide" />
                <i className="code-line soft medium" />
                <i className="code-line violet short" />
                <i className="code-line soft wide" />
                <i className="code-line muted medium" />
                <i className="code-line violet medium" />
                <div className="code-cursor" />
              </div>
              <div className="workspace-preview">
                <span>SELECTED</span>
                <b>Digital<br />craft.</b>
                <i />
              </div>
            </div>
          </div>
          <div className="workspace-desk">
            <i className="desk-line" />
            <div className="music-reference">
              <span className="guitar-neck" />
              <span className="guitar-body" />
            </div>
            <span className="desk-note">DESIGN / CODE / SOUND</span>
          </div>
          <b className="workspace-spark spark-one">✦</b>
          <b className="workspace-spark spark-two">✧</b>
        </div>
      </section>
      <section
        className="projects section v2-projects"
        id="projects"
        aria-labelledby="projects-title"
      >
        <div className="v2-projects-intro">
          <div>
            <p className="eyebrow">
              <span /> SELECTED WORK
            </p>
            <h2 id="projects-title">
              Work that speaks<br />
              <em>for itself.</em>
            </h2>
          </div>
          <div className="v2-projects-summary">
            <p>
              A selection of websites and digital experiences designed and built
              with care.
            </p>
          </div>
        </div>
        <div className="featured-projects" aria-label="Featured projects">
          {featuredProjects.map(({ project, technologies }, index) => {
            const [title, type, description, preview, liveDemo] = project;
            const projectNumber = String(index + 1).padStart(2, "0");
            return (
              <article
                className={`featured-project featured-project-${preview}`}
                key={title}
              >
                <div className="featured-project-visual">
                  <Preview kind={preview} title={title} />
                </div>
                <div className="featured-project-copy">
                  <p className="featured-project-number">{projectNumber}</p>
                  <p className="featured-project-type">{type}</p>
                  <h3>{title}</h3>
                  <p className="featured-project-description">{description}</p>
                  <ul className="technology-list" aria-label={`${title} technologies`}>
                    {technologies.map((technology) => (
                      <li key={technology}>{technology}</li>
                    ))}
                  </ul>
                  <a
                    className="featured-project-link"
                    href={liveDemo}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Project <span>→</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
        <div className="more-experiments" aria-labelledby="experiments-title">
          <div className="more-experiments-heading">
            <p className="eyebrow"><span /> MORE EXPERIMENTS</p>
            <h3 id="experiments-title">Smaller explorations,<br /><em>same attention to detail.</em></h3>
          </div>
          <div className="experiments-grid">
            {experimentalProjects.map(([title, type, description, preview, liveDemo], index) => (
              <article className="experiment-project" key={title}>
                <Preview kind={preview} title={title} />
                <div className="experiment-project-copy">
                  <p>0{index + 4}</p>
                  <h4>{title}</h4>
                  <span>{type}</span>
                  <p className="experiment-description">{description}</p>
                  <a href={liveDemo} target="_blank" rel="noreferrer">
                    View Project <b>→</b>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section
        className="v2-services section"
        id="services"
        aria-labelledby="services-title"
      >
        <div className="v2-services-intro">
          <p className="eyebrow">
            <span /> WHAT I DO
          </p>
          <h2 id="services-title">
            Design. Build.<br />
            <em>Make it work.</em>
          </h2>
          <p>
            I create modern digital experiences from the first visual idea
            through the final working website.
          </p>
        </div>
        <div className="service-rows">
          <article className="service-row">
            <p>01</p>
            <h3>Web Design</h3>
            <p>
              Clean, modern interfaces with thoughtful layouts, typography,
              responsive behavior, and clear user journeys.
            </p>
            <span aria-hidden="true">↗</span>
          </article>
          <article className="service-row">
            <p>02</p>
            <h3>Front-End Development</h3>
            <p>
              Responsive websites and web applications built with modern
              front-end technologies.
            </p>
            <span aria-hidden="true">↗</span>
          </article>
          <article className="service-row">
            <p>03</p>
            <h3>AI-Assisted Development</h3>
            <p>
              Using AI as part of the design and development workflow to
              prototype, build, test, and iterate efficiently.
            </p>
            <span aria-hidden="true">↗</span>
          </article>
        </div>
      </section>
      <section
        className="about section v2-about"
        id="about"
        aria-labelledby="about-title"
      >
        <div className="v2-about-statement">
          <p className="eyebrow">
            <span /> ABOUT
          </p>
          <h2 id="about-title">
            Creative thinking,<br />
            <em>practical building.</em>
          </h2>
        </div>
        <div className="v2-about-copy">
          <p>
            I design and build practical websites and web applications by
            bringing visual design, front-end development, and AI-assisted
            workflows into one clear process.
          </p>
          <p>
            My background in music and creative work shapes how I approach
            digital design — with attention to rhythm, structure, detail, and
            how the whole experience feels.
          </p>
        </div>
        <div className="v2-principles" aria-label="Design principles">
          <article>
            <h3>CLEAR BY DESIGN</h3>
            <p>Interfaces that guide people naturally.</p>
          </article>
          <article>
            <h3>USEFUL BY DEFAULT</h3>
            <p>Features should solve a real need.</p>
          </article>
          <article>
            <h3>BUILT TO EXPLORE</h3>
            <p>Responsive experiences designed to work across screens.</p>
          </article>
        </div>
      </section>
      <section
        className="v2-process section"
        id="process"
        aria-labelledby="process-title"
      >
        <div className="v2-process-intro">
          <div>
            <p className="eyebrow">
              <span /> HOW I WORK
            </p>
            <h2 id="process-title">
              From idea<br />
              <em>to launch.</em>
            </h2>
          </div>
          <p>
            A simple, focused process for turning an idea into a polished
            digital experience.
          </p>
        </div>
        <ol className="process-timeline">
          <li>
            <p>01</p>
            <h3>Discover</h3>
            <span>
              Understand the goal, audience, content, and what the website
              needs to accomplish.
            </span>
          </li>
          <li>
            <p>02</p>
            <h3>Design</h3>
            <span>
              Shape the visual direction, layout, hierarchy, and overall
              experience.
            </span>
          </li>
          <li>
            <p>03</p>
            <h3>Build</h3>
            <span>
              Turn the approved direction into a responsive, functional
              website or web app.
            </span>
          </li>
          <li>
            <p>04</p>
            <h3>Launch</h3>
            <span>
              Test the experience across screens, refine the details, and
              prepare it for the web.
            </span>
          </li>
        </ol>
      </section>
      <section
        className="contact section v2-contact"
        id="contact"
        aria-labelledby="contact-title"
      >
        <i className="contact-glow" />
        <p className="contact-availability"><span /> AVAILABLE FOR SELECT PROJECTS</p>
        <p className="eyebrow">
          <span /> HAVE A PROJECT IN MIND?
        </p>
        <h2 id="contact-title">
          Let&apos;s make
          <br />
          something worth
          <br />
          <em>remembering.</em>
        </h2>
        <p className="v2-contact-copy">
          Whether you need a website, a web application, or help shaping an
          idea into something real, I&apos;d be happy to hear about it.
        </p>
        <div className="contact-actions">
          <a className="button primary" href="mailto:yourdgtalhub@gmail.com">
            Start a Project <span>→</span>
          </a>
        </div>
        <a className="contact-email" href="mailto:yourdgtalhub@gmail.com">
          yourdgtalhub@gmail.com <span>↗</span>
        </a>
      </section>
      <footer className="v2-footer">
        <div className="v2-footer-main">
          <div className="v2-footer-identity">
            <a href="#top" aria-label="Russell Torralba home">RUSSELL TORRALBA</a>
            <p>Web Designer &amp; Front-End Developer</p>
          </div>
          <nav aria-label="Footer navigation">
            <a href="#projects">Work</a>
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="footer-back-to-top" href="#top">Back to top <span>↑</span></a>
        </div>
        <p className="v2-footer-credit">Designed &amp; built with care.</p>
      </footer>
    </main>
  );
}

export default App;
