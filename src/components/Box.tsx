import React from "react";
export type BoxProps = {
  title: string;
  subtitle?: string;
  toolbar?: React.ReactNode;
  children: React.ReactNode;
};
export const Box = (props: BoxProps) => {
  const { title, subtitle, toolbar } = props;
  return (
    <>
      <div className="bg-white rounded-lg shadow-lg">
        <div className=" px-4 py-5 border-b border-gray-200 sm:px-6 ">
          <div className="-ml-4 -mt-4 flex justify-between items-cente  r flex-wrap sm:flex-nowrap">
            <div className="ml-4 mt-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {title}
              </h3>
              {subtitle && (
                <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
              )}
            </div>
            {toolbar && (
              <div className="ml-4 mt-4 flex-shrink-0">{toolbar}</div>
            )}
          </div>
        </div>
        <div className="bg-white px-4 py-5 sm:px-6 rounded-b-lg">
          {props.children}
        </div>
      </div>
    </>
  );
};

export default Box;
