"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { formatHeader } from "@/lib/utils";

const ProductTable = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = products.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const router = useRouter();

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return; // Prevent out-of-bound pages
    setCurrentPage(newPage);
  };

  const getPaginationItems = () => {
    const pageLinks = [];
    const visiblePages = 3; // Show only 3 page links before and after the current page

    if (currentPage > visiblePages) {
      pageLinks.push(
        <PaginationItem key="first">
          <PaginationLink href="#" onClick={() => handlePageChange(1)}>
            1
          </PaginationLink>
        </PaginationItem>,
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    for (
      let i = Math.max(1, currentPage - visiblePages);
      i <= Math.min(totalPages, currentPage + visiblePages);
      i++
    ) {
      pageLinks.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            className={
              currentPage === i
                ? "bg-blue-500 text-white font-bold hover:bg-blue-600 hover:text-white"
                : ""
            }
            onClick={() => handlePageChange(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (currentPage < totalPages - visiblePages) {
      pageLinks.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>,
        <PaginationItem key="last">
          <PaginationLink href="#" onClick={() => handlePageChange(totalPages)}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pageLinks;
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="border">
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Subcategory</TableHead>
            <TableHead>Reference</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border">
          {paginatedProducts.map((product, index) => (
            <TableRow
              key={index}
              onClick={() => router.push(`/dashboard/${product.$id}`)}
              className={`cursor-pointer ${index % 2 === 0 ? 'bg-gray-50' : ''}`}
            >
              <TableCell className="border-r pr-0 pl-6 bg-white">{index + 1}</TableCell>
              <TableCell className="p-2 pr-0">
                <Image
                  src={`${product.image}`}
                  width={80}
                  height={50}
                  alt={product.productName}
                  className="rounded-lg h-[50px]"
                />
              </TableCell>
              <TableCell className="max-w-xs truncate">{product.productName}</TableCell>
              <TableCell className="max-w-xs truncate">{product.productDescription}</TableCell>
              <TableCell className="max-w-xs truncate">{formatHeader(product.category)}</TableCell>
              <TableCell className="max-w-xs truncate">{formatHeader(product.subcategory)}</TableCell>
              <TableCell className="max-w-xs truncate">{product.referenceNumber}</TableCell>
              <TableCell className="max-w-xs truncate">{product.price} MKD</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <Pagination className="pt-5">
        <PaginationContent>
          <PaginationItem key="previous">
            <PaginationPrevious
              href="#"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
          </PaginationItem>
          {getPaginationItems()}
          <PaginationItem key="next">
            <PaginationNext
              href="#"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ProductTable;
