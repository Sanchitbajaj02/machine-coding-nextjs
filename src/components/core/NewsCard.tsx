import Link from "next/link";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { NewsObject } from "@/types/news";

export default function NewsCard({ newsData, isGridView }: { newsData: NewsObject[], isGridView: boolean }) {
  return isGridView ? (
    <section className="grid grid-cols-2 gap-2">
      {newsData &&
        newsData.map((news: NewsObject, idx: number) => {
          return (
            <Card key={idx} className="rounded p-4">
              <div className="space-y-4">
                <img
                  src={news?.og}
                  alt={news?.title}
                  width={500}
                  height={500}
                  className="rounded"
                />
                <CardTitle className="text-xl font-bold">{news?.title}</CardTitle>

                <div className="flex flex-row items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={news?.source_icon} alt={news?.source} />
                    <AvatarFallback>SB</AvatarFallback>
                  </Avatar>

                  <span>{news?.source}</span>
                </div>

                <Link href={news?.link} target="_blank">
                  <Button size="sm" variant="link" className="w-full shadow">
                    Read full article
                  </Button>
                </Link>
              </div>
            </Card>
          );
        })}
    </section>
  ) : (
    <section className="grid grid-cols-1 gap-2">
      {newsData &&
        newsData.map((news: NewsObject, idx: number) => {
          return (
            <Card key={idx} className="rounded p-4">
              <div className="space-y-4">
                <img
                  src={news?.og}
                  alt={news?.title}
                  className="rounded w-full h-64 object-cover"
                />
                <CardTitle className="text-xl font-bold">{news?.title}</CardTitle>

                <div className="flex flex-row items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={news?.source_icon} alt={news?.source} />
                    <AvatarFallback>SB</AvatarFallback>
                  </Avatar>

                  <span>{news?.source}</span>
                </div>

                <Link href={news?.link} target="_blank">
                  <Button size="sm" variant="link" className="w-full shadow">
                    Read full article
                  </Button>
                </Link>
              </div>
            </Card>
          );
        })}
    </section>
  );
}
