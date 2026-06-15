export default function DashboardPage() {
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">
        CCNA Master Dashboard
      </h1>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded border p-4">
          <h2 className="text-xl font-bold">
            Network Fundamentals
          </h2>
        </div>

        <div className="rounded border p-4">
          <h2 className="text-xl font-bold">
            IP Connectivity
          </h2>
        </div>

        <div className="rounded border p-4">
          <h2 className="text-xl font-bold">
            Security Fundamentals
          </h2>
        </div>

        <div className="rounded border p-4">
          <h2 className="text-xl font-bold">
            Automation
          </h2>
        </div>
      </div>
    </div>
  );
}
