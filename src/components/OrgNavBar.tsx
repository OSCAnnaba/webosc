"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function OrgNavBar({
  org_id,
  segmentsList,
}: {
  org_id: string;
  segmentsList: string[];
}) {
  const path = usePathname();
  return (
    <>
      <nav className="bg-black h-28 w-full border-b border-gray-500">
        <div className="text-gray-300 text-md h-1/2 flex px-5 py-2 items-end gap-2">
          <Link className="h-full p-1 hover:bg-gray-900 rounded-md" href={"/"}>
            <Image
              height={100}
              width={100}
              src="/logo-white.png"
              alt="osca"
              className="h-8 w-8 aspect-square"
            />
          </Link>
          <div className="flex pb-1 gap-1">
            <Link
              data-current={path === `/org/${org_id}`}
              href={`/org/${org_id}`}
              className="flex items-center justify-center py-1 px-2 hover:bg-slate-900 rounded-md data-[current=true]:font-bold data-[current=true]:text-white"
            >
              {org_id}
            </Link>
            {path !== `/org/${org_id}` && (
              <>
                <span className="text-gray-300 flex items-center justify-center">
                  /
                </span>
                <Link
                  href={path}
                  className="flex items-center justify-center py-1 px-2 hover:bg-gray-900 rounded-md font-bold text-white"
                >
                  {path.split("/")[3]}
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="text-white h-1/2 flex p-2 gap-2">
          {segmentsList.map((segment) => (
            <Link
              key={segment}
              data-seleted={segment === path.split("/")[3]}
              href={`/org/${org_id}/${segment}`}
              className="h-full flex items-center justify-center p-4 text-center rounded-md data-[seleted=true]:bg-gray-900 hover:bg-gray-900/75 data-[seleted=true]:font-bold"
            >
              {segment}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
