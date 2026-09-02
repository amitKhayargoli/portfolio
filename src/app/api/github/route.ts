import { NextResponse } from "next/server";
import { fetchContributions, fetchRepos } from "@/lib/github";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") || "amitkhayargoli";
  const type = searchParams.get("type") || "contributions";

  try {
    if (type === "repos") {
      const repos = await fetchRepos(username);
      return NextResponse.json(repos);
    }

    const contributions = await fetchContributions(username);
    return NextResponse.json(contributions);
  } catch (error) {
    console.error("GitHub API error:", error);
    return NextResponse.json([], { status: 500 });
  }
}
