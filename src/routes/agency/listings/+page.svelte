<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from "./$types";
	import BoostModal from '$lib/components/agency/view-listing/BoostModal.svelte';
	import ArchiveModal from '$lib/components/agency/view-listing/ArchiveModal.svelte';
    import AgencySidebar from '$lib/components/shared/AgencySidebar.svelte';
    import Toast from '$lib/components/shared/Toast.svelte';
	import { ListingFor, ListingPaymentDuration, ListingStatus, PropertyCategory, RegionScope } from '$lib/utils/constant';
	import { capitalize, cleanObject, getErrorMessage, getUserInfo } from '$lib/utils';
	import { ApiRequests } from '$lib/api/api.request';
	import Pagination from '$lib/components/shared/Pagination.svelte';
  import type { ToastType } from '$lib/types';
  import { AxiosError } from 'axios';

  	type ListingFilter = {
		searchTerm: string;
		listingTypeId: string;
		stateId: string;
		countryId: string;
		listingStatus: string;
		paymentPeriod: string;
		hasVirtualTour: boolean;
		isBrandNew: boolean;
		bedrooms?: number;
		priceRange: {
			start?: number;
			end?: number;
		};
		floorSizeRange: {
			start?: number;
			end?: number;
		};
	};

	let { data }: { data: PageData } = $props();

	const kpis = $derived(data.kpis.data);
	const country = $derived(data.country.data);
	const listingTypes = $derived<any[]>(data.listingTypes.data);
	let listings = $derived<any[]>(data.listings.data);
	let paginationControl = $derived(data.listings.paginationControl);
	let filter = $state<ListingFilter>({
		searchTerm: "",
		listingTypeId: "",
		stateId: "",
		countryId: "",
		listingStatus: "",
		paymentPeriod: "",
		hasVirtualTour: false,
  		isBrandNew: false,
  		bedrooms: undefined,
		priceRange: { start: undefined, end: undefined },
  		floorSizeRange: { start: undefined, end: undefined },
	});
	let selectedPageSize = $state(12);

	const generateAddListingUrl = () => {
		if (country.bpRegion === RegionScope.INTERNATIONAL) return '/agency/listings/intl/add';
		
		// default
		return '/agency/listings/add';
	}

	const setFilterField =  <K extends keyof ListingFilter>(field: K, value: ListingFilter[K]) => {
		filter[field] = value;

		// refetch data based on user filter
		setTimeout(() => goto(1, selectedPageSize, cleanObject(filter, true)), 700);
	}

	const findCoverImage = (listing: any) => {
		// TODO: [use later after "isCoverImage" boolean is set]
		// const cover = listing.mediaItems.find((m) => m.type === 'PHOTO' && m.isCoverImage);
		const cover = listing.mediaItems.find((m) => m.type === 'PHOTO');

		if (!cover) return;

		return cover.upload.url;
	} 

	const goto = async (
		pageNumber = 1, 
		pageSize = 12, 
		filter = {}
	) => {
		const agencyId = getUserInfo('agencyId');
		if (!agencyId) return;

		const result = await new ApiRequests().findAgencyListings(agencyId, {
			pageSize,
			pageNumber,
			...filter,
        });
		if (result.data.success) {
			listings  = result.data.data;
			paginationControl = result.data.paginationControl;
		}
	}

	const handlePageChange = (page: number) => {
    	// fetch new data for `page`, then update paginationData
		goto(page, selectedPageSize, cleanObject(filter, true));
  	}

	const handlePerPageChange = (size: number) => {
		selectedPageSize = size;
		// refetch from page 1 with new page size
		goto(1, size, cleanObject(filter, true));
	}

	/* ────────────────────────────────────────────
	   LOOKUP TABLES
	──────────────────────────────────────────── */

	const TYPE_LABEL = {
		apartment: 'Apartment',
		house: 'House',
		duplex: 'Duplex',
		land: 'Land',
		commercial: 'Commercial',
		office: 'Office',
		shop: 'Shop'
	};

	const STATUS_CFG = {
		draft: { css: 'sp-draft', label: 'Draft' },
		published: { css: 'sp-published', label: 'Published' },
		archived: { css: 'sp-archived', label: 'Archived' }
	};

	const PLANS = [
		{ id: '3d', label: '3 days', hours: 72 },
		{ id: '7d', label: '7 days', hours: 168 },
		{ id: '14d', label: '14 days', hours: 336 },
		{ id: '30d', label: '30 days', hours: 720 }
	];

	const SORT_LABELS = {
		'updated-desc': 'Recently Updated',
		'added-desc': 'Recently Added',
		'price-asc': 'Price: Low to High',
		'price-desc': 'Price: High to Low',
		'views-desc': 'Most Viewed',
		'leads-desc': 'Most Leads',
		'size-desc': 'Largest',
		'size-asc': 'Smallest',
		'boost-asc': 'Boost Expiring Soon'
	};

	/* ────────────────────────────────────────────
	   MOCK DATA
	   In production this would come from a `load` function instead.
	──────────────────────────────────────────── */
	function createInitialProps() {
		const now = Date.now();
		const day = 86400000;
		const hour = 3600000;

		return [
			{ id: 'p1', title: '3-Bed Duplex GRA Phase 2', location: 'GRA Phase 2, Port Harcourt', listingFor: 'sale', propertyType: 'duplex', price: 95000000, paymentPeriod: null, bedrooms: 3, sizeSqm: 185, status: 'published', boosted: true, boostExpiresAt: now + (4 * 24 + 12) * hour, brandNew: false, virtualTour: true, views: 1240, leads: 18, updated: now - 2 * day, added: now - 40 * day, sky: 'sky-1' },
			{ id: 'p2', title: '2-Bed Apartment Lekki Phase 1', location: 'Lekki Phase 1, Lagos', listingFor: 'rent', propertyType: 'apartment', price: 850000, paymentPeriod: 'yearly', bedrooms: 2, sizeSqm: 90, status: 'published', boosted: false, boostExpiresAt: null, brandNew: true, virtualTour: false, views: 880, leads: 12, updated: now - 4 * day, added: now - 30 * day, sky: 'sky-3' },
			{ id: 'p3', title: '4-Bed Terrace Maitama', location: 'Maitama, Abuja', listingFor: 'sale', propertyType: 'house', price: 220000000, paymentPeriod: null, bedrooms: 4, sizeSqm: 260, status: 'published', boosted: true, boostExpiresAt: now + 14 * hour, brandNew: false, virtualTour: true, views: 2100, leads: 32, updated: now - 1 * day, added: now - 60 * day, sky: 'sky-2' },
			{ id: 'p4', title: '1-Bed Studio Victoria Island', location: 'Victoria Island, Lagos', listingFor: 'rent', propertyType: 'apartment', price: 500000, paymentPeriod: 'monthly', bedrooms: 1, sizeSqm: 48, status: 'published', boosted: false, boostExpiresAt: null, brandNew: false, virtualTour: true, views: 460, leads: 7, updated: now - 8 * day, added: now - 90 * day, sky: 'sky-5' },
			{ id: 'p5', title: '5-Bed Mansion Banana Island', location: 'Banana Island, Lagos', listingFor: 'sale', propertyType: 'house', price: 750000000, paymentPeriod: null, bedrooms: 5, sizeSqm: 640, status: 'archived', boosted: false, boostExpiresAt: null, brandNew: false, virtualTour: false, views: 3400, leads: 55, updated: now - 45 * day, added: now - 160 * day, sky: 'sky-4' },
			{ id: 'p6', title: '3-Bed Semi-Detached Wuse 2', location: 'Wuse 2, Abuja', listingFor: 'sale', propertyType: 'house', price: 80000000, paymentPeriod: null, bedrooms: 3, sizeSqm: 140, status: 'archived', boosted: false, boostExpiresAt: null, brandNew: false, virtualTour: false, views: 190, leads: 2, updated: now - 70 * day, added: now - 200 * day, sky: 'sky-6' },
			{ id: 'p7', title: '2-Bed Serviced Flat Ikoyi', location: 'Ikoyi, Lagos', listingFor: 'rent', propertyType: 'apartment', price: 1200000, paymentPeriod: 'quarterly', bedrooms: 2, sizeSqm: 110, status: 'published', boosted: true, boostExpiresAt: now + (1 * 24 + 3) * hour, brandNew: true, virtualTour: true, views: 720, leads: 9, updated: now - 3 * hour, added: now - 15 * day, sky: 'sky-1' },
			{ id: 'p8', title: '3-Bed Bungalow Enugu GRA', location: 'GRA, Enugu', listingFor: 'sale', propertyType: 'house', price: 55000000, paymentPeriod: null, bedrooms: 3, sizeSqm: 150, status: 'published', boosted: false, boostExpiresAt: null, brandNew: false, virtualTour: false, views: 340, leads: 5, updated: now - 12 * day, added: now - 100 * day, sky: 'sky-3' },
			{ id: 'p9', title: 'Studio Apartment Yaba', location: 'Yaba, Lagos', listingFor: 'rent', propertyType: 'apartment', price: 280000, paymentPeriod: 'monthly', bedrooms: 1, sizeSqm: 38, status: 'draft', boosted: false, boostExpiresAt: null, brandNew: true, virtualTour: false, views: 0, leads: 0, updated: now - 6 * hour, added: now - 6 * hour, sky: 'sky-2' },
			{ id: 'p10', title: '4-Bed Duplex Jabi Lake District', location: 'Jabi, Abuja', listingFor: 'sale', propertyType: 'duplex', price: 130000000, paymentPeriod: null, bedrooms: 4, sizeSqm: 220, status: 'published', boosted: false, boostExpiresAt: null, brandNew: false, virtualTour: false, views: 590, leads: 11, updated: now - 9 * day, added: now - 70 * day, sky: 'sky-5' },
			{ id: 'p11', title: 'Half Plot of Land, Chevron Drive', location: 'Chevron Drive, Lekki', listingFor: 'sale', propertyType: 'land', price: 45000000, paymentPeriod: null, bedrooms: 0, sizeSqm: 500, status: 'published', boosted: false, boostExpiresAt: null, brandNew: false, virtualTour: false, views: 210, leads: 3, updated: now - 20 * day, added: now - 120 * day, sky: 'sky-6' },
			{ id: 'p12', title: 'Open-Plan Office Suite, Wuse Zone 5', location: 'Wuse Zone 5, Abuja', listingFor: 'rent', propertyType: 'office', price: 3500000, paymentPeriod: 'yearly', bedrooms: 0, sizeSqm: 210, status: 'published', boosted: false, boostExpiresAt: null, brandNew: true, virtualTour: true, views: 150, leads: 4, updated: now - 5 * day, added: now - 25 * day, sky: 'sky-4' },
			{ id: 'p13', title: 'Retail Shop Unit, Ikeja City Mall Rd', location: 'Ikeja, Lagos', listingFor: 'rent', propertyType: 'shop', price: 1800000, paymentPeriod: 'quarterly', bedrooms: 0, sizeSqm: 65, status: 'draft', boosted: false, boostExpiresAt: null, brandNew: false, virtualTour: false, views: 0, leads: 0, updated: now - 2 * hour, added: now - 2 * hour, sky: 'sky-1' },
			{ id: 'p14', title: 'Commercial Plaza, Trans Amadi Industrial Layout', location: 'Trans Amadi, Port Harcourt', listingFor: 'sale', propertyType: 'commercial', price: 410000000, paymentPeriod: null, bedrooms: 0, sizeSqm: 980, status: 'published', boosted: false, boostExpiresAt: null, brandNew: false, virtualTour: false, views: 980, leads: 14, updated: now - 15 * day, added: now - 140 * day, sky: 'sky-2' }
		];
	}

	function defaultFilters() {
		return {
			search: '',
			status: 'all',
			type: 'all',
			priceMin: null,
			priceMax: null,
			sizeMin: null,
			sizeMax: null,
			bedrooms: 'any',
			brandNew: false,
			virtualTour: false,
			paymentPeriod: 'any',
			sort: 'updated-desc'
		};
	}

	/* ────────────────────────────────────────────
	   FORMAT HELPERS
	──────────────────────────────────────────── */
	function fmtN(n) {
		return n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k` : String(n);
	}
	function fmtPrice(n) {
		if (n >= 1e9) return `₦${(n / 1e9).toFixed(1).replace(/\.0$/, '')}B`;
		if (n >= 1e6) return `₦${(n / 1e6).toFixed(1).replace(/\.0$/, '')}M`;
		if (n >= 1e3) return `₦${(n / 1e3).toFixed(0)}k`;
		return `₦${n}`;
	}
	const PERIOD_SUFFIX = { monthly: '/mo', quarterly: '/qtr', 'bi-annually': '/6mo', yearly: '/yr' };
	function priceLabel(p) {
		return fmtPrice(p.priceAmount) + (p.listingFor === ListingFor.RENT ? (PERIOD_SUFFIX[p.paymentPeriod] ?? '') : '');
	}
	function isResidential(listingTypeId: string) {
		const t = listingTypes.find(({ id, propertyCategory }) => id === listingTypeId && propertyCategory === PropertyCategory.RESIDENTIAL);
		if (!t) return false;
		return t.isResidential;
	}
	function boostTimeLeft(expiresAt, nowMs: number) {
		const diff = expiresAt - nowMs;
		if (diff <= 0) return null;
		const totalHours = Math.floor(diff / 3600000);
		const days = Math.floor(totalHours / 24);
		const hours = totalHours % 24;
		const urgent = totalHours < 24;
		const text = days > 0 ? `${days}d ${hours}h left` : `Expires in ${hours}h`;
		return { text, urgent };
	}

	/* ────────────────────────────────────────────
	   TINY LOCAL ACTION — closes a popover on outside click
	──────────────────────────────────────────── */
	function clickOutside(node, onOutsideClick) {
		function handleClick(event) {
			if (node && !node.contains(event.target)) onOutsideClick?.(event);
		}
		document.addEventListener('click', handleClick, true);
		return {
			update(newHandler) {
				onOutsideClick = newHandler;
			},
			destroy() {
				document.removeEventListener('click', handleClick, true);
			}
		};
	}

	/* ────────────────────────────────────────────
	   STATE
	──────────────────────────────────────────── */
	let props = $state(createInitialProps());
	let filters = $state(defaultFilters());
	let currentPage = $state(1);
	let perPage = $state(9);
	let now = $state(Date.now()); // ticks so boost countdowns stay live

	/* ────────────────────────────────────────────
	   FILTERING / SORTING / PAGINATION (derived)
	──────────────────────────────────────────── */
	let filtered = $derived.by(() =>
		props.filter((p) => {
			if (filters.status !== 'all' && p.status !== filters.status) return false;
			if (filters.type !== 'all' && p.propertyType !== filters.type) return false;
			if (filters.search && !p.title.toLowerCase().includes(filters.search) && !p.location.toLowerCase().includes(filters.search)) return false;
			if (filters.priceMin != null && p.price < filters.priceMin) return false;
			if (filters.priceMax != null && p.price > filters.priceMax) return false;
			if (filters.sizeMin != null && p.sizeSqm < filters.sizeMin) return false;
			if (filters.sizeMax != null && p.sizeSqm > filters.sizeMax) return false;
			if (filters.bedrooms !== 'any' && isResidential(p.propertyType) && p.bedrooms < parseInt(filters.bedrooms)) return false;
			if (filters.brandNew && !p.brandNew) return false;
			if (filters.virtualTour && !p.virtualTour) return false;
			if (filters.paymentPeriod !== 'any' && p.paymentPeriod !== filters.paymentPeriod) return false;
			return true;
		})
	);

	const SORTERS = {
		'updated-desc': (a, b) => b.updated - a.updated,
		'added-desc': (a, b) => b.added - a.added,
		'price-asc': (a, b) => a.price - b.price,
		'price-desc': (a, b) => b.price - a.price,
		'views-desc': (a, b) => b.views - a.views,
		'leads-desc': (a, b) => b.leads - a.leads,
		'size-desc': (a, b) => b.sizeSqm - a.sizeSqm,
		'size-asc': (a, b) => a.sizeSqm - b.sizeSqm,
		'boost-asc': (a, b) => {
			const av = a.boosted && a.boostExpiresAt ? a.boostExpiresAt : Infinity;
			const bv = b.boosted && b.boostExpiresAt ? b.boostExpiresAt : Infinity;
			return av - bv;
		}
	};

	// True regardless of current filters/search — comes from KPI data, not the filtered `listings` array
	let agencyHasAnyListings = $derived((kpis.totalListings ?? 0) > 0);

	let hasActiveFilters = $derived(Object.keys(cleanObject(filter, true)).length > 0);
	let noListingsAtAll = $derived(agencyHasAnyListings && !hasActiveFilters);
	let noResultsFromFilters = $derived(listings.length === 0 && hasActiveFilters);
	let totalPages = $derived(Math.max(1, Math.ceil(paginationControl.totalCount / selectedPageSize)));
	let safePage = $derived(Math.min(Math.max(paginationControl.currentPage, 1), paginationControl.totalCount));

	let resultsLabel = $derived(
		listings.length === 0
			? 'No listings found'
			: `Showing ${(safePage - 1) * selectedPageSize + 1}–${Math.min(safePage * selectedPageSize, paginationControl.totalCount)} of ${paginationControl.totalCount} listing${paginationControl.totalCount !== 1 ? 's' : ''}`
	);

	let activeCount = $derived.by(() => {
		let n = 0;
		if (filters.status !== 'all') n++;
		if (filters.type !== 'all') n++;
		if (filters.priceMin != null || filters.priceMax != null) n++;
		if (filters.sizeMin != null || filters.sizeMax != null) n++;
		if (filters.bedrooms !== 'any') n++;
		if (filters.brandNew) n++;
		if (filters.virtualTour) n++;
		if (filters.paymentPeriod !== 'any') n++;
		return n;
	});
	let moreCount = $derived.by(() => {
		let n = 0;
		if (filters.sizeMin != null || filters.sizeMax != null) n++;
		if (filters.bedrooms !== 'any') n++;
		if (filters.brandNew) n++;
		if (filters.virtualTour) n++;
		if (filters.paymentPeriod !== 'any') n++;
		return n;
	});

	let chips = $derived.by(() => {
		const list = [];
		if (filters.status !== 'all') list.push({ label: `Status: ${filters.status[0].toUpperCase()}${filters.status.slice(1)}`, patch: { status: 'all' } });
		if (filters.type !== 'all') list.push({ label: TYPE_LABEL[filters.type], patch: { type: 'all' } });
		if (filters.priceMin != null || filters.priceMax != null) {
			list.push({ label: `Price: ${filters.priceMin != null ? fmtPrice(filters.priceMin) : '0'} – ${filters.priceMax != null ? fmtPrice(filters.priceMax) : '∞'}`, patch: { priceMin: null, priceMax: null } });
		}
		if (filters.sizeMin != null || filters.sizeMax != null) {
			list.push({ label: `Size: ${filters.sizeMin ?? 0} – ${filters.sizeMax ?? '∞'} sqm`, patch: { sizeMin: null, sizeMax: null } });
		}
		if (filters.bedrooms !== 'any') list.push({ label: `${filters.bedrooms}+ beds`, patch: { bedrooms: 'any' } });
		if (filters.brandNew) list.push({ label: 'Brand New', patch: { brandNew: false } });
		if (filters.virtualTour) list.push({ label: 'Virtual Tour', patch: { virtualTour: false } });
		if (filters.paymentPeriod !== 'any') list.push({ label: `${filters.paymentPeriod[0].toUpperCase()}${filters.paymentPeriod.slice(1)}`, patch: { paymentPeriod: 'any' } });
		return list;
	});

	let kpiActive = $derived(props.filter((p) => p.status === 'published').length);
	let kpiViews = $derived(props.reduce((sum, p) => sum + p.views, 0));
	let kpiLeads = $derived(props.reduce((sum, p) => sum + p.leads, 0));
	let boostedLiveCount = $derived(props.filter((p) => p.boosted && p.boostExpiresAt && p.boostExpiresAt > now).length);

	let selectedListingType = $state<any>(null);
	let showBedroomsField = $derived(!(filter.listingTypeId !== '' && selectedListingType.propertyCategory !== 'RESIDENTIAL'));
	

	/* ────────────────────────────────────────────
	   FILTER HANDLERS
	──────────────────────────────────────────── */
	const updateFilters = (patch) => {
		filters = { ...filters, ...patch };
		currentPage = 1;
	}
	const setStatus = (status) => {
		updateFilters({ status });
	}
	const setType = (type) => {
		updateFilters({ type });
	}
	const onSearchInput = (e) => {
		updateFilters({ search: e.currentTarget.value.toLowerCase().trim() });
	}
	const onSortChange = (e: any) => {
		updateFilters({ sort: e.currentTarget.value });
	}
	const onPerPageChange = (e) => {
		perPage = Number(e.currentTarget.value);
		currentPage = 1;
	}
	const clearAllFilters = async () => {
		resetFilters();
		showToast('Filters cleared', 'success');

		// reload page_data
		await goto(1, perPage, cleanObject(filter, true));
	}
	const removeChip = (chip) => {
		updateFilters(chip.patch);
	}

	/* Price popover (desktop quick filter) */
	let pricePopoverOpen = $state(false);
	let priceDraft = $state({ min: null, max: null });
	const togglePricePopover = () => {
		if (!pricePopoverOpen) priceDraft = { min: filters.priceMin, max: filters.priceMax };
		pricePopoverOpen = !pricePopoverOpen;
	}
	const applyPricePopover = () => {
		pricePopoverOpen = false;
	}
	const clearPricePopover = () => {
		setFilterField('priceRange', { start: undefined, end: undefined });
		pricePopoverOpen = false;
	}

	/* Filter drawer (mobile "More filters") — status/type apply instantly,
	   price/size/bedrooms/payment/toggles are staged and applied together. */
	let drawerOpen = $state(false);
	let drawerDraft = $state({ priceMin: null, priceMax: null, sizeMin: null, sizeMax: null, bedrooms: 'any', paymentPeriod: 'any', brandNew: false, virtualTour: false });

	const openDrawer = () => {
		drawerDraft = {
			priceMin: filters.priceMin,
			priceMax: filters.priceMax,
			sizeMin: filters.sizeMin,
			sizeMax: filters.sizeMax,
			bedrooms: filters.bedrooms,
			paymentPeriod: filters.paymentPeriod,
			brandNew: filters.brandNew,
			virtualTour: filters.virtualTour
		};
		drawerOpen = true;
	}
	const showDrawerResults = () => {
		goto(1, 10, cleanObject(filter, true));
		drawerOpen = false;
	}
	const clearDrawerFilters = () => {
		resetFilters();
		goto(1);
	}

	const resetFilters = () => {
		filter = {
			searchTerm: "",
			listingTypeId: "",
			stateId: "",
			countryId: "",
			listingStatus: "",
			paymentPeriod: "",
			hasVirtualTour: false,
			isBrandNew: false,
			bedrooms: undefined,
			priceRange: { start: undefined, end: undefined },
			floorSizeRange: { start: undefined, end: undefined },
		}
	}

	/* Mobile sort sheet */
	let sortSheetOpen = $state(false);
	function chooseSort(value) {
		updateFilters({ sort: value });
		sortSheetOpen = false;
	}

	/* ────────────────────────────────────────────
	   LISTING ACTIONS
	──────────────────────────────────────────── */
	let archiveModalOpen = $state(false);
	let archivingId = $state<string | null>(null);
	let archivingProp = $state<any | null>(null);
	// let archivingProp = $derived(props.find((p) => p.id === archivingId) ?? null);

	let boostModalOpen = $state(false);
	let boostingId = $state<string | null>(null);
	let boostingProp = $derived(props.find((p) => p.id === boostingId) ?? null);

	const publishListing = async (id: string) => {
		try {
			const result = await new ApiRequests().publishListing(id);
			if (result.data.success) {
				const message = result.data.message ?? 'Listing published';
				showToast(message, "success");
				// Reload page_data
				goto(1, selectedPageSize, cleanObject(filter, true));
				return;
			}
		} catch(ex) {
			if (ex instanceof AxiosError) {
				const message = getErrorMessage(ex);
				showToast(message, 'error');
			}
			console.error(ex);
			return;
    	}
	}
	const openArchiveModal = (id: string) => {
		// find listing
		archivingProp = listings.find((l) => l.id === id);

		archivingId = id;
		archiveModalOpen = true;
	}
	const confirmArchive = async () => {
		if (!archivingId) return;

		try {
			const result = await new ApiRequests().archiveListing(archivingId);
			if (result.data.success) {
				archiveModalOpen = false;

				const message = result.data.message ?? 'Listing taken down.';
				showToast(message, "success");
				// Reload page_data
				goto(1, selectedPageSize, cleanObject(filter, true));
				return;
			}
		} catch(ex) {
			if (ex instanceof AxiosError) {
				const message = getErrorMessage(ex);
				showToast(message, 'error');
			}
			console.error(ex);
			return;
    	}
	}
	const restoreListing = async (id: string) => {
		try {
			const result = await new ApiRequests().restoreListing(id);
			console.log({result})
			if (result.data.success) {
				const message = result.data.message ?? 'Listing restored.';
				showToast(message, "success");
				// Reload page_data
				goto(1, selectedPageSize, cleanObject(filter, true));
				return;
			}

		} catch (ex) {
			if (ex instanceof AxiosError) {
				const message = getErrorMessage(ex);
				showToast(message, 'error');
			}
			console.error(ex);
			return;
		}
	}
	const openBoostModal = (id: string) => {
		boostingId = id;
		boostModalOpen = true;
	}
	const confirmBoost = (planId: string) => {
		const plan = PLANS.find((pl) => pl.id === planId);
		if (!plan) return;
		props = props.map((p) => (p.id === boostingId ? { ...p, boosted: true, boostExpiresAt: Date.now() + plan.hours * 3600 * 1000, updated: Date.now() } : p));
		boostModalOpen = false;
		showToast(`Listing boosted for ${plan.label}.`);
	}

	/* ────────────────────────────────────────────
	   TOAST
	──────────────────────────────────────────── */
    let toastMsg     = $state('');
    let toastType = $state<ToastType>('info');
    let toastTimer: ReturnType<typeof setTimeout> | null = null;
	// ── Toast ──────────────────────────────────────────────────────────────────
    const showToast = (msg: string, type: ToastType = "info") => {
      toastMsg = msg;
      toastType = type;
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toastMsg = '', 3000);
    }

	// Keep boost countdowns fresh, same as the original 60s interval.
	$effect(() => {
		const id = setInterval(() => (now = Date.now()), 60000);
		return () => clearInterval(id);
	});

	function handleKeydown(e) {
		if (e.key !== 'Escape') return;
		boostModalOpen = false;
		archiveModalOpen = false;
		drawerOpen = false;
		sortSheetOpen = false;
		pricePopoverOpen = false;
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- ══ LAYOUT SHELL ══ -->
<div class="flex pt-[68px] min-h-screen">
    <AgencySidebar />

		<!-- ══ MAIN CONTENT ══ -->
		<main class="flex-1 min-w-0 overflow-x-hidden">
			<!-- PAGE HEADER -->
			<div class="bg-navy-dark dark:bg-[#080F1C] px-6 lg:px-10 py-8 border-b border-white/[0.06] tt">
				<div class="max-w-[1100px] mx-auto">
					<div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
						<div>
							<p class="text-[10px] font-medium tracking-[.18em] uppercase text-blue-bright mb-2">Agency dashboard</p>
							<h1 class="font-display font-light text-white leading-[1.05]" style="font-size:clamp(26px,3.5vw,40px)">
								Agency <em class="italic text-gold">listings.</em>
							</h1>
							<p class="text-[13px] font-light text-white/50 mt-2 flex items-center gap-2 flex-wrap">
								<span class="w-[6px] h-[6px] rounded-full bg-sage pulse-dot"></span>
								Manage every listing in seconds
							</p>
						</div>
						<div class="flex items-center gap-2.5 flex-wrap">
							<a href={generateAddListingUrl()} class="flex items-center gap-2 text-[13px] font-medium text-white bg-ember hover:bg-ember-deep px-4 py-[9px] rounded-full tt no-underline cursor-pointer">
								<svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" /></svg>
								Add listing
							</a>
						</div>
					</div>

					<!-- KPI cards -->
					<div class="grid grid-cols-3 gap-4 mt-7 stat-grid-2">
						<div class="stat-card bg-white/[.06] dark:bg-white/[.04] border border-white/[.09] rounded-2xl p-4 tt cursor-default">
							<div class="text-[11px] text-white/50 mb-2 flex items-center gap-1.5">
								<span class="w-2 h-2 rounded-full bg-sage pulse-dot"></span>Active listings
							</div>
							<div class="font-display font-semibold text-white leading-none" style="font-size:28px">
								{kpis.activeListings ?? 0}
							</div>
						</div>
						<div class="stat-card bg-white/[.06] dark:bg-white/[.04] border border-white/[.09] rounded-2xl p-4 tt cursor-default">
							<div class="text-[11px] text-white/50 mb-2 flex items-center gap-1.5">
								<svg width="12" height="12" viewBox="0 0 14 14" fill="none">
									<path d="M1 7s3-5 6-5 6 5 6 5-3 5-6 5-6-5-6-5z" stroke="rgba(74,144,226,.8)" stroke-width="1.2" />
									<circle cx="7" cy="7" r="2" stroke="rgba(74,144,226,.8)" stroke-width="1.2" />
								</svg>
								Total views
							</div>
							<div class="font-display font-semibold text-white leading-none" style="font-size:28px">
								{kpis.totalViews ?fmtN(kpis.totalViews) : 0}
							</div>
						</div>
						<div class="stat-card bg-white/[.06] dark:bg-white/[.04] border border-white/[.09] rounded-2xl p-4 tt cursor-default">
							<div class="text-[11px] text-white/50 mb-2 flex items-center gap-1.5">
								<svg width="12" height="12" viewBox="0 0 14 14" fill="none">
									<path d="M2 11l3-4 2 2 3-5 3 7" stroke="rgba(212,174,58,.8)" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
								</svg>
								Leads
							</div>
							<div class="font-display font-semibold text-white leading-none" style="font-size:28px">
								{kpis.leads ? fmtN(kpis.leads) : 0}
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- BODY -->
			<div class="px-6 lg:px-10 py-7 max-w-[1100px] mx-auto space-y-5">
				<!-- CONTROLS BAR -->
				<div class="space-y-3 fu d1">
					<!-- Row 1: search (mobile: + filters/sort buttons) -->
					<div class="flex items-center gap-3 flex-wrap md:flex-nowrap">
						<div class="flex-1 min-w-[200px] relative">
							<svg class="absolute left-3.5 top-1/2 -translate-y-1/2 text-chalk-muted dark:text-[#6A7FA0] pointer-events-none" width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" stroke-width="1.4" /><path d="M11 11l3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" /></svg>
							<input type="text" 
								bind:value={filter.searchTerm}
								placeholder="Search by listing name…" 
								oninput={(e) => setFilterField('searchTerm', e.currentTarget.value)} 
								class="w-full bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.07] rounded-xl pl-9 pr-4 py-[10px] text-[13px] text-navy-dark dark:text-blue-100 placeholder-chalk-muted dark:placeholder-[#6A7FA0] outline-none focus:border-blue-bright/50 tt" 
							/>
						</div>

						<!-- Desktop: sort select -->
						<div class="sel-wrap flex-shrink-0 hidden md:inline-block">
							<select value={filters.sort} onchange={onSortChange} class="bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.07] rounded-xl text-[13px] text-navy-dark dark:text-blue-100 px-3 py-[10px] pr-7 outline-none cursor-pointer tt">
								{#each Object.entries(SORT_LABELS) as [value, label] (value)}
									<option {value}>{label}</option>
								{/each}
							</select>
						</div>

						<!-- Mobile: Filters + Sort buttons -->
						<div class="flex md:hidden gap-2 w-full sm:w-auto">
							<button onclick={openDrawer} class="flex-1 relative flex items-center justify-center gap-2 text-[13px] font-medium text-navy-dark dark:text-blue-100 bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.07] rounded-xl px-4 py-[10px] cursor-pointer tt">
								<svg width="14" height="14" viewBox="0 0 16 16" fill="none">
									<path d="M2 4h12M4.5 8h7M7 12h2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
								</svg>
								Filters
								{#if activeCount > 0}
									<span class="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-ember text-white text-[9px] font-semibold flex items-center justify-center">
										{activeCount}
									</span>
								{/if}
							</button>
							<button onclick={() => (sortSheetOpen = true)} class="flex-1 flex items-center justify-center gap-2 text-[13px] font-medium text-navy-dark dark:text-blue-100 bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.07] rounded-xl px-4 py-[10px] cursor-pointer tt">
								<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 4h8M6 8h4M7.5 12h1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" /></svg>
								Sort
							</button>
						</div>
					</div>

					<!-- Row 2 (desktop only): status pills + type + price popover + more filters -->
					<div class="hidden md:flex items-center gap-2 flex-wrap">
						<div class="flex gap-1.5 bg-chalk-2 dark:bg-[#1A2438] rounded-xl p-1">
						{#each Object.values(ListingStatus) as tab}
						{@const value = tab}
							<button
								onclick={() => setFilterField('listingStatus', value)}
								class="ptab {(filter.listingStatus === value) ? 'active' : ''} text-[11px] font-medium px-3.5 py-1.5 rounded-lg bg-transparent border-none cursor-pointer tt {filters.status === value ? '' : 'text-chalk-muted dark:text-[#6A7FA0]'}"
							>
								{capitalize(String(tab).replace('_', ' '))}
							</button>
						{/each}
						</div>

						<div class="sel-wrap">
							<select value={filter.listingTypeId} 
								onchange={(e) => {
									const selectedId = e.currentTarget.value;
									setFilterField('listingTypeId', selectedId);
									// set selected listing type
									const type = listingTypes.find(t => t.id === selectedId);
									if (type) { selectedListingType = type; }
								}} 
								class="bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.07] rounded-xl text-[12px] text-navy-dark dark:text-blue-100 px-3 py-[8px] pr-7 outline-none cursor-pointer tt"
							>
								<option value="">All types</option>
								{#each listingTypes as _}
								<option value={_.id}>
									{_.displayName}
								</option>
								{/each}
							</select>
						</div>

						<!-- Price popover trigger -->
						<div class="relative" use:clickOutside={() => (pricePopoverOpen = false)}>
							<button onclick={togglePricePopover} class="flex items-center gap-1.5 bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.07] rounded-xl text-[12px] text-navy-dark dark:text-blue-100 px-3 py-[8px] cursor-pointer tt">
								Price
								{#if filters.priceMin != null || filters.priceMax != null}
									<span class="w-1.5 h-1.5 rounded-full bg-ember"></span>
								{/if}
								<svg width="9" height="9" viewBox="0 0 10 10" fill="none">
									<path d="M2 3.5l3 3 3-3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" />
								</svg>
							</button>
							{#if pricePopoverOpen}
								<div class="popover absolute left-0 top-full mt-1.5 w-[240px] bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-xl shadow-lg z-50 p-4 tt">
									<p class="text-[10px] font-medium tracking-[.1em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2.5">Price range (₦)</p>
									<div class="flex items-center gap-2 mb-3">
										<input type="number" 
											placeholder="Min" 
											class="inp !py-2 !text-[12px]" 
											value={filter.priceRange.start ?? ''} 
											oninput={(e) => {
												const value = e.currentTarget.value === '' ? undefined : Number(e.currentTarget.value);
												setFilterField('priceRange', { ...filter.priceRange, start: value })
											}}
										/>
										<span class="text-chalk-muted dark:text-[#6A7FA0] text-[12px]">–</span>
										<input type="number" 
											placeholder="Max" 
											class="inp !py-2 !text-[12px]"
											value={filter.priceRange.end ?? ''} 
											oninput={(e) => {
												const value = e.currentTarget.value === '' ? undefined : Number(e.currentTarget.value);
												setFilterField('priceRange', { ...filter.priceRange, end: value })
											}}
										/>
									</div>
									<div class="flex gap-2">
										<button onclick={clearPricePopover} class="flex-1 py-1.5 text-[12px] font-medium text-chalk-muted dark:text-[#6A7FA0] bg-chalk-2 dark:bg-[#1A2438] rounded-lg border-none cursor-pointer tt">Clear</button>
										<button onclick={applyPricePopover} class="flex-1 py-1.5 text-[12px] font-medium text-white bg-navy-dark hover:bg-navy-mid rounded-lg border-none cursor-pointer tt">Apply</button>
									</div>
								</div>
							{/if}
						</div>

						<!-- More filters -->
						<button onclick={openDrawer} class="relative flex items-center gap-1.5 bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.07] rounded-xl text-[12px] text-navy-dark dark:text-blue-100 px-3 py-[8px] cursor-pointer tt">
							<svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M4.5 8h7M7 12h2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" /></svg>
							More filters
							{#if moreCount > 0}
								<span class="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-ember text-white text-[9px] font-semibold flex items-center justify-center">{moreCount}</span>
							{/if}
						</button>
					</div>

					<!-- Active filter chips -->
					{#if chips.length > 0}
						<div class="flex flex-wrap items-center gap-1.5">
							{#each chips as chip (chip.label)}
								<span class="fchip inline-flex items-center gap-1.5 bg-navy-dark/[.06] dark:bg-white/[.07] text-navy-dark dark:text-blue-100 text-[11px] font-medium px-3 py-1.5 rounded-full">
									{chip.label}
									<button onclick={() => removeChip(chip)} aria-label="Remove filter" class="border-none bg-transparent cursor-pointer p-0 flex items-center text-chalk-muted dark:text-[#6A7FA0] hover:text-ember">
										<svg width="9" height="9" viewBox="0 0 10 10" fill="none">
											<path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
										</svg>
									</button>
								</span>
							{/each}
							<button onclick={clearAllFilters} class="text-[11px] font-medium text-ember hover:text-ember-deep bg-transparent border-none cursor-pointer px-1 tt">Clear all</button>
						</div>
					{/if}

					<!-- Results label -->
					<p class="text-[13px] font-light text-chalk-muted dark:text-[#6A7FA0]">
						{resultsLabel}
					</p>
				</div>

				<!-- CARD GRID -->
				<div class="fu d2">
					{#if noResultsFromFilters}
					<div class="py-16 text-center empty-border rounded-2xl">
						<div class="w-14 h-14 rounded-2xl bg-chalk-2 dark:bg-white/[.05] flex items-center justify-center mx-auto mb-5">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" class="text-chalk-muted dark:text-[#6A7FA0]"><circle cx="10" cy="10" r="7" /><path d="M21 21l-5-5" /></svg>
						</div>
						<h3 class="font-display font-light text-navy-dark dark:text-blue-100 mb-2" style="font-size:22px">No listings match your <em class="italic">current filters.</em></h3>
						<p class="text-[13px] font-light text-chalk-muted dark:text-[#6A7FA0]">Try broadening your search or clearing a few filters.</p>
						<button onclick={clearAllFilters} class="mt-5 inline-flex items-center gap-2 text-[13px] font-medium text-white bg-navy-dark hover:bg-navy-mid px-5 py-2.5 rounded-full border-none cursor-pointer tt">
							Clear Filters
						</button>
					</div>
					{:else if noListingsAtAll}
						<div class="py-16 text-center empty-border rounded-2xl">
							<div class="w-14 h-14 rounded-2xl bg-chalk-2 dark:bg-white/[.05] flex items-center justify-center mx-auto mb-5">
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" class="text-chalk-muted dark:text-[#6A7FA0]"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path d="M9 22V12h6v10" /></svg>
							</div>
							<h3 class="font-display font-light text-navy-dark dark:text-blue-100 mb-2" style="font-size:22px">You haven't added any <em class="italic">listings yet.</em></h3>
							<p class="text-[13px] font-light text-chalk-muted dark:text-[#6A7FA0] max-w-[280px] mx-auto">Once you add a property, it will appear here for you to manage.</p>
							<a href={generateAddListingUrl()} class="mt-5 inline-flex items-center gap-2 text-[13px] font-medium text-white bg-ember hover:bg-ember-deep px-5 py-2.5 rounded-full border-none cursor-pointer tt no-underline">
								<svg width="12" height="12" viewBox="0 0 14 14" fill="none">
									<path d="M7 1v12M1 7h12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
								</svg>
								Add Your First Listing
							</a>
						</div>
					{:else}
						<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 card-grid">
						{#each listings as listing (listing.id)}
						{@const typeCss = listing.listingFor === ListingFor.SALE ? 'type-sale' : 'type-rent'}
						{@const forLabel = listing.listingFor === ListingFor.SALE ? 'For Sale' : 'For Rent'}

						{@const currentBoost = (listing.listingBoosts ?? []).find((b) => !b.isExpired)}
						{@const boost = listing.isBoosted && currentBoost.boostEnd ? boostTimeLeft(currentBoost.boostEnd, now) : null}
						{@const statusCfg = STATUS_CFG[listing.listingStatus] ?? STATUS_CFG.draft}

						<div class="prop-card bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.07] rounded-2xl overflow-hidden tt">
							<div class="h-[128px] relative">
								<img class="w-full h-full object-cover" src={findCoverImage(listing)} />
								<span class="{typeCss} absolute top-2.5 left-2.5 text-[9px] font-semibold uppercase tracking-[.08em] px-2 py-[3px] rounded-full">
									{listing.listingType.displayName}
								</span>
								<span class="{statusCfg.css} absolute top-2.5 right-2.5 text-[9px] font-semibold uppercase tracking-[.06em] px-2 py-[3px] rounded-full">{statusCfg.label}</span>
								{#if boost}
									<span class="boost-badge {boost.urgent ? 'urgent boost-glow' : ''} absolute bottom-2.5 left-2.5 flex items-center gap-1 text-[9.5px] font-semibold px-2.5 py-[4px] rounded-full">
										<svg width="9" height="9" viewBox="0 0 14 14" fill="none"><path d="M7 1l1.5 3.5 3.5.5-2.5 2.4.6 3.5L7 9.5l-3.1 1.4.6-3.5L2 5l3.5-.5z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round" /></svg>
										Boosted · {boost.text}
									</span>
								{/if}
							</div>

							<div class="p-4">
								<div class="flex items-center justify-between gap-2 mb-0.5">
									<div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-snug" style="font-size:16px">{priceLabel(listing)}</div>
									<span class="text-[9.5px] font-medium text-chalk-muted dark:text-[#6A7FA0] uppercase tracking-[.05em] flex-shrink-0">{forLabel}</span>
								</div>
								<div class="text-[12px] font-medium text-navy-dark dark:text-blue-100 truncate mb-0.5 capitalize">
									{listing.title}
								</div>
								<div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] truncate mb-3">{listing.address}</div>

								<div class="flex items-center gap-2 text-[11px] text-chalk-muted dark:text-[#6A7FA0] pb-3 mb-3 border-b border-chalk-3 dark:border-white/[.06]">
									{#if isResidential(listing.listingTypeId) && listing.bedrooms > 0}
										<span>{listing.bedrooms} bed{listing.bedrooms > 1 ? 's' : ''}</span>
										<span class="text-chalk-4 dark:text-white/20">·</span>
									{/if}
									<span>{listing.sizeSqm} sqm</span>
								</div>

								<div class="flex items-center gap-1.5 flex-wrap">
									<a href="/agency/listings/{listing.slug}" 
										title="View listing" 
										class="w-7 h-7 rounded-lg bg-chalk-2 dark:bg-white/[.05] border border-chalk-3 dark:border-white/[.07] flex items-center justify-center hover:border-blue-bright/40 tt cursor-pointer no-underline">
										<svg width="12" height="12" viewBox="0 0 14 14" fill="none" class="text-chalk-muted dark:text-[#6A7FA0]">
											<path d="M1 7s3-5 6-5 6 5 6 5-3 5-6 5-6-5-6-5z" stroke="currentColor" stroke-width="1.2" />
											<circle cx="7" cy="7" r="2" stroke="currentColor" stroke-width="1.2" />
										</svg>
									</a>
									<a href="/agency/listings/edit/{listing.slug}" 
										title="Edit listing" class="w-7 h-7 rounded-lg bg-chalk-2 dark:bg-white/[.05] border border-chalk-3 dark:border-white/[.07] flex items-center justify-center hover:border-blue-bright/40 tt cursor-pointer no-underline">
										<svg width="12" height="12" viewBox="0 0 14 14" fill="none" class="text-chalk-muted dark:text-[#6A7FA0]">
											<path d="M9.5 2.5l2 2L4 12H2v-2L9.5 2.5z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round" />
										</svg>
									</a>

									{#if listing.listingStatus === ListingStatus.DRAFT}
										<button type="button"
											title="Publish listing" 
											onclick={() => publishListing(listing.id)} 
											class="flex items-center gap-1.5 h-7 px-3 rounded-lg bg-sage text-white text-[11px] font-medium border-none hover:brightness-95 tt cursor-pointer">
											<svg width="10" height="10" viewBox="0 0 14 14" fill="none">
												<path d="M2 7h10M7 2l5 5-5 5" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
											</svg>
											Publish
										</button>
									{:else if listing.listingStatus === ListingStatus.PUBLISHED}
										{#if !listing.isBoosted}
											<button type="button"
												title="Boost listing" 
												onclick={() => openBoostModal(listing.id)} 
												class="w-7 h-7 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center hover:bg-gold/20 tt cursor-pointer">
												<svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M7 1l1.5 3.5 3.5.5-2.5 2.4.6 3.5L7 9.5l-3.1 1.4.6-3.5L2 5l3.5-.5z" stroke="#D4AE3A" stroke-width="1.2" stroke-linejoin="round" /></svg>
											</button>
										{/if}
										<button title="Take down" 
											type="button"
											onclick={() => openArchiveModal(listing.id)} 
											class="w-7 h-7 rounded-lg bg-chalk-2 dark:bg-white/[.05] border border-chalk-3 dark:border-white/[.07] flex items-center justify-center hover:border-ember/40 tt cursor-pointer">
											<svg width="12" height="12" viewBox="0 0 14 14" fill="none" class="text-chalk-muted dark:text-[#6A7FA0]"><path d="M3 6h8M5 6V4h4v2M4 6l1 7h4l1-7" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" /></svg>
										</button>
									{:else if listing.listingStatus === ListingStatus.ARCHIVED}
										<button type="button"
											title="Restore listing" 
											onclick={() => restoreListing(listing.id)} class="flex items-center gap-1.5 h-7 px-3 rounded-lg bg-chalk-2 dark:bg-white/[.05] border border-chalk-3 dark:border-white/[.07] text-[11px] font-medium text-navy-dark dark:text-blue-100 hover:border-sage/50 tt cursor-pointer">
											<svg width="10" height="10" viewBox="0 0 14 14" fill="none" class="text-sage"><path d="M2 7a5 5 0 1010 0 5 5 0 00-10 0zM9 5L7 7l-2-2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" /></svg>
											Restore
										</button>
									{/if}
								</div>
							</div>
						</div>
						{/each}
						</div>
					{/if}
				</div>

				<!-- PAGINATION -->
				{#if paginationControl && listings.length > 0}
				<Pagination
					currentPage={paginationControl.currentPage}
					pageSize={paginationControl.pageSize}
					totalCount={paginationControl.totalCount}
					totalPages={paginationControl.totalPages}
					hasNext={paginationControl.hasNext}
					hasPrevious={paginationControl.hasPrevious}
					onPageChange={handlePageChange}
					onPerPageChange={handlePerPageChange}
			  	/>
				{/if}
			</div>
		</main>
	</div>

	<!-- ══ FILTER DRAWER (mobile "More filters") ══ -->
	{#if drawerOpen}
		<div class="fixed inset-0 z-[100]">
			<div class="modal-bg absolute inset-0" onclick={() => (drawerOpen = false)} role="presentation"></div>
			<div class="slide-in-r absolute right-0 top-0 bottom-0 w-full max-w-[380px] bg-white dark:bg-[#0D1422] shadow-2xl flex flex-col tt">
				<div class="px-6 py-5 border-b border-chalk-3 dark:border-white/[.07] flex items-center justify-between flex-shrink-0">
					<span class="text-[15px] font-medium text-navy-dark dark:text-blue-100">Filters</span>
					<button onclick={() => (drawerOpen = false)} aria-label="Close" class="w-7 h-7 rounded-full bg-chalk-2 dark:bg-white/10 flex items-center justify-center cursor-pointer hover:bg-chalk-3 tt border-none">
						<svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" class="text-chalk-muted dark:text-[#6A7FA0]" /></svg>
					</button>
				</div>

				<div class="flex-1 overflow-y-auto px-6 py-5 space-y-6">
					<!-- Mobile-only: status + type (apply immediately) -->
					<div class="space-y-5 md:hidden">
						<div>
							<p class="text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2">Status</p>
							<div class="flex flex-wrap gap-1.5">
								{#each Object.values(ListingStatus) as tab}
								{@const value = ListingStatus[tab]}
									<button
										onclick={() => setFilterField('listingStatus', tab)}
										class="ptab {filter.listingStatus === value ? 'active' : ''} text-[12px] font-medium px-3.5 py-1.5 rounded-lg bg-chalk-2 dark:bg-[#1A2438] border-none cursor-pointer tt {filters.status === tab.value ? '' : 'text-chalk-muted dark:text-[#6A7FA0]'}"
									>
										{capitalize(String(tab).replace('_', ' '))}
									</button>
								{/each}
							</div>
						</div>
						<div>
							<p class="text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2">
								Listing type
							</p>
							<div class="sel-wrap w-full">
								<select class="inp pr-7 cursor-pointer"
									value={filter.listingTypeId} 
									onchange={(e) => {
										const selectedId = e.currentTarget.value;
										setFilterField('listingTypeId', selectedId);
										// set selected listing type
										const type = listingTypes.find(t => t.id === selectedId);
										if (type) { selectedListingType = type; }
									}}
								>
									<option value="">All types</option>
									{#each listingTypes as _}
									<option value={_.id}>{_.displayName}</option>
									{/each}
								</select>
							</div>
						</div>
					</div>

					<!-- Price range -->
					<div>
						<p class="text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2">Price range (₦)</p>
						<div class="flex items-center gap-2">
							<input type="number" 
								placeholder="Min" 
								class="inp"
								value={filter.priceRange.start ?? ''} 
								oninput={(e) => {
									const value = e.currentTarget.value === '' ? undefined : Number(e.currentTarget.value);
									setFilterField('priceRange', { ...filter.priceRange, start: value })
								}}
							/>
							<span class="text-chalk-muted dark:text-[#6A7FA0] text-[12px]">–</span>
							<input type="number" 
								class="inp"
								placeholder="Max" 
								value={filter.priceRange.end ?? ''} 
								oninput={(e) => {
									const value = e.currentTarget.value === '' ? undefined : Number(e.currentTarget.value);
									setFilterField('priceRange', { ...filter.priceRange, end: value })
								}}
							/>
						</div>
					</div>

					<!-- Size -->
					<div>
						<p class="text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2">Size (sqm)</p>
						<div class="flex items-center gap-2">
							<input type="number" 
								class="inp"
								placeholder="Min" 
								value={filter.floorSizeRange.start ?? ''} 
								oninput={(e) => {
									const value = e.currentTarget.value === '' ? undefined : Number(e.currentTarget.value);
									setFilterField('floorSizeRange', { ...filter.floorSizeRange, start: value })
								}}
							/>
							<span class="text-chalk-muted dark:text-[#6A7FA0] text-[12px]">–</span>
							<input type="number" 
								class="inp"
								placeholder="Max" 
								value={filter.floorSizeRange.end ?? ''} 
								oninput={(e) => {
									const value = e.currentTarget.value === '' ? undefined : Number(e.currentTarget.value);
									setFilterField('floorSizeRange', { ...filter.floorSizeRange, end: value })
								}}
							/>
						</div>
					</div>

					<!-- Bedrooms (conditional on the currently applied type) -->
					{#if showBedroomsField}
						<div>
							<p class="text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2">Bedrooms</p>
							<div class="sel-wrap w-full">
								<select class="inp pr-7 cursor-pointer"
								 	bind:value={filter.bedrooms}
									onchange={(e) => {
										const value =  e.currentTarget.value === '' ? undefined : Number(e.currentTarget.value);
										setFilterField('bedrooms', value);
									}}
									>
									<option value="">Any</option>
									<option value="1">1+</option>
									<option value="2">2+</option>
									<option value="3">3+</option>
									<option value="4">4+</option>
									<option value="5">5+</option>
								</select>
							</div>
						</div>
					{/if}

					<!-- Payment period -->
					<div>
						<p class="text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2">Payment period</p>
						<div class="sel-wrap w-full">
							<select bind:value={filter.paymentPeriod} 
								class="inp pr-7 cursor-pointer"
								onchange={(e) => setFilterField('paymentPeriod', e.currentTarget.value)}>
								<option value="">Any</option>
								{#each Object.values(ListingPaymentDuration) as _}
								<option value={_}>
									{capitalize(_)?.replace('_', ' ')}
								</option>
								{/each}
							</select>
						</div>
					</div>

					<!-- Toggles -->
					<div class="space-y-4">
						<div class="flex items-center justify-between">
							<span class="text-[13px] text-navy-dark dark:text-blue-100">Brand New</span>
							<div
								class="tswitch {filter.isBrandNew ? 'on' : ''}"
								onclick={() => setFilterField('isBrandNew', !filter.isBrandNew)}
								onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setFilterField('isBrandNew', !filter.isBrandNew))}
								role="switch"
								aria-checked={filter.isBrandNew}
								tabindex="0"
							>
								<span class="knob"></span>
							</div>
						</div>
						<div class="flex items-center justify-between">
							<span class="text-[13px] text-navy-dark dark:text-blue-100">Has Virtual Tour</span>
							<div
								class="tswitch {filter.hasVirtualTour ? 'on' : ''}"
								onclick={() => setFilterField('hasVirtualTour', !filter.hasVirtualTour)}
								onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setFilterField('hasVirtualTour', !filter.hasVirtualTour))}
								role="switch"
								aria-checked={filter.hasVirtualTour}
								tabindex="0"
							>
								<span class="knob"></span>
							</div>
						</div>
					</div>
				</div>

				<div class="px-6 py-5 border-t border-chalk-3 dark:border-white/[.07] flex gap-3 flex-shrink-0">
					<button onclick={clearDrawerFilters} 
						class="flex-1 py-3 text-[13px] font-medium text-chalk-muted dark:text-[#6A7FA0] bg-chalk-2 dark:bg-[#1A2438] rounded-full border-none cursor-pointer hover:bg-chalk-3 tt">
						Clear all
					</button>
					<button onclick={showDrawerResults} 
						class="flex-1 py-3 text-[13px] font-medium text-white bg-navy-dark hover:bg-navy-mid rounded-full border-none cursor-pointer tt">
						Show results
					</button>
				</div>
			</div>
		</div>
	{/if}

	<!-- ══ MOBILE SORT SHEET ══ -->
	{#if sortSheetOpen}
		<div class="fixed inset-0 z-[100] flex items-end">
			<div class="modal-bg absolute inset-0" onclick={() => (sortSheetOpen = false)} role="presentation"></div>
			<div class="scale-in relative w-full bg-white dark:bg-[#0D1422] rounded-t-2xl overflow-hidden tt max-h-[80vh] overflow-y-auto">
				<div class="px-6 py-5 border-b border-chalk-3 dark:border-white/[.07] flex items-center justify-between">
					<span class="text-[15px] font-medium text-navy-dark dark:text-blue-100">Sort by</span>
					<button onclick={() => (sortSheetOpen = false)} aria-label="Close" class="w-7 h-7 rounded-full bg-chalk-2 dark:bg-white/10 flex items-center justify-center cursor-pointer hover:bg-chalk-3 tt border-none">
						<svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" class="text-chalk-muted dark:text-[#6A7FA0]" /></svg>
					</button>
				</div>
				<div class="py-2">
					{#each Object.entries(SORT_LABELS) as [value, label] (value)}
						<button
							onclick={() => chooseSort(value)}
							class="w-full flex items-center justify-between px-6 py-3.5 text-[13px] text-left bg-transparent border-none cursor-pointer tt hover:bg-chalk-2 dark:hover:bg-white/[.04] {filters.sort === value ? 'text-navy-dark dark:text-blue-100 font-medium' : 'text-chalk-muted dark:text-[#6A7FA0]'}"
						>
							{label}
							{#if filters.sort === value}
								<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l3.5 3.5L12 3" stroke="#4A90E2" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
							{/if}
						</button>
					{/each}
				</div>
			</div>
		</div>
	{/if}

	{#if toastMsg  && toastMsg !== ''}
	<Toast toastMsg={toastMsg} type={toastType} />
	{/if}

	<!-- ══ MODALS ══ -->
	<BoostModal open={boostModalOpen} 
		property={boostingProp} 
		onClose={() => (boostModalOpen = false)} 
		onConfirm={confirmBoost} 
	/>
	<ArchiveModal open={archiveModalOpen} 
		property={archivingProp} 
		onClose={() => (archiveModalOpen = false)} 
		onConfirm={confirmArchive} 
	/>

<style>
	:global(.tt) {
		transition: background-color 0.3s, color 0.3s, border-color 0.3s;
	}
	:global(.scrollbar-hide::-webkit-scrollbar) {
		display: none;
	}
	:global(.scrollbar-hide) {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	@keyframes -global-pulse-dot {
		0%, 100% { opacity: 1; transform: scale(1); }
		50% { opacity: 0.4; transform: scale(0.8); }
	}
	:global(.pulse-dot) {
		animation: pulse-dot 2.2s infinite;
	}

	@keyframes -global-fadeUp {
		from { opacity: 0; transform: translateY(16px); }
		to { opacity: 1; transform: translateY(0); }
	}
	:global(.fu) {
		animation: fadeUp 0.55s ease both;
	}
	:global(.d1) { animation-delay: 0.04s; }
	:global(.d2) { animation-delay: 0.09s; }
	:global(.d3) { animation-delay: 0.14s; }

	@keyframes -global-scaleIn {
		from { opacity: 0; transform: scale(0.97) translateY(8px); }
		to { opacity: 1; transform: scale(1) translateY(0); }
	}
	:global(.scale-in) {
		animation: scaleIn 0.26s cubic-bezier(0.22, 0.68, 0, 1.2) both;
	}

	@keyframes -global-slideInR {
		from { transform: translateX(100%); }
		to { transform: translateX(0); }
	}
	:global(.slide-in-r) {
		animation: slideInR 0.32s cubic-bezier(0.22, 0.68, 0, 1.2) both;
	}

	:global(.sb-link.active) {
		background: rgba(74, 144, 226, 0.12);
		color: #4a90e2;
		font-weight: 500;
	}
	:global(.dark .sb-link.active) {
		background: rgba(74, 144, 226, 0.15);
	}
	:global(.sb-link:not(.active):hover) {
		background: rgba(10, 36, 99, 0.05);
	}
	:global(.dark .sb-link:not(.active):hover) {
		background: rgba(255, 255, 255, 0.04);
	}

	:global(.stat-card) {
		transition: transform 0.22s, box-shadow 0.22s;
	}
	:global(.stat-card:hover) {
		transform: translateY(-2px);
		box-shadow: 0 12px 36px rgba(10, 36, 99, 0.11);
	}
	:global(.dark .stat-card:hover) {
		box-shadow: 0 12px 36px rgba(0, 0, 0, 0.38);
	}

	:global(.prop-card) {
		transition: transform 0.22s, box-shadow 0.22s, border-color 0.22s;
	}
	:global(.prop-card:hover) {
		transform: translateY(-2px);
		box-shadow: 0 14px 40px rgba(10, 36, 99, 0.1);
	}
	:global(.dark .prop-card:hover) {
		box-shadow: 0 14px 40px rgba(0, 0, 0, 0.38);
	}

	:global(.sp-published) { background: #eff3ee; color: #4a7848; }
	:global(.dark .sp-published) { background: rgba(74, 120, 72, 0.2); color: #7dbf7a; }
	:global(.sp-archived) { background: #f5d5c5; color: #5c2416; }
	:global(.dark .sp-archived) { background: rgba(192, 96, 53, 0.15); color: #edba9b; }
	:global(.sp-draft) { background: rgba(10, 36, 99, 0.06); color: #4a70a0; }
	:global(.dark .sp-draft) { background: rgba(74, 112, 160, 0.1); color: #8daacc; }

	:global(.type-sale) { background: rgba(192, 96, 53, 0.1); color: #c06035; }
	:global(.dark .type-sale) { background: rgba(192, 96, 53, 0.15); color: #edba9b; }
	:global(.type-rent) { background: rgba(10, 36, 99, 0.07); color: #1f3f6a; }
	:global(.dark .type-rent) { background: rgba(74, 112, 160, 0.15); color: #8daacc; }

	:global(.boost-badge) { background: rgba(212, 174, 58, 0.94); color: #2e2405; }
	:global(.boost-badge.urgent) { background: rgba(192, 96, 53, 0.94); color: #fff; }
	@keyframes -global-boostGlow {
		0%, 100% { box-shadow: 0 0 0 0 rgba(212, 174, 58, 0); }
		50% { box-shadow: 0 0 0 6px rgba(212, 174, 58, 0.12); }
	}
	:global(.boost-glow) {
		animation: boostGlow 3s ease infinite;
	}

	:global(.pgbtn.active) { background: #0a2463; color: white; border-color: #0a2463; }
	:global(.dark .pgbtn.active) { background: #4a90e2; border-color: #4a90e2; }

	:global(.modal-bg) {
		background: rgba(6, 14, 28, 0.72);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
	}

	:global(.sel-wrap) {
		position: relative;
		display: inline-block;
	}
	:global(.sel-wrap::after) {
		content: '▾';
		position: absolute;
		right: 10px;
		top: 50%;
		transform: translateY(-50%);
		font-size: 11px;
		color: #8c8070;
		pointer-events: none;
	}
	:global(.dark .sel-wrap::after) {
		color: #6a7fa0;
	}
	:global(.sel-wrap select) {
		-webkit-appearance: none;
		appearance: none;
	}

	:global(.ptab.active) {
		background: white;
		color: #0a2463;
		box-shadow: 0 1px 4px rgba(10, 36, 99, 0.12);
	}
	:global(.dark .ptab.active) {
		background: #131c2e;
		color: #e8edf5;
	}

	:global(.fchip) {
		transition: background 0.18s, color 0.18s, border-color 0.18s;
	}

	:global(.inp) {
		background: #fff;
		border: 1.5px solid #ede7dc;
		border-radius: 10px;
		padding: 9px 13px;
		font-family: 'DM Sans', sans-serif;
		font-size: 13px;
		color: #0a2463;
		outline: none;
		width: 100%;
		transition: border-color 0.2s;
	}
	:global(.inp:focus) {
		border-color: rgba(74, 144, 226, 0.55);
	}
	:global(.dark .inp) {
		background: #1a2438;
		border-color: rgba(255, 255, 255, 0.1);
		color: #e8edf5;
	}
	:global(.inp::placeholder) {
		color: #8c8070;
	}
	:global(.dark .inp::placeholder) {
		color: #4a5568;
	}

	:global(.tswitch) {
		width: 38px;
		height: 22px;
		border-radius: 999px;
		background: #ede7dc;
		position: relative;
		cursor: pointer;
		transition: background 0.2s;
		flex-shrink: 0;
	}
	:global(.dark .tswitch) {
		background: rgba(255, 255, 255, 0.1);
	}
	:global(.tswitch.on) {
		background: #4a7848;
	}
	:global(.tswitch .knob) {
		position: absolute;
		top: 2px;
		left: 2px;
		width: 18px;
		height: 18px;
		border-radius: 999px;
		background: #fff;
		transition: transform 0.2s;
	}
	:global(.tswitch.on .knob) {
		transform: translateX(16px);
	}

	:global(.popover) {
		transition: opacity 0.16s, transform 0.16s;
	}

	:global(.sky-1) { background: linear-gradient(160deg, #0e2444 0%, #1f3f6a 55%, #4a70a0 100%); }
	:global(.sky-2) { background: linear-gradient(160deg, #0a2463 0%, #0e2444 45%, #1f3f6a 100%); }
	:global(.sky-3) { background: linear-gradient(155deg, #1f3f6a 0%, #4a70a0 60%, #8daacc 100%); }
	:global(.sky-4) { background: linear-gradient(160deg, #060e1c 0%, #0a2463 50%, #1f3f6a 100%); }
	:global(.sky-5) { background: linear-gradient(160deg, #0e2444 0%, #1a3255 40%, #4a70a0 100%); }
	:global(.sky-6) { background: linear-gradient(155deg, #0a2463 0%, #1f3f6a 55%, #4a70a0 100%); }

	:global(.empty-border) {
		border: 2px dashed #ede7dc;
	}
	:global(.dark .empty-border) {
		border-color: rgba(255, 255, 255, 0.08);
	}

	@media (max-width: 1024px) {
		:global(.stat-grid-2) {
			grid-template-columns: 1fr 1fr 1fr !important;
		}
	}
	@media (max-width: 640px) {
		:global(.stat-grid-2) {
			grid-template-columns: 1fr 1fr 1fr !important;
		}
		:global(.card-grid) {
			grid-template-columns: 1fr !important;
		}
	}
</style>