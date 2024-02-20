
const PaginationLinks = ({ total, page, setPage }) => {
  const totalPages = Math.ceil((total / 6))

  return (
    <div className='flex gap-10 mx-auto md:flex-row flex-col w-fit mb-24'>
      {totalPages > 0 && (
        <>
          <button
            disabled={page <= 1}
            className='disabled:bg-gray-400 cursor-not-allowed bg-white border border-black px-6 py-2 h-10 hover:bg-black hover:text-white'
            onClick={() => setPage(page - 1)}
          >Previous</button>
          <div className="flex w-full justify-center md:w-fit border border-black">
            {[...Array(totalPages)].map((_, index) => (
              <button key={index}
                onClick={() => {
                  setPage(index + 1)
                }}
                className={` w-10 h-10 ${page === index + 1 ? "bg-black text-white" : "bg-white text-black "}`}
              >{index + 1}
              </button>
            ))}
          </div>
          <button className='disabled:bg-gray-400 cursor-not-allowed bg-white border border-black  hover:bg-black hover:text-white px-6 py-2 h-10'
            onClick={() => setPage(page + 1)}
            disabled={page >= totalPages}
          >Next</button>
        </>
      )}
    </div>
  )
}

export default PaginationLinks