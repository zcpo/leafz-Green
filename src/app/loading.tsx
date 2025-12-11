
export default function Loading() {
  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-[9999] bg-primary/20 overflow-hidden">
      <div className="h-full bg-primary animate-indeterminate-progress"></div>
    </div>
  );
}
