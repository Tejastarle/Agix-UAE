// Marketing content — sourced from the real AGIX website.

export type Service = {
  slug: string;
  icon: string;
  title: string;
  blurb: string;
  points: string[];
  href?: string;
};

// All services offered by AGIX.
export const services: Service[] = [
  {
    slug: 'digital-marketing',
    icon: 'Megaphone',
    title: 'Digital Marketing',
    blurb:
      'Transform your online presence and drive business growth with comprehensive, data-driven digital marketing strategies.',
    points: ['SEO & SEM', 'Social media marketing', 'Performance ads', 'Email & WhatsApp'],
  },
  {
    slug: 'website-development',
    icon: 'Code2',
    title: 'Website Development',
    blurb:
      'Build a stunning, responsive website that delivers an excellent user experience and converts visitors into customers.',
    points: ['Responsive builds', 'CMS & headless', 'Speed & SEO', 'Maintenance'],
  },
  {
    slug: 'branding-communication',
    icon: 'Sparkles',
    title: 'Digital Branding & Communication',
    blurb:
      'Build a strong, cohesive brand identity and communicate effectively with your audience across every channel.',
    points: ['Brand identity', 'Strategy', 'Messaging', 'Campaigns'],
  },
  {
    slug: 'ecommerce-development',
    icon: 'ShoppingCart',
    title: 'Ecommerce Development',
    blurb:
      'Robust, user-friendly e-commerce platforms that drive sales and enhance customer satisfaction.',
    points: ['Shopify & Woo', 'Custom stores', 'Payments', 'Conversion optimisation'],
  },
  {
    slug: 'ui-ux',
    icon: 'PenTool',
    title: 'UI/UX Design',
    blurb:
      'Enhance user satisfaction and engagement with expert UI/UX design that is as usable as it is beautiful.',
    points: ['Research', 'Wireframes', 'Prototypes', 'Design systems'],
  },
  {
    slug: 'vfx',
    icon: 'Clapperboard',
    title: 'VFX',
    blurb:
      'Bring your creative vision to life with cutting-edge visual effects that captivate your audience.',
    points: ['Compositing', 'Motion graphics', 'Simulation', 'Colour & finishing'],
  },
  {
    slug: 'video-animation',
    icon: 'Film',
    title: 'Video Animation',
    blurb:
      'Engage your audience and tell your story with professional 2D/3D video animation and explainers.',
    points: ['Explainers', '2D & 3D', 'Motion design', 'Storyboarding'],
  },
  {
    slug: 'media-production',
    icon: 'Camera',
    title: 'Media Production',
    blurb:
      'End-to-end media production — from concept and shoot to edit and delivery — for brands that want to stand out.',
    points: ['Photography', 'Videography', 'Post-production', 'Reels & ads'],
  },
  {
    slug: 'cyber-security',
    icon: 'ShieldCheck',
    title: 'Cybersecurity',
    blurb:
      'VAPT, red teaming, cloud and OT security, 24x7 SOC monitoring and ISO 27001 / SOC 2 compliance — led by senior consultants.',
    points: ['VAPT & red teaming', 'Cloud & IoT security', 'SOC monitoring', 'Compliance & GRC'],
    href: '/cybersecurity',
  },
];

export const stats = [
  { value: '10+', label: 'Years of expertise' },
  { value: '150+', label: 'Projects delivered' },
  { value: '50+', label: 'Happy clients' },
  { value: '2', label: 'Countries (UAE & India)' },
];

export const process = [
  { title: 'Discover', desc: 'We start with research — your market, audience and goals — to find the real opportunity.' },
  { title: 'Strategy', desc: 'We shape a clear, measurable plan across brand, channels and always-on activity.' },
  { title: 'Create', desc: 'Design, build and produce — from websites and campaigns to video and VFX.' },
  { title: 'Grow', desc: 'We launch, measure and optimise, turning results into compounding growth.' },
];

// Real client names from the AGIX portfolio (logos in /images/clients).
export const clients = [
  { name: 'Sharjah Cricket', file: 'sharjah-cricket.png' },
  { name: 'Bhavani Group', file: 'bhavani-group.png' },
  { name: 'Rematco Energy', file: 'rematco-energy.png' },
  { name: 'Soar Impex', file: 'soar-impex.png' },
  { name: 'Trumax', file: 'trumax.png' },
  { name: 'Rigelco ', file: 'rigelco-.png' },
  { name: 'AK Fitness', file: 'ak-fitness.png' },
  { name: 'Omkar Planet', file: 'omkar-planet.png' },
  { name: 'Brew House Cafe', file: 'brew-house-cafe.png' },
  { name: 'Young Chilli', file: 'young-chilli.png' },
];

// Real testimonials from the AGIX site.
export const testimonials = [
  {
    quote:
      'This agency is a true partner. They take the time to understand our business goals and work closely with us to achieve them. They are responsive, reliable, and truly care about our success.',
    name: 'Soorya Kiran',
    role: 'Media Manager',
    company: 'Sharjah Cricket',
  },
  {
    quote:
      'We have worked with this agency for several years and have been consistently impressed with their expertise and professionalism. They are creative, proactive, and always deliver exceptional results.',
    name: 'Kiran Chadane',
    role: 'Manager',
    company: 'Bhavani Group',
  },
  {
    quote:
      'I highly recommend this agency for their exceptional digital marketing services. They helped us revamp our social media strategy and we saw a significant increase in engagement and followers.',
    name: 'Praveen',
    role: 'CEO',
    company: 'Transharbour',
  },
  {
    quote:
      'The team is knowledgeable, professional, and always goes above and beyond. They helped us increase our website traffic and improve our conversion rates.',
    name: 'Emanual',
    role: 'CEO',
    company: 'Rematco Energy',
  },
];

// For the contact form service dropdown.
export const serviceOptions = [
  'Digital Marketing',
  'Website Development',
  'Ecommerce Development',
  'Cybersecurity / VAPT',
  'Branding & Multimedia Design',
  'UI/UX Design',
  'Social Media Marketing',
  'VFX & Video Animation',
];
