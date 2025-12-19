"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphTotalCount,
} from "@/components/kibo-ui/contribution-graph";
import { cn } from "@/lib/utils";
import { ContributionResponse } from "@/lib/contributions";
import { Badge } from "@/components/ui/badge";

type Props = {
  contributions?: ContributionResponse;
};

export default function GitCalendar({ contributions }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">
          Contribution Calendar (work + personal)
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="overflow-auto">
          <GithubCalendar contributions={contributions} />
        </div>
      </CardContent>
    </Card>
  );
}

const GithubCalendar = ({ contributions }: Pick<Props, "contributions">) => {
  const total = contributions?.total[new Date().getFullYear()] || 0;

  return (
    <ContributionGraph
      data={contributions?.contributions || []}
      totalCount={total}
    >
      <ContributionGraphCalendar>
        {({ activity, dayIndex, weekIndex }) => (
          <ContributionGraphBlock
            activity={activity}
            className={cn(
              'data-[level="0"]:fill-[#ebedf0] dark:data-[level="0"]:fill-[#161b22]',
              'data-[level="1"]:fill-[#9be9a8] dark:data-[level="1"]:fill-[#0e4429]',
              'data-[level="2"]:fill-[#40c463] dark:data-[level="2"]:fill-[#006d32]',
              'data-[level="3"]:fill-[#30a14e] dark:data-[level="3"]:fill-[#26a641]',
              'data-[level="4"]:fill-[#216e39] dark:data-[level="4"]:fill-[#39d353]'
            )}
            dayIndex={dayIndex}
            weekIndex={weekIndex}
          />
        )}
      </ContributionGraphCalendar>
      <ContributionGraphFooter>
        <ContributionGraphTotalCount>
          {({ totalCount }) => (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-muted-foreground text-sm">
                Year {new Date().getFullYear()}:
              </span>
              <Badge>{totalCount.toLocaleString()} contributions</Badge>
            </div>
          )}
        </ContributionGraphTotalCount>
      </ContributionGraphFooter>
    </ContributionGraph>
  );
};
