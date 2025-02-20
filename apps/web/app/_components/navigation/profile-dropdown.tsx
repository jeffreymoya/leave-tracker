'use client'

import { Menu, Transition } from '@headlessui/react'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { Fragment } from 'react'
import { motion } from 'framer-motion'

export function ProfileDropdown({ _open }: { _open: boolean }) {
  return (
    <Menu as="div" className="relative">
      {({ open }) => (
        <>
          <Menu.Button
            className="flex items-center gap-2 p-2 rounded-lg
                       text-white/90 hover:text-white hover:bg-white/10
                       transition-colors duration-200
                       focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
          >
            <UserCircleIcon className="h-6 w-6" />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-150"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items 
              className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-lg 
                         shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none
                         divide-y divide-gray-100"
              as={motion.div}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href="/profile"
                      className={`${
                        active ? 'bg-[var(--accent)] text-white' : 'text-gray-700'
                      } group flex w-full items-center rounded-md px-3 py-2 text-sm
                         transition-colors duration-200`}
                    >
                      Profile Settings
                    </Link>
                  )}
                </Menu.Item>
              </div>

              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-red-500 text-white' : 'text-red-600'
                      } group flex w-full items-center rounded-md px-3 py-2 text-sm
                         transition-colors duration-200`}
                      onClick={() => {/* Add logout handler */}}
                    >
                      Sign Out
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}
