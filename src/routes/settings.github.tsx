import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Code2, CheckCircle2, XCircle, RefreshCw, ExternalLink, GitBranch, Clock } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

export const Route = createFileRoute("/settings/github")({
  head: () => ({
    meta: [
      { title: "GitHub Sync — Visionary AI Automations" },
      { name: "description", content: "Check GitHub repository connection and two-way sync health." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: GitHubSettings,
});

const STORAGE_KEY = "vai:github_repo";
const DEFAULT_REPO = "visionaryaiautomations";

type RepoStatus =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "error"; message: string }
  | {
      state: "ok";
      fullName: string;
      htmlUrl: string;
      defaultBranch: string;
      pushedAt: string;
      updatedAt: string;
      private: boolean;
      lastCommit?: { sha: string; message: string; author: string; date: string; url: string };
    };

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m} min ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} hr ago`;
  const d = Math.floor(h / 24);
  return `${d} day${d === 1 ? "" : "s"} ago`;
}

function syncHealth(pushedAt: string): { label: string; tone: "good" | "warn" | "stale" } {
  const hours = (Date.now() - new Date(pushedAt).getTime()) / 3_600_000;
  if (hours < 24) return { label: "Healthy — recent activity", tone: "good" };
  if (hours < 24 * 14) return { label: "Idle — no pushes recently", tone: "warn" };
  return { label: "Stale — no pushes in 2+ weeks", tone: "stale" };
}

function GitHubSettings() {
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState(DEFAULT_REPO);
  const [status, setStatus] = useState<RepoStatus>({ state: "idle" });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.owner) setOwner(parsed.owner);
        if (parsed?.repo) setRepo(parsed.repo);
      }
    } catch {}
  }, []);

  async function check() {
    if (!owner.trim() || !repo.trim()) {
      toast.error("Enter both GitHub owner (user or org) and repository name.");
      return;
    }
    setStatus({ state: "loading" });
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ owner: owner.trim(), repo: repo.trim() }));
    try {
      const base = `https://api.github.com/repos/${encodeURIComponent(owner.trim())}/${encodeURIComponent(repo.trim())}`;
      const res = await fetch(base, { headers: { Accept: "application/vnd.github+json" } });
      if (!res.ok) {
        const msg =
          res.status === 404
            ? "Repository not found. Check the owner and name, or make sure it's public (or connect the GitHub connector for private repos)."
            : res.status === 403
              ? "GitHub API rate limit reached. Try again in a minute."
              : `GitHub returned ${res.status}.`;
        setStatus({ state: "error", message: msg });
        return;
      }
      const data = await res.json();
      let lastCommit:
        | { sha: string; message: string; author: string; date: string; url: string }
        | undefined;
      try {
        const cRes = await fetch(`${base}/commits/${data.default_branch}`, {
          headers: { Accept: "application/vnd.github+json" },
        });
        if (cRes.ok) {
          const c = await cRes.json();
          lastCommit = {
            sha: (c.sha || "").slice(0, 7),
            message: (c.commit?.message || "").split("\n")[0].slice(0, 120),
            author: c.commit?.author?.name || "unknown",
            date: c.commit?.author?.date || data.pushed_at,
            url: c.html_url,
          };
        }
      } catch {}
      setStatus({
        state: "ok",
        fullName: data.full_name,
        htmlUrl: data.html_url,
        defaultBranch: data.default_branch,
        pushedAt: data.pushed_at,
        updatedAt: data.updated_at,
        private: !!data.private,
        lastCommit,
      });
    } catch (e) {
      setStatus({ state: "error", message: e instanceof Error ? e.message : "Network error." });
    }
  }

  const health = status.state === "ok" ? syncHealth(status.pushedAt) : null;

  return (
    <div className="min-h-screen bg-canvas text-neutral-100">
      <Toaster theme="dark" richColors position="top-center" />
      <div className="mx-auto max-w-3xl px-6 py-16">
        <Link to="/" className="text-xs uppercase tracking-[0.25em] text-accent-cyan hover:text-white">
          ← Back to site
        </Link>

        <div className="mt-6 flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
            <Code2 className="size-5" />
          </span>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">GitHub sync status</h1>
            <p className="text-sm text-zinc-400">Check whether your repository is reachable and how recent the last push was.</p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-white/5 bg-surface/60 p-4 text-xs text-zinc-400">
          <p>
            The Lovable ↔ GitHub two-way sync itself is managed by Lovable (chat input <span className="text-neutral-200">+ → GitHub</span>).
            This screen queries GitHub directly to verify the repo exists and reports how fresh the latest push is — a practical
            indicator that sync is flowing.
          </p>
        </div>

        <div className="mt-6 grid gap-3 rounded-3xl border border-white/5 bg-surface p-6 sm:grid-cols-[1fr_1fr_auto]">
          <label className="flex flex-col gap-1.5 text-xs">
            <span className="text-zinc-400">Owner (user or org)</span>
            <input
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              placeholder="e.g. your-github-username"
              className="rounded-xl border border-white/10 bg-canvas px-3 py-2.5 text-sm text-neutral-100 outline-none focus:border-accent-blue/60"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-xs">
            <span className="text-zinc-400">Repository</span>
            <input
              value={repo}
              onChange={(e) => setRepo(e.target.value)}
              placeholder="visionaryaiautomations"
              className="rounded-xl border border-white/10 bg-canvas px-3 py-2.5 text-sm text-neutral-100 outline-none focus:border-accent-blue/60"
            />
          </label>
          <button
            onClick={check}
            disabled={status.state === "loading"}
            className="inline-flex items-center justify-center gap-2 self-end rounded-xl bg-accent-blue px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            <RefreshCw className={`size-4 ${status.state === "loading" ? "animate-spin" : ""}`} />
            Check status
          </button>
        </div>

        <div className="mt-6">
          {status.state === "idle" && (
            <div className="rounded-3xl border border-dashed border-white/10 bg-surface/40 p-8 text-center text-sm text-zinc-500">
              Enter your GitHub owner + repo above and click <span className="text-neutral-300">Check status</span>.
            </div>
          )}

          {status.state === "loading" && (
            <div className="rounded-3xl border border-white/5 bg-surface p-8 text-center text-sm text-zinc-400">
              Querying GitHub…
            </div>
          )}

          {status.state === "error" && (
            <div className="flex items-start gap-3 rounded-3xl border border-red-500/30 bg-red-500/5 p-6">
              <XCircle className="mt-0.5 size-5 shrink-0 text-red-400" />
              <div>
                <div className="text-sm font-medium text-red-200">Not connected</div>
                <p className="mt-1 text-sm text-zinc-400">{status.message}</p>
              </div>
            </div>
          )}

          {status.state === "ok" && health && (
            <div className="space-y-4">
              <div className="flex items-start gap-3 rounded-3xl border border-emerald-500/30 bg-emerald-500/5 p-6">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-400" />
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium text-emerald-200">Connected</span>
                    <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-wider text-zinc-400">
                      {status.private ? "Private" : "Public"}
                    </span>
                  </div>
                  <a
                    href={status.htmlUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-1 inline-flex items-center gap-1.5 text-sm text-neutral-100 hover:text-accent-cyan"
                  >
                    {status.fullName}
                    <ExternalLink className="size-3.5" />
                  </a>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <StatCard
                  icon={<GitBranch className="size-4" />}
                  label="Default branch"
                  value={status.defaultBranch}
                />
                <StatCard
                  icon={<Clock className="size-4" />}
                  label="Last push"
                  value={timeAgo(status.pushedAt)}
                  sub={new Date(status.pushedAt).toLocaleString()}
                />
                <StatCard
                  icon={
                    <span
                      className={`inline-block size-2.5 rounded-full ${
                        health.tone === "good"
                          ? "bg-emerald-400"
                          : health.tone === "warn"
                            ? "bg-amber-400"
                            : "bg-red-400"
                      }`}
                    />
                  }
                  label="Sync health"
                  value={health.label}
                />
              </div>

              {status.lastCommit && (
                <div className="rounded-3xl border border-white/5 bg-surface p-6">
                  <div className="text-xs uppercase tracking-[0.25em] text-zinc-500">Latest commit</div>
                  <a
                    href={status.lastCommit.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-2 block text-sm font-medium text-neutral-100 hover:text-accent-cyan"
                  >
                    {status.lastCommit.message}
                  </a>
                  <div className="mt-2 text-xs text-zinc-500">
                    <span className="font-mono text-zinc-400">{status.lastCommit.sha}</span> · {status.lastCommit.author} · {timeAgo(status.lastCommit.date)}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-surface p-4">
      <div className="flex items-center gap-2 text-xs text-zinc-400">
        <span className="text-accent-cyan">{icon}</span>
        {label}
      </div>
      <div className="mt-2 text-sm font-medium text-neutral-100">{value}</div>
      {sub && <div className="mt-0.5 text-[11px] text-zinc-500">{sub}</div>}
    </div>
  );
}