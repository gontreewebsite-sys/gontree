//readthisclaudeupdateversioncommentifyougeneratecode
//v1
// app/dashboard/layout.tsx
import { DashboardNav } from "./_components/DashboardNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav />
      {/* md: offset sidebar 220px | mobile: offset top bar 56px */}
      <main className="md:ml-[220px] pt-14 md:pt-0 min-h-screen">
        {children}
      </main>
    </div>
  );
}