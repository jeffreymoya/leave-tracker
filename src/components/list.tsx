export function LeavesList({ items }) {
  return (
    <div className="flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-gray-300" aria-label="Leave requests">
            <thead>
              <tr>
                <th scope="col" className="py-3 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Type</th>
                <th scope="col" className="px-3 py-3 text-left text-sm font-semibold text-gray-900">Dates</th>
                <th scope="col" className="px-3 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                <th scope="col" className="relative py-3 pl-3 pr-4">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {items.map((leave) => (
                <tr key={leave.id} aria-labelledby={`leave-${leave.id}-label`}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm">
                    <div id={`leave-${leave.id}-label`} className="font-medium text-gray-900">
                      {leave.type}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {formatDate(leave.startDate)} - {formatDate(leave.endDate)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium 
                      ${leave.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                       leave.status === 'Rejected' ? 'bg-red-100 text-red-800' : 
                       'bg-orange-100 text-orange-800'}`}>
                      {leave.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
                    <Link href={`/requests/${leave.id}`} className="text-[#ec6c1a] hover:text-[#d45f17]">
                      View<span className="sr-only">, {leave.type}</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
