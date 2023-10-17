import HeaderLogo from "@/components/ui/header-logo";

export default function Header() {
  return (
    <header className="absolute w-full z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Site branding */}
          <div className="shrink-0 mr-4">
            <HeaderLogo />
          </div>
        </div>
      </div>
    </header>
  );
}
