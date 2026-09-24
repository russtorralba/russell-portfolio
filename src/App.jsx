import './App.css'
import './fixpro.css'

const projects = [
  ['ChordHouse Music Academy', 'Music lesson booking demo', 'A welcoming lesson-booking experience designed to make finding the right music class feel simple.', 'music', 'https://chordhouse-music-academy-cr7gb2481-rus17.vercel.app/', 'https://github.com/russtorralba/chordhouse-music-academy'],
  ['SupportDesk Mini', 'Browser-based support ticket tracker', 'A focused support workspace for creating, sorting, and following up on customer tickets.', 'support', 'https://supportdesk-mini.vercel.app', 'https://github.com/russtorralba/supportdesk-mini'],
  ['DayMark', 'Task and deadline planner', 'A calm planning tool that keeps everyday tasks and upcoming deadlines in clear view.', 'daymark', 'https://daymark-lemon.vercel.app/', 'https://github.com/russtorralba/daymark'],
  ['PocketTrack', 'Personal income and expense tracker', 'A practical dashboard for tracking money in, money out, and monthly goals.', 'pocket', 'https://pockettrack-liard.vercel.app', 'https://github.com/russtorralba/pockettrack'],
  ['The Last Sound', 'Eight-level sound-sequence puzzle game', 'A gentle browser game where players listen closely and rebuild melodies one sound at a time.', 'sound', 'https://the-last-sound.vercel.app/', 'https://github.com/russtorralba/the-last-sound'],
  ['FixPro Home Services', 'Home services demo website', 'A home services demo website.', 'fixpro', 'https://fixpro-home-services-demo.vercel.app/', 'https://github.com/russtorralba/fixpro-home-services-demo'],
]

function Preview({ kind, title }) {
  const content = {
    music: <><span className="preview-label">CHORDHOUSE</span><div className="music-lines"><i /><i /><i /><i /></div><b className="big-mark">♬</b></>,
    support: <><span className="preview-label">SUPPORTDESK</span><div className="tickets"><p><i />Open ticket</p><p><i />In progress</p><p><i />Resolved</p></div></>,
    daymark: <><span className="preview-label">DAYMARK</span><div className="calendar"><b>12</b><i /><i /><i /><i /><i /></div><p className="preview-task">● Finish project notes</p></>,
    pocket: <><span className="preview-label">POCKETTRACK</span><b className="balance">$2,480</b><div className="bars"><i /><i /><i /><i /><i /></div></>,
    sound: <><span className="preview-label">THE LAST SOUND</span><b className="sound-orb">✦</b><div className="sound-tiles"><i>◒</i><i>≈</i><i>☼</i><i>☾</i></div></>,
    fixpro: <><span className="preview-label">FIXPRO</span><b className="fixpro-mark">⌂</b><p className="fixpro-copy">HOME SERVICES<br /><strong>MADE SIMPLE</strong></p><div className="fixpro-tools"><i>⌁</i><i>✦</i><i>●</i></div></>,
  }
  return <div className={`project-preview ${kind}`} role="img" aria-label={`${title} interface preview`}>{content[kind]}</div>
}

function App() {
  return <main>
    <header className="site-header"><a className="brand" href="#top" aria-label="Russell Portfolio home">R<span>.</span></a><nav aria-label="Main navigation"><a href="#projects">Projects</a><a href="#about">About</a><a href="#contact">Contact</a></nav><a className="nav-cta" href="#projects">View work <span>↗</span></a></header>
    <section className="hero" id="top" aria-labelledby="hero-title"><div className="hero-copy"><p className="eyebrow"><span /> PORTFOLIO</p><h1 id="hero-title">Useful digital<br /><em>experiences,</em><br />thoughtfully made.</h1><p className="hero-intro">A collection of websites, practical tools, and playful browser experiences built with clarity in mind.</p><div className="hero-actions"><a className="button primary" href="#projects">Explore projects <span>↓</span></a><a className="text-link" href="#about">More about me <span>→</span></a></div></div><div className="hero-art" aria-hidden="true"><i className="orbit one" /><i className="orbit two" /><div className="hero-disc">R</div><b className="spark first">✦</b><b className="spark second">✧</b><p>DESIGN <b>•</b> BUILD <b>•</b> PLAY</p></div></section>
    <section className="projects section" id="projects" aria-labelledby="projects-title"><div className="section-heading"><div><p className="eyebrow"><span /> SELECTED WORK</p><h2 id="projects-title">Projects with a<br /><em>purpose.</em></h2></div><p>Six small, thoughtful projects — each made to solve a real need or invite a little curiosity.</p></div><div className="project-grid">{projects.map(([title, type, description, preview, liveDemo, githubUrl], index) => <article className="project-card" key={title}><Preview kind={preview} title={title} /><div className="project-body"><p className="project-number">0{index + 1}</p><h3>{title}</h3><p className="project-type">{type}</p><p className="project-description">{description}</p><div className="card-actions">{liveDemo ? <a className="button small primary" href={liveDemo} target="_blank" rel="noreferrer">Live Demo ↗</a> : <button className="button small placeholder" disabled>Live Demo — add URL</button>}{githubUrl ? <a className="github-link" href={githubUrl} target="_blank" rel="noreferrer">GitHub ↗</a> : <button className="github-link" disabled>GitHub — add URL ↗</button>}</div></div></article>)}</div></section>
    <section className="about section" id="about" aria-labelledby="about-title"><div className="about-copy"><p className="eyebrow"><span /> ABOUT</p><h2 id="about-title">Making technology feel<br /><em>more human.</em></h2><p>I enjoy building practical digital experiences, from websites and productivity tools to interactive browser games. My projects focus on clean interfaces, useful features, and simple experiences that are easy to understand and use.</p></div><div className="feature-grid"><article><span>◌</span><h3>Clear by design</h3><p>Interfaces that guide people naturally, without unnecessary steps.</p></article><article><span>✦</span><h3>Useful details</h3><p>Small features that make everyday tasks feel more manageable.</p></article><article><span>↗</span><h3>Built to explore</h3><p>Responsive projects that work smoothly across screen sizes.</p></article></div></section>
    <section className="contact section" id="contact" aria-labelledby="contact-title"><i className="contact-glow" /><p className="eyebrow"><span /> GET IN TOUCH</p><h2 id="contact-title">Let's build something<br /><em>useful.</em></h2><p>Have a project, website, or idea you'd like to discuss? Feel free to get in touch.</p><div className="contact-actions"><a className="button primary" href="mailto:yourdgtalhub@gmail.com">Email Me</a><a className="button outline" href="https://github.com/russtorralba" target="_blank" rel="noreferrer">GitHub Profile ↗</a></div></section>
    <footer><a className="brand" href="#top" aria-label="Back to top">R<span>.</span></a><p>Designed and built with care.</p><a href="#top">Back to top ↑</a></footer>
  </main>
}

export default App
