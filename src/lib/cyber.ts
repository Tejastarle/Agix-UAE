// Condensed from the "AGIX — Cybersecurity Services Profile 2026".

export type CyberService = {
  icon: string;
  title: string;
  points: string[];
};

export const cyberServices: CyberService[] = [
  {
    icon: 'Globe',
    title: 'Web & API Security Testing',
    points: [
      'Web application VAPT',
      'REST / GraphQL API testing',
      'Business-logic & auth flaws',
      'OWASP Top 10 & ASVS',
    ],
  },
  {
    icon: 'Smartphone',
    title: 'Mobile Application Security',
    points: [
      'Android & iOS pentesting',
      'Mobile API & backend',
      'Reverse engineering',
      'Insecure storage review',
    ],
  },
  {
    icon: 'Cloud',
    title: 'Cloud Security Assessment',
    points: [
      'AWS / Azure / GCP review',
      'IAM & zero-trust',
      'Containers & Kubernetes',
      'CSPM & misconfig audits',
    ],
  },
  {
    icon: 'Server',
    title: 'Network & Infrastructure VAPT',
    points: [
      'External & internal pentest',
      'Wireless security',
      'Firewall, VPN & perimeter',
      'Server & endpoint hardening',
    ],
  },
  {
    icon: 'Crosshair',
    title: 'Red Team Assessment',
    points: [
      'Real-world adversary simulation',
      'Social engineering & phishing',
      'Physical security testing',
      'Purple-team collaboration',
    ],
  },
  {
    icon: 'Cpu',
    title: 'IoT & Product Security',
    points: [
      'Embedded firmware testing',
      'Hardware & chip-level',
      'BLE / Zigbee / RF protocols',
      'Product security assurance',
    ],
  },
  {
    icon: 'Factory',
    title: 'Critical Infrastructure & OT/ICS',
    points: [
      'SCADA / ICS assessment',
      'OT network segmentation',
      'Automotive & CAN-bus',
      'Industry 4.0 security',
    ],
  },
  {
    icon: 'BrainCircuit',
    title: 'AI / ML Security Audit',
    points: [
      'LLM & GenAI model testing',
      'Adversarial ML & evasion',
      'Data poisoning & privacy',
      'AI governance review',
    ],
  },
  {
    icon: 'GitBranch',
    title: 'DevSecOps & Code Review',
    points: [
      'CI/CD pipeline security',
      'SAST / DAST / SCA',
      'Manual secure code review',
      'Infrastructure-as-Code review',
    ],
  },
  {
    icon: 'Radar',
    title: 'SOC & Managed Detection',
    points: [
      '24x7 threat monitoring',
      'SIEM / SOAR setup',
      'Threat hunting & dark web',
      'Vulnerability management',
    ],
  },
  {
    icon: 'Search',
    title: 'Digital Forensics & IR',
    points: [
      'Breach investigation',
      'Malware & ransomware analysis',
      'Evidence handling',
      'Incident response retainer',
    ],
  },
  {
    icon: 'ClipboardCheck',
    title: 'GRC, Compliance & Training',
    points: [
      'ISO 27001 / SOC 2 / PCI-DSS / GDPR',
      'Risk assessment & audits',
      'Regulatory mapping',
      'Security awareness training',
    ],
  },
];

export const methodology = [
  {
    title: 'Scoping & threat profiling',
    desc: 'Scope, assets and threat model defined; timeline and fixed-price proposal within 48 hours.',
  },
  {
    title: 'Recon & attack-surface mapping',
    desc: 'Asset discovery, architecture review and attack-surface enumeration.',
  },
  {
    title: 'Manual testing & exploitation',
    desc: 'Deep manual testing beyond automated scans, validating real-world exploitability.',
  },
  {
    title: 'Reporting & risk rating',
    desc: 'Detailed findings with CVSS scoring, business impact and clear remediation guidance.',
  },
  {
    title: 'Remediation support & retest',
    desc: 'Fix validation, free retesting and closure sign-off on every finding.',
  },
];

export const industries = [
  'IT & SaaS',
  'FinTech / BFSI',
  'Automotive',
  'MedTech / Healthcare',
  'Telecom',
  'Manufacturing / OT',
  'E-commerce & Retail',
  'Government & Public Sector',
];

export const whyAgix = [
  {
    title: 'Research-driven testing',
    desc: 'Goes beyond automated scanners to find real, exploitable risk.',
  },
  {
    title: 'Senior consultants',
    desc: 'Own delivery end-to-end, with no junior hand-offs.',
  },
  {
    title: 'Actionable reporting',
    desc: 'CVSS scoring and clear business-risk mapping.',
  },
  {
    title: 'Fixed-price, agile engagements',
    desc: 'Delivered on schedule, every time.',
  },
  {
    title: 'Free remediation retesting',
    desc: 'Closure sign-off included as standard.',
  },
  {
    title: 'Cross-domain expertise',
    desc: 'Web, mobile, cloud, IoT, OT and AI under one roof.',
  },
];

export const engagements = [
  {
    title: 'Enterprise Web & API VAPT',
    desc: 'End-to-end testing of business-critical web apps and APIs to uncover exploitable flaws before attackers do.',
  },
  {
    title: 'Cloud Security Review',
    desc: 'Configuration, IAM and workload review across AWS, Azure and GCP for a fast-scaling SaaS or FinTech platform.',
  },
  {
    title: 'IoT Product Security Audit',
    desc: 'Firmware, hardware and wireless-protocol assessment for a connected-device maker ahead of release.',
  },
  {
    title: 'Red Team Simulation',
    desc: 'Full-scope adversary simulation against an enterprise BFSI environment — people, process and technology.',
  },
  {
    title: 'OT / ICS Security Review',
    desc: 'Network segmentation and SCADA/ICS risk assessment for a manufacturing or critical-infrastructure plant.',
  },
  {
    title: 'Compliance Readiness',
    desc: 'Gap assessment and remediation roadmap toward ISO 27001 / SOC 2 for an enterprise SaaS vendor.',
  },
];

export const leadership = [
  {
    initials: 'GG',
    name: 'Gnan Ganta',
    role: 'Head – AI & Cyber Security',
    years: '30+ years',
    bio: 'OT security, critical-infrastructure protection, risk management and compliance.',
  },
  {
    initials: 'PK',
    name: 'Prasanna Kummar',
    role: 'Head – Strategy & Management',
    years: '30+ years',
    bio: 'Management, transformation, operational excellence and market expansion.',
  },
  {
    initials: 'TT',
    name: 'Tejas Tarle',
    role: 'Head – Project Management',
    years: '5+ years',
    bio: 'Software architecture, cloud & AI solutions and project delivery.',
  },
  {
    initials: 'MS',
    name: 'Manmindar Singh',
    role: 'Head – Software & AI Security',
    years: '5+ years',
    bio: 'Digital transformation, AI solutions, cloud infrastructure and automation.',
  },
  {
    initials: 'AD',
    name: 'Aditya Madur',
    role: 'Head – Data & Technology',
    years: '4+ years',
    bio: 'Full-stack, cloud-native applications, AI integration and DevOps.',
  },
  {
    initials: 'VN',
    name: 'Vinay Narkar',
    role: 'SEO & Marketing Expert',
    years: '11+ years',
    bio: 'Search optimisation, content strategy, analytics and lead generation.',
  },
];

export const cyberTestimonials = [
  {
    quote:
      'An outstanding team that combines technical excellence with reliable execution. We highly value our partnership with AGIX.',
    who: 'CEO, Birra Group',
  },
  {
    quote:
      'AGIX is a true partner. They take the time to understand our goals, and are responsive, reliable and truly care about our success.',
    who: 'Soorya Kiran, Media Manager, Sharjah Cricket',
  },
  {
    quote:
      'A reliable technology partner with excellent technical expertise and customer support. Very satisfied with the quality delivered.',
    who: 'Director, RTC Road & Traffic Engineering LLC',
  },
];

export const cyberHighlights = [
  'VAPT',
  'Red Teaming',
  'Cloud & IoT Security',
  'SOC Monitoring',
  'DFIR',
  'Compliance & GRC',
];