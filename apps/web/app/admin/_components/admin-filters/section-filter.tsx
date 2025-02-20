import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline'

import { classNames, getFilterLength, hasFilterValue } from './admin-filters.utils'

import type { FilterState, FilterSection } from './admin-filters.utils'

interface SectionFilterProps {
  section: FilterSection
  filters: FilterState
  onFilterChange: (key: keyof FilterState, value: string) => void
  onClearFilter: (key: keyof FilterState) => void
}

export function SectionFilter({ section, filters, onFilterChange, onClearFilter }: SectionFilterProps) {
  return (
    <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-4">
      {({ open }) => (
        <>
          <h3 className="-mx-2 -my-3 flow-root">
            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-900">{section.name}</span>
                {getFilterLength(filters[section.id]) > 0 && (
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                    {getFilterLength(filters[section.id])} selected
                  </span>
                )}
              </div>
              <span className="ml-6 flex items-center">
                <ChevronDownIcon
                  className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform')}
                  aria-hidden="true"
                />
              </span>
            </Disclosure.Button>
          </h3>
          <Disclosure.Panel className="pt-6">
            <div className="space-y-4">
              {section.options.map((option, optionIdx) => (
                <div key={option.value} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id={`filter-${section.id}-${optionIdx}`}
                      name={`${section.id}[]`}
                      defaultValue={option.value}
                      type="checkbox"
                      checked={hasFilterValue(filters[section.id], option.value)}
                      onChange={() => onFilterChange(section.id, option.value)}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                    />
                    <label
                      htmlFor={`filter-${section.id}-${optionIdx}`}
                      className="ml-3 text-sm text-gray-600 hover:text-gray-900"
                    >
                      {option.label}
                    </label>
                  </div>
                  {'count' in option && (
                    <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                      {option.count}
                    </span>
                  )}
                </div>
              ))}
              {getFilterLength(filters[section.id]) > 0 && (
                <button
                  type="button"
                  onClick={() => onClearFilter(section.id)}
                  className="mt-4 flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                >
                  <XMarkIcon className="h-4 w-4" />
                  Clear selection
                </button>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
} 