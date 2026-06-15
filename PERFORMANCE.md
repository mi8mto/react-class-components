# Performance Optimization Report

## Applied Optimizations

### 1. Stable Keys

Changed list rendering keys from array indexes to stable country IDs.

### 2. useMemo

Applied memoization for:

- Country filtering
- Country sorting
- Derived application data
- Available years
- Available columns

### 3. useCallback

Applied memoization for event handlers:

- Search handler
- Modal toggle handler
- Other frequently recreated callbacks

### 4. React.memo

Applied memoization for:

- CountryCard
- DataTable
- YearSelector

### 5. Virtualization

Implemented list virtualization using `@tanstack/react-virtual`.

This reduced the number of rendered country cards from hundreds to only visible items.

---

# Baseline Measurements

## Interaction A: Sort countries

- Render duration: **388.2 ms**
- Screenshot Ranked: `screenshots/baseline/sort-ranked.jpg`
- Screenshot Flamegraph: `screenshots/baseline/sort-flamegraph.jpg`

## Interaction B: Search countries

- Render duration: **24.1 ms**
- Screenshot Ranked: `screenshots/baseline/search-ranked.jpg`
- Screenshot Flamegraph: `screenshots/baseline/search-flamegraph.jpg`

## Interaction C: Change year

- Render duration: **416.8 ms**
- Screenshot Ranked: `screenshots/baseline/year-ranked.jpg`
- Screenshot Flamegraph: `screenshots/baseline/year-flamegraph.jpg`

## Interaction D: Toggle column

- Render duration: **26.5 ms**
- Screenshot Ranked: `screenshots/baseline/toggle-ranked.jpg`
- Screenshot Flamegraph: `screenshots/baseline/toggle-flamegraph.jpg`

---

# Optimized Measurements

## Interaction A: Sort countries

- Render duration: **17.4 ms**
- Screenshot Ranked: `screenshots/optimized/sort-ranked.jpg`
- Screenshot Flamegraph: `screenshots/optimized/sort-flamegraph.jpg`

## Interaction B: Search countries

- Render duration: **11 ms**
- Screenshot Ranked: `screenshots/optimized/search-ranked.jpg`
- Screenshot Flamegraph: `screenshots/optimized/search-flamegraph.jpg`

## Interaction C: Change year

- Render duration: **97.1 ms**
- Screenshot Ranked: `screenshots/optimized/year-ranked.jpg`
- Screenshot Flamegraph: `screenshots/optimized/year-flamegraph.jpg`

## Interaction D: Toggle column

- Render duration: **6.9 ms**
- Screenshot Ranked: `screenshots/optimized/toggle-ranked.jpg`
- Screenshot Flamegraph: `screenshots/optimized/toggle-flamegraph.jpg`

---

# Summary of Improvements

| Interaction      | Baseline (ms) | Optimized (ms) | Improvement |
| ---------------- | ------------: | -------------: | ----------: |
| Sort countries   |         388.2 |           17.4 |       95.5% |
| Search countries |          24.1 |           11.0 |       54.4% |
| Change year      |         416.8 |           97.1 |       76.7% |
| Toggle column    |          26.5 |            6.9 |       74.0% |

## Overall Result

The application performance was significantly improved through memoization, stable keys, and virtualization.

The biggest gains were achieved in:

- List rendering
- Country sorting
- Year switching
- Country filtering

Virtualization provided the largest performance improvement by reducing the number of rendered components.
