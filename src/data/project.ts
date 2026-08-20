/**
 * Thumbnails are resolved by filename rather than static imports, so dropping a
 * new image into src/assets/images/projects-thumbnails/ is all it takes to give
 * a project a picture. A name with no matching file simply yields `undefined`,
 * and the row falls back to its monogram tile instead of failing the build.
 */
const thumbnailFiles = import.meta.glob(
  "../assets/images/projects-thumbnails/*.{png,jpg,jpeg,webp,svg,avif}",
  { eager: true, query: "?url", import: "default" },
) as Record<string, string>;

/** Looks up a thumbnail by basename, with or without its extension. */
const thumb = (basename: string): string | undefined =>
  Object.entries(thumbnailFiles).find(([path]) => {
    const file = path.split("/").pop() ?? "";
    return file === basename || file.replace(/\.[^.]+$/, "") === basename;
  })?.[1];

/**
 * Ordered as displayed: professional client work first, then personal and
 * course projects.
 *
 * Titles and summaries are translated via `projects.p{id}*` in
 * src/locales/en.json, so ids must stay stable when reordering.
 *
 * The three client systems have no public repository and no per-project URL,
 * so they carry `org` plus a link to where the work is documented.
 */
export const FEATURED_PROJECTS = [
  {
    id: 8,
    title: "Yaayyoo Woreda Government Portal",
    summary:
      "Official portal for the Yaayyoo Woreda administration in Illu Abbaa Boor, Oromia, covering public services, news, investment, and tourism for the Yaayuu coffee forest biosphere reserve. Bilingual in Afan Oromo and English.",
    stack: "Next.js, TypeScript, Tailwind CSS",
    category: "Full Stack",
    image: thumb("yayo-woreda"),
    liveUrl: "https://yayo.pro.et",
    org: "IDATA Technologies",
  },
  {
    id: 9,
    title: "Ethiopian Volleyball Federation Management System",
    summary:
      "Federation administration platform handling team and athlete registration, tournament scheduling, and match and event coordination for the national volleyball body.",
    stack: "React, TypeScript, REST APIs",
    category: "Frontend",
    image: thumb("volleyball-federation"),
    imageFit: "contain",
    liveUrl: "https://www.idatadigital.com/",
    org: "IDATA Technologies",
  },
  {
    id: 10,
    title: "Oromia Smart Agriculture Platform",
    summary:
      "Agricultural big data platform built with Ethio Telecom and the Agricultural Transformation Institute, giving visibility into production and market movement across the value chain.",
    stack: "React, TypeScript, Data Visualization",
    category: "Frontend",
    image: thumb("oromia-agriculture"),
    imageFit: "contain",
    liveUrl: "https://www.idatadigital.com/",
    org: "IDATA Technologies",
  },
  {
    id: 1,
    title: "EtCom: Ethiopian E-Commerce Platform",
    summary:
      "A responsive e-commerce platform with product listings, shopping cart, and checkout, optimized for performance and adapted to the local market.",
    stack: "Next.js, JavaScript, Tailwind CSS",
    category: "Full Stack",
    image: thumb("ecommerce"),
    repo: "https://github.com/Eyobed9/EtCom",
  },
  {
    id: 2,
    title: "AASTU Clinic Web App",
    summary:
      "A full-stack clinic management system with patient registration, appointment scheduling, and data visualization, built on secure CRUD APIs and a relational database.",
    stack: "React, PHP, MySQL",
    category: "Full Stack",
    image: thumb("task-management dash board"),
    repo: "https://github.com/Eyobed9/IP2_project",
  },
  {
    id: 3,
    title: "Rebel Rover Travel Website",
    summary:
      "A team-built travel booking site with destination browsing, search results, and booking pages. Deployed on Vercel with a responsive, interactive UI.",
    stack: "React, TypeScript, ShadCN UI, Axios",
    category: "Frontend",
    image: thumb("house-broker"),
    repo: "https://github.com/Gdg-Capstone-Team-8/Rebel_Rover_Travel_Website",
  },
  {
    id: 12,
    title: "Smart Parking System",
    summary:
      "A web-based smart parking management system with real-time slot availability, booking, and automated space allocation for efficient urban parking.",
    stack: "Next.js, TypeScript, Tailwind CSS",
    category: "Frontend",
    image: thumb("parking"),
    repo: "https://github.com/Eyobed9/Parking-system",
  },
  {
    id: 13,
    title: "EtLearn",
    summary:
      "A cross-platform mobile learning application built with Flutter, providing interactive educational content, course management, and progress tracking for Ethiopian students.",
    stack: "Flutter, Dart, Firebase",
    category: "Mobile",
    image: thumb("etlearn"),
    repo: "https://github.com/Eyobed9/EtLearn",
  },
  {
    id: 5,
    title: "GDG RippleUp",
    summary:
      "A hackathon service-booking platform with loyalty rewards, community features, and booking management, built collaboratively with API integration.",
    stack: "React, JavaScript, REST APIs",
    category: "Frontend",
    image: thumb("courses"),
    repo: "https://github.com/truketlema/GDG_HACKATON_RIPPLEUP",
  },
  {
    id: 6,
    title: "HealthHub Backend",
    summary:
      "Backend services for a hospital management platform covering patients, appointments, and medical records, with database models, business logic, and validation.",
    stack: "Python, Django, PostgreSQL",
    category: "Backend",
    image: thumb("developer-portfolio"),
  },
  {
    id: 7,
    title: "FreeCodeCamp React Projects",
    summary:
      "A set of React builds (Markdown converter, quote generator, and calculator) focused on reusable components and responsive layouts.",
    stack: "React, JavaScript, CSS",
    category: "Frontend",
    image: thumb("games"),
    repo: "https://github.com/Eyobed9/freecodecamp",
  },
  {
    id: 11,
    title: "BAS Digital Health",
    summary:
      "Personal portfolio, blog, and appointment booking platform for the CEO of TenaLink, featuring service highlights, content publishing, and integrated scheduling.",
    stack: "Next.js, TypeScript, Tailwind CSS",
    category: "Full Stack",
    image: thumb("bas-digital-health"),
    liveUrl: "https://basdigitalhealth.vercel.app",
    repo: "https://github.com/Eyobed9/basdigitalhealth",
    org: "TenaLink",
  },
] as const;
