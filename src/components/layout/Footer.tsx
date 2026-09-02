import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm font-medium text-foreground">
              {site.footer.name}
            </p>
            <p className="text-xs text-muted mt-1">{site.footer.title}</p>
          </div>
          <p className="text-xs text-muted">&copy; {site.footer.year}</p>
        </div>
      </div>
    </footer>
  );
}
