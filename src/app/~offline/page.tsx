export default function OfflinePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background p-6 text-foreground">
      <h1 className="text-xl font-semibold">You&apos;re offline</h1>
      <p className="text-muted-foreground text-center text-sm">
        Check your connection and try again.
      </p>
    </div>
  );
}
