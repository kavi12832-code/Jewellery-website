import { StoryBeat, JewelleryPiece, CategoryItem, TestimonialItem, WhyChoosePillar, CraftPillar, BoutiqueLocation } from '../types';

export const STORY_BEATS: StoryBeat[] = [
  {
    id: 'hero',
    range: [0, 0.15],
    tagline: 'NEW COLLECTION 2026',
    headline: 'Timeless Elegance, Crafted in Gold',
    subtitle: 'Each piece hand-finished by our artisans, using gold and gemstones sourced with the same care as generations before.',
    body: [
      'For over three decades, Bizjewellery has been synonymous with fine craftsmanship and timeless design.'
    ],
    alignment: 'center'
  },
  {
    id: 'craftsmanship',
    range: [0.15, 0.40],
    tagline: 'THE ART BEHIND EVERY PIECE',
    headline: 'Precision, poured by hand.',
    subtitle: 'Every Bizjewellery creation begins as a sketch and ends as a story.',
    body: [
      'Our artisans spend upward of forty hours on a single piece — casting, setting, and polishing by hand.',
      'This isn’t manufacturing. It’s craftsmanship, passed down through generations of goldsmiths.'
    ],
    alignment: 'left'
  },
  {
    id: 'gemstone',
    range: [0.40, 0.65],
    tagline: 'CERTIFIED GEMSTONES',
    headline: 'Individually selected for clarity and fire.',
    subtitle: '100% certified authentic natural stones.',
    body: [
      'Each gemstone is individually selected for its clarity and fire, then set with precision that only decades of experience can teach.',
      'No two settings are ever quite the same.'
    ],
    alignment: 'right',
    gemstoneHighlight: true
  },
  {
    id: 'finish',
    range: [0.65, 0.85],
    tagline: 'MASTER FINISH',
    headline: 'Polished to catch every light.',
    subtitle: 'Three stages of rouge polish for eternal warmth.',
    body: [
      'A final hand-polish brings out a warmth no machine can replicate.',
      'Jewellery made to be worn for generations, not seasons.'
    ],
    alignment: 'left'
  },
  {
    id: 'reassembly',
    range: [0.85, 1.0],
    tagline: 'THE BRIDAL EDIT',
    headline: 'Your wedding day deserves timeless elegance.',
    subtitle: 'Designed to be worn today, and inherited tomorrow.',
    body: [
      'Our bridal collection blends traditional craftsmanship with contemporary elegance.'
    ],
    alignment: 'center'
  }
];

export const BRAND_STORY = {
  title: 'Our Story',
  subtitle: 'Crafted once. Worn forever.',
  paragraph1: 'For over three decades, Bizjewellery has been synonymous with fine craftsmanship and timeless design. What began as a small family atelier has grown into a name trusted by generations of families for their most treasured moments — weddings, anniversaries, and milestones worth remembering forever.',
  paragraph2: 'Every piece that carries our name passes through the hands of master goldsmiths who have spent a lifetime perfecting their craft. We believe jewellery isn\'t just worn — it\'s inherited, cherished, and passed down as a story in itself.',
  stats: [
    { value: '35+', label: 'Years of Craftsmanship' },
    { value: '50,000+', label: 'Happy Customers' },
    { value: '100%', label: 'Certified Gemstones' },
    { value: '200+', label: 'Exclusive Designs' }
  ]
};

export interface CollectionCategoryMeta {
  slug: string;
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  folder: string;
  totalFrames: number;
  image: string;
  specimen: {
    tag: string;
    name: string;
    price: string;
    specs: { label: string; value: string; highlight?: boolean }[];
    buttonText: string;
  };
}

export const COLLECTIONS_DATA: Record<string, CollectionCategoryMeta> = {
  rings: {
    slug: 'rings',
    id: 'rings',
    title: 'Solitaire & Diamond Rings',
    subtitle: 'Bespoke Solitaires, Micro-Pavé Halos & Royal Sapphires',
    description: 'Imperial solitaires, micro-pavé halos, and bespoke Ceylon sapphire rings engineered for maximum refractive fire.',
    tag: '360° LIVE SOLITAIRE STUDIO',
    folder: '/ring-360',
    totalFrames: 240,
    image: '/ring-360/ezgif-frame-001.jpg',
    specimen: {
      tag: 'FEATURED 360° SPECIMEN',
      name: 'The Rosé Imperial Solitaire',
      price: '₹2,15,000',
      specs: [
        { label: 'CENTER GEMSTONE:', value: '3.20 ct Ceylon Pink Sapphire', highlight: true },
        { label: 'HALO ACCENTS:', value: '0.78 ctw D-Flawless Diamonds' },
        { label: 'METAL PURITY:', value: '18K Rose Gold (BIS 750)' },
        { label: 'CERTIFICATION:', value: 'Dual GIA & IGI Dossier', highlight: true }
      ],
      buttonText: 'Reserve Ring in Boutique'
    }
  },
  necklaces: {
    slug: 'necklaces',
    id: 'necklaces',
    title: 'Necklaces & Chokers',
    subtitle: 'Royal Nizam Polki, Zambian Emeralds & Tiered Chokers',
    description: 'Grand bridal necklaces articulated link by link in pure 22K gold with uncut Polki diamonds and Basra pearls.',
    tag: '360° LIVE ROYAL HERITAGE',
    folder: '/necklace-360',
    totalFrames: 240,
    image: '/necklace-360/ezgif-frame-001.jpg',
    specimen: {
      tag: 'FEATURED 360° SPECIMEN',
      name: 'The Nizam Royal Heritage Necklace',
      price: '₹4,85,000',
      specs: [
        { label: 'PRIMARY MOTIF:', value: 'Uncut Polki & Zambian Emeralds', highlight: true },
        { label: 'CARAT & WEIGHT:', value: '14.50 ctw Polki + 120g 22K Gold' },
        { label: 'METAL PURITY:', value: '22K Handcrafted Gold (BIS 916)' },
        { label: 'CERTIFICATION:', value: 'Dual GIA & IGI Master Certificate', highlight: true }
      ],
      buttonText: 'Reserve Necklace in Boutique'
    }
  },
  earrings: {
    slug: 'earrings',
    id: 'earrings',
    title: 'Earrings & Studs',
    subtitle: 'Temple Jhumkas, Polki Chandbalis & Solitaire Studs',
    description: 'From majestic 360° royal temple peacock jhumkas to daily brilliant diamond studs, crafted for eternal elegance.',
    tag: '360° LIVE TEMPLE JHUMKAS',
    folder: '/earrings-360',
    totalFrames: 240,
    image: '/earrings-360/ezgif-frame-001.jpg',
    specimen: {
      tag: 'FEATURED 360° SPECIMEN',
      name: 'The Mayurakshi Royal Temple Jhumkas',
      price: '₹1,65,000',
      specs: [
        { label: 'PRIMARY MOTIF:', value: 'Peacock Crown & Multi-Tier Dome', highlight: true },
        { label: 'GEMSTONES & ACCENTS:', value: 'Natural Burma Rubies & Emeralds' },
        { label: 'METAL PURITY:', value: '22K Antique Sovereign Gold (BIS 916)', highlight: true },
        { label: 'ARTICULATION:', value: 'Hand-Carved Relief & Hanging Ghungroos' }
      ],
      buttonText: 'Reserve Jhumkas in Boutique'
    }
  },
  bangles: {
    slug: 'bangles',
    id: 'bangles',
    title: 'Bangles & Kadas',
    subtitle: 'Heirloom Filigree Kadas, Ruby Bangles & Diamond Tennis Kada',
    description: 'Hand-fabricated in solid 22K gold with dual screw-pin safety hinges and certified natural gemstones.',
    tag: '360° LIVE HEIRLOOM KADAS',
    folder: '/bangles-360',
    totalFrames: 240,
    image: '/bangles-360/ezgif-frame-001.jpg',
    specimen: {
      tag: 'FEATURED 360° SPECIMEN',
      name: 'The Mayura Imperial Filigree Kadas',
      price: '₹3,45,000',
      specs: [
        { label: 'PRIMARY MOTIF:', value: 'Handcrafted Filigree & Beaded Relief', highlight: true },
        { label: 'ACCENTS & GEMS:', value: '3.80 ctw Uncut Polki & Topaz' },
        { label: 'METAL PURITY:', value: '22K Sovereign Gold (BIS 916)', highlight: true },
        { label: 'CLOSURE & SECURITY:', value: 'Dual Screw-Pin Lock & Safety Hinge' }
      ],
      buttonText: 'Reserve Kadas in Boutique'
    }
  }
};

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'rings',
    title: 'Solitaire & Diamond Rings',
    description: 'Imperial solitaires, micro-pavé halos & sapphire rings',
    tag: '360° Live Studio · 18K/22K',
    icon: 'Gem'
  },
  {
    id: 'necklaces',
    title: 'Necklaces & Chokers',
    description: 'Uncut polki diamonds & hand-articulated bridal parures',
    tag: '360° Live Studio · Uncut Polki',
    icon: 'Crown'
  },
  {
    id: 'earrings',
    title: 'Earrings & Studs',
    description: 'Temple peacock jhumkas, daily studs & chandbalis',
    tag: '360° Live Studio · Heritage Jhumkas',
    icon: 'Check'
  },
  {
    id: 'bangles',
    title: 'Bangles & Kadas',
    description: 'Handcrafted 22K gold kadas & diamond bangles',
    tag: '360° Live Studio · 22K BIS',
    icon: 'Sparkle'
  }
];

export const BRIDAL_COLLECTION: JewelleryPiece[] = [
  {
    id: 'mayurakshi-royal-temple-jhumkas',
    name: 'The Mayurakshi Royal Temple Jhumkas',
    frenchName: 'Boucles d\'Oreilles Jhumkas Royales Mayurakshi',
    category: 'Earrings & Studs',
    price: '₹1,65,000',
    gemstone: 'Natural Burma Rubies & Emerald Cabochons',
    carat: '42g Solid 22K Sovereign Gold',
    metal: '22K Antique Sovereign Gold (BIS 916)',
    description: 'Breathtaking 360° handcrafted royal temple jhumkas adorned with ruby floral studs, peacock motif crowns, and chiseled golden ghungroos.',
    story: 'Forged in pure 22-karat sovereign gold by our master karigars with traditional South Indian temple motifs, dual dome tiers, and acoustic micro-bell droplets.',
    image: '/earrings-360/ezgif-frame-001.jpg',
    specs: {
      cut: 'Cabochon & Round Faceted Rubies',
      clarity: 'Grade A Natural Untreated Gems',
      color: '22K Sovereign Antique Matte Gold & Crimson',
      origin: 'South Indian Heritage Guild',
      craftingHours: 95
    },
    features: [
      '22K 916 BIS Hallmark Guarantee',
      '360° Hand-Carved Jharokha Peacock Motifs',
      'Secure South Indian Screw-Post Closure'
    ]
  },
  {
    id: 'rose-imperial-halo-solitaire',
    name: 'The Rosé Imperial Halo Solitaire',
    frenchName: 'Bague Solitaire Saphir Rose Impérial',
    category: 'Diamond Collection',
    price: '₹2,15,000',
    gemstone: '3.20 ct Cushion Ceylon Pink Sapphire',
    carat: '3.20 Carats Center + 0.78 ct Halo',
    metal: '18K Rose Gold (BIS 750)',
    description: '3.20 carat cushion natural pink sapphire haloed by brilliant micro-pavé diamonds on a hand-chiseled 18K rose gold shank with full 360° brilliance.',
    story: 'Meticulously set in our Chennai atelier, this masterpiece showcases pure Ceylon crystal clarity, surrounded by 28 French-cut micro-pavé diamond melee.',
    image: '/ring-360/ezgif-frame-001.jpg',
    specs: {
      cut: 'Cushion Modified Brilliant',
      clarity: 'Untreated Eye-Clean Natural',
      color: 'Vivid Royal Ceylon Pink',
      origin: 'Ceylon, Sri Lanka',
      craftingHours: 110
    },
    features: [
      'BIS 750 Hallmarked 18K Rose Gold',
      'Dual GIA & IGI Certificate of Authenticity',
      '360° Micro-Pavé Gallery & Custom Sizing'
    ]
  },
  {
    id: 'royal-heritage-kundan-necklace',
    name: 'The Nizam Royal Heritage Necklace',
    frenchName: 'Collier Royal Héritage Nizam',
    category: 'Bridal Sets',
    price: '₹4,85,000',
    gemstone: 'Uncut Polki Diamonds & Zambian Emeralds',
    carat: '14.50 Carats Polki + 120g 22K Gold',
    metal: '22K Handcrafted Sovereign Gold (BIS 916)',
    description: 'Breathtaking 360° bridal masterpiece featuring hand-set uncut Polki diamonds, vivid Zambian emerald drops, and tiered Basra pearls in pure 22K gold.',
    story: 'Conceived in our master atelier, each link is hand-articulated with floral Meenakari engravings and suspended teardrop emerald briolettes.',
    image: '/necklace-360/ezgif-frame-001.jpg',
    specs: {
      cut: 'Heritage Polki & Emerald Briolette',
      clarity: 'Grade A Natural Unheated',
      color: 'Deep Sovereign Gold & Vivid Emerald Green',
      origin: 'Rajasthan & Hyderabad Royal Guild',
      craftingHours: 160
    },
    features: [
      'BIS 916 Stamped 22K Yellow Gold',
      'Dual GIA & IGI Authenticity Certificate',
      '360° Hand-Articulated Link System with Silk Dori'
    ]
  },
  {
    id: 'aurora-diamond-necklace',
    name: 'Aurora Diamond Necklace',
    frenchName: 'Collier Diamant Aurore',
    category: 'Diamond Collection',
    price: '₹1,85,000',
    gemstone: '2.5 Carat Halo Diamond Setting',
    carat: '2.5 Carats Total',
    metal: '18K Rose Gold',
    description: 'Rose gold, 2.5 carat halo setting crafted with certified diamonds reflecting radiant warmth and celestial brilliance.',
    story: 'Designed in our atelier to drape seamlessly along the neckline, hand-set with micro-pavé diamonds catching soft ambient light.',
    image: '/collection/crimson-halo-solitaire.jpg',
    specs: {
      cut: 'Ideal Cushion & Brilliant',
      clarity: 'VVS1 Certified',
      color: 'D-E Colorless',
      origin: 'Certified Ethical Sourcing',
      craftingHours: 95
    },
    features: [
      'BIS Hallmarked 18K Rose Gold',
      'Dual GIA authenticity certificate included',
      'Concealed safety lock with micro-pavé accents'
    ]
  },
  {
    id: 'heritage-temple-jhumka',
    name: 'Heritage Temple Jhumka',
    frenchName: 'Boucles d\'Oreilles Temple Héritage',
    category: 'Temple Jewellery',
    price: '₹42,900',
    gemstone: 'Natural Rubies & Carved Accents',
    carat: 'Solid 22K Gold Weight',
    metal: '22K Hand-Carved Yellow Gold',
    description: '22K gold, hand-carved detailing with traditional temple motifs and delicate hanging golden bead clusters.',
    story: 'Inspired by ancient Dravidian temple architecture, every relief carving is executed by generational artisans with miniature hand-gravers.',
    image: '/marquee/byzantine-gold-cuffs.jpg',
    specs: {
      cut: 'Hand-Carved Relief & Cabochon',
      clarity: 'Natural Gem Grade',
      color: '22K Deep Sovereign Gold',
      origin: 'South Indian Heritage Foundry',
      craftingHours: 65
    },
    features: [
      '22K 916 BIS Hallmark Stamped',
      'Traditional South Indian screw-post back',
      'Intricate filigree and antique matte finish'
    ]
  },
  {
    id: 'eternal-bridal-choker-set',
    name: 'Eternal Bridal Choker Set',
    frenchName: 'Parure Ras-de-Cou Royale Kundan',
    category: 'Bridal Sets',
    price: '₹3,25,000',
    gemstone: 'Uncut Kundan Diamonds & Basra Pearls',
    carat: 'Complete 5-Piece Bridal Set',
    metal: '24K Foil Gold & 22K Matrix',
    description: 'Gold and Kundan work, 5-piece complete bridal set including choker, matching earrings, maang tikka, and haathphool.',
    story: 'The crowning masterpiece of our bridal suite. Handcrafted over 180 hours with tiered seed pearls and foil-backed uncut gemstones.',
    image: '/marquee/kundan-royal-choker.jpg',
    specs: {
      cut: 'Traditional Polki & Cabochon',
      clarity: 'Authentic Heritage Kundan',
      color: 'Royal Ivory & 24K Gold',
      origin: 'Jaipur & Royal Atelier',
      craftingHours: 180
    },
    features: [
      'Complete 5-Piece Grand Bridal Parure',
      'Adjustable zardozi silk cord mechanism',
      'Meenakari floral enamel on reverse side'
    ]
  },
  {
    id: 'petal-diamond-studs',
    name: 'Petal Diamond Studs',
    frenchName: 'Puces Diamants Pétale',
    category: 'Earrings & Studs',
    price: '₹28,500',
    gemstone: '0.5 Carat Total Brilliant Diamonds',
    carat: '0.50 Carats Total',
    metal: '18K White Gold',
    description: '18K white gold, 0.5 carat total brilliant cut diamonds arranged in a delicate organic floral petal silhouette.',
    story: 'Engineered for everyday luxury and effortless comfort, weighted perfectly to sit flush against the earlobe with dazzling fire.',
    image: '/collection/eternite-diamond-bracelet.jpg',
    specs: {
      cut: 'Round Brilliant Triple Ex',
      clarity: 'VVS2 Eye-Clean',
      color: 'F Color',
      origin: 'Conflict-Free Certified',
      craftingHours: 40
    },
    features: [
      '18K 750 BIS Hallmark Certificate',
      'Secure screw-back locking mechanism',
      'Rhodium plated for lasting high specular shine'
    ]
  },
  {
    id: 'nocturne-sapphire-ring',
    name: 'Nocturne Sapphire Solitaire',
    frenchName: 'Bague Solitaire Saphir Bleu',
    category: 'Diamond Collection',
    price: '₹1,45,000',
    gemstone: '4.5 ct Natural Blue Sapphire',
    carat: '4.5 Carats Center Stone',
    metal: 'Platinum & 18K White Gold',
    description: 'Royal velvet blue sapphire encircled by micro-pavé brilliant diamonds on a sleek knife-edge band.',
    story: 'Unheated Ceylon natural sapphire capturing deep midnight ocean shades with exceptional refractive light dispersion.',
    image: '/collection/sapphire-nocturne-ring.jpg',
    specs: {
      cut: 'Oval Modified Mixed Cut',
      clarity: 'Untreated Natural Eye-Clean',
      color: 'Deep Midnight Royal Blue',
      origin: 'Ceylon Sri Lanka',
      craftingHours: 85
    },
    features: [
      'BIS Hallmarked Platinum & Gold',
      'Accompanied by Gemological Lab Dossier',
      'Bespoke custom ring sizing included'
    ]
  },
  {
    id: 'mayura-imperial-kadas',
    name: 'The Mayura Imperial Filigree Kadas',
    frenchName: 'Bracelets Kadas Mayura Or 22K',
    category: 'Bangles & Kadas',
    price: '₹3,45,000',
    gemstone: 'Uncut Polki & Champagne Topaz',
    carat: '3.80 ctw Polki + 85g 22K Gold',
    metal: '22K Sovereign Yellow Gold (BIS 916)',
    description: 'Pair of handcrafted 360° antique gold kadas featuring intricate floral filigree, micro-beaded borders and radiant hand-set gemstones.',
    story: 'Forged in pure 22-karat sovereign gold by our master karigars, each kada features intricate openwork filigree, antique matte burnishing, and double-screw safety clasps.',
    image: '/bangles-360/ezgif-frame-001.jpg',
    specs: {
      cut: 'Heritage Polki & Cushion Mixed',
      clarity: 'Natural Untreated Eye-Clean',
      color: 'Sovereign Antique Gold & Champagne Glow',
      origin: 'South Indian Royal Guild Atelier',
      craftingHours: 140
    },
    features: [
      '22K 916 BIS Hallmark Stamped',
      '360° Hand-Chiseled Filigree Work',
      'Dual Screw-Pin Safety Hinge with Velvet Case'
    ]
  },
  {
    id: 'imperial-ruby-bangles',
    name: 'Imperial Ruby Gold Bangles',
    frenchName: 'Bracelets Joncs Rubis 22K',
    category: 'Bangles & Kadas',
    price: '₹2,60,000',
    gemstone: 'Pigeon Blood Natural Rubies',
    carat: 'Pair of 2 Bangles',
    metal: '22K Hand-Crafted Yellow Gold',
    description: 'Pair of handcrafted 22K gold bangles encrusted with glowing natural rubies and chiseled beaded borders.',
    story: 'Forged in solid 22K sovereign gold, featuring traditional filigree milgrain borders and screw-pin safety hinges.',
    image: '/collection/royal-ruby-bangles.jpg',
    specs: {
      cut: 'Round Faceted Rubies',
      clarity: 'Vivid Natural Corundum',
      color: 'Deep Pigeon Blood Red',
      origin: 'Burma & Madagascar',
      craftingHours: 120
    },
    features: [
      '22K 916 BIS Hallmark Guarantee',
      'Hinged safety clasp with hidden screw lock',
      'Lifetime free polish & inspection service'
    ]
  },
  {
    id: 'byzantine-gold-cuffs',
    name: 'The Byzantine Woven Gold Kadas',
    frenchName: 'Parure Manchette & Kadas Byzance',
    category: 'Bangles & Kadas',
    price: '₹2,80,000',
    gemstone: 'Faceted Cognac & Imperial Topaz',
    carat: 'Pair of 2 Heavy Kadas',
    metal: '24K Woven Gold Mesh & 22K Core',
    description: 'Heavy antique woven gold kadas featuring intricate geometric filigree mesh and royal gemstone accents.',
    story: 'Woven with microscopic 24k gold wire mesh requiring over 190 hours of hand-filing, finished with antique patination.',
    image: '/marquee/byzantine-gold-cuffs.jpg',
    specs: {
      cut: 'Hand-Cut Faceted Topaz',
      clarity: 'Grade A Natural Gems',
      color: '24K Warm Sovereign Gold',
      origin: 'Heritage Foundry',
      craftingHours: 190
    },
    features: [
      '22K / 24K Hallmarked Dual Assay',
      'Articulated hinge opening mechanism',
      'Lifetime warranty & exchange guarantee'
    ]
  },
  {
    id: 'eternite-diamond-bracelet',
    name: 'Éternité Diamond Kada Bracelet',
    frenchName: 'Bracelet Kada Diamant Éternité',
    category: 'Bangles & Kadas',
    price: '₹1,95,000',
    gemstone: '5.50 ctw Round Brilliant Diamonds',
    carat: '5.50 Carats Total Weight',
    metal: '18K Rose & White Gold',
    description: 'Modern luxury diamond kada-bracelet handcrafted with a continuous channel of certified VVS brilliant-cut diamonds.',
    story: 'Engineered with precision hinge closure for effortless slip-on comfort and high specular light refraction.',
    image: '/collection/eternite-diamond-bracelet.jpg',
    specs: {
      cut: 'Round Brilliant Ideal Triple Ex',
      clarity: 'VVS1-VVS2 Eye-Clean',
      color: 'E-F Colorless',
      origin: 'Certified Conflict-Free',
      craftingHours: 75
    },
    features: [
      'BIS 750 Hallmarked 18K Gold',
      'Dual GIA & IGI Diamond Certificate',
      'Double push-button safety clasp'
    ]
  }
];

export const CRAFTSMANSHIP_SECTION = {
  title: 'The Art Behind Every Piece',
  body: 'Every Bizjewellery creation begins as a sketch and ends as a story. Our artisans spend upward of forty hours on a single piece — casting, setting, and polishing by hand. Each gemstone is individually selected for its clarity and fire, then set with precision that only decades of experience can teach.\n\nThis isn\'t manufacturing. It\'s craftsmanship, passed down through generations of goldsmiths who treat every piece as their finest work.',
  steps: [
    {
      number: '01',
      title: 'Design',
      description: 'Sketched and modeled with precision'
    },
    {
      number: '02',
      title: 'Craft',
      description: 'Hand-set by master artisans'
    },
    {
      number: '03',
      title: 'Finish',
      description: 'Polished to catch every light'
    }
  ]
};

export const BRIDAL_SECTION = {
  title: 'The Bridal Edit',
  body: 'Your wedding day deserves jewellery as timeless as the promise you\'re making. Our bridal collection blends traditional craftsmanship with contemporary elegance — designed to be worn today, and inherited tomorrow.',
  cta: 'Explore Bridal Collection'
};

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    quote: 'The detailing on my wedding set was beyond anything I imagined. Every piece felt like it was made just for me.',
    author: 'Priya R.',
    location: 'Chennai'
  },
  {
    id: 'test-2',
    quote: 'Bizjewellery has been my family\'s jeweller for three generations. The trust and quality never change.',
    author: 'Suresh K.',
    location: 'Coimbatore'
  },
  {
    id: 'test-3',
    quote: 'The 360° studio gave me complete confidence before purchasing our solitaire. Exceptional craftsmanship and packaging.',
    author: 'Ananya & Rohit S.',
    location: 'Bangalore'
  },
  {
    id: 'test-4',
    quote: 'The antique Mayurakshi temple jhumkas we ordered were an absolute masterpiece. The 360° craftsmanship in pure 22K gold exceeded all expectations.',
    author: 'Dr. Radhika & Narayanan V.',
    location: 'Hyderabad'
  },
  {
    id: 'test-5',
    quote: 'From custom bridal sketches to the final heirloom choker, the master artisans delivered beyond our highest expectations.',
    author: 'Kavitha & Vikram M.',
    location: 'Mumbai'
  },
  {
    id: 'test-6',
    quote: 'I was nervous about bespoke jewellery commissioning, but their concierge guidance and BIS certifications made it seamless.',
    author: 'Meena V.',
    location: 'Chennai'
  }
];

export const WHY_CHOOSE_US: WhyChoosePillar[] = [
  {
    title: 'Certified Quality',
    description: 'Every gemstone comes with authenticity certification',
    icon: 'ShieldCheck'
  },
  {
    title: 'Lifetime Exchange',
    description: 'Exchange your gold jewellery anytime, hassle-free',
    icon: 'RotateCcw'
  },
  {
    title: 'Handcrafted Excellence',
    description: 'Every piece made by skilled artisans, not machines',
    icon: 'Award'
  },
  {
    title: 'Trusted Since 1990',
    description: 'Three decades of trust across generations',
    icon: 'Clock'
  }
];

export const STORE_LOCATION = {
  title: 'Visit Us',
  body: 'Experience our collections in person at our flagship showroom. Our design consultants are available to help you find the perfect piece — or create one uniquely yours.',
  address: '123 Anna Salai, Chennai, Tamil Nadu 600002',
  phone: '+91 98765 43210',
  email: 'hello@bizjewellery.com',
  hours: 'Mon–Sat, 10:00 AM – 8:00 PM'
};

export const BOUTIQUES: BoutiqueLocation[] = [
  {
    city: 'Chennai',
    district: 'Anna Salai Flagship',
    address: '123 Anna Salai, Chennai, Tamil Nadu 600002',
    country: 'India',
    hours: 'Mon–Sat: 10:00 AM – 8:00 PM',
    concierge: 'Senior Consultant Desk',
    phone: '+91 98765 43210'
  },
  {
    city: 'Bangalore',
    district: 'Lavelle Road Salon',
    address: '45 Lavelle Road, Bangalore, Karnataka 560001',
    country: 'India',
    hours: 'Mon–Sat: 10:30 AM – 8:00 PM',
    concierge: 'Bespoke Bridal Desk',
    phone: '+91 98765 43211'
  },
  {
    city: 'Coimbatore',
    district: 'Race Course Road',
    address: '18 Race Course Road, Coimbatore, Tamil Nadu 641018',
    country: 'India',
    hours: 'Mon–Sat: 10:00 AM – 7:30 PM',
    concierge: 'Heritage Jewellery Desk',
    phone: '+91 98765 43212'
  },
  {
    city: 'Hyderabad',
    district: 'Banjara Hills',
    address: 'Road No. 10, Banjara Hills, Hyderabad 500034',
    country: 'India',
    hours: 'Mon–Sat: 10:30 AM – 8:00 PM',
    concierge: 'Bridal Salon',
    phone: '+91 98765 43213'
  },
  {
    city: 'Mumbai',
    district: 'Bandra West',
    address: 'Turner Road, Bandra West, Mumbai 400050',
    country: 'India',
    hours: 'Mon–Sat: 11:00 AM – 8:30 PM',
    concierge: 'Diamond Lounge',
    phone: '+91 98765 43214'
  }
];
