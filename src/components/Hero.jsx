import React, { useEffect, useRef, useState } from "react";
import { FaDownload, FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import "./RobotHero.css";

const Hero = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const textRef = useRef(null);
  const profileImageRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const cursorRef = useRef(null);
  const cursorRingRef = useRef(null);
  const particlesRef = useRef(null);
  const headGroupRef = useRef(null);
  const robotSvgRef = useRef(null);
  const pupilLeftRef = useRef(null);
  const shineLeft1Ref = useRef(null);
  const shineLeft2Ref = useRef(null);
  const pupilRightRef = useRef(null);
  const shineRight1Ref = useRef(null);
  const shineRight2Ref = useRef(null);
  const browLeftRef = useRef(null);
  const browRightRef = useRef(null);

  const scrollTarget = useRef(0);
  const scrollCurrent = useRef(0);

  useEffect(() => {
    // --- PARTICLES ---
    const pc = particlesRef.current;
    if (pc && pc.innerHTML === "") {
      for (let i = 0; i < 36; i++) {
        const p = document.createElement("div");
        p.className = "p";
        const s = Math.random() * 3 + 0.8;
        const c = Math.random() < 0.5 ? "201,169,97" : Math.random() < 0.5 ? "232,232,232" : "155,139,126";
        p.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;width:${s}px;height:${s}px;background:rgba(${c},.6);--d:${6+Math.random()*10}s;--dl:${Math.random()*6}s;--dy:${-18-Math.random()*36}px;--op:${0.15+Math.random()*0.42};box-shadow:0 0 ${s*3}px rgba(${c},.6)`;
        pc.appendChild(p);
      }
    }

    // --- CURSOR ---
    const cur = cursorRef.current;
    const ring = cursorRingRef.current;
    let mx = window.innerWidth / 2, my = window.innerHeight / 2, rx = mx, ry = my;

    const handleMouseMove = (e) => {
      mx = e.clientX; my = e.clientY;
      if (cur) { cur.style.left = mx + "px"; cur.style.top = my + "px"; }
    };
    const handleTouchMove = (e) => {
      if (e.touches.length > 0) { mx = e.touches[0].clientX; my = e.touches[0].clientY; }
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchmove", handleTouchMove, { passive: true });

    // --- RAF LOOP ---
    let rafId;
    let currentHx = 0, currentHy = 0, currentBx = 0, currentBy = 0;
    const lerp = (a, b, t) => a + (b - a) * t;

    const loop = () => {
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      if (ring) { ring.style.left = rx + "px"; ring.style.top = ry + "px"; }

      // Desktop scroll lerp
      if (window.innerWidth > 768) {
        scrollCurrent.current = lerp(scrollCurrent.current, scrollTarget.current, 0.1);
        const progress = scrollCurrent.current;
        if (sceneRef.current) {
          const curLeft  = 50 + (25 - 50) * progress;
          const curTop   = 60 + (50 - 60) * progress;
          const curScale = 1.15 + (0.8 - 1.15) * progress;
          sceneRef.current.style.left      = `${curLeft}%`;
          sceneRef.current.style.top       = `${curTop}%`;
          sceneRef.current.style.transform = `translate(-50%, -50%) scale(${curScale})`;
        }
        if (textRef.current) {
          const tp = Math.max(0, Math.min((progress - 0.1) / 0.6, 1));
          textRef.current.style.opacity   = tp;
          textRef.current.style.transform = `translate(${50 - 50 * tp}px, -50%)`;
        }
      }

      // Robot head tracking
      if (headGroupRef.current && robotSvgRef.current) {
        const EL = { x: 129, y: 139 }, ER = { x: 191, y: 139 };
        const nx = (mx / window.innerWidth - 0.5) * 2;
        const ny = (my / window.innerHeight - 0.5) * 2;
        currentHx = lerp(currentHx, nx * 30, 0.12);
        currentHy = lerp(currentHy, ny * 22, 0.12);
        currentBx = lerp(currentBx, nx * 8,  0.07);
        currentBy = lerp(currentBy, ny * 8,  0.07);
        headGroupRef.current.style.transform =
          `rotateY(${currentHx}deg) rotateX(${-currentHy}deg) translateX(${currentHx*0.6}px) translateY(${currentHy*0.38}px)`;
        robotSvgRef.current.style.transform =
          `rotateY(${currentBx*0.35}deg) rotateX(${-currentBy*0.28}deg)`;
        const px = nx * 8, py = ny * 8;
        pupilLeftRef.current?.setAttribute("cx", EL.x + px);
        pupilLeftRef.current?.setAttribute("cy", EL.y + py);
        shineLeft1Ref.current?.setAttribute("cx", EL.x + px - 5);
        shineLeft1Ref.current?.setAttribute("cy", EL.y + py - 5);
        shineLeft2Ref.current?.setAttribute("cx", EL.x + px + 4);
        shineLeft2Ref.current?.setAttribute("cy", EL.y + py + 4);
        pupilRightRef.current?.setAttribute("cx", ER.x + px);
        pupilRightRef.current?.setAttribute("cy", ER.y + py);
        shineRight1Ref.current?.setAttribute("cx", ER.x + px - 5);
        shineRight1Ref.current?.setAttribute("cy", ER.y + py - 5);
        shineRight2Ref.current?.setAttribute("cx", ER.x + px + 4);
        shineRight2Ref.current?.setAttribute("cy", ER.y + py + 4);
        const bl = ny * -8;
        browLeftRef.current?.setAttribute("d",  `M106 ${108+bl} Q127 ${101+bl} 142 ${108+bl}`);
        browRightRef.current?.setAttribute("d", `M178 ${108+bl} Q193 ${101+bl} 214 ${108+bl}`);
      }

      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    // --- SCROLL HANDLER ---
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sh = document.getElementById("sh");
      if (sh) sh.style.opacity = scrollY > 50 ? "0" : "0.7";

      // ══ MOBILE ══
      if (window.innerWidth <= 768) {
        const vh = window.innerHeight;

        // Phase 1: robot fades out, photo fades in (0 → 35vh scroll)
        const p1 = Math.min(1, scrollY / (vh * 0.35));
        if (sceneRef.current)        sceneRef.current.style.opacity        = String(1 - p1);
        if (profileImageRef.current) profileImageRef.current.style.opacity  = String(p1);

        // Phase 2: text slides up (30vh → 75vh scroll)
        const p2 = Math.max(0, Math.min(1, (scrollY - vh * 0.3) / (vh * 0.45)));
        if (textRef.current) {
          textRef.current.style.opacity   = String(p2);
          textRef.current.style.transform = `translateX(-50%) translateY(${30 - 30 * p2}px)`;
        }
        return;
      }

      // ══ DESKTOP ══
      if (cur)  cur.style.opacity  = scrollY > window.innerHeight * 1.5 ? "0" : "1";
      if (ring) ring.style.opacity = scrollY > window.innerHeight * 1.5 ? "0" : "0.5";

      if (containerRef.current) {
        const rect     = containerRef.current.getBoundingClientRect();
        const maxScroll = rect.height - window.innerHeight;
        const progress  = Math.max(0, Math.min(-rect.top / maxScroll, 1));
        scrollTarget.current = progress;
        if (sceneRef.current)        sceneRef.current.style.opacity        = Math.max(0, 1 - progress * 2);
        if (profileImageRef.current) profileImageRef.current.style.opacity  = Math.min(1, progress * 2);
        if (textRef.current) {
          textRef.current.style.opacity   = Math.min(1, progress * 1.5);
          textRef.current.style.transform = `translate(${Math.max(0,(1-progress)*50)}px, -50%)`;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    handleScroll();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div id="cur" ref={cursorRef}></div>
      <div id="cur-ring" ref={cursorRingRef}></div>
      <div className="scan"></div>

      <section className="robot-hero-container" id="hero" ref={containerRef}>
        <div className="hero-sticky">
          <div className="blob b1"></div>
          <div className="blob b2"></div>
          <div className="blob b3"></div>
          <div id="pts" ref={particlesRef}></div>

          {/* ROBOT */}
          <div id="scene" ref={sceneRef}>
            <div id="robot-wrap">
              <div id="shadow"></div>
              <svg id="robot-svg" ref={robotSvgRef} viewBox="0 0 320 460" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="hg" cx="42%" cy="32%" r="62%"><stop offset="0%" stopColor="#242424"/><stop offset="100%" stopColor="#111111"/></radialGradient>
                  <radialGradient id="tg" cx="42%" cy="28%" r="58%"><stop offset="0%" stopColor="#2a2a2a"/><stop offset="100%" stopColor="#151515"/></radialGradient>
                  <radialGradient id="eg" cx="36%" cy="30%" r="60%"><stop offset="0%" stopColor="#ffffff"/><stop offset="35%" stopColor="#c9a961"/><stop offset="100%" stopColor="#3d3014"/></radialGradient>
                  <radialGradient id="pg" cx="35%" cy="30%" r="65%"><stop offset="0%" stopColor="#1a1a1a"/><stop offset="100%" stopColor="#000000"/></radialGradient>
                  <radialGradient id="ls" cx="50%" cy="40%" r="60%"><stop offset="0%" stopColor="#0a0a0a"/><stop offset="100%" stopColor="#020202"/></radialGradient>
                  <filter id="gw" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="3.5" result="b"/><feComposite in="SourceGraphic" in2="b" operator="over"/></filter>
                  <filter id="sgw" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="6" result="b"/><feComposite in="SourceGraphic" in2="b" operator="over"/></filter>
                  <filter id="pkgw" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="4" result="b"/><feFlood floodColor="#9b8b7e" floodOpacity=".5" result="c"/><feComposite in="c" in2="b" operator="in" result="d"/><feComposite in="SourceGraphic" in2="d" operator="over"/></filter>
                </defs>
                <rect x="107" y="334" width="38" height="62" rx="13" fill="url(#tg)" stroke="rgba(201,169,97,0.22)" strokeWidth="1.2"/>
                <rect x="175" y="334" width="38" height="62" rx="13" fill="url(#tg)" stroke="rgba(201,169,97,0.22)" strokeWidth="1.2"/>
                <rect x="98"  y="390" width="56" height="19" rx="10" fill="#0a0a0a" stroke="rgba(201,169,97,0.2)" strokeWidth="1"/>
                <rect x="102" y="394" width="14" height="3" rx="1.5" fill="rgba(201,169,97,0.28)"/>
                <rect x="166" y="390" width="56" height="19" rx="10" fill="#0a0a0a" stroke="rgba(201,169,97,0.2)" strokeWidth="1"/>
                <rect x="204" y="394" width="14" height="3" rx="1.5" fill="rgba(201,169,97,0.28)"/>
                <rect x="94" y="226" width="132" height="116" rx="26" fill="url(#tg)" stroke="rgba(201,169,97,0.28)" strokeWidth="1.5"/>
                <rect x="108" y="238" width="104" height="62" rx="10" fill="rgba(20,20,20,0.8)" stroke="rgba(201,169,97,0.32)" strokeWidth="1"/>
                <rect x="116" y="247" width="54" height="3" rx="1.5" fill="rgba(201,169,97,0.7)" className="cline"/>
                <rect x="116" y="255" width="36" height="3" rx="1.5" fill="rgba(232,232,232,0.6)" className="cline" style={{animationDelay:".2s"}}/>
                <rect x="116" y="263" width="64" height="3" rx="1.5" fill="rgba(201,169,97,0.55)" className="cline" style={{animationDelay:".4s"}}/>
                <rect x="116" y="271" width="30" height="3" rx="1.5" fill="rgba(155,139,126,0.55)" className="cline" style={{animationDelay:".6s"}}/>
                <rect x="116" y="279" width="50" height="3" rx="1.5" fill="rgba(232,232,232,0.5)" className="cline" style={{animationDelay:".8s"}}/>
                <rect x="116" y="287" width="44" height="3" rx="1.5" fill="rgba(201,169,97,0.45)" className="cline" style={{animationDelay:"1s"}}/>
                <circle cx="108" cy="322" r="5" fill="#070707" stroke="rgba(201,169,97,0.35)" strokeWidth="1"/>
                <circle cx="212" cy="322" r="5" fill="#070707" stroke="rgba(201,169,97,0.35)" strokeWidth="1"/>
                <rect x="56" y="234" width="34" height="74" rx="14" fill="url(#tg)" stroke="rgba(201,169,97,0.2)" strokeWidth="1"/>
                <circle cx="73" cy="308" r="9" fill="#070707" stroke="rgba(201,169,97,0.28)" strokeWidth="1.2"/>
                <g transform="rotate(18,73,316)"><rect x="60" y="308" width="26" height="54" rx="11" fill="url(#tg)" stroke="rgba(201,169,97,0.17)" strokeWidth="1"/></g>
                <ellipse cx="72" cy="368" rx="14" ry="9" fill="#111111" stroke="rgba(201,169,97,0.2)" strokeWidth="1"/>
                <rect x="230" y="234" width="34" height="74" rx="14" fill="url(#tg)" stroke="rgba(201,169,97,0.2)" strokeWidth="1"/>
                <circle cx="247" cy="308" r="9" fill="#070707" stroke="rgba(201,169,97,0.28)" strokeWidth="1.2"/>
                <g transform="rotate(-18,247,316)"><rect x="234" y="308" width="26" height="54" rx="11" fill="url(#tg)" stroke="rgba(201,169,97,0.17)" strokeWidth="1"/></g>
                <ellipse cx="248" cy="368" rx="14" ry="9" fill="#111111" stroke="rgba(201,169,97,0.2)" strokeWidth="1"/>
                <rect x="68" y="371" width="184" height="19" rx="6" fill="#111111" stroke="rgba(201,169,97,0.28)" strokeWidth="1"/>
                {[75,86,97,108,119,130,141,152,163,174,185,196].map((x,i)=>(
                  <rect key={x} x={x} y="375" width="8" height="5" rx="1.5" className="kbd-key" style={{animationDelay:`${i*0.1}s`}}/>
                ))}
                <rect x="108" y="381" width="100" height="5" rx="2.5" fill="rgba(232,232,232,0.3)"/>
                <rect x="146" y="386" width="36" height="4" rx="2" fill="#0a0a0a" stroke="rgba(201,169,97,0.18)" strokeWidth=".8"/>
                <rect x="76" y="288" width="168" height="86" rx="9" fill="#111111" stroke="rgba(201,169,97,0.3)" strokeWidth="1.2"/>
                <rect x="80" y="292" width="160" height="76" rx="6" fill="url(#ls)"/>
                <text x="86" y="304" fontFamily="monospace" fontSize="6" fill="#e8e8e8" opacity=".9">const prashant = () =&gt; ?</text>
                {[308,314,320,326,332,338,344,350].map((y,i)=>(
                  <rect key={y} x="86" y={y} width={[52,38,70,44,58,32,48,42][i]} height="2.5" rx="1"
                    fill={["rgba(201,169,97,0.5)","rgba(155,139,126,0.48)","rgba(232,232,232,0.4)","rgba(201,169,97,0.38)","rgba(155,139,126,0.33)","rgba(232,232,232,0.32)","rgba(201,169,97,0.28)","rgba(155,139,126,0.28)"][i]}/>
                ))}
                <rect x="140" y="304" width="1.5" height="6" rx=".5" fill="#c9a961"><animate attributeName="opacity" values="1;0;1" dur=".9s" repeatCount="indefinite"/></rect>
                <rect x="76" y="370" width="168" height="4" rx="2" fill="#242424" stroke="rgba(201,169,97,0.2)" strokeWidth=".8"/>
                <rect x="140" y="210" width="40" height="22" rx="7" fill="#111111" stroke="rgba(201,169,97,0.2)" strokeWidth="1"/>
                <circle cx="150" cy="221" r="3" fill="#111111" stroke="rgba(201,169,97,0.28)" strokeWidth=".8" opacity=".6"/>
                <circle cx="170" cy="221" r="3" fill="#111111" stroke="rgba(201,169,97,0.28)" strokeWidth=".8" opacity=".6"/>
                <g id="hgrp" ref={headGroupRef} style={{transformOrigin:"160px 230px"}}>
                  <rect x="82" y="60" width="156" height="156" rx="48" fill="url(#hg)" stroke="rgba(201,169,97,0.35)" strokeWidth="1.8"/>
                  <ellipse cx="118" cy="88" rx="24" ry="14" fill="rgba(255,255,255,.035)"/>
                  <circle className="ear-l" cx="86"  cy="132" r="16" fill="#0e0e0e" stroke="rgba(201,169,97,0.32)" strokeWidth="1.3"/>
                  <circle className="ear-l" cx="86"  cy="132" r="8"  fill="rgba(201,169,97,0.07)" stroke="rgba(201,169,97,0.28)" strokeWidth=".8"/>
                  <circle className="ear-r" cx="234" cy="132" r="16" fill="#0e0e0e" stroke="rgba(201,169,97,0.32)" strokeWidth="1.3"/>
                  <circle className="ear-r" cx="234" cy="132" r="8"  fill="rgba(201,169,97,0.07)" stroke="rgba(201,169,97,0.28)" strokeWidth=".8"/>
                  <line x1="160" y1="60" x2="160" y2="34" stroke="rgba(201,169,97,0.5)" strokeWidth="2.5" strokeLinecap="round"/>
                  <circle cx="160" cy="25" r="11" fill="#111111" stroke="rgba(201,169,97,0.45)" strokeWidth="1.5"/>
                  <circle cx="160" cy="25" r="6.5" fill="#ffffff" className="ant-glow" filter="url(#gw)"/>
                  <polygon points="160,14 162.5,22 160,25 157.5,22" fill="#ffffff" opacity=".7"/>
                  <polygon points="171,25 163,23 160,25 163,27" fill="#ffffff" opacity=".7"/>
                  <path ref={browLeftRef}  d="M106 108 Q127 101 142 108" stroke="rgba(201,169,97,0.7)" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
                  <path ref={browRightRef} d="M178 108 Q193 101 214 108" stroke="rgba(201,169,97,0.7)" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
                  <rect x="96" y="116" width="128" height="50" rx="16" fill="rgba(0,0,0,0.88)" stroke="rgba(201,169,97,0.18)" strokeWidth="1"/>
                  <g>
                    <circle cx="129" cy="139" r="22" fill="none" stroke="rgba(201,169,97,0.38)" strokeWidth="3" filter="url(#sgw)"/>
                    <circle cx="129" cy="139" r="19" fill="#080808" stroke="rgba(201,169,97,0.7)" strokeWidth="2"/>
                    <circle cx="129" cy="139" r="14" fill="url(#eg)"/>
                    <circle ref={pupilLeftRef}  cx="129" cy="139" r="8.5" fill="url(#pg)"/>
                    <circle ref={shineLeft1Ref} cx="124" cy="134" r="3.5" fill="rgba(255,255,255,.82)"/>
                    <circle ref={shineLeft2Ref} cx="133" cy="143" r="1.8" fill="rgba(255,255,255,.36)"/>
                    <circle className="sparkle" cx="142" cy="122" r="2.2" fill="white" opacity=".9"/>
                    <circle className="sparkle" cx="116" cy="126" r="1.5" fill="white" opacity=".7" style={{animationDelay:".5s"}}/>
                  </g>
                  <g>
                    <circle cx="191" cy="139" r="22" fill="none" stroke="rgba(201,169,97,0.38)" strokeWidth="3" filter="url(#sgw)"/>
                    <circle cx="191" cy="139" r="19" fill="#080808" stroke="rgba(201,169,97,0.7)" strokeWidth="2"/>
                    <circle cx="191" cy="139" r="14" fill="url(#eg)"/>
                    <circle ref={pupilRightRef}  cx="191" cy="139" r="8.5" fill="url(#pg)"/>
                    <circle ref={shineRight1Ref} cx="186" cy="134" r="3.5" fill="rgba(255,255,255,.82)"/>
                    <circle ref={shineRight2Ref} cx="196" cy="143" r="1.8" fill="rgba(255,255,255,.36)"/>
                    <circle className="sparkle" cx="204" cy="122" r="2.2" fill="white" opacity=".9" style={{animationDelay:".3s"}}/>
                    <circle className="sparkle" cx="178" cy="126" r="1.5" fill="white" opacity=".7" style={{animationDelay:".8s"}}/>
                  </g>
                  <ellipse cx="106" cy="166" rx="18" ry="11" fill="rgba(155,139,126,0.38)" className="blush" filter="url(#pkgw)"/>
                  <ellipse cx="214" cy="166" rx="18" ry="11" fill="rgba(155,139,126,0.38)" className="blush" filter="url(#pkgw)" style={{animationDelay:".5s"}}/>
                  <path d="M134 176 Q160 196 186 176" stroke="rgba(201,169,97,0.9)" strokeWidth="3" fill="none" strokeLinecap="round" filter="url(#gw)"/>
                  <path d="M134 176 Q160 196 186 176" stroke="rgba(201,169,97,0.25)" strokeWidth="7" fill="none" strokeLinecap="round"/>
                  <line x1="160" y1="64" x2="160" y2="208" stroke="rgba(201,169,97,0.05)" strokeWidth=".8"/>
                </g>
              </svg>
            </div>
          </div>

          {/* PROFILE IMAGE — same center as robot, crossfades in */}
          <div id="profile-image" ref={profileImageRef}>
            <img
              src="https://ik.imagekit.io/parshu0711/Me/MeInFormals.jpeg"
              alt="Prashant Mete"
            />
          </div>

          {/* TEXT SECTION */}
          <div id="text-section" ref={textRef}>
            <p className="tag">Hello, I'm</p>
            <h1 className="hero-heading">
              <span style={{color:"#ffffff"}}>Prashant</span>
              <span className="nm" style={{marginLeft:"12px"}}>Mete</span>
            </h1>
            <p className="role">Innovative Software Developer | Full-Stack</p>
            <div className="ctas">
              <a href="https://ik.imagekit.io/parshu0711/Resume/Prashant_CV.pdf"
                target="_blank" rel="noopener noreferrer"
                className="btn-hero bp"
                style={{display:"flex",alignItems:"center",gap:"10px"}}>
                Download Resume <FaDownload />
              </a>
              <div style={{display:"flex",gap:"20px",fontSize:"1.8rem",alignItems:"center"}}>
                <a href="https://github.com/parshu0711" target="_blank" rel="noopener noreferrer" style={{color:"#c9a961"}}
                  onMouseOver={e=>e.currentTarget.style.color="#fff"} onMouseOut={e=>e.currentTarget.style.color="#c9a961"}><FaGithub /></a>
                <a href="https://www.linkedin.com/in/prashantmete07/" target="_blank" rel="noopener noreferrer" style={{color:"#c9a961"}}
                  onMouseOver={e=>e.currentTarget.style.color="#fff"} onMouseOut={e=>e.currentTarget.style.color="#c9a961"}><FaLinkedin /></a>
                <a href="mailto:prashantmete0711@gmail.com" style={{color:"#c9a961"}}
                  onMouseOver={e=>e.currentTarget.style.color="#fff"} onMouseOut={e=>e.currentTarget.style.color="#c9a961"}><FaEnvelope /></a>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default Hero;