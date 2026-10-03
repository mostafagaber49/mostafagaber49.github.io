import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, Text, Line } from "@react-three/drei";
import { AnimatePresence, motion, useScroll, useInView, useMotionValue, useSpring } from "framer-motion";
import Lenis from "lenis";
import {
  Github, Linkedin, Mail, ArrowUpRight, Download, Menu, X, MessageCircle,
  Database, Server, ShieldCheck, Layers3, Zap, Globe2, ChevronLeft, ChevronRight
} from "lucide-react";
import "./styles.css";

const WHATSAPP = "201001483579";
const CV = `${import.meta.env.BASE_URL}Mustafa_Gaber_CV.pdf`;
const links = {
  github: "https://github.com/mostafagaber49",
  linkedin: "https://linkedin.com/in/mostafa-gaber-713b2a42a/",
  email: "mailto:mogabee99@gmail.com",
  whatsapp: `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hello Mostafa, I saw your portfolio and would like to discuss an opportunity.")}`,
};

// demo: ضع رابط الـ Live Demo هنا لأي مشروع. لو سيبته "" الزرار مش بيظهر.
const projects = [
  { name:"Talabat", type:"E-Commerce Backend", desc:"A modular REST API covering users, products, orders, authentication, caching, file uploads and payment-related workflows.", stack:["NestJS","TypeScript","MongoDB","Redis","JWT","AWS S3"], repo:"https://github.com/mostafagaber49/talabat", demo:"" },
  { name:"Banking Wallet", type:"Fintech API", desc:"Digital wallet backend for accounts, deposits, withdrawals and wallet-to-wallet transfers with transactional data handling.", stack:["NestJS","MongoDB","Redis","JWT","Docker","Swagger"], repo:"https://github.com/mostafagaber49/banking-wallet-api", demo:"" },
  { name:"Job Board", type:"Recruitment Backend", desc:"Job marketplace API for users, companies, jobs, applications and saved jobs with protected REST workflows.", stack:["NestJS","TypeScript","MongoDB","JWT","Swagger"], repo:"https://github.com/mostafagaber49/jop-board", demo:"" },
  { name:"Saraha", type:"Anonymous Messaging API", desc:"Anonymous messaging backend with accounts, protected routes, validation, repositories and MongoDB schemas.", stack:["NestJS","TypeScript","MongoDB","JWT"], repo:"https://github.com/mostafagaber49/Saraha-app-Anonymous-Messaging-API", demo:"" },
  { name:"Movie App", type:"Backend Project", desc:"A portfolio project demonstrating API-focused backend development and structured application design.", stack:["NestJS","TypeScript","MongoDB"], repo:"https://github.com/mostafagaber49/Movie-app", demo:"" },
];

const NAV_IDS = ["home","about","skills","projects","contact"];
const STACK = ["NestJS","TypeScript","Node.js","MongoDB","Redis","JWT","Docker","AWS S3","Swagger","REST APIs"];

const TERM_CMD = "GET /api/mostafa";
const TERM_RESP = [
  {v:"200 OK · 12ms",g:1,dim:1},
  {v:"{"},
  {i:1,k:"name",v:'"Mostafa Gaber",',s:1},
  {i:1,k:"role",v:'"Back-End Developer",',s:1},
  {i:1,k:"stack",v:'["NestJS","MongoDB","Redis"],',s:1},
  {i:1,k:"location",v:'"Egypt",',s:1},
  {i:1,k:"status",v:'"open_to_work"',g:1},
  {v:"}"},
];

const skills = [
  ["Node.js","Backend runtime",Server], ["NestJS","Scalable APIs",Layers3], ["Express.js","REST services",Zap], ["TypeScript","Typed systems",ShieldCheck],
  ["MongoDB","Data modeling",Database], ["Redis","Caching",Zap], ["JWT","Authentication",ShieldCheck], ["Docker","Containers",Layers3],
  ["AWS S3","File storage",Database], ["Swagger","API docs",Globe2], ["Postman","API testing",Zap], ["Git / GitHub","Version control",Github]
];

const copy = {
  en: {
    nav:["Home","About","Skills","Projects","Contact"], cv:"CV",
    available:"AVAILABLE FOR BACK-END OPPORTUNITIES", heroTitle:<>Building the<br/><em>systems</em> behind<br/>the experience.</>,
    heroText:<>I'm <strong>Mostafa Gaber</strong>, a Back-End Developer focused on scalable APIs, authentication, databases, caching and production-ready backend systems.</>,
    explore:"Explore Projects", download:"Download CV", scroll:"SCROLL TO EXPLORE", live:"SYSTEM ONLINE",
    aboutKicker:"01 / PROFILE", aboutTitle:<>From <em>Law</em><br/>to Backend.</>,
    aboutLead:"I changed my path completely and chose software engineering — building backend systems where architecture, security and reliability matter.",
    aboutBody:"My work centers around REST APIs, authentication, data modeling, caching and clean modular architecture. I care about the details behind the interface: validation, permissions, transactions, performance and maintainability.",
    fact1:"PROJECTS", fact2:"CORE FOCUS", fact3:"STACK", focus:"API / AUTH / DATA",
    skillsKicker:"02 / TOOLKIT", skillsTitle:<>Built for<br/><em>the backend.</em></>,
    projectsKicker:"03 / SELECTED WORK", projectsTitle:<>Systems I've<br/><em>built.</em></>, viewRepo:"VIEW REPOSITORY", projectCount:"PROJECTS",
    philosophyKicker:"04 / PRINCIPLES", philosophyTitle:<>Quiet code.<br/><em>Strong systems.</em></>, principles:["Clean Architecture","Secure by Default","Validated APIs","Data Consistency","Performance","Maintainable Code"],
    contactKicker:"05 / CONTACT", contactTitle:<>Let's build<br/><em>something real.</em></>, contactText:"Open to conversations about backend opportunities, collaborations and interesting products.", email:"Email", whatsapp:"WhatsApp", github:"GitHub", linkedin:"LinkedIn",
    footer:"Designed & engineered by Mostafa Gaber", back:"BACK-END DEVELOPER", language:"عربي"
  },
  ar: {
    nav:["الرئيسية","عني","المهارات","المشاريع","تواصل"], cv:"السيرة",
    available:"متاح لفرص الـ Back-End", heroTitle:<>أبني<br/><em>الأنظمة</em> خلف<br/>التجربة.</>,
    heroText:<>أنا <strong>مصطفى جابر</strong>، Back-End Developer متخصص في بناء الـ APIs، أنظمة المصادقة، قواعد البيانات، الـ Caching والأنظمة القابلة للتوسع.</>,
    explore:"استكشف المشاريع", download:"تحميل السيرة", scroll:"انزل للاستكشاف", live:"النظام يعمل",
    aboutKicker:"01 / نبذة", aboutTitle:<>من <em>القانون</em><br/>إلى الـ Backend.</>,
    aboutLead:"غيّرت مساري بالكامل واخترت هندسة البرمجيات، وبقيت مهتم ببناء أنظمة Backend يكون فيها التصميم والأمان والاعتمادية أساسيين.",
    aboutBody:"تركيزي الأساسي على REST APIs، المصادقة، تصميم البيانات، الـ Caching والـ Modular Architecture. باهتم بالتفاصيل اللي وراء الواجهة: الـ validation، الصلاحيات، الـ transactions، الأداء وسهولة التطوير.",
    fact1:"مشروع", fact2:"التركيز", fact3:"التقنيات", focus:"API / AUTH / DATA",
    skillsKicker:"02 / الأدوات", skillsTitle:<>مصمم<br/><em>للـ Backend.</em></>,
    projectsKicker:"03 / أعمال مختارة", projectsTitle:<>أنظمة<br/><em>بنيتها.</em></>, viewRepo:"فتح المستودع", projectCount:"مشاريع",
    philosophyKicker:"04 / مبادئ", philosophyTitle:<>كود هادئ.<br/><em>أنظمة قوية.</em></>, principles:["Clean Architecture","Secure by Default","Validated APIs","Data Consistency","Performance","Maintainable Code"],
    contactKicker:"05 / تواصل", contactTitle:<>لنبني<br/><em>شيئًا حقيقيًا.</em></>, contactText:"متاح للنقاش حول فرص الـ Backend، التعاون والمشاريع والمنتجات الجديدة.", email:"الإيميل", whatsapp:"واتساب", github:"GitHub", linkedin:"LinkedIn",
    footer:"تصميم وتطوير Mostafa Gaber", back:"BACK-END DEVELOPER", language:"English"
  }
}

function NetworkCore(){
  const group = useRef();
  const nodes = useMemo(()=>[[ -2,.9,.25],[1.8,1.1,-.3],[-1.6,-1.15,-.1],[1.7,-1,.25],[0,1.75,-.5],[.15,-1.75,-.35],[0,0,.65]],[]);
  const edges = [[0,4],[4,1],[0,6],[1,6],[2,6],[3,6],[2,5],[5,3],[4,6],[6,5]];
  useFrame((state)=>{
    if(!group.current) return;
    const t=state.clock.getElapsedTime();
    group.current.rotation.y = state.pointer.x*.14 + Math.sin(t*.22)*.08;
    group.current.rotation.x = -state.pointer.y*.08 + Math.sin(t*.17)*.025;
    group.current.position.y = Math.sin(t*.55)*.035;
  });
  return <group ref={group}>
    <Float speed={1.1} rotationIntensity={.18} floatIntensity={.45}>
      <mesh>
        <icosahedronGeometry args={[1.18,2]}/>
        <meshPhysicalMaterial color="#07101f" metalness={.92} roughness={.13} clearcoat={1} clearcoatRoughness={.08} emissive="#0b2d5c" emissiveIntensity={.72}/>
      </mesh>
      <mesh scale={1.025}><icosahedronGeometry args={[1.18,2]}/><meshBasicMaterial color="#67b7ff" wireframe transparent opacity={.25}/></mesh>
    </Float>
    {edges.map(([a,b],i)=><Line key={i} points={[nodes[a],nodes[b]]} color="#3b82f6" transparent opacity={.32} lineWidth={.8}/>) }
    {nodes.map((p,i)=><Float key={i} speed={1.2+i*.08} floatIntensity={.35} rotationIntensity={.15}><mesh position={p} scale={i===6?1.25:.68}><sphereGeometry args={[.085,16,16]}/><meshBasicMaterial color={i===6?"#d9f3ff":"#65a8ff"}/></mesh></Float>)}
    <Float speed={1.5} floatIntensity={.8}><Text position={[0,0,1.28]} fontSize={.22} color="#dff4ff" anchorX="center" anchorY="middle">API</Text></Float>
  </group>
}

function Scene(){
  const ref = useRef(null);
  const inView = useInView(ref);
  const count = typeof window !== "undefined" && window.innerWidth < 700 ? 40 : 70;
  return <div ref={ref} style={{width:"100%",height:"100%"}}>
    <Canvas dpr={[1,1.25]} frameloop={inView?"always":"never"} gl={{antialias:true,alpha:true,powerPreference:"high-performance"}} camera={{position:[0,0,6.3],fov:42}}>
      <ambientLight intensity={.55}/><directionalLight position={[3,4,5]} intensity={3.2}/>
      <pointLight position={[-3,1,2]} intensity={15} color="#1677ff"/><pointLight position={[3,-2,-1]} intensity={12} color="#8b5cf6"/><pointLight position={[0,2,-3]} intensity={8} color="#22d3ee"/>
      <Suspense fallback={null}><NetworkCore/><Sparkles count={count} scale={9} size={1.35} speed={.2} color="#86c7ff"/></Suspense>
    </Canvas>
  </div>
}

function Terminal(){
  const [typed,setTyped]=useState(0), [shown,setShown]=useState(0);
  useEffect(()=>{
    if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){setTyped(TERM_CMD.length);setShown(TERM_RESP.length);return}
    let alive=true; const timers=[];
    const later=(fn,ms)=>timers.push(setTimeout(()=>alive&&fn(),ms));
    let i=0;
    const type=()=>{
      if(i<=TERM_CMD.length){setTyped(i++);later(type,60)}
      else{let l=0;const reveal=()=>{if(l<TERM_RESP.length){setShown(++l);later(reveal,170)}};later(reveal,380)}
    };
    later(type,2300);
    return()=>{alive=false;timers.forEach(clearTimeout)};
  },[]);
  return <div className="terminal" aria-hidden="true">
    <div className="terminal-bar"><i/><i/><i/><span>api — zsh</span></div>
    <div className="terminal-body">
      <div><span className="t-prompt">$</span> {TERM_CMD.slice(0,typed)}{shown===0&&<span className="t-caret"/>}</div>
      {TERM_RESP.slice(0,shown).map((l,n)=><div key={n} className={l.dim?"t-dim":""}>{"  ".repeat(l.i||0)}{l.k&&<><span className="t-k">"{l.k}"</span>: </>}<span className={l.g?"t-g":l.s?"t-s":""}>{l.v}</span></div>)}
      {shown>=TERM_RESP.length&&<span className="t-caret"/>}
    </div>
  </div>
}

function Spot({children}){
  const ref=useRef(null);
  const s=useRef({x:0,y:0,cx:0,cy:0,raf:0,last:0,on:false,running:false});
  const tick=now=>{
    const st=s.current, el=ref.current;
    if(!el||!st.on){st.running=false;return}
    const r=el.getBoundingClientRect();
    const tx=st.cx-r.left, ty=st.cy-r.top;
    const dt=Math.min(now-st.last,50); st.last=now;
    const k=1-Math.exp(-dt*.02);
    st.x+=(tx-st.x)*k; st.y+=(ty-st.y)*k;
    el.style.setProperty("--x",`${st.x}px`); el.style.setProperty("--y",`${st.y}px`);
    if(Math.abs(tx-st.x)>.1||Math.abs(ty-st.y)>.1) st.raf=requestAnimationFrame(tick); else st.running=false;
  };
  const start=()=>{const st=s.current;if(!st.running){st.running=true;st.last=performance.now();st.raf=requestAnimationFrame(tick)}};
  const enter=e=>{
    const st=s.current, el=ref.current, r=el.getBoundingClientRect();
    st.on=true; st.cx=e.clientX; st.cy=e.clientY; st.x=e.clientX-r.left; st.y=e.clientY-r.top;
    el.style.setProperty("--x",`${st.x}px`); el.style.setProperty("--y",`${st.y}px`);
    el.classList.add("on"); start();
  };
  const move=e=>{const st=s.current;st.cx=e.clientX;st.cy=e.clientY;start()};
  const leave=()=>{const st=s.current;st.on=false;cancelAnimationFrame(st.raf);st.running=false;ref.current?.classList.remove("on")};
  useEffect(()=>()=>cancelAnimationFrame(s.current.raf),[]);
  return <h2 ref={ref} className="spot" onPointerEnter={enter} onPointerMove={move} onPointerLeave={leave}><span className="spot-base">{children}</span><span className="spot-fill" aria-hidden="true">{children}</span></h2>
}

function Reveal({children,className="",delay=0}){
  return <motion.div className={className} initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.15}} transition={{duration:.8,delay,ease:[.22,1,.36,1]}}>{children}</motion.div>
}

function Magnetic({children,className="",...props}){
  const ref=useRef(null);
  const x=useMotionValue(0), y=useMotionValue(0);
  const sx=useSpring(x,{stiffness:240,damping:18}), sy=useSpring(y,{stiffness:240,damping:18});
  const move=e=>{const r=ref.current?.getBoundingClientRect();if(r){x.set((e.clientX-(r.left+r.width/2))*.1);y.set((e.clientY-(r.top+r.height/2))*.1)}};
  const leave=()=>{x.set(0);y.set(0)};
  return <motion.div ref={ref} className={`magnetic ${className}`} style={{x:sx,y:sy}} onMouseMove={move} onMouseLeave={leave} {...props}>{children}</motion.div>
}

function App(){
  const [menu,setMenu]=useState(false), [loaded,setLoaded]=useState(false), [gone,setGone]=useState(false), [lang,setLang]=useState("en"), [activeProject,setActiveProject]=useState(0);
  const {scrollYProgress}=useScroll(); const t=copy[lang];
  const lenisRef=useRef(null);
  const [active,setActive]=useState("home");
  useEffect(()=>{
    document.documentElement.lang=lang; document.documentElement.dir=lang==="ar"?"rtl":"ltr";
  },[lang]);
  useEffect(()=>{
    const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis=new Lenis(reduce?{duration:.1,smoothWheel:false}:{lerp:.09,wheelMultiplier:.9,touchMultiplier:1.2});
    lenisRef.current=lenis;
    let raf; const loop=time=>{lenis.raf(time);raf=requestAnimationFrame(loop)}; raf=requestAnimationFrame(loop);
    const timer=setTimeout(()=>setLoaded(true),900), timer2=setTimeout(()=>setGone(true),1800);
    return()=>{cancelAnimationFrame(raf);clearTimeout(timer);clearTimeout(timer2);lenis.destroy();lenisRef.current=null};
  },[]);
  useEffect(()=>{
    const io=new IntersectionObserver(es=>es.forEach(e=>e.target.setAttribute("data-offscreen",e.isIntersecting?"false":"true")),{rootMargin:"120px"});
    document.querySelectorAll("section.section,footer,.marquee").forEach(n=>io.observe(n));
    return()=>io.disconnect();
  },[]);
  useEffect(()=>{
    const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)setActive(e.target.id)}),{rootMargin:"-45% 0px -50% 0px"});
    NAV_IDS.forEach(id=>{const n=document.getElementById(id);if(n)io.observe(n)});
    return()=>io.disconnect();
  },[]);
  const scrollTo=id=>{
    const el=document.querySelector(id);
    if(el){
      if(lenisRef.current) lenisRef.current.scrollTo(el,{offset:-70});
      else el.scrollIntoView({behavior:"smooth",block:"start"});
    }
    setMenu(false);
  };
  const next=()=>setActiveProject(v=>(v+1)%projects.length), prev=()=>setActiveProject(v=>(v-1+projects.length)%projects.length);
  const project=projects[activeProject];
  return <>
    {!gone&&(<motion.div className={`loader ${loaded?"done":""}`} animate={{opacity:loaded?0:1,pointerEvents:loaded?"none":"auto"}} transition={{duration:.7}}>
      <div className="loader-inner"><div className="loader-logo">MG</div><div className="loader-title">MOSTAFA GABER</div><div className="loader-line"><i/></div><div className="loader-meta"><span>INITIALIZING EXPERIENCE</span><span>BACK-END / 001</span></div></div>
    </motion.div>)}
    <motion.div className="progress" style={{scaleX:scrollYProgress}}/>
    <div className="vignette"/><div className="cinema-bars top"/><div className="cinema-bars bottom"/>
    <header className="nav">
      <button className="brand" onClick={()=>scrollTo("#home")}><span>MG</span><b>Mostafa Gaber</b></button>
      <nav className={menu?"open":""}>{t.nav.map((x,i)=><button key={x} className={active===NAV_IDS[i]?"on":""} onClick={()=>scrollTo("#"+NAV_IDS[i])}>{x}</button>)}<a className="nav-cv" href={CV} download><Download size={15}/>{t.cv}</a><button className="lang-switch" onClick={()=>setLang(lang==="en"?"ar":"en")}><Globe2 size={15}/><span>{t.language}</span></button></nav>
      <button className="mobile-lang" onClick={()=>setLang(lang==="en"?"ar":"en")}><Globe2 size={15}/><span>{lang==="en"?"عربي":"EN"}</span></button>
      <button className="menu" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button>
    </header>

    <main>
      <section id="home" className="hero section">
        <div className="hero-bg-grid"/><div className="hero-scan"/><div className="hero-noise"/>
        <div className="hero-copy">
          <motion.div className="eyebrow" initial={{opacity:0,x:lang==="ar"?30:-30}} animate={{opacity:1,x:0}} transition={{delay:1.0,duration:.8}}><i/>{t.available}</motion.div>
          <motion.h1 key={lang} initial={{opacity:0,y:60,filter:"blur(12px)"}} animate={{opacity:1,y:0,filter:"blur(0px)"}} transition={{delay:loaded?0:.98,duration:1.1,ease:[.16,1,.3,1]}}>{t.heroTitle}</motion.h1>
          <motion.p key={`p-${lang}`} initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:loaded?0:1.25,duration:.8}}>{t.heroText}</motion.p>
          <motion.div className="actions" initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{delay:1.45,duration:.7}}><Magnetic><button className="primary" onClick={()=>scrollTo("#projects")}>{t.explore} <ArrowUpRight size={18}/></button></Magnetic><Magnetic><a className="ghost" href={CV} download>{t.download} <Download size={17}/></a></Magnetic></motion.div>
          <motion.div className="socials" initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:1.65}}><a href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github/></a><a href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin/></a><a href={links.email} aria-label="Email"><Mail/></a><a href={links.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle/></a></motion.div>
        </div>
        <motion.div className="hero-visual" initial={{opacity:0,scale:.78,rotate:5}} animate={{opacity:1,scale:1,rotate:0}} transition={{delay:.72,duration:1.15,ease:[.16,1,.3,1]}}>
          <div className="hero-halo halo-a"/><div className="hero-halo halo-b"/><div className="hero-orbit o1"/><div className="hero-orbit o2"/><div className="hero-orbit o3"/>
          <div className="scene-frame"><Scene/></div>
          <div className="float-tag tag1"><i/>REST / API</div><div className="float-tag tag2"><i/>REDIS CACHE</div><div className="float-tag tag3"><i/>JWT AUTH</div>
          <div className="telemetry"><span>{t.live}</span><b>{String(projects.length).padStart(2,"0")}</b><small>API / DATABASE / CACHE</small></div>
          <Terminal/>
        </motion.div>
        <div className="scroll-cue"><span/>{t.scroll}<i>01</i></div>
      </section>

      <div className="marquee" aria-hidden="true"><div className="marquee-track">{[0,1].map(k=><div className="marquee-group" key={k}>{STACK.map(x=><span key={x+k}>{x}<i/></span>)}</div>)}</div></div>

      <section id="about" className="section about">
        <Reveal className="section-head"><div className="kicker">{t.aboutKicker}</div><Spot>{t.aboutTitle}</Spot></Reveal>
        <div className="about-grid"><Reveal><div className="big-number">01</div></Reveal><Reveal delay={.08}><p className="lead">{t.aboutLead}</p><p>{t.aboutBody}</p></Reveal><Reveal delay={.16}><div className="fact-card"><span>{t.fact1}</span><strong>{String(projects.length).padStart(2,"0")}</strong><small>{t.focus}</small><div className="fact-orbit"/></div></Reveal></div>
      </section>

      <section id="skills" className="section skills">
        <Reveal className="section-head"><div className="kicker">{t.skillsKicker}</div><Spot>{t.skillsTitle}</Spot></Reveal>
        <div className="skill-grid">{skills.map(([name,sub,Icon],i)=><motion.div key={name} className="skill-card" initial={{opacity:0,y:35,rotateX:8}} whileInView={{opacity:1,y:0,rotateX:0}} viewport={{once:true,amount:.12}} transition={{duration:.65,delay:(i%4)*.06,ease:[.22,1,.36,1]}} whileHover={{y:-8,rotateX:2,rotateY:2}}><span className="skill-index">{String(i+1).padStart(2,"0")}</span><div className="skill-icon"><Icon/></div><b>{name}</b><span>{sub}</span><div className="skill-line"/></motion.div>)}</div>
      </section>

      <section id="projects" className="section projects">
        <Reveal className="section-head projects-head"><div><div className="kicker">{t.projectsKicker}</div><Spot>{t.projectsTitle}</Spot></div><div className="count">0{activeProject+1} / 0{projects.length} {t.projectCount}</div></Reveal>
        <div className="project-showcase">
          <div className="project-rail"><div className="rail-line"/><div className="rail-dot" style={{top:`${activeProject*(100/(projects.length-1))}%`}}/></div>
          <div className="project-stage">
            <AnimatePresence mode="wait">
              <motion.article key={project.name} className="project-card active" initial={{opacity:0,x:lang==="ar"?70:-70,rotateY:lang==="ar"?-5:5,scale:.96}} animate={{opacity:1,x:0,rotateY:0,scale:1}} exit={{opacity:0,x:lang==="ar"?-70:70,rotateY:lang==="ar"?5:-5,scale:.96}} transition={{duration:.55,ease:[.22,1,.36,1]}}>
                <div className="project-index">0{activeProject+1}</div><div className="project-main"><div className="project-type">{project.type}</div><h3>{project.name}</h3><p>{project.desc}</p><div className="chips">{project.stack.map(x=><span key={x}>{x}</span>)}</div></div>
                <div className="project-links"><a className="project-link" href={project.repo} target="_blank" rel="noreferrer">{t.viewRepo}<ArrowUpRight/></a>{project.demo ? <a className="project-link demo" href={project.demo} target="_blank" rel="noreferrer">LIVE DEMO<ArrowUpRight/></a> : null}</div>
                <div className="project-glow"/><div className="project-scan"/><div className="project-corner">BACKEND<br/>SYSTEM</div>
              </motion.article>
            </AnimatePresence>
            <div className="project-controls"><button onClick={prev} aria-label="Previous project"><ChevronLeft/></button><div className="project-dots">{projects.map((p,i)=><button key={p.name} className={i===activeProject?"on":""} onClick={()=>setActiveProject(i)} aria-label={p.name}/>)}</div><button onClick={next} aria-label="Next project"><ChevronRight/></button></div>
          </div>
        </div>
      </section>

      <section className="section philosophy"><Reveal className="philosophy-grid"><div className="quote-mark">“</div><div><div className="kicker">{t.philosophyKicker}</div><Spot>{t.philosophyTitle}</Spot><div className="principles">{t.principles.map((x,i)=><motion.span key={x} whileHover={{y:-4}} transition={{type:"spring",stiffness:300}}>{String(i+1).padStart(2,"0")} / {x}</motion.span>)}</div></div></Reveal></section>

      <section id="contact" className="section contact"><Reveal className="contact-orb"><div className="contact-ring r1"/><div className="contact-ring r2"/><div className="contact-ring r3"/><motion.div className="contact-core" animate={{y:[0,-9,0],rotate:[0,2,0]}} transition={{duration:5,repeat:Infinity,ease:"easeInOut"}}>MG</motion.div><div className="contact-pulse"/></Reveal><Reveal className="contact-copy" delay={.1}><div className="kicker">{t.contactKicker}</div><Spot>{t.contactTitle}</Spot><p>{t.contactText}</p><div className="contact-actions"><Magnetic><a href={links.email}><Mail/>{t.email}<ArrowUpRight/></a></Magnetic><Magnetic><a href={links.whatsapp} target="_blank" rel="noreferrer"><MessageCircle/>{t.whatsapp}<ArrowUpRight/></a></Magnetic><Magnetic><a href={links.github} target="_blank" rel="noreferrer"><Github/>{t.github}<ArrowUpRight/></a></Magnetic><Magnetic><a href={links.linkedin} target="_blank" rel="noreferrer"><Linkedin/>{t.linkedin}<ArrowUpRight/></a></Magnetic></div></Reveal></section>
    </main>
    <footer><span>{t.footer}</span><div><span>{t.back}</span><span>© {new Date().getFullYear()}</span></div></footer>
  </>
}

createRoot(document.getElementById("root")).render(<App/>);
