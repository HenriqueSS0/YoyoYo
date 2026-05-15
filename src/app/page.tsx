"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowUpRight, Menu } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/YoyoYo" : "";

export default function YoyoyoPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Hero Text Animations
      gsap.fromTo(
        ".hero-text",
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }
      );

      // 2. Hero Yoyo Image from Right to Left
      gsap.fromTo(
        ".hero-img-wrapper",
        { x: "50%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 1.5, ease: "power3.out", delay: 0.2 }
      );

      // Navbar sliding down after hero
      gsap.fromTo(
        ".navbar-anim",
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 1.2 }
      );

      // 3. Parallax for the Hero Yoyo
      gsap.to(".parallax-yoyo", {
        y: 150,
        rotation: 15,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      // 4. Fade In / Up for other elements
      gsap.utils.toArray<HTMLElement>(".fade-in").forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 150 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 80%", // Disappear when a little bit up (20% from bottom)
              onEnter: (self) => { self.animation?.timeScale(1); self.animation?.play(); },
              onLeaveBack: (self) => { self.animation?.timeScale(6); self.animation?.reverse(); }
            }
          }
        );
      });
      
      // 5. Staggered fade in for product cards
      gsap.fromTo(
        ".product-card",
        { opacity: 0, y: 150 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".products-grid",
            start: "top 80%",
            onEnter: (self) => { self.animation?.timeScale(1); self.animation?.play(); },
            onLeaveBack: (self) => { self.animation?.timeScale(6); self.animation?.reverse(); }
          }
        }
      );

      // 6. Footer animation (bottom to top)
      gsap.fromTo(
        ".footer-anim",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".footer-anim",
            start: "top 98%", // Triggers right when the top of the footer enters the screen
            once: true
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    const element = document.querySelector(target);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#FF3EBD] selection:text-white" suppressHydrationWarning>
      {/* NAVIGATION */}
      <nav className="navbar-anim opacity-0 fixed top-0 left-0 w-full z-50 py-6 px-6 md:px-12 flex justify-between items-center backdrop-blur-sm bg-[#050505]/40">
        <Link href="/" className="font-display text-2xl md:text-3xl text-[#FF3EBD] tracking-tighter z-10">
          YOYOYO
        </Link>

        <div className="hidden md:flex gap-10 text-[10px] md:text-xs font-semibold tracking-widest text-white/70 uppercase">
          <Link href="#home" onClick={(e) => handleScrollTo(e, '#home')} className="hover:text-white transition-colors">Home</Link>
          <Link href="#about" onClick={(e) => handleScrollTo(e, '#about')} className="hover:text-white transition-colors">About</Link>
          <Link href="#products" onClick={(e) => handleScrollTo(e, '#products')} className="hover:text-white transition-colors">Products</Link>
          <Link href="#play" onClick={(e) => handleScrollTo(e, '#play')} className="hover:text-white transition-colors">Play</Link>
        </div>

        <div className="flex items-center gap-6 text-[10px] md:text-xs font-semibold tracking-widest uppercase z-10">
          <span className="hidden md:block">Cart (0)</span>
          <button className="w-10 h-10 rounded-full border border-[#C6FF00] flex items-center justify-center text-[#C6FF00] hover:bg-[#C6FF00] hover:text-black transition-colors">
            <Menu size={18} />
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="hero-section relative w-full min-h-[100svh] flex flex-col md:flex-row md:items-center px-6 md:px-12 pt-28 md:pt-32 pb-12 overflow-hidden md:overflow-visible">

        {/* HERO CONTENT */}
        <div className="relative z-20 w-full md:w-[60%] max-w-[600px] mt-10 md:mt-0 pointer-events-auto">
          <h2 className="hero-text opacity-0 font-display text-[15vw] sm:text-6xl md:text-7xl lg:text-[90px] leading-[1] tracking-tight mb-6 text-white">
            MADE<br />TO PLAY.<br />BUILT TO<br />CONNECT.
          </h2>
          <button className="hero-text opacity-0 bg-[#C6FF00] text-black font-display font-black uppercase tracking-wider text-sm md:text-base py-3 md:py-4 px-8 md:px-10 rounded-xl hover:bg-white transition-colors w-fit">
            START PLAYING
          </button>
        </div>

        {/* HERO YOYO IMAGE */}
        <div className="hero-img-wrapper absolute top-[55vh] md:bottom-auto md:top-1/2 right-[-15%] md:-translate-y-1/2 md:right-0 z-10 w-[131%] sm:w-[120%] md:w-[60%] pointer-events-none flex justify-end opacity-0">
          <img
            src={`${basePath}/images/hero.webp`}
            alt="Yoyoyo Neon Hero"
            className="parallax-yoyo w-full max-w-none h-auto drop-shadow-2xl animate-float-slow"
          />
        </div>

        {/* BOTTOM RIGHT TEXT */}
        <div className="hero-text absolute bottom-8 md:bottom-12 right-6 md:right-12 text-right z-20 pointer-events-none opacity-0">
          <p className="text-[#A855F7] font-sans font-bold text-[8px] md:text-[10px] tracking-widest uppercase">
            Created for players.<br />Connected by passion.
          </p>
        </div>
      </section>

      {/* COREANO SECTION */}
      <section id="about" className="fade-in opacity-0 relative w-full py-24 px-6 md:px-12 mt-12 md:mt-24">
        <div className="bg-[#F2F0E9] rounded-[2rem] w-full flex flex-col md:flex-row relative overflow-hidden min-h-[600px] items-stretch">

          {/* PURPLE BLOB BACKGROUND - Optional fallback if the image doesn't have it */}
          <div className="absolute top-1/2 left-1/2 md:left-2/3 -translate-y-1/2 -translate-x-1/2 md:-translate-x-0 w-[800px] h-[800px] bg-[#A855F7] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] opacity-20 blur-[20px] z-0 animate-spin-slow pointer-events-none"></div>

          {/* LEFT CONTENT */}
          <div className="w-full md:w-1/2 p-10 md:p-20 z-10 flex flex-col justify-center text-black">
            <h3 className="font-display text-5xl md:text-6xl lg:text-[70px] leading-[1] tracking-tight mb-8">
              <span className="text-black block">YOYOYO is the</span>
              <span className="text-black block">rhythm of play</span>
              <span className="text-black block">in a connected</span>
              <span className="text-black block">world.</span>
            </h3>
            <p className="text-black/80 text-base md:text-lg leading-relaxed mb-12 max-w-[420px] font-medium">
              We create products and experiences that blend physical play with digital creativity — designed to inspire expression, spark curiosity, and become part of your everyday obsession.
            </p>
            <button className="flex items-center gap-4 text-black font-display uppercase font-black tracking-wider text-sm group w-fit">
              Learn More
              <span className="w-10 h-10 rounded-full border border-[#FF3EBD] text-[#FF3EBD] flex items-center justify-center group-hover:bg-[#FF3EBD] group-hover:text-white transition-colors">
                <ArrowUpRight size={18} />
              </span>
            </button>
          </div>

          {/* RIGHT IMAGE */}
          <div className="w-full md:w-1/2 relative min-h-[350px] sm:min-h-[400px] md:h-auto z-10 pointer-events-none mt-4 md:mt-0">
            <img
              src={`${basePath}/images/coreano.webp`}
              alt="Yoyoyo Lifestyle"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-0 w-[150%] sm:w-[120%] md:w-[120%] max-w-none h-auto object-contain object-bottom"
            />
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section id="products" className="w-full py-32 px-6 md:px-12">
        <div className="fade-in opacity-0 flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-[#A855F7] text-[10px] font-bold tracking-widest uppercase block mb-4">Products</span>
            <h3 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight">
              BUILT TO PLAY.<br />MADE TO OBSESS.
            </h3>
          </div>
          <button className="flex items-center gap-3 text-[#C6FF00] font-bold text-xs uppercase tracking-widest group">
            View All Products
            <span className="w-8 h-8 rounded-full border border-[#C6FF00] flex items-center justify-center group-hover:bg-[#C6FF00] group-hover:text-black transition-colors">
              <ArrowUpRight size={14} />
            </span>
          </button>
        </div>

        <div className="products-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* PRODUCT 1 */}
          <div className="product-card bg-[#111] border border-white/5 rounded-2xl p-6 group hover:border-white/20 transition-colors flex flex-col items-center relative overflow-hidden opacity-0">
            <div className="w-full aspect-square flex items-center justify-center mb-6 relative z-10">
              <Image
                src={`${basePath}/images/yoyoyo.webp`}
                alt="Yoyo Pro"
                width={300}
                height={300}
                className="w-[80%] h-auto group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_10px_20px_rgba(255,62,189,0.2)]"
                style={{ filter: "hue-rotate(280deg) saturate(1.5) brightness(1.1)" }}
              />
            </div>
            <div className="w-full flex justify-between items-end relative z-10">
              <div>
                <h4 className="font-display text-lg mb-1">YOYO PRO</h4>
                <p className="text-white/50 text-sm">$89.00</p>
              </div>
              <button className="w-10 h-10 rounded-full border border-[#FF3EBD] text-[#FF3EBD] flex items-center justify-center group-hover:bg-[#FF3EBD] group-hover:text-white transition-colors">
                <ArrowUpRight size={18} />
              </button>
            </div>
            {/* Gradient glow behind product */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] aspect-square bg-[#FF3EBD]/10 rounded-full blur-3xl z-0 pointer-events-none group-hover:bg-[#FF3EBD]/20 transition-colors"></div>
          </div>

          {/* PRODUCT 2 */}
          <div className="product-card bg-[#111] border border-white/5 rounded-2xl p-6 group hover:border-white/20 transition-colors flex flex-col items-center relative overflow-hidden opacity-0">
            <div className="w-full aspect-square flex items-center justify-center mb-6 relative z-10">
              <Image
                src={`${basePath}/images/yoyoyo.webp`}
                alt="Yoyo Neo"
                width={300}
                height={300}
                className="w-[80%] h-auto group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_10px_20px_rgba(198,255,0,0.2)]"
                style={{ filter: "saturate(1.5) brightness(1.2)" }}
              />
            </div>
            <div className="w-full flex justify-between items-end relative z-10">
              <div>
                <h4 className="font-display text-lg mb-1">YOYO NEO</h4>
                <p className="text-white/50 text-sm">$89.00</p>
              </div>
              <button className="w-10 h-10 rounded-full border border-[#FF3EBD] text-[#FF3EBD] flex items-center justify-center group-hover:bg-[#FF3EBD] group-hover:text-white transition-colors">
                <ArrowUpRight size={18} />
              </button>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] aspect-square bg-[#C6FF00]/10 rounded-full blur-3xl z-0 pointer-events-none group-hover:bg-[#C6FF00]/20 transition-colors"></div>
          </div>

          {/* PRODUCT 3 */}
          <div className="product-card bg-[#111] border border-white/5 rounded-2xl p-6 group hover:border-white/20 transition-colors flex flex-col items-center relative overflow-hidden opacity-0">
            <div className="w-full aspect-square flex items-center justify-center mb-6 relative z-10">
              <Image
                src={`${basePath}/images/yoyoyo.webp`}
                alt="Yoyo Flow"
                width={300}
                height={300}
                className="w-[80%] h-auto group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_10px_20px_rgba(168,85,247,0.2)]"
                style={{ filter: "hue-rotate(240deg) saturate(1.5)" }}
              />
            </div>
            <div className="w-full flex justify-between items-end relative z-10">
              <div>
                <h4 className="font-display text-lg mb-1">YOYO FLOW</h4>
                <p className="text-white/50 text-sm">$89.00</p>
              </div>
              <button className="w-10 h-10 rounded-full border border-[#FF3EBD] text-[#FF3EBD] flex items-center justify-center group-hover:bg-[#FF3EBD] group-hover:text-white transition-colors">
                <ArrowUpRight size={18} />
              </button>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] aspect-square bg-[#A855F7]/10 rounded-full blur-3xl z-0 pointer-events-none group-hover:bg-[#A855F7]/20 transition-colors"></div>
          </div>

          {/* PRODUCT 4 */}
          <div className="product-card bg-[#111] border border-white/5 rounded-2xl p-6 group hover:border-white/20 transition-colors flex flex-col items-center relative overflow-hidden opacity-0">
            <div className="w-full aspect-square flex items-center justify-center mb-6 relative z-10">
              <Image
                src={`${basePath}/images/yoyoyo.webp`}
                alt="Yoyo Digital"
                width={300}
                height={300}
                className="w-[80%] h-auto group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_10px_20px_rgba(0,180,255,0.2)]"
                style={{ filter: "hue-rotate(180deg) saturate(1.5) brightness(1.2)" }}
              />
            </div>
            <div className="w-full flex justify-between items-end relative z-10">
              <div>
                <h4 className="font-display text-lg mb-1">YOYO DIGITAL</h4>
                <p className="text-white/50 text-sm">$129.00</p>
              </div>
              <button className="w-10 h-10 rounded-full border border-[#FF3EBD] text-[#FF3EBD] flex items-center justify-center group-hover:bg-[#FF3EBD] group-hover:text-white transition-colors">
                <ArrowUpRight size={18} />
              </button>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] aspect-square bg-[#00B4FF]/10 rounded-full blur-3xl z-0 pointer-events-none group-hover:bg-[#00B4FF]/20 transition-colors"></div>
          </div>
        </div>
      </section>

      {/* DIGITAL EXPERIENCE SECTION */}
      <section id="play" className="fade-in opacity-0 w-full px-6 md:px-12 pb-32">
        <div className="bg-[#111] border border-white/5 rounded-[2rem] w-full p-10 md:p-16 flex flex-col lg:flex-row relative overflow-hidden">

          <div className="w-full lg:w-5/12 z-10 mb-12 lg:mb-0 lg:pr-10">
            <span className="text-[#A855F7] text-[10px] font-bold tracking-widest uppercase block mb-6">Digital Experience</span>
            <h3 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-8">
              MORE TRICKS.<br />MORE WAYS TO CONNECT.
            </h3>
            <p className="text-white/60 text-sm md:text-base leading-relaxed mb-10 max-w-[320px]">
              Unlock new tricks, join global challenges and connect with players around the world.
            </p>
            <button className="bg-[#C6FF00] text-black font-display uppercase tracking-wider text-sm py-4 px-6 rounded-full flex items-center gap-3 hover:bg-white transition-colors w-fit">
              Download the App
              <span className="w-8 h-8 rounded-full bg-black text-[#C6FF00] flex items-center justify-center">
                <ArrowUpRight size={16} />
              </span>
            </button>
          </div>

          <div className="w-full lg:w-7/12 relative min-h-[350px] md:min-h-[400px] z-10 mt-12 lg:mt-0 flex justify-center md:block">
            {/* MOBILE IMAGE */}
            <img
              src={`${basePath}/images/finalmobile.webp`}
              alt="Digital Experience App Mobile"
              className="md:hidden w-[100%] sm:w-[80%] max-w-none h-auto drop-shadow-2xl"
            />
            {/* DESKTOP IMAGE */}
            <img
              src={`${basePath}/images/secaofinal.webp`}
              alt="Digital Experience App Desktop"
              className="hidden md:block absolute top-1/2 -translate-y-1/2 md:right-[-5%] lg:right-0 md:w-[90%] lg:w-[100%] max-w-none h-auto drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer-anim opacity-0 w-full py-12 px-6 md:px-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 bg-[#050505]">
        <Link href="/" className="font-display text-3xl text-[#FF3EBD] tracking-tighter">
          YOYOYO
        </Link>

        <div className="flex gap-8 text-[10px] md:text-xs font-semibold tracking-widest text-white/50 uppercase">
          <Link href="#home" onClick={(e) => handleScrollTo(e, '#home')} className="hover:text-white transition-colors">Home</Link>
          <Link href="#about" onClick={(e) => handleScrollTo(e, '#about')} className="hover:text-white transition-colors">About</Link>
          <Link href="#products" onClick={(e) => handleScrollTo(e, '#products')} className="hover:text-white transition-colors">Products</Link>
          <Link href="#play" onClick={(e) => handleScrollTo(e, '#play')} className="hover:text-white transition-colors">Play</Link>
        </div>

        <div className="flex items-center gap-6 text-[#FF3EBD]">
          <Link href="#" className="hover:text-white transition-colors" aria-label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </Link>
          <Link href="#" className="hover:text-white transition-colors" aria-label="TikTok">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
          </Link>
          <Link href="#" className="hover:text-white transition-colors" aria-label="YouTube">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.17 1 12 1 12s0 3.83.46 5.58a2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.83 23 12 23 12s0-3.83-.46-5.58z"></path><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon></svg>
          </Link>
          <Link href="#" className="hover:text-white transition-colors" aria-label="X (Twitter)">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.73 16h5L9 4z"></path><path d="M4 20l6.76-6.76"></path><path d="M20 4l-6.76 6.76"></path></svg>
          </Link>
        </div>
      </footer>
    </div>
  );
}
