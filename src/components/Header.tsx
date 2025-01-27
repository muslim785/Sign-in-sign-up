'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

const products = [
  { name: 'Country Burger', description: '', src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVvQdLPg6C3Q78TF_8ZaLnPVBPNACStzBSzg&s"},
  { name: 'Fresh Lime', description: '', src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdOg9gX15VVIvhsZQWRIhKyCsBIE8QFXg4hYlap6MGq83tk3imjVqps0lRcK6j6WuIfLw&usqp=CAU" },
  { name: 'Chocolate Muffin', description: '', src:"data:image/jpeg;base64,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" },
  { name: 'Chicken Chup', description: '', src:"https://media.istockphoto.com/id/683668204/photo/grilled-chicken-breast-and-vegetables.jpg?s=612x612&w=0&k=20&c=2aHtPiIt8F7MWzc4nVNhnIo6fW5bRFUcEMrXSBRF3cE=" },
  { name: 'Pizza', description: '', src:"data:image/jpeg;base64,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" },
]
const callsToAction = [
  { name: 'ODER NOW', src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS82eYswfGwwnd9CsH3MSkRYOCmnHu1ae_XZA&s" },
  { name: 'Contact ', src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzX_w3WUvaYqf0-ujmysBMn-mwt0bvz2zptA&s"},
]

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Burger Boss</span>
            <img
              alt=""
              src="https://i.pinimg.com/736x/57/31/66/573166ed060a64778820b54692f91c73.jpg"
              className="h-8 w-auto" 
            />
          </a>
          <div className='zoo  font-bold text-2xl ml-10 '>  Burger-zoo</div>
        </div>
        
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900">
              Menu
              <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-400" />
            </PopoverButton>

            <PopoverPanel
              transition
              className="absolute top-full -left-8 z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white ring-1 shadow-lg ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
            >
              <div className="p-4">
                {products.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50"
                  >
                    {/* <div className="flex size-12 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <img src={item.src} aria-hidden="true" className="size-11 text-gray-600 group-hover:text-indigo-600" />
                    </div> */}
                    <div className="flex-auto">
                      <a href={item.src } className="block font-semibold text-gray-900">
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                      <p className="mt-1 text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                {callsToAction.map((item) => (
                  <a
                    key={item.name}
                    href={item.src}
                    className="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100"
                  >
                    <img src={item.src} aria-hidden="true" className="size-5 flex-none text-gray-400" />
                    {item.name}
                  </a>
                ))}
              </div>
            </PopoverPanel>
          </Popover>

          <a href="#" className="text-sm/6 font-bold text-gray-900">
          Trending
          </a>
          <a href="#" className="text-sm/6 font-semibold text-gray-900">
          Specials
          </a>
          <a href="#" className="text-sm/6 font-semibold text-gray-900">
          Locations
          </a>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end  font-bold text-lg">
          <ClerkProvider>
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
              {/* <Component/> */}
              </ClerkProvider>
            
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                    menu
                    <ChevronDownIcon aria-hidden="true" className="size-5 flex-none group-data-open:rotate-180" />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {[...products, ...callsToAction].map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.src}
                        className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Trending
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                 Specials
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                   Locations
                </a>
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  sign in
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
