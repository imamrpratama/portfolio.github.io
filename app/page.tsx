"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Smartphone,
  Database,
  Server,
  Menu,
  X,
  Bolt,
  Figma,
} from "lucide-react";

const Portfolio = () => {
  const [activeSlides, setActiveSlides] = useState<Record<number, number>>({});
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setScrollY(scrollPos);
      setIsScrolled(scrollPos > 50);

      const sections = ["home", "about", "skills", "projects", "contact"];
      const scrollPosition = scrollPos + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id) {
              setIsVisible((prev) => ({ ...prev, [id]: true }));
            }
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -100px 0px" }
    );

    setTimeout(() => {
      const sections = document.querySelectorAll("section[id]");
      sections.forEach((section) => {
        observerRef.current?.observe(section);
      });
    }, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observerRef.current?.disconnect();
    };
  }, []);

  const smoothScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setMobileMenuOpen(false);
    }
  };

  const projects = [
    {
      id: 1,
      title: "Eduvice",
      tech: ["Laravel", "MySQL", "Tailwind CSS"],
      description:
        "This project is built using Laravel, PHP, MySQL, and Tailwind CSS. It powers Eduvice, a web platform that enables users to donate, track, and manage electronic devices to be refurbished and distributed to students in need, promoting digital inclusion and reducing electronic waste.",
      images: [
        "/portfolio/images/eduvice_1.png",
        "/portfolio/images/eduvice_2.png",
        "/portfolio/images/eduvice_3.png",
      ],
      demo: "https://eduvice.id",
    },
    {
      id: 2,
      title: "Indonesia Sustainability Forum",
      tech: ["Laravel", "MySQL", "Tailwind CSS"],
      description:
        "This website is built using Laravel, MySQL, and Tailwind CSS, delivering a modern, responsive, and secure web platform. It powers the Indonesia Sustainability Forum site, providing information about the event and enabling users to register as participants seamlessly.",
      images: [
        "/portfolio/images/isf_1.png",
        "/portfolio/images/isf_2.png",
        "/portfolio/images/isf_3.png",
      ],
      demo: "https://indonesiasustainabilityforum.co.id/",
    },
    {
      id: 3,
      title: "Asset Management System",
      tech: ["Laravel", "REST API", "MS SQL"],
      description:
        "Built using Laravel, REST API, and MS SQL, designed to streamline organizational asset tracking and maintenance. The Asset Management System enables users to efficiently manage asset records, monitor conditions, and automate maintenance scheduling.",
      images: [
        "/portfolio/images/asset_1.png",
        "/portfolio/images/asset_2.png",
        "/portfolio/images/asset_3.png",
      ],
      demo: "https://demo.example.com",
    },
    {
      id: 4,
      title: "Villa Berastagimas",
      tech: ["Laravel", "REST API", "Tailwind CSS", "Xendit"],
      description:
        "Developed with Laravel, REST API, and MS SQL, this system serves as a comprehensive villa booking platform integrated with asset management data. It enables users to reserve villas, track booking status, and complete payments securely through the Xendit payment gateway.",
      images: [
        "/portfolio/images/villa_1.png",
        "/portfolio/images/villa_2.png",
      ],
      demo: "https://villaberastagimas.com",
    },
    {
      id: 5,
      title: "FAMA Asset Management",
      tech: ["Flutter", "REST API", "Firebase Cloud Messaging"],
      description:
        "Built with Flutter and integrated through REST API with the Asset Management System, this mobile application enables users to perform assigned tasks and submit real-time proof such as photos and locations. Designed for field operations, it streamlines task tracking, verification, and reporting, ensuring transparency and accountability across maintenance and asset management activities.",
      images: ["/portfolio/images/fama.png"],
      demo: "https://play.google.com/store/apps/details?id=com.assets_management.fama&hl=en",
    },
    {
      id: 6,
      title: "Automation Google Drive Backup",
      tech: ["Laravel", "Google Drive API", "Automation"],
      description:
        "Developed with Laravel, this project automates the process of backing up files to Google Drive with integrated email notifications and error handling. It allows users to schedule and manage backups directly from the Laravel console, ensuring secure data storage, simplified recovery, and reliable automation for maintaining critical project files.",
      images: [
        "/portfolio/images/gdrive_1.png",
        "/portfolio/images/gdrive_2.png",
      ],

      demo: "https://github.com/imamrpratama/automation-gdrive-backup",
    },
    {
      id: 7,
      title: "Harmoni Rent Car",
      tech: ["Next.js", "Tailwind CSS", "WhatsApp API"],
      description:
        "Built with Next.js, this website serves as a company profile platform for Harmoni Rent Car, showcasing available vehicles and rental services. It features a clean, responsive design where users can browse cars, view details, and make bookings easily via WhatsApp, providing a simple and direct communication channel for customers.",
      images: [
        "/portfolio/images/harmoni_1.png",
        "/portfolio/images/harmoni_2.png",
      ],
      demo: "https://harmonirentcar.com",
    },
  ];

  const skillCategories = [
    {
      title: "Backend Development",
      color: "from-purple-500 to-pink-500",
      skills: [
        { name: "Laravel", icon: Server, level: 90 },
        { name: "PHP", icon: Code, level: 85 },
        { name: "REST API", icon: Database, level: 88 },
      ],
    },
    {
      title: "Frontend Development",
      color: "from-blue-500 to-cyan-500",
      skills: [
        { name: "Next.js", icon: Code, level: 85 },
        { name: "Tailwind CSS", icon: Code, level: 90 },
        { name: "Figma", icon: Figma, level: 88 },
      ],
    },
    {
      title: "Mobile Development",
      color: "from-green-500 to-emerald-500",
      skills: [
        { name: "Flutter", icon: Smartphone, level: 88 },
        { name: "Firebase", icon: Database, level: 80 },
      ],
    },
    {
      title: "Database & Tools",
      color: "from-orange-500 to-red-500",
      skills: [
        { name: "MySQL", icon: Database, level: 85 },
        { name: "Microsoft SQL Server", icon: Database, level: 75 },
        { name: "Git", icon: Github, level: 88 },
        { name: "Automation", icon: Bolt, level: 85 },
      ],
    },
  ];

  const nextSlide = (projectId: number) => {
    setActiveSlides((prev) => {
      const current = prev[projectId] ?? 0;
      const project = projects.find((p) => p.id === projectId);
      if (!project) return prev;
      return { ...prev, [projectId]: (current + 1) % project.images.length };
    });
  };

  const prevSlide = (projectId: number) => {
    setActiveSlides((prev) => {
      const current = prev[projectId] ?? 0;
      const project = projects.find((p) => p.id === projectId);
      if (!project) return prev;
      return {
        ...prev,
        [projectId]: current === 0 ? project.images.length - 1 : current - 1,
      };
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-multiply filter blur-[120px] opacity-20 animate-blob top-0 -left-32" />
        <div className="absolute w-[500px] h-[500px] bg-blue-600 rounded-full mix-blend-multiply filter blur-[120px] opacity-20 animate-blob animation-delay-2000 top-1/2 -right-32" />
        <div className="absolute w-[500px] h-[500px] bg-pink-600 rounded-full mix-blend-multiply filter blur-[120px] opacity-20 animate-blob animation-delay-4000 bottom-0 left-1/3" />
      </div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <button
              onClick={() => smoothScrollTo("home")}
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hover:scale-105 transition-transform"
            >
              Portfolio
            </button>

            <div className="hidden md:flex items-center space-x-1">
              {["home", "about", "skills", "projects", "contact"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => smoothScrollTo(item)}
                    className={`capitalize px-4 py-2 rounded-lg transition-all duration-300 relative ${
                      activeSection === item
                        ? "text-purple-400"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {item}
                    {activeSection === item && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
                    )}
                  </button>
                )
              )}
            </div>

            <button
              className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-2 animate-fade-in">
              {["home", "about", "skills", "projects", "contact"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => smoothScrollTo(item)}
                    className={`block w-full text-left capitalize px-4 py-3 rounded-lg transition-all duration-300 ${
                      activeSection === item
                        ? "bg-purple-500/20 text-purple-400"
                        : "text-gray-300 hover:bg-white/5"
                    }`}
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-16 sm:pt-20"
      >
        <div className="relative z-10 text-center space-y-8 max-w-5xl mx-auto w-full">
          <div className="space-y-6">
            <div className="inline-block mb-4 px-4 sm:px-6 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-300 text-xs sm:text-sm backdrop-blur-sm animate-fade-in">
              👋 Welcome to my Portfolio
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-6 tracking-tight animate-fade-in-up px-2 sm:px-4">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                Imam Rizky Pratama
              </span>
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 mx-auto rounded-full animate-pulse" />
          </div>

          <div className="space-y-4 animate-fade-in-up animation-delay-300 px-2 sm:px-4">
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-200">
              Full Stack Developer
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              Crafting beautiful, functional applications with modern
              technologies
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 text-xs sm:text-sm md:text-base pt-4">
              {["Laravel", "Flutter", "Next.js"].map((tech, i) => (
                <span
                  key={i}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 rounded-full border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300 cursor-default"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 animate-fade-in-up animation-delay-600 px-2 sm:px-4">
            <button
              onClick={() => smoothScrollTo("projects")}
              className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 text-sm sm:text-base"
            >
              View Projects
            </button>
            <button
              onClick={() => smoothScrollTo("contact")}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold hover:bg-white/20 border border-white/20 hover:border-purple-500/50 transition-all duration-300 text-sm sm:text-base"
            >
              Get In Touch
            </button>
          </div>
        </div>

        <button
          onClick={() => smoothScrollTo("about")}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center hover:border-purple-400 transition-colors">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-scroll" />
          </div>
        </button>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16"
      >
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${
              isVisible.about
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
          </div>

          <div className="flex flex-col items-center gap-8 sm:gap-10 md:gap-12">
            <div
              className={`max-w-3xl text-center space-y-6 transition-all duration-1000 delay-200 ${
                isVisible.about
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                I'm a passionate full-stack developer with expertise in building
                scalable web applications and cross-platform mobile solutions. I
                love turning complex problems into simple, beautiful, and
                intuitive solutions.
              </p>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                With a strong foundation in Laravel and PHP for backend
                development, and Flutter for mobile applications, I create
                seamless user experiences across all platforms.
              </p>
              <div className="flex gap-4 justify-center pt-4">
                <a
                  href="https://github.com/imamrpratama"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 hover:border-purple-500/50 transition-all duration-300 hover:scale-110"
                >
                  <Github size={24} />
                </a>
                <a
                  href="https://linkedin.com/in/imamrpratama"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 hover:border-purple-500/50 transition-all duration-300 hover:scale-110"
                >
                  <Linkedin size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section - IMPROVED */}
      <section
        id="skills"
        className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16"
      >
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${
              isVisible.skills
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Skills & Expertise
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mb-6" />
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              Technologies and tools I use to bring ideas to life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {skillCategories.map((category, catIndex) => (
              <div
                key={category.title}
                className={`group bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-purple-500/30 transition-all duration-500 hover:scale-[1.02] ${
                  isVisible.skills
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${catIndex * 100}ms` }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`h-1 w-12 rounded-full bg-gradient-to-r ${category.color}`}
                  />
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skill.name}
                      className="group/skill"
                      style={{
                        transitionDelay: `${
                          catIndex * 100 + skillIndex * 50
                        }ms`,
                      }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className={`p-2 rounded-lg bg-gradient-to-br ${category.color} bg-opacity-20`}
                        >
                          <skill.icon className="text-white" size={20} />
                        </div>
                        <span className="font-semibold text-base sm:text-lg text-white">
                          {skill.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16"
      >
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${
              isVisible.projects
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mb-4 sm:mb-6" />
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-2 sm:px-4">
              A collection of projects showcasing my skills and expertise
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 justify-items-center">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`w-full max-w-lg group bg-white/5 backdrop-blur-lg rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] ${
                  isVisible.projects
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative h-41 sm:h-64 md:h-58 overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                  {project.images.map((img, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={img}
                      alt={`${project.title} - ${imgIndex + 1}`}
                      className={`absolute inset-0 w-full h-full object-contain transition-all duration-700 ${
                        (activeSlides[project.id] ?? 0) === imgIndex
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-110"
                      }`}
                    />
                  ))}

                  <button
                    onClick={() => prevSlide(project.id)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-purple-600 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 z-10"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => nextSlide(project.id)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-purple-600 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 z-10"
                  >
                    <ChevronRight size={20} />
                  </button>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {project.images.map((_, imgIndex) => (
                      <button
                        key={imgIndex}
                        onClick={() =>
                          setActiveSlides((prev) => ({
                            ...prev,
                            [project.id]: imgIndex,
                          }))
                        }
                        className={`h-2 rounded-full transition-all duration-300 ${
                          (activeSlides[project.id] ?? 0) === imgIndex
                            ? "bg-white w-8"
                            : "bg-white/50 hover:bg-white/75 w-2"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <h3 className="text-xl sm:text-2xl font-bold group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30 hover:bg-purple-500/30 transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/50 flex-1 text-sm sm:text-base"
                    >
                      <ExternalLink size={18} />
                      Link
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div
            className={`mb-12 sm:mb-16 transition-all duration-1000 ${
              isVisible.contact
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Let's Connect
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mb-6" />
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-2 sm:px-4">
              I'm always open to discussing new projects, creative ideas, or
              opportunities to be part of your visions.
            </p>
          </div>

          <div
            className={`flex flex-wrap justify-center gap-4 sm:gap-6 mb-12 transition-all duration-1000 delay-200 ${
              isVisible.contact
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <a
              href="https://github.com/imamrpratama"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all duration-300 hover:scale-110 border border-white/20 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 text-sm sm:text-base"
            >
              <Github size={20} />
              <span className="font-medium">GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/imamrpratama"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all duration-300 hover:scale-110 border border-white/20 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 text-sm sm:text-base"
            >
              <Linkedin size={20} />
              <span className="font-medium">LinkedIn</span>
            </a>
            <a
              href="mailto:imamrpratama0900@gmail.com"
              className="flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-purple-500/50 text-sm sm:text-base"
            >
              <Mail size={20} />
              <span className="font-medium">Email Me</span>
            </a>
          </div>

          <div
            className={`pt-8 border-t border-white/10 transition-all duration-1000 delay-300 ${
              isVisible.contact ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="text-gray-500 text-xs sm:text-sm">
              © {new Date().getFullYear()} Built with{" "}
              <span className="text-purple-400">Next.js</span> &{" "}
              <span className="text-purple-400">Tailwind CSS</span>
            </p>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes scroll {
          0% {
            opacity: 0;
            transform: translateY(0);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(12px);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animate-gradient {
          animation: gradient 3s ease infinite;
        }

        .animate-scroll {
          animation: scroll 2s ease-in-out infinite;
        }

        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }

        .animation-delay-300 {
          animation-delay: 300ms;
        }

        .animation-delay-600 {
          animation-delay: 600ms;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        html {
          scroll-behavior: smooth;
        }

        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #9333ea, #ec4899);
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #7c3aed, #db2777);
        }
      `}</style>
    </div>
  );
};

export default Portfolio;
