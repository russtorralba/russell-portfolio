import { useEffect, useState } from "react";
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
    "FlowDesk",
    "Business Operations SaaS",
    "A full business operations workspace for service teams—bringing customers, jobs, scheduling, invoicing, payments, analytics, and business settings into one responsive application.",
    "flowdesk",
    "https://flowdesk-three-tan.vercel.app",
  ],
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
    project: projects[0],
    technologies: ["React", "Neon", "PostgreSQL", "Authentication", "SaaS"],
  },
  {
    project: projects[7],
    technologies: ["React", "Vite", "Supabase", "Vercel"],
  },
  {
    project: projects[1],
    technologies: ["Web Design", "Front-End", "Responsive"],
  },
  {
    project: projects[6],
    technologies: ["Web Design", "Front-End", "Vercel"],
  },
];

const experimentalProjects = [projects[2], projects[3], projects[4], projects[5]];

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
    flowdesk: (
      <>
        <span className="preview-label">FLOWDESK</span>
        <div className="flowdesk-window">
          <div className="flowdesk-sidebar"><i /><i /><i /><i /><i /></div>
          <div className="flowdesk-main">
            <div className="flowdesk-topbar"><span>Dashboard</span><i /></div>
            <p>Good morning</p>
            <div className="flowdesk-metrics"><i /><i /><i /></div>
            <div className="flowdesk-panel"><b>Today&apos;s work</b><span /><span /><span /></div>
          </div>
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

const PROJECT_TYPES = [
  "Business Website",
  "Web Application",
  "Custom Business Tool",
  "Booking / Scheduling System",
  "Dashboard / Management System",
  "Other",
];

const APPOINTMENT_STARTS = Array.from({ length: 30 }, (_, index) => 480 + index * 30);
const manilaDateFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Manila",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});
const manilaConfirmationDateFormatter = new Intl.DateTimeFormat("en-PH", {
  timeZone: "Asia/Manila",
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});
const manilaTimeFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Manila",
  hour: "numeric",
  minute: "2-digit",
});

function getManilaDateString(date = new Date()) {
  const parts = Object.fromEntries(
    manilaDateFormatter
      .formatToParts(date)
      .filter(({ type }) => type !== "literal")
      .map(({ type, value }) => [type, value]),
  );

  return `${parts.year}-${parts.month}-${parts.day}`;
}

function addCalendarDays(dateString, days) {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day + days));
  const pad = (value) => String(value).padStart(2, "0");
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
}

function formatAppointmentTime(minutes) {
  const hour = Math.floor(minutes / 60);
  const minute = String(minutes % 60).padStart(2, "0");
  const period = hour < 12 ? "AM" : "PM";
  return `${hour % 12 || 12}:${minute} ${period}`;
}

function makeManilaTimestamp(dateString, minutes) {
  const hour = String(Math.floor(minutes / 60)).padStart(2, "0");
  const minute = String(minutes % 60).padStart(2, "0");
  return `${dateString}T${hour}:${minute}:00+08:00`;
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getCurrentTime() {
  return Date.now();
}

async function fetchBookedSlots(date, signal) {
  const query = new URLSearchParams({ from: date, to: date });
  const response = await fetch(`/api/booked-slots?${query}`, { signal });
  if (!response.ok) throw new Error("Availability request failed");

  const slots = await response.json();
  if (!Array.isArray(slots)) throw new Error("Invalid availability response");
  return slots.filter((slot) => slot && typeof slot.starts_at === "string");
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [now, setNow] = useState(getCurrentTime);
  const todayManila = getManilaDateString(new Date(now));
  const lastBookableDate = addCalendarDays(todayManila, 29);
  const [selectedDate, setSelectedDate] = useState(() => getManilaDateString());
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [isAvailabilityLoading, setIsAvailabilityLoading] = useState(true);
  const [availabilityError, setAvailabilityError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [successfulBooking, setSuccessfulBooking] = useState(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const currentTime = getCurrentTime();
      const currentManilaDate = getManilaDateString(new Date(currentTime));
      setNow(currentTime);
      if (selectedDate < currentManilaDate) {
        setSelectedDate(currentManilaDate);
        setSelectedTime(null);
        setIsAvailabilityLoading(true);
      }
    }, 30000);
    return () => window.clearInterval(timer);
  }, [selectedDate]);

  useEffect(() => {
    if (!selectedDate || selectedDate < todayManila || selectedDate > lastBookableDate) {
      return undefined;
    }

    const controller = new AbortController();
    fetchBookedSlots(selectedDate, controller.signal)
      .then((slots) => {
        setBookedSlots(slots);
        setIsAvailabilityLoading(false);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setAvailabilityError("We couldn't load times for this date. Please try another date.");
          setIsAvailabilityLoading(false);
        }
      })

    return () => controller.abort();
  }, [selectedDate, todayManila, lastBookableDate]);

  const appointmentSlots = selectedDate
    ? APPOINTMENT_STARTS.map((minutes) => {
        const startsAt = makeManilaTimestamp(selectedDate, minutes);
        const startsAtMs = Date.parse(startsAt);
        const isBooked = bookedSlots.some((slot) => Date.parse(slot.starts_at) === startsAtMs);
        const isTooSoon = startsAtMs < now + 2 * 60 * 60 * 1000;

        return {
          minutes,
          startsAt,
          label: formatAppointmentTime(minutes),
          isBooked,
          isTooSoon,
          disabled: isBooked || isTooSoon,
        };
      })
    : [];
  const availableSlotCount = appointmentSlots.filter((slot) => !slot.disabled).length;
  const selectedSlot = appointmentSlots.find((slot) => slot.minutes === selectedTime);

  async function refreshAvailability(date) {
    setIsAvailabilityLoading(true);
    setAvailabilityError("");
    try {
      const slots = await fetchBookedSlots(date);
      setBookedSlots(slots);
      return slots;
    } catch {
      setAvailabilityError("We couldn't load times for this date. Please try another date.");
      return null;
    } finally {
      setIsAvailabilityLoading(false);
    }
  }

  async function handleBookingSubmit(event) {
    event.preventDefault();
    setSubmitError("");
    setSuccessfulBooking(null);

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const projectType = String(formData.get("project_type") ?? "");
    const description = String(formData.get("description") ?? "").trim();

    if (name.length < 2 || name.length > 100) {
      setSubmitError("Enter a name between 2 and 100 characters.");
      return;
    }
    if (email.length > 254 || !isValidEmail(email)) {
      setSubmitError("Enter a valid email address.");
      return;
    }
    if (!PROJECT_TYPES.includes(projectType)) {
      setSubmitError("Choose a project type.");
      return;
    }
    if (description.length < 20 || description.length > 2000) {
      setSubmitError("Enter a project description between 20 and 2000 characters.");
      return;
    }
    if (!selectedDate || !selectedSlot) {
      setSubmitError("Choose a date and available time.");
      return;
    }
    if (selectedDate < todayManila || selectedDate > lastBookableDate) {
      setSubmitError("Choose a date within the next 30 days.");
      return;
    }
    const currentTime = getCurrentTime();
    if (selectedSlot.disabled || Date.parse(selectedSlot.startsAt) < currentTime + 2 * 60 * 60 * 1000) {
      setSelectedTime(null);
      setSubmitError("That time no longer meets the two-hour notice. Please choose another time.");
      return;
    }

    const payload = {
      name,
      email,
      project_type: projectType,
      description,
      starts_at: selectedSlot.startsAt,
    };
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const refreshedSlots = await refreshAvailability(selectedDate);
        if (refreshedSlots) {
          const selectedWasBooked = refreshedSlots.some(
            (slot) => Date.parse(slot.starts_at) === Date.parse(selectedSlot.startsAt),
          );
          if (selectedWasBooked) {
            setSelectedTime(null);
            setSubmitError("That time was just taken. Please choose another available time.");
            return;
          }
        }
        setSubmitError("We couldn't complete your booking. Please try again.");
        return;
      }

      setSuccessfulBooking({ date: selectedDate, startsAt: selectedSlot.startsAt });
      setSelectedTime(null);
      setBookedSlots((currentSlots) =>
        currentSlots.some((slot) => Date.parse(slot.starts_at) === Date.parse(selectedSlot.startsAt))
          ? currentSlots
          : [...currentSlots, { starts_at: selectedSlot.startsAt }],
      );

      if (!await refreshAvailability(selectedDate)) {
        setAvailabilityError("Your booking is confirmed, but availability couldn't be refreshed.");
      }
    } catch {
      const refreshedSlots = await refreshAvailability(selectedDate);
      if (refreshedSlots) {
        const selectedWasBooked = refreshedSlots.some(
          (slot) => Date.parse(slot.starts_at) === Date.parse(selectedSlot.startsAt),
        );
        if (selectedWasBooked) {
          setSelectedTime(null);
          setSubmitError("That time was just taken. Please choose another available time.");
          return;
        }
      }
      setSubmitError("We couldn't complete your booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

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
              <strong>8</strong>
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
              A selection of websites and functional web applications designed
              and built with care.
            </p>
          </div>
        </div>
        <div className="featured-projects" aria-label="Featured projects">
          {featuredProjects.map(({ project, technologies }, index) => {
            const [title, type, description, preview, liveDemo] = project;
            const projectNumber = String(index + 1).padStart(2, "0");
            return (
              <article
                className={`featured-project featured-project-${preview}${preview === "flowdesk" ? " featured-project-flagship" : ""}`}
                key={title}
              >
                <div className="featured-project-visual">
                  <Preview kind={preview} title={title} />
                </div>
                <div className="featured-project-copy">
                  <p className="featured-project-number">{projectNumber}</p>
                  {preview === "flowdesk" && <p className="featured-project-flagship-label">Flagship project</p>}
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
          <a className="button primary" href="#booking-form">
            Book a Project Call <span>→</span>
          </a>
        </div>
        <form
          className="booking-form"
          id="booking-form"
          onSubmit={handleBookingSubmit}
          aria-busy={isAvailabilityLoading || isSubmitting}
        >
          <div className="booking-fields">
            <div className="booking-field">
              <label htmlFor="booking-name">Name</label>
              <input
                autoComplete="name"
                disabled={isSubmitting}
                id="booking-name"
                maxLength={100}
                minLength={2}
                name="name"
                required
                type="text"
              />
            </div>
            <div className="booking-field">
              <label htmlFor="booking-email">Email</label>
              <input
                autoComplete="email"
                disabled={isSubmitting}
                id="booking-email"
                maxLength={254}
                name="email"
                required
                type="email"
              />
            </div>
            <div className="booking-field">
              <label htmlFor="booking-project-type">Project Type</label>
              <select
                disabled={isSubmitting}
                id="booking-project-type"
                name="project_type"
                required
                defaultValue=""
              >
                <option disabled value="">Choose a project type</option>
                {PROJECT_TYPES.map((projectType) => (
                  <option key={projectType} value={projectType}>{projectType}</option>
                ))}
              </select>
            </div>
            <div className="booking-field booking-field-wide">
              <label htmlFor="booking-description">Project Description</label>
              <textarea
                disabled={isSubmitting}
                id="booking-description"
                maxLength={2000}
                minLength={20}
                name="description"
                required
                rows={4}
              />
            </div>
            <div className="booking-field">
              <label htmlFor="booking-date">Date</label>
              <input
                disabled={isSubmitting}
                id="booking-date"
                max={lastBookableDate}
                min={todayManila}
                onChange={(event) => {
                  const nextDate = event.target.value;
                  setSelectedDate(nextDate);
                  setSelectedTime(null);
                  setBookedSlots([]);
                  setIsAvailabilityLoading(Boolean(nextDate));
                  setAvailabilityError("");
                  setSubmitError("");
                  setSuccessfulBooking(null);
                }}
                required
                type="date"
                value={selectedDate}
              />
              <span className="booking-field-hint">Dates use Manila time (UTC+08:00).</span>
            </div>
            <div className="booking-field booking-field-wide">
              <fieldset
                className="booking-time-fieldset"
                disabled={isSubmitting || isAvailabilityLoading || Boolean(availabilityError)}
              >
                <legend>Available Time <span>Manila time</span></legend>
                {appointmentSlots.length > 0 && (
                  <div className="booking-time-grid">
                    {appointmentSlots.map((slot) => {
                      const unavailableReason = slot.isBooked
                        ? ", already booked"
                        : slot.isTooSoon
                          ? ", within two-hour notice"
                          : "";

                      return (
                        <button
                          aria-label={`${slot.label}${unavailableReason}`}
                          aria-pressed={selectedTime === slot.minutes}
                          className={selectedTime === slot.minutes ? "is-selected" : ""}
                          disabled={slot.disabled || isSubmitting || isAvailabilityLoading || Boolean(availabilityError)}
                          key={slot.startsAt}
                          onClick={() => {
                            setSelectedTime(slot.minutes);
                            setSubmitError("");
                          }}
                          type="button"
                        >
                          {slot.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </fieldset>
            </div>
          </div>

          {isAvailabilityLoading && (
            <p className="booking-message" role="status" aria-live="polite">
              Loading available times…
            </p>
          )}
          {!isAvailabilityLoading && availabilityError && (
            <p className="booking-message is-error" role="alert">{availabilityError}</p>
          )}
          {!isAvailabilityLoading && !availabilityError && selectedDate && availableSlotCount === 0 && (
            <p className="booking-message" role="status">
              No available times for this date. Please choose another date.
            </p>
          )}
          {!selectedDate && (
            <p className="booking-message" role="status">Choose a date to see available times.</p>
          )}
          {submitError && <p className="booking-message is-error" role="alert">{submitError}</p>}
          {successfulBooking && (
            <p className="booking-message is-success" role="status" aria-live="polite">
              Your call is booked for {manilaConfirmationDateFormatter.format(
                new Date(successfulBooking.startsAt),
              )} at {manilaTimeFormatter.format(new Date(successfulBooking.startsAt))} Manila time.
            </p>
          )}

          <button className="button primary booking-submit" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Submitting…" : "Request a Project Call"}
          </button>
        </form>
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
