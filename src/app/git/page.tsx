export const revalidate = 60;

import MdxWrapper from "@/components/MdxWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRepos, getUserStats } from "@/lib/git";
import LanguageChart from "./components/LanguageChart";
import GitCalendar from "./components/GitCalendar";
import GitQuickStats from "./components/GitQuickStats";
import RepoGraph from "./components/RepoGraph";

export default async function GitPage() {
  const username = "bobur-ops";

  const [user, repos] = await Promise.all([
    getUserStats(username),
    getRepos(username),
  ]);

  const languagesMap = new Map<string, number>();

  repos?.forEach((repo) => {
    if (repo.language) {
      languagesMap.set(
        repo.language,
        (languagesMap.get(repo.language) || 0) + 1
      );
    }
  });

  const languageData = Array.from(languagesMap).map(([lang, count]) => ({
    name: lang,
    value: count,
  }));

  const totalStars = repos.reduce((a, r) => a + r.stargazers_count, 0);
  const totalForks = repos.reduce((a, r) => a + r.forks_count, 0);

  const repoGraphData = repos.map((repo: any) => ({
    id: repo.name,
    language: repo.language,
    stargazers_count: repo.stargazers_count,
  }));

  if (!user) {
    return (
      <MdxWrapper>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">GitHub User Not Found</h1>
          <p className="text-muted-foreground">
            The user profile for <strong>{username}</strong> could not be found.
          </p>
        </div>
      </MdxWrapper>
    );
  }

  return (
    <MdxWrapper isProse={false}>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Github Profile</CardTitle>
            <CardContent className="space-y-2">
              <p>
                <strong>Name: </strong>
                {user.name || user.login}
              </p>
              <p>
                <strong>Followers: </strong>
                {user.followers}
              </p>
              <p>
                <strong>Public Repos: </strong>
                {user.public_repos}
              </p>
            </CardContent>
          </CardHeader>
        </Card>

        <LanguageChart languageData={languageData} />

        <RepoGraph repos={repoGraphData} />

        <GitCalendar />

        <GitQuickStats
          stars={totalStars}
          forks={totalForks}
          followers={user.followers}
          publicRepos={user.public_repos}
        />
      </div>
    </MdxWrapper>
  );
}
