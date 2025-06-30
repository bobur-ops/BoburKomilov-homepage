"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const ForceGraph3D = dynamic(() => import("react-force-graph-3d"), {
  ssr: false,
});

interface Repo {
  id: string;
  language: string | null;
  stargazers_count: number;
}

interface GraphNode {
  id: string;
  group: string;
  value: number;
}

interface GraphLink {
  source: string;
  target: string;
}

interface Props {
  repos: Repo[];
}

export default function RepoGraph({ repos }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 300, height: 300 });

  const [graphData, setGraphData] = useState<{
    nodes: GraphNode[];
    links: GraphLink[];
  }>({
    nodes: [],
    links: [],
  });

  useEffect(() => {
    const nodes: GraphNode[] = repos.map((repo) => ({
      id: repo.id,
      group: repo.language || "Unknown",
      value: repo.stargazers_count || 1,
    }));

    const links: GraphLink[] = [];

    for (let i = 0; i < repos.length; i++) {
      for (let j = i + 1; j < repos.length; j++) {
        if (repos[i].language && repos[i].language === repos[j].language) {
          links.push({ source: repos[i].id, target: repos[j].id });
        }
      }
    }

    setGraphData({ nodes, links });
  }, [repos]);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    handleResize(); // initial size
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[600px] sm:h-[700px]">
      <ForceGraph3D
        graphData={graphData}
        nodeAutoColorBy="group"
        nodeLabel={(node: any) => `${node.id} (${node.group})`}
        nodeRelSize={6}
        linkOpacity={0.2}
        linkDirectionalParticles={2}
        linkDirectionalArrowLength={3.5}
        backgroundColor="#0b1120"
        width={dimensions.width}
        height={dimensions.height}
      />
    </div>
  );
}
