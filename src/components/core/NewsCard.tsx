import { useState } from "react";
import Link from "next/link";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { NewsObject } from "@/types/news";

const ITEMS_PER_PAGE = 4

const NewsCardItem = ({ news, isGridView }: { news: NewsObject, isGridView: boolean }) => {
  return (
    <Card className="rounded p-4">
      <div className="space-y-4">
        <img
          src={news?.og}
          alt={news?.title}
          width={600}
          height={600}
          className={`rounded ${!isGridView && 'w-full h-64 object-cover'}`}
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
  )
}

export default function NewsCard({ newsData, isGridView }: { newsData: NewsObject[], isGridView: boolean }) {
  const [currentPage, setCurrentPage] = useState<number>(1)

  const totalPages: number = Math.ceil(newsData.length / ITEMS_PER_PAGE);
  const startIndex: number = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex: number = startIndex + ITEMS_PER_PAGE;
  const currentNews: NewsObject[] = newsData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <section className={`grid grid-cols-1 gap-2 ${isGridView && "md:grid-cols-2"}`}>
        {currentNews &&
          currentNews.map((news: NewsObject, idx: number) => {
            return (
              <NewsCardItem key={idx} news={news} isGridView={isGridView} />
            );
          })}
      </section>

      <Pagination className="my-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}