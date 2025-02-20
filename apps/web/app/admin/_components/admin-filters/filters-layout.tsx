import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import type { FilterState, FilterSection } from './admin-filters.utils'
import { DateRangeFilter } from './date-range-filter'
import { MobileFilters } from './mobile-filters'
import { RadioFilter } from './radio-filter'
import { SectionFilter } from './section-filter'

interface FiltersLayoutProps {
  filters: FilterState
  filterSections: FilterSection[]
  onFilterChange: (key: keyof FilterState, value: string | boolean | { start?: string; end?: string }) => void
  onClearFilter: (key: keyof FilterState) => void
  onMobileOpen: () => void
  mobileFiltersOpen: boolean
  onMobileClose: () => void
}

export function FiltersLayout({
  filters,
  filterSections,
  onFilterChange,
  onClearFilter,
  onMobileOpen,
  mobileFiltersOpen,
  onMobileClose
}: FiltersLayoutProps) {
  return (
    <div className="bg-white w-72 rounded-lg shadow-sm border border-gray-200 shrink-0">
      <div>
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
            <span className="text-lg font-medium text-gray-900">Filters</span>
          </div>
          <button
            type="button"
            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50"
            onClick={onMobileOpen}
          >
            <span className="sr-only">Open filters</span>
            <AdjustmentsHorizontalIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <form className="hidden lg:block">
          <div className="space-y-2 divide-y divide-gray-200">
            <DateRangeFilter
              filters={filters}
              onFilterChange={onFilterChange}
              onClearFilter={onClearFilter}
            />

            {filterSections.map((section) => (
              <SectionFilter
                key={section.id}
                section={section}
                filters={filters}
                onFilterChange={onFilterChange}
                onClearFilter={onClearFilter}
              />
            ))}

            <RadioFilter
              id="hasDocuments"
              name="Supporting Documents"
              options={[
                { value: 'true', label: 'With documents' },
                { value: 'false', label: 'Without documents' }
              ]}
              filters={filters}
              onFilterChange={onFilterChange}
              onClearFilter={onClearFilter}
            />

            <RadioFilter
              id="leaveBalance"
              name="Leave Balance"
              options={[
                { value: 'sufficient', label: 'Sufficient balance' },
                { value: 'insufficient', label: 'Insufficient balance' }
              ]}
              filters={filters}
              onFilterChange={onFilterChange}
              onClearFilter={onClearFilter}
            />
          </div>
        </form>
      </div>

      <MobileFilters
        isOpen={mobileFiltersOpen}
        onClose={onMobileClose}
        filterSections={filterSections}
        filters={filters}
        onFilterChange={onFilterChange}
      />
    </div>
  )
} 