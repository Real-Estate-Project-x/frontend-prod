<script lang="ts">
	import BoostModal from '$lib/components/agency/view-listing/BoostModal.svelte';
	import ArchiveModal from '$lib/components/agency/view-listing/ArchiveModal.svelte';
  import AgencySidebar from '$lib/components/shared/AgencySidebar.svelte';

	// ─────────────────────────────────────────────────────────
	// Types
	// ─────────────────────────────────────────────────────────
	type ListingCategory = 'residential' | 'commercial' | 'land';

	interface ListingDetails {
		category: ListingCategory;
		bedrooms: number | null;
		toilets: number | null;
		kitchens: number | null;
		sizeSqm: number | null;
		yearBuilt: number | null;
		furnishing: string | null;
		parkingSpaces: number | null;
		broadbandSpeed: string | null;
		ceilingHeightM: number | null;
		zoning: string | null;
		accessType: string | null;
		currency: string;
		basePrice: number;
		paymentPeriod: string;
	}

	interface DetailFieldDef {
		key: keyof ListingDetails;
		label: string;
		icon: string;
		format?: (value: number | string) => string;
		show: (value: unknown) => boolean;
		span2?: boolean;
	}

	interface KpiCard {
		icon: string;
		iconBg: string;
		badgeText: string;
		badgeClass: string;
		badgeDot?: boolean;
		badgeDotColor?: string;
		value: string;
		label: string;
		barColor: string;
		barWidth: number;
	}

	interface DocFile {
		name: string;
		meta: string;
		iconBg: string;
		iconStroke: string;
		verified?: 'verified' | 'pending';
	}

	type ViewingType = 'virtual' | 'inperson';
	type ViewingTab = 'today' | 'upcoming' | 'past';

	interface Viewing {
		name: string;
		initials: string;
		avatarBg: string;
		contact: string;
		type: ViewingType;
		status: string;
		statusCss: string;
		statusDot?: boolean;
		time: string;
		primaryLabel: string;
		primaryCss: string;
	}

	type TrendRange = 7 | 30 | 90 | 0;

	interface TrendPoint {
		views: number[];
		leads: number[];
		summary: string;
	}

	interface BoostState {
		active: boolean;
		plan: string;
		startDate: string;
		expiryDate: string;
		daysTotal: number;
		daysLeft: number;
		viewsSinceBoost: number;
		pctVsPreBoost: number;
		leadsSinceBoost: number;
		viewingRequestsSinceBoost: number;
	}

	interface BoostPlanSelection {
		id: string;
		name: string;
	}

    const confirmBoost = (planId) => {
		console.log({ planId });
	}

    const confirmArchive = () => {
		console.log({ msg: 'Listing taken down.' });
	}

	// ─────────────────────────────────────────────────────────
	// Static icon markup (kept as raw SVG strings for 1:1 fidelity)
	// ─────────────────────────────────────────────────────────
	const ICONS = {
		bed: '<svg class="text-chalk-muted dark:text-[#6A7FA0] flex-shrink-0" width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M3 18V7l7-5 7 5v11H13V13H7v5z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>',
		toilet: '<svg class="text-chalk-muted dark:text-[#6A7FA0] flex-shrink-0" width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M3 10h14M17 10v3a4 4 0 01-4 4H7a4 4 0 01-4-4v-3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M5 10V5a1 1 0 011-1h2.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
		kitchen: '<svg class="text-chalk-muted dark:text-[#6A7FA0] flex-shrink-0" width="14" height="14" viewBox="0 0 20 20" fill="none"><rect x="2" y="8" width="16" height="10" rx="2" stroke="currentColor" stroke-width="1.4"/><path d="M6 8V5a4 4 0 018 0v3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
		size: '<svg class="text-chalk-muted dark:text-[#6A7FA0] flex-shrink-0" width="14" height="14" viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="16" height="16" rx="2" stroke="currentColor" stroke-width="1.4"/><path d="M7 2v16M2 7h5M2 13h5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>',
		calendar: '<svg class="text-chalk-muted dark:text-[#6A7FA0] flex-shrink-0" width="14" height="14" viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="14" rx="2" stroke="currentColor" stroke-width="1.4"/><path d="M2 8h16M6 2v4M14 2v4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
		furnish: '<svg class="text-chalk-muted dark:text-[#6A7FA0] flex-shrink-0" width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M3 11V7a2 2 0 012-2h10a2 2 0 012 2v4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><rect x="2" y="11" width="16" height="5" rx="1.5" stroke="currentColor" stroke-width="1.4"/><path d="M3 16v2M17 16v2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
		parking: '<svg class="text-chalk-muted dark:text-[#6A7FA0] flex-shrink-0" width="14" height="14" viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" stroke-width="1.4"/><path d="M7.5 14V6h3.2a2.5 2.5 0 010 5H7.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
		height: '<svg class="text-chalk-muted dark:text-[#6A7FA0] flex-shrink-0" width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M10 2v16M6 5l4-3 4 3M6 15l4 3 4-3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
		zoning: '<svg class="text-chalk-muted dark:text-[#6A7FA0] flex-shrink-0" width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M7 1C5 1 3 2.79 3 5c0 2.76 4 8 4 8s4-5.24 4-8c0-2.21-2-4-4-4z" stroke="currentColor" stroke-width="1.3"/><circle cx="7" cy="5" r="1.5" stroke="currentColor" stroke-width="1.2"/></svg>',
		access: '<svg class="text-chalk-muted dark:text-[#6A7FA0] flex-shrink-0" width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M8 2L3 18M12 2l5 16M9 8h2M8 13h4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
		wifi: '<svg class="text-chalk-muted dark:text-[#6A7FA0] flex-shrink-0" width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M2 5l8-3 8 3v7a8 8 0 01-8 5 8 8 0 01-8-5V5z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>'
	};

	// ─────────────────────────────────────────────────────────
	// Listing data model — drives the Property Details panel.
	// Swap `category` to 'land' or 'commercial' to see it adapt
	// (bedrooms/toilets/kitchens auto-hide when not relevant).
	// ─────────────────────────────────────────────────────────
	const LISTING: ListingDetails = {
		category: 'residential',
		bedrooms: 4,
		toilets: 5,
		kitchens: 2,
		sizeSqm: 420,
		yearBuilt: 2022,
		furnishing: 'Fully furnished',
		parkingSpaces: 3,
		broadbandSpeed: '100 Mbps fibre',
		ceilingHeightM: null,
		zoning: null,
		accessType: null,
		currency: '₦',
		basePrice: 3500000,
		paymentPeriod: 'Yearly'
	};

	const DETAIL_FIELD_DEFS: DetailFieldDef[] = [
		{ key: 'bedrooms', label: 'Bedrooms', icon: ICONS.bed, show: (v) => v != null && (v as number) > 0 },
		{ key: 'toilets', label: 'Toilets', icon: ICONS.toilet, show: (v) => v != null && (v as number) > 0 },
		{ key: 'kitchens', label: 'Kitchens', icon: ICONS.kitchen, show: (v) => v != null && (v as number) > 0 },
		{
			key: 'sizeSqm',
			label: 'Sq. footage',
			icon: ICONS.size,
			format: (v) => `${v} m²`,
			show: (v) => v != null && (v as number) > 0
		},
		{ key: 'yearBuilt', label: 'Year built', icon: ICONS.calendar, show: (v) => !!v },
		{ key: 'furnishing', label: 'Furnishing', icon: ICONS.furnish, show: (v) => !!v },
		{
			key: 'parkingSpaces',
			label: 'Parking',
			icon: ICONS.parking,
			format: (v) => `${v} space${v === 1 ? '' : 's'}`,
			show: (v) => v != null && (v as number) > 0
		},
		{ key: 'ceilingHeightM', label: 'Ceiling height', icon: ICONS.height, format: (v) => `${v} m`, show: (v) => !!v },
		{ key: 'zoning', label: 'Zoning', icon: ICONS.zoning, show: (v) => !!v },
		{ key: 'accessType', label: 'Road access', icon: ICONS.access, show: (v) => !!v },
		{ key: 'broadbandSpeed', label: 'Broadband', icon: ICONS.wifi, span2: true, show: (v) => !!v }
	];

	const detailChips = $derived(
		DETAIL_FIELD_DEFS.filter((f) => f.show(LISTING[f.key])).map((f) => ({
			...f,
			value: f.format ? f.format(LISTING[f.key] as never) : (LISTING[f.key] as string | number)
		}))
	);

	const KPI_CARDS: KpiCard[] = [
		{
			icon: '<svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M1 10s4-7 9-7 9 7 9 7-4 7-9 7-9-7-9-7z" stroke="#4A90E2" stroke-width="1.4"/><circle cx="10" cy="10" r="2.5" stroke="#4A90E2" stroke-width="1.4"/></svg>',
			iconBg: 'bg-blue-bright/10',
			badgeText: '↑ 12%',
			badgeClass: 'bg-sage-light text-sage dark:bg-sage/20 dark:text-[#7DBF7A]',
			value: '2,847',
			label: 'Total property views',
			barColor: 'bg-blue-bright',
			barWidth: 72
		},
		{
			icon: '<svg width="14" height="14" viewBox="0 0 20 20" fill="none"><rect x="3" y="4" width="14" height="14" rx="2" stroke="#C06035" stroke-width="1.4"/><path d="M7 2v4M13 2v4M3 9h14" stroke="#C06035" stroke-width="1.4" stroke-linecap="round"/></svg>',
			iconBg: 'bg-ember-light',
			badgeText: '2 today',
			badgeClass: 'bg-ember-light text-ember dark:bg-ember/20 dark:text-[#EDBA9B]',
			badgeDot: true,
			badgeDotColor: 'bg-ember',
			value: '18',
			label: 'Scheduled viewings',
			barColor: 'bg-ember',
			barWidth: 45
		},
		{
			icon: '<svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M3 4h14a1 1 0 011 1v8a1 1 0 01-1 1H5.5L2 16.5V5a1 1 0 011-1z" stroke="#0A2463" stroke-width="1.4" stroke-linejoin="round"/></svg>',
			iconBg: 'bg-navy-dark/8 dark:bg-white/[.06]',
			badgeText: '↑ 4',
			badgeClass: 'text-chalk-muted dark:text-[#6A7FA0] bg-chalk-2 dark:bg-white/[.06]',
			value: '64',
			label: 'Leads generated',
			barColor: 'bg-navy-dark dark:bg-navy-accent',
			barWidth: 60
		},
		{
			icon: '<svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M10 2l1.5 4.5H16l-3.7 2.7 1.4 4.3L10 11.1 6.3 13.5l1.4-4.3L4 6.5h4.5z" stroke="#D4AE3A" stroke-width="1.3" stroke-linejoin="round"/></svg>',
			iconBg: 'bg-gold/15',
			badgeText: '↑ 9',
			badgeClass: 'text-chalk-muted dark:text-[#6A7FA0] bg-chalk-2 dark:bg-white/[.06]',
			value: '143',
			label: 'Saves / wishlist',
			barColor: 'bg-gold',
			barWidth: 55
		}
	];

	const ARCHITECTURAL_PLANS: DocFile[] = [
		{ name: 'Ground floor plan', meta: 'PDF · 2.4 MB', iconBg: 'bg-blue-bright/10', iconStroke: '#4A90E2' },
		{ name: 'First floor plan', meta: 'PDF · 1.9 MB', iconBg: 'bg-sage-light', iconStroke: '#4A7848' },
		{ name: 'Roof plan', meta: 'DWG · 3.1 MB', iconBg: 'bg-ember-light', iconStroke: '#C06035' }
	];

	const OWNERSHIP_DOCS: DocFile[] = [
		{
			name: 'Certificate of Occupancy',
			meta: 'PDF · Verified · 1.2 MB',
			iconBg: 'bg-navy-dark/8 dark:bg-white/[.06]',
			iconStroke: '#0A2463',
			verified: 'verified'
		},
		{
			name: 'Deed of Assignment',
			meta: 'PDF · Verified · 0.9 MB',
			iconBg: 'bg-navy-dark/8 dark:bg-white/[.06]',
			iconStroke: '#0A2463',
			verified: 'verified'
		},
		{
			name: 'Survey Plan',
			meta: 'PDF · Pending review · 2.1 MB',
			iconBg: 'bg-gold/15',
			iconStroke: '#D4AE3A',
			verified: 'pending'
		},
		{
			name: 'Building Approval',
			meta: 'PDF · Verified · 1.7 MB',
			iconBg: 'bg-navy-dark/8 dark:bg-white/[.06]',
			iconStroke: '#0A2463',
			verified: 'verified'
		}
	];

	const VIEWINGS: Record<ViewingTab, Viewing[]> = {
		today: [
			{
				name: 'Chidi Ibe',
				initials: 'CI',
				avatarBg: 'bg-navy-strong',
				contact: 'chidi.ibe@email.com · 08011234567',
				type: 'virtual',
				status: 'Confirmed',
				statusCss: 'bg-sage-light text-sage dark:bg-sage/20 dark:text-[#7DBF7A]',
				time: '10:00 AM – 11:00 AM',
				primaryLabel: 'Start virtual',
				primaryCss: 'bg-blue-bright hover:bg-blue-link'
			},
			{
				name: 'Ngozi Kalu',
				initials: 'NK',
				avatarBg: 'bg-ember',
				contact: 'ngozi.kalu@email.com · 08091234567',
				type: 'inperson',
				status: 'Pending',
				statusCss: 'bg-ember-light text-ember dark:bg-ember/20 dark:text-[#EDBA9B]',
				statusDot: true,
				time: '2:00 PM – 3:30 PM',
				primaryLabel: 'Confirm',
				primaryCss: 'bg-navy-dark dark:bg-navy-accent hover:opacity-90'
			}
		],
		upcoming: [
			{
				name: 'Femi Adeyemi',
				initials: 'FA',
				avatarBg: 'bg-navy-accent',
				contact: 'femi.a@email.com · 08023456789',
				type: 'inperson',
				status: 'Confirmed',
				statusCss: 'bg-sage-light text-sage dark:bg-sage/20 dark:text-[#7DBF7A]',
				time: 'Thu 8 May · 11:00 AM',
				primaryLabel: 'View details',
				primaryCss: 'bg-navy-dark dark:bg-navy-accent hover:opacity-90'
			},
			{
				name: 'Bisi Okon',
				initials: 'BO',
				avatarBg: 'bg-gold',
				contact: 'bisi.okon@email.com · 08034567890',
				type: 'virtual',
				status: 'Confirmed',
				statusCss: 'bg-sage-light text-sage dark:bg-sage/20 dark:text-[#7DBF7A]',
				time: 'Sat 10 May · 4:00 PM',
				primaryLabel: 'View details',
				primaryCss: 'bg-navy-dark dark:bg-navy-accent hover:opacity-90'
			}
		],
		past: [
			{
				name: 'Tunde Bakare',
				initials: 'TB',
				avatarBg: 'bg-chalk-4 dark:bg-white/10',
				contact: 'tunde.b@email.com · 08045678901',
				type: 'inperson',
				status: 'Completed',
				statusCss: 'bg-chalk-2 text-chalk-muted dark:bg-white/[.08] dark:text-[#6A7FA0]',
				time: 'Mon 28 Apr · 1:00 PM',
				primaryLabel: 'View notes',
				primaryCss: 'bg-chalk-2 dark:bg-white/[.08] text-navy-dark dark:text-blue-100 hover:bg-chalk-3'
			},
			{
				name: 'Amara Kalu',
				initials: 'AK',
				avatarBg: 'bg-navy-strong',
				contact: 'amara.k@email.com · 08056789012',
				type: 'virtual',
				status: 'No-show',
				statusCss: 'bg-ember-light text-ember dark:bg-ember/20 dark:text-[#EDBA9B]',
				time: 'Fri 25 Apr · 9:30 AM',
				primaryLabel: 'View notes',
				primaryCss: 'bg-chalk-2 dark:bg-white/[.08] text-navy-dark dark:text-blue-100 hover:bg-chalk-3'
			},
			{
				name: 'Segun Ojo',
				initials: 'SO',
				avatarBg: 'bg-ember',
				contact: 'segun.ojo@email.com · 08067890123',
				type: 'inperson',
				status: 'Completed',
				statusCss: 'bg-chalk-2 text-chalk-muted dark:bg-white/[.08] dark:text-[#6A7FA0]',
				time: 'Wed 23 Apr · 3:00 PM',
				primaryLabel: 'View notes',
				primaryCss: 'bg-chalk-2 dark:bg-white/[.08] text-navy-dark dark:text-blue-100 hover:bg-chalk-3'
			}
		]
	};

	const TYPE_BADGE: Record<ViewingType, { label: string; css: string; icon: string }> = {
		virtual: {
			label: 'Virtual',
			css: 'bg-blue-bright/10 text-blue-link dark:text-blue-bright',
			icon: '<svg width="9" height="9" viewBox="0 0 14 14" fill="none"><rect x="1" y="3" width="9" height="8" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M10 6l3-2v6l-3-2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>'
		},
		inperson: {
			label: 'In-Person',
			css: 'bg-sage-light text-sage dark:bg-sage/20 dark:text-[#7DBF7A]',
			icon: '<svg width="9" height="9" viewBox="0 0 14 14" fill="none"><path d="M7 1C5 1 3 2.79 3 5c0 2.76 4 8 4 8s4-5.24 4-8c0-2.21-2-4-4-4z" stroke="currentColor" stroke-width="1.3"/><circle cx="7" cy="5" r="1.5" stroke="currentColor" stroke-width="1.2"/></svg>'
		}
	};

	const VIEWING_TAB_LABELS: Record<ViewingTab, string> = { today: 'today', upcoming: 'upcoming', past: 'in the past' };

	const TREND_DATA: Record<TrendRange, TrendPoint> = {
		7: { views: [40, 52, 48, 61, 58, 70, 66], leads: [2, 3, 2, 4, 3, 5, 4], summary: 'Trending up 14% vs previous 7 days' },
		30: {
			views: [
				20, 25, 22, 30, 28, 35, 33, 38, 36, 42, 40, 46, 44, 48, 45, 50, 49, 53, 52, 57, 55, 60, 58, 63, 61, 65, 63, 68,
				66, 70
			],
			leads: [1, 1, 2, 1, 2, 2, 3, 2, 3, 3, 3, 4, 3, 4, 4, 4, 5, 4, 5, 5, 5, 6, 5, 6, 6, 6, 7, 6, 7, 7],
			summary: 'Trending up 18% vs previous period'
		},
		90: {
			views: [
				15, 18, 20, 19, 24, 26, 25, 30, 29, 34, 33, 38, 37, 42, 41, 46, 45, 50, 49, 54, 53, 58, 57, 62, 61, 66, 65, 70,
				69, 72
			],
			leads: [1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8],
			summary: 'Trending up 22% vs previous quarter'
		},
		0: {
			views: [
				10, 14, 13, 18, 17, 22, 21, 26, 25, 30, 29, 34, 33, 38, 37, 42, 41, 46, 45, 50, 49, 54, 53, 58, 57, 62, 61, 66,
				65, 70
			],
			leads: [1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 9],
			summary: 'Steady growth since this listing went live'
		}
	};

	const BOOST: BoostState = {
		active: true,
		plan: 'Elite',
		startDate: '30 Apr 2026',
		expiryDate: '14 May 2026',
		daysTotal: 14,
		daysLeft: 7,
		viewsSinceBoost: 342,
		pctVsPreBoost: 28,
		leadsSinceBoost: 11,
		viewingRequestsSinceBoost: 6
	};

	const PROPERTY_NAME = '4-Bed Duplex, GRA Phase 2';

	const fullDescription =
		"This elegant 4-bedroom duplex sits within the prestigious GRA Phase 2 estate, Port Harcourt. Featuring a fully fitted kitchen, en-suite bedrooms, a private garden, and covered parking for 3 vehicles. The property enjoys 24-hour power supply, CCTV security, and direct access to the estate's recreational facilities. Modern finishes throughout with high-quality Italian tiles, a home theatre setup in the lounge, and a butler's pantry.\n\nThe ground floor comprises a spacious reception hall, formal dining room, family lounge, one guest bedroom with en-suite, modern kitchen with island, laundry room, and a powder room. The first floor hosts three large bedrooms all with en-suites, a study/home office, and a private balcony with estate views.";
	const shortDescription = fullDescription.slice(0, 260) + '…';
	const descriptionParagraphs = $derived(fullDescription.split('\n\n'));

	const thumbnails = [
		{ style: '' },
		{ style: 'background:linear-gradient(135deg,#1F3F6A,#4A70A0)' },
		{ style: 'background:linear-gradient(135deg,#0A2463,#1F3F6A)' },
		{ style: 'background:linear-gradient(135deg,#0E2444,#1a3255)', extraCount: 4 }
	];

	// ─────────────────────────────────────────────────────────
	// UI state
	// ─────────────────────────────────────────────────────────
	let darkMode = $state(false);
	let bellOpen = $state(false);
	let sidebarOpen = $state(false);
	let activeThumbIndex = $state(0);
	let descExpanded = $state(false);
	let amenitiesExpanded = $state(false);
	let boostModalOpen = $state(false);
	let archiveModalOpen = $state(false);
	let archived = $state(false);
	let currentViewingTab = $state<ViewingTab>('today');
	let trendRange = $state<TrendRange>(30);
	let videoPlaying = $state(false);
	let toastMessage = $state<string | null>(null);
	let toastTimer: ReturnType<typeof setTimeout> | undefined;

	const amenities = [
		'Swimming pool',
		'Generator backup',
		'24hr security',
		'CCTV',
		'Fibre broadband',
		'Covered parking (×3)'
	];
	const extraAmenities = ['Private garden', 'Home theatre', 'Air conditioning', 'Estate gym', 'Borehole water', 'Solar inverter'];

	const currentViewings = $derived(VIEWINGS[currentViewingTab]);
	const viewingSubline = $derived(
		currentViewings.length
			? `${currentViewings.length} viewing${currentViewings.length !== 1 ? 's' : ''} ${VIEWING_TAB_LABELS[currentViewingTab]}`
			: `No viewings ${VIEWING_TAB_LABELS[currentViewingTab]}`
	);

	const trendChart = $derived(computeTrendChart(TREND_DATA[trendRange]));

	function computeTrendChart(data: TrendPoint) {
		const w = 600;
		const h = 180;
		const pad = 8;
		const max = Math.max(...data.views, 1);
		const maxLeads = Math.max(...data.leads, 1);

		const point = (arr: number[], i: number): [number, number] => {
			const x = pad + (i / (arr.length - 1)) * (w - pad * 2);
			const y = h - pad - (arr[i] / max) * (h - pad * 2);
			return [x, y];
		};
		const toPath = (arr: number[]) => arr.map((_, i) => point(arr, i).join(',')).join(' ');

		const viewsPts = toPath(data.views);
		const scaledLeads = data.leads.map((v) => v * (max / maxLeads) * 0.5);
		const leadsPts = toPath(scaledLeads);
		const areaPts = `${pad},${h - pad} ${viewsPts} ${w - pad},${h - pad}`;

		return { areaPts, viewsPts, leadsPts, summary: data.summary };
	}

	function showToast(message: string) {
		toastMessage = message;
		clearTimeout(toastTimer);
		toastTimer = setTimeout(() => (toastMessage = null), 3000);
	}

	function selectThumb(index: number) {
		activeThumbIndex = index;
	}

	function toggleDesc() {
		descExpanded = !descExpanded;
	}

	function toggleAmenities() {
		amenitiesExpanded = !amenitiesExpanded;
	}

	function setViewingTab(tab: ViewingTab) {
		currentViewingTab = tab;
	}

	function setTrendRange(range: TrendRange) {
		trendRange = range;
	}

	function handleActivateBoost(plan: BoostPlanSelection) {
		boostModalOpen = false;
		showToast(`🌟 ${plan.name} boost activated successfully!`);
	}

	function handleConfirmArchive() {
		archiveModalOpen = false;
		archived = true;
		showToast('Listing archived. It is no longer publicly visible.');
	}

	function handleUnarchive() {
		archived = false;
		showToast('Listing restored and is now publicly visible.');
	}

	function closeBellOnOutsideClick(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (bellOpen && !target.closest('#bellToggle') && !target.closest('#bellPanel')) {
			bellOpen = false;
		}
	}

	$effect(() => {
		document.documentElement.classList.toggle('dark', darkMode);
	});
</script>

<svelte:window onclick={closeBellOnOutsideClick} />

	<!-- ══ LAYOUT SHELL ══ -->
    <div class="flex pt-[68px] min-h-screen">
        <AgencySidebar />
    
            <!-- ══ MAIN CONTENT ══ -->
            <main class="min-w-0 flex-1 overflow-x-hidden">
                <!-- ── DARK HERO HEADER ── -->
                <div class="hero-sky border-b border-white/[0.07] px-[5vw] py-8 lg:px-10">
                    <div class="fu mb-5 flex items-center gap-2 text-[12px] text-white/40">
                        <a href="/agent/my-properties" class="tt no-underline hover:text-white/70">My listings</a>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M4 2l4 4-4 4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <span class="text-white/70">{PROPERTY_NAME}</span>
                    </div>
    
                    <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                        <div class="fu d1">
                            <div class="mb-3 flex flex-wrap items-center gap-3">
                                <span class="rounded-full bg-blue-bright/15 px-3 py-[5px] text-[10px] font-medium uppercase tracking-[.14em] text-blue-bright">
                                    Residential
                                </span>
                                {#if archived}
                                    <span class="flex items-center gap-1.5 rounded-full bg-chalk-3 px-3 py-[5px] text-[10px] font-medium text-chalk-muted dark:bg-white/[.08] dark:text-[#6A7FA0]">
                                        <span class="h-1.5 w-1.5 rounded-full bg-chalk-muted"></span>Archived
                                    </span>
                                {:else}
                                    <span class="flex items-center gap-1.5 rounded-full bg-sage-light px-3 py-[5px] text-[10px] font-medium text-sage dark:bg-sage/25 dark:text-[#7DBF7A]">
                                        <span class="pulse-dot h-1.5 w-1.5 rounded-full bg-sage"></span>Active listing
                                    </span>
                                {/if}
                                <span class="flex items-center gap-1.5 rounded-full bg-gold/25 px-3 py-[5px] text-[10px] font-medium text-gold">
                                    <svg width="9" height="9" viewBox="0 0 14 14" fill="none">
                                        <path
                                            d="M7 1l1.8 3.5 3.9.55-2.85 2.75.68 3.9L7 9.85l-3.53 1.85.68-3.9L1.3 5.05l3.9-.55z"
                                            stroke="currentColor"
                                            stroke-width="1.2"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                    Elite Boost Active
                                </span>
                            </div>
                            <h1 class="font-display font-light leading-[1.06] text-white" style="font-size:clamp(26px,3.8vw,44px)">
                                4-Bed Duplex, <em class="italic text-chalk-3">GRA Phase 2</em>
                            </h1>
                            <div class="mt-2 flex flex-wrap items-center gap-3">
                                <span class="font-display font-semibold text-white" style="font-size:clamp(20px,2.5vw,28px)">
                                    ₦3,500,000<span class="text-[16px] font-light text-white/50">/yr</span>
                                </span>
                                <span class="text-white/40">·</span>
                                <span class="flex items-center gap-1.5 text-[13px] text-white/60">
                                    <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                                        <path d="M7 1C5 1 3 2.79 3 5c0 2.76 4 8 4 8s4-5.24 4-8c0-2.21-2-4-4-4z" stroke="currentColor" stroke-width="1.3" />
                                        <circle cx="7" cy="5" r="1.5" stroke="currentColor" stroke-width="1.2" />
                                    </svg>
                                    GRA Phase 2, Port Harcourt
                                </span>
                                <span class="text-white/40">·</span>
                                <span class="text-[12px] text-white/50">Added 14 Apr 2026</span>
                            </div>
                        </div>
    
                        <div class="fu d2 flex flex-wrap items-center gap-2.5">
                            <button
                                onclick={() => (boostModalOpen = true)}
                                class="tt flex items-center gap-2 rounded-full border-none bg-gold px-4 py-[10px] text-[13px] font-medium text-white hover:opacity-90"
                            >
                                <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                                    <path
                                        d="M7 1l1.8 3.5 3.9.55-2.85 2.75.68 3.9L7 9.85l-3.53 1.85.68-3.9L1.3 5.05l3.9-.55z"
                                        stroke="currentColor"
                                        stroke-width="1.3"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                                {BOOST.active ? 'Manage boost' : 'Boost property'}
                            </button>
                            <a
                                href="/property/edit"
                                class="tt flex cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-white/[.1] px-4 py-[10px] text-[13px] font-medium text-white no-underline hover:bg-white/[.18]"
                            >
                                <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                                    <path d="M2 10l1.4-4 7-7 2.6 2.6-7 7L2 10z" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                Edit listing
                            </a>
                            <button
                                onclick={() => (archiveModalOpen = true)}
                                class="tt flex items-center gap-2 rounded-full border-none border border-white/10 bg-white/[.06] px-4 py-[10px] text-[13px] font-medium text-white/70 hover:bg-white/[.12] hover:text-white"
                            >
                                <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                                    <rect x="1.5" y="3.5" width="11" height="9" rx="1.5" stroke="currentColor" stroke-width="1.3" />
                                    <path d="M1 3.5h12M5.5 6.5h3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" />
                                </svg>
                                Archive
                            </button>
                        </div>
                    </div>
                </div>
    
                <div class="max-w-[1180px] space-y-8 px-[5vw] py-8 lg:px-10">
                    <!-- ── ARCHIVED BANNER ── -->
                    {#if archived}
                        <div class="flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 dark:border-amber-700/40 dark:bg-amber-900/20">
                            <svg class="flex-shrink-0 text-amber-600" width="18" height="18" viewBox="0 0 20 20" fill="none">
                                <path d="M10 4v7M10 13v.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
                                <circle cx="10" cy="10" r="8.5" stroke="currentColor" stroke-width="1.4" />
                            </svg>
                            <div class="min-w-0 flex-1">
                                <span class="text-[13px] font-medium text-amber-800 dark:text-amber-300">This listing has been archived.</span>
                                <span class="ml-2 text-[12px] text-amber-600 dark:text-amber-400">It is no longer visible to the public.</span>
                            </div>
                            <button
                                onclick={handleUnarchive}
                                class="tt cursor-pointer rounded-full border-none bg-amber-100 px-3 py-1.5 text-[12px] font-medium text-amber-800 hover:bg-amber-200 dark:bg-amber-800/30 dark:text-amber-300 dark:hover:bg-amber-800/50"
                            >
                                Restore listing
                            </button>
                        </div>
                    {/if}
    
                    <!-- ══ KPI CARDS ══ -->
                    <div class="fu grid grid-cols-2 gap-4 lg:grid-cols-4">
                        {#each KPI_CARDS as card}
                            <div class="stat-card rounded-2xl border border-chalk-3 bg-white p-5 shadow-[0_2px_12px_rgba(10,36,99,.06)] dark:border-white/[.06] dark:bg-[#0D1422] dark:shadow-none">
                                <div class="mb-3 flex items-center justify-between">
                                    <div class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl {card.iconBg}">
                                        {@html card.icon}
                                    </div>
                                    <span class="flex items-center gap-1 rounded-full px-2 py-[3px] text-[10px] font-medium {card.badgeClass}">
                                        {#if card.badgeDot}<span class="h-1.5 w-1.5 rounded-full {card.badgeDotColor} pulse-dot"></span>{/if}
                                        {card.badgeText}
                                    </span>
                                </div>
                                <div class="mb-1 font-display font-semibold leading-none text-navy-dark dark:text-blue-100" style="font-size:28px">
                                    {card.value}
                                </div>
                                <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">{card.label}</div>
                                <div class="perf-track mt-3"><div class="perf-fill grow-w {card.barColor}" style="--w:{card.barWidth}%"></div></div>
                            </div>
                        {/each}
                    </div>
    
                    <!-- ══ GALLERY + PROPERTY DETAILS ══ -->
                    <div class="fu d1 grid grid-cols-1 gap-6 xl:grid-cols-[1fr_380px]">
                        <!-- Left: Gallery -->
                        <div class="space-y-3">
                            <div class="sec-label mb-3 text-chalk-muted dark:text-[#6A7FA0]">Property Images</div>
                            <div class="group relative aspect-[16/9] cursor-pointer overflow-hidden rounded-2xl bg-navy-mid">
                                <div class="hero-sky absolute inset-0 flex items-center justify-center">
                                    <div class="text-center">
                                        <svg class="mx-auto mb-3 opacity-30" width="52" height="52" viewBox="0 0 52 52" fill="none">
                                            <path d="M6 40 L16 26 L24 34 L34 20 L46 40z" stroke="white" stroke-width="2" stroke-linejoin="round" />
                                            <circle cx="14" cy="14" r="5" stroke="white" stroke-width="2" />
                                        </svg>
                                        <span class="text-[13px] text-white/30">Main hero photo</span>
                                    </div>
                                </div>
                                <div
                                    class="tt absolute inset-0 flex items-end justify-start bg-gradient-to-t from-navy-deep/60 to-transparent p-4 opacity-0 group-hover:opacity-100"
                                >
                                    <span class="flex items-center gap-1.5 text-[12px] font-medium text-white">
                                        <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                                            <circle cx="7" cy="7" r="5.5" stroke="white" stroke-width="1.3" />
                                            <path d="M4.5 7l2 2 3-3" stroke="white" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        View full photo
                                    </span>
                                </div>
                                <span class="absolute right-3 top-3 rounded-full bg-navy-deep/60 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur">
                                    {activeThumbIndex + 1} / 8
                                </span>
                            </div>
                            <div class="grid grid-cols-4 gap-2">
                                {#each thumbnails as thumb, i}
                                    <button
                                        onclick={() => selectThumb(i)}
                                        class="thumb relative aspect-square cursor-pointer overflow-hidden rounded-xl bg-navy-mid"
                                        class:active={activeThumbIndex === i}
                                        style={thumb.style}
                                    >
                                        {#if i === 0}
                                            <div class="hero-sky flex h-full w-full items-center justify-center">
                                                <svg width="20" height="20" viewBox="0 0 52 52" fill="none">
                                                    <path d="M6 40 L16 26 L24 34 L34 20 L46 40z" stroke="white" stroke-width="2.5" stroke-linejoin="round" opacity=".4" />
                                                    <circle cx="14" cy="14" r="5" stroke="white" stroke-width="2.5" opacity=".4" />
                                                </svg>
                                            </div>
                                        {:else if i === 1}
                                            <div class="flex h-full w-full items-center justify-center opacity-40">
                                                <svg width="18" height="18" viewBox="0 0 52 52" fill="none">
                                                    <path d="M6 40 L16 26 L24 34 L34 20 L46 40z" stroke="white" stroke-width="2.5" stroke-linejoin="round" />
                                                </svg>
                                            </div>
                                        {:else if i === 2}
                                            <div class="flex h-full w-full items-center justify-center opacity-40">
                                                <svg width="18" height="18" viewBox="0 0 52 52" fill="none">
                                                    <circle cx="14" cy="14" r="5" stroke="white" stroke-width="2.5" />
                                                </svg>
                                            </div>
                                        {:else}
                                            <div class="flex h-full w-full items-center justify-center opacity-40">
                                                <svg width="18" height="18" viewBox="0 0 52 52" fill="none">
                                                    <path d="M10 42V20L26 8L42 20V42H30V30H22V42z" stroke="white" stroke-width="2.5" stroke-linejoin="round" />
                                                </svg>
                                            </div>
                                            <div class="absolute inset-0 flex items-center justify-center bg-navy-deep/50">
                                                <span class="text-[13px] font-semibold text-white">+{thumb.extraCount}</span>
                                            </div>
                                        {/if}
                                    </button>
                                {/each}
                            </div>
                        </div>
    
                        <!-- Right: Quick Info panel -->
                        <div class="space-y-4 rounded-2xl border border-chalk-3 bg-white p-5 shadow-[0_2px_12px_rgba(10,36,99,.06)] dark:border-white/[.06] dark:bg-[#0D1422] dark:shadow-none">
                            <div class="sec-label text-chalk-muted dark:text-[#6A7FA0]">Property Details</div>
                            <div class="grid grid-cols-2 gap-2.5">
                                {#if detailChips.length}
                                    {#each detailChips as chip}
                                        <div class="info-chip tt" class:col-span-2={chip.span2}>
                                            {@html chip.icon}
                                            <div>
                                                <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">{chip.label}</div>
                                                <div class="text-[13px] font-semibold text-navy-dark dark:text-blue-100">{chip.value}</div>
                                            </div>
                                        </div>
                                    {/each}
                                {:else}
                                    <div class="col-span-2 py-2 text-[12px] italic text-chalk-muted dark:text-[#6A7FA0]">No additional property details added.</div>
                                {/if}
                            </div>
    
                            <div class="border-t border-chalk-3 pt-4 dark:border-white/[.06]">
                                <div class="sec-label mb-2.5 text-[10px] text-chalk-muted dark:text-[#6A7FA0]">Pricing</div>
                                <div class="mb-1 flex items-baseline justify-between">
                                    <span class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]">Base price</span>
                                    <span class="font-display font-semibold text-navy-dark dark:text-blue-100" style="font-size:16px">
                                        {LISTING.currency}{LISTING.basePrice.toLocaleString()}
                                    </span>
                                </div>
                                <div class="flex justify-between text-[12px]">
                                    <span class="text-chalk-muted dark:text-[#6A7FA0]">Payment period</span>
                                    <span class="font-medium text-navy-dark dark:text-blue-100">{LISTING.paymentPeriod}</span>
                                </div>
                            </div>
    
                            <div class="border-t border-chalk-3 pt-4 dark:border-white/[.06]">
                                <div class="sec-label mb-2.5 text-[10px] text-chalk-muted dark:text-[#6A7FA0]">Additional costs</div>
                                <div class="space-y-2">
                                    <div class="flex justify-between text-[12px]">
                                        <span class="text-chalk-muted dark:text-[#6A7FA0]">Service charge</span>
                                        <span class="font-medium text-navy-dark dark:text-blue-100">₦180,000/yr</span>
                                    </div>
                                    <div class="flex justify-between text-[12px]">
                                        <span class="text-chalk-muted dark:text-[#6A7FA0]">Agency fee</span>
                                        <span class="font-medium text-navy-dark dark:text-blue-100">10% (one-off)</span>
                                    </div>
                                    <div class="flex justify-between text-[12px]">
                                        <span class="text-chalk-muted dark:text-[#6A7FA0]">Caution deposit</span>
                                        <span class="font-medium text-navy-dark dark:text-blue-100">₦350,000</span>
                                    </div>
                                </div>
                            </div>
    
                            <div class="flex gap-2.5 border-t border-chalk-3 pt-4 dark:border-white/[.06]">
                                <button
                                    onclick={() => (boostModalOpen = true)}
                                    class="tt flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-full border-none bg-gold py-2.5 text-[12px] font-medium text-white hover:opacity-90"
                                >
                                    <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                                        <path
                                            d="M7 1l1.8 3.5 3.9.55-2.85 2.75.68 3.9L7 9.85l-3.53 1.85.68-3.9L1.3 5.05l3.9-.55z"
                                            stroke="currentColor"
                                            stroke-width="1.3"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                    Boost
                                </button>
                                <a
                                    href="/property/edit"
                                    class="tt flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-full border border-chalk-3 bg-chalk-2 py-2.5 text-[12px] font-medium text-navy-dark no-underline hover:bg-chalk-3 dark:border-white/[.08] dark:bg-white/[.06] dark:text-blue-100 dark:hover:bg-white/10"
                                >
                                    <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                                        <path d="M2 10l1.4-4 7-7 2.6 2.6-7 7L2 10z" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    Edit
                                </a>
                            </div>
                        </div>
                    </div>
    
                    <!-- ══ VIDEO SECTION ══ -->
                    <div class="fu d2">
                        <div class="sec-label mb-3 text-chalk-muted dark:text-[#6A7FA0]">Property Video</div>
                        <div class="overflow-hidden rounded-2xl border border-chalk-3 bg-white shadow-[0_2px_12px_rgba(10,36,99,.06)] dark:border-white/[.06] dark:bg-[#0D1422] dark:shadow-none">
                            <div class="video-wrap m-0" style="border-radius:0">
                                {#if videoPlaying}
                                    <iframe
                                        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                                        title="Property walkthrough"
                                        allow="autoplay;fullscreen"
                                        allowfullscreen
                                        class="h-full w-full"
                                    ></iframe>
                                {:else}
                                    <div class="hero-sky absolute inset-0 flex flex-col items-center justify-center gap-3">
                                        <button
                                            onclick={() => (videoPlaying = true)}
                                            aria-label="Play property walkthrough"
                                            class="tt flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/30 bg-white/15 hover:bg-white/25"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
                                        </button>
                                        <span class="text-[13px] text-white/60">Property walkthrough · 4:22</span>
                                    </div>
                                {/if}
                            </div>
                        </div>
                    </div>
    
                    <!-- ══ DESCRIPTION + AMENITIES ══ -->
                    <div class="fu d3 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
                        <div class="space-y-5">
                            <div class="rounded-2xl border border-chalk-3 bg-white p-6 shadow-[0_2px_12px_rgba(10,36,99,.06)] dark:border-white/[.06] dark:bg-[#0D1422] dark:shadow-none">
                                <div class="sec-label mb-3 text-chalk-muted dark:text-[#6A7FA0]">Description</div>
                                {#if descExpanded}
                                    {#each descriptionParagraphs as paragraph, i}
                                        <p class="text-[13px] leading-[1.8] text-navy-dark dark:text-[#B8C8E0]" class:mt-3={i > 0}>{paragraph}</p>
                                    {/each}
                                {:else}
                                    <p class="text-[13px] leading-[1.8] text-navy-dark dark:text-[#B8C8E0]">{shortDescription}</p>
                                {/if}
                                <button
                                    onclick={toggleDesc}
                                    class="tt mt-2 cursor-pointer border-none bg-transparent p-0 font-sans text-[12px] text-blue-link hover:opacity-75 dark:text-blue-bright"
                                >
                                    {descExpanded ? 'Show less' : 'Show more'}
                                </button>
                            </div>
    
                            <div class="rounded-2xl border border-chalk-3 bg-white p-6 shadow-[0_2px_12px_rgba(10,36,99,.06)] dark:border-white/[.06] dark:bg-[#0D1422] dark:shadow-none">
                                <div class="sec-label mb-3 text-chalk-muted dark:text-[#6A7FA0]">Amenities</div>
                                <div class="flex flex-wrap gap-2">
                                    {#each amenities as amenity}
                                        <span class="amenity tt rounded-full px-3 py-[6px] text-[11px] font-medium">{amenity}</span>
                                    {/each}
                                    {#if amenitiesExpanded}
                                        {#each extraAmenities as amenity}
                                            <span class="amenity tt rounded-full px-3 py-[6px] text-[11px] font-medium">{amenity}</span>
                                        {/each}
                                    {/if}
                                </div>
                                <button
                                    onclick={toggleAmenities}
                                    class="tt mt-3 cursor-pointer border-none bg-transparent p-0 font-sans text-[12px] text-blue-link hover:opacity-75 dark:text-blue-bright"
                                >
                                    {amenitiesExpanded ? 'Show fewer amenities' : `Show all amenities (${amenities.length + extraAmenities.length})`}
                                </button>
                            </div>
                        </div>
    
                        <!-- Right: Performance insight -->
                        <div class="h-fit rounded-2xl border border-chalk-3 bg-white p-5 shadow-[0_2px_12px_rgba(10,36,99,.06)] dark:border-white/[.06] dark:bg-[#0D1422] dark:shadow-none">
                            <div class="sec-label mb-4 text-chalk-muted dark:text-[#6A7FA0]">Conversion Insights</div>
                            <div class="space-y-3.5">
                                <div>
                                    <div class="mb-1.5 flex justify-between text-[12px]">
                                        <span class="text-chalk-muted dark:text-[#6A7FA0]">View rate</span>
                                        <span class="font-medium text-navy-dark dark:text-blue-100">72%</span>
                                    </div>
                                    <div class="perf-track"><div class="perf-fill grow-w bg-blue-bright" style="--w:72%"></div></div>
                                </div>
                                <div>
                                    <div class="mb-1.5 flex justify-between text-[12px]">
                                        <span class="text-chalk-muted dark:text-[#6A7FA0]">Enquiry conversion</span>
                                        <span class="font-medium text-navy-dark dark:text-blue-100">34%</span>
                                    </div>
                                    <div class="perf-track"><div class="perf-fill grow-w bg-sage" style="--w:34%"></div></div>
                                </div>
                                <div>
                                    <div class="mb-1.5 flex justify-between text-[12px]">
                                        <span class="text-chalk-muted dark:text-[#6A7FA0]">Save rate</span>
                                        <span class="font-medium text-navy-dark dark:text-blue-100">55%</span>
                                    </div>
                                    <div class="perf-track"><div class="perf-fill grow-w bg-gold" style="--w:55%"></div></div>
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <!-- ══ ARCHITECTURAL PLANS ══ -->
                    <div class="fu d4">
                        <div class="sec-label mb-3 text-chalk-muted dark:text-[#6A7FA0]">Architectural Plans</div>
                        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {#each ARCHITECTURAL_PLANS as doc}
                                <div class="doc-card rounded-2xl border border-chalk-3 bg-white p-4 shadow-[0_2px_8px_rgba(10,36,99,.05)] dark:border-white/[.06] dark:bg-[#0D1422] dark:shadow-none">
                                    <div class="mb-3 flex items-center gap-3">
                                        <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl {doc.iconBg}">
                                            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                                                <rect x="3" y="2" width="14" height="16" rx="2" stroke={doc.iconStroke} stroke-width="1.4" />
                                                <path d="M7 7h6M7 10h6M7 13h4" stroke={doc.iconStroke} stroke-width="1.3" stroke-linecap="round" />
                                            </svg>
                                        </div>
                                        <div class="min-w-0 flex-1">
                                            <div class="truncate text-[13px] font-medium text-navy-dark dark:text-blue-100">{doc.name}</div>
                                            <div class="mt-0.5 text-[11px] text-chalk-muted dark:text-[#6A7FA0]">{doc.meta}</div>
                                        </div>
                                    </div>
                                    <div class="flex gap-2">
                                        <button class="tt flex-1 cursor-pointer rounded-xl border-none bg-chalk-2 py-2 text-[11px] font-medium text-navy-dark hover:bg-chalk-3 dark:bg-white/[.06] dark:text-blue-100 dark:hover:bg-white/10">
                                            View
                                        </button>
                                        <button class="tt flex-1 cursor-pointer rounded-xl border-none bg-blue-bright/10 py-2 text-[11px] font-medium text-blue-link hover:bg-blue-bright/15 dark:text-blue-bright">
                                            Download
                                        </button>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    </div>
    
                    <!-- ══ OWNERSHIP DOCUMENTS ══ -->
                    <div class="fu d5">
                        <div class="sec-label mb-3 text-chalk-muted dark:text-[#6A7FA0]">Ownership Documents</div>
                        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {#each OWNERSHIP_DOCS as doc}
                                <div class="doc-card flex items-center gap-4 rounded-2xl border border-chalk-3 bg-white p-4 shadow-[0_2px_8px_rgba(10,36,99,.05)] dark:border-white/[.06] dark:bg-[#0D1422] dark:shadow-none">
                                    <div class="tt flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl {doc.iconBg}">
                                        <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
                                            <rect x="3" y="2" width="14" height="16" rx="2" stroke={doc.iconStroke} stroke-width="1.4" />
                                            <path d="M6 8h8M6 11h8M6 14h5" stroke={doc.iconStroke} stroke-width="1.3" stroke-linecap="round" />
                                        </svg>
                                    </div>
                                    <div class="min-w-0 flex-1">
                                        <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">{doc.name}</div>
                                        <div class="mt-0.5 text-[11px] text-chalk-muted dark:text-[#6A7FA0]">{doc.meta}</div>
                                        {#if doc.verified === 'verified'}
                                            <span class="mt-1 inline-block rounded-full bg-sage-light px-2 py-[2px] text-[10px] font-medium text-sage dark:bg-sage/20 dark:text-[#7DBF7A]">✓ Verified</span>
                                        {:else if doc.verified === 'pending'}
                                            <span class="mt-1 inline-block rounded-full bg-gold/15 px-2 py-[2px] text-[10px] font-medium text-[#8A6A10] dark:text-gold">⏳ Pending</span>
                                        {/if}
                                    </div>
                                    <button class="tt flex-shrink-0 cursor-pointer border-none bg-transparent font-sans text-[12px] font-medium text-blue-link hover:opacity-75 dark:text-blue-bright">
                                        Download
                                    </button>
                                </div>
                            {/each}
                        </div>
                    </div>
    
                    <!-- ══ VIEWING HISTORY ══ -->
                    <div class="fu d6">
                        <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <div class="sec-label mb-0.5 text-chalk-muted dark:text-[#6A7FA0]">Viewing History</div>
                                <p class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]">{viewingSubline}</p>
                            </div>
                            <div class="flex items-center gap-1 rounded-xl bg-chalk-2 p-1 dark:bg-[#1A2438]">
                                {#each [['today', 'Today'], ['upcoming', 'Upcoming'], ['past', 'Past']] as [tab, label]}
                                    <button onclick={() => setViewingTab(tab as ViewingTab)} class="vtab" class:active={currentViewingTab === tab}>
                                        {label}
                                    </button>
                                {/each}
                            </div>
                        </div>
    
                        {#if currentViewings.length}
                            <div class="space-y-3">
                                {#each currentViewings as v}
                                    <div class="vc rounded-2xl border border-chalk-3 bg-white p-5 shadow-[0_2px_12px_rgba(10,36,99,.05)] dark:border-white/[.06] dark:bg-[#0D1422] dark:shadow-none">
                                        <div class="flex flex-wrap items-start justify-between gap-3">
                                            <div class="flex min-w-0 items-center gap-3">
                                                <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full {v.avatarBg} text-[13px] font-semibold text-white">
                                                    {v.initials}
                                                </div>
                                                <div class="min-w-0">
                                                    <div class="text-[14px] font-medium text-navy-dark dark:text-blue-100">{v.name}</div>
                                                    <div class="mt-0.5 text-[11px] text-chalk-muted dark:text-[#6A7FA0]">{v.contact}</div>
                                                </div>
                                            </div>
                                            <div class="flex flex-shrink-0 flex-wrap items-center gap-2">
                                                <span class="flex items-center gap-1.5 rounded-full px-2.5 py-[5px] text-[10px] font-medium {TYPE_BADGE[v.type].css}">
                                                    {@html TYPE_BADGE[v.type].icon}
                                                    {TYPE_BADGE[v.type].label}
                                                </span>
                                                <span class="flex items-center gap-1 rounded-full px-2.5 py-[5px] text-[10px] font-medium {v.statusCss}">
                                                    {#if v.statusDot}<span class="h-1.5 w-1.5 rounded-full bg-ember pulse-dot"></span>{/if}
                                                    {v.status}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="mt-4 flex flex-wrap items-center justify-between gap-3">
                                            <div class="flex items-center gap-4 text-[12px] text-chalk-muted dark:text-[#6A7FA0]">
                                                <span class="flex items-center gap-1.5">
                                                    <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                                                        <circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.2" />
                                                        <path d="M7 4.5v3l1.5 1.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
                                                    </svg>
                                                    {v.time}
                                                </span>
                                            </div>
                                            <div class="flex gap-2">
                                                <button class="tt cursor-pointer rounded-full border-none bg-chalk-2 px-3.5 py-2 text-[12px] font-medium text-chalk-muted hover:bg-chalk-3 dark:bg-white/[.06] dark:text-[#6A7FA0] dark:hover:bg-white/10">
                                                    View details
                                                </button>
                                                <button class="tt cursor-pointer rounded-full border-none px-3.5 py-2 text-[12px] font-medium text-white {v.primaryCss}">
                                                    {v.primaryLabel}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                {/each}
                            </div>
                        {:else}
                            <div class="rounded-2xl border border-dashed border-chalk-3 bg-white py-12 text-center dark:border-white/[.1] dark:bg-[#0D1422]">
                                <p class="text-[13px] text-chalk-muted dark:text-[#6A7FA0]">No viewing activity in this period.</p>
                            </div>
                        {/if}
                    </div>
    
                    <!-- ══ LISTING PERFORMANCE (trend chart) ══ -->
                    <div class="fu">
                        <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
                            <div class="sec-label text-chalk-muted dark:text-[#6A7FA0]">Listing Performance</div>
                            <div class="flex items-center gap-1 rounded-xl bg-chalk-2 p-1 dark:bg-[#1A2438]">
                                {#each [[7, '7d'], [30, '30d'], [90, '90d'], [0, 'All time']] as [range, label]}
                                    <button onclick={() => setTrendRange(range as TrendRange)} class="vtab" class:active={trendRange === range}>
                                        {label}
                                    </button>
                                {/each}
                            </div>
                        </div>
                        <div class="rounded-2xl border border-chalk-3 bg-white p-5 shadow-[0_2px_12px_rgba(10,36,99,.06)] dark:border-white/[.06] dark:bg-[#0D1422] dark:shadow-none">
                            <div class="mb-4 flex flex-wrap items-center gap-5">
                                <span class="flex items-center gap-1.5 text-[12px] text-chalk-muted dark:text-[#6A7FA0]">
                                    <span class="h-2.5 w-2.5 rounded-full bg-blue-bright"></span>Views
                                </span>
                                <span class="flex items-center gap-1.5 text-[12px] text-chalk-muted dark:text-[#6A7FA0]">
                                    <span class="h-2.5 w-2.5 rounded-full bg-gold"></span>Leads
                                </span>
                                <p class="ml-auto text-[12px] text-chalk-muted dark:text-[#6A7FA0]">{trendChart.summary}</p>
                            </div>
                            <svg viewBox="0 0 600 180" class="h-[160px] w-full sm:h-[180px]" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stop-color="#4A90E2" stop-opacity="0.22" />
                                        <stop offset="100%" stop-color="#4A90E2" stop-opacity="0" />
                                    </linearGradient>
                                </defs>
                                <polygon points={trendChart.areaPts} fill="url(#trendFill)" />
                                <polyline
                                    points={trendChart.viewsPts}
                                    fill="none"
                                    stroke="#4A90E2"
                                    stroke-width="2.2"
                                    stroke-linejoin="round"
                                    stroke-linecap="round"
                                />
                                <polyline
                                    points={trendChart.leadsPts}
                                    fill="none"
                                    stroke="#D4AE3A"
                                    stroke-width="2"
                                    stroke-linejoin="round"
                                    stroke-linecap="round"
                                    stroke-dasharray="1 5"
                                />
                            </svg>
                        </div>
                    </div>
    
                    <!-- ══ BOOST PERFORMANCE ══ -->
                    <div class="fu">
                        <div class="sec-label mb-3 text-chalk-muted dark:text-[#6A7FA0]">Boost Performance</div>
                        {#if BOOST.active}
                            {@const pct = Math.round(((BOOST.daysTotal - BOOST.daysLeft) / BOOST.daysTotal) * 100)}
                            <div class="rounded-2xl border border-gold/25 bg-gradient-to-br from-gold/[.09] to-gold/[.02] p-6 dark:from-gold/[.1] dark:to-gold/[.02]">
                                <div class="mb-5 flex flex-wrap items-start justify-between gap-4">
                                    <div>
                                        <span class="mb-2 flex w-fit items-center gap-1.5 rounded-full bg-gold/25 px-3 py-[5px] text-[10px] font-medium text-[#8A6A10] dark:text-gold">
                                            <svg width="9" height="9" viewBox="0 0 14 14" fill="none">
                                                <path
                                                    d="M7 1l1.8 3.5 3.9.55-2.85 2.75.68 3.9L7 9.85l-3.53 1.85.68-3.9L1.3 5.05l3.9-.55z"
                                                    stroke="currentColor"
                                                    stroke-width="1.2"
                                                    stroke-linejoin="round"
                                                />
                                            </svg>
                                            {BOOST.plan} Boost active
                                        </span>
                                        <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]">Started {BOOST.startDate} · Expires {BOOST.expiryDate}</div>
                                    </div>
                                    <button
                                        onclick={() => (boostModalOpen = true)}
                                        class="tt cursor-pointer rounded-full border border-chalk-3 bg-white px-4 py-2 text-[12px] font-medium text-navy-dark hover:bg-chalk-2 dark:border-white/[.1] dark:bg-white/[.08] dark:text-blue-100 dark:hover:bg-white/[.12]"
                                    >
                                        Extend boost
                                    </button>
                                </div>
                                <div class="mb-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
                                    <div>
                                        <div class="font-display font-semibold leading-none text-navy-dark dark:text-blue-100" style="font-size:30px">+{BOOST.viewsSinceBoost}</div>
                                        <div class="mt-1 text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Views since boost</div>
                                    </div>
                                    <div>
                                        <div class="font-display font-semibold leading-none text-sage" style="font-size:30px">+{BOOST.pctVsPreBoost}%</div>
                                        <div class="mt-1 text-[11px] text-chalk-muted dark:text-[#6A7FA0]">More than pre-boost</div>
                                    </div>
                                    <div>
                                        <div class="font-display font-semibold leading-none text-navy-dark dark:text-blue-100" style="font-size:30px">+{BOOST.leadsSinceBoost}</div>
                                        <div class="mt-1 text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Leads since boost</div>
                                    </div>
                                    <div>
                                        <div class="font-display font-semibold leading-none text-navy-dark dark:text-blue-100" style="font-size:30px">+{BOOST.viewingRequestsSinceBoost}</div>
                                        <div class="mt-1 text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Viewing requests</div>
                                    </div>
                                </div>
                                <div>
                                    <div class="mb-1.5 flex justify-between text-[12px]">
                                        <span class="text-chalk-muted dark:text-[#6A7FA0]">Time remaining</span>
                                        <span class="font-medium text-navy-dark dark:text-blue-100">{BOOST.daysLeft} of {BOOST.daysTotal} days left</span>
                                    </div>
                                    <div class="perf-track"><div class="perf-fill grow-w bg-gold" style="--w:{pct}%"></div></div>
                                </div>
                            </div>
                        {:else}
                            <div class="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-dashed border-chalk-3 bg-white p-6 dark:border-white/[.12] dark:bg-[#0D1422]">
                                <div class="flex items-center gap-3">
                                    <div class="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-gold/15">
                                        <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
                                            <path
                                                d="M7 1l1.8 3.5 3.9.55-2.85 2.75.68 3.9L7 9.85l-3.53 1.85.68-3.9L1.3 5.05l3.9-.55z"
                                                stroke="#D4AE3A"
                                                stroke-width="1.2"
                                                stroke-linejoin="round"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <div class="text-[14px] font-medium text-navy-dark dark:text-blue-100">This listing isn't boosted yet</div>
                                        <div class="mt-0.5 text-[12px] text-chalk-muted dark:text-[#6A7FA0]">Boosting increases visibility and can significantly grow views and leads.</div>
                                    </div>
                                </div>
                                <button
                                    onclick={() => (boostModalOpen = true)}
                                    class="tt flex-shrink-0 cursor-pointer rounded-full border-none bg-gold px-5 py-2.5 text-[13px] font-medium text-white hover:opacity-90"
                                >
                                    Boost this listing
                                </button>
                            </div>
                        {/if}
                    </div>
    
                    <div class="h-8"></div>
                </div>
            </main>
        </div>

<!-- ══ MODALS ══ -->
<BoostModal open={boostModalOpen} property={LISTING} onClose={() => (boostModalOpen = false)} onConfirm={confirmBoost} />
<ArchiveModal open={archiveModalOpen} property={LISTING} onClose={() => (archiveModalOpen = false)} onConfirm={confirmArchive} />

{#if toastMessage}
	<div
		class="tt fixed bottom-6 left-1/2 z-[999] -translate-x-1/2 rounded-full bg-navy-dark px-5 py-3 text-[13px] font-medium text-white shadow-[0_8px_32px_rgba(10,36,99,.3)] dark:bg-[#131C2E]"
	>
		{toastMessage}
	</div>
{/if}

<style>
	.tt {
		transition:
			background-color 0.3s,
			color 0.3s,
			border-color 0.3s,
			box-shadow 0.3s;
	}
	@keyframes pulse-dot {
		0%,
		100% {
			opacity: 1;
			transform: scale(1);
		}
		50% {
			opacity: 0.4;
			transform: scale(0.8);
		}
	}
	:global(.pulse-dot) {
		animation: pulse-dot 2.2s infinite;
	}
	@keyframes fadeUp {
		from {
			opacity: 0;
			transform: translateY(16px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	.fu {
		animation: fadeUp 0.55s ease both;
	}
	.d1 {
		animation-delay: 0.04s;
	}
	.d2 {
		animation-delay: 0.09s;
	}
	.d3 {
		animation-delay: 0.14s;
	}
	.d4 {
		animation-delay: 0.19s;
	}
	.d5 {
		animation-delay: 0.24s;
	}
	.d6 {
		animation-delay: 0.3s;
	}
	@keyframes growW {
		from {
			width: 0;
		}
		to {
			width: var(--w);
		}
	}
	:global(.grow-w) {
		animation: growW 1s cubic-bezier(0.34, 1.2, 0.64, 1) 0.5s both;
	}

	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}
	.scrollbar-hide {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	:global(.sb-link.active) {
		background: rgba(74, 144, 226, 0.12);
		color: #4a90e2;
		font-weight: 500;
	}
	:global([data-theme="dark"]) :global(.sb-link.active) {
		background: rgba(74, 144, 226, 0.15);
	}
	:global(.sb-link:not(.active):hover) {
		background: rgba(10, 36, 99, 0.05);
	}
	:global([data-theme="dark"]) :global(.sb-link:not(.active):hover) {
		background: rgba(255, 255, 255, 0.04);
	}

	.stat-card {
		transition:
			transform 0.22s,
			box-shadow 0.22s;
	}
	.stat-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 12px 36px rgba(10, 36, 99, 0.11);
	}
	:global([data-theme="dark"]) .stat-card:hover {
		box-shadow: 0 12px 36px rgba(0, 0, 0, 0.38);
	}

	.thumb {
		transition:
			opacity 0.2s,
			box-shadow 0.2s;
	}
	.thumb:hover {
		opacity: 0.85;
	}
	.thumb.active {
		box-shadow: 0 0 0 2px #4a90e2;
	}

	.hero-sky {
		background: linear-gradient(160deg, #060e1c 0%, #0a2463 40%, #1f3f6a 75%, #4a70a0 100%);
	}

	.sec-label {
		letter-spacing: 0.16em;
		font-size: 10px;
		font-weight: 500;
		text-transform: uppercase;
	}

	:global(.info-chip) {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 12px 14px;
		border-radius: 14px;
		border: 1px solid;
		border-color: #ede7dc;
		background: #fefcf8;
	}
	:global([data-theme="dark"]) :global(.info-chip) {
		border-color: rgba(255, 255, 255, 0.07);
		background: #0d1422;
	}

	:global(.perf-track) {
		background: #ede7dc;
		border-radius: 4px;
		overflow: hidden;
		height: 5px;
	}
	:global([data-theme="dark"]) :global(.perf-track) {
		background: rgba(255, 255, 255, 0.08);
	}
	:global(.perf-fill) {
		height: 100%;
		border-radius: 4px;
	}

	.doc-card {
		transition:
			border-color 0.2s,
			box-shadow 0.2s;
	}
	.doc-card:hover {
		border-color: rgba(74, 144, 226, 0.35) !important;
		box-shadow: 0 4px 18px rgba(10, 36, 99, 0.08);
	}

	.video-wrap {
		position: relative;
		padding-bottom: 56.25%;
		height: 0;
		overflow: hidden;
		border-radius: 16px;
	}
	.video-wrap :global(iframe) {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.amenity {
		background: #f7f3ec;
		color: #1f3f6a;
		border: 1px solid #ede7dc;
	}
	:global([data-theme="dark"]) .amenity {
		background: rgba(31, 63, 106, 0.25);
		color: #8daacc;
		border-color: rgba(255, 255, 255, 0.07);
	}

	.vtab {
		font-size: 12px;
		font-weight: 500;
		padding: 7px 16px;
		border-radius: 10px;
		border: none;
		cursor: pointer;
		background: transparent;
		color: #8c8070;
		transition:
			background 0.2s,
			color 0.2s;
	}
	:global([data-theme="dark"]) .vtab {
		color: #6a7fa0;
	}
	.vtab.active {
		background: #fff;
		color: #0a2463;
		box-shadow: 0 1px 4px rgba(10, 36, 99, 0.12);
	}
	:global([data-theme="dark"]) .vtab.active {
		background: #131c2e;
		color: #e8edf5;
	}

	.vc {
		transition: box-shadow 0.22s;
	}
	.vc:hover {
		box-shadow: 0 6px 28px rgba(10, 36, 99, 0.09);
	}
	:global([data-theme="dark"]) .vc:hover {
		box-shadow: 0 6px 28px rgba(0, 0, 0, 0.35);
	}
</style>
