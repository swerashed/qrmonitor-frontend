type ErrorBlockProps = {
    message: string
    retry?: () => void
  }
  
  export const ErrorBlock = ({ message, retry }: ErrorBlockProps) => {
    return (
      <div className="p-4 text-red-700 h-full w-full flex flex-col justify-center items-center">
        <p className="font-semibold">Error: {message}</p>
        {retry && (
          <button
            onClick={retry}
            className="mt-2 inline-block px-3 py-1 bg-red-500 text-white rounded"
          >
            Retry
          </button>
        )}
      </div>
    )
  }
  