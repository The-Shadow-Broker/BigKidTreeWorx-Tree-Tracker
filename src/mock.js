/* Hardcoded sample data — purely so the skeleton looks real.
   Replace with your Firestore reads. No shape is load-bearing here. */

export const WORK_TYPE_LABELS = {
  removal: 'Removal',
  pruning: 'Pruning',
  stump_grinding: 'Stump grinding',
  deadwooding: 'Deadwooding',
  crown_reduction: 'Crown reduction',
  cabling: 'Cabling',
  storm_emergency: 'Storm / emergency',
  haul_away: 'Haul-away',
  lot_clearing: 'Lot clearing',
  other: 'Other',
};

export const WORK_TYPE_ORDER = [
  'removal', 'pruning', 'stump_grinding', 'deadwooding',
  'crown_reduction', 'cabling', 'storm_emergency', 'haul_away',
  'lot_clearing', 'other',
];

export const customers = [
  { id: 'c1', name: 'Dale Whitaker', phone: '(555) 010-2233', address: '14 Cedar Hollow Rd', initials: 'DW' },
  { id: 'c2', name: 'Priya Anand', phone: '(555) 884-1190', address: '202 Maple Court', initials: 'PA' },
  { id: 'c3', name: 'Marcus Bell', phone: '(555) 771-3380', address: '8 Ridgeline Dr', initials: 'MB' },
  { id: 'c4', name: 'Susan Okafor', phone: '(555) 226-7741', address: '51 Birchwood Ln', initials: 'SO' },
  { id: 'c5', name: 'Tom Reyes', phone: '(555) 909-1145', address: '300 Oak Street', initials: 'TR' },
];

/* jobs grouped for the schedule. scheduledDate null => pool */
export const scheduledDays = [
  {
    date: 'Mon, Jun 8', count: 2, over: false,
    jobs: [
      { id: 'j1', customer: 'Dale Whitaker', initials: 'DW', work: 'Removal · Stump grinding', tone: 'green' },
      { id: 'j2', customer: 'Priya Anand', initials: 'PA', work: 'Pruning', tone: 'blue' },
    ],
  },
  {
    date: 'Tue, Jun 9', count: 4, over: true,
    jobs: [
      { id: 'j3', customer: 'Marcus Bell', initials: 'MB', work: 'Storm cleanup', tone: 'amber' },
      { id: 'j4', customer: 'Susan Okafor', initials: 'SO', work: 'Crown reduction', tone: 'green' },
      { id: 'j5', customer: 'Tom Reyes', initials: 'TR', work: 'Deadwooding · Haul-away', tone: 'green' },
      { id: 'j6', customer: 'Ada Nwosu', initials: 'AN', work: 'Cabling', tone: 'blue' },
    ],
  },
  {
    date: 'Thu, Jun 11', count: 1, over: false,
    jobs: [
      { id: 'j7', customer: 'Greg Salas', initials: 'GS', work: 'Lot clearing', tone: 'amber' },
    ],
  },
];

export const poolJobs = [
  { id: 'p1', customer: 'Helen Pryce', initials: 'HP', work: 'Removal — large oak', reschedules: 3 },
  { id: 'p2', customer: 'Karl Jensen', initials: 'KJ', work: 'Pruning · Deadwooding', reschedules: 0 },
  { id: 'p3', customer: 'Rosa Lin', initials: 'RL', work: 'Stump grinding', reschedules: 1 },
  { id: 'p4', customer: 'Dev Patel', initials: 'DP', work: 'Storm / emergency', reschedules: 0 },
];

export const sampleJob = {
  id: 'j1',
  customer: 'Dale Whitaker',
  initials: 'DW',
  phone: '(555) 010-2233',
  address: '14 Cedar Hollow Rd',
  scheduledLabel: 'Scheduled · Mon, Jun 8',
  status: 'scheduled',
  work: ['removal', 'stump_grinding'],
  price: 1400,
  reschedules: 0,
  notes:
    'Dead oak in the back yard, close to the fence. Customer wants it down before the 4th. Watch the power line on the north side.',
  photoCount: 3,
};
