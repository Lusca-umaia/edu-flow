interface TableHeadProps {
  headItems: { name: string; order: number }[];
}

export default function TableHead({ headItems }: TableHeadProps) {
  return (
    <thead>
      <tr>
        {headItems.map((item) => (
          <th
            key={item.order}
            className="py-3.5 px-3 text-left text-md font-bold text-gray-900"
          >
            {item.name}
          </th>
        ))}
      </tr>
    </thead>
  );
}
