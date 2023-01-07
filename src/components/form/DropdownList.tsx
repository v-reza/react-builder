import { Disclosure, Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import React, { Fragment, useMemo } from "react";
import Text from "../Text";
import { classNames } from "../../utils/constant";
import clsx from "clsx";

export type PositionDropdownList = {
  position?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
};

type LayoutDropdown = PositionDropdownList & {
  children: React.ReactNode;
  label: string;
  className?: string;
};

export type DropdownList = LayoutDropdown;

const usePositionDropdownList = (props: PositionDropdownList) => {
  const classes = useMemo(() => {
    const classPosition = clsx({
      "origin-top-right absolute right-0 mt-2":
        props.position === "bottom-left",
      "origin-top-left absolute left-0 mt-2": props.position === "bottom-right",
      "top-0 transform -translate-y-full absolute left-0 origin-top-right":
        props.position === "top-right",
      "top-0 transform -translate-y-full absolute right-0 origin-top-right":
        props.position === "top-left",
    });
    return classPosition;
  }, [props.position]);

  return {
    position: classes,
  };
};

const LayoutDropdown = (props: LayoutDropdown) => {
  const { position } = usePositionDropdownList(props);
  return (
    <>
      <Disclosure>
        {({ open }) => (
          <>
            <div className="max-w-full mx-auto">
              <div className="flex h-16">
                <div className={clsx("flex items-center", props.className)}>
                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="rounded-full flex text-sm focus:outline-none">
                        <span className="sr-only">Open user menu</span>
                        <Text label={props.label} />
                        <ChevronDownIcon className="h-5 w-5 ml-5" />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items
                        className={clsx(
                          position,
                          "w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        )}
                      >
                        {React.Children.map(props.children, (child: any) => {
                          return (
                            <Menu.Item>
                              {({ active }) => (
                                <div>
                                  {React.cloneElement(child, {
                                    className: classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-200"
                                    ),
                                  })}
                                </div>
                              )}
                            </Menu.Item>
                          );
                        })}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </>
        )}
      </Disclosure>
    </>
  );
};

export const DropdownList = (props: DropdownList) => {
  const { position = "bottom-right" } = props;
  return (
    <LayoutDropdown label={props.label} position={position}>
      {props.children}
    </LayoutDropdown>
  );
};

export default DropdownList;
