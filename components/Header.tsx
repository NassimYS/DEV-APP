import Link from "next/link";
import Image from "next/image";
import { getHeader } from "@/lib/contentstack";
import { getUrl } from "@/types";

export default async function Header() {
  const header = await getHeader();
  if (!header) return null;

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 no-underline">
            {header.logo?.image?.url && (
              <Image
                src={header.logo.image.url}
                alt={header.logo.alt_text || ""}
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
                {...(header.logo.$ && header.logo.$.image)}
              />
            )}
            {header.site_name && (
              <span
                className="text-xl font-bold text-gray-900"
                {...(header.$ && header.$.site_name)}
              >
                {header.site_name}
              </span>
            )}
          </Link>

          {header.navigation && header.navigation.length > 0 && (
            <nav className="flex items-center gap-6">
              {header.navigation.map((item, index) => (
                <Link
                  key={item._metadata?.uid || index}
                  href={getUrl(item.url)}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 no-underline"
                  {...(item.$ && item.$.title)}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
