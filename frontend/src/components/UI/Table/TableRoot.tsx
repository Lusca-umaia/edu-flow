import { ReactNode } from "react";
import EmptyState from "../EmptyState/EmptyState";

interface TableRootProps {
  data: unknown[];
  children: ReactNode;
  emptyMessage?: string;
}

export default function TableRoot({
  children,
  data,
  emptyMessage,
}: TableRootProps) {
  return (
    <div className="animate-appearance shadow-lg mt-4 flow-root bg-white px-4 py-4 rounded-2xl">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full py-2 align-middle">
          <table className="min-w-full divide-y divide-gray-300">
            {children}
          </table>
          {data.length === 0 && (
            <EmptyState>
              {emptyMessage ?? "Sem dados cadastrados : ("}
            </EmptyState>
          )}
        </div>
      </div>
    </div>
  );
}
