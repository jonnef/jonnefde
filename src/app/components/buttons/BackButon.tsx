import Link from "next/link";

export default function BackButton() {
  return (
    <div className="mt-8">
      <Link
        href="/union"
        className="
  inline-flex items-center gap-2
  rounded-lg border border-gray-300 dark:border-gray-700
  bg-white dark:bg-gray-800
  px-4 py-2
  text-sm font-medium text-gray-700 dark:text-gray-100
  shadow-sm
  hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
  transition-colors
"

      >
        {/* Pfeil links als Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-4 w-4"
        >
          <path
            fillRule="evenodd"
            d="M7.707 14.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5A1 1 0 018.707 4.707L5.414 8H18a1 1 0 110 2H5.414l3.293 3.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Zurück zur Übersicht
      </Link>
    </div>
  );
}
