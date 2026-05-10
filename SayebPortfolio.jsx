import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUp, BrainCircuit, Code2, Database, Network, RadioTower, ServerCog } from "lucide-react";

const PROFILE = {
  name: "MD Abu Ubaida Jubaer Sayeb",
  email: "sayebahmed1234@gmail.com",
  phone: "01572971831",
  github: "https://github.com/sayeb12",
  portfolio: "https://sayeb12.github.io/Sayeb-new-portfolio/##contact",
};

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_171521_25968ba2-b594-4b32-aab7-f6b69398a6fa.mp4";
const SKILLS_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4";
const CONTACT_VIDEO =
  "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";
const PROJECTS_VIDEO =
  "https://stream.mux.com/sDz01Os9GN02ltJvgikeaUvZWsLRiR5FX5GuadCRkQc7E.m3u8";
const RESEARCH_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260306_074215_04640ca7-042c-45d6-bb56-58b1e8a42489.mp4";

const SKILLS = [
  "Python",
  "Java",
  "PHP",
  "Laravel",
  "JavaScript",
  "SQL",
  "Next.js",
  "Node.js",
  "React.js",
  "Machine Learning",
  "REST APIs",
  "Vicidial",
  "Asterisk",
  "OpenCV",
];

const SKILL_ICONS = [
  ["Python", "https://skillicons.dev/icons?i=python"],
  ["Java", "https://skillicons.dev/icons?i=java"],
  ["PHP", "https://skillicons.dev/icons?i=php"],
  ["Laravel", "https://skillicons.dev/icons?i=laravel"],
  ["JavaScript", "https://skillicons.dev/icons?i=js"],
  ["SQL", "https://skillicons.dev/icons?i=mysql"],
  ["Next.js", "https://skillicons.dev/icons?i=nextjs"],
  ["Node.js", "https://skillicons.dev/icons?i=nodejs"],
  ["React.js", "https://skillicons.dev/icons?i=react"],
  ["HTML5", "https://skillicons.dev/icons?i=html"],
  ["CSS3", "https://skillicons.dev/icons?i=css"],
  ["TensorFlow", "https://skillicons.dev/icons?i=tensorflow"],
  ["OpenCV", "https://skillicons.dev/icons?i=opencv"],
  ["GitHub", "https://skillicons.dev/icons?i=github"],
  ["REST APIs", null],
  ["Asterisk", null],
];

const FALLBACK_ICONS = {
  "REST APIs": Network,
  Asterisk: RadioTower,
  "Machine Learning": BrainCircuit,
  "Node.js": ServerCog,
  SQL: Database,
  JavaScript: Code2,
};

const GIFS = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
  "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
  "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
  "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
  "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
  "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
  "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
  "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
  "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
  "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
  "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif",
];

const DECOR = [
  {
    src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png",
    className: "decor decor-tl",
    delay: 0.1,
    x: -80,
  },
  {
    src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png",
    className: "decor decor-bl",
    delay: 0.25,
    x: -80,
  },
  {
    src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png",
    className: "decor decor-tr",
    delay: 0.15,
    x: 80,
  },
  {
    src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png",
    className: "decor decor-br",
    delay: 0.3,
    x: 80,
  },
];

const SERVICES = [
  {
    num: "01",
    name: "Full Stack Development",
    desc: "Responsive frontends, secure backend APIs, database design, authentication, dashboards, and deployment-ready web systems.",
  },
  {
    num: "02",
    name: "VoIP & Telecom Platforms",
    desc: "User management, billing, call routing, real-time monitoring, and integrations around Vicidial and Asterisk-based workflows.",
  },
  {
    num: "03",
    name: "Computer Vision & AI",
    desc: "Human activity recognition, CNN/LSTM model experiments, OpenCV pipelines, and real-time inference for practical monitoring systems.",
  },
  {
    num: "04",
    name: "Research & Documentation",
    desc: "Academic research, technical writing, project documentation, model comparison, and clear presentation of engineering decisions.",
  },
];

const PROJECTS = [
  {
    num: "01",
    name: "DDIALER",
    type: "Professional / VoIP Platform",
    link: "https://sayeb12.github.io/ddialer/",
    cta: "Live Demo",
    desc: "VoIP service platform handling user management, billing systems, call routing infrastructure, secure payment gateways, and real-time call monitoring.",
    tech: ["PHP", "MySQL", "JavaScript", "Vicidial", "Asterisk"],
    accent: "#B600A8",
    preview: "live",
  },
  {
    num: "02",
    name: "DDHOSTER",
    type: "Professional / Hosting",
    link: "https://sayeb12.github.io/ddhoster/",
    cta: "Live Demo",
    desc: "Web hosting management platform with automated domain registration, hosting plan provisioning, and cPanel/WHM API integration.",
    tech: ["PHP", "MySQL", "JavaScript", "cPanel API"],
    accent: "#BE4C00",
    preview: "live",
  },
  {
    num: "03",
    name: "Dial Dynamic",
    type: "Professional / Company Website",
    link: "https://sayeb12.github.io/dialdynamic/",
    cta: "Live Demo",
    desc: "Corporate telecom website with service presentation, responsive frontend, client portal direction, and admin-oriented content flow.",
    tech: ["PHP", "MySQL", "JavaScript", "HTML/CSS"],
    accent: "#7621B0",
    preview: "live",
  },
  {
    num: "04",
    name: "Floka Landing Page",
    type: "Frontend / Personal",
    link: "https://sayeb12.github.io/Floka/",
    cta: "Live Demo",
    desc: "Modern responsive landing page featuring sleek visual design, smooth animations, interactive UI components, and mobile-first performance.",
    tech: ["HTML5", "CSS3", "JavaScript"],
    accent: "#BBCCD7",
    preview: "live",
  },
  {
    num: "05",
    name: "Particle System",
    type: "Canvas / Interactive",
    link: "https://sayeb12.github.io/particle-system/",
    cta: "Live Demo",
    desc: "Interactive particle animation system built with HTML5 Canvas, dynamic behavior, mouse interaction, and real-time rendering.",
    tech: ["JavaScript", "HTML5 Canvas", "CSS"],
    accent: "#B600A8",
    preview: "live",
  },
  {
    num: "06",
    name: "Human Activity Recognition",
    type: "Thesis / Computer Vision",
    link: "https://github.com/sayeb12/Thesis-Models",
    cta: "View Code",
    desc: "Real-time elderly care monitoring research using CNN and LSTM architectures, benchmark evaluation, and edge-focused optimization.",
    tech: ["Python", "TensorFlow", "PyTorch", "OpenCV", "Deep Learning"],
    accent: "#BE4C00",
  },
  {
    num: "07",
    name: "EventORG",
    type: "Full Stack / Event Management",
    link: "https://github.com/sayeb12/EventOrg",
    cta: "View Code",
    desc: "Complete event management solution with registration, scheduling, automated notifications, and role-based access for organizers and attendees.",
    tech: ["PHP", "MySQL", "JavaScript", "Bootstrap"],
    accent: "#7621B0",
  },
  {
    num: "08",
    name: "Homemade Food Delivery",
    type: "IDP / Delivery Platform",
    link: "https://github.com/sayeb12/Homemade_Food_Delivery_System",
    cta: "View Code",
    desc: "Integrated design project connecting home chefs with local customers through order management, delivery tracking, payments, and maps.",
    tech: ["PHP", "MySQL", "JavaScript", "Google Maps API"],
    accent: "#BBCCD7",
  },
];

function useGlobalStyles() {
  useEffect(() => {
    const font = document.createElement("link");
    font.href =
      "https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700;800;900&display=swap";
    font.rel = "stylesheet";
    document.head.appendChild(font);

    if (document.getElementById("sayeb-global")) return;

    const style = document.createElement("style");
    style.id = "sayeb-global";
    style.textContent = `
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
      html{scroll-behavior:smooth;background:#0C0C0C;overflow-x:hidden}
      body,#root{min-width:320px;width:100%;min-height:100vh;overflow-x:hidden;background:#0C0C0C;font-family:'Kanit',sans-serif}
      @media (pointer:fine){html,body,a,button{cursor:none}}
      body{overflow-wrap:anywhere}
      a{color:inherit}
      img{max-width:100%}
      .hg{background:linear-gradient(180deg,#646973 0%,#BBCCD7 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
      .nav-link{color:#D7E2EA;text-decoration:none;font-weight:500;text-transform:uppercase;letter-spacing:.1em;font-size:clamp(.72rem,1.25vw,1.15rem);transition:opacity 200ms}
      .nav-link:hover{opacity:.72}
      .nav-link{position:relative}
      .nav-link::after{content:"";position:absolute;bottom:-4px;left:0;width:0;height:1px;background:linear-gradient(90deg,#7621B0,#B600A8);transition:width .35s ease}
      .nav-link:hover::after{width:100%}
      .pill{display:inline-flex;align-items:center;justify-content:center;border-radius:999px;border:2px solid #D7E2EA;padding:.55rem 1.3rem;color:#D7E2EA;text-decoration:none;font-weight:600;text-transform:uppercase;letter-spacing:.12em;font-size:clamp(.68rem,.95vw,.9rem);background:transparent;transition:background 200ms,transform 200ms;white-space:nowrap}
      .pill:hover{background:rgba(215,226,234,.1);transform:translateY(-1px)}
      .gradient-button{display:inline-flex;align-items:center;justify-content:center;border-radius:999px;border:0;outline:2px solid #fff;outline-offset:-3px;background:linear-gradient(123deg,#18011F 7%,#B600A8 37%,#7621B0 72%,#BE4C00 100%);box-shadow:0 4px 4px rgba(181,1,167,.25),inset 4px 4px 12px #7721B1;color:white;text-decoration:none;font-weight:600;text-transform:uppercase;letter-spacing:.14em;padding:clamp(.72rem,1.2vw,1rem) clamp(1.35rem,3vw,2.5rem);font-size:clamp(.72rem,.95vw,.9rem);white-space:nowrap}
      .hero{min-height:100svh;display:flex;flex-direction:column;position:relative;overflow:hidden;background:#060410}
      .hero-bg-video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0;opacity:.92;filter:saturate(1.18) contrast(1.02) brightness(.98)}
      .hero-video-overlay{position:absolute;inset:0;z-index:1;background:radial-gradient(circle at 50% 30%,rgba(12,12,12,0),rgba(12,12,12,.12) 55%,rgba(12,12,12,.5) 100%),linear-gradient(180deg,rgba(12,12,12,0),rgba(12,12,12,.16) 62%,#0C0C0C 99%);pointer-events:none}
      .section-video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0;opacity:.88;filter:saturate(1.16) contrast(1.03) brightness(.94)}
      .section-video-overlay{position:absolute;inset:0;z-index:1;background:radial-gradient(circle at 50% 28%,rgba(12,12,12,.02),rgba(12,12,12,.18) 55%,rgba(12,12,12,.56) 100%),linear-gradient(180deg,rgba(12,12,12,.08),rgba(12,12,12,.18) 60%,#0C0C0C 100%);pointer-events:none}
      .hero::before{content:"";position:absolute;inset:14% -20% auto -20%;height:42%;background:radial-gradient(circle,#2c1634 0%,rgba(44,22,52,0) 68%);opacity:.28;pointer-events:none;z-index:2}
      .hero-title{font-size:clamp(3.4rem,15vw,13rem);font-weight:900;text-transform:uppercase;line-height:.86;letter-spacing:0;white-space:normal;max-width:100%;overflow-wrap:anywhere}
      .portrait-wrap{position:absolute;left:50%;bottom:0;z-index:9;transform:translateX(-50%);perspective:1200px}
      .portrait-stage{position:relative;display:inline-block;transform-style:preserve-3d}
      .portrait-ring{position:absolute;inset:-22px;border-radius:34px 34px 92px 34px;border:1px dashed rgba(215,226,234,.28);pointer-events:none;z-index:0;transform:translateZ(-30px) rotate(-2deg)}
      .portrait-glow{position:absolute;inset:-18px;border-radius:36px 36px 96px 36px;background:radial-gradient(circle at 50% 25%,rgba(215,226,234,.16),transparent 56%);filter:blur(16px);pointer-events:none;z-index:0}
      .portrait-card{position:relative;width:clamp(190px,25vw,370px);height:clamp(235px,31vw,450px);border-radius:32px 32px 86px 32px;background:#0C0C0C;box-shadow:0 34px 90px rgba(0,0,0,.55),inset 0 0 0 1px rgba(255,255,255,.18),inset 12px 12px 34px rgba(255,255,255,.055),inset -18px -18px 34px rgba(0,0,0,.5);overflow:hidden;z-index:2;transform:rotateX(3deg) rotateY(-7deg) rotateZ(-1deg)}
      .portrait-card::before{content:"";position:absolute;inset:8px;border-radius:24px 24px 76px 24px;border:1px solid rgba(255,255,255,.18);pointer-events:none;z-index:4}
      .portrait-card::after{content:"";position:absolute;inset:0;background:linear-gradient(120deg,rgba(255,255,255,.14),transparent 24%,transparent 72%,rgba(255,255,255,.05));pointer-events:none;z-index:4}
      .portrait-media{width:100%;height:100%;overflow:hidden;background:#111;display:flex;align-items:center;justify-content:center}
      .portrait-media img{width:100%;height:100%;object-fit:cover;object-position:center top;filter:contrast(1.04) brightness(1.02) saturate(1);transform:scale(1.04)}
      .portrait-fade{position:absolute;left:0;right:0;bottom:0;height:32%;background:linear-gradient(transparent,rgba(12,12,12,.82));z-index:5;pointer-events:none}
      .portrait-name{position:absolute;left:1rem;right:1rem;bottom:1rem;z-index:6;color:#D7E2EA}
      .float-badge{position:absolute;z-index:20;background:rgba(12,12,12,.9);border:1px solid rgba(215,226,234,.16);backdrop-filter:blur(12px);border-radius:14px;padding:.5rem .9rem;text-align:center;white-space:nowrap;box-shadow:0 4px 20px rgba(0,0,0,.4);color:#D7E2EA}
      .hero-tag{position:absolute;z-index:3;color:#D7E2EA;border:1px solid rgba(215,226,234,.24);background:rgba(12,12,12,.58);backdrop-filter:blur(10px);border-radius:999px;padding:.35rem .75rem;font-size:clamp(.62rem,.9vw,.78rem);letter-spacing:.08em;text-transform:uppercase;white-space:nowrap}
      .hero-grid-overlay{position:absolute;inset:0;z-index:1;opacity:.018;background-image:linear-gradient(rgba(215,226,234,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(215,226,234,.6) 1px,transparent 1px);background-size:55px 55px;pointer-events:none}
      .hero-video{position:absolute;left:clamp(1rem,5vw,3rem);top:clamp(18rem,48vh,28rem);z-index:4;width:clamp(220px,25vw,360px);border-radius:24px;border:1px solid rgba(215,226,234,.18);background:rgba(17,18,23,.74);box-shadow:0 28px 80px rgba(0,0,0,.38);backdrop-filter:blur(12px);overflow:hidden}
      .hero-video-top{height:34px;background:#1d2029;display:flex;align-items:center;justify-content:space-between;padding:0 13px;color:#D7E2EA;font-size:.68rem;letter-spacing:.1em;text-transform:uppercase}
      .hero-video-screen{position:relative;height:190px;padding:16px;overflow:hidden;background:radial-gradient(circle at 20% 25%,rgba(182,0,168,.3),transparent 32%),linear-gradient(135deg,#0f1018,#1c1424 45%,#101016)}
      .hero-video-scan{position:absolute;inset:-30% 0 auto 0;height:45%;background:linear-gradient(180deg,transparent,rgba(215,226,234,.18),transparent);animation:scanline 4s linear infinite}
      .hero-video-row{height:12px;border-radius:999px;background:rgba(215,226,234,.13);margin-bottom:12px;transform-origin:left;animation:pulsebar 2.8s ease-in-out infinite}
      .hero-video-row:nth-child(2){width:72%;animation-delay:.2s}.hero-video-row:nth-child(3){width:46%;animation-delay:.45s}.hero-video-row:nth-child(4){width:86%;animation-delay:.68s}
      .hero-video-orbit{position:absolute;right:24px;bottom:20px;width:86px;aspect-ratio:1;border-radius:50%;border:1px solid rgba(215,226,234,.25);animation:spin 9s linear infinite}
      .hero-video-orbit::before{content:"";position:absolute;width:14px;aspect-ratio:1;border-radius:50%;background:#BE4C00;left:50%;top:-7px;box-shadow:0 0 22px #BE4C00}
      @keyframes scanline{to{transform:translateY(420%)}}
      @keyframes pulsebar{50%{transform:scaleX(.72);opacity:.65}}
      @keyframes spin{to{transform:rotate(360deg)}}
      .marquee-section{background:#0C0C0C;padding:clamp(6rem,10vw,10rem) 0 2.5rem;overflow:hidden}
      .marquee-stack{display:flex;flex-direction:column;gap:12px}
      .marquee-row{display:flex;gap:12px;will-change:transform}
      .marquee-row img{width:420px;height:270px;border-radius:16px;object-fit:cover;flex-shrink:0;background:#14151c}
      .section{padding:clamp(5rem,8vw,8rem) clamp(1rem,5vw,2.5rem)}
      .section-title{font-size:clamp(3rem,11vw,9.5rem);font-weight:900;text-transform:uppercase;line-height:.95;letter-spacing:0;text-align:center;overflow-wrap:anywhere}
      .about-section{min-height:100svh;display:flex;align-items:center;justify-content:center;position:relative;background:#0C0C0C;padding:clamp(5rem,8vw,8rem) clamp(1rem,5vw,2.5rem);overflow:hidden}
      .about-inner{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;text-align:center;gap:clamp(2.5rem,5vw,4rem);max-width:820px}
      .decor{position:absolute;z-index:1;pointer-events:none;filter:drop-shadow(0 22px 44px rgba(0,0,0,.34))}
      .decor-tl{top:4%;left:clamp(1%,4vw,4%);width:clamp(120px,15vw,210px)}
      .decor-bl{bottom:8%;left:clamp(3%,10vw,10%);width:clamp(100px,13vw,180px)}
      .decor-tr{top:4%;right:clamp(1%,4vw,4%);width:clamp(120px,15vw,210px)}
      .decor-br{bottom:8%;right:clamp(3%,10vw,10%);width:clamp(130px,16vw,220px)}
      .skills-section{background:#0C0C0C;padding:clamp(5rem,8vw,8rem) clamp(1rem,5vw,2.5rem);overflow:hidden;position:relative}
      .section-content{position:relative;z-index:2}
      .skills-shell{max-width:1180px;margin:clamp(2.5rem,5vw,5rem) auto 0;border:1px solid rgba(215,226,234,.16);border-radius:30px;background:radial-gradient(circle at 20% 10%,rgba(182,0,168,.14),transparent 32%),linear-gradient(145deg,rgba(12,12,12,.5),rgba(12,12,12,.32));padding:clamp(1rem,2vw,1.5rem);box-shadow:0 28px 90px rgba(0,0,0,.28);backdrop-filter:blur(8px)}
      .skill-grid{display:grid;grid-template-columns:repeat(8,minmax(0,1fr));gap:clamp(.7rem,1.5vw,1rem)}
      .skill-tile{aspect-ratio:1;border-radius:18px;border:1px solid rgba(215,226,234,.18);background:linear-gradient(145deg,rgba(215,226,234,.08),rgba(182,0,168,.08));display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.55rem;color:#D7E2EA;text-transform:uppercase;font-size:clamp(.58rem,.85vw,.75rem);letter-spacing:.06em;text-align:center;box-shadow:0 20px 55px rgba(0,0,0,.18);will-change:transform;position:relative;overflow:hidden}
      .skill-tile::before{content:"";position:absolute;inset:-40%;background:linear-gradient(115deg,transparent,rgba(215,226,234,.16),transparent);transform:translateX(-70%) rotate(16deg);transition:transform .6s ease}
      .skill-tile:hover::before{transform:translateX(70%) rotate(16deg)}
      .skill-tile img{width:clamp(30px,4vw,48px);height:clamp(30px,4vw,48px);object-fit:contain}
      .skill-fallback{width:clamp(34px,4.4vw,52px);height:clamp(34px,4.4vw,52px);border-radius:15px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#B600A8,#BE4C00);font-weight:900;color:white;font-size:clamp(.8rem,1.4vw,1.15rem)}
      .project-list{max-width:1180px;margin:0 auto}
      .project-sticky-wrap{height:88vh;min-height:680px;perspective:1200px}
      .project-sticky{position:sticky}
      .project-card{border:2px solid #D7E2EA;border-radius:clamp(32px,5vw,60px);background:#0C0C0C;overflow:hidden;display:grid;grid-template-columns:minmax(0,.95fr) minmax(0,1.4fr);height:82vh;min-height:590px;box-shadow:0 28px 80px rgba(0,0,0,.32);transform-origin:top center}
      .project-info{padding:clamp(1.25rem,3vw,2.25rem);display:flex;flex-direction:column;justify-content:space-between;gap:1.5rem;min-width:0}
      .project-preview{min-width:0;background:linear-gradient(135deg,#171923,#252632);padding:clamp(1rem,2vw,1.5rem);display:flex;align-items:center;justify-content:center}
      .preview-window{width:min(100%,760px);border-radius:clamp(28px,4vw,46px);border:1px solid rgba(215,226,234,.18);background:#0C0C0C;overflow:hidden;box-shadow:0 24px 70px rgba(0,0,0,.35)}
      .preview-top{height:38px;background:#1d2029;display:flex;align-items:center;gap:8px;padding:0 14px}
      .preview-dot{width:9px;height:9px;border-radius:50%;background:#BE4C00}.preview-dot:nth-child(2){background:#B600A8}.preview-dot:nth-child(3){background:#BBCCD7}
      .preview-body{min-height:290px;padding:clamp(1rem,2vw,1.5rem);display:grid;gap:1rem}
      .preview-frame{width:100%;height:390px;border:0;background:#fff;display:block}
      .preview-hero{border-radius:16px;padding:clamp(1rem,2.5vw,2rem)}
      .preview-title{color:white;font-size:clamp(1.35rem,3vw,2.8rem);font-weight:900;line-height:1;text-transform:uppercase;overflow-wrap:anywhere}
      .preview-bars{display:grid;grid-template-columns:1fr .7fr;gap:.8rem}
      .preview-panel{min-height:88px;border-radius:14px;background:rgba(215,226,234,.1);border:1px solid rgba(215,226,234,.12)}
      .research-card{border:1px solid rgba(215,226,234,.12);border-radius:24px;padding:clamp(2rem,4vw,3.5rem);position:relative;overflow:hidden;background:linear-gradient(135deg,rgba(118,33,176,.08),transparent 60%)}
      .contact-section{background:#0C0C0C;position:relative;overflow:hidden;min-height:100svh;display:flex;align-items:center;justify-content:center}
      .contact-section .section-content{width:100%}
      .scroll-top{position:fixed;right:clamp(1rem,3vw,1.5rem);bottom:clamp(1rem,3vw,1.5rem);z-index:9998;width:54px;height:54px;border-radius:50%;border:1px solid rgba(215,226,234,.22);background:rgba(12,12,12,.58);backdrop-filter:blur(12px);color:#D7E2EA;display:flex;align-items:center;justify-content:center}
      @media (max-width:760px){
        .hero{min-height:780px}
        nav{gap:.65rem;flex-wrap:wrap}
        .hero-title{font-size:clamp(3rem,18vw,5.6rem);line-height:.92}
        .portrait-wrap{bottom:10.5rem}
        .portrait-card{width:min(58vw,245px);height:min(72vw,300px);border-radius:26px 26px 62px 26px}
        .float-badge{display:none}
        .hero-tag{display:none}
        .hero-video{display:none}
        .marquee-row img{width:300px;height:195px}
        .decor{opacity:.4}
        .skill-grid{grid-template-columns:repeat(3,minmax(0,1fr))}
        .project-sticky-wrap{height:auto;min-height:0;margin-bottom:1.25rem}
        .project-sticky{position:relative!important;top:auto!important}
        .project-card{grid-template-columns:1fr;height:auto;min-height:auto;border-radius:28px}
        .preview-frame{height:290px}
        .preview-body{min-height:220px}
        .preview-bars{grid-template-columns:1fr}
      }
      @media (pointer:coarse){.cursor-ring,.cursor-dot{display:none}}
    `;
    document.head.appendChild(style);

    return () => {
      if (document.head.contains(font)) document.head.removeChild(font);
    };
  }, []);
}

function FadeIn({ children, delay = 0, y = 28, x = 0, className = "", style = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function CustomCursor() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const onMove = (event) => {
      setPos({ x: event.clientX, y: event.clientY });
      setHovered(Boolean(event.target.closest("a,button,[data-cursor]")));
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <motion.div
        className="cursor-ring"
        animate={{ x: pos.x - 20, y: pos.y - 20, scale: hovered ? 1.6 : 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 22, mass: 0.4 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "1.5px solid rgba(215,226,234,.5)",
          pointerEvents: "none",
          zIndex: 99999,
          mixBlendMode: "difference",
        }}
      />
      <motion.div
        className="cursor-dot"
        animate={{ x: pos.x - 3, y: pos.y - 3 }}
        transition={{ type: "spring", stiffness: 600, damping: 30 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#D7E2EA",
          pointerEvents: "none",
          zIndex: 99999,
        }}
      />
    </>
  );
}

function ScrollBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        zIndex: 9999,
        background: "linear-gradient(90deg,#7621B0,#B600A8,#BBCCD7)",
        scaleX,
        transformOrigin: "0%",
      }}
    />
  );
}

function ScrollTopButton() {
  const { scrollYProgress } = useScroll();
  const pathLength = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });

  return (
    <motion.button
      className="scroll-top"
      type="button"
      aria-label="Scroll to top"
      data-cursor
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <svg width="54" height="54" viewBox="0 0 54 54" style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}>
        <circle cx="27" cy="27" r="23" fill="none" stroke="rgba(215,226,234,.12)" strokeWidth="2" />
        <motion.circle
          cx="27"
          cy="27"
          r="23"
          fill="none"
          stroke="url(#scrollGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          style={{ pathLength }}
        />
        <defs>
          <linearGradient id="scrollGradient" x1="0" y1="0" x2="54" y2="54">
            <stop stopColor="#7621B0" />
            <stop offset="0.55" stopColor="#B600A8" />
            <stop offset="1" stopColor="#BBCCD7" />
          </linearGradient>
        </defs>
      </svg>
      <ArrowUp size={20} strokeWidth={2} style={{ position: "relative", zIndex: 1 }} />
    </motion.button>
  );
}

function AmbientGlow() {
  const [pos, setPos] = useState({ x: -500, y: -500 });

  useEffect(() => {
    const onMove = (event) => setPos({ x: event.clientX, y: event.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <motion.div
      animate={{ x: pos.x - 250, y: pos.y - 250 }}
      transition={{ type: "spring", stiffness: 60, damping: 30, mass: 1 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 500,
        height: 500,
        borderRadius: "50%",
        background: "radial-gradient(circle,rgba(118,33,176,.07) 0%,transparent 70%)",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

function VideoBackground({ src, className = "section-video" }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    if (src.endsWith(".m3u8") && Hls.isSupported()) {
      const hls = new Hls({ enableWorker: true });
      hls.loadSource(src);
      hls.attachMedia(video);
      return () => hls.destroy();
    }

    video.src = src;
    return undefined;
  }, [src]);

  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      src={!src.endsWith(".m3u8") ? src : undefined}
    />
  );
}

function NeuralCanvas() {
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const colors = ["rgba(118,33,176,", "rgba(182,0,168,", "rgba(187,204,215,", "rgba(100,105,115,"];
    let width = 0;
    let height = 0;
    let nodes = [];
    let orbs = [];

    const resize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      nodes = Array.from({ length: width < 760 ? 46 : 88 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.42,
        vy: (Math.random() - 0.5) * 0.42,
        r: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI * 2,
      }));
      orbs = Array.from({ length: 5 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 70 + Math.random() * 110,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI * 2,
      }));
    };

    const onMouse = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const bg = ctx.createLinearGradient(0, 0, width * 0.6, height);
      bg.addColorStop(0, "#060410");
      bg.addColorStop(0.45, "#0C0C0C");
      bg.addColorStop(1, "#080510");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      for (const orb of orbs) {
        orb.pulse += 0.008;
        orb.x += orb.vx;
        orb.y += orb.vy;
        if (orb.x < -orb.r) orb.x = width + orb.r;
        if (orb.x > width + orb.r) orb.x = -orb.r;
        if (orb.y < -orb.r) orb.y = height + orb.r;
        if (orb.y > height + orb.r) orb.y = -orb.r;
        const glow = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
        glow.addColorStop(0, `${orb.color}${0.1 + Math.sin(orb.pulse) * 0.02})`);
        glow.addColorStop(1, `${orb.color}0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx.fill();
      }

      const { x: mx, y: my } = mouseRef.current;
      for (const node of nodes) {
        node.pulse += 0.018;
        const dx = node.x - mx;
        const dy = node.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        if (dist < 140) {
          const force = ((140 - dist) / 140) * 0.6;
          node.vx += (dx / dist) * force;
          node.vy += (dy / dist) * force;
        }
        node.vx *= 0.97;
        node.vy *= 0.97;
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
        node.x = Math.max(0, Math.min(width, node.x));
        node.y = Math.max(0, Math.min(height, node.y));
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const alpha = (1 - dist / 140) ** 2 * 0.35;
            const line = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            line.addColorStop(0, `${a.color}${alpha})`);
            line.addColorStop(1, `${b.color}${alpha})`);
            ctx.strokeStyle = line;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const node of nodes) {
        const radius = node.r + Math.sin(node.pulse) * 0.5;
        ctx.fillStyle = `${node.color}${0.45 + Math.sin(node.pulse) * 0.12})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      const scanY = (Date.now() * 0.03) % height;
      const scan = ctx.createLinearGradient(0, scanY - 60, 0, scanY + 60);
      scan.addColorStop(0, "rgba(118,33,176,0)");
      scan.addColorStop(0.5, "rgba(118,33,176,0.025)");
      scan.addColorStop(1, "rgba(118,33,176,0)");
      ctx.fillStyle = scan;
      ctx.fillRect(0, scanY - 60, width, 120);

      frameRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse);
    draw();
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0, display: "block" }} />;
}

function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out",
}) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const onMove = (event) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = event.clientX - centerX;
      const dy = event.clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = Math.max(rect.width, rect.height) / 2 + padding;

      if (distance < maxDistance) {
        setActive(true);
        setPosition({ x: dx / strength, y: dy / strength });
      } else {
        setActive(false);
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [padding, strength]);

  return (
    <div
      ref={ref}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: active ? activeTransition : inactiveTransition,
        willChange: "transform",
        display: "inline-block",
      }}
    >
      {children}
    </div>
  );
}

function AnimatedChar({ char, start, end, progress }) {
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  return <motion.span style={{ opacity }}>{char === " " ? "\u00A0" : char}</motion.span>;
}

function AnimatedText({ text, style = {} }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  return (
    <p ref={ref} style={style}>
      {text.split("").map((char, index) => {
        const start = index / text.length;
        const end = (index + 1) / text.length;
        return (
          <AnimatedChar key={`${char}-${index}`} char={char} start={start} end={end} progress={scrollYProgress} />
        );
      })}
    </p>
  );
}

function ContactButton({ href = `mailto:${PROFILE.email}` }) {
  return (
    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} data-cursor>
      <a className="gradient-button" href={href}>
        Contact Me
      </a>
    </motion.div>
  );
}

function HeroVideoAnimation() {
  return (
    <FadeIn delay={0.5} x={-24} y={0} className="hero-video">
      <div className="hero-video-top">
        <span>Live Build</span>
        <span>00:24</span>
      </div>
      <div className="hero-video-screen" aria-label="Animated web development preview">
        <div className="hero-video-scan" />
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 4.5, ease: "easeInOut", repeat: Infinity }}
        >
          <div className="hero-video-row" style={{ width: "92%" }} />
          <div className="hero-video-row" />
          <div className="hero-video-row" />
          <div className="hero-video-row" />
        </motion.div>
        <motion.div
          style={{
            position: "absolute",
            left: 18,
            bottom: 20,
            display: "grid",
            gridTemplateColumns: "repeat(3, 34px)",
            gap: 8,
          }}
          animate={{ opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 2.6, repeat: Infinity }}
        >
          {[0, 1, 2, 3, 4, 5].map((item) => (
            <span
              key={item}
              style={{
                height: 28,
                borderRadius: 8,
                border: "1px solid rgba(215,226,234,.14)",
                background: item % 2 ? "rgba(190,76,0,.25)" : "rgba(182,0,168,.24)",
              }}
            />
          ))}
        </motion.div>
        <div className="hero-video-orbit" />
      </div>
    </FadeIn>
  );
}

function HeroSection() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const headingY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section ref={heroRef} id="home" className="hero">
      <video className="hero-bg-video" src={HERO_VIDEO} autoPlay muted loop playsInline preload="metadata" />
      <div className="hero-video-overlay" />
      <div className="hero-grid-overlay" />
      <FadeIn y={-20}>
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "clamp(1.25rem,3vw,2rem) clamp(1rem,5vw,2.5rem)",
            position: "relative",
            zIndex: 10,
          }}
        >
          {["About", "Skills", "Projects", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">
              {item}
            </a>
          ))}
        </nav>
      </FadeIn>

      <div style={{ padding: "clamp(1rem,4vw,2rem) clamp(1rem,5vw,2.5rem) 0", position: "relative", zIndex: 4 }}>
        <motion.div style={{ y: headingY }}>
          <FadeIn delay={0.12}>
            <h1 className="hg hero-title">Hi, I&apos;m Sayeb</h1>
          </FadeIn>
        </motion.div>
      </div>

      <FadeIn delay={0.35} className="portrait-wrap">
        <motion.div style={{ y: portraitY }}>
          <Magnet padding={120} strength={4}>
            <div className="portrait-stage">
              <motion.div className="portrait-ring" animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }} />
              <div className="portrait-glow" />
              <div className="portrait-card">
                <div className="portrait-media">
                  <img
                    src="https://github.com/sayeb12.png"
                    alt="Sayeb"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.parentElement.innerHTML =
                        `<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:clamp(5rem,13vw,9rem);font-weight:900;color:#BBCCD7;opacity:.45;font-family:'Kanit',sans-serif">S</div>`;
                    }}
                  />
                </div>
                <div className="portrait-fade" />
                <div className="portrait-name">
                  <div style={{ fontSize: "clamp(.55rem,.8vw,.7rem)", opacity: 0.5, textTransform: "uppercase", letterSpacing: ".15em" }}>
                    Full Stack Developer
                  </div>
                  <div style={{ fontSize: "clamp(.8rem,1.3vw,1.05rem)", fontWeight: 600, letterSpacing: ".04em" }}>
                    Sayeb / Dhaka, BD
                  </div>
                </div>
              </div>

              <motion.div
                className="float-badge"
                initial={{ opacity: 0, x: 30, scale: 0.85 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: 1.1, duration: 0.7 }}
                style={{ top: "10%", right: "-96px", borderColor: "rgba(34,197,94,.3)", borderRadius: "999px", display: "flex", alignItems: "center", gap: ".5rem" }}
              >
                <motion.span animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 1.8 }} style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e" }} />
                <span style={{ fontSize: ".7rem", fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase" }}>Available</span>
              </motion.div>

              <motion.div
                className="float-badge"
                initial={{ opacity: 0, x: -30, scale: 0.85 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: 1.25, duration: 0.7 }}
                style={{ top: "35%", left: "-94px" }}
              >
                <div style={{ fontSize: "1.25rem", fontWeight: 900, color: "#BBCCD7", lineHeight: 1 }}>3.69</div>
                <div style={{ fontSize: ".58rem", opacity: 0.5, textTransform: "uppercase", letterSpacing: ".1em", marginTop: 2 }}>CGPA / 4.00</div>
              </motion.div>
            </div>
          </Magnet>
        </motion.div>
      </FadeIn>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: "1.25rem",
          padding: "0 clamp(1rem,5vw,2.5rem) clamp(1.5rem,3vw,2.5rem)",
          position: "relative",
          zIndex: 8,
          marginTop: "auto",
          flexWrap: "wrap",
        }}
      >
        <FadeIn delay={0.3}>
          <p
            style={{
              color: "#D7E2EA",
              fontWeight: 300,
              textTransform: "uppercase",
              letterSpacing: ".06em",
              lineHeight: 1.35,
              fontSize: "clamp(.78rem,1.3vw,1.25rem)",
              maxWidth: "360px",
            }}
          >
            Full stack developer crafting VoIP platforms, web products, and computer vision systems.
          </p>
        </FadeIn>
        <FadeIn delay={0.42}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}

function MarqueeRow({ images, direction, offset }) {
  const tiles = [...images, ...images, ...images];
  const translate = direction === "right" ? offset - 200 : -(offset - 200);
  return (
    <div className="marquee-row" style={{ transform: `translateX(${translate}px)` }}>
      {tiles.map((src, index) => (
        <img key={`${src}-${index}`} src={src} alt="" loading="lazy" />
      ))}
    </div>
  );
}

function MarqueeSection() {
  const ref = useRef(null);
  const [offset, setOffset] = useState(200);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const top = ref.current.getBoundingClientRect().top + window.scrollY;
      setOffset((window.scrollY - top + window.innerHeight) * 0.3);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={ref} className="marquee-section">
      <div className="marquee-stack">
        <MarqueeRow images={GIFS.slice(0, 11)} direction="right" offset={offset} />
        <MarqueeRow images={GIFS.slice(11)} direction="left" offset={offset} />
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="about-section">
      {DECOR.map((item) => (
        <FadeIn key={item.src} delay={item.delay} x={item.x} y={0} className={item.className}>
          <img src={item.src} alt="" loading="lazy" />
        </FadeIn>
      ))}
      <div className="about-inner">
        <FadeIn>
          <h2 className="hg section-title">About Me</h2>
        </FadeIn>
        <FadeIn delay={0.12}>
          <AnimatedText
            text="I am a CSE graduate and full stack developer focused on scalable web platforms, VoIP systems, REST APIs, and computer vision research. I enjoy building real products with clean interfaces, strong backend logic, and practical engineering that helps people work better."
            style={{
              color: "#D7E2EA",
              fontWeight: 500,
              lineHeight: 1.75,
              maxWidth: "640px",
              textAlign: "center",
              fontSize: "clamp(1rem,2vw,1.35rem)",
            }}
          />
        </FadeIn>
        <FadeIn delay={0.25}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="skills-section">
      <VideoBackground src={SKILLS_VIDEO} />
      <div className="section-video-overlay" />
      <div className="section-content">
        <FadeIn>
          <h2 className="hg section-title">Skills</h2>
        </FadeIn>
        <FadeIn delay={0.12}>
          <p
            style={{
              color: "#D7E2EA",
              opacity: 0.82,
              textAlign: "center",
              maxWidth: "620px",
              margin: "1rem auto 0",
              lineHeight: 1.65,
              fontSize: "clamp(.92rem,1.35vw,1.08rem)",
            }}
          >
            Tools and technologies I use across web platforms, telecom systems, APIs, and computer vision projects.
          </p>
        </FadeIn>
        <div className="skills-shell">
          <div className="skill-grid">
            {SKILL_ICONS.map(([name, icon], index) => {
              const Icon = FALLBACK_ICONS[name];
              return (
                <motion.div
                  key={name}
                  className="skill-tile"
                  initial={{ opacity: 0, y: 34, rotateX: 18, scale: 0.92 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{
                    y: -12,
                    scale: 1.05,
                    rotateX: 6,
                    rotateY: index % 2 ? -7 : 7,
                    borderColor: "rgba(215,226,234,.45)",
                  }}
                  transition={{ duration: 0.58, delay: index * 0.035, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <motion.div
                    animate={{ y: [0, index % 2 ? 5 : -5, 0], rotate: [0, index % 2 ? 2 : -2, 0] }}
                    transition={{ duration: 3.8 + (index % 5) * 0.35, repeat: Infinity, ease: "easeInOut" }}
                    style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: ".55rem" }}
                  >
                    {icon ? (
                      <img src={icon} alt="" loading="lazy" />
                    ) : Icon ? (
                      <span className="skill-fallback">
                        <Icon size={26} strokeWidth={1.8} />
                      </span>
                    ) : (
                      <span className="skill-fallback">{name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</span>
                    )}
                    <span>{name}</span>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const [hovered, setHovered] = useState(null);
  return (
    <section
      id="services"
      className="section"
      style={{
        background: "#FFFFFF",
        borderRadius: "clamp(34px,5vw,60px) clamp(34px,5vw,60px) 0 0",
      }}
    >
      <FadeIn>
        <h2 className="section-title" style={{ color: "#0C0C0C" }}>
          Services
        </h2>
      </FadeIn>
      <div style={{ maxWidth: "980px", margin: "clamp(2.5rem,5vw,5rem) auto 0" }}>
        {SERVICES.map((service, index) => (
          <FadeIn key={service.num} delay={index * 0.06}>
            <motion.div
              onHoverStart={() => setHovered(index)}
              onHoverEnd={() => setHovered(null)}
              animate={{ x: hovered === index ? 10 : 0, background: hovered === index ? "rgba(0,0,0,.025)" : "transparent" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{
                display: "grid",
                gridTemplateColumns: "auto minmax(0,1fr)",
                gap: "clamp(1rem,3vw,2.5rem)",
                padding: "clamp(1.7rem,3vw,2.6rem) clamp(.5rem,1vw,1rem)",
                borderTop: index === 0 ? "1px solid rgba(12,12,12,.15)" : "none",
                borderBottom: "1px solid rgba(12,12,12,.15)",
                borderRadius: 8,
              }}
            >
              <motion.span
                animate={{ opacity: hovered === index ? 0.28 : 0.16, scale: hovered === index ? 1.05 : 1 }}
                transition={{ duration: 0.3 }}
                style={{ fontWeight: 900, fontSize: "clamp(2.6rem,8vw,6rem)", color: "#0C0C0C", lineHeight: 1 }}
              >
                {service.num}
              </motion.span>
              <div style={{ minWidth: 0 }}>
                <h3 style={{ color: "#0C0C0C", textTransform: "uppercase", fontSize: "clamp(1.1rem,2.2vw,2rem)", lineHeight: 1.1, marginBottom: ".65rem" }}>
                  {service.name}
                </h3>
                <motion.p
                  animate={{ opacity: hovered === index ? 0.74 : 0.6 }}
                  style={{ color: "#0C0C0C", lineHeight: 1.7, fontWeight: 300, fontSize: "clamp(.9rem,1.35vw,1.1rem)" }}
                >
                  {service.desc}
                </motion.p>
              </div>
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function ProjectPreview({ project }) {
  if (project.preview === "live") {
    return (
      <div className="preview-window">
        <div className="preview-top">
          <span className="preview-dot" />
          <span className="preview-dot" />
          <span className="preview-dot" />
          <span style={{ marginLeft: "auto", color: "#D7E2EA", opacity: 0.52, fontSize: ".68rem", letterSpacing: ".08em", textTransform: "uppercase" }}>
            Live Preview
          </span>
        </div>
        <iframe
          className="preview-frame"
          src={project.link}
          title={`${project.name} live preview`}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
        />
      </div>
    );
  }

  return (
    <div className="preview-window">
      <div className="preview-top">
        <span className="preview-dot" />
        <span className="preview-dot" />
        <span className="preview-dot" />
      </div>
      <div className="preview-body">
        <div className="preview-hero" style={{ background: `linear-gradient(135deg, ${project.accent}, #18011F)` }}>
          <div style={{ color: "rgba(255,255,255,.7)", fontSize: ".72rem", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: ".75rem" }}>
            {project.type}
          </div>
          <div className="preview-title">{project.name}</div>
        </div>
        <div className="preview-bars">
          <div className="preview-panel" />
          <div className="preview-panel" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: ".65rem" }}>
          {[0, 1, 2].map((item) => (
            <div key={item} style={{ height: "clamp(42px,6vw,66px)", borderRadius: "12px", background: "rgba(215,226,234,.08)", border: "1px solid rgba(215,226,234,.1)" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index, progress }) {
  const total = PROJECTS.length;
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);
  return (
    <div className="project-sticky-wrap">
      <div className="project-sticky" style={{ top: `${96 + index * 16}px` }}>
        <motion.article
          className="project-card"
          style={{ scale }}
          initial={{ opacity: 0, y: 70, rotateX: 7 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "50px", amount: 0.12 }}
          whileHover={{ y: -8, rotateX: 1.5, rotateY: index % 2 ? -1.5 : 1.5 }}
          transition={{ duration: 0.75, delay: index * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="project-info">
            <div style={{ minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                <span style={{ fontWeight: 900, fontSize: "clamp(2rem,5vw,4.5rem)", color: "#D7E2EA", lineHeight: 1, opacity: 0.3, flexShrink: 0 }}>
                  {project.num}
                </span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ color: "#D7E2EA", opacity: 0.58, fontSize: "clamp(.7rem,1.1vw,.9rem)", textTransform: "uppercase", letterSpacing: ".1em" }}>
                    {project.type}
                  </div>
                  <h3 style={{ color: "#D7E2EA", fontWeight: 800, fontSize: "clamp(1.35rem,3.8vw,3.4rem)", lineHeight: 1.02, textTransform: "uppercase", overflowWrap: "anywhere" }}>
                    {project.name}
                  </h3>
                </div>
              </div>
              <p style={{ color: "#D7E2EA", opacity: 0.72, fontWeight: 300, lineHeight: 1.7, fontSize: "clamp(.92rem,1.35vw,1.08rem)", maxWidth: "38rem" }}>
                {project.desc}
              </p>
              <div style={{ display: "flex", gap: ".45rem", flexWrap: "wrap", marginTop: "1.25rem" }}>
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      border: "1px solid rgba(215,226,234,.2)",
                      borderRadius: "999px",
                      padding: ".25rem .65rem",
                      color: "#D7E2EA",
                      opacity: 0.68,
                      fontSize: "clamp(.64rem,.85vw,.78rem)",
                      textTransform: "uppercase",
                      letterSpacing: ".06em",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="pill">
              {project.cta}
            </a>
          </div>
          <div className="project-preview">
            <ProjectPreview project={project} />
          </div>
        </motion.article>
      </div>
    </div>
  );
}

function ProjectsSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  return (
    <section
      id="projects"
      className="section"
      style={{
        background: "#0C0C0C",
        borderRadius: "clamp(34px,5vw,60px) clamp(34px,5vw,60px) 0 0",
        marginTop: "clamp(-3rem,-3vw,-2rem)",
        position: "relative",
        zIndex: 2,
        overflow: "hidden",
      }}
    >
      <VideoBackground src={PROJECTS_VIDEO} />
      <div className="section-video-overlay" />
      <div className="section-content">
        <FadeIn>
          <h2 className="hg section-title" style={{ marginBottom: "clamp(2.5rem,5vw,5rem)" }}>
            Projects
          </h2>
        </FadeIn>
        <div ref={ref} className="project-list">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.num} project={project} index={index} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ResearchSection() {
  return (
    <section style={{ background: "#0C0C0C", padding: "clamp(5rem,8vw,8rem) clamp(1.25rem,5vw,2.5rem)", position: "relative", overflow: "hidden" }}>
      <VideoBackground src={RESEARCH_VIDEO} />
      <div className="section-video-overlay" />
      <div className="section-content">
        <FadeIn y={30}>
          <motion.div className="research-card" whileHover={{ scale: 1.01 }} data-cursor>
            <div
              style={{
                position: "absolute",
                right: "2rem",
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: "clamp(6rem,15vw,14rem)",
                fontWeight: 900,
                color: "rgba(215,226,234,.035)",
                lineHeight: 1,
                userSelect: "none",
              }}
            >
              R
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1.5rem", position: "relative", zIndex: 1 }}>
              <div style={{ flex: "1 1 400px" }}>
                <div
                  style={{
                    display: "inline-block",
                    background: "rgba(118,33,176,.2)",
                    border: "1px solid rgba(182,0,168,.3)",
                    borderRadius: "999px",
                    padding: ".25rem .9rem",
                    marginBottom: "1rem",
                  }}
                >
                  <span style={{ color: "#D7E2EA", fontSize: ".65rem", textTransform: "uppercase", letterSpacing: ".15em", opacity: 0.8 }}>
                    Research Highlight
                  </span>
                </div>
                <h3 style={{ color: "#D7E2EA", fontWeight: 700, fontSize: "clamp(1.1rem,2.5vw,1.8rem)", lineHeight: 1.2, marginBottom: ".75rem", maxWidth: "560px" }}>
                  Computer Vision-Based Human Activity Recognition for Elderly Care Monitoring
                </h3>
                <p style={{ color: "#D7E2EA", opacity: 0.65, fontSize: "clamp(.8rem,1.4vw,1rem)", lineHeight: 1.7, maxWidth: "520px", fontWeight: 300 }}>
                  Thesis work comparing CNN and LSTM architectures for real-time activity recognition, optimized toward practical elderly care monitoring and edge-focused inference.
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: ".75rem", alignItems: "flex-end", flexShrink: 0 }}>
                {[
                  ["CNN + LSTM", "Architecture"],
                  ["Real-Time", "Inference"],
                ].map(([value, label]) => (
                  <div key={label} style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "clamp(1.5rem,3vw,2.5rem)", fontWeight: 900, color: "#BBCCD7", lineHeight: 1 }}>{value}</div>
                    <div style={{ fontSize: ".6rem", color: "#D7E2EA", opacity: 0.42, textTransform: "uppercase", letterSpacing: ".12em" }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="section contact-section" style={{ borderTop: "1px solid rgba(215,226,234,.08)", textAlign: "center" }}>
      <VideoBackground src={CONTACT_VIDEO} />
      <div className="section-video-overlay" />
      <div className="section-content">
        <FadeIn>
          <h2 className="hg section-title">Let&apos;s Talk</h2>
        </FadeIn>
        <FadeIn delay={0.12}>
          <p style={{ color: "#D7E2EA", opacity: 0.86, lineHeight: 1.7, maxWidth: "560px", margin: "1.5rem auto 2.5rem", fontWeight: 300, fontSize: "clamp(.95rem,1.55vw,1.18rem)" }}>
            Open to freelance projects, full-time opportunities, research collaboration, and full stack product work.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div style={{ display: "flex", justifyContent: "center", gap: "clamp(.8rem,2vw,1.5rem)", flexWrap: "wrap", marginBottom: "2.5rem" }}>
            {[
              [PROFILE.email, `mailto:${PROFILE.email}`],
              ["github.com/sayeb12", PROFILE.github],
              ["Portfolio", PROFILE.portfolio],
              [PROFILE.phone, `tel:${PROFILE.phone}`],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                style={{ color: "#D7E2EA", textDecoration: "none", opacity: 0.76, borderBottom: "1px solid rgba(215,226,234,.22)", paddingBottom: ".1rem", fontSize: "clamp(.78rem,1.2vw,1rem)" }}
              >
                {label}
              </a>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={0.28}>
          <ContactButton />
        </FadeIn>
        <p style={{ color: "#D7E2EA", opacity: 0.3, marginTop: "4rem", fontSize: ".78rem", letterSpacing: ".06em" }}>
          Designed and built with care / {PROFILE.name} / Dhaka, Bangladesh
        </p>
      </div>
    </section>
  );
}

export default function SayebPortfolio() {
  useGlobalStyles();
  return (
    <main style={{ background: "#0C0C0C", overflowX: "hidden", fontFamily: "'Kanit', sans-serif" }}>
      <CustomCursor />
      <ScrollBar />
      <ScrollTopButton />
      <AmbientGlow />
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <SkillsSection />
      <ServicesSection />
      <ProjectsSection />
      <ResearchSection />
      <ContactSection />
    </main>
  );
}
