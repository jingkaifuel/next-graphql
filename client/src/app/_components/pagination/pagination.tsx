"use client";

import { useEffect, useMemo, useState } from "react";
import { Button, Flex, Text } from "@radix-ui/themes";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

interface PaginationProps {
  count: number;
  onPagination: (i: number) => void;
}

const Pagination = ({ count, onPagination }: PaginationProps) => {
  const [current, setCurrent] = useState(0);
  const actualCount = useMemo(() => (count < 1 ? 1 : count), [count]);
  const arrList = Array(actualCount).fill("");

  // Effects
  useEffect(() => {
    onPagination(current);
  }, [current]);

  // Functions
  const handlePageClick = (i: number) => {
    setCurrent(i);
  };

  const handlePrevClick = () => {
    setCurrent((prev) => prev - 1);
  };

  const handleNextClick = () => {
    setCurrent((prev) => prev + 1);
  };

  return (
    <Flex justify="end" align="center" mt="3" gap="1">
      <Button
        size="1"
        variant="outline"
        disabled={current == 0}
        onClick={handlePrevClick}
      >
        <ArrowLeftIcon width="16px" height="16px" />
        <Text ml="1">Prev</Text>
      </Button>

      {arrList.map((_, i) => (
        <Button
          size="1"
          key={`pagination-${i}`}
          onClick={() => handlePageClick(i)}
          variant={current == i ? "solid" : "outline"}
        >
          {i + 1}
        </Button>
      ))}

      <Button
        size="1"
        variant="outline"
        disabled={current == actualCount - 1}
        onClick={handleNextClick}
      >
        <Text mr="1">Next</Text>
        <ArrowRightIcon width="16px" height="16px" />
      </Button>
    </Flex>
  );
};

export default Pagination;
