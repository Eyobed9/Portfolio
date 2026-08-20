"""Generate the downloadable resume served at /public/Eyobed-Demissie-Resume.pdf.

This is the source of truth for the PDF offered on the site. Edit the DATA
blocks below and re-run:

    pip install reportlab
    python docs/generate_resume.py

Keep the content in sync with src/locales/en.json so the site and the PDF
should never disagree.
"""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_JUSTIFY
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    HRFlowable,
    ListFlowable,
    ListItem,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
)

OUT = Path(__file__).resolve().parents[1] / "public" / "Eyobed-Demissie-Resume.pdf"

NAME = "EYOBED DEMISSIE"
TITLE = "Full-Stack Software Engineer &middot; Frontend &amp; Mobile"
CONTACT = (
    "Addis Ababa, Ethiopia &nbsp;&bull;&nbsp; "
    '<a href="mailto:eyobedteshome@gmail.com" color="#1d4ed8">eyobedteshome@gmail.com</a>'
    " &nbsp;&bull;&nbsp; "
    '<a href="https://github.com/Eyobed9" color="#1d4ed8">github.com/Eyobed9</a>'
    " &nbsp;&bull;&nbsp; "
    '<a href="https://www.linkedin.com/in/eyobed-d-249634230/" color="#1d4ed8">linkedin.com/in/eyobed-d</a>'
)

SUMMARY = (
    "Full-stack software engineer with professional contract and internship experience and "
    "strong foundations in algorithms, data structures, software design, debugging, and testing. "
    "Builds responsive, component-driven interfaces in React, Next.js, and TypeScript, and "
    "backs them with Python, Django, Nest.js, PHP, and relational databases. Cross-platform mobile "
    "work in Flutter. Completing a BSc in Computer Software Engineering (expected 2027) "
    "while shipping production features in Git-based teams."
)

EXPERIENCE = [
    {
        "role": "Frontend Developer Intern",
        "org": "IDATA Technologies &middot; Addis Ababa, Ethiopia",
        "dates": "Apr 2026 &ndash; Aug 2026",
        "bullets": [
            "Develop responsive, component-based web applications using React, Next.js, and "
            "TypeScript following clean architecture principles.",
            "Debug production issues, optimize performance, and improve code correctness, "
            "maintainability, and readability.",
            "Participate in Git-based collaborative development, code reviews, and technical "
            "discussions to maintain high engineering standards.",
            "Translate product requirements into reusable, scalable, and accessible components.",
            "Contribute to UI/UX design decisions, wireframing, and visual refinement of "
            "client-facing interfaces.",
        ],
    },
    {
        "role": "Full-Stack Web Developer",
        "org": "TenaLink &middot; Addis Ababa, Ethiopia &middot; Remote, Contract",
        "dates": "Dec 2025 &ndash; Present",
        "bullets": [
            "Deliver both front-end interfaces and back-end web services across client projects "
            "under an ongoing remote contract.",
            "Work across the stack, from component-driven UI through server-side logic "
            "and data models.",
            "Coordinate asynchronously with a distributed team, owning scope and delivery for "
            "assigned work.",
            "Contribute to UI/UX design, creating intuitive interfaces and user flows for "
            "client products.",
        ],
    },
]

PROJECTS = [
    {
        "name": "Yaayyoo Woreda Government Portal",
        "stack": "Next.js &bull; TypeScript &bull; Tailwind CSS",
        "url": "https://yayo.pro.et",
        "bullets": [
            "Official portal for the Yaayyoo Woreda administration covering public services, "
            "news, investment, and tourism. Built at IDATA Technologies.",
        ],
    },
    {
        "name": "Ethiopian Volleyball Federation Management System",
        "stack": "React &bull; TypeScript &bull; REST APIs",
        "url": "",
        "bullets": [
            "Federation administration platform handling team and athlete registration, "
            "tournament scheduling, and match coordination. Built at IDATA Technologies.",
        ],
    },
    {
        "name": "Oromia Smart Agriculture Platform",
        "stack": "React &bull; TypeScript &bull; Data Visualization",
        "url": "",
        "bullets": [
            "Agricultural big data platform built with Ethio Telecom and the Agricultural "
            "Transformation Institute. Built at IDATA Technologies.",
        ],
    },
    {
        "name": "BAS Digital Health",
        "stack": "Next.js &bull; TypeScript &bull; Tailwind CSS",
        "url": "https://basdigitalhealth.vercel.app",
        "bullets": [
            "Portfolio, blog, and appointment booking platform for the CEO of TenaLink, "
            "featuring service highlights, content publishing, and integrated scheduling.",
        ],
    },
    {
        "name": "EtCom: Ethiopian E-Commerce Platform",
        "stack": "Next.js &bull; JavaScript &bull; Tailwind CSS",
        "url": "https://github.com/Eyobed9/EtCom",
        "bullets": [
            "Built a responsive storefront with product listings, shopping cart, and checkout, "
            "adapted for the local market.",
        ],
    },
]

EDUCATION = [
    {
        "degree": "B.Sc. Computer Software Engineering",
        "school": "Addis Ababa Science &amp; Technology University",
        "dates": "May 2022 &ndash; Expected 2027",
        "detail": "Relevant coursework: Algorithms &amp; Data Structures, Database Systems, "
        "Software Engineering, Web Development, Object-Oriented Programming, System Analysis.",
    },
    {
        "degree": "B.A. Pastoral Leadership",
        "school": "Hanania Theological College",
        "dates": "Feb 2024 &ndash; Jan 2026",
        "detail": "Coursework in Biblical Studies, Theology, Pastoral Care &amp; Counseling, "
        "Church Leadership &amp; Administration, Christian Ethics, Leadership Development, "
        "and Missiology.",
    },
]

SKILLS = [
    ("Frontend", "JavaScript, TypeScript, React, Next.js, Tailwind CSS, Bootstrap, HTML, CSS"),
    ("Backend", "Python, Django, Nest.js, PHP, SQL, MySQL, PostgreSQL, SQLite, REST APIs"),
    ("Mobile", "Flutter, Dart"),
    ("DevOps", "Docker, Linux, CI/CD"),
    ("Languages", "Python, JavaScript/TypeScript, PHP, SQL, Java, C++"),
    ("Testing &amp; Tools", "Jest, PyTest, Git, GitHub, Figma, Vercel, Networking, System Engineering"),
    ("Practices", "Clean architecture, code review, responsive design, accessibility, debugging"),
    (
        "Soft Skills",
        "Collaboration &amp; Teamwork, Communication, Adaptability, Attention to Detail, "
        "Self-Motivation, Project Planning &amp; Organization, Problem-Solving &amp; Critical "
        "Thinking, Time Management",
    ),
]

CERTIFICATIONS = [
    "CS50&rsquo;s Web Programming with Python and JavaScript &middot; Harvard University (edX), Aug 2023",
    "CS50&rsquo;s Introduction to Computer Science &middot; Harvard University (edX), 2023",
    "ProDev: Front-End Development &middot; ALX Africa, Oct 2025",
    "Professional Foundations &middot; ALX Africa, Apr 2025",
    "React Web Development &middot; Google Developer Groups, Jun 2025",
    "Web Development &middot; Sololearn, Nov 2023",
    "Angular &middot; Sololearn, Jan 2024",
    "Python Intermediate &middot; Sololearn, Aug 2024",
    "Cisco CCNA &middot; AASTU Cisco Networking Academy, Apr 2026",
    "Systems Engineering: System Architecture &amp; Design &middot; Percipio, Demera",
]

INK = colors.HexColor("#0f172a")
MUTED = colors.HexColor("#475569")
ACCENT = colors.HexColor("#1d4ed8")
RULE = colors.HexColor("#cbd5e1")

base = getSampleStyleSheet()

S = {
    "name": ParagraphStyle(
        "name", parent=base["Title"], fontName="Helvetica-Bold", fontSize=22,
        leading=26, textColor=INK, alignment=0, spaceAfter=2,
    ),
    "title": ParagraphStyle(
        "title", parent=base["Normal"], fontName="Helvetica", fontSize=11,
        leading=14, textColor=ACCENT, spaceAfter=4,
    ),
    "contact": ParagraphStyle(
        "contact", parent=base["Normal"], fontName="Helvetica", fontSize=9,
        leading=12, textColor=MUTED, spaceAfter=10,
    ),
    "h2": ParagraphStyle(
        "h2", parent=base["Heading2"], fontName="Helvetica-Bold", fontSize=10.5,
        leading=13, textColor=INK, spaceBefore=10, spaceAfter=3,
    ),
    "role": ParagraphStyle(
        "role", parent=base["Normal"], fontName="Helvetica-Bold", fontSize=10.5,
        leading=13, textColor=INK, spaceAfter=0,
    ),
    "meta": ParagraphStyle(
        "meta", parent=base["Normal"], fontName="Helvetica-Oblique", fontSize=9,
        leading=12, textColor=MUTED, spaceAfter=3,
    ),
    "body": ParagraphStyle(
        "body", parent=base["Normal"], fontName="Helvetica", fontSize=9.3,
        leading=12.6, textColor=MUTED, alignment=TA_JUSTIFY,
    ),
    "bullet": ParagraphStyle(
        "bullet", parent=base["Normal"], fontName="Helvetica", fontSize=9.3,
        leading=12.6, textColor=MUTED,
    ),
}


def rule():
    return HRFlowable(width="100%", thickness=0.7, color=RULE,
                      spaceBefore=1, spaceAfter=5)


def bullets(items):
    return ListFlowable(
        [ListItem(Paragraph(b, S["bullet"]), leftIndent=12) for b in items],
        bulletType="bullet", bulletChar="\u2022", bulletFontSize=7,
        leftIndent=12, bulletOffsetY=1, spaceAfter=4,
    )


def build():
    OUT.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(OUT), pagesize=LETTER,
        leftMargin=0.62 * inch, rightMargin=0.62 * inch,
        topMargin=0.55 * inch, bottomMargin=0.5 * inch,
        title=f"{NAME.title()} - Resume", author=NAME.title(),
        subject="Full-Stack Software Engineer",
    )

    story = [
        Paragraph(NAME, S["name"]),
        Paragraph(TITLE, S["title"]),
        Paragraph(CONTACT, S["contact"]),
        Paragraph("PROFESSIONAL SUMMARY", S["h2"]), rule(),
        Paragraph(SUMMARY, S["body"]),
        Paragraph("PROFESSIONAL EXPERIENCE", S["h2"]), rule(),
    ]

    for job in EXPERIENCE:
        story.append(Paragraph(job["role"], S["role"]))
        story.append(Paragraph(f'{job["org"]}  |  {job["dates"]}', S["meta"]))
        story.append(bullets(job["bullets"]))

    story += [Paragraph("SELECTED PROJECTS", S["h2"]), rule()]
    for proj in PROJECTS:
        story.append(Paragraph(proj["name"], S["role"]))
        meta = proj["stack"]
        if proj["url"]:
            meta += f'  |  <a href="{proj["url"]}" color="#1d4ed8">{proj["url"].replace("https://", "")}</a>'
        story.append(Paragraph(meta, S["meta"]))
        story.append(bullets(proj["bullets"]))

    story += [Paragraph("EDUCATION", S["h2"]), rule()]
    for edu in EDUCATION:
        story.append(Paragraph(edu["degree"], S["role"]))
        story.append(Paragraph(f'{edu["school"]}  |  {edu["dates"]}', S["meta"]))
        story.append(Paragraph(edu["detail"], S["body"]))
        story.append(Spacer(1, 2))

    story += [Paragraph("TECHNICAL SKILLS", S["h2"]), rule()]

    for label, items in SKILLS:
        story.append(Paragraph(f"<b>{label}:</b> {items}", S["body"]))
        story.append(Spacer(1, 1.5))

    story += [Paragraph("CERTIFICATIONS", S["h2"]), rule(), bullets(CERTIFICATIONS)]

    doc.build(story)
    print(f"wrote {OUT} ({OUT.stat().st_size:,} bytes)")


if __name__ == "__main__":
    build()
