export default function LoadingCalculator() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-900 p-8">
            <div className="h-4 w-28 bg-slate-700 rounded mb-4" />
            <div className="h-8 w-2/3 bg-slate-700 rounded mb-3" />
            <div className="h-4 w-3/4 bg-slate-700 rounded" />
          </div>
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="h-5 w-24 bg-slate-200 rounded" />
                <div className="h-10 w-full bg-slate-100 rounded" />
                <div className="h-10 w-full bg-slate-100 rounded" />
                <div className="h-10 w-full bg-slate-100 rounded" />
              </div>
              <div className="space-y-4">
                <div className="h-5 w-24 bg-slate-200 rounded" />
                <div className="h-24 w-full bg-slate-100 rounded" />
                <div className="h-24 w-full bg-slate-100 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
